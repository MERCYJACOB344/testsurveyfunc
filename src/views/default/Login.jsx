import React, { useState } from 'react';

function Login() {
  const [message, setMessage] = useState('');

  const fetchMessage = async () => {
    fetch('/api/hello')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.text(); // Extract response as plain text
  })
  .then(text => {
    console.log(text); // Outputs the plain text message
    setMessage(text); // Update state with the message
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });
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
