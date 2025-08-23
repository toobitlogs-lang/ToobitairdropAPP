import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import "../index.css";
import AskAuth from "./pages/AskAuth";
import Auth from "./pages/Auth";
import Transfer from "./pages/Transfer";
import Claim from "./pages/Claim";
import Wallet from "./pages/Wallet";
import Otp from "./pages/Otp";
function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ask-auth" element={<AskAuth />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/claim" element={<Claim />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/otp" element={<Otp />} />
          <Route path="/transfer" element={<Transfer />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
