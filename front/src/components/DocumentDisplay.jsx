// DocumentDetail.js
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const DocumentDetail = () => {
  const { id } = useParams();
  const [documentData, setDocumentData] = useState(null);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/docs/${id}`);
        setDocumentData(response.data);
      } catch (error) {
        console.error('Error fetching document data:', error);
      }
    };

    fetchDocument();
  }, [id]);

  if (!documentData) {
    return <p>Loading...</p>;
  }

  const { titre, contenu } = documentData;

  return (
    <div className="container mt-4">
      <div className="text-center"></div>
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <h2 className="card-title">{titre}</h2>
            </div>
            <div className="col-md-6 text-end">
              <Link to={`/cloud/${id}`} className="btn btn-warning">
                Nuage de Mots
              </Link>
            </div>
          </div>
          <p className="card-text">{contenu}</p>
        </div>
      </div>
    </div>
  );
};

export default DocumentDetail;
