import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertTriangle, X, Search, Upload, FileText, Briefcase, Star, ChevronRight, Clock, DollarSign, MapPin, Award } from 'lucide-react';

const FreelancerMatchPage = () => {
  const [skillsInput, setSkillsInput] = useState('');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [notification, setNotification] = useState(null);
  const [suggestedSkills] = useState([
    'React', 'Node.js', 'JavaScript', 'Python', 'Django',
    'Vue', 'Angular', 'TypeScript', 'PHP', 'Laravel',
    'Java', 'Spring Boot', 'C#', '.NET', 'Swift',
    'Flutter', 'React Native', 'MongoDB', 'PostgreSQL', 'MySQL',
    'UI/UX Design', 'GraphQL', 'AWS', 'Docker', 'Kubernetes'
  ]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [showApplication, setShowApplication] = useState(false);
  const [applicationData, setApplicationData] = useState({
    motivation: '',
    rate: '',
    timeline: '',
    portfolio: null
  });

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const addSkill = (skill) => {
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
      setSkillsInput('');
    }
  };

  const removeSkill = (skill) => {
    setSelectedSkills(selectedSkills.filter(s => s !== skill));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedSkills.length === 0) {
      setError("Veuillez sélectionner au moins une compétence");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockProjects = [
        {
          id: 1,
          title: "Développement d'application React Native",
          entreprise: "Sopra HR Software",
          localisation: "Ariana, Tunisia",
          contrat: "CDI",
          niveau: "Débutant",
          description: "Nous cherchons un développeur expérimenté pour nous aider à construire une application mobile cross-platform.",
          requiredSkills: ["React Native", "JavaScript", "UI/UX Design"],
          budget: "DT5,000 - DT10,000",
          duration: "3-6 mois",
          matchScore: Math.min(100, selectedSkills.filter(s => ["React Native", "JavaScript", "UI/UX Design"].includes(s)).length * 30),
          posted: "2 jours"
        },
        {
          id: 2,
          title: "API Backend avec Node.js",
          entreprise: "Vermeg",
          localisation: "Tunis, Tunisia",
          contrat: "CDI",
          niveau: "Confirmé",
          description: "Construction d'une API robuste pour notre nouveau produit SaaS avec intégration MongoDB.",
          requiredSkills: ["Node.js", "MongoDB", "JavaScript", "AWS"],
          budget: "DT3,000 - DT7,000",
          duration: "2-4 mois",
          matchScore: Math.min(100, selectedSkills.filter(s => ["Node.js", "MongoDB", "JavaScript", "AWS"].includes(s)).length * 25),
          posted: "1 semaine"
        },
        {
          id: 3,
          title: "Site E-commerce avec React",
          entreprise: "Wevioo",
          localisation: "Tunis, Tunisia",
          contrat: "CDI",
          niveau: "Intermédiaire",
          description: "Refonte complète de notre plateforme e-commerce avec intégration de paiement.",
          requiredSkills: ["React", "JavaScript", "TypeScript", "Node.js"],
          budget: "DT8,000 - DT15,000",
          duration: "4-8 mois",
          matchScore: Math.min(100, selectedSkills.filter(s => ["React", "JavaScript", "TypeScript", "Node.js"].includes(s)).length * 25),
          posted: "3 jours"
        }
      ];
      
      setProjects(mockProjects);
    } catch (err) {
      setError("Une erreur est survenue lors du matching. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  const handleApplicationChange = (e) => {
    const { name, value, files } = e.target;
    setApplicationData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const openApplication = (project) => {
    setSelectedProject(project);
    setShowApplication(true);
  };

  const cancelApplication = () => {
    setShowApplication(false);
    setApplicationData({
      motivation: '',
      rate: '',
      timeline: '',
      portfolio: null
    });
  };

  const submitApplication = async () => {
    if (!applicationData.motivation || !applicationData.rate || !applicationData.timeline) {
      setError("Veuillez remplir tous les champs obligatoires");
      return;
    }

    try {
      setLoading(true);
      await new Promise(r => setTimeout(r, 1500));
      
      setNotification({ 
        message: 'Candidature envoyée avec succès!', 
        type: 'success',
        project: selectedProject.title
      });
      cancelApplication();
    } catch {
      setNotification({ 
        message: "Erreur lors de l'envoi de la candidature", 
        type: 'error' 
      });
    } finally {
      setLoading(false);
    }
  };

  const getMatchColor = (score) => {
    if (score >= 80) return 'bg-emerald-100 text-emerald-800';
    if (score >= 50) return 'bg-amber-100 text-amber-800';
    return 'bg-rose-100 text-rose-800';
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 px-4 py-8 md:py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 font-display bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            Trouvez des projets qui correspondent à vos compétences
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Connectez-vous avec des entreprises recherchant exactement ce que vous offrez.
          </p>
        </motion.div>

        {/* Search Form */}
        <motion.div 
          className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6 mb-12 border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-lg font-medium text-gray-800 mb-3 flex items-center">
                <Briefcase className="mr-2" size={20} />
                <span>Compétences recherchées</span>
              </label>
              
              <div className="flex items-center border rounded-lg px-3 py-2 mb-3 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
                <Search className="text-gray-400 mr-2" size={18} />
                <input
                  type="text"
                  value={skillsInput}
                  onChange={(e) => setSkillsInput(e.target.value)}
                  className="flex-1 outline-none text-gray-700 placeholder-gray-400"
                  placeholder="Rechercher une compétence..."
                />
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedSkills.map(skill => (
                  <motion.span 
                    key={skill}
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium flex items-center"
                  >
                    {skill}
                    <button 
                      onClick={() => removeSkill(skill)} 
                      className="ml-2 hover:text-blue-900 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </motion.span>
                ))}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 mb-4">
                {suggestedSkills
                  .filter(skill => 
                    skill.toLowerCase().includes(skillsInput.toLowerCase()) && 
                    !selectedSkills.includes(skill)
                  )
                  .map(skill => (
                    <motion.button
                      type="button"
                      key={skill}
                      onClick={() => addSkill(skill)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gray-50 hover:bg-blue-50 border border-gray-200 text-gray-700 hover:text-blue-600 text-sm rounded-lg px-3 py-2 flex items-center justify-center transition-all"
                    >
                      {skill}
                    </motion.button>
                  ))}
              </div>
            </div>
            <div className="flex justify-center">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`px-8 py-3 rounded-xl font-semibold text-lg flex items-center transition-all ${
                  loading || selectedSkills.length === 0 
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg'
                }`}
                disabled={loading || selectedSkills.length === 0}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Recherche en cours...
                  </>
                ) : (
                  <>
                    <Star className="mr-2" size={18} />
                    Trouver des projets correspondants
                  </>
                )}
              </motion.button>
            </div>
            {error && (
              <motion.div 
                className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg flex items-center"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <AlertTriangle className="mr-2" size={16} />
                {error}
              </motion.div>
            )}
          </form>
        </motion.div>

        {/* Results Section */}
        {projects.length > 0 && (
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <span className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                {projects.length}
              </span>
              Projets correspondants à vos compétences
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence>
                {projects.map(project => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow"
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getMatchColor(project.matchScore)}`}>
                          {Math.round(project.matchScore)}% match
                        </span>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <span className="font-medium text-gray-700">{project.entreprise}</span>
                        <span className="mx-2">•</span>
                        <span className="flex items-center">
                          <MapPin className="mr-1" size={14} />
                          {project.localisation}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 mb-4 text-sm">{project.description}</p>
                      
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Compétences requises:</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.requiredSkills.map(skill => (
                            <span 
                              key={skill} 
                              className={`px-2 py-1 text-xs rounded ${
                                selectedSkills.includes(skill) 
                                  ? 'bg-blue-100 text-blue-800' 
                                  : 'bg-gray-100 text-gray-700'
                              }`}
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <DollarSign className="mr-1 text-gray-500" size={14} />
                          <span>{project.budget}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="mr-1 text-gray-500" size={14} />
                          <span>{project.duration}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Award className="mr-1 text-gray-500" size={14} />
                          <span>{project.niveau}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Briefcase className="mr-1 text-gray-500" size={14} />
                          <span>{project.contrat}</span>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => openApplication(project)}
                        className={`w-full flex items-center justify-center py-2 rounded-lg font-medium transition-all ${
                          project.matchScore < 50
                            ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                        }`}
                      >
                        Postuler maintenant <ChevronRight className="ml-1" size={16} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && projects.length === 0 && selectedSkills.length > 0 && (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="text-blue-500" size={36} />
              </div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">Aucun projet trouvé</h3>
              <p className="text-gray-500 mb-6">
                Nous n'avons pas trouvé de projets correspondant exactement à vos compétences. Essayez d'ajuster votre recherche.
              </p>
              <button
                onClick={() => setSelectedSkills([])}
                className="px-6 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 font-medium transition-colors"
              >
                Réinitialiser les filtres
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Application Popup */}
      <AnimatePresence>
        {showApplication && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-900">Postuler à {selectedProject?.title}</h2>
                  <button 
                    onClick={cancelApplication}
                    className="text-gray-400 hover:text-gray-500 rounded-full p-1"
                  >
                    <X size={20} />
                  </button>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                  <DollarSign size={14} />
                  <span>Budget: {selectedProject?.budget}</span>
                  <span>•</span>
                  <Clock size={14} />
                  <span>Durée: {selectedProject?.duration}</span>
                </div>
                
                {selectedProject?.matchScore < 50 && (
                  <div className="bg-amber-50 text-amber-800 p-3 rounded-lg mb-4 flex items-start">
                    <AlertTriangle className="mr-2 mt-0.5 flex-shrink-0" size={16} />
                    <div>
                      <p className="font-medium">Attention: Match faible ({Math.round(selectedProject?.matchScore)}%)</p>
                      <p className="text-sm">Votre profil ne correspond qu'à {Math.round(selectedProject?.matchScore)}% des compétences requises.</p>
                    </div>
                  </div>
                )}
                
                <div className="space-y-4">
                  <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message de motivation *</label>
                    <textarea
                      name="motivation"
                      value={applicationData.motivation}
                      onChange={handleApplicationChange}
                      className="w-full border rounded-lg px-4 py-3 min-h-[120px] focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Expliquez pourquoi vous êtes le meilleur candidat pour ce projet..."
                      rows="4"
                      required
                    ></textarea>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="form-group">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Votre tarif (DT) *</label>
                      <input
                        type="number"
                        name="rate"
                        value={applicationData.rate}
                        onChange={handleApplicationChange}
                        className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Ex: 2500"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Délai estimé *</label>
                      <input
                        type="text"
                        name="timeline"
                        value={applicationData.timeline}
                        onChange={handleApplicationChange}
                        className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Ex: 4 semaines"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ajouter un portfolio (optionnel)</label>
                    <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-blue-500 transition-colors">
                      <Upload className="text-gray-400 mb-2" size={24} />
                      <span className="text-sm text-gray-600">
                        {applicationData.portfolio 
                          ? applicationData.portfolio.name 
                          : "Glissez-déposez votre fichier ou cliquez pour sélectionner"}
                      </span>
                      <input
                        type="file"
                        name="portfolio"
                        onChange={handleApplicationChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end gap-3">
                  <button 
                    onClick={cancelApplication}
                    className="px-4 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={submitApplication}
                    disabled={!applicationData.motivation || !applicationData.rate || !applicationData.timeline || loading}
                    className={`px-6 py-2 rounded-lg font-medium flex items-center ${
                      !applicationData.motivation || !applicationData.rate || !applicationData.timeline || loading
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Envoi en cours...
                      </>
                    ) : (
                      'Envoyer la candidature'
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            className={`fixed top-6 right-6 px-5 py-3 rounded-lg shadow-lg text-white flex items-center gap-3 z-50 ${
              notification.type === 'success' 
                ? 'bg-emerald-500' 
                : 'bg-rose-500'
            }`}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {notification.type === 'success' ? (
              <CheckCircle size={20} className="text-emerald-100" />
            ) : (
              <AlertTriangle size={20} className="text-rose-100" />
            )}
            <div>
              <p className="font-medium">{notification.message}</p>
              {notification.project && (
                <p className="text-xs opacity-80">Projet: {notification.project}</p>
              )}
            </div>
            <button 
              onClick={() => setNotification(null)}
              className="ml-2 opacity-70 hover:opacity-100"
            >
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FreelancerMatchPage;