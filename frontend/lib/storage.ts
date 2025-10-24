/**
 * Safe localStorage management with quota handling
 */

const STORAGE_PREFIX = 'lk-';

export interface StorageManager {
  getItem(key: string): string | null;
  setItem(key: string, value: string): boolean;
  removeItem(key: string): boolean;
  clearUserChoices(): void;
}

export const storageManager: StorageManager = {
  getItem: (key: string): string | null => {
    try {
      return localStorage.getItem(STORAGE_PREFIX + key);
    } catch {
      return null;
    }
  },

  setItem: (key: string, value: string): boolean => {
    try {
      localStorage.setItem(STORAGE_PREFIX + key, value);
      return true;
    } catch (error) {
      console.warn('Storage quota exceeded, attempting to clear old data');
      // Clear only LiveKit related items, not all localStorage
      try {
        storageManager.clearUserChoices();
        localStorage.setItem(STORAGE_PREFIX + key, value);
        return true;
      } catch (fallbackError) {
        console.error('Storage quota exceeded even after cleanup');
        return false;
      }
    }
  },

  removeItem: (key: string): boolean => {
    try {
      localStorage.removeItem(STORAGE_PREFIX + key);
      return true;
    } catch {
      return false;
    }
  },

  clearUserChoices: (): void => {
    try {
      // Clear only LiveKit-related keys, not all localStorage
      Object.keys(localStorage)
        .filter(key => key.startsWith(STORAGE_PREFIX))
        .forEach(key => localStorage.removeItem(key));
      console.log('Cleared LiveKit user choices from storage');
    } catch (error) {
      console.warn('Failed to clear user choices:', error);
    }
  }
};

// Fallback memory storage for critical settings
export class MemoryStorage {
  private data: { [key: string]: string } = {};

  getItem(key: string): string | null {
    return this.data[key] || null;
  }

  setItem(key: string, value: string): void {
    this.data[key] = value;
  }

  removeItem(key: string): void {
    delete this.data[key];
  }

  clear(): void {
    this.data = {};
  }
}

export const fallbackStorage = new MemoryStorage();
