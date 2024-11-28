// src/FileManager.tsx
import React from 'react';
import Breadcrumb from './components/Breadcrumb';
import FileList from './components/FileList';

interface FileData {
  name: string;
  size: string;
  modified: string;
  contents: string;
}

const FileManager: React.FC = () => {
  const currentPath = "c:\\my documents";
  const files: FileData[] = [
    { name: "File1.xyz", size: "719 bytes", modified: "Apr 20, 2024", contents: "Text file with 1000 random numbers" },
    { name: "File2.abc", size: "83.3 kb", modified: "Oct 7, 2024", contents: "PDF about a software project" },
    { name: "File3.efg", size: "15.5 gb", modified: "Jun 17, 2009", contents: "Movie about a student who became a top coder" },
    { name: "File4.qrs", size: "26.4 mb", modified: "May 29, 2010", contents: "Photograph of a blue house on a brown hill" },
  ];

  return (
    <div className="file-manager">
      <h1 className="file-manager-title">Sophisticated File Browser</h1>
      <Breadcrumb path={currentPath} />
      <FileList files={files} />
    </div>
  );
};

export default FileManager;
