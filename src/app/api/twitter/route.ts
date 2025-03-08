import {
  ExecutableGameFunctionResponse,
  ExecutableGameFunctionStatus,
  GameAgent,
  GameFunction,
  GameWorker,
  LLMModel,
} from '@virtuals-protocol/game';
import { NextRequest, NextResponse } from 'next/server';

// Define the game functions
const postTweetFunction = new GameFunction({
  name: 'post_tweet',
  description: 'Post a tweet',
  args: [
    { name: 'tweet', description: 'The tweet content' },
    { name: 'tweet_reasoning', description: 'The reasoning behind the tweet' },
  ] as const,
  executable: async (args, logger) => {
    try {
      logger(`Posting tweet: ${args.tweet}`);
      logger(`Reasoning: ${args.tweet_reasoning}`);

      return new ExecutableGameFunctionResponse(ExecutableGameFunctionStatus.Done, 'Tweet posted');
    } catch (e) {
      return new ExecutableGameFunctionResponse(
        ExecutableGameFunctionStatus.Failed,
        'Failed to post tweet'
      );
    }
  },
});

const searchTweetsFunction = new GameFunction({
  name: 'search_tweets',
  description: 'Search tweets and return results',
  args: [
    { name: 'query', description: 'The query to search for' },
    { name: 'reasoning', description: 'The reasoning behind the search' },
  ] as const,
  executable: async (args, logger) => {
    try {
      const query = args.query;
      logger(`Searching tweets for query: ${query}`);

      return new ExecutableGameFunctionResponse(
        ExecutableGameFunctionStatus.Done,
        "Tweets searched here are the results: [{tweetId: 1, content: 'Hello World'}, {tweetId: 2, content: 'Goodbye World'}]"
      );
    } catch (e) {
      return new ExecutableGameFunctionResponse(
        ExecutableGameFunctionStatus.Failed,
        'Failed to search tweets'
      );
    }
  },
});

const replyToTweetFunction = new GameFunction({
  name: 'reply_to_tweet',
  description: 'Reply to a tweet',
  args: [
    { name: 'tweet_id', description: 'The tweet id to reply to' },
    { name: 'reply', description: 'The reply content' },
  ] as const,
  executable: async (args, logger) => {
    try {
      const tweetId = args.tweet_id;
      const reply = args.reply;
      logger(`Replying to tweet ${tweetId} with ${reply}`);

      return new ExecutableGameFunctionResponse(
        ExecutableGameFunctionStatus.Done,
        `Replied to tweet ${tweetId} with ${reply}`
      );
    } catch (e) {
      return new ExecutableGameFunctionResponse(
        ExecutableGameFunctionStatus.Failed,
        'Failed to reply to tweet'
      );
    }
  },
});

// Create a worker with the functions
const postTweetWorker = new GameWorker({
  id: 'twitter_main_worker',
  name: 'Twitter main worker',
  description: 'Worker that posts tweets',
  functions: [searchTweetsFunction, replyToTweetFunction, postTweetFunction],
  getEnvironment: async () => {
    return {
      tweet_limit: 15,
    };
  },
});

// Initialize agent function
async function initializeAgent(apiKey: string) {
  const agent = new GameAgent(apiKey, {
    name: 'Twitter Bot',
    goal: 'Search and reply to tweets',
    description: 'A bot that searches for tweets and replies to them',
    workers: [postTweetWorker],
    llmModel: LLMModel.DeepSeek_R1,
    getAgentState: async () => {
      return {
        username: 'twitter_bot',
        follower_count: 1000,
        tweet_count: 10,
      };
    },
  });

  // Set custom logger
  agent.setLogger((agent, msg) => {
    console.log(`-----[${agent.name}]-----`);
    console.log(msg);
    console.log('\n');
  });

  await agent.init();
  return agent;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { apiKey, runDuration = 60 } = body;

    if (!apiKey) {
      return NextResponse.json({ error: 'API key is required' }, { status: 400 });
    }

    const agent = await initializeAgent(apiKey);
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
