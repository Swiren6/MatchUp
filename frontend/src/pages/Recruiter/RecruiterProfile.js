import React, { useState } from 'react';

const RecruiterProfile = () => {
  const [profile, setProfile] = useState({
    firstName: "Sophie",
    lastName: "Martin",
    email: "sophie.martin@entreprise.com",
    phone: "01 23 45 67 89",
    company: "TechSolutions Inc.",
    position: "Responsable Recrutement",
    bio: "Je recrute les meilleurs talents tech pour notre entreprise.",
    skills: ["Recrutement IT", "Entretiens techniques", "Sourcing"],
    location: "Paris, France",
    photo: "",
    github: "",
    cvLink: "",
    educations: [
      {
        institution: "Université Paris-Dauphine",
        degree: "Master en RH",
        fieldOfStudy: "Gestion des Ressources Humaines",
        from: "2010-09-01",
        to: "2012-06-30",
        description: "Spécialisation en recrutement tech"
      }
    ],
    experiences: [
      {
        title: "Responsable Recrutement",
        company: "TechSolutions Inc.",
        from: "2018-01-01",
        to: "",
        current: true,
        description: "Recrutement des profils techniques pour l'entreprise"
      }
    ],
    socials: {
      linkedin: "linkedin.com/in/sophiemartin",
      twitter: "twitter.com/sophiemartin"
    }
  });

  const [isEditing, setIsEditing] = useState(false);

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

  return (
    <div className="dashboard-section">
      <div className="section-header">
        <h2>Mon profil</h2>
        <button 
          className={isEditing ? "btn-primary" : "btn"}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? "Enregistrer" : "Modifier"}
        </button>
      </div>

      <div className="profile-content">
        {isEditing ? (
          <form className="profile-form">
            {/* Section Informations de base */}
            <div className="form-section">
              <h3>Informations personnelles</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Prénom</label>
                  <input
                    type="text"
                    name="firstName"
                    value={profile.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Nom</label>
                  <input
                    type="text"
                    name="lastName"
                    value={profile.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Téléphone</label>
                  <input
                    type="text"
                    name="phone"
                    value={profile.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Société</label>
                  <input
                    type="text"
                    name="company"
                    value={profile.company}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Poste</label>
                  <input
                    type="text"
                    name="position"
                    value={profile.position}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Localisation</label>
                <input
                  type="text"
                  name="location"
                  value={profile.location}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Bio</label>
                <textarea
                  name="bio"
                  value={profile.bio}
                  onChange={handleChange}
                  rows={4}
                />
              </div>
            </div>

            {/* Section Compétences */}
            <div className="form-section">
              <h3>Compétences</h3>
              <div className="form-group">
                <label>Compétences (séparées par des virgules)</label>
                <input
                  type="text"
                  name="skills"
                  value={profile.skills.join(", ")}
                  onChange={(e) => {
                    const skillsArray = e.target.value.split(",").map(skill => skill.trim());
                    setProfile(prev => ({ ...prev, skills: skillsArray }));
                  }}
                />
              </div>
            </div>

            {/* Section Formations */}
            <div className="form-section">
              <div className="section-header">
                <h3>Formations</h3>
                <button type="button" className="btn-sm" onClick={addEducation}>
                  + Ajouter
                </button>
              </div>
              
              {profile.educations.map((edu, index) => (
                <div key={index} className="nested-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Établissement</label>
                      <input
                        type="text"
                        name="institution"
                        value={edu.institution}
                        onChange={(e) => handleArrayChange("educations", index, e)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Diplôme</label>
                      <input
                        type="text"
                        name="degree"
                        value={edu.degree}
                        onChange={(e) => handleArrayChange("educations", index, e)}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Date de début</label>
                      <input
                        type="date"
                        name="from"
                        value={edu.from}
                        onChange={(e) => handleArrayChange("educations", index, e)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Date de fin</label>
                      <input
                        type="date"
                        name="to"
                        value={edu.to}
                        onChange={(e) => handleArrayChange("educations", index, e)}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      name="description"
                      value={edu.description}
                      onChange={(e) => handleArrayChange("educations", index, e)}
                      rows={2}
                    />
                  </div>

                  <button 
                    type="button" 
                    className="btn-remove"
                    onClick={() => removeItem("educations", index)}
                  >
                    Supprimer cette formation
                  </button>
                </div>
              ))}
            </div>

            {/* Section Expériences */}
            <div className="form-section">
              <div className="section-header">
                <h3>Expériences professionnelles</h3>
                <button type="button" className="btn-sm" onClick={addExperience}>
                  + Ajouter
                </button>
              </div>
              
              {profile.experiences.map((exp, index) => (
                <div key={index} className="nested-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Poste</label>
                      <input
                        type="text"
                        name="title"
                        value={exp.title}
                        onChange={(e) => handleArrayChange("experiences", index, e)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Entreprise</label>
                      <input
                        type="text"
                        name="company"
                        value={exp.company}
                        onChange={(e) => handleArrayChange("experiences", index, e)}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Date de début</label>
                      <input
                        type="date"
                        name="from"
                        value={exp.from}
                        onChange={(e) => handleArrayChange("experiences", index, e)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Date de fin</label>
                      <input
                        type="date"
                        name="to"
                        value={exp.to}
                        onChange={(e) => handleArrayChange("experiences", index, e)}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      name="description"
                      value={exp.description}
                      onChange={(e) => handleArrayChange("experiences", index, e)}
                      rows={3}
                    />
                  </div>

                  <button 
                    type="button" 
                    className="btn-remove"
                    onClick={() => removeItem("experiences", index)}
                  >
                    Supprimer cette expérience
                  </button>
                </div>
              ))}
            </div>

            {/* Section Réseaux sociaux */}
            <div className="form-section">
              <h3>Réseaux sociaux</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>LinkedIn</label>
                  <input
                    type="url"
                    name="linkedin"
                    value={profile.socials.linkedin || ""}
                    onChange={handleSocialChange}
                    placeholder="https://linkedin.com/in/votrepseudo"
                  />
                </div>
                <div className="form-group">
                  <label>Twitter</label>
                  <input
                    type="url"
                    name="twitter"
                    value={profile.socials.twitter || ""}
                    onChange={handleSocialChange}
                    placeholder="https://twitter.com/votrepseudo"
                  />
                </div>
              </div>
            </div>
          </form>
        ) : (
          <div className="profile-view">
            <div className="profile-header">
              <div className="avatar">
                {profile.photo ? (
                  <img src={profile.photo} alt={`${profile.firstName} ${profile.lastName}`} />
                ) : (
                  <div className="avatar-placeholder">
                    {profile.firstName.charAt(0)}{profile.lastName.charAt(0)}
                  </div>
                )}
              </div>
              <div>
                <h3>{profile.firstName} {profile.lastName}</h3>
                <p>{profile.position} chez {profile.company}</p>
                <p className="location">{profile.location}</p>
              </div>
            </div>
            
            <div className="profile-section">
              <h4>À propos</h4>
              <p>{profile.bio}</p>
            </div>

            <div className="profile-section">
              <h4>Compétences</h4>
              <div className="skills-list">
                {profile.skills.map((skill, index) => (
                  <span key={index} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>

            <div className="profile-section">
              <h4>Expérience professionnelle</h4>
              {profile.experiences.map((exp, index) => (
                <div key={index} className="experience-item">
                  <h5>{exp.title} - {exp.company}</h5>
                  <p className="date">{exp.from} - {exp.to || "Présent"}</p>
                  <p>{exp.description}</p>
                </div>
              ))}
            </div>

            <div className="profile-section">
              <h4>Formation</h4>
              {profile.educations.map((edu, index) => (
                <div key={index} className="education-item">
                  <h5>{edu.degree} - {edu.institution}</h5>
                  <p className="date">{edu.from} - {edu.to}</p>
                  <p>{edu.description}</p>
                </div>
              ))}
            </div>

            <div className="profile-section">
              <h4>Réseaux sociaux</h4>
              <div className="social-links">
                {profile.socials.linkedin && (
                  <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer">
                    LinkedIn
                  </a>
                )}
                {profile.socials.twitter && (
                  <a href={profile.socials.twitter} target="_blank" rel="noopener noreferrer">
                    Twitter
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecruiterProfile;