import Matrix from "./components/life-matrix/Matrix"
import lifeMatrixConfig from "./config/life-matrix.config";



const { rows, columns } = lifeMatrixConfig;
function App() {
  return <div>
    <Matrix rows={rows} columns={columns} interval={2000}></Matrix>
  </div>
}

export default App
