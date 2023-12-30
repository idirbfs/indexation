import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { TagCloud } from 'react-tagcloud';

const Cloud = () => {
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

  const { titre, contenu_lemmatisee } = documentData;

  const splitAndCountWords = (text) => {
    // Lemmatize the text (you can replace this with your lemmatization logic)
    const lemmatizedText = text.split(/\s+/);

    // Count the occurrences of each word
    const wordCount = {};
    lemmatizedText.forEach((word) => {
      wordCount[word] = (wordCount[word] || 0) + 1;
    });

    // Convert the word count object to an array of objects
    const wordCountArray = Object.entries(wordCount).map(([value, count]) => ({
      value,
      count,
    }));

    // Sort the array based on the count in descending order
    wordCountArray.sort((a, b) => b.count - a.count);

    return wordCountArray;
  };

  const data = splitAndCountWords(contenu_lemmatisee);

  const handleTagClick = (tag) => {
    alert(`'${tag.value}' was selected!`);
    // You can add your custom logic here for tag click
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">
            Nuage de mot de:{' '}
            <Link to={`/doc/${id}`}>
              <b>{titre}</b>
            </Link>
          </h2>
          <TagCloud
            minSize={12}
            maxSize={35}
            tags={data}
            onClick={handleTagClick}
          />
        </div>
      </div>
    </div>
  );
};

export default Cloud;
