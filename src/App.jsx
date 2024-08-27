import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from './components/Home'
import ProductList from "./components/ProductList";
import AuthForm from "./components/AuthForm";
import ProductDetail from "./components/ProductDetail";
import Account from "./components/Account";
import "./App.css";


function App() {
  const [token, setToken] = useState(null);


  return (
    <div>
      <NavBar token={token} setToken={setToken}/>

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<AuthForm setToken={setToken}/>} />
        <Route path="/register" element={<AuthForm setToken={setToken}/>}  />
        <Route path="/products" element={<ProductList token={token}/>}  />
        <Route path="/products/:id" element={<ProductDetail token={token}/>}  />
        <Route path="/account" element={<Account token={token}/>}  />
      </Routes>
    </div>
  );
}

export default App;
