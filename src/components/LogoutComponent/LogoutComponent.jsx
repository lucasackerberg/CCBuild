import React from 'react';
import supabase from '../../supabaseClient';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import styles from './LogoutComponent.module.css';

export const LogoutComponent = () => {
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  }
  return (
    <div>
      <Button
        className={styles.btn}
        onClick={handleLogout}
      >
        Logout
      </Button>
    </div>
  );
};
