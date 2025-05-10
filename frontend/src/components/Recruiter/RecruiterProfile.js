import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RecruiterProfile = () => {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Récupérer les données du recruteur
  useEffect(() => {
    const fetchRecruiterProfile = async () => {
      try {
        const response = await axios.get('/api/recruiters/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setProfile(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Erreur lors du chargement du profil');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecruiterProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSocialChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      socials: {
        ...prev.socials,
        [name]: value
      }
    }));
  };

  const handleArrayChange = (field, index, e) => {
    const { name, value } = e.target;
    const updatedArray = [...profile[field]];
    updatedArray[index] = { ...updatedArray[index], [name]: value };
    setProfile(prev => ({ ...prev, [field]: updatedArray }));
  };

  const addEducation = () => {
    setProfile(prev => ({
      ...prev,
      educations: [
        ...prev.educations,
        {
          institution: "",
          degree: "",
          from: "",
          to: "",
          description: ""
        }
      ]
    }));
  };

  const addExperience = () => {
    setProfile(prev => ({
      ...prev,
      experiences: [
        ...prev.experiences,
        {
          title: "",
          company: "",
          from: "",
          to: "",
          description: ""
        }
      ]
    }));
  };

  const removeItem = (field, index) => {
    const updatedArray = profile[field].filter((_, i) => i !== index);
    setProfile(prev => ({ ...prev, [field]: updatedArray }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await axios.put('/api/recruiters/profile', profile, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setIsEditing(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la mise à jour');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && !profile) {
    return <div className="loading">Chargement du profil...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!profile) {
    return <div className="error">Profil non trouvé</div>;
  }

  return (
    <div className="dashboard-section">
      <div className="section-header">
        <h2>Mon profil</h2>
        <button 
          className={isEditing ? "btn-primary" : "btn"}
          onClick={() => setIsEditing(!isEditing)}
          disabled={isLoading}
        >
          {isLoading ? 'Chargement...' : isEditing ? 'Enregistrer' : 'Modifier'}
        </button>
      </div>

      <div className="profile-content">
        {isEditing ? (
          <form className="profile-form" onSubmit={handleSubmit}>
            {/* ... (le reste du formulaire reste identique) ... */}
          </form>
        ) : (
          <div className="profile-view">
            {/* ... (le reste de la vue reste identique) ... */}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecruiterProfile;