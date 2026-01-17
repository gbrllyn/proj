import React, { useState, useEffect } from "react";
import type { Vector } from "../types/matrix";
import styles from "./VectorInput.module.css";

interface VectorInputProps {
  label: string;
  vector: Vector;
  onChange: (vector: Vector) => void;
  dimension: number;
  disabled?: boolean;
}

export const VectorInput: React.FC<VectorInputProps> = ({
  label,
  vector,
  onChange,
  dimension,
  disabled = false,
}) => {
  // Track string values for each input to allow empty fields while typing
  const [inputValues, setInputValues] = useState<string[]>(
    vector.map((v) => v.toString())
  );

  // Sync inputValues when vector prop changes externally
  useEffect(() => {
    setInputValues(vector.map((v) => v.toString()));
  }, [vector]);

  const handleChange = (index: number, value: string) => {
    // Update local string value immediately
    const newInputValues = [...inputValues];
    newInputValues[index] = value;
    setInputValues(newInputValues);

    // Update the numeric vector
    const newVector = [...vector];
    if (value === "" || value === "-") {
      newVector[index] = 0;
    } else {
      const parsed = parseFloat(value);
      newVector[index] = isNaN(parsed) ? 0 : parsed;
    }
    onChange(newVector);
  };

  const handleBlur = (index: number) => {
    // On blur, normalize the display value
    const newInputValues = [...inputValues];
    const value = inputValues[index];
    if (value === "" || value === "-") {
      newInputValues[index] = "0";
    } else {
      const parsed = parseFloat(value);
      newInputValues[index] = isNaN(parsed) ? "0" : parsed.toString();
    }
    setInputValues(newInputValues);
  };

  return (
    <div className={styles.vectorInput}>
      <span className={styles.label}>{label}</span>
      <div className={styles.bracket}>[</div>
      <div className={styles.inputs}>
        {Array(dimension)
          .fill(0)
          .map((_, i) => (
            <input
              key={i}
              type="number"
              value={inputValues[i] ?? "0"}
              onChange={(e) => handleChange(i, e.target.value)}
              onBlur={() => handleBlur(i)}
              className={styles.input}
              disabled={disabled}
              step="any"
            />
          ))}
      </div>
      <div className={styles.bracket}>]</div>
    </div>
  );
};
