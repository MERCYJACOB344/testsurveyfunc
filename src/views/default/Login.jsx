import React, { useState } from 'react';

function Login() {
  const [message, setMessage] = useState('');

  const fetchMessage = async () => {
    fetch('https://yellow-river-047162a1e.5.azurestaticapps.net/api/GetData', {
  method: 'GET',
  credentials: 'include', // This ensures cookies are sent with the request
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to My App</h1>
        <button onClick={fetchMessage}>Fetch Message</button>
        <p>{message}</p>
      </header>
    </div>
  );
}

export default Login;
