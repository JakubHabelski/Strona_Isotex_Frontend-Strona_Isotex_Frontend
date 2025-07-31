// src/components/ProtectedRoute.jsx
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import apiURL from '../../config';
import axios from 'axios';

function ProtectedRoute({ children, requiredRole }) {
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsAuthorized(false);
        return;
      }

      try {
        const response = await axios.get(`${apiURL}/api/verify-token`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const roles = response.data.roles;
        if (roles.includes(requiredRole)) {
          setIsAuthorized(true);
        } else {
          setIsAuthorized(false);
        }
      } catch (err) {
        setIsAuthorized(false);
      }
    };

    verifyToken();
  }, [requiredRole]);

  if (isAuthorized === null) {
    return <div>Ładowanie...</div>;
  }

  return isAuthorized ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;