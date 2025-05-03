import React, { useState, useEffect, useRef } from "react";
import Matrix from "./components/life-matrix/Matrix";
import lifeMatrixConfig from "./config/life-matrix.config";
import LifeMatrix from "./service/LifeMatrix";

const { rows, columns, interval } = lifeMatrixConfig;

const predefinedMatrix: number[][] = [
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [1, 1, 1, 1, 0],
  [1, 1, 0, 0, 0],
];

const App: React.FC = () => {
  const [usePredefined, setUsePredefined] = useState(true);

  const isValidPredefined =
    usePredefined &&
    Array.isArray(predefinedMatrix) &&
    predefinedMatrix.length === rows &&
    predefinedMatrix.every(row => row.length === columns);

  const lifeRef = useRef(
    new LifeMatrix(rows, columns, isValidPredefined ? predefinedMatrix : undefined)
  );

  const [currentMatrix, setCurrentMatrix] = useState<number[][]>(
    lifeRef.current.matrix
  );

  const regenerateMatrix = (usePre: boolean) => {
    const life = new LifeMatrix(
      rows,
      columns,
      usePre ? predefinedMatrix : undefined
    );
    lifeRef.current = life;
    setCurrentMatrix(life.matrix);
    setUsePredefined(usePre);
  };

  useEffect(() => {
    const id = setInterval(() => {
      const next = lifeRef.current.evolve();
      setCurrentMatrix(next);
    }, interval);
    return () => clearInterval(id);
  }, []);

  return (
    <div>
      <h1 style={{
        display: 'flex',
        justifyContent: 'center',
      }}
      >
        Life Matrix Simulation</h1>

      <div
        style={{
          marginBottom: '1rem',
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
        }}
      >

        <button
          onClick={() => regenerateMatrix(true)}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#f0f0f0',
            border: '1px solid #ccc',
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'background-color 0.2s ease',
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#e0e0e0')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#f0f0f0')}
        >

          Predefined
        </button>
        
        <button
          onClick={() => regenerateMatrix(false)}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#f0f0f0',
            border: '1px solid #ccc',
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'background-color 0.2s ease',
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#e0e0e0')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#f0f0f0')}
        >
          Random
        </button>
      </div>
      <Matrix matrix={currentMatrix} />
    </div>

  );
};

export default App;