// src/pages/DesktopPage.tsx
import React , {useState} from 'react';
import Breadcrumb from '../components/Breadcrumb';
import FileList from '../components/FileList';

const HomePage: React.FC = () => {
  const currentPath = "C:\\Home";
  const files = [
    { name: "Shortcut.lnk", size: "1 kb", modified: "Aug 8, 2023", contents: "Shortcut to applications" },
    { name: "Report.docx", size: "32 kb", modified: "Jul 15, 2023", contents: "Work report document" },
    // Add more files here
  ];

  const handleFileClick = (fileName: string) => {
    console.log(`File clicked: ${fileName}`);
    // Add logic to handle file click, such as opening the file
  };

  return (
    <div className="file-manager">
      <h1 className="file-manager-title">Currently Browsing: {currentPath}</h1>
      <Breadcrumb path={currentPath} />
      <FileList files={files} onFileClick={handleFileClick} />
    </div>
  );
};

export default HomePage;