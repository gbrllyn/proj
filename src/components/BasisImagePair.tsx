import React from "react";
import { VectorInput } from "./VectorInput";
import type { BasisVector } from "../types/matrix";
import styles from "./BasisImagePair.module.css";

interface BasisImagePairProps {
  index: number;
  basisVector: BasisVector;
  onChange: (basisVector: BasisVector) => void;
  nDimension: number;
  mDimension: number;
}

export const BasisImagePair: React.FC<BasisImagePairProps> = ({
  index,
  basisVector,
  onChange,
  nDimension,
  mDimension,
}) => {
  return (
    <div className={styles.pair}>
      <div className={styles.header}>
        <span className={styles.title}>Vector {index + 1}</span>
      </div>
      <div className={styles.vectors}>
        <div className={styles.vectorGroup}>
          <span className={styles.vectorLabel}>Basis v₍{index + 1}₎</span>
          <VectorInput
            label=""
            vector={basisVector.basis}
            onChange={(basis) => onChange({ ...basisVector, basis })}
            dimension={nDimension}
          />
        </div>
        <div className={styles.arrow}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
          <span>T</span>
        </div>
        <div className={styles.vectorGroup}>
          <span className={styles.vectorLabel}>Image T(v₍{index + 1}₎)</span>
          <VectorInput
            label=""
            vector={basisVector.image}
            onChange={(image) => onChange({ ...basisVector, image })}
            dimension={mDimension}
          />
        </div>
      </div>
    </div>
  );
};
