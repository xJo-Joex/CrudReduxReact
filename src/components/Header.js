import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="App-header">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary justify-conten-between">
        <div className="container">
          <Link to={"/"} className="text-light">CRUD - React, Redux, REST & Axios</Link>
        </div>
        <Link className="btn btn-danger nuevo-post d-block d-md-inline-block" to={"/productos/nuevo"}>Agregar Producto &#43;</Link>
      </nav>
    </header>
  );
};

export default Header;
