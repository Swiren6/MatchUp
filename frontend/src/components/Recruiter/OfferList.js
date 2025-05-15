import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import OfferItem from './OfferItem';
import OfferForm from './OfferForm';
import './OfferList.css';

const OfferList = () => {
  const [offers, setOffers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: 'all',
    type: 'all',
    location: 'all'
  });

  useEffect(() => {
    const loadData = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setOffers([
        {
          id: 1,
          title: "Développeur Frontend React",
          type: "CDI",
          location: "Tunis",
          remote: true,
          salary: "2600 DT/mois",
          date: "15/05/2023",
          status: "published",
          candidates: 8,
          description: "Nous recherchons un développeur React expérimenté pour rejoindre notre équipe produit.",
          skills: ["React", "TypeScript", "Redux"],
          urgency: "high"
        },
        {
          id: 2,
          title: "UX Designer Senior",
          type: "CDD",
          location: "Nabeul",
          remote: false,
          salary: "1900 DT/mois",
          date: "10/05/2023",
          status: "published",
          candidates: 5,
          description: "Poste pour redesigner notre application mobile avec une approche centrée utilisateur.",
          skills: ["Figma", "UI/UX", "Prototypage"],
          urgency: "medium"
        },
        {
          id: 3,
          title: "Data Scientist",
          type: "CDI",
          location: "Remote",
          remote: true,
          salary: "3000 DT/mois",
          date: "20/05/2023",
          status: "draft",
          candidates: 0,
          description: "Analyse de données complexes pour notre équipe R&D.",
          skills: ["Python", "Machine Learning", "SQL"],
          urgency: "low"
        },
        {
          id: 4,
          title: "Product Manager",
          type: "CDI",
          location: "Bizerte",
          remote: true,
          salary: "2600 DT/mois",
          date: "18/05/2023",
          status: "archived",
          candidates: 12,
          description: "Gestion du cycle de vie produit pour notre suite SaaS.",
          skills: ["Agile", "Roadmapping", "UX"],
          urgency: "medium"
        },
        {
          id: 5,
          title: "DevOps Engineer",
          type: "Freelance",
          location: "Remote",
          remote: true,
          salary: "180-250 TND/jour",
          date: "22/05/2023",
          status: "published",
          candidates: 3,
          description: "Mise en place de pipelines CI/CD et infrastructure cloud.",
          skills: ["AWS", "Docker", "Kubernetes"],
          urgency: "high"
        },
        {
          id: 6,
          title: "Développeur .NET",
          type: "CDI",
          location: "Tunis",
          remote: false,
          salary: "4600 DT/mois",
          date: "10/03/2023",
          status: "published",
          candidates: 6,
          description: "Développement et maintenance d'applications web avec .NET.",
          skills: [".NET", "C#", "SQL Server"],
          urgency: "medium"
        },
        {
          id: 7,
          title: "Testeur QA",
          type: "Stage",
          location: "Tunis",
          remote: false,
          salary: "200 DT/mois",
          date: "05/04/2023",
          status: "published",
          candidates: 4,
          description: "Stage de test logiciel avec écriture de scénarios de test.",
          skills: ["Test", "JIRA", "Documentation"],
          urgency: "low"
        },
        {
          id: 8,
          title: "Scrum Master",
          type: "CDI",
          location: "Tunis",
          remote: true,
          salary: "1600 DT/mois",
          date: "12/05/2023",
          status: "published",
          candidates: 2,
          description: "Encadrement des équipes agiles et suivi des sprints.",
          skills: ["Scrum", "JIRA", "Communication"],
          urgency: "high"
        }
      ]);
      setIsLoading(false);
    };
    loadData();
  }, []);

  const handleAddOffer = async (newOffer) => {
    setShowForm(false);
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    setOffers(prev => [
      {
        ...newOffer,
        id: prev.length > 0 ? Math.max(...prev.map(o => o.id)) + 1 : 1,
        date: new Date().toLocaleDateString('fr-FR'),
        status: "draft",
        candidates: 0,
        skills: typeof newOffer.skills === 'string' 
          ? newOffer.skills.split(',').map(s => s.trim()) 
          : Array.isArray(newOffer.skills) 
            ? newOffer.skills 
            : [],
        urgency: newOffer.urgency || "medium"
      },
      ...prev
    ]);
    setIsLoading(false);
  };

  const filteredOffers = offers.filter(offer => {
    if (filters.status !== 'all' && offer.status !== filters.status) return false;
    if (filters.type !== 'all' && offer.type !== filters.type) return false;
    if (filters.location !== 'all' && offer.location !== filters.location) return false;
    return true;
  });

  const statusOptions = [
    { value: 'all', label: 'Tous statuts' },
    { value: 'published', label: 'Publiées' },
    { value: 'draft', label: 'Brouillons' },
    { value: 'archived', label: 'Archivées' }
  ];

  const typeOptions = [
    { value: 'all', label: 'Tous types' },
    { value: 'CDI', label: 'CDI' },
    { value: 'CDD', label: 'CDD' },
    { value: 'Freelance', label: 'Freelance' },
    { value: 'Stage', label: 'Stage' }
  ];

  const locationOptions = [
    { value: 'all', label: 'Toutes localisations' },
    { value: 'Tunis', label: 'Tunis' },
    { value: 'Nabeul', label: 'Nabeul' },
    { value: 'Bizerte', label: 'Bizerte' },
    { value: 'Remote', label: 'Full Remote' }
  ];

  return (
<<<<<<< HEAD
    <motion.div className="dashboard-section" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
=======
    <motion.div
      className="dashboard-section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
>>>>>>> 211d66160f56fb56f577718dff35a4c43ab6a6b5
      <div className="section-header">
        <motion.h2 initial={{ x: -20 }} animate={{ x: 0 }} transition={{ delay: 0.2 }}>
          Mes offres d'emploi
<<<<<<< HEAD
          <span className="offers-count">{filteredOffers.length}/{offers.length} offre{offers.length > 1 ? 's' : ''}</span>
=======
          <span className="offers-count">
            {filteredOffers.length}/{offers.length} offre
            {offers.length > 1 ? "s" : ""}
          </span>
>>>>>>> 211d66160f56fb56f577718dff35a4c43ab6a6b5
        </motion.h2>

        <div className="controls">
          <div className="filter-group">
<<<<<<< HEAD
            <motion.div className="filter-selector" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
              <label>Statut :</label>
              <select value={filters.status} onChange={(e) => setFilters({...filters, status: e.target.value})}>
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
=======
            <motion.div
              className="filter-selector"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <label>Statut :</label>
              <select
                value={filters.status}
                onChange={(e) =>
                  setFilters({ ...filters, status: e.target.value })
                }
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
>>>>>>> 211d66160f56fb56f577718dff35a4c43ab6a6b5
                ))}
              </select>
            </motion.div>

