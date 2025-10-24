'use client';

import Link from 'next/link';
import { Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AboutButtonProps {
  variant?: 'splash' | 'chat';
  className?: string;
}

export function AboutButton({ variant = 'splash', className }: AboutButtonProps) {
  if (variant === 'chat') {
    // Simple Info icon for chat interface
    return (
      <Link
        href="/about"
        className={cn(
          'inline-flex items-center justify-center rounded-full p-2',
          'bg-primary/10 hover:bg-primary/20 border border-primary/30',
          'text-primary transition-all duration-300',
          'hover:scale-110 hover:shadow-lg',
          className
        )}
        aria-label="About ACE"
      >
        <Info className="w-5 h-5" />
      </Link>
    );
  }

  // Animated gradient button for splash screen
  return (
    <Link href="/about" className={cn('inline-block', className)}>
      <button className="about-button-splash">
        <span className="flex items-center gap-2">
          <Info className="w-5 h-5" />
          About ACE
        </span>
      </button>
      <style jsx>{`
        .about-button-splash {
          padding: 12px 20px;
          border: none;
          font-size: 1rem;
          cursor: pointer;
          position: relative;
          background: linear-gradient(90deg, #5bfcc4, #f593e4, #71a4f0);
          border-radius: 12px;
          color: #fff;
          transition: all 0.3s ease;
          box-shadow:
            inset 0px 0px 5px #ffffffa9,
            inset 0px 35px 30px #000,
            0px 5px 10px #000000cc;
          text-shadow: 1px 1px 1px #000;
          display: inline-flex;
          align-items: center;
          gap: 5px;
        }
        .about-button-splash::before {
          content: '';
          position: absolute;
          inset: 0;
          margin: auto;
          border-radius: 12px;
          filter: blur(0);
          z-index: -1;
          box-shadow: none;
          background: conic-gradient(
            #00000000 80deg,
            #40baf7,
            #f34ad7,
            #5bfcc4,
            #00000000 280deg
          );
          transition: all 0.3s ease;
        }
        .about-button-splash:hover::before {
          filter: blur(15px);
        }
        .about-button-splash:active::before {
          filter: blur(5px);
          transform: translateY(1px);
        }
        .about-button-splash:active {
          box-shadow:
            inset 0px 0px 5px #ffffffa9,
            inset 0px 35px 30px #000;
          margin-top: 3px;
        }
      `}</style>
    </Link>
  );
}
