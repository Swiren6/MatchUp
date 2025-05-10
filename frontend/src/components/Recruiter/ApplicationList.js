import React, { useState } from 'react';
import ApplicationItem from './ApplicationItem';

const ApplicationList = () => {
  const [filter, setFilter] = useState('all');
  
  const applications = [
    {
      id: 1,
      candidate: {
        name: "Marie Dupont",
        email: "marie.dupont@example.com",
        phone: "06 12 34 56 78",
        resume: "CV_Marie_Dupont.pdf"
      },
      offer: "Développeur Frontend React",
      date: "18/05/2023",
      status: "Nouvelle",
      notes: "Expérience intéressante avec React Native",
      rating: 4
    },
    {
      id: 2,
      candidate: {
        name: "Jean Martin",
        email: "jean.martin@example.com",
        phone: "07 87 65 43 21",
        resume: "CV_Jean_Martin.pdf"
      },
      offer: "UX Designer Senior",
      date: "17/05/2023",
      status: "En revue",
      notes: "Portfolio impressionnant",
      rating: 5
    },
    {
      id: 3,
      candidate: {
        name: "Sophie Lambert",
        email: "sophie.lambert@example.com",
        phone: "06 98 76 54 32",
        resume: "CV_Sophie_Lambert.pdf"
      },
      offer: "Développeur Backend Node.js",
      date: "20/05/2023",
      status: "Entretien",
      notes: "À programmer pour un entretien technique",
      rating: 4,
      interviewDate: "25/05/2023"
    },
    {
      id: 4,
      candidate: {
        name: "Thomas Leroy",
        email: "thomas.leroy@example.com",
        phone: "07 65 43 21 09",
        resume: "CV_Thomas_Leroy.pdf"
      },
      offer: "Product Manager",
      date: "15/05/2023",
      status: "Rejetée",
      notes: "Profil intéressant mais pas assez d'expérience en gestion de produit tech",
      rating: 3
    },
    {
      id: 5,
      candidate: {
        name: "Émilie Rousseau",
        email: "emilie.rousseau@example.com",
        phone: "06 11 22 33 44",
        resume: "CV_Emilie_Rousseau.pdf"
      },
      offer: "Data Scientist",
      date: "22/05/2023",
      status: "Nouvelle",
      notes: "Très bon background académique",
      rating: 5
    },
    {
      id: 6,
      candidate: {
        name: "Nicolas Bernard",
        email: "nicolas.bernard@example.com",
        phone: "07 55 66 77 88",
        resume: "CV_Nicolas_Bernard.pdf"
      },
      offer: "DevOps Engineer",
      date: "19/05/2023",
      status: "En revue",
      notes: "Certifications AWS impressionnantes",
      rating: 4
    }
  ];

  const filteredApplications = filter === 'all' 
    ? applications 
    : applications.filter(app => {
        if (filter === 'revue') {
          return app.status === 'En revue';
        }
        return app.status.toLowerCase().includes(filter.toLowerCase());
      });

  const statusCounts = applications.reduce((acc, app) => {
    const statusKey = app.status.toLowerCase().replace(' ', '-');
    acc[statusKey] = (acc[statusKey] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="dashboard-section">
      <div className="section-header">
        <div className="section-title">
          <h2>Candidatures</h2>
          <span className="total-count">{applications.length} candidatures</span>
        </div>
        
        <div className="filter-controls">
          
          
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">Toutes les candidatures</option>
            <option value="nouvelle">Nouvelles</option>
            <option value="revue">En revue</option>
            <option value="entretien">Entretien</option>
            <option value="rejetée">Rejetées</option>
          </select>
        </div>
      </div>

      {filteredApplications.length === 0 ? (
        <div className="no-results">
          <p>Aucune candidature trouvée pour ce filtre.</p>
        </div>
      ) : (
        <div className="applications-list">
          {filteredApplications.map(application => (
            <ApplicationItem 
              key={application.id} 
              application={application} 
              onStatusChange={(newStatus) => {
                // Dans une vraie application, vous utiliseriez un state management
                console.log(`Changement de statut pour la candidature ${application.id}: ${newStatus}`);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ApplicationList;