import { Navbar } from "./components/ui/Navbar";
import { Home } from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import { SignUp } from "./pages/SignUp";
import { Login } from "./pages/Login";
import { DocumentForm } from "./pages/DocumentForm";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/document" element={<DocumentForm />} />
      </Routes>
    </>
  );
}

export default App;
