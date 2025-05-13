// responses.js - Module de réponses pour chatbot de recrutement

export const getCurrentTime = () => {
  return new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
};

export const getCurrentDate = () => {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return new Date().toLocaleDateString('fr-FR', options);
};

export const recruitmentResponses = {
  // Salutations
  "bonjour": {
    response: "Bonjour et bienvenue sur notre plateforme de recrutement ! Comment puis-je vous aider aujourd'hui ?",
    suggestions: ["Postes disponibles", "Processus de recrutement", "Dépôt de CV"]
  },
  "salut": {
    response: "Salut ! Prêt(e) à trouver l'opportunité parfaite ? Par quoi souhaitez-vous commencer ?",
    suggestions: ["Offres d'emploi", "Conseils carrière", "Contact RH"]
  },

  // Questions sur les postes
  "postes disponibles": {
    response: "Nous avons actuellement des ouvertures dans les domaines suivants : Développement, Marketing et RH. Quel domaine vous intéresse ?",
    suggestions: ["Développement", "Marketing", "RH", "Tous les postes"]
  },
  "développement": {
    response: "En développement, nous recherchons :\n- Développeur Fullstack (3 ans d'expérience)\n- Ingénieur DevOps (5 ans d'expérience)\nVoulez-vous plus de détails sur un poste ?",
    suggestions: ["Fullstack", "DevOps", "Critères techniques"]
  },
  "marketing": {
    response: "En marketing, nous avons ces opportunités :\n- Chef de produit digital\n- Spécialiste SEO\nQuel poste vous intéresse ?",
    suggestions: ["Chef de produit", "SEO", "Exigences"]
  },

  // Processus de recrutement
  "processus de recrutement": {
    response: "Notre processus comprend :\n1. Dépôt de candidature\n2. Entretien téléphonique\n3. Test technique\n4. Entretien final\nVoulez-vous des détails sur une étape ?",
    suggestions: ["Dépôt CV", "Entretien téléphonique", "Test technique", "Durée moyenne"]
  },
  "dépôt de cv": {
    response: "Vous pouvez déposer votre CV via notre plateforme en ligne. Souhaitez-vous que je vous envoie le lien ou avez-vous des questions spécifiques ?",
    suggestions: ["Lien plateforme", "Format recommandé", "Confidentialité"]
  },

  // Questions techniques
  "critères techniques": {
    response: "Pour les postes techniques, nous recherchons :\n- Maîtrise de JavaScript/TypeScript\n- Expérience avec React/Node.js\n- Connaissance des bonnes pratiques CI/CD\nCette réponse vous suffit ou voulez-vous plus de détails ?",
    suggestions: ["Stack technique", "Tests techniques", "Projets types"]
  },

  // Informations pratiques
  "heure": {
    response: `Il est actuellement ${getCurrentTime()}. Nos équipes RH sont disponibles de 9h à 18h.`,
    suggestions: ["Contacter RH", "Disponibilités"]
  },
  "date": {
    response: `Nous sommes le ${getCurrentDate()}. La plupart de nos processus de recrutement durent 2 à 3 semaines.`,
    suggestions: ["Délais", "Dates importantes"]
  },

  // Fin de conversation
  "au revoir": {
    response: "Au revoir et bonne chance pour votre recherche ! N'hésitez pas à revenir si vous avez d'autres questions.",
    suggestions: []
  },
  "merci": {
    response: "Je vous en prie ! Souhaitez-vous que je vous aide sur un autre sujet ou avez-vous terminé ?",
    suggestions: ["Autre question", "Terminer"]
  },

  // Par défaut
  "default": {
    response: "Je n'ai pas bien compris votre demande. Voici quelques sujets que je peux traiter :",
    suggestions: ["Postes disponibles", "Processus", "Contact RH"]
  }
};

// Fonction pour trouver la meilleure réponse
export const getRecruitmentResponse = (message) => {
  const lowerMessage = message.toLowerCase();
  
  // Recherche par mot-clé prioritaire
  const exactMatch = Object.keys(recruitmentResponses).find(key => 
    lowerMessage.includes(key.toLowerCase())
  );
  
  if (exactMatch) {
    return recruitmentResponses[exactMatch];
  }
  
  // Recherche approximative pour les requêtes complexes
  const keywords = {
    "emploi": "postes disponibles",
    "travailler": "postes disponibles",
    "candidature": "dépôt de cv",
    "entretien": "processus de recrutement",
    "compétences": "critères techniques",
    "techno": "critères techniques"
  };
  
  const foundKeyword = Object.keys(keywords).find(key => 
    lowerMessage.includes(key)
  );
  
  return foundKeyword 
    ? recruitmentResponses[keywords[foundKeyword]] 
    : recruitmentResponses.default;
};