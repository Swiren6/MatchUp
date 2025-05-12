// Unauthorized.js
import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Accès non autorisé</h1>
      <p style={styles.text}>Vous n'avez pas les permissions nécessaires pour accéder à cette page.</p>
      <Link to="/login" style={styles.link}>
        Retour à la page de connexion
      </Link>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    textAlign: 'center',
    padding: '20px',
  },
  title: {
    fontSize: '2rem',
    color: '#dc3545',
    marginBottom: '1rem',
  },
  text: {
    fontSize: '1.2rem',
    marginBottom: '2rem',
    color: '#6c757d',
  },
  link: {
    color: '#0d6efd',
    textDecoration: 'none',
    fontSize: '1.1rem',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
};

export default Unauthorized;