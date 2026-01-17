export type Vector = number[];
export type Matrix = number[][];

export interface BasisVector {
  basis: Vector;
  image: Vector;
}

export interface TransformationInput {
  n: number; // dimension of domain R^n
  m: number; // dimension of codomain R^m
  basisVectors: BasisVector[];
}

export interface ComputationResult {
  standardMatrix: Matrix | null;
  error: string | null;
  steps: string[];
}
