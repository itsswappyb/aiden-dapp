import Image from 'next/image';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';

export default function Home() {
  return (
    // <Layout>
    <div className="flex flex-col gap-16">
      {/* Hero Section */}
      <section className="relative py-20">
        <div className="absolute inset-0 bg-[#87fafd]/5 backdrop-blur-3xl"></div>
        <div className="max-w-screen-xl mx-auto px-4 relative">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gradient mb-6">
              Empower Your Web3 Community with AI
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Deploy autonomous AI agents to manage, engage, and grow your community across multiple
              platforms
            </p>
            <Link href="/dashboard" className="button-primary">
              Launch Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-screen-xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gradient mb-8">Platform Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Cards */}
            <div className="glass-card hover-accent p-6">
              <div className="mb-4">
                <div className="w-12 h-12 bg-[#87fafd]/10 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-accent"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Autonomous Agents</h3>
              <p className="text-white/70">
                AI-powered agents that automatically manage your community, moderate content, and
                engage with members
              </p>
            </div>

            <div className="glass-card hover-accent p-6">
              <div className="mb-4">
                <div className="w-12 h-12 bg-[#87fafd]/10 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-accent"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Multi-platform Integration</h3>
              <p className="text-white/70">
                Seamlessly integrate with Discord, Telegram, and X to manage your community across
                platforms
              </p>
            </div>

            <div className="glass-card hover-accent p-6">
              <div className="mb-4">
                <div className="w-12 h-12 bg-[#87fafd]/10 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-accent"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Analytics & Insights</h3>
              <p className="text-white/70">
                Deep analytics and insights into your community engagement and agent performance
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="glass-effect py-16">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-4xl font-bold text-gradient mb-2">24/7</h3>
              <p className="text-white/70">Community Management</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-gradient mb-2">3+</h3>
              <p className="text-white/70">Platforms Supported</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-gradient mb-2">100%</h3>
              <p className="text-white/70">Autonomous Operation</p>
            </div>
          </div>
        </div>
      </section>
    </div>
    // </Layout>
  );
}
