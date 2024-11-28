// src/pages/DocumentsPage.tsx
import React , {useState} from 'react';
import Breadcrumb from '../components/Breadcrumb';
import FileList from '../components/FileList';

const CloudStoragePage: React.FC = () => {
  const currentPath = "C:\\Cloud Storage";
  const files = [
    { name: "File8.docx", size: "25 kb", modified: "Mar 10, 2024", contents: "Document about project requirements" },
    { name: "File9.pdf", size: "12 kb", modified: "Jan 22, 2023", contents: "PDF of research paper" },
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

export default CloudStoragePage;