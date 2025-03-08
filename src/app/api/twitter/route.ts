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
  // Initialize the native Twitter client with the provided credentials
  const nativeTwitterClient = new TwitterClient({
    apiKey: twitterConfig.apiKey,
    apiSecretKey: twitterConfig.apiSecretKey,
    accessToken: twitterConfig.accessToken,
    accessTokenSecret: twitterConfig.accessTokenSecret,
  });

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
}

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.GAME_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Game API key not configured' }, { status: 500 });
    }

    const body = await request.json();
    const {
      runDuration = 60,
      twitterApiKey,
      twitterApiSecret,
      twitterAccessToken,
      twitterAccessSecret,
    } = body;

    // Validate Twitter credentials
    if (!twitterApiKey || !twitterApiSecret || !twitterAccessToken || !twitterAccessSecret) {
      return NextResponse.json({ error: 'Twitter credentials are required' }, { status: 400 });
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
    console.error('Error running Twitter agent:', error);
    return NextResponse.json({ error: 'Failed to run Twitter agent' }, { status: 500 });
  }
}
