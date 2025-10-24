'use client';

import { useRef } from 'react';
import { AnimatePresence, motion, type Variants } from 'motion/react';
import { useRoomContext } from '@livekit/components-react';
import { useSession } from '@/components/app/session-provider';
import { SessionView } from '@/components/app/session-view';
import { WelcomeView } from '@/components/app/welcome-view';

const MotionWelcomeView = motion.create(WelcomeView);
const MotionSessionView = motion.create(SessionView);

const VIEW_VARIANTS: Variants = {
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.0, 0.0, 1.0, 1.0] as [number, number, number, number], // linear easing
    },
  },
  hidden: {
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: [0.0, 0.0, 1.0, 1.0] as [number, number, number, number], // linear easing
    },
  },
};

const VIEW_MOTION_PROPS = {
  variants: VIEW_VARIANTS,
  initial: 'hidden' as const,
  animate: 'visible' as const,
  exit: 'hidden' as const,
};

export function ViewController() {
  const room = useRoomContext();
  const isSessionActiveRef = useRef(false);
  const { appConfig, isSessionActive, startSession } = useSession();

  // animation handler holds a reference to stale isSessionActive value
  isSessionActiveRef.current = isSessionActive;

  // disconnect room after animation completes
  const handleAnimationComplete = () => {
    if (!isSessionActiveRef.current && room.state !== 'disconnected') {
      room.disconnect();
    }
  };

  return (
    <AnimatePresence mode="wait">
      {/* Welcome screen */}
      {!isSessionActive && (
        <MotionWelcomeView
          key="welcome"
          {...VIEW_MOTION_PROPS}
          startButtonText={appConfig.startButtonText}
          onStartCall={startSession}
        />
      )}
      {/* Session view */}
      {isSessionActive && (
        <MotionSessionView
          key="session-view"
          {...VIEW_MOTION_PROPS}
          appConfig={appConfig}
          onAnimationComplete={handleAnimationComplete}
        />
      )}
    </AnimatePresence>
  );
}
