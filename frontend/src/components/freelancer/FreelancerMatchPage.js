import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle, 
  AlertTriangle, 
  X, 
  Search, 
  Upload, 
  FileText, 
  Briefcase, 
  Star, 
  ChevronRight, 
  Clock, 
  DollarSign, 
  MapPin, 
  Award,
  Loader2
} from 'lucide-react';

const FreelancerMatchPage = () => {
  // État initial
  const [state, setState] = useState({
    skillsInput: '',
    projects: [],
    loading: false,
    error: null,
    selectedProject: null,
    isModalOpen: false,
    application: { cv: null, coverLetter: '' },
    notification: null,
    selectedSkills: []
  });

  // Compétences suggérées
  const suggestedSkills = [
    'React', 'Node.js', 'JavaScript', 'Python', 'Django',
    'Vue', 'Angular', 'TypeScript', 'PHP', 'Laravel',
    'Java', 'Spring Boot', 'C#', '.NET', 'Swift',
    'Flutter', 'React Native', 'MongoDB', 'PostgreSQL', 'MySQL',
    'UI/UX Design', 'GraphQL', 'AWS', 'Docker', 'Kubernetes'
  ];

  // Gestionnaire de notification
  useEffect(() => {
    if (state.notification) {
      const timer = setTimeout(() => {
        setState(prev => ({ ...prev, notification: null }));
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [state.notification]);

  // Méthodes
  const addSkill = (skill) => {
    if (!state.selectedSkills.includes(skill)) {
      setState(prev => ({
        ...prev,
        selectedSkills: [...prev.selectedSkills, skill],
        skillsInput: ''
      }));
    }
  };

  const removeSkill = (skill) => {
    setState(prev => ({
      ...prev,
      selectedSkills: prev.selectedSkills.filter(s => s !== skill)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (state.selectedSkills.length === 0) {
      setState(prev => ({ ...prev, error: "Veuillez sélectionner au moins une compétence" }));
      return;
    }

    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockProjects = generateMockProjects(state.selectedSkills);
      setState(prev => ({ ...prev, projects: mockProjects }));
    } catch (err) {
      setState(prev => ({ ...prev, error: "Une erreur est survenue lors du matching. Veuillez réessayer." }));
    } finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  };

  const generateMockProjects = (selectedSkills) => {
    return [
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
        matchScore: calculateMatchScore(selectedSkills, ["React Native", "JavaScript", "UI/UX Design"]),
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
        matchScore: calculateMatchScore(selectedSkills, ["Node.js", "MongoDB", "JavaScript", "AWS"]),
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
        matchScore: calculateMatchScore(selectedSkills, ["React", "JavaScript", "TypeScript", "Node.js"]),
        posted: "3 jours"
      }
    ];
  };

  const calculateMatchScore = (userSkills, projectSkills) => {
    const matchingSkills = userSkills.filter(s => projectSkills.includes(s)).length;
    return Math.min(100, matchingSkills * (100 / projectSkills.length));
  };

  const submitApplication = async () => {
    if (!state.application.cv) {
      setState(prev => ({ ...prev, error: "Veuillez uploader votre CV" }));
      return;
    }

    try {
      await new Promise(r => setTimeout(r, 1500));
      
      setState(prev => ({
        ...prev,
        notification: { 
          message: 'Candidature envoyée avec succès!', 
          type: 'success',
          project: prev.selectedProject.title
        },
        isModalOpen: false,
        application: { cv: null, coverLetter: '' }
      }));
    } catch {
      setState(prev => ({
        ...prev,
        notification: { 
          message: "Erreur lors de l'envoi de la candidature", 
          type: 'error' 
        }
      }));
    }
  };

  // Fonctions utilitaires
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
        <HeaderSection />
        
        {/* Search Form */}
        <SearchForm 
          state={state}
          setState={setState}
          suggestedSkills={suggestedSkills}
          addSkill={addSkill}
          removeSkill={removeSkill}
          handleSubmit={handleSubmit}
        />

        {/* Results Section */}
        <ResultsSection 
          projects={state.projects} 
          loading={state.loading}
          selectedSkills={state.selectedSkills}
          setSelectedProject={(project) => setState(prev => ({ ...prev, selectedProject: project }))}
          setIsModalOpen={(isOpen) => setState(prev => ({ ...prev, isModalOpen: isOpen }))}
          getMatchColor={getMatchColor}
          setSelectedSkills={(skills) => setState(prev => ({ ...prev, selectedSkills: skills }))}
        />

        {/* Application Modal */}
        <ApplicationModal
          isOpen={state.isModalOpen}
          onClose={() => setState(prev => ({ ...prev, isModalOpen: false }))}
          project={state.selectedProject}
          application={state.application}
          setApplication={(app) => setState(prev => ({ ...prev, application: app }))}
          onSubmit={submitApplication}
          getMatchColor={getMatchColor}
        />

        {/* Notification */}
        <Notification 
          notification={state.notification}
          onClose={() => setState(prev => ({ ...prev, notification: null }))}
        />
      </div>
    </motion.div>
  );
};

// Composants séparés
const HeaderSection = () => (
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
);

const SearchForm = ({ state, setState, suggestedSkills, addSkill, removeSkill, handleSubmit }) => (
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
            value={state.skillsInput}
            onChange={(e) => setState(prev => ({ ...prev, skillsInput: e.target.value }))}
            className="flex-1 outline-none text-gray-700 placeholder-gray-400"
            placeholder="Rechercher une compétence..."
          />
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {state.selectedSkills.map(skill => (
            <SkillTag key={skill} skill={skill} removable onRemove={() => removeSkill(skill)} />
          ))}
        </div>
        
        <SkillsGrid 
          skills={suggestedSkills}
          filter={state.skillsInput}
          selectedSkills={state.selectedSkills}
          onSkillClick={addSkill}
        />
      </div>
      
      <SubmitButton 
        loading={state.loading}
        disabled={state.selectedSkills.length === 0}
      />
      
      {state.error && (
        <ErrorDisplay error={state.error} />
      )}
    </form>
  </motion.div>
);

const SkillTag = ({ skill, removable, onRemove }) => (
  <motion.span 
    initial={{ scale: 0.9 }}
    animate={{ scale: 1 }}
    className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium flex items-center"
  >
    {skill}
    {removable && (
      <button 
        onClick={onRemove}
        className="ml-2 hover:text-blue-900 transition-colors"
      >
        <X size={16} />
      </button>
    )}
  </motion.span>
);

const SkillsGrid = ({ skills, filter, selectedSkills, onSkillClick }) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 mb-4">
    {skills
      .filter(skill => 
        skill.toLowerCase().includes(filter.toLowerCase()) && 
        !selectedSkills.includes(skill)
      )
      .map(skill => (
        <motion.button
          type="button"
          key={skill}
          onClick={() => onSkillClick(skill)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gray-50 hover:bg-blue-50 border border-gray-200 text-gray-700 hover:text-blue-600 text-sm rounded-lg px-3 py-2 flex items-center justify-center transition-all"
        >
          {skill}
        </motion.button>
      ))}
  </div>
);

const SubmitButton = ({ loading, disabled }) => (
  <div className="flex justify-center">
    <motion.button
      type="submit"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`px-8 py-3 rounded-xl font-semibold text-lg flex items-center transition-all ${
        loading || disabled
          ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
          : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg'
      }`}
      disabled={loading || disabled}
    >
      {loading ? (
        <>
          <Loader2 className="animate-spin mr-3 h-5 w-5 text-white" />
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
);

const ErrorDisplay = ({ error }) => (
  <motion.div 
    className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg flex items-center"
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
  >
    <AlertTriangle className="mr-2" size={16} />
    {error}
  </motion.div>
);

const ResultsSection = ({ 
  projects, 
  loading, 
  selectedSkills, 
  setSelectedProject, 
  setIsModalOpen, 
  getMatchColor,
  setSelectedSkills 
}) => {
  if (loading) return null;
  
  if (!loading && projects.length === 0 && selectedSkills.length > 0) {
    return <EmptyResults onReset={() => setSelectedSkills([])} />;
  }

  return (
    <motion.div 
      className="mb-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <ResultsHeader count={projects.length} />
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {projects.map(project => (
            <ProjectCard 
              key={project.id}
              project={project}
              onSelect={() => {
                setSelectedProject(project);
                setIsModalOpen(true);
              }}
              getMatchColor={getMatchColor}
            />
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const ProjectCard = ({ project, onSelect, getMatchColor }) => (
  <motion.div
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
                project.selectedSkills?.includes(skill) 
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
      
      <div className="space-y-3">
        <button
          onClick={onSelect}
          className={`w-full flex items-center justify-center py-2 rounded-lg font-medium transition-all ${
            project.matchScore < 50
              ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          Postuler maintenant <ChevronRight className="ml-1" size={16} />
        </button>
        
        {project.matchScore < 50 && (
          <div className="text-xs text-amber-600 flex items-center">
            <AlertTriangle className="mr-1" size={14} />
            Votre profil ne correspond qu'à {Math.round(project.matchScore)}% des compétences requises
          </div>
        )}
      </div>
    </div>
  </motion.div>
);

const EmptyResults = ({ onReset }) => (
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
        onClick={onReset}
        className="px-6 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 font-medium transition-colors"
      >
        Réinitialiser les filtres
      </button>
    </div>
  </motion.div>
);

const ResultsHeader = ({ count }) => (
  <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
    <span className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center mr-3">
      {count}
    </span>
    Projets correspondants à vos compétences
  </h2>
);

const ApplicationModal = ({ isOpen, onClose, project, application, setApplication, onSubmit, getMatchColor }) => (
  <AnimatePresence>
    {isOpen && (
      <ModalOverlay onClose={onClose}>
        <ModalContent 
          project={project}
          application={application}
          setApplication={setApplication}
          onSubmit={onSubmit}
          onClose={onClose}
          getMatchColor={getMatchColor}
        />
      </ModalOverlay>
    )}
  </AnimatePresence>
);

const ModalOverlay = ({ children, onClose }) => (
  <motion.div
    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onClick={onClose}
  >
    {children}
  </motion.div>
);

const ModalContent = ({ project, application, setApplication, onSubmit, onClose, getMatchColor }) => (
  <motion.div
    className="bg-white rounded-xl shadow-2xl w-full max-w-md"
    initial={{ scale: 0.95, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    exit={{ scale: 0.95, opacity: 0 }}
    transition={{ type: "spring", damping: 25 }}
    onClick={(e) => e.stopPropagation()}
  >
    <div className="p-6">
      <ModalHeader title={project?.title} onClose={onClose} />
      
      {project?.matchScore < 50 && (
        <LowMatchWarning score={project?.matchScore} />
      )}
      
      <ApplicationForm 
        application={application}
        setApplication={setApplication}
      />
      
      <ModalActions 
        onClose={onClose}
        onSubmit={onSubmit}
        hasCV={!!application.cv}
      />
    </div>
  </motion.div>
);

const ModalHeader = ({ title, onClose }) => (
  <div className="flex justify-between items-center mb-4">
    <h2 className="text-xl font-bold text-gray-900">Postuler à {title}</h2>
    <button 
      onClick={onClose}
      className="text-gray-400 hover:text-gray-500 rounded-full p-1"
    >
      <X size={20} />
    </button>
  </div>
);

const LowMatchWarning = ({ score }) => (
  <div className="bg-amber-50 text-amber-800 p-3 rounded-lg mb-4 flex items-start">
    <AlertTriangle className="mr-2 mt-0.5 flex-shrink-0" size={16} />
    <div>
      <p className="font-medium">Attention: Match faible ({Math.round(score)}%)</p>
      <p className="text-sm">Votre profil ne correspond qu'à {Math.round(score)}% des compétences requises. Vous pouvez toujours postuler, mais vos chances peuvent être réduites.</p>
    </div>
  </div>
);

const ApplicationForm = ({ application, setApplication }) => (
  <div className="space-y-4">
    <FileUpload 
      label="CV (PDF uniquement)"
      icon={<Upload size={24} />}
      file={application.cv}
      onChange={(file) => setApplication({ ...application, cv: file })}
      accept=".pdf"
    />
    
    <TextAreaInput 
      label={
        <>
          <FileText className="mr-1" size={16} />
          Lettre de motivation (optionnelle)
        </>
      }
      value={application.coverLetter}
      onChange={(value) => setApplication({ ...application, coverLetter: value })}
      placeholder="Expliquez pourquoi vous êtes le meilleur candidat pour ce projet..."
    />
  </div>
);

const FileUpload = ({ label, icon, file, onChange, accept }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-blue-500 transition-colors">
      {icon && React.cloneElement(icon, { className: "text-gray-400 mb-2" })}
      <span className="text-sm text-gray-600">
        {file ? file.name : "Glissez-déposez votre fichier ou cliquez pour sélectionner"}
      </span>
      <input
        type="file"
        accept={accept}
        onChange={(e) => onChange(e.target.files[0])}
        className="hidden"
      />
    </label>
  </div>
);

const TextAreaInput = ({ label, value, onChange, placeholder }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
      {label}
    </label>
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border rounded-lg px-4 py-3 min-h-[120px] focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      placeholder={placeholder}
    />
  </div>
);

const ModalActions = ({ onClose, onSubmit, hasCV }) => (
  <div className="mt-6 flex justify-end gap-3">
    <button 
      onClick={onClose}
      className="px-4 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition-colors"
    >
      Annuler
    </button>
    <button
      onClick={onSubmit}
      disabled={!hasCV}
      className={`px-6 py-2 rounded-lg font-medium flex items-center ${
        !hasCV 
          ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
          : 'bg-blue-600 hover:bg-blue-700 text-white'
      }`}
    >
      {!hasCV ? (
        'CV requis'
      ) : (
        <>
          Envoyer la candidature
          <ChevronRight className="ml-1" size={16} />
        </>
      )}
    </button>
  </div>
);

const Notification = ({ notification, onClose }) => (
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
          onClick={onClose}
          className="ml-2 opacity-70 hover:opacity-100"
        >
          <X size={16} />
        </button>
      </motion.div>
    )}
  </AnimatePresence>
);

export default FreelancerMatchPage;