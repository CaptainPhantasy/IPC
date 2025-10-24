import { useCallback } from 'react';
import type { ReceivedChatMessage } from '@livekit/components-react';
import {
  formatTranscriptAsMarkdown,
  generateTranscriptFilename,
  createTranscriptBlob,
} from '@/lib/transcript-utils';

/**
 * Hook to handle transcript download functionality
 * @param messages Array of chat messages from the session
 * @returns downloadTranscript function to trigger the download
 */
export function useTranscriptDownload(messages: ReceivedChatMessage[]) {
  const downloadTranscript = useCallback(() => {
    if (messages.length === 0) {
      console.warn('No messages to download');
      return;
    }

    try {
      // Get browser locale for formatting
      const locale = navigator?.language ?? 'en-US';

      // Format the transcript as markdown
      const markdownContent = formatTranscriptAsMarkdown(messages, locale);

      // Create a blob from the content
      const blob = createTranscriptBlob(markdownContent);

      // Create a temporary URL for the blob
      const url = URL.createObjectURL(blob);

      // Generate filename with current timestamp
      const filename = generateTranscriptFilename(new Date());

      // Create a temporary anchor element to trigger download
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.style.display = 'none';

      // Append to body, click, and cleanup
      document.body.appendChild(link);
      link.click();

      // Cleanup
      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, 100);

      console.log(`Transcript downloaded: ${filename} (${messages.length} messages)`);
    } catch (error) {
      console.error('Failed to download transcript:', error);
    }
  }, [messages]);

  return { downloadTranscript };
}
