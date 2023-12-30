import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchClick = () => {
    window.location.href = `/resultats?search=${searchQuery}`;
  };

  const handleIndexerClick = async () => {
    try {
      const response = await fetch('http://localhost:3000/text-processing');
      if (response.status === 200) {
        alert('Tous les documents sont indexés correctement.');
      } else {
        throw new Error("Erreur lors de l'indexation des documents.");
      }
    } catch (error) {
      console.error(error);
      alert("Une erreur s'est produite lors de l'indexation des documents.");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light custom-navbar">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Bibliothèque Numérique
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto d-flex align-items-center">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Documents
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/mots">
                Mots
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/statistics">
                Statistiques
              </Link>
            </li>
            <li className="nav-item">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Chercher un mot"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <button
                  className="btn btn-outline-warning"
                  onClick={handleSearchClick}
                >
                  Chercher
                </button>
              </div>
            </li>
            <li>
              <button
                className="btn btn-warning ms-2"
                onClick={handleIndexerClick}
              >
                Indexer
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
