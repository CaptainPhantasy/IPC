export interface AppConfig {
  pageTitle: string;
  pageDescription: string;
  companyName: string;

  supportsChatInput: boolean;
  supportsVideoInput: boolean;
  supportsScreenShare: boolean;
  isPreConnectBufferEnabled: boolean;

  logo: string;
  startButtonText: string;
  accent: string;
  logoDark: string;
  accentDark: string;

  // for LiveKit Cloud Sandbox
  sandboxId?: string;
  agentName?: string;
}

export const APP_CONFIG_DEFAULTS: AppConfig = {
  companyName: 'Indianapolis Pickleball Club',
  pageTitle: 'Ace - Your Pickleball Club Assistant',
  pageDescription: 'Chat with Ace, the AI assistant embodying the spirit of Chris Sears and the Indianapolis Pickleball Club community',

  supportsChatInput: true,
  supportsVideoInput: false,
  supportsScreenShare: false,
  isPreConnectBufferEnabled: true,

  logo: '/ace-logo.svg',
  accent: '#FF6B35', // Pickleball orange/energy color
  logoDark: '/ace-logo-dark.svg',
  accentDark: '#FFB627', // Bright yellow for dark mode
  startButtonText: 'Talk to Ace',

  // for LiveKit Cloud Sandbox
  sandboxId: undefined,
  agentName: 'ace-assistant',
};
