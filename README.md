# 🧮 Standard Matrix Calculator

A web application for computing standard matrices for linear transformations. Built with React, TypeScript, and Vite.

![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?logo=vite)

## 📖 Overview

This calculator helps you find the **standard matrix** $A$ for a linear transformation $T: \mathbb{R}^n \to \mathbb{R}^m$ given:
- A set of basis vectors for $\mathbb{R}^n$
- The images of those basis vectors under $T$

The standard matrix satisfies: $T(\mathbf{x}) = A\mathbf{x}$ for all $\mathbf{x} \in \mathbb{R}^n$

### Mathematical Background

Given:
- Matrix $B$ with basis vectors as columns
- Matrix $T_B$ with corresponding images as columns

The standard matrix is computed as: $A = T_B \cdot B^{-1}$

## ✨ Features

- **Flexible Dimensions**: Support for transformations between any $\mathbb{R}^n$ and $\mathbb{R}^m$ (dimensions 2-5)
- **Interactive Input**: Easy-to-use interface for entering basis vectors and their images
- **Step-by-Step Solutions**: Detailed computation steps showing the mathematical process
- **Built-in Examples**: Pre-loaded examples including:
  - 90° rotation in $\mathbb{R}^2$
  - Reflection across xy-plane in $\mathbb{R}^3$
- **Matrix Operations**: Includes matrix inversion using Gauss-Jordan elimination
- **Clean Display**: Formatted output with fraction support for cleaner results

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/standard-matrix-calculator.git
   cd standard-matrix-calculator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## 🎯 Usage

1. **Select Dimensions**: Choose the domain dimension $n$ and codomain dimension $m$
2. **Enter Basis Vectors**: Input the basis vectors for $\mathbb{R}^n$
3. **Enter Images**: For each basis vector, enter its image under the transformation $T$
4. **Compute**: Click "Compute Standard Matrix" to calculate the result
5. **View Steps**: Toggle "Show Computation Steps" to see the detailed solution

### Example: 90° Rotation

For a 90° counterclockwise rotation in $\mathbb{R}^2$:
- $T(\mathbf{e}_1) = T\begin{pmatrix}1\\0\end{pmatrix} = \begin{pmatrix}0\\1\end{pmatrix}$
- $T(\mathbf{e}_2) = T\begin{pmatrix}0\\1\end{pmatrix} = \begin{pmatrix}-1\\0\end{pmatrix}$

The standard matrix is:
$$A = \begin{pmatrix}0 & -1\\1 & 0\end{pmatrix}$$

## 📁 Project Structure

```
src/
├── App.tsx                 # Main application component
├── App.css                 # Global styles
├── components/
│   ├── BasisImagePair.tsx  # Input component for basis/image pairs
│   ├── ComputationSteps.tsx # Displays step-by-step solution
│   ├── DimensionSelector.tsx # Dimension input controls
│   ├── MatrixDisplay.tsx   # Renders matrix in formatted view
│   └── VectorInput.tsx     # Vector input component
├── types/
│   └── matrix.ts           # TypeScript type definitions
└── utils/
    └── matrixOperations.ts # Matrix math utilities
```

## 🛠️ Technologies

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **CSS Modules** - Scoped styling
- **ESLint** - Code linting

## 📝 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
