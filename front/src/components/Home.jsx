import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/docs');
        console.log('API Response:', response.data); // Log the response
        setApiData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="">
      <div>
        <h1 className="m-5 text-center">Documents</h1>

        {/* Conditionally render the table when apiData is available */}
        {apiData && apiData.length > 0 ? (
          <table className="table text-center">
            <thead>
              <tr>
                <th scope="col">File Name</th>
                <th scope="col">File Type</th>
                <th scope="col">File Path</th>
                <th scope="col">Nombre de Mots</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {apiData.map((data, index) => (
                <tr key={index}>
                  <td>{data.titre}</td>
                  <td>.txt</td>
                  <td>{data.chemin}</td>
                  <td>{data.contenu.split(/\s+/).length}</td>
                  <td>
                    <div className="btn-group" role="group">
                      <Link to={`/doc/${data.id}`}>
                        <button className="btn btn-sm btn-outline-primary">
                          View File
                        </button>
                      </Link>
                      <Link to={`/cloud/${data.id}`}>
                        <button className="btn btn-sm btn-outline-dark">
                          Nuage de mots
                        </button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Home;
