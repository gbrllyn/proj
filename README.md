# 🧮 Standard Matrix Calculator

A web application for computing standard matrices for linear transformations. Built with React, TypeScript, and Vite.

![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?logo=vite)

<h2 align="center">Project Team</h2>

<p align="center"><strong>Tester & Linear Algebra Specialist</strong><br>
Kurt Hann Lucero</p>

<p align="center"><strong>Backend Developer</strong><br>
Marc Lowel Castillo<br>
Gemicah Gem Espiritu</p>

<p align="center"><strong>Frontend Developer / UI/UX</strong><br>
Wiyana Gabrielle Epetia</p>

<p align="center"><strong>Documentation Writer</strong><br>
Hannah Samantha Regencia<br>
Gemicah Gem Espiritu</p>

---

## 📘 Project Overview

The **Standard Matrix Finder** is an application developed to help users compute the **standard matrix** of a linear transformation.

The application allows users to input a basis for ℝ<sup>n</sup> along with the corresponding images of these vectors in ℝ<sup>m</sup> under a linear transformation **T**.  
Based on the given inputs, the system computes and displays the standard matrix that represents the transformation.

This tool is designed to make working with linear transformations more convenient and easier to understand, especially for cases where  
**n, m ≤ 5**.

---

## 📐 Mathematical Background

To find the standard matrix **A** for a linear transformation from ℝ<sup>n</sup> to ℝ<sup>m</sup> such that:

<p align="center">
<strong>T(x) = Ax</strong> &nbsp; for all &nbsp; <strong>x ∈ ℝ<sup>n</sup></strong>
</p>

we use the relationship between **basis vectors** and their **images** under the transformation.

---

### Given Information

The calculation requires two primary pieces of data:

- **Matrix B**  
  A matrix whose columns are the chosen basis vectors of ℝ<sup>n</sup>

- **Matrix T<sub>B</sub>**  
  A matrix whose columns are the images of those basis vectors under the transformation **T**

---

### Formula

<p align="center">
<strong>A = T<sub>B</sub> × B<sup>−1</sup></strong>
</p>

Where:
- **B<sup>−1</sup>** is the inverse of the basis matrix **B**
- **T<sub>B</sub>** contains the transformed basis vectors

---

## ⚙️ Computational Process

To arrive at the final result, the application performs the following steps:

1. **Matrix Inversion**  
   - Computes **B<sup>−1</sup>** using **Gauss–Jordan Elimination**

2. **Matrix Multiplication**  
   - Multiplies **T<sub>B</sub>** by **B<sup>−1</sup>** to obtain the standard matrix **A**

3. **Fraction Formatting**  
   - Displays results using fractions instead of decimal approximations for clean and precise mathematical output

---

## 🔑 Key Features

### Flexible Dimensional Support
The system supports linear transformations between ℝ<sup>n</sup> and ℝ<sup>m</sup> for values ranging from **2 to 5**.  
This allows exploration of both square and non-square transformations across a wide range of linear algebra problems.

---

### Interactive Input
An intuitive and user-friendly interface allows users to easily input:
- Basis vectors
- Corresponding images under the transformation **T**

This minimizes manual errors and makes the tool accessible even to users with minimal prior experience in linear algebra software.

---

### Clean and Readable Output Display
Results are presented in a well-formatted layout with support for **fractional values** instead of decimal approximations.  
This ensures mathematical accuracy and produces clean, professional outputs suitable for academic use.

---

### Advanced Matrix Operations
Core matrix operations are integrated into the system, including:
- Matrix inversion using the **Gauss–Jordan elimination** method
- Step-by-step display of the elimination process for transparency and instructional value

---

### Built-in Sample Transformations
The application includes pre-loaded example problems such as:

- **90° rotation** in ℝ<sup>2</sup>
- **Reflection across the xy-plane** in ℝ<sup>3</sup>

---

### Step-by-Step Solution Breakdown
Each computation is presented in a detailed, sequential manner, clearly showing how the final transformation matrix is derived.  
Intermediate steps are displayed to help users understand the underlying mathematical process—not just the final result.

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

## How to Use the Standard Matrix Finder

### 1. Understand Your Linear Transformation
Before using the tool, identify your linear transformation $T$. It should be in the form:
* **Input (Domain):** A vector in $R^n$ (dimension n)
    * Example: For $R^3$, vectors look like $(x_1, x_2, x_3)$
* **Output (Codomain):** A vector in $R^m$ (dimension m)
    * Example: For $R^2$, outputs look like $(y_1, y_2)$

### 2. Select Dimensions
Choose the appropriate dimensions for your transformation:
* **Domain dimension (n):** Select from 1 to 5
    * This is the dimension of your input vectors.
    * Example: If $T$ takes 3-component vectors, select $n = 3$.
* **Codomain dimension (m):** Select from 1 to 5
    * This is the dimension of your output vectors.
    * Example: If $T$ produces 2-component vectors, select $m = 2$.

### 3. Enter Basis Vectors
The standard matrix is constructed by applying your transformation to each standard basis vector:
* **For $R^2$ space:** $e_1 = (1, 0)$ and $e_2 = (0, 1)$
* **For $R^3$ space:** $e_1 = (1, 0, 0)$, $e_2 = (0, 1, 0)$, and $e_3 = (0, 0, 1)$

**How to enter:**
1.  For each basis vector $e_i$, calculate $T(e_i)$.
2.  Enter the components of the result into the corresponding fields.

### 4. Compute
Once all basis vector transformations are entered:
1.  Click the **"Compute Standard Matrix"** button. The tool will construct the matrix where:
    * Column 1 = $T(e_1)$
    * Column 2 = $T(e_2)$
    * Column 3 = $T(e_3)$
    * And so on...

### 5. Solutions
Toggle "Show Computation Steps" to see the detailed solution:
* How each basis vector was transformed.
* Step-by-step matrix construction.
* The logical process behind the calculation.
* Detailed explanations of each step.
  
### 6. Verification:

Once you have your standard matrix A, verify it works by checking:

$$
A \times [x_1, x_2, ..., x_n]^T = T(x_1, x_2, ..., x_n)
$$

**How to verify:**

1. Choose any test vector $(x_1, x_2, ..., x_n)$
2. Multiply your standard matrix A by this vector
3. Apply the original transformation T to the same vector
4. Both results should be identical

## Transformation Types:

The tool can help you find standard matrices for:

* **Rotations:** Rotating vectors by an angle
* **Reflections:** Mirroring vectors across a line or plane
* **Projections:** Projecting vectors onto a subspace.
* **Scaling:** Stretching or shrinking vectors.
* **Shearing:** Slanting transformations.

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
