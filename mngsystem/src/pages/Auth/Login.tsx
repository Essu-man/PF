import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import styles from './Auth.module.css';

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add authentication logic here
    navigate('/dashboard');
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <div className={styles.logoSection}>
          <h1>PF Manager</h1>
          <p>Poultry Farm Management System</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.authForm}>
          <h2>Welcome Back</h2>
          <p className={styles.subtitle}>Please sign in to continue</p>

          <div className={styles.inputGroup}>
            <label>Email</label>
            <Input type="email" placeholder="Enter your email" required />
          </div>

          <div className={styles.inputGroup}>
            <label>Password</label>
            <Input type="password" placeholder="Enter your password" required />
          </div>

          <Button type="submit" className={styles.authButton}>
            Sign In
          </Button>

          <p className={styles.switchAuth}>
            Don't have an account?{' '}
            <span onClick={() => navigate('/signup')}>Sign Up</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
