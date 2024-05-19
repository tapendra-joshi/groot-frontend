import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import UserManagement from "./pages/UserManagement";

function App() {
  return (
    <div className="App">
       <header className="App-header">
       User Management
      </header>

      <Routes>
        <Route path="/" element={<UserManagement />} />
      </Routes>
    </div>
  );
}

export default App;
