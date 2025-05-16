import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import WeddingDetail from './Components/WeddingDetails';
import Dashboard from './Components/Dashboard';
import GuestList from './Components/GuestList';
import ToDo from './Components/ToDo';
import Signup from './Components/Signup';
import Login from './Components/Login';
import FirstPage from './Components/FirstPage';

function App() {
  const [wedData, setWedData] = useState([]);

  function wedDetails(wedDetail) {
    setWedData([...wedData, wedDetail]);
    console.log(wedData);
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard wedData={wedData} />} />
          <Route
            path="/wedding-details"
            element={<WeddingDetail wedDetails={wedDetails} />}
          />
          <Route path="/guest-list" element={<GuestList />} />
          <Route path="/todo-list" element={<ToDo />} />
          <Route path="/signup" element={<Signup />} />
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
