import logo from './logo.svg';
import './App.css';
import PackageList from './package-list/package-list';
import React from 'react';
import { Nav } from './nav/Nav';

function App() {
  return (
    <React.Fragment>
      <Nav />
      <PackageList />
    </React.Fragment>
  );
}

export default App;
