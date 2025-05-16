import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import HomePage from './components/HomePage';
import AddProduct from './components/AddProduct';
import ÜrünListesi from './components/ÜrünListesi';

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  return (
    <Routes>
      <Route
        path="/"
        element={!user ? <Login setUser={setUser} /> : <Navigate to="/home" />}
      />
      <Route
        path="/home"
        element={user ? <HomePage setUser={setUser} /> : <Navigate to="/" />}
      />
      <Route
        path="/add"
        element={user ? <AddProduct /> : <Navigate to="/" />}
      />
      <Route
        path="/list"
        element={user ? <ÜrünListesi /> : <Navigate to="/" />}
      />
      <Route
        path="*"
        element={<Navigate to="/" />}
      />
    </Routes>
  );
}

export default App;
