
import React, { useState, useEffect } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import FileList from '../components/FileList';
import { fetchFiles, getDownloadsPath } from '../services/FilesService';

const HardDrivePage: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<string | null>(null); // Desktop path starts as null until fetched
  const [files, setFiles] = useState<any[]>([]);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  // Fetch desktop path on component mount
  const fetchDownloadsPath = async () => {
    try {
      const downloadsPath = await getDownloadsPath(); // Fetch desktop path from API
      console.log('Fetched desktop path:', downloadsPath); // Add logging
      setCurrentPath(downloadsPath);
    } catch (err) {
      console.error('Error fetching desktop path:', err);
    }
  };

  // Load files for the current path
  const loadFiles = async () => {
    if (!currentPath) return;
    try {
      const fileData = await fetchFiles(currentPath); // Fetch files from API
      // Map files to include additional properties like size and description
      const filesWithDetails = fileData.map((file: any) => ({
        ...file,
        size: file.size || 0, // Set default size
        description: file.description || '', // Set default description
      }));
      setFiles(filesWithDetails);
    } catch (err) {
      console.error('Error fetching files:', err);
    }
  };

  // Fetch desktop path on mount
  useEffect(() => {
    fetchDownloadsPath();
  }, []);

  // Load files whenever the path changes
  useEffect(() => {
    loadFiles();
  }, [currentPath]);

  // Handle breadcrumb navigation
  const handleBreadcrumbClick = (path: string) => {
    setCurrentPath(path);
    setSelectedFile(null); // Clear selected file
  };

  // Handle file selection
  const handleFileSelect = (filePath: string) => {
    setSelectedFile(filePath);
  };

  if (!currentPath) {
    return <div>Loading hard drive...</div>; // Show loading message while fetching path
  }

  return (
    <div className="file-manager">
      <h1 className="file-manager-title">Currently Browsing: {currentPath}</h1>
      <Breadcrumb path={currentPath} onPathClick={handleBreadcrumbClick} />
      <FileList
        currentPath={currentPath}
        files={files}
        onFileSelect={handleFileSelect}
      />
    </div>
  );
};

export default HardDrivePage;
