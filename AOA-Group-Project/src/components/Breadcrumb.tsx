import React from 'react';

interface BreadcrumbProps {
  path?: string; // Mark as optional
  onPathClick: (path: string) => void;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ path = '', onPathClick }) => {
  // Default `path` to an empty string to avoid errors
  const segments = path.split('\\').filter(Boolean);

  const handleClick = (index: number) => {
    const newPath = segments.slice(0, index + 1).join('\\');
    onPathClick(newPath);
  };

  return (
    <div className="breadcrumb">
      {segments.length > 0 ? (
        segments.map((segment, index) => (
          <span
            key={index}
            className="breadcrumb-segment"
            onClick={() => handleClick(index)}
          >
            {segment}
          </span>
        ))
      ) : (
        <span className="breadcrumb-placeholder">No Path Available</span>
      )}
    </div>
  );
};

export default Breadcrumb;

