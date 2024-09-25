import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../../supabaseClient';
import { useUser } from '../../contexts/UserContext';

export default function LoginComponent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const user = useUser();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      navigate('/dashboard');
    }
  };

  useEffect(() => {
    if (user.user) {
      navigate('/dashboard');
    }
  }, [user]);

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <h3>
        Don't have an account? <a href="/register">Register here!</a>
      </h3>
    </div>
  );
}
