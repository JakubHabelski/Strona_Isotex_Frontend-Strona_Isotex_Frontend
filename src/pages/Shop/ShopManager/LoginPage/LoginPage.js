// src/components/LoginPage.jsx
import { useState } from 'react';
import { Form, Button, Alert, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import apiURL from '../../../../config';

function LoginPage() {
  const { t } = useTranslation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiURL}/login`, {
        username,
        password,
      });
      const { token } = response.data;
      localStorage.setItem('token', token);
      navigate('/ShopManager'); // Przekierowanie po zalogowaniu
    } catch (err) {
      setError(t('login.error') || 'Błędny login lub hasło');
    }
  };

  return (
    <Container style={{ width: 'min(500px, 90%)', margin: '100px auto' }}>
      <h2>{t('login.title') || 'Logowanie'}</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>{t('login.username') || 'Nazwa użytkownika'}</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>{t('login.password') || 'Hasło'}</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          {t('login.submit') || 'Zaloguj'}
        </Button>
      </Form>
    </Container>
  );
}

export default LoginPage;