import Link from 'next/link';
import { ArrowRight, Users, Calendar, Trophy, MessageCircle } from 'lucide-react';
import { APP_CONFIG_DEFAULTS } from '@/app-config';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-orange-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/80">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-400 to-yellow-400" />
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Ace
              </h1>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Indianapolis Pickleball Club
              </p>
            </div>
          </div>
          <nav className="flex items-center gap-4">
            <Link
              href="/about"
              className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              About
            </Link>
            <Link
              href="/ui"
              className="rounded-full bg-gradient-to-r from-orange-400 to-yellow-400 px-6 py-2 text-sm font-semibold text-white shadow-lg transition hover:shadow-xl"
            >
              {APP_CONFIG_DEFAULTS.startButtonText}
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="container mx-auto px-6 py-20 text-center">
          <div className="mx-auto max-w-3xl">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-orange-700 dark:bg-orange-900/30 dark:text-orange-300">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500"></span>
              </span>
              AI-Powered Assistant
            </div>

            <h2 className="mb-6 text-5xl font-bold leading-tight text-gray-900 dark:text-white md:text-6xl">
              Meet Ace,
              <br />
              <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                Your Pickleball Partner
              </span>
            </h2>

            <p className="mb-10 text-lg text-gray-600 dark:text-gray-300 md:text-xl">
              Embodying the charismatic spirit of Chris Sears, Ace is your 24/7
              voice assistant for all things Indianapolis Pickleball Club. Get
              answers, find games, and connect with our community.
            </p>

            <Link
              href="/ui"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-400 to-yellow-400 px-8 py-4 text-lg font-semibold text-white shadow-2xl transition hover:shadow-orange-500/50"
            >
              {APP_CONFIG_DEFAULTS.startButtonText}
              <ArrowRight className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </section>

        {/* Features */}
        <section className="border-t border-gray-200 bg-white py-20 dark:border-gray-700 dark:bg-gray-800">
          <div className="container mx-auto px-6">
            <h3 className="mb-12 text-center text-3xl font-bold text-gray-900 dark:text-white">
              How Ace Can Help
            </h3>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <FeatureCard
                icon={<MessageCircle />}
                title="Ask Questions"
                description="Get instant answers about rules, techniques, and club information"
              />
              <FeatureCard
                icon={<Users />}
                title="Find Players"
                description="Connect with members and find partners for your skill level"
              />
              <FeatureCard
                icon={<Calendar />}
                title="Event Info"
                description="Stay updated on open play, clinics, and social events"
              />
              <FeatureCard
                icon={<Trophy />}
                title="Tournament Details"
                description="Learn about upcoming tournaments and how to participate"
              />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-6 py-20 text-center">
          <div className="mx-auto max-w-2xl rounded-2xl bg-gradient-to-br from-orange-400 to-yellow-400 p-12 shadow-2xl">
            <h3 className="mb-4 text-3xl font-bold text-white">
              Ready to Get Started?
            </h3>
            <p className="mb-8 text-lg text-white/90">
              Ace is standing by to help you with anything pickleball-related.
              Just click the button and start talking!
            </p>
            <Link
              href="/ui"
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-semibold text-orange-600 shadow-lg transition hover:shadow-xl"
            >
              {APP_CONFIG_DEFAULTS.startButtonText}
              <ArrowRight />
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-8 dark:border-gray-700 dark:bg-gray-800">
        <div className="container mx-auto px-6 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>
            © 2025 Indianapolis Pickleball Club. Founded by Chris Sears.
          </p>
          <p className="mt-2">
            Powered by{' '}
            <a
              href="https://livekit.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-500 hover:text-orange-600"
            >
              LiveKit
            </a>{' '}
            and{' '}
            <a
              href="https://openai.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-500 hover:text-orange-600"
            >
              OpenAI
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-gradient-to-b from-white to-gray-50 p-6 shadow-sm transition hover:shadow-md dark:border-gray-700 dark:from-gray-800 dark:to-gray-900">
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-yellow-400 text-white">
        {icon}
      </div>
      <h4 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
        {title}
      </h4>
      <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );
}
