import React, { useState, useEffect } from 'react';
import axios from 'axios';  // Pour faire des requêtes HTTP
import './UserProfile.css';

const UserAvatar = ({ photoUrl, name, onPhotoChange }) => (
  <div className="avatar-container">
    <img 
      src={photoUrl} 
      alt={`Photo de ${name}`} 
      onError={(e) => { e.target.src = '/default-avatar.png' }} 
    />
    {onPhotoChange && (
      <input 
        type="file" 
        accept="image/*" 
        onChange={onPhotoChange} 
        style={{ display: 'none' }} 
        id="avatar-upload" 
      />
    )}
  </div>
);

const UserResume = ({ cvUrl, onCvChange }) => (
  <div className="resume-container">
    <h3>Mon CV</h3>
    <a href={cvUrl} target="_blank" rel="noopener noreferrer" className="cv-link">
      Télécharger le CV
    </a>
    {onCvChange && (
      <input 
        type="file" 
        accept=".pdf,.doc,.docx" 
        onChange={onCvChange} 
        style={{ display: 'none' }} 
        id="cv-upload" 
      />
    )}
  </div>
);

const EditableField = ({ label, value, name, onChange, isEditing }) => (
  <p>
    <span className="field-label">{label}</span>
    {isEditing ? (
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className="editable-input"
      />
    ) : (
      <span>{value}</span>
    )}
  </p>
);

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [tempData, setTempData] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/user/profile'); // Utilisez l'API pour récupérer les données de l'utilisateur
        setUserData(response.data);
        setTempData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Erreur de chargement :", error);
        setError('Erreur lors du chargement des données');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setTempData(prev => ({ ...prev, photo: event.target.result }));
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleCvChange = (e) => {
    if (e.target.files[0]) {
      setTempData(prev => ({ ...prev, cv: URL.createObjectURL(e.target.files[0]) }));
    }
  };

  const handleSave = async () => {
    try {
      const response = await axios.put('/api/user/profile', tempData); // Envoyer les données mises à jour
      setUserData(tempData);
      setIsEditing(false);
      setError('');
      alert('Profil mis à jour avec succès !');
    } catch (error) {
      console.error('Erreur de sauvegarde :', error);
      setError('Erreur lors de la sauvegarde des données');
    }
  };

  const handleCancel = () => {
    setTempData(userData);
    setIsEditing(false);
  };

  if (loading) return <div className="loading">Chargement du profil...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="user-profile-container">
      <div className="profile-header">
        <h1>Mon Profil</h1>
        {!isEditing ? (
          <button onClick={() => setIsEditing(true)} className="edit-button">
            Modifier
          </button>
        ) : (
          <div className="edit-buttons">
            <button onClick={handleSave} className="save-button">
              Enregistrer
            </button>
            <button onClick={handleCancel} className="cancel-button">
              Annuler
            </button>
          </div>
        )}
      </div>

      <UserAvatar 
        photoUrl={tempData.photo} 
        name={tempData.name} 
        onPhotoChange={isEditing ? handlePhotoChange : null}
      />

      <div className="user-info">
        <h2>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={tempData.name}
              onChange={handleChange}
              className="name-input"
            />
          ) : (
            tempData.name
          )}
        </h2>
        
        <EditableField
          label="📧"
          value={tempData.email}
          name="email"
          onChange={handleChange}
          isEditing={isEditing}
        />
        
        <EditableField
          label="📞"
          value={tempData.phone}
          name="phone"
          onChange={handleChange}
          isEditing={isEditing}
        />
        
        <EditableField
          label="🏠"
          value={tempData.address}
          name="address"
          onChange={handleChange}
          isEditing={isEditing}
        />
      </div>

      <UserResume 
        cvUrl={tempData.cv} 
        onCvChange={isEditing ? handleCvChange : null}
      />
    </div>
  );
};

export default UserProfile;
