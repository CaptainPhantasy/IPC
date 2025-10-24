import { AboutButton } from '@/components/app/about-button';

interface WelcomeViewProps {
  startButtonText: string;
  onStartCall: () => void;
}

export const WelcomeView = ({
  onStartCall,
  ref,
}: React.ComponentProps<'div'> & WelcomeViewProps) => {
  return (
    <div
      ref={ref}
      className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-gradient-to-b from-gray-900 via-gray-800 to-black"
    >
      {/* About ACE button - top left with fixed positioning */}
      <div className="fixed top-6 left-6 z-50">
        <AboutButton variant="splash" />
      </div>
      {/* IPC Logo - responsive sizing for all screens */}
      <img
        src="/IPClogo.png"
        alt="Indianapolis Pickleball Club"
        className="w-full h-full object-contain md:max-w-2xl md:max-h-[80vh]"
        style={{
          maxHeight: '100vh',
          maxWidth: '100vw',
        }}
      />

      {/* "Chat" button positioned below the IPC logo */}
      <div className="absolute left-1/2 bottom-[15%] -translate-x-1/2 z-10">
        <button
          onClick={onStartCall}
          className="button-33"
          style={{
            backgroundColor: '#c2fbd7',
            borderRadius: '100px',
            boxShadow: 'rgba(44, 187, 99, .2) 0 -25px 18px -14px inset, rgba(44, 187, 99, .15) 0 1px 2px, rgba(44, 187, 99, .15) 0 2px 4px, rgba(44, 187, 99, .15) 0 4px 8px, rgba(44, 187, 99, .15) 0 8px 16px, rgba(44, 187, 99, .15) 0 16px 32px',
            color: 'green',
            cursor: 'pointer',
            display: 'inline-block',
            fontFamily: 'CerebriSans-Regular, -apple-system, system-ui, Roboto, sans-serif',
            padding: '7px 20px',
            textAlign: 'center',
            textDecoration: 'none',
            transition: 'all 250ms',
            border: '0',
            fontSize: '16px',
            userSelect: 'none',
            WebkitUserSelect: 'none',
            touchAction: 'manipulation',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = 'rgba(44,187,99,.35) 0 -25px 18px -14px inset, rgba(44,187,99,.25) 0 1px 2px, rgba(44,187,99,.25) 0 2px 4px, rgba(44,187,99,.25) 0 4px 8px, rgba(44,187,99,.25) 0 8px 16px, rgba(44,187,99,.25) 0 16px 32px';
            e.currentTarget.style.transform = 'scale(1.05) rotate(-1deg)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = 'rgba(44, 187, 99, .2) 0 -25px 18px -14px inset, rgba(44, 187, 99, .15) 0 1px 2px, rgba(44, 187, 99, .15) 0 2px 4px, rgba(44, 187, 99, .15) 0 4px 8px, rgba(44, 187, 99, .15) 0 8px 16px, rgba(44, 187, 99, .15) 0 16px 32px';
            e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
          }}
        >
          CHAT
        </button>
      </div>
    </div>
  );
};
