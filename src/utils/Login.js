import axios from 'axios';
import apiURL from './config';
import { useState } from 'react';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [token, setToken] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${apiURL}/api/login`, { username, password });
            setToken(response.data);
            localStorage.setItem('token', response.data); // Zapisz token
            setError('');
        } catch (err) {
            setError('Błąd logowania: ' + err.response.data);
        }
    };

    return (
        <div>
            <h2>Logowanie</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Nazwa użytkownika"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Hasło"
                />
                <button type="submit">Zaloguj</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    );
}
export default Login;