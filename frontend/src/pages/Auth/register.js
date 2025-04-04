import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight, FiLogIn } from 'react-icons/fi';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Account created successfully!');
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      } else {
        const { error } = await response.json();
        setErrorMessage(error || 'Registration failed. Please try again.');
      }
    } catch (error) {
      setErrorMessage('Network error. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.registerCard}>
        <div style={styles.header}>
          <h1 style={styles.title}>Create Your Account</h1>
          <p style={styles.subtitle}>Join our community today</p>
        </div>

        {errorMessage && (
          <div style={styles.errorAlert}>
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label htmlFor="fullname" style={styles.label}>Full Name</label>
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
                placeholder="Full Name"
              />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="email" style={styles.label}>Email Address</label>
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
                placeholder="your@email.com"
              />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="password" style={styles.label}>Password</label>
            <div style={styles.inputContainer}>
              <FiLock style={styles.inputIcon} />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                style={styles.input}
                placeholder="••••••••"
                minLength="8"
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                style={styles.passwordToggle}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            <p style={styles.passwordHint}>Minimum 8 characters</p>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={isLoading ? styles.submitButtonLoading : styles.submitButton}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'} <FiArrowRight style={styles.buttonIcon} />
          </button>

          <div style={styles.divider}>
            <span style={styles.dividerText}>OR</span>
          </div>

          <button
            type="button"
            onClick={() => navigate('/login')}
            style={styles.loginButton}
          >
            <FiLogIn style={styles.buttonIcon} /> Already have an account? Sign In
          </button>
        </form>
      </div>

      <div style={styles.footer}>
        © {new Date().getFullYear()} MatchUp. All rights reserved.
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
    padding: '20px',
    fontFamily: "'Inter', sans-serif",
  },
  registerCard: {
    width: '100%',
    maxWidth: '450px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    padding: '40px',
    marginBottom: '20px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '32px',
  },
  title: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '8px',
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
    color: '#1e293b',
    backgroundColor: '#f8fafc',
    transition: 'all 0.2s ease',
  },
  passwordToggle: {
    position: 'absolute',
    right: '14px',
    background: 'none',
    border: 'none',
    color: '#94a3b8',
    cursor: 'pointer',
    fontSize: '18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  passwordHint: {
    fontSize: '12px',
    color: '#64748b',
    marginTop: '4px',
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
  loginButton: {
    padding: '12px 16px',
    backgroundColor: '#ffffff',
    color: '#6366f1',
    border: '1px solid #e2e8f0',
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
  buttonIcon: {
    fontSize: '18px',
  },
  divider: {
    position: 'relative',
    textAlign: 'center',
    margin: '16px 0',
  },
  dividerText: {
    display: 'inline-block',
    padding: '0 12px',
    backgroundColor: '#ffffff',
    color: '#64748b',
    fontSize: '12px',
    position: 'relative',
    zIndex: '1',
  },
  footer: {
    fontSize: '12px',
    color: '#64748b',
    textAlign: 'center',
    marginTop: '20px',
  },
};