<<<<<<< HEAD
            <motion.div className="filter-selector" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
              <label>Type :</label>
              <select value={filters.type} onChange={(e) => setFilters({...filters, type: e.target.value})}>
                {typeOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
=======
            <motion.div
              className="filter-selector"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <label>Type :</label>
              <select
                value={filters.type}
                onChange={(e) =>
                  setFilters({ ...filters, type: e.target.value })
                }
              >
                {typeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
>>>>>>> 211d66160f56fb56f577718dff35a4c43ab6a6b5
                ))}
              </select>
            </motion.div>

<<<<<<< HEAD
            <motion.div className="filter-selector" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              <label>Localisation :</label>
              <select value={filters.location} onChange={(e) => setFilters({...filters, location: e.target.value})}>
                {locationOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
=======
            <motion.div
              className="filter-selector"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <label>Localisation :</label>
              <select
                value={filters.location}
                onChange={(e) =>
                  setFilters({ ...filters, location: e.target.value })
                }
              >
                {locationOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
>>>>>>> 211d66160f56fb56f577718dff35a4c43ab6a6b5
                ))}
              </select>
            </motion.div>
          </div>

          <motion.button className="btn-primary with-icon" onClick={() => setShowForm(true)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <span className="icon">+</span>
            <span>Créer une offre</span>
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {showForm && (
          <OfferForm
            onClose={() => setShowForm(false)}
            onSave={handleAddOffer}
          />
        )}
      </AnimatePresence>

      {isLoading ? (
<<<<<<< HEAD
        <motion.div className="loading-animation" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {[...Array(3)].map((_, i) => (
            <motion.div key={i} className="offer-skeleton" initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: i * 0.15 } }} />
=======
        <motion.div
          className="loading-animation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="offer-skeleton"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { delay: i * 0.15 },
              }}
            />
>>>>>>> 211d66160f56fb56f577718dff35a4c43ab6a6b5
          ))}
        </motion.div>
      ) : (
        <motion.div className="offers-list" layout>
          <AnimatePresence>
            {filteredOffers.length === 0 ? (
<<<<<<< HEAD
              <motion.div className="empty-state" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                <div className="empty-icon">🔍</div>
                <h3>Aucune offre ne correspond à vos critères</h3>
                <p>Essayez de modifier vos filtres ou créez une nouvelle offre</p>
                <button className="btn-secondary" onClick={() => setFilters({ status: 'all', type: 'all', location: 'all' })}>
=======
              <motion.div
                className="empty-state"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="empty-icon">🔍</div>
                <h3>Aucune offre ne correspond à vos critères</h3>
                <p>
                  Essayez de modifier vos filtres ou créez une nouvelle offre
                </p>
                <button
                  className="btn-secondary"
                  onClick={() =>
                    setFilters({
                      status: "all",
                      type: "all",
                      location: "all",
                    })
                  }
                >
>>>>>>> 211d66160f56fb56f577718dff35a4c43ab6a6b5
                  Réinitialiser les filtres
                </button>
              </motion.div>
            ) : (
<<<<<<< HEAD
              filteredOffers.map(offer => (
                <OfferItem key={offer.id} offer={offer} />
=======
              filteredOffers.map((offer, index) => (
                <OfferItem key={offer.id} offer={offer} index={index} />
>>>>>>> 211d66160f56fb56f577718dff35a4c43ab6a6b5
              ))
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </motion.div>
  );
};

export default OfferList;
