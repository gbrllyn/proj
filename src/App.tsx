import { useState, useCallback, useEffect } from "react";
import type { BasisVector, ComputationResult } from "./types/matrix";
import { computeStandardMatrix } from "./utils/matrixOperations";
import { DimensionSelector } from "./components/DimensionSelector";
import { BasisImagePair } from "./components/BasisImagePair";
import { MatrixDisplay } from "./components/MatrixDisplay";
import { ComputationSteps } from "./components/ComputationSteps";
import "./App.css";

function App() {
  const [n, setN] = useState(2); // Domain dimension R^n
  const [m, setM] = useState(2); // Codomain dimension R^m
  const [basisVectors, setBasisVectors] = useState<BasisVector[]>([]);
  const [result, setResult] = useState<ComputationResult | null>(null);
  const [showSteps, setShowSteps] = useState(false);

  // Initialize basis vectors when dimensions change
  useEffect(() => {
    const newBasisVectors: BasisVector[] = [];
    for (let i = 0; i < n; i++) {
      const basis = Array(n).fill(0);
      const image = Array(m).fill(0);
      // Set up standard basis as default
      basis[i] = 1;
      newBasisVectors.push({ basis, image });
    }
    setBasisVectors(newBasisVectors);
    setResult(null);
  }, [n, m]);

  const handleBasisVectorChange = useCallback(
    (index: number, updated: BasisVector) => {
      setBasisVectors((prev) => {
        const newVectors = [...prev];
        newVectors[index] = updated;
        return newVectors;
      });
      setResult(null);
    },
    []
  );

  const handleCompute = useCallback(() => {
    const computationResult = computeStandardMatrix(n, m, basisVectors);
    setResult(computationResult);
    setShowSteps(true);
  }, [n, m, basisVectors]);

  const handleReset = useCallback(() => {
    const newBasisVectors: BasisVector[] = [];
    for (let i = 0; i < n; i++) {
      const basis = Array(n).fill(0);
      const image = Array(m).fill(0);
      basis[i] = 1;
      newBasisVectors.push({ basis, image });
    }
    setBasisVectors(newBasisVectors);
    setResult(null);
    setShowSteps(false);
  }, [n, m]);

  const loadExample = useCallback(() => {
    // Example: Rotation by 90 degrees in R^2
    if (n === 2 && m === 2) {
      setBasisVectors([
        { basis: [1, 0], image: [0, 1] },
        { basis: [0, 1], image: [-1, 0] },
      ]);
    } else if (n === 3 && m === 3) {
      // Example: Reflection across xy-plane in R^3
      setBasisVectors([
        { basis: [1, 0, 0], image: [1, 0, 0] },
        { basis: [0, 1, 0], image: [0, 1, 0] },
        { basis: [0, 0, 1], image: [0, 0, -1] },
      ]);
    } else {
      // Generic example with identity-like transformation
      const newBasisVectors: BasisVector[] = [];
      for (let i = 0; i < n; i++) {
        const basis = Array(n).fill(0);
        const image = Array(m).fill(0);
        basis[i] = 1;
        if (i < m) image[i] = i + 1;
        newBasisVectors.push({ basis, image });
      }
      setBasisVectors(newBasisVectors);
    }
    setResult(null);
  }, [n, m]);

  return (
    <div className="app">
      <header className="header">
        <h1>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
          </svg>
          Standard Matrix Finder
        </h1>
        <p className="subtitle">
          Find the standard matrix for linear transformation T : ℝⁿ → ℝᵐ
        </p>
      </header>

      <main className="main">
        <section className="section dimensions-section">
          <h2>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
            </svg>
            Dimensions
          </h2>
          <div className="dimension-selectors">
            <DimensionSelector
              label="Domain (n) - dimension of ℝⁿ"
              value={n}
              onChange={setN}
              min={1}
              max={5}
            />
            <DimensionSelector
              label="Codomain (m) - dimension of ℝᵐ"
              value={m}
              onChange={setM}
              min={1}
              max={5}
            />
          </div>
          <div className="transformation-info">
            <span className="transformation-label">
              T : ℝ{superscript(n)} → ℝ{superscript(m)}
            </span>
          </div>
        </section>

        <section className="section basis-section">
          <div className="section-header">
            <h2>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
              </svg>
              Basis Vectors & Images
            </h2>
            <button className="btn btn-secondary" onClick={loadExample}>
              Load Example
            </button>
          </div>
          <p className="section-description">
            Enter {n} linearly independent basis vectors for ℝ{superscript(n)}{" "}
            and their images under T
          </p>
          <div className="basis-pairs">
            {basisVectors.map((bv, index) => (
              <BasisImagePair
                key={index}
                index={index}
                basisVector={bv}
                onChange={(updated) => handleBasisVectorChange(index, updated)}
                nDimension={n}
                mDimension={m}
              />
            ))}
          </div>
        </section>

        <section className="section actions-section">
          <button className="btn btn-primary" onClick={handleCompute}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
              <path d="M22 4L12 14.01l-3-3" />
            </svg>
            Compute Standard Matrix
          </button>
          <button className="btn btn-secondary" onClick={handleReset}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
            Reset
          </button>
        </section>

        {result && (
          <section className="section result-section">
            <h2>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
              Result
            </h2>

            {result.error ? (
              <div className="error-message">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M15 9l-6 6M9 9l6 6" />
                </svg>
                <span>{result.error}</span>
              </div>
            ) : (
              result.standardMatrix && (
                <div className="result-content">
                  <div className="matrix-result">
                    <MatrixDisplay
                      matrix={result.standardMatrix}
                      label="Standard Matrix A"
                    />
                    <p className="matrix-equation">
                      T(x) = Ax for all x ∈ ℝ{superscript(n)}
                    </p>
                  </div>

                  <div className="steps-toggle">
                    <button
                      className="btn btn-ghost"
                      onClick={() => setShowSteps(!showSteps)}
                    >
                      {showSteps ? "Hide" : "Show"} Computation Steps
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        style={{
                          transform: showSteps ? "rotate(180deg)" : "none",
                        }}
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </button>
                  </div>

                  {showSteps && <ComputationSteps steps={result.steps} />}
                </div>
              )
            )}
          </section>
        )}
      </main>

      <footer className="footer">
        <p>Standard Matrix Finder — Linear Algebra Tool</p>
      </footer>
    </div>
  );
}

function superscript(n: number): string {
  const superscripts: Record<string, string> = {
    "0": "⁰",
    "1": "¹",
    "2": "²",
    "3": "³",
    "4": "⁴",
    "5": "⁵",
    "6": "⁶",
    "7": "⁷",
    "8": "⁸",
    "9": "⁹",
  };
  return n
    .toString()
    .split("")
    .map((d) => superscripts[d] || d)
    .join("");
}

export default App;
