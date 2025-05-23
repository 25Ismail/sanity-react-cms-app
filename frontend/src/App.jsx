import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PetList from "./components/PetList";

function App() {
  return (
    <Router basename="/sanity-react-cms-app">
      <Routes>
        <Route path="/" element={<PetList />} />
      </Routes>
    </Router>
  );
}

export default App;
