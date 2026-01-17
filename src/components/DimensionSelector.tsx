import React from "react";
import styles from "./DimensionSelector.module.css";

interface DimensionSelectorProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export const DimensionSelector: React.FC<DimensionSelectorProps> = ({
  label,
  value,
  onChange,
  min = 1,
  max = 5,
}) => {
  return (
    <div className={styles.selector}>
      <span className={styles.label}>{label}</span>
      <div className={styles.buttons}>
        {Array.from({ length: max - min + 1 }, (_, i) => min + i).map((num) => (
          <button
            key={num}
            className={`${styles.button} ${value === num ? styles.active : ""}`}
            onClick={() => onChange(num)}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
};
