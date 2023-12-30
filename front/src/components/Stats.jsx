import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Stats = () => {
  const [statsData, setStatsData] = useState({
    wordCount: 0,
    documentCount: 0,
    avgWordsPerDoc: 0,
    popularWords: [],
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const motsResponse = await axios.get('http://localhost:3000/mots');
        const docsResponse = await axios.get('http://localhost:3000/docs');

        const mots = motsResponse.data;

        // Calculer le nombre de mots, le nombre de documents et la moyenne de mots par document
        const wordCount = mots.length;
        const documentCount = docsResponse.data.length;
        const avgWordsPerDoc = wordCount / documentCount;

        // Ordonner les mots par occurrence, du plus grand au plus petit
        const sortedWords = mots.sort((a, b) => b.occurrence - a.occurrence);

        // Prendre les 5 premiers mots
        const popularWords = sortedWords
          .slice(0, 5)
          .map((word) => word.mot.mot);

        const data = {
          wordCount,
          documentCount,
          avgWordsPerDoc,
          popularWords,
        };

        setStatsData(data);
      } catch (error) {
        console.error(
          'Erreur lors de la récupération des statistiques:',
          error,
        );
      }
    };

    fetchStats();
  }, []); // Le tableau vide en tant que dépendance garantit que l'effet se produit une seule fois après le rendu initial

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Statistiques</h2>
      <div className="row justify-content-center">
        <div className="col-md-6">
          {/* Display popular words on the left */}
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Mots clés populaires</h5>
              <ul className="list-group">
                {statsData.popularWords.map((word, index) => (
                  <li key={index} className="list-group-item">
                    {word}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          {/* Display other statistics cards on the right */}
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Nombre de mots indexés</h5>
              <p className="card-text">{statsData.wordCount}</p>
            </div>
          </div>
          <div className="card mt-4">
            <div className="card-body">
              <h5 className="card-title">Nombre de documents indexés</h5>
              <p className="card-text">{statsData.documentCount}</p>
            </div>
          </div>
          <div className="card mt-4">
            <div className="card-body">
              <h5 className="card-title">Mots moyens par document</h5>
              <p className="card-text">
                {statsData.avgWordsPerDoc.toLocaleString('fr-FR', {
                  maximumFractionDigits: 2,
                })}
              </p>{' '}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
