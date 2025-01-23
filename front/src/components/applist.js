import React, { useEffect, useState } from 'react';

const AppleList = () => {
  const [apples, setApples] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/student-veiw/')  // Django API endpoint
      .then((response) => response.json())
      .then((data) => {
        setApples(data);  // Update state with the fetched apples data
        setLoading(false);  // Set loading to false once data is fetched
      })
      .catch((error) => {
        setError(error);  // Handle any errors during the fetch
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching data: {error.message}</p>;
  }

  return (
    <div>
      <h2>Apple List</h2>
      <ul>
        {apples.map((apple) => (
          <li key={apple.id}>
            <strong>{apple.name}</strong><br />
            Color: {apple.color}<br />
            <img src={apple.photo_url} alt={apple.name} width="100" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppleList;
