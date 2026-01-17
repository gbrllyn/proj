import React from "react";
import type { Matrix } from "../types/matrix";
import { formatNumber } from "../utils/matrixOperations";
import styles from "./MatrixDisplay.module.css";

interface MatrixDisplayProps {
  matrix: Matrix;
  label?: string;
}

export const MatrixDisplay: React.FC<MatrixDisplayProps> = ({
  matrix,
  label,
}) => {
  if (matrix.length === 0) return null;

  return (
    <div className={styles.container}>
      {label && <div className={styles.label}>{label}</div>}
      <div className={styles.matrixWrapper}>
        <div className={styles.bracketLeft}></div>
        <div className={styles.matrix}>
          {matrix.map((row, i) => (
            <div key={i} className={styles.row}>
              {row.map((cell, j) => (
                <div key={j} className={styles.cell}>
                  {formatNumber(cell)}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className={styles.bracketRight}></div>
      </div>
    </div>
  );
};
