import React from 'react';
const LoadingSpinner = () => {
  return (
    <svg
      width="50"
      height="50"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className="animate-spin"
    >
      <path
        d="M19.5 12.5C19.5 11.12 19.12 9.81999 18.44 8.67999C17.76 7.53999 16.78 6.61 15.61 5.99C14.44 5.37 13.13 5.09 11.82 5.18C10.51 5.27 9.24996 5.73 8.15996 6.51C7.06996 7.29 6.19996 8.36 5.64996 9.61C5.09996 10.86 4.89996 12.23 5.05996 13.59C5.21996 14.95 5.73996 16.23 6.55996 17.31C7.37996 18.39 8.46996 19.22 9.71996 19.73"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M7 16C7.5 16.5 10.2 18.2 12 16C13.8 13.8 9 11.5 7 16Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default LoadingSpinner; 