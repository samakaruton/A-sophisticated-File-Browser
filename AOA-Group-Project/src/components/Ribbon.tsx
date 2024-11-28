import React, { useState, useEffect } from 'react';
import {
  FaPlus,
  FaCopy,
  FaCut,
  FaPaste,
  FaEdit,
  FaTrashAlt,
} from 'react-icons/fa';
import {
  createFile,
  createFolder,
  copyFile,
  cutFile,
  pasteFile,
  deleteFile,
  renameFile,
} from '../services/FilesService';
import fileStateManager from '../services/FileState'; // Import fileStateManager

interface RibbonProps {
  currentPath: string;
  clipboard: { type: 'cut' | 'copy'; filePath: string } | null;
  setClipboard: (clipboard: { type: 'cut' | 'copy'; filePath: string } | null) => void;
  refreshFiles: () => void; // Callback to refresh file list
}

const Ribbon: React.FC<RibbonProps> = ({
  currentPath,
  clipboard,
  setClipboard,
  refreshFiles,
}) => {
  const [highlightedFile, setHighlightedFile] = useState<string | null>(fileStateManager.getHighlightedFile());

  useEffect(() => {
    // Sync with fileStateManager
    const listener = (newFile: string | null) => setHighlightedFile(newFile);
    fileStateManager.addListener(listener);

    return () => {
      fileStateManager.removeListener(listener);
    };
  }, []);

  const handleCreateFile = async () => {
    const fileName = prompt('Enter the name of the new file:');
    if (fileName) {
      try {
        await createFile(currentPath, fileName);
        alert('File created successfully!');
        refreshFiles();
      } catch (err) {
        console.error('Error creating file:', err);
      }
    }
  };

  const handleCreateFolder = async () => {
    const folderName = prompt('Enter the name of the new folder:');
    if (folderName) {
      try {
        await createFolder(currentPath, folderName);
        alert('Folder created successfully!');
        refreshFiles();
      } catch (err) {
        console.error('Error creating folder:', err);
      }
    }
  };

  const handleRename = async () => {
    if (!highlightedFile) return alert('No file selected!');
    const newName = prompt('Enter the new name:');
    if (newName) {
      try {
        await renameFile(highlightedFile, newName);
        alert('File renamed successfully!');
        refreshFiles();
      } catch (err) {
        console.error('Error renaming file:', err);
      }
    }
  };

  const handleDelete = async () => {
    if (!highlightedFile) return alert('No file selected!');
    if (window.confirm('Are you sure you want to delete this file?')) {
      try {
        await deleteFile(highlightedFile);
        alert('File deleted successfully!');
        refreshFiles();
      } catch (err) {
        console.error('Error deleting file:', err);
      }
    }
  };

  const handleCopy = () => {
    if (!highlightedFile) return alert('No file selected!');
    setClipboard({ type: 'copy', filePath: highlightedFile });
    alert('File copied to clipboard.');
  };

  const handleCut = () => {
    if (!highlightedFile) return alert('No file selected!');
    setClipboard({ type: 'cut', filePath: highlightedFile });
    alert('File cut to clipboard.');
  };

  const handlePaste = async () => {
    if (!clipboard) return alert('Clipboard is empty!');
  
    try {
      // Use the currentPath as the destination folder
      const destinationPath = currentPath;
      const operation = clipboard.type;
      const { filePath: sourcePath } = clipboard;
  
      // Call the pasteFile service
      await pasteFile(sourcePath, destinationPath, operation);
      alert(`File ${operation === 'cut' ? 'moved' : 'copied'} successfully!`);
  
      if (operation === 'cut') {
        setClipboard(null); // Clear clipboard after a cut operation
      }
  
      refreshFiles(); // Refresh the file list in the current folder
    } catch (err) {
      console.error('Error pasting file:', err);
      alert('Failed to paste the file.');
    }
  };
  

  return (
    <div className="ribbon">
      <div className="ribbon-item" onClick={handleCreateFile}>
        <FaPlus /> <span>Create File</span>
      </div>
      <div className="ribbon-item" onClick={handleCreateFolder}>
        <FaPlus /> <span>Create Folder</span>
      </div>
      <div className="ribbon-item" onClick={handleCopy}>
        <FaCopy /> <span>Copy</span>
      </div>
      <div className="ribbon-item" onClick={handleCut}>
        <FaCut /> <span>Cut</span>
      </div>
      <div className="ribbon-item" onClick={handlePaste}>
        <FaPaste /> <span>Paste</span>
      </div>
      <div className="ribbon-item" onClick={handleRename}>
        <FaEdit /> <span>Rename</span>
      </div>
      <div className="ribbon-item" onClick={handleDelete}>
        <FaTrashAlt /> <span>Delete</span>
      </div>
    </div>
  );
};

export default Ribbon;

