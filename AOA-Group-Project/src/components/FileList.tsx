import React, { useState, useEffect } from 'react';
import { openFile, openFolder } from '../services/FilesService';
import fileStateManager from '../services/FileState';

interface FileData {
  name: string;
  path: string;
  is_directory: boolean;
  size: number;
  description: string; // Description (empty for now)
}

interface FileListProps {
  currentPath: string;
  files: FileData[];
  onFileSelect: (filePath: string) => void;
}

const FileList: React.FC<FileListProps> = ({ currentPath, files, onFileSelect }) => {
  const [highlightedFile, setHighlightedFile] = useState<string | null>(fileStateManager.getHighlightedFile());
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  useEffect(() => {
    // Sync with fileStateManager
    const listener = (newFile: string | null) => setHighlightedFile(newFile);
    fileStateManager.addListener(listener);

    return () => {
      fileStateManager.removeListener(listener);
    };
  }, []);

  const getFileIcon = (file: FileData) => {
    // Logic for setting file icon based on type
    if (file.is_directory) return '📁'; // Folder icon for directories
    const extension = file.name.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'txt':
        return '📝'; // Text file
      case 'jpg':
      case 'png':
        return '🖼️'; // Image file
      case 'pdf':
        return '📄'; // PDF file
      case 'docx':
        return '📄'; // Word document
      default:
        return '📎'; // Default file icon
    }
  };

  const handleFileClick = (filePath: string, isDirectory: boolean) => {
    fileStateManager.setHighlightedFile(filePath); // Update global state
    setSelectedFile(filePath);
    onFileSelect(filePath);
  
    if (isDirectory) {
      console.log('Directory selected:', filePath); // Log directory selection
    } else {
      console.log('File selected:', filePath); // Log file selection
    }
  };
  
  const handleFileDoubleClick = async (file: FileData) => {
    if (file.is_directory) {
      try {
        await openFolder(file.path); // Open the folder
        console.log(`Folder opened: ${file.name}`);
      } catch (err) {
        console.error('Error opening folder:', err);
      }
    } else {
      try {
        await openFile(file.path); // Open the file
        console.log(`File opened: ${file.name}`);
      } catch (err) {
        console.error('Error opening file:', err);
      }
    }
  };
  

  return (
    <div className="file-list">
      <table className="file-table">
        <thead>
          <tr>
            <th>Icon</th>
            <th>File Name</th>
            <th>Size</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file) => (
            <tr
              key={file.path}
              className={`file-list-item ${highlightedFile === file.path ? 'highlighted' : ''}`}
              onClick={() => handleFileClick(file.path, file.is_directory)}
              onDoubleClick={() => handleFileDoubleClick(file)}
            >
              <td className="file-icon">{getFileIcon(file)}</td>
              <td className="file-name">{file.name}</td>
              <td className="file-size">{file.size} KB</td>
              <td className="file-description">{file.description || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FileList;


