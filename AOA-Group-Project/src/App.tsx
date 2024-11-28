import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SideMenu from './components/SideMenu';
import Ribbon from './components/Ribbon';
import HomePage from './pages/HomePage';
import DesktopPage from './pages/DesktopPage';
import DownloadsPage from './pages/DownloadsPage';
import DocumentsPage from './pages/DocumentsPage';
import HardDrivePage from './pages/HardDrivePage';
import NetworkPage from './pages/NetworkSharePage';
import CloudPage from './pages/CloudStoragePage';
import './App.css';
import './services/FilesService'

const App: React.FC = () => {
  // Add state for clipboard and selected file for global context
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [clipboard, setClipboard] = useState<{
    type: 'cut' | 'copy';
    filePath: string;
  } | null>(null);

  const refreshFiles = () => {
    // Add refresh logic if needed, this can be passed to child components
    console.log('Refreshing files...');
  };

  return (
    <Router>
      <div className="app-container">
        <SideMenu />
        <div className="main-content-wrapper">
          {/* Pass props for clipboard and file selection to Ribbon */}
          <Ribbon
            selectedFile={selectedFile}
            currentPath="/" // Default path, can change based on active route
            clipboard={clipboard}
            setClipboard={setClipboard}
            refreshFiles={refreshFiles}
          />
          <div className="content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/desktop"
                element={
                  <DesktopPage
                    selectedFile={selectedFile}
                    setSelectedFile={setSelectedFile}
                  />
                }
              />
              <Route
                path="/downloads"
                element={
                  <DownloadsPage
                    selectedFile={selectedFile}
                    setSelectedFile={setSelectedFile}
                  />
                }
              />
              <Route
                path="/documents"
                element={
                  <DocumentsPage
                    selectedFile={selectedFile}
                    setSelectedFile={setSelectedFile}
                  />
                }
              />
              <Route
                path="/harddrive"
                element={
                  <HardDrivePage
                    selectedFile={selectedFile}
                    setSelectedFile={setSelectedFile}
                  />
                }
              />
              <Route
                path="/network"
                element={
                  <NetworkPage
                    selectedFile={selectedFile}
                    setSelectedFile={setSelectedFile}
                  />
                }
              />
              <Route
                path="/cloud"
                element={
                  <CloudPage
                    selectedFile={selectedFile}
                    setSelectedFile={setSelectedFile}
                  />
                }
              />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
