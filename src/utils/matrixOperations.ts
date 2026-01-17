import type {
  Matrix,
  Vector,
  BasisVector,
  ComputationResult,
} from "../types/matrix";

/**
 * Creates a zero matrix of size m x n
 */
export function createZeroMatrix(m: number, n: number): Matrix {
  return Array(m)
    .fill(null)
    .map(() => Array(n).fill(0));
}

/**
 * Creates an identity matrix of size n x n
 */
export function createIdentityMatrix(n: number): Matrix {
  const matrix = createZeroMatrix(n, n);
  for (let i = 0; i < n; i++) {
    matrix[i][i] = 1;
  }
  return matrix;
}

/**
 * Deep copies a matrix
 */
export function copyMatrix(matrix: Matrix): Matrix {
  return matrix.map((row) => [...row]);
}

/**
 * Transposes a matrix
 */
export function transposeMatrix(matrix: Matrix): Matrix {
  if (matrix.length === 0) return [];
  const rows = matrix.length;
  const cols = matrix[0].length;
  const result = createZeroMatrix(cols, rows);
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      result[j][i] = matrix[i][j];
    }
  }
  return result;
}

/**
 * Multiplies two matrices
 */
export function multiplyMatrices(A: Matrix, B: Matrix): Matrix | null {
  if (A.length === 0 || B.length === 0) return null;
  if (A[0].length !== B.length) return null;

  const m = A.length;
  const n = B[0].length;
  const p = B.length;

  const result = createZeroMatrix(m, n);
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      for (let k = 0; k < p; k++) {
        result[i][j] += A[i][k] * B[k][j];
      }
    }
  }
  return result;
}

/**
 * Computes the inverse of a matrix using Gauss-Jordan elimination
 * Returns null if the matrix is singular
 */
export function invertMatrix(matrix: Matrix): Matrix | null {
  const n = matrix.length;
  if (n === 0 || matrix[0].length !== n) return null;

  // Create augmented matrix [A | I]
  const augmented: Matrix = matrix.map((row, i) => {
    const identityRow = Array(n).fill(0);
    identityRow[i] = 1;
    return [...row, ...identityRow];
  });

  // Gauss-Jordan elimination
  for (let col = 0; col < n; col++) {
    // Find pivot
    let maxRow = col;
    for (let row = col + 1; row < n; row++) {
      if (Math.abs(augmented[row][col]) > Math.abs(augmented[maxRow][col])) {
        maxRow = row;
      }
    }

    // Swap rows
    [augmented[col], augmented[maxRow]] = [augmented[maxRow], augmented[col]];

    // Check for singular matrix
    if (Math.abs(augmented[col][col]) < 1e-10) {
      return null;
    }

    // Scale pivot row
    const pivot = augmented[col][col];
    for (let j = 0; j < 2 * n; j++) {
      augmented[col][j] /= pivot;
    }

    // Eliminate column
    for (let row = 0; row < n; row++) {
      if (row !== col) {
        const factor = augmented[row][col];
        for (let j = 0; j < 2 * n; j++) {
          augmented[row][j] -= factor * augmented[col][j];
        }
      }
    }
  }

  // Extract inverse from augmented matrix
  return augmented.map((row) => row.slice(n));
}

/**
 * Formats a number for display (handles floating point precision)
 */
export function formatNumber(num: number): string {
  if (Math.abs(num) < 1e-10) return "0";
  if (Math.abs(num - Math.round(num)) < 1e-10) {
    return Math.round(num).toString();
  }
  // Check for simple fractions
  for (let denom = 1; denom <= 12; denom++) {
    const numer = num * denom;
    if (Math.abs(numer - Math.round(numer)) < 1e-10) {
      const n = Math.round(numer);
      if (denom === 1) return n.toString();
      return `${n}/${denom}`;
    }
  }
  return num.toFixed(4).replace(/\.?0+$/, "");
}

