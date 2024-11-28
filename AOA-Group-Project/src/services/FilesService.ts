// src/services/FileService.ts
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:5000/api';

export const fetchFiles = async (path: string) => {
  const response = await axios.get(`${API_BASE_URL}/files`, {
    params: { path },
  });
  return response.data;
};

export const getDesktopPath = async () => {
    
    try {
        const response = await axios.get(`${API_BASE_URL}/desktop-path`); // Call the backend API
        const data = response.data; // Extract the response data
        console.log('Desktop path API response:', data); // Debugging: log the response
    
        if (response.status === 200 && data.path) {
          return data.path; // Return the desktop path
        } else {
          throw new Error(data.error || 'Failed to fetch desktop path'); // Handle API errors
        }
      } catch (error: any) {
        console.error('Error fetching desktop path:', error.message || error);
        throw error; // Rethrow the error to handle it in the calling function
      }
    
  };

  export const getDocumentsPath = async () => {
    
    try {
        const response = await axios.get(`${API_BASE_URL}/documents-path`); // Call the backend API
        const data = response.data; // Extract the response data
        console.log('Document path API response:', data); // Debugging: log the response
    
        if (response.status === 200 && data.path) {
          return data.path; // Return the desktop path
        } else {
          throw new Error(data.error || 'Failed to fetch document path'); // Handle API errors
        }
      } catch (error: any) {
        console.error('Error fetching document path:', error.message || error);
        throw error; // Rethrow the error to handle it in the calling function
      }
    
  };

  export const getHardDrivePath = async () => {
    
    try {
        const response = await axios.get(`${API_BASE_URL}/Hard-Drive-path`); // Call the backend API
        const data = response.data; // Extract the response data
        console.log('Hard Drive path API response:', data); // Debugging: log the response
    
        if (response.status === 200 && data.path) {
          return data.path; // Return the desktop path
        } else {
          throw new Error(data.error || 'Failed to fetch Hard Drive path'); // Handle API errors
        }
      } catch (error: any) {
        console.error('Error fetching document path:', error.message || error);
        throw error; // Rethrow the error to handle it in the calling function
      }
    
  };

  export const getDownloadsPath = async () => {
    
    try {
        const response = await axios.get(`${API_BASE_URL}/download-path`); // Call the backend API
        const data = response.data; // Extract the response data
        console.log('Download path API response:', data); // Debugging: log the response
    
        if (response.status === 200 && data.path) {
          return data.path; // Return the desktop path
        } else {
          throw new Error(data.error || 'Failed to fetch Downloads path'); // Handle API errors
        }
      } catch (error: any) {
        console.error('Error fetching download path:', error.message || error);
        throw error; // Rethrow the error to handle it in the calling function
      }
    
  };
  
  

export const openFile = async (filePath: string) => {
  const response = await axios.post(`${API_BASE_URL}/open`, { filePath });
  return response.data;
};

export const openFolder = async (folderPath: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/open-folder`, { folderPath });
    return response.data;
  } catch (error) {
    console.log("Folder not opened");
    throw error;
  }
};


export const copyFile = async (source: string, destination: string) => {
  const response = await axios.post(`${API_BASE_URL}/copy`, {
    filePath: source,
    destinationPath: destination,
  });
  return response.data;
};

export const cutFile = async (source: string, destination: string) => {
  const response = await axios.post(`${API_BASE_URL}/cut`, {
    filePath: source,
    destinationPath: destination,
  });
  return response.data;
};

export const deleteFile = async (filePath: string) => {
  const response = await axios.delete(`${API_BASE_URL}/delete`, {
    data: { filePath },
  });
  return response.data;
};

export const renameFile = async (filePath: string, newName: string) => {
  const response = await axios.put(`${API_BASE_URL}/rename`, {
    filePath,
    newName,
  });
  return response.data;
};

export const createFile = async (path: string, fileName: string) => {
    const response = await axios.post(`${API_BASE_URL}/create_file`, {
      path,
      fileName,
    });
    return response.data;
  };
  
  export const createFolder = async (path: string, folderName: string) => {
    const response = await axios.post(`${API_BASE_URL}/create_folder`, {
      path,
      folderName,
    });
    return response.data;
  };
  
  export const pasteFile = async (
    sourcePath: string,
    destinationPath: string,
    operation: 'copy' | 'cut'
  ) => {
    const response = await axios.post(`${API_BASE_URL}/paste_file`, {
      sourcePath,
      destinationPath,
      operation,
    });
    return response.data;
  };
  
