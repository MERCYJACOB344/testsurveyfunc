import React, { useState } from 'react';

function Login() {
  const [message, setMessage] = useState();

  const fetchMessage = async () => {
    try {
      const response = await fetch('http://localhost:7071/api/GetData');
      console.log('response',response);
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json(); // Parse the JSON response
      
      console.log(data); // Log the data to see the structure
      
      // Example: Combine all project names into a single message
     
  
      setMessage(setMessage(JSON.stringify(data, null, 2))); // Update state with the test message
      
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  }
console.log('message',message);
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
