import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PetList from "./components/PetList";
import About from "./components/About";
import PetForm from "./components/petForm"; // justera om du lägger i pages

function App() {
  return (
    <Router basename="/sanity-react-cms-app">
      {/* Menyrad */}
      <nav style={{ padding: "1rem", backgroundColor: "#f0f0f0" }}>
        <Link to="/" style={{ marginRight: "1rem", textDecoration: "none" }}>Startsida</Link>
        <Link to="/om-oss" style={{ textDecoration: "none" }}>Om oss</Link>
      </nav>

      {/* Sidor */}
      <Routes>
        <Route path="/" element={<PetList />} />
        <Route path="/om-oss" element={<About />} />
        <Route path="/lagg-till" element={<PetForm />} />
      </Routes>
    </Router>
  );
}

export default App;
