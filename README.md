# 🧮 Standard Matrix Calculator

A web application for computing standard matrices for linear transformations. Built with React, TypeScript, and Vite.

![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?logo=vite)

## 📖 Overview

The Standard Matrix Finder is an application developed to help users find the standard matrix of a linear transformation. The app allows users to input a basis for Rn along with the corresponding images of these vectors in Rm under a linear transformation T. Based on the given inputs, the application computes and displays the standard matrix that represents the transformation. This app is intended to make the process of working with linear transformations more convenient and easier to understand, especially for cases where n, m ≤  5.

### Mathematical Background

To find the standard matrix A for a linear transformation ℝⁿ → ℝᵐ such that *T(x) = Ax*  for all x ∈ ℝⁿ, we utilize the relationship between basis vectors and their images.

**Given Information:**

The calculations requires two primary pieces of data:

- Matrix B: A matrix where the columns are the chosen basic of vectors for ℝⁿ
- Matrix T<sub>B</sub>: A matrix where the columns are the corresponding images of those Basis vectors under the transformation T.

**The Formula:**

The standard matrix is computed by multiplying the image matrix by the inverse of the basis matrix:
<p align="center">
T<sub>B</sub> = B<sup>−1</sup> × A × B
</p>

      
**Computational Process:**

To arrive at the final result, the application performs the following steps:
- Matrix Inversion: The calculator computes B<sup>−1</sup> using Gauss-Jordan Elimination
- Matrix Multiplication: The image matrix T<sub>B</sub> is multiplied by the inverted basis matrix to find A.
- Fraction Formating: The output is displayed with fraction support to ensure clean and precise mathematical results.


## ✨ Features

- **Flexible Dimensions:** The system supports linear transformations between any ℝⁿ → ℝᵐ values that range from 2 to 5. This allows users to explore both square and non-square transformations, making the tool applicable to a wide range of linear algebra problems.

- **Interactive Input**: An intuitive and user-friendly interface enables users to easily input basis vectors along with their corresponding images under a transformation. This minimizes manual errors and makes the tool accessible even to users with minimal prior experience in linear algebra software.

- **Step-by-Step Solutions**: The application includes pre-loaded example problems to help users quickly understand functionality and concepts, such as:
  - A 90° rotation in ℝ<sup>2</sup>
  - A reflection across the xy-plane in ℝ<sup>3</sup>
    
- **Step-by-Step Solution Breakdown:** Each computation is presented in a detailed, sequential manner, clearly showing how the final transformation matrix is derived. Intermediate steps are displayed to help users understand the underlying mathematical process rather than just the final result.

- **Matrix Operations**: Core matrix operations are integrated into the system, including matrix inversion using the Gauss–Jordan elimination method. Each step of the elimination process is shown for transparency and instructional value.
- **Clean Display**: Results are presented in a well-formatted layout with support for fractional values instead of decimal approximations. This ensures mathematical accuracy and produces cleaner, more professional-looking outputs suitable for academic use.

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
---

### 1. Understand Your Linear Transformation

Before using the tool, identify your linear transformation **T**.  
It should be in the form:

- **Input (Domain):** A vector in ℝ<sup>n</sup> (dimension n)
  - Example: For ℝ<sup>3</sup>, vectors look like (x₁, x₂, x₃)

- **Output (Codomain):** A vector in ℝ<sup>m</sup> (dimension m)
  - Example: For ℝ<sup>2</sup>, outputs look like (y₁, y₂)

---

### 2. Select Dimensions

Choose the appropriate dimensions for your transformation:

- **Domain dimension (n):** Select from 1 to 5
  - This is the dimension of your input vectors
  - Example: If T takes 3-component vectors, select n = 3

- **Codomain dimension (m):** Select from 1 to 5
  - This is the dimension of your output vectors
  - Example: If T produces 2-component vectors, select m = 2

---

### 3. Enter Basis Vectors

The standard matrix is constructed by applying your transformation to each standard basis vector.

**For ℝ<sup>2</sup> space:**
- e₁ = (1, 0)
- e₂ = (0, 1)

**For ℝ<sup>3</sup> space:**
- e₁ = (1, 0, 0)
- e₂ = (0, 1, 0)
- e₃ = (0, 0, 1)

#### How to enter:
1. For each basis vector eᵢ, calculate T(eᵢ)
2. Enter the components of the result into the corresponding fields
3. Each column of the matrix represents T applied to one basis vector

---

### 4. Compute

Once all basis vector transformations are entered:

1. Click the **Compute Standard Matrix** button  
2. The tool will construct the matrix where:
   - Column 1 = T(e₁)
   - Column 2 = T(e₂)
   - Column 3 = T(e₃)
   - And so on…

---

### 5. Solutions

Toggle **Show Computation Steps** to see the detailed solution:

- How each basis vector was transformed
- Step-by-step matrix construction
- The logical process behind the calculation
- Detailed explanations of each step

---

### 6. Verification

Once you have your standard matrix **A**, verify it works by checking:

#### How to verify:
1. Choose any test vector (x₁, x₂, …, xₙ)
2. Multiply your standard matrix **A** by this vector
3. Apply the original transformation **T** to the same vector
4. Both results should be identical

---

### Transformation Types

The tool can help you find standard matrices for:

- **Rotations:** Rotating vectors by an angle
- **Reflections:** Mirroring vectors across a line or plane
- **Projections:** Projecting vectors onto a subspace
- **Scaling:** Stretching or shrinking vectors
- **Shearing:** Slanting transformations




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