/**
 * Computes the standard matrix for a linear transformation
 * Given basis vectors and their images under T
 *
 * The standard matrix A satisfies: T(x) = Ax for all x in R^n
 *
 * Algorithm:
 * 1. Form matrix B with basis vectors as columns
 * 2. Form matrix T_B with images as columns
 * 3. Standard matrix A = T_B * B^(-1)
 */
export function computeStandardMatrix(
  n: number,
  m: number,
  basisVectors: BasisVector[]
): ComputationResult {
  const steps: string[] = [];

  // Validate input
  if (basisVectors.length !== n) {
    return {
      standardMatrix: null,
      error: `Expected ${n} basis vectors, but received ${basisVectors.length}`,
      steps,
    };
  }

  // Validate vector dimensions
  for (let i = 0; i < n; i++) {
    if (basisVectors[i].basis.length !== n) {
      return {
        standardMatrix: null,
        error: `Basis vector ${i + 1} should have ${n} components`,
        steps,
      };
    }
    if (basisVectors[i].image.length !== m) {
      return {
        standardMatrix: null,
        error: `Image vector ${i + 1} should have ${m} components`,
        steps,
      };
    }
  }

  steps.push("Step 1: Form matrix B with basis vectors as columns");

  // Form matrix B (n x n) with basis vectors as columns
  const B: Matrix = createZeroMatrix(n, n);
  for (let j = 0; j < n; j++) {
    for (let i = 0; i < n; i++) {
      B[i][j] = basisVectors[j].basis[i];
    }
  }

  steps.push(
    `B = [${B.map((row) => `[${row.map(formatNumber).join(", ")}]`).join(
      ", "
    )}]`
  );

  steps.push("Step 2: Form matrix T_B with image vectors as columns");

  // Form matrix T_B (m x n) with images as columns
  const T_B: Matrix = createZeroMatrix(m, n);
  for (let j = 0; j < n; j++) {
    for (let i = 0; i < m; i++) {
      T_B[i][j] = basisVectors[j].image[i];
    }
  }

  steps.push(
    `T_B = [${T_B.map((row) => `[${row.map(formatNumber).join(", ")}]`).join(
      ", "
    )}]`
  );

  steps.push("Step 3: Compute B⁻¹ (inverse of B)");

  // Compute B inverse
  const B_inv = invertMatrix(B);
  if (!B_inv) {
    return {
      standardMatrix: null,
      error: "The basis vectors are linearly dependent (matrix B is singular)",
      steps,
    };
  }

  steps.push(
    `B⁻¹ = [${B_inv.map((row) => `[${row.map(formatNumber).join(", ")}]`).join(
      ", "
    )}]`
  );

  steps.push("Step 4: Compute standard matrix A = T_B × B⁻¹");

  // Compute A = T_B * B_inv
  const A = multiplyMatrices(T_B, B_inv);
  if (!A) {
    return {
      standardMatrix: null,
      error: "Matrix multiplication failed",
      steps,
    };
  }

  // Clean up floating point errors
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (Math.abs(A[i][j]) < 1e-10) A[i][j] = 0;
      if (Math.abs(A[i][j] - Math.round(A[i][j])) < 1e-10) {
        A[i][j] = Math.round(A[i][j]);
      }
    }
  }

  steps.push(
    `A = [${A.map((row) => `[${row.map(formatNumber).join(", ")}]`).join(
      ", "
    )}]`
  );
  steps.push("The standard matrix A satisfies T(x) = Ax for all x ∈ Rⁿ");

  return {
    standardMatrix: A,
    error: null,
    steps,
  };
}

/**
 * Creates standard basis vectors for R^n
 */
export function getStandardBasis(n: number): Vector[] {
  const basis: Vector[] = [];
  for (let i = 0; i < n; i++) {
    const e = Array(n).fill(0);
    e[i] = 1;
    basis.push(e);
  }
  return basis;
}
