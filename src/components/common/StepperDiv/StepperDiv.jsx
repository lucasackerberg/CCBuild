import styles from './StepperDiv.module.css';

export const StepperDiv = ({ children, heading }) => {
  return (
    <div className={styles.stepperDiv}>
      <div className={styles.headingDiv}>
        <h1>{heading}</h1>
        <p>Obligatoriska fält är markerade med stjärna (*)</p>
      </div>

      {children}
    </div>
  );
};
