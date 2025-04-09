import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import styles from './Auth.module.css';

const SignUp = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add registration logic here
    navigate('/login');
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <div className={styles.logoSection}>
          <h1>PF Manager</h1>
          <p>Poultry Farm Management System</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.authForm}>
          <h2>Create Account</h2>
          <p className={styles.subtitle}>Sign up to get started</p>

          <div className={styles.inputGroup}>
            <label>Full Name</label>
            <Input type="text" placeholder="Enter your full name" required />
          </div>

          <div className={styles.inputGroup}>
            <label>Email</label>
            <Input type="email" placeholder="Enter your email" required />
          </div>

          <div className={styles.inputGroup}>
            <label>Password</label>
            <Input type="password" placeholder="Create a password" required />
          </div>

          <Button type="submit" className={styles.authButton}>
            Create Account
          </Button>

          <p className={styles.switchAuth}>
            Already have an account?{' '}
            <span onClick={() => navigate('/login')}>Sign In</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;