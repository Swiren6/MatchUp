import React, { useState } from 'react';
import ApplicationItem from './ApplicationItem';

const ApplicationList = () => {
  const [filter, setFilter] = useState('all');

  const applications = [
    {
      id: 1,
      candidate: {
        name: "Safa Ben Ali",
        email: "safa.benali@example.com",
        phone: "06 23 45 67 89",
        resume: "CV_Safa_BenAli.pdf"
      },
      offer: "Développeur Frontend React",
      date: "18/05/2023",
      status: "Nouvelle",
      notes: "Bonne connaissance de React et TypeScript",
      rating: 4
    },
    {
      id: 2,
      candidate: {
        name: "Khaled Mansour",
        email: "khaled.mansour@example.com",
        phone: "07 11 22 33 44",
        resume: "CV_Khaled_Mansour.pdf"
      },
      offer: "UX Designer Senior",
      date: "17/05/2023",
      status: "En revue",
      notes: "Design propre et moderne",
      rating: 5
    },
    {
      id: 3,
      candidate: {
        name: "Sarra Trabelsi",
        email: "sarra.trabelsi@example.com",
        phone: "06 77 88 99 00",
        resume: "CV_Sarra_Trabelsi.pdf"
      },
      offer: "Développeur Backend Node.js",
      date: "20/05/2023",
      status: "Entretien",
      notes: "Prévue pour un test technique",
      rating: 4,
      interviewDate: "25/05/2023"
    },
    {
      id: 4,
      candidate: {
        name: "Youssef Haddad",
        email: "youssef.haddad@example.com",
        phone: "07 66 55 44 33",
        resume: "CV_Youssef_Haddad.pdf"
      },
      offer: "Product Manager",
      date: "15/05/2023",
      status: "Rejetée",
      notes: "Profil intéressant mais manque d'expérience produit",
      rating: 3
    },
    {
      id: 5,
      candidate: {
        name: "Ines Gharbi",
        email: "ines.gharbi@example.com",
        phone: "06 12 34 56 00",
        resume: "CV_Ines_Gharbi.pdf"
      },
      offer: "Data Scientist",
      date: "22/05/2023",
      status: "Nouvelle",
      notes: "Excellent parcours académique",
      rating: 5
    },
    {
      id: 6,
      candidate: {
        name: "Mohamed Ali Bouzid",
        email: "mohamedali.bouzid@example.com",
        phone: "07 77 88 99 66",
        resume: "CV_MohamedAli_Bouzid.pdf"
      },
      offer: "DevOps Engineer",
      date: "19/05/2023",
      status: "En revue",
      notes: "Bonnes certifications en cloud computing",
      rating: 4
    },
    {
    id: 7,
    candidate: {
      name: "Rania Jouini",
      email: "rania.jouini@example.com",
      phone: "06 78 12 45 90",
      resume: "CV_Rania_Jouini.pdf"
    },
    offer: "Scrum Master",
    date: "21/05/2023",
    status: "Nouvelle",
    notes: "Certifiée PSM I, bonne compréhension de l’agilité",
    rating: 4
  },
  {
    id: 8,
    candidate: {
      name: "Omar Kacem",
      email: "omar.kacem@example.com",
      phone: "07 22 33 44 55",
      resume: "CV_Omar_Kacem.pdf"
    },
    offer: "Ingénieur QA",
    date: "19/05/2023",
    status: "Entretien",
    notes: "Bonne maîtrise de Cypress et Selenium",
    rating: 4,
    interviewDate: "27/05/2023"
  },
  {
    id: 9,
    candidate: {
      name: "Amira Ben Salem",
      email: "amira.bensalem@example.com",
      phone: "06 54 32 10 98",
      resume: "CV_Amira_BenSalem.pdf"
    },
    offer: "Développeur Mobile Flutter",
    date: "20/05/2023",
    status: "Rejetée",
    notes: "Manque de projets concrets malgré bon profil académique",
    rating: 2
  },
  {
    id: 10,
    candidate: {
      name: "Seif Triki",
      email: "seif.triki@example.com",
      phone: "07 99 88 77 66",
      resume: "CV_Seif_Triki.pdf"
    },
    offer: "Ingénieur IA",
    date: "23/05/2023",
    status: "En revue",
    notes: "Utilise régulièrement TensorFlow et PyTorch",
    rating: 5
  },
  {
    id: 11,
    candidate: {
      name: "Nour Mejri",
      email: "nour.mejri@example.com",
      phone: "06 44 55 66 77",
      resume: "CV_Nour_Mejri.pdf"
    },
    offer: "Chargée de recrutement",
    date: "18/05/2023",
    status: "Nouvelle",
    notes: "Bonne présentation et sens de la communication",
    rating: 4
  },
  {
    id: 12,
    candidate: {
      name: "Walid Fekih",
      email: "walid.fekih@example.com",
      phone: "07 33 22 11 00",
      resume: "CV_Walid_Fekih.pdf"
    },
    offer: "Développeur Fullstack JS",
    date: "16/05/2023",
    status: "En revue",
    notes: "Bon niveau en React, Node.js et MongoDB",
    rating: 5
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
