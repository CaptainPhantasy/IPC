import Link from 'next/link';
import { ArrowLeft, Heart, Users, Zap } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/80">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <Link
            href="/ui"
            className="rounded-full bg-gradient-to-r from-orange-400 to-yellow-400 px-6 py-2 text-sm font-semibold text-white shadow-lg transition hover:shadow-xl"
          >
            Talk to Ace
          </Link>
        </div>
      </header>

      <main className="container mx-auto max-w-4xl px-6 py-16">
        {/* Hero */}
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-yellow-400" />
          <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
            About Ace
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            The AI voice assistant for Indianapolis Pickleball Club
          </p>
        </div>

        {/* Mission */}
        <section className="mb-16">
          <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
            Our Mission
          </h2>
          <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <p className="mb-4 text-lg text-gray-700 dark:text-gray-300">
              Ace embodies the charismatic spirit and enthusiasm of Chris Sears,
              the founder of Indianapolis Pickleball Club. Our mission is to make
              the club more accessible, connected, and welcoming for everyone -
              from first-time players to tournament veterans.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Through voice-first AI technology, Ace provides instant answers,
              personalized guidance, and genuine community connection - available
              24/7.
            </p>
          </div>
        </section>

        {/* What Ace Does */}
        <section className="mb-16">
          <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
            What Ace Can Do
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <ValueCard
              icon={<Heart />}
              title="Community Connection"
              description="Help members find partners, join events, and feel part of the club family"
            />
            <ValueCard
              icon={<Users />}
              title="Expert Guidance"
              description="Share pickleball knowledge, rules, techniques, and strategies"
            />
            <ValueCard
              icon={<Zap />}
              title="Instant Support"
              description="Answer questions about schedules, memberships, and club operations"
            />
          </div>
        </section>

        {/* About Chris Sears */}
        <section className="mb-16">
          <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
            About Chris Sears
          </h2>
          <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-orange-50 to-yellow-50 p-8 shadow-sm dark:border-gray-700 dark:from-gray-800 dark:to-gray-900">
            <p className="mb-4 text-lg text-gray-700 dark:text-gray-300">
              Chris Sears is the passionate founder of Indianapolis Pickleball
              Club, dedicated to growing the sport and building an inclusive
              community in the Indianapolis area.
            </p>
            <p className="mb-4 text-lg text-gray-700 dark:text-gray-300">
              Known for his infectious enthusiasm and welcoming spirit, Chris
              has created a space where players of all skill levels can come
              together to play, learn, and connect.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Ace carries forward Chris's vision - making pickleball accessible,
              fun, and community-focused for everyone in Indianapolis.
            </p>
          </div>
        </section>

        {/* Technology */}
        <section className="mb-16">
          <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
            The Technology
          </h2>
          <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <p className="mb-4 text-lg text-gray-700 dark:text-gray-300">
              Ace is built with cutting-edge AI technology to provide natural,
              real-time voice conversations:
            </p>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-orange-400" />
                <span>
                  <strong>LiveKit Agents</strong> - Real-time communication
                  infrastructure
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-orange-400" />
                <span>
                  <strong>OpenAI GPT-4</strong> - Advanced language understanding
                  and generation
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-orange-400" />
                <span>
                  <strong>Voice Synthesis</strong> - Natural-sounding speech that
                  captures Chris's warmth
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <div className="rounded-2xl bg-gradient-to-br from-orange-400 to-yellow-400 p-12 shadow-2xl">
            <h3 className="mb-4 text-3xl font-bold text-white">
              Ready to Chat with Ace?
            </h3>
            <p className="mb-8 text-lg text-white/90">
              Experience the future of club member support - start a conversation
              now!
            </p>
            <Link
              href="/ui"
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-semibold text-orange-600 shadow-lg transition hover:shadow-xl"
            >
              Talk to Ace
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-8 dark:border-gray-700 dark:bg-gray-800">
        <div className="container mx-auto px-6 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>© 2025 Indianapolis Pickleball Club. Founded by Chris Sears.</p>
        </div>
      </footer>
    </div>
  );
}

function ValueCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-yellow-400 text-white">
        {icon}
      </div>
      <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );
}
