import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PetList from "./components/PetList";
import About from "./components/about";
import PetForm from "./components/petForm";
import kattohund from "./assets/kattohund.png";

function App() {
  return (
    <Router basename="/sanity-react-cms-app">
      <header className="pets-header">
        <h1>
          Husdjurs <img src={kattohund} alt="katt och hund bild" /> Galleri
        </h1>
        <nav className="nav-links">
          <Link to="/">Hem</Link>
          <Link to="/lagg-till">Lägg till husdjur</Link>
          <Link to="/om-oss">Om oss</Link>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<PetList />} />
        <Route path="/om-oss" element={<About />} />
        <Route path="/lagg-till" element={<PetForm />} />
      </Routes>
    </Router>
  );
}

export default App;
