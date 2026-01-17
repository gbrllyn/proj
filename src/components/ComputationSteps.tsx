import React from "react";
import styles from "./ComputationSteps.module.css";

interface ComputationStepsProps {
  steps: string[];
}

export const ComputationSteps: React.FC<ComputationStepsProps> = ({
  steps,
}) => {
  if (steps.length === 0) return null;

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        Computation Steps
      </h3>
      <ol className={styles.stepsList}>
        {steps.map((step, index) => (
          <li key={index} className={styles.step}>
            <span className={styles.stepNumber}>{index + 1}</span>
            <span className={styles.stepText}>{step}</span>
          </li>
        ))}
      </ol>
    </div>
  );
};
