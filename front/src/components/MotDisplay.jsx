import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const MotDisplay = () => {
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/mots');
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
        <h1 className="m-5 text-center">Mots</h1>

        {/* Conditionally render the table when apiData is available */}
        {apiData && apiData.length > 0 ? (
          <table className="table text-center table-striped">
            <thead>
              <tr>
                <th scope="col">Identifiant Mot</th>
                <th scope="col">Mot</th>
                <th scope="col">Occurence</th>
                <th scope="col">Document</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {apiData.map((data, index) => (
                <tr key={index}>
                  <td>{data.id}</td>
                  <td>{data.mot.mot}</td>
                  <td>{data.occurrence}</td>
                  <td>{data.document.titre}</td>
                  <td>
                    <div className="btn-group" role="group">
                      <Link to={`/doc/${data.document.id}`}>
                        <button className="btn btn-sm btn-outline-primary">
                          View File
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

export default MotDisplay;
