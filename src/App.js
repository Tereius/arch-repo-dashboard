import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Search } from './Search/Search';
import { BrowserRouter, Route, Routes, Link, Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <nav className="navbar bg-light">
        <div className="container-fluid">
          <Link to="/">Home</Link>
          <Link to="/packages">Packages</Link>
          <Search />
        </div>
      </nav>
      <Outlet />
    </>
  );
}

export default App;
