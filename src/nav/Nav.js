import React from 'react';

class Nav extends React.Component {
  render() {
    return (
      <nav className="navbar bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Navbar
          </a>
        </div>
      </nav>
    );
  }
}

export { Nav };
