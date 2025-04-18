import React, { useState } from 'react';
import './UserProfile.css';

const UserProfile = () => {
  // Données initiales simulées
  const [userData] = useState({
    name: "Jean Dupont",
    email: "jean.dupont@example.com",
    phone: "06 12 34 56 78",
    address: "12 Rue de la République, Paris",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    cv: "https://example.com/cv.pdf",
    skills: ["React", "Node.js", "MongoDB", "UI/UX Design"],
    experience: [
      {
        title: "Développeur Full Stack",
        company: "TechCorp",
        period: "2020 - Présent"
      },
      {
        title: "Stagiaire en Développement",
        company: "WebStart",
        period: "2019 - 2020"
      }
    ],
    education: [
      {
        degree: "Master en Informatique",
        school: "Université de Paris",
        year: "2019"
      }
    ]
  });

  const [isEditing, setIsEditing] = useState(false);

  // Fonction pour afficher les compétences
  const renderSkills = () => (
    <div className="skills-section">
      <h3>Compétences</h3>
      <div className="skills-container">
        {userData.skills.map((skill, index) => (
          <span key={index} className="skill-tag">{skill}</span>
        ))}
        {isEditing && (
          <input
            type="text"
            placeholder="Ajouter une compétence"
            className="add-skill-input"
          />
        )}
      </div>
    </div>
  );

  // Fonction pour afficher l'expérience professionnelle
  const renderExperience = () => (
    <div className="experience-section">
      <h3>Expérience Professionnelle</h3>
      {userData.experience.map((exp, index) => (
        <div key={index} className="experience-item">
          <h4>{exp.title}</h4>
          <p>{exp.company} • {exp.period}</p>
        </div>
      ))}
    </div>
  );

  // Fonction pour afficher la formation
  const renderEducation = () => (
    <div className="education-section">
      <h3>Formation</h3>
      {userData.education.map((edu, index) => (
        <div key={index} className="education-item">
          <h4>{edu.degree}</h4>
          <p>{edu.school} • {edu.year}</p>
        </div>
      ))}
    </div>
  );

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Mon Profil Professionnel</h1>
        <button 
          onClick={() => setIsEditing(!isEditing)} 
          className={`edit-button ${isEditing ? 'editing' : ''}`}
        >
          {isEditing ? 'Annuler' : 'Modifier le profil'}
        </button>
      </div>

      <div className="profile-content">
        <div className="profile-sidebar">
          <div className="avatar-container">
            <img 
              src={userData.photo} 
              alt={`${userData.name}`} 
              className="profile-avatar"
            />
            {isEditing && (
              <button className="change-avatar-btn">Changer la photo</button>
            )}
          </div>

          <div className="contact-info">
            <h2>{userData.name}</h2>
            <p><i className="fas fa-envelope"></i> {userData.email}</p>
            <p><i className="fas fa-phone"></i> {userData.phone}</p>
            <p><i className="fas fa-map-marker-alt"></i> {userData.address}</p>
          </div>

          {renderSkills()}
        </div>

        <div className="profile-main">
          <div className="about-section">
            <h3>À propos</h3>
            {isEditing ? (
              <textarea 
                className="about-textarea"
                placeholder="Décrivez-vous en quelques mots..."
                defaultValue="Développeur Full Stack passionné avec 5 ans d'expérience dans la création d'applications web modernes."
              />
            ) : (
              <p>Développeur Full Stack passionné avec 5 ans d'expérience dans la création d'applications web modernes.</p>
            )}
          </div>

          {renderExperience()}
          {renderEducation()}

          {isEditing && (
            <div className="save-actions">
              <button className="save-button">Enregistrer les modifications</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;