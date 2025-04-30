import { useState, useEffect } from 'react';
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
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch job data from backend
  useEffect(() => {
    const fetchOffer = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/jobs/${offerId}`);
        if (!res.ok) throw new Error('Erreur lors de la récupération de l\'offre');
        const data = await res.json();
        setOfferTitle(data.title);
      } catch (err) {
        console.error(err);
        setOfferTitle('(Offre inconnue)');
      }
    };

    fetchOffer();
  }, [offerId]);

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
    setSuccessMessage('');

    try {
      const data = new FormData();
      data.append('fullname', formData.fullname);
      data.append('email', formData.email);
      data.append('motivation', formData.motivation);
      data.append('cv', formData.cv);

      // Envoi au backend Node
      const response = await fetch(`http://localhost:5000/api/apply/${offerId}`, {
        method: 'POST',
        body: data,
      });

      if (!response.ok) throw new Error('Erreur lors de l’envoi.');

      setSuccessMessage('Candidature envoyée avec succès ! Vous devez attendre la réponse.');
    } catch (err) {
      setErrorMessage('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>Postuler à l'offre </h1>
          <p style={styles.subtitle}>Remplissez le formulaire pour candidater</p>
        </div>

        {errorMessage && <div style={styles.errorAlert}>{errorMessage}</div>}
        {successMessage && <div style={styles.successAlert}>{successMessage}</div>}

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
  successAlert: {
    backgroundColor: '#d1fae5',
    color: '#10b981',
    padding: '12px 16px',
    borderRadius: '8px',
    marginBottom: '24px',
    fontSize: '14px',
    textAlign: 'center',
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
};
