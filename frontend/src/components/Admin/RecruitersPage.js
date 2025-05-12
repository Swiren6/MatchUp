import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Avatar,
  Chip,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  CircularProgress
} from '@mui/material';
import {
  Work as WorkIcon,
  Person as PersonIcon,
  ExpandMore as ExpandMoreIcon,
  Business as BusinessIcon,
  People as PeopleIcon,
  Description as DescriptionIcon
} from '@mui/icons-material';

// Données mock (à remplacer par votre API)
const mockOffers = [
  {
    id: 1,
    title: "Développeur React Senior",
    description: "Nous recherchons un développeur React expérimenté pour notre équipe frontend.",
    recruiter: {
      id: 101,
      name: "TechCorp",
      email: "recrutement@techcorp.com",
      avatar: "/recruiters/techcorp.jpg"
    },
    postulations: [
      {
        freelancer: {
          id: 201,
          name: "Jean Dupont",
          email: "jean.dupont@example.com",
          skills: ["React", "Node.js", "TypeScript"]
        },
        date: "2023-05-15",
        status: "En attente"
      },
      {
        freelancer: {
          id: 202,
          name: "Marie Martin",
          email: "marie.martin@example.com",
          skills: ["React", "Redux", "Jest"]
        },
        date: "2023-05-16",
        status: "En revue"
      }
    ],
    createdAt: "2023-05-10",
    status: "Active"
  },
  {
    id: 2,
    title: "Designer UI/UX",
    description: "Poste pour designer d'interface avec expérience en Figma et recherche utilisateur.",
    recruiter: {
      id: 102,
      name: "DesignStudio",
      email: "contact@designstudio.com",
      avatar: "/recruiters/designstudio.jpg"
    },
    postulations: [
      {
        freelancer: {
          id: 203,
          name: "Sophie Leroy",
          email: "sophie.leroy@example.com",
          skills: ["Figma", "UX Research", "Prototypage"]
        },
        date: "2023-05-18",
        status: "Accepté"
      }
    ],
    createdAt: "2023-05-12",
    status: "Active"
  }
];

const RecruitersPage = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOffer, setExpandedOffer] = useState(null);

  useEffect(() => {
    // Simuler un appel API
    const fetchOffers = async () => {
      try {
        setLoading(true);
        // Ici vous ferez un vrai appel API :
        // const response = await axios.get('/api/offers');
        // setOffers(response.data);
        
        // Pour l'instant on utilise les mock data
        setOffers(mockOffers);
      } catch (error) {
        console.error("Erreur lors du chargement des offres:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  const handleExpandOffer = (offerId) => {
    setExpandedOffer(expandedOffer === offerId ? null : offerId);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
        <WorkIcon sx={{ mr: 2, fontSize: '2rem' }} />
        Gestion des Recruteurs 
      </Typography>

      <Grid container spacing={3}>
        {offers.map((offer) => (
          <Grid item xs={12} key={offer.id}>
            <Card elevation={3}>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="h5" component="div">
                      {offer.title}
                    </Typography>
                    <Box display="flex" alignItems="center" mt={1} mb={2}>
                      <BusinessIcon color="action" sx={{ mr: 1 }} />
                      <Typography variant="body1" color="text.secondary">
                        Publiée par: {offer.recruiter.name}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Box display="flex" alignItems="center">
                    <Chip 
                      label={`${offer.postulations.length} postulation(s)`}
                      color="primary"
                      variant="outlined"
                      sx={{ mr: 2 }}
                    />
                    <Button
                      variant="outlined"
                      onClick={() => handleExpandOffer(offer.id)}
                      endIcon={<ExpandMoreIcon />}
                    >
                      Détails
                    </Button>
                  </Box>
                </Box>

                <Accordion expanded={expandedOffer === offer.id} onChange={() => handleExpandOffer(offer.id)}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Détails complets de l'offre</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box mb={3}>
                      <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                        <DescriptionIcon sx={{ mr: 1 }} />
                        Description de l'offre
                      </Typography>
                      <Typography paragraph>
                        {offer.description}
                      </Typography>
                      
                      <Box display="flex" gap={2} mt={2}>
                        <Chip label={`Statut: ${offer.status}`} />
                        <Chip label={`Date: ${new Date(offer.createdAt).toLocaleDateString()}`} />
                      </Box>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                      <PeopleIcon sx={{ mr: 1 }} />
                      Freelances ayant postulé ({offer.postulations.length})
                    </Typography>

                    {offer.postulations.length > 0 ? (
                      <Grid container spacing={2}>
                        {offer.postulations.map((postulation, index) => (
                          <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card variant="outlined">
                              <CardContent>
                                <Box display="flex" alignItems="center" mb={1}>
                                  <Avatar src={`/freelancers/${postulation.freelancer.id}.jpg`} sx={{ mr: 2 }}>
                                    <PersonIcon />
                                  </Avatar>
                                  <Box>
                                    <Typography variant="subtitle1">{postulation.freelancer.name}</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                      {postulation.freelancer.email}
                                    </Typography>
                                  </Box>
                                </Box>
                                
                                <Box mt={1}>
                                  <Typography variant="body2">Compétences:</Typography>
                                  <Box display="flex" flexWrap="wrap" gap={0.5} mt={0.5}>
                                    {postulation.freelancer.skills.map((skill, i) => (
                                      <Chip key={i} label={skill} size="small" />
                                    ))}
                                  </Box>
                                </Box>
                                
                                <Box mt={2} display="flex" justifyContent="space-between">
                                  <Typography variant="caption">
                                    Postulé le: {new Date(postulation.date).toLocaleDateString()}
                                  </Typography>
                                  <Chip 
                                    label={postulation.status} 
                                    size="small" 
                                    color={
                                      postulation.status === "Accepté" ? "success" : 
                                      postulation.status === "Refusé" ? "error" : "default"
                                    }
                                  />
                                </Box>
                              </CardContent>
                            </Card>
                          </Grid>
                        ))}
                      </Grid>
                    ) : (
                      <Typography color="text.secondary" fontStyle="italic">
                        Aucun freelance n'a encore postulé à cette offre.
                      </Typography>
                    )}
                  </AccordionDetails>
                </Accordion>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default RecruitersPage;