import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FiUser, FiMail, FiFileText, FiSend } from 'react-icons/fi';

export default function ApplyForm() {
  const { offerId } = useParams();

  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    motivation: '',
    cv: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showDialog, setShowDialog] = useState(false); 

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'cv') {
      setFormData((prev) => ({ ...prev, cv: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const data = new FormData();
      data.append('fullname', formData.fullname);
      data.append('email', formData.email);
      data.append('motivation', formData.motivation);
      data.append('cv', formData.cv);

      // Exemple POST vers une API
      /*
      const response = await fetch(`/api/apply/${offerId}`, {
        method: 'POST',
        body: data,
      });

      if (!response.ok) throw new Error('Erreur lors de l’envoi.');
      */

      // Afficher la boîte de dialogue après la soumission réussie
      setShowDialog(true);
    } catch (err) {
      setErrorMessage('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDialogClose = () => {
    setShowDialog(false); // Fermer la boîte de dialogue
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>Postuler à l'offre #{offerId}</h1>
          <p style={styles.subtitle}>Remplissez le formulaire pour candidater</p>
        </div>

        {errorMessage && <div style={styles.errorAlert}>{errorMessage}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label htmlFor="fullname" style={styles.label}>Nom complet</label>
            <div style={styles.inputContainer}>
              <FiUser style={styles.inputIcon} />
              <input
                type="text"
                id="fullname"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                required
                style={styles.input}
                placeholder="Nom complet"
              />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="email" style={styles.label}>Adresse email</label>
            <div style={styles.inputContainer}>
              <FiMail style={styles.inputIcon} />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={styles.input}
                placeholder="votre@email.com"
              />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="motivation" style={styles.label}>Lettre de motivation</label>
            <textarea
              id="motivation"
              name="motivation"
              value={formData.motivation}
              onChange={handleChange}
              required
              rows={4}
              style={{ ...styles.input, paddingLeft: '16px', resize: 'vertical' }}
              placeholder="Votre message ici..."
            />
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="cv" style={styles.label}>Importez votre CV (PDF)</label>
            <div style={styles.inputContainer}>
              <FiFileText style={styles.inputIcon} />
              <input
                type="file"
                id="cv"
                name="cv"
                accept=".pdf"
                onChange={handleChange}
                required
                style={{ ...styles.input, paddingLeft: '42px', paddingTop: '10px' }}
              />
            </div>
            {formData.cv && (
              <p style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
                Fichier sélectionné : {formData.cv.name}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            style={isSubmitting ? styles.submitButtonLoading : styles.submitButton}
          >
            {isSubmitting ? 'Envoi...' : 'Envoyer la candidature'}
            <FiSend style={styles.buttonIcon} />
          </button>
        </form>
      </div>

      {/* Dialog Modal */}
      {showDialog && (
        <div style={styles.dialogOverlay}>
          <div style={styles.dialogBox}>
            <h3 style={styles.dialogTitle}>Candidature envoyée</h3>
            <p style={styles.dialogMessage}>Votre candidature a été envoyée avec succès !</p>
            <button onClick={handleDialogClose} style={styles.dialogButton}>Fermer</button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    fontFamily: "'Inter', sans-serif",
  },
  card: {
    width: '100%',
    maxWidth: '500px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    padding: '32px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '24px',
  },
  title: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#1e293b',
  },
  subtitle: {
    fontSize: '14px',
    color: '#64748b',
  },
  errorAlert: {
    backgroundColor: '#fee2e2',
    color: '#b91c1c',
    padding: '12px 16px',
    borderRadius: '8px',
    marginBottom: '24px',
    fontSize: '14px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#334155',
  },
  inputContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  inputIcon: {
    position: 'absolute',
    left: '14px',
    color: '#94a3b8',
    fontSize: '18px',
  },
  input: {
    width: '100%',
    padding: '12px 16px 12px 42px',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    fontSize: '14px',
    backgroundColor: '#f8fafc',
    color: '#1e293b',
  },
  submitButton: {
    padding: '12px 16px',
    backgroundColor: '#6366f1',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    transition: 'all 0.2s ease',
  },
  submitButtonLoading: {
    padding: '12px 16px',
    backgroundColor: '#a5b4fc',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'not-allowed',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  },
  buttonIcon: {
    fontSize: '18px',
  },
  // Styles pour la boîte de dialogue
  dialogOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    backdropFilter: 'blur(3px)',
    animation: 'fadeIn 0.3s ease-out forwards',
  },
  
  dialogBox: {
    backgroundColor: '#ffffff',
    padding: '32px',
    borderRadius: '12px',
    textAlign: 'center',
    width: 'min(90vw, 380px)',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
    transform: 'scale(0.95)',
    animation: 'scaleUp 0.3s ease-out forwards',
    transition: 'all 0.2s ease',
    border: '1px solid rgba(0, 0, 0, 0.1)',
  },
  
  dialogTitle: {
    fontSize: '20px',
    fontWeight: '700',
    marginBottom: '16px',
    color: '#1a1a1a',
    lineHeight: '1.4',
  },
  
  dialogMessage: {
    fontSize: '15px',
    marginBottom: '28px',
    color: '#4a4a4a',
    lineHeight: '1.5',
  },
  
  dialogButton: {
    backgroundColor: '#6366f1',
    color: '#ffffff',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '15px',
    fontWeight: '500',
    transition: 'all 0.2s ease',
    minWidth: '120px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    
    ':hover': {
      backgroundColor: '#4f46e5',
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
    },
    
    ':active': {
      transform: 'translateY(0)',
      boxShadow: '0 2px 3px rgba(0, 0, 0, 0.1)',
    },
    
    ':focus': {
      outline: 'none',
      boxShadow: '0 0 0 3px rgba(99, 102, 241, 0.3)',
    },
  },
  
  // Animations
  '@keyframes fadeIn': {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  
  '@keyframes scaleUp': {
    from: { 
      transform: 'scale(0.95)',
      opacity: 0.8,
    },
    to: { 
      transform: 'scale(1)',
      opacity: 1,
    },
  },
};
