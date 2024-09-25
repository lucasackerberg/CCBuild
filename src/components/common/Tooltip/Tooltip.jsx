import React, { useState } from 'react';
import styles from './Tooltip.module.css';

const Tooltip = ({ text, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className={styles.tooltipContainer}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className={styles.tooltipContent}>
          <div className={styles.tooltipArrow} />
          <div className={styles.tooltipText}>{text}</div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
