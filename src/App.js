import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes, Link, Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <nav className="navbar bg-light">
        <div className="container-fluid">
          <Link to="/">Home</Link>
          <Link to="/packages">Packages</Link>
          <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </nav>
      <Outlet />
    </>
  );
}

export default App;
