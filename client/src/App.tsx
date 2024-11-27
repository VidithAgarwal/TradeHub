import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import axios from 'axios'

function App() {
  const [message, setMessage] = useState('');
    useEffect(() => {
        const checkServerConnection = async () => {
            try {
                const response = await axios.get('http://localhost:5000/');
                setMessage(response.data);
            } catch (error) {
                console.error('Error connecting to the server:', error);
                setMessage('Failed to connect to the server');
            }
        };

        checkServerConnection();
    }, []);


  return (
    <>
      <Navbar />
      <div>
        {message}
      </div>
    </>
  )
}

export default App;
