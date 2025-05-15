import React, { useState, useEffect } from 'react';
import { FiSearch, FiFilter, FiDollarSign, FiClock, FiMapPin, FiBookmark, FiStar } from 'react-icons/fi';
import './OffersPage.css';

const OffersPage = () => {
  const [offers, setOffers] = useState([]);
  const [filteredOffers, setFilteredOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    category: "all",
    budgetRange: "all",
    duration: "all",
    experienceLevel: "all",
  });
  const [showFilters, setShowFilters] = useState(false);

  // Catégories disponibles pour le filtrage
  const categories = [
    "all",
    "développement web",
    "mobile",
    "design",
    "rédaction",
    "marketing",
    "consulting",
    "autres",
  ];

  const budgetRanges = [
    { value: "all", label: "Tous budgets" },
    { value: "0-500", label: "< 500DT" },
    { value: "500-1000", label: "500DT - 1000DT" },
    { value: "1000-5000", label: "1000DT - 5000DT" },
    { value: "5000+", label: "5000DT+" },
  ];

  const durations = [
    { value: "all", label: "Toutes durées" },
    { value: "short", label: "< 1 semaine" },
    { value: "medium", label: "1-4 semaines" },
    { value: "long", label: "1-3 mois" },
    { value: "very-long", label: "3 mois+" },
  ];

  const experienceLevels = [
    { value: "all", label: "Tous niveaux" },
    { value: "beginner", label: "Débutant" },
    { value: "intermediate", label: "Intermédiaire" },
    { value: "expert", label: "Expert" },
  ];

  useEffect(() => {
    // Simulation de chargement des données
    const fetchOffers = async () => {
      try {
        setTimeout(() => {
          const mockOffers = [
            {
              id: 1,
              title: "Développement d'application React Native",
              client: "Startup Tech",
              budget: 3200,
              duration: "3 semaines",
              location: "Remote",
              category: "mobile",
              description:
                "Nous cherchons un développeur React Native pour créer une application de gestion de tâches avec synchronisation en temps réel.",
              skills: ["React Native", "Firebase", "Redux"],
              experienceLevel: "intermediate",
              postedDate: "2025-05-15",
              rating: 4.8,
              saved: false,
            },
            {
              id: 2,
              title: "Refonte de site WordPress",
              client: "Agence Marketing",
              budget: 1200,
              duration: "2 semaines",
              location: "Nabeul",
              category: "développement web",
              description:
                "Refonte complète d'un site WordPress existant avec amélioration des performances et nouveau design.",
              skills: ["WordPress", "PHP", "CSS", "SEO"],
              experienceLevel: "beginner",
              postedDate: "2025-05-10",
              rating: 4.5,
              saved: true,
            },
            {
              id: 3,
              title: "Création de logo et identité visuelle",
              client: "Restaurant Le Gourmet",
              budget: 800,
              duration: "10 jours",
              location: "Tunis, Lac2",
              category: "design",
              description:
                "Conception d'un logo moderne et d'une identité visuelle pour un nouveau restaurant gastronomique.",
              skills: ["Illustrator", "Branding", "Graphic Design"],
              experienceLevel: "intermediate",
              postedDate: "2025-05-12",
              rating: 4.9,
              saved: false,
            },
            {
              id: 4,
              title: "Développement API Node.js",
              client: "FinTech SA",
              budget: 5500,
              duration: "1 mois",
              location: "Remote",
              category: "développement web",
              description:
                "Création d'une API sécurisée pour une application financière avec système d'authentification complexe.",
              skills: ["Node.js", "Express", "MongoDB", "JWT"],
              experienceLevel: "expert",
              postedDate: "2025-05-08",
              rating: 4.7,
              saved: false,
            },
            {
              id: 5,
              title: "Rédaction articles techniques",
              client: "Blog Tech",
              budget: 400,
              duration: "1 semaine",
              location: "Remote",
              category: "rédaction",
              description:
                "Rédaction de 5 articles techniques sur les dernières tendances en développement web.",
              skills: ["Rédaction", "Technologie", "SEO"],
              experienceLevel: "beginner",
              postedDate: "2025-05-14",
              rating: 4.3,
              saved: false,
            },
          ];
          setOffers(mockOffers);
          setFilteredOffers(mockOffers);
          setIsLoading(false);
        }, 1500);
      } catch (error) {
        console.error("Erreur de chargement", error);
        setIsLoading(false);
      }
    };

    fetchOffers();
  }, []);

  // Fonction de filtrage
  useEffect(() => {
    let results = offers;

    // Filtre par recherche
    if (searchTerm) {
      results = results.filter(
        (offer) =>
          offer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          offer.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          offer.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
          offer.skills.some((skill) =>
            skill.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    // Filtres avancés
    if (filters.category !== "all") {
      results = results.filter((offer) => offer.category === filters.category);
    }

    if (filters.budgetRange !== "all") {
      const [min, max] = filters.budgetRange.split("-");
      if (filters.budgetRange === "5000+") {
        results = results.filter((offer) => offer.budget >= 5000);
      } else {
        results = results.filter(
          (offer) =>
            offer.budget >= parseInt(min) && offer.budget <= parseInt(max)
        );
      }
    }

    if (filters.duration !== "all") {
      switch (filters.duration) {
        case "short":
          results = results.filter(
            (offer) =>
              offer.duration.includes("jours") ||
              offer.duration.includes("semaine")
          );
          break;
        case "medium":
          results = results.filter((offer) =>
            offer.duration.includes("semaines")
          );
          break;
        case "long":
          results = results.filter(
            (offer) =>
              offer.duration.includes("mois") &&
              !offer.duration.includes("3 mois")
          );
          break;
        case "very-long":
          results = results.filter((offer) =>
            offer.duration.includes("3 mois")
          );
          break;
        default:
          break;
      }
    }

    if (filters.experienceLevel !== "all") {
      results = results.filter(
        (offer) => offer.experienceLevel === filters.experienceLevel
      );
    }

    setFilteredOffers(results);
  }, [searchTerm, filters, offers]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleSaveOffer = (id) => {
    setOffers((prev) =>
      prev.map((offer) =>
        offer.id === id ? { ...offer, saved: !offer.saved } : offer
      )
    );
  };

  const resetFilters = () => {
    setFilters({
      category: "all",
      budgetRange: "all",
      duration: "all",
      experienceLevel: "all",
    });
    setSearchTerm("");
  };

  return (
    <div className="offers-page">
      <div className="offers-header">
        <h1>Offres disponibles</h1>
        <p>Trouvez le projet parfait pour vos compétences</p>
      </div>

      <div className="search-filter-container">
        <div className="search-bar">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Rechercher des offres..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <button
          className={`filter-toggle ${showFilters ? "active" : ""}`}
          onClick={() => setShowFilters(!showFilters)}
        >
          <FiFilter /> {showFilters ? "Masquer filtres" : "Filtrer les offres"}
        </button>
      </div>

      {showFilters && (
        <div className="filters-panel">
          <div className="filter-group">
            <label>Catégorie</label>
            <select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "all"
                    ? "Toutes catégories"
                    : cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Budget</label>
            <select
              name="budgetRange"
              value={filters.budgetRange}
              onChange={handleFilterChange}
            >
              {budgetRanges.map((range) => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Durée</label>
            <select
              name="duration"
              value={filters.duration}
              onChange={handleFilterChange}
            >
              {durations.map((duration) => (
                <option key={duration.value} value={duration.value}>
                  {duration.label}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Niveau d'expérience</label>
            <select
              name="experienceLevel"
              value={filters.experienceLevel}
              onChange={handleFilterChange}
            >
              {experienceLevels.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
          </div>

          <button className="reset-filters" onClick={resetFilters}>
            Réinitialiser
          </button>
        </div>
      )}

      <div className="results-info">
        <p>{filteredOffers.length} offre(s) trouvée(s)</p>
        {searchTerm && <p>Résultats pour : "{searchTerm}"</p>}
      </div>

      {isLoading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Chargement des offres...</p>
        </div>
      ) : filteredOffers.length === 0 ? (
        <div className="no-results">
          <h3>Aucune offre ne correspond à vos critères</h3>
          <p>Essayez d'élargir votre recherche ou modifiez vos filtres</p>
          <button onClick={resetFilters}>Réinitialiser les filtres</button>
        </div>
      ) : (
        <div className="offers-list">
          {filteredOffers.map((offer) => (
            <div key={offer.id} className="offer-card">
              <div className="offer-header">
                <div className="offer-title">
                  <h3>{offer.title}</h3>
                  <div className="client-rating">
                    <span>{offer.client}</span>
                    <div className="rating">
                      <FiStar className="star-icon" />
                      <span>{offer.rating}</span>
                    </div>
                  </div>
                </div>
                <button
                  className={`save-btn ${offer.saved ? "saved" : ""}`}
                  onClick={() => toggleSaveOffer(offer.id)}
                >
                  <FiBookmark />
                </button>
              </div>

              <p className="offer-description">{offer.description}</p>

              <div className="offer-details">
                <div className="detail">
                  <FiDollarSign />
                  <span>{offer.budget}DT</span>
                </div>
                <div className="detail">
                  <FiClock />
                  <span>{offer.duration}</span>
                </div>
                <div className="detail">
                  <FiMapPin />
                  <span>{offer.location}</span>
                </div>
              </div>

              <div className="offer-skills">
                {offer.skills.map((skill, index) => (
                  <span key={index} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>

              <div className="offer-footer">
                <span className="posted-date">
                  Publié le {offer.postedDate}
                </span>
                <div className="offer-actions">
                  <button className="secondary-btn">Voir détails</button>
                  <button className="primary-btn">Postuler</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OffersPage;
