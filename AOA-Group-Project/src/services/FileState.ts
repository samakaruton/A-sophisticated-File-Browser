type Callback = (highlightedFile: string | null) => void;

class FileStateManager {
  private highlightedFile: string | null = null;
  private listeners: Callback[] = [];

  // Get the current highlighted file
  getHighlightedFile(): string | null {
    return this.highlightedFile;
  }

  // Set a new highlighted file and notify listeners
  setHighlightedFile(newFile: string | null): void {
    this.highlightedFile = newFile;
    this.notifyListeners();
  }

  // Register a listener to be called on state changes
  addListener(callback: Callback): void {
    this.listeners.push(callback);
  }

  // Remove a listener
  removeListener(callback: Callback): void {
    this.listeners = this.listeners.filter((listener) => listener !== callback);
  }

  // Notify all listeners about the state change
  private notifyListeners(): void {
    this.listeners.forEach((callback) => callback(this.highlightedFile));
  }
}

// Export an instance of the FileStateManager
const fileStateManager = new FileStateManager();
export default fileStateManager;
