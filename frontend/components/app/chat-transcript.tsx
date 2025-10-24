'use client';

import { AnimatePresence, type HTMLMotionProps, motion, type Variants } from 'motion/react';
import { type ReceivedChatMessage } from '@livekit/components-react';
import { ChatEntry } from '@/components/livekit/chat-entry';

const MotionContainer = motion.create('div');
const MotionChatEntry = motion.create(ChatEntry);

const CONTAINER_VARIANTS: Variants = {
  hidden: {
    opacity: 0,
    transition: {
      ease: [0.4, 0.0, 0.2, 1] as [number, number, number, number],
      duration: 0.3,
      staggerChildren: 0.1,
      staggerDirection: -1,
    },
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.2,
      ease: [0.4, 0.0, 0.2, 1] as [number, number, number, number],
      duration: 0.3,
      staggerChildren: 0.1,
      staggerDirection: 1,
    },
  },
};

const CONTAINER_MOTION_PROPS = {
  variants: CONTAINER_VARIANTS,
  initial: 'hidden' as const,
  animate: 'visible' as const,
  exit: 'hidden' as const,
};

const MESSAGE_VARIANTS: Variants = {
  hidden: {
    opacity: 0,
    translateY: 10,
  },
  visible: {
    opacity: 1,
    translateY: 0,
  },
};

const MESSAGE_MOTION_PROPS = {
  variants: MESSAGE_VARIANTS,
};

interface ChatTranscriptProps {
  hidden?: boolean;
  messages?: ReceivedChatMessage[];
}

export function ChatTranscript({
  hidden = false,
  messages = [],
  ...props
}: ChatTranscriptProps & Omit<HTMLMotionProps<'div'>, 'ref'>) {
  return (
    <AnimatePresence>
      {!hidden && (
        <MotionContainer {...CONTAINER_MOTION_PROPS} {...props}>
          {messages.map(({ id, timestamp, from, message, editTimestamp }: ReceivedChatMessage) => {
            const locale = navigator?.language ?? 'en-US';
            const messageOrigin = from?.isLocal ? 'local' : 'remote';
            const hasBeenEdited = !!editTimestamp;

            return (
              <MotionChatEntry
                key={id}
                locale={locale}
                timestamp={timestamp}
                message={message}
                messageOrigin={messageOrigin}
                hasBeenEdited={hasBeenEdited}
                {...MESSAGE_MOTION_PROPS}
              />
            );
          })}
        </MotionContainer>
      )}
    </AnimatePresence>
  );
}
