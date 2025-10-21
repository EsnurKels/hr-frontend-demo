import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CandidatesPage from "./pages/CandidatesPage";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import AddCandidatePage from "./pages/AddCandidatePage";

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/candidates" element={<CandidatesPage />} />
            <Route path="/add" element={<AddCandidatePage/>} />
        </Routes>
      </Layout>
    </Router>
  );
}
