'use client';

import { AnimatePresence, motion, type Variants } from 'motion/react';
import { type ReceivedChatMessage } from '@livekit/components-react';
import { ShimmerText } from '@/components/livekit/shimmer-text';
import { cn } from '@/lib/utils';

const MotionMessage = motion.create('p');

const VIEW_VARIANTS: Variants = {
  visible: {
    opacity: 1,
    transition: {
      ease: [0.4, 0.0, 0.2, 1] as [number, number, number, number],
      duration: 0.5,
      delay: 0.8,
    },
  },
  hidden: {
    opacity: 0,
    transition: {
      ease: [0.4, 0.0, 0.2, 1] as [number, number, number, number],
      duration: 0.5,
      delay: 0,
    },
  },
};

const VIEW_MOTION_PROPS = {
  variants: VIEW_VARIANTS,
  initial: 'hidden' as const,
  animate: 'visible' as const,
  exit: 'hidden' as const,
};

interface PreConnectMessageProps {
  messages?: ReceivedChatMessage[];
  className?: string;
}

export function PreConnectMessage({ className, messages = [] }: PreConnectMessageProps) {
  return (
    <AnimatePresence>
      {messages.length === 0 && (
        <MotionMessage
          {...VIEW_MOTION_PROPS}
          aria-hidden={messages.length > 0}
          className={cn('pointer-events-none text-center', className)}
        >
          <ShimmerText className="text-sm font-semibold">
            I'm listening. Share what's on your mind.
          </ShimmerText>
        </MotionMessage>
      )}
    </AnimatePresence>
  );
}
