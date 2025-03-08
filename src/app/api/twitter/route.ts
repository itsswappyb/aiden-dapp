import { GameAgent } from '@virtuals-protocol/game';
import TwitterPlugin, { TwitterClient } from '@virtuals-protocol/game-twitter-plugin';
import { NextRequest, NextResponse } from 'next/server';

// Initialize agent function
async function initializeAgent(
  apiKey: string,
  twitterConfig: {
    apiKey: string;
    apiSecretKey: string;
    accessToken: string;
    accessTokenSecret: string;
  }
) {
  try {
    // Initialize the native Twitter client with the provided credentials
    const nativeTwitterClient = new TwitterClient({
      apiKey: twitterConfig.apiKey,
      apiSecretKey: twitterConfig.apiSecretKey,
      accessToken: twitterConfig.accessToken,
      accessTokenSecret: twitterConfig.accessTokenSecret,
    });

    console.log('Verifying Twitter credentials and permissions...');

    // Verify read access
    const userInfo = await nativeTwitterClient.me();
    console.log('Successfully verified read access, user info:', userInfo);

    // Verify write access by attempting to post a test tweet
    try {
      const testTweet = await nativeTwitterClient.post('Test tweet - will be deleted');
      console.log('Successfully verified write access:', testTweet);

      // Delete the test tweet
      try {
        // Note: You'll need to implement tweet deletion if available in your Twitter client
        // await nativeTwitterClient.delete(testTweet.data.id);
      } catch (deleteError) {
        console.log('Could not delete test tweet, but write access is confirmed');
      }
    } catch (writeError) {
      console.error('Failed to verify write access:', writeError);
      throw new Error(
        'Twitter credentials lack write permissions. Please ensure your app has write access enabled.'
      );
    }

    // Create the Twitter plugin
    const twitterPlugin = new TwitterPlugin({
      id: 'twitter_worker',
      name: 'Twitter Worker',
      description:
        'A worker that will execute tasks within the Twitter Social Platform. It is capable of posting, replying, quoting and liking tweets.',
      twitterClient: nativeTwitterClient,
    });

    // Create an agent with the worker
    const agent = new GameAgent(apiKey, {
      name: 'Twitter Bot',
      goal: 'increase engagement and grow follower count',
      description: 'A bot that can post tweets, reply to tweets, and like tweets',
      workers: [
        twitterPlugin.getWorker({
          // Using default functions and metrics from the plugin
        }),
      ],
    });

    // Set custom logger
    agent.setLogger((agent, message) => {
      console.log(`-----[${agent.name}]-----`);
      console.log(message);
      console.log('\n');
    });

    await agent.init();
    return agent;
  } catch (error) {
    console.error('Failed to initialize Twitter client:', error);
    throw new Error('Failed to authenticate with Twitter API. Please verify your credentials.');
  }
}

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.GAME_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Game API key not configured' }, { status: 500 });
    }

    const body = await request.json();
    console.log('Received request body:', body);

    const {
      runDuration = 60,
      twitterApiKey: rawApiKey,
      twitterApiSecret: rawApiSecret,
      twitterAccessToken: rawAccessToken,
      twitterAccessSecret: rawAccessSecret,
    } = body;

    // Trim whitespace from credentials
    const twitterApiKey = rawApiKey?.trim();
    const twitterApiSecret = rawApiSecret?.trim();
    const twitterAccessToken = rawAccessToken?.trim();
    const twitterAccessSecret = rawAccessSecret?.trim();

    // Debug log
    console.log('Extracted credentials:', {
      hasApiKey: !!twitterApiKey,
      hasApiSecret: !!twitterApiSecret,
      hasAccessToken: !!twitterAccessToken,
      hasAccessSecret: !!twitterAccessSecret,
      apiKeyLength: twitterApiKey?.length,
      apiSecretLength: twitterApiSecret?.length,
      accessTokenLength: twitterAccessToken?.length,
      accessSecretLength: twitterAccessSecret?.length,
      runDuration,
    });

    // Validate Twitter credentials
    if (!twitterApiKey || !twitterApiSecret || !twitterAccessToken || !twitterAccessSecret) {
      return NextResponse.json({ error: 'All Twitter credentials are required' }, { status: 400 });
    }

    try {
      // Additional validation for credential format
      if (!twitterApiKey?.match(/^[A-Za-z0-9]+$/)) {
        return NextResponse.json(
          {
            error: 'Invalid API Key format. It should only contain letters and numbers.',
            field: 'twitterApiKey',
          },
          { status: 400 }
        );
      }

      if (!twitterAccessToken?.match(/^\d+-[A-Za-z0-9]+$/)) {
        return NextResponse.json(
          {
            error: 'Invalid Access Token format. It should be in the format: numbers-alphanumeric',
            field: 'twitterAccessToken',
          },
          { status: 400 }
        );
      }

      const agent = await initializeAgent(apiKey, {
        apiKey: twitterApiKey,
        apiSecretKey: twitterApiSecret,
        accessToken: twitterAccessToken,
        accessTokenSecret: twitterAccessSecret,
      });

      await agent.run(runDuration, { verbose: true });

      return NextResponse.json({
        status: 'success',
        message: 'Agent completed execution',
      });
    } catch (error) {
      console.error('Error initializing or running agent:', error);

      // Check for specific Twitter API errors
      if (error instanceof Error) {
        if (error.message.includes('write permissions')) {
          return NextResponse.json(
            {
              error: 'Twitter API Error: Write permissions required',
              details:
                'Your Twitter app needs write permissions. Please check your app settings in the Twitter Developer Portal.',
              code: 'WRITE_PERMISSION_REQUIRED',
            },
            { status: 403 }
          );
        } else if (error.message.includes('401')) {
          return NextResponse.json(
            {
              error: 'Twitter API Error: Invalid credentials',
              details: 'Please verify your Twitter API credentials are correct and not expired.',
              code: 'INVALID_CREDENTIALS',
            },
            { status: 401 }
          );
        }
      }

      return NextResponse.json(
        {
          error: 'Failed to authenticate with Twitter',
          details: error instanceof Error ? error.message : String(error),
          code: 'UNKNOWN_ERROR',
        },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Error running Twitter agent:', error);
    return NextResponse.json({ error: 'Failed to run Twitter agent' }, { status: 500 });
  }
}
