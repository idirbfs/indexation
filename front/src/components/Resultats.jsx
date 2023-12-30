import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';

const Resultats = () => {
  const [resultatsRecherche, setResultatsRecherche] = useState([]);
  const location = useLocation();
  const termeRecherche = new URLSearchParams(location.search).get('search');

  useEffect(() => {
    if (!termeRecherche) {
      console.error("Le terme de recherche est manquant dans l'URL");
      return;
    }

    const effectuerRecherche = async () => {
      try {
        const reponse = await axios.get(
          `http://localhost:3000/mots/${termeRecherche}`,
        );
        setResultatsRecherche(reponse.data);
      } catch (erreur) {
        console.error('Erreur lors de la recherche:', erreur);
      }
    };

    effectuerRecherche();
  }, [termeRecherche]);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Résultats de la recherche</h2>

      <p className="mb-3">
        Le mot <b>{termeRecherche}</b> est présent dans{' '}
        <b>{resultatsRecherche.length}</b> documents.
      </p>

      <div className="row">
        {resultatsRecherche.map((resultat) => (
          <div key={resultat.id} className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <p className="card-subtitle mb-2 text-muted">
                  Document:{' '}
                  <Link to={`/doc/${resultat.id_document}`}>
                    {resultat.document.titre}
                  </Link>
                </p>

                <p className="card-text">
                  Occurences du mot `<b>{resultat.mot.mot}</b>` dans le
                  document:{' '}
                  <b className="text-success">{resultat.occurrence}</b>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Resultats;
