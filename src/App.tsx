import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Animals } from "./components/Animals";
import { ExtendedAnimal } from "./components/ExtendedAnimal";
import { Header } from "./components/Header";

function App() {
  let lastAnimal: number;

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route index element={<Animals />}></Route>
        <Route
          path="/djur/:id"
          element={<ExtendedAnimal></ExtendedAnimal>}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
