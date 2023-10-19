import React from 'react';
import styles from './molecules.module.css';

const Loading = () => {
  return (
    <div className={styles.loadingContainer}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        style={{ margin: 'auto', background: 'rgb(255, 255, 255)', display: 'block', shapeRendering: 'auto' }}
        width="150px" height="150px"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
      >
        <path d="M10 50A40 40 0 0 0 90 50A40 42 0 0 1 10 50" fill="#f87920" stroke="none">
          <animateTransform attributeName="transform" type="rotate" dur="1s" repeatCount="indefinite" keyTimes="0;1" values="0 50 51;360 50 51"></animateTransform>
        </path>
      </svg>
    </div>
  );
}

export default Loading;
