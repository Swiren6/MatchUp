import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Box,
  Typography,
  Avatar,
  Chip,
  CircularProgress,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Grid,
  Card,
  CardContent,
  Divider,
  Badge,
  Button
} from '@mui/material';
import {
  Work as WorkIcon,
  Person as PersonIcon,
  Business as BusinessIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Search as SearchIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Close as CloseIcon,
  People as PeopleIcon,
  Euro as EuroIcon,
  Place as PlaceIcon,
  Code as CodeIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Styles personnalisés avec styled-components
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:hover': {
    backgroundColor: theme.palette.action.selected,
  },
}));

const StatusChip = styled(Chip)(({ theme, status }) => ({
  fontWeight: 600,
  backgroundColor: status === "Active" 
    ? theme.palette.success.light 
    : theme.palette.error.light,
  color: status === "Active" 
    ? theme.palette.success.dark 
    : theme.palette.error.dark,
}));

const SkillChip = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.primary.dark,
  fontWeight: 500,
}));

const mockOffers = [
  {
    id: 1,
    title: "Développeur React Senior",
    description: "Nous recherchons un développeur React expérimenté pour notre équipe frontend. Mission longue durée avec possibilité de télétravail.",
    location: "Paris",
    budget: "70-80K",
    skills: ["React", "Node.js", "TypeScript", "Redux"],
    status: "Active",
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
          skills: ["React", "Node.js", "TypeScript"],
          avatar: "/freelancers/201.jpg",
          rating: 4.8
        },
        date: "2023-05-15",
        status: "En attente"
      },
      {
        freelancer: {
          id: 202,
          name: "Marie Martin",
          email: "marie.martin@example.com",
          skills: ["React", "GraphQL", "Jest"],
          avatar: "/freelancers/202.jpg",
          rating: 4.5
        },
        date: "2023-05-18",
        status: "En attente"
      }
    ],
    createdAt: "2023-05-10"
  },
  {
    id: 2,
    title: "UX/UI Designer",
    description: "Recherche d'un designer UX/UI pour refonte complète de notre application mobile.",
    location: "Remote",
    budget: "60-70K",
    skills: ["Figma", "Adobe XD", "UI Design", "Prototypage"],
    status: "Active",
    recruiter: {
      id: 102,
      name: "DesignCo",
      email: "contact@designco.com",
      avatar: "/recruiters/designco.jpg"
    },
    postulations: [],
    createdAt: "2023-06-01"
  }
];

const OffersPage = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [openFreelancersModal, setOpenFreelancersModal] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [currentOffer, setCurrentOffer] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    budget: '',
    skills: [],
    status: 'Active',
    currentSkill: ''
  });

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        setLoading(true);
        // Simuler un chargement asynchrone
        await new Promise(resolve => setTimeout(resolve, 800));
        setOffers(mockOffers);
      } catch (error) {
        console.error("Erreur lors du chargement des offres:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const filteredOffers = offers.filter(offer => {
    const matchesSearch = offer.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         offer.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         offer.recruiter.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || offer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleOpenFreelancersModal = (offer) => {
    setSelectedOffer(offer);
    setOpenFreelancersModal(true);
  };

  const handleCloseFreelancersModal = () => {
    setOpenFreelancersModal(false);
    setSelectedOffer(null);
  };

  const handleStatusChange = (postulationId, newStatus) => {
    setOffers(prevOffers => 
      prevOffers.map(offer => ({
        ...offer,
        postulations: offer.postulations.map(post => 
          post.freelancer.id === postulationId ? { ...post, status: newStatus } : post
        )
      }))
    );
  };

  const handleDeleteOffer = (offerId) => {
    setOffers(prevOffers => prevOffers.filter(offer => offer.id !== offerId));
  };

  const handleOpenForm = (offer = null) => {
    setCurrentOffer(offer);
    if (offer) {
      setFormData({
        title: offer.title,
        description: offer.description,
        location: offer.location,
        budget: offer.budget,
        skills: [...offer.skills],
        status: offer.status,
        currentSkill: ''
      });
    } else {
      setFormData({
        title: '',
        description: '',
        location: '',
        budget: '',
        skills: [],
        status: 'Active',
        currentSkill: ''
      });
    }
    setShowForm(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddSkill = () => {
    if (formData.currentSkill.trim() && !formData.skills.includes(formData.currentSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, prev.currentSkill.trim()],
        currentSkill: ''
      }));
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddSkill();
    }
  };

  const handleSubmit = () => {
    if (currentOffer) {
      // Mise à jour de l'offre existante
      setOffers(prev => prev.map(offer => 
        offer.id === currentOffer.id ? { 
          ...offer, 
          title: formData.title,
          description: formData.description,
          location: formData.location,
          budget: formData.budget,
          skills: formData.skills,
          status: formData.status
        } : offer
      ));
    } else {
      // Création d'une nouvelle offre
      const newOffer = {
        id: Math.max(...offers.map(o => o.id), 0) + 1,
        title: formData.title,
        description: formData.description,
        location: formData.location,
        budget: formData.budget,
        skills: formData.skills,
        status: formData.status,
        recruiter: {
          id: 100,
          name: "Mon Entreprise",
          email: "contact@monentreprise.com",
          avatar: "/recruiters/default.jpg"
        },
        postulations: [],
        createdAt: new Date().toISOString().split('T')[0]
      };
      setOffers(prev => [...prev, newOffer]);
    }
    setShowForm(false);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, maxWidth: '1600px', margin: '0 auto' }}>
      {/* Header avec titre et actions */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 4,
        flexWrap: 'wrap',
        gap: 2
      }}>
        <Typography variant="h4" sx={{ 
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          color: 'primary.main'
        }}>
          <WorkIcon sx={{ mr: 2, fontSize: '2.2rem' }} />
          Gestion des Offres
          <Badge 
            badgeContent={offers.length} 
            color="primary" 
            sx={{ ml: 2 }}
            showZero
          />
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Rechercher offres..."
            InputProps={{
              startAdornment: <SearchIcon sx={{ color: 'action.active', mr: 1 }} />,
              sx: { borderRadius: '8px', backgroundColor: 'background.paper' }
            }}
            onChange={handleSearchChange}
            sx={{ minWidth: 250 }}
          />
          
          <FormControl sx={{ minWidth: 180 }} size="small">
            <InputLabel>Filtrer par statut</InputLabel>
            <Select
              value={statusFilter}
              label="Filtrer par statut"
              onChange={handleStatusFilterChange}
              sx={{ borderRadius: '8px' }}
            >
              <MenuItem value="all">Toutes les offres</MenuItem>
              <MenuItem value="Active">Actives seulement</MenuItem>
              <MenuItem value="Expirée">Expirées seulement</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => handleOpenForm()}
            sx={{
              borderRadius: '8px',
              px: 3,
              textTransform: 'none',
              fontWeight: 600,
              boxShadow: '0 2px 10px rgba(108, 92, 231, 0.3)',
              '&:hover': {
                boxShadow: '0 4px 14px rgba(108, 92, 231, 0.4)',
                transform: 'translateY(-1px)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            Nouvelle offre
          </Button>
        </Box>
      </Box>

      {/* Tableau des offres */}
      <Paper elevation={3} sx={{ 
        borderRadius: '12px',
        overflow: 'hidden',
        mb: 4
      }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ 
                backgroundColor: 'primary.main',
                '& th': { 
                  color: 'common.white',
                  fontWeight: 600,
                  fontSize: '0.95rem'
                }
              }}>
                <TableCell sx={{ width: '25%' }}>Titre</TableCell>
                <TableCell sx={{ width: '20%' }}>Entreprise</TableCell>
                <TableCell>Localisation</TableCell>
                <TableCell>Budget</TableCell>
                <TableCell>Compétences</TableCell>
                <TableCell>Statut</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOffers.length > 0 ? (
                filteredOffers.map((offer) => (
                  <StyledTableRow key={offer.id}>
                    <TableCell sx={{ fontWeight: 500 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar 
                          src={offer.recruiter.avatar} 
                          sx={{ 
                            mr: 2, 
                            width: 36, 
                            height: 36,
                            backgroundColor: 'primary.light'
                          }}
                        >
                          <BusinessIcon />
                        </Avatar>
                        {offer.title}
                      </Box>
                    </TableCell>
                    <TableCell>{offer.recruiter.name}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <PlaceIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                        {offer.location}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <EuroIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                        {offer.budget}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {offer.skills.map((skill, index) => (
                          <SkillChip 
                            key={index} 
                            label={skill} 
                            size="small" 
                            icon={<CodeIcon fontSize="small" />}
                          />
                        ))}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <StatusChip 
                        label={offer.status} 
                        size="small"
                        status={offer.status}
                      />
                    </TableCell>
                    <TableCell align="center" sx={{ minWidth: 150 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                        <Tooltip title="Voir candidats">
                          <IconButton 
                            onClick={() => handleOpenFreelancersModal(offer)}
                            sx={{ 
                              backgroundColor: offer.postulations.length > 0 
                                ? 'primary.light' 
                                : 'transparent',
                              '&:hover': {
                                backgroundColor: 'primary.light'
                              }
                            }}
                          >
                            <Badge 
                              badgeContent={offer.postulations.length} 
                              color="primary"
                              max={9}
                            >
                              <PeopleIcon color="primary" />
                            </Badge>
                          </IconButton>
                        </Tooltip>
                        
                        <Tooltip title="Modifier">
                          <IconButton 
                            onClick={() => handleOpenForm(offer)}
                            sx={{ 
                              backgroundColor: 'action.hover',
                              '&:hover': {
                                backgroundColor: 'primary.light',
                                color: 'primary.main'
                              }
                            }}
                          >
                            <EditIcon color="primary" />
                          </IconButton>
                        </Tooltip>
                        
                        <Tooltip title="Supprimer">
                          <IconButton 
                            onClick={() => handleDeleteOffer(offer.id)}
                            sx={{ 
                              backgroundColor: 'action.hover',
                              '&:hover': {
                                backgroundColor: 'error.light',
                                color: 'error.main'
                              }
                            }}
                          >
                            <DeleteIcon color="error" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </StyledTableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                    <Typography variant="body1" color="text.secondary">
                      Aucune offre trouvée
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Modal pour les candidats */}
      <Dialog 
        open={openFreelancersModal} 
        onClose={handleCloseFreelancersModal} 
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '16px',
            overflow: 'hidden'
          }
        }}
      >
        <DialogTitle sx={{ 
          backgroundColor: 'primary.main',
          color: 'common.white',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          py: 2,
          px: 3
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <PeopleIcon sx={{ mr: 2 }} />
            <Typography variant="h6" component="div">
              Candidats pour: {selectedOffer?.title}
            </Typography>
          </Box>
          <IconButton
            edge="end"
            onClick={handleCloseFreelancersModal}
            sx={{ color: 'common.white' }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        
        <DialogContent dividers sx={{ p: 0 }}>
          {selectedOffer?.postulations.length > 0 ? (
            <Grid container spacing={2} sx={{ p: 3 }}>
              {selectedOffer.postulations.map((postulation, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Card 
                    variant="outlined"
                    sx={{
                      borderRadius: '12px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 6px 16px rgba(0,0,0,0.15)'
                      }
                    }}
                  >
                    <CardContent>
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        mb: 2,
                        gap: 2
                      }}>
                        <Avatar 
                          src={postulation.freelancer.avatar} 
                          sx={{ 
                            width: 56, 
                            height: 56,
                            backgroundColor: 'primary.light'
                          }}
                        >
                          <PersonIcon />
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle1" fontWeight={600}>
                            {postulation.freelancer.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {postulation.freelancer.email}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                            <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
                              Note:
                            </Typography>
                            <Box sx={{ 
                              display: 'flex',
                              alignItems: 'center',
                              backgroundColor: 'primary.light',
                              color: 'primary.dark',
                              px: 1,
                              borderRadius: '4px',
                              fontSize: '0.8rem',
                              fontWeight: 600
                            }}>
                              {postulation.freelancer.rating}/5
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                      
                      <Divider sx={{ my: 2 }} />
                      
                      <Box>
                        <Typography variant="body2" fontWeight={600} mb={1}>
                          Compétences:
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                          {postulation.freelancer.skills.map((skill, i) => (
                            <Chip 
                              key={i} 
                              label={skill} 
                              size="small"
                              sx={{
                                backgroundColor: 'primary.light',
                                color: 'primary.dark'
                              }}
                            />
                          ))}
                        </Box>
                      </Box>
                      
                      <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mt: 3
                      }}>
                        <Typography variant="caption" color="text.secondary">
                          Postulé le: {new Date(postulation.date).toLocaleDateString('fr-FR')}
                        </Typography>
                        
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Tooltip title="Accepter la candidature">
                            <Button
                              variant="contained"
                              color="success"
                              size="small"
                              startIcon={<CheckCircleIcon />}
                              onClick={() => {
                                handleStatusChange(postulation.freelancer.id, "Accepté");
                                handleCloseFreelancersModal();
                              }}
                              sx={{
                                textTransform: 'none',
                                borderRadius: '8px',
                                px: 2,
                                fontWeight: 500
                              }}
                            >
                              Accepter
                            </Button>
                          </Tooltip>
                          
                          <Tooltip title="Refuser la candidature">
                            <Button
                              variant="outlined"
                              color="error"
                              size="small"
                              startIcon={<CancelIcon />}
                              onClick={() => {
                                handleStatusChange(postulation.freelancer.id, "Refusé");
                                handleCloseFreelancersModal();
                              }}
                              sx={{
                                textTransform: 'none',
                                borderRadius: '8px',
                                px: 2,
                                fontWeight: 500
                              }}
                            >
                              Refuser
                            </Button>
                          </Tooltip>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center',
              py: 6
            }}>
              <PeopleIcon sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} />
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Aucun candidat pour cette offre
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Partagez cette offre pour attirer des candidats qualifiés
              </Typography>
            </Box>
          )}
        </DialogContent>
      </Dialog>

      {/* Modal pour le formulaire d'offre */}
      <Dialog
        open={showForm}
        onClose={() => setShowForm(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '16px',
            overflow: 'hidden'
          }
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <DialogTitle sx={{ 
            backgroundColor: 'primary.main',
            color: 'common.white',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            py: 2,
            px: 3
          }}>
            <Typography variant="h6" component="div">
              {currentOffer ? 'Modifier une offre' : 'Créer une nouvelle offre'}
            </Typography>
            <IconButton
              edge="end"
              onClick={() => setShowForm(false)}
              sx={{ color: 'common.white' }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          
          <DialogContent dividers sx={{ py: 3, px: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Titre de l'offre *"
                  name="title"
                  value={formData.title}
                  onChange={handleFormChange}
                  variant="outlined"
                  size="medium"
                  InputProps={{
                    startAdornment: <WorkIcon sx={{ color: 'action.active', mr: 1 }} />
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px'
                    }
                  }}
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Statut *</InputLabel>
                  <Select
                    name="status"
                    value={formData.status}
                    onChange={handleFormChange}
                    label="Statut *"
                    sx={{ borderRadius: '8px' }}
                  >
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Expirée">Expirée</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description détaillée *"
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  variant="outlined"
                  multiline
                  rows={4}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px'
                    }
                  }}
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Localisation *"
                  name="location"
                  value={formData.location}
                  onChange={handleFormChange}
                  variant="outlined"
                  InputProps={{
                    startAdornment: <PlaceIcon sx={{ color: 'action.active', mr: 1 }} />
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px'
                    }
                  }}
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Budget *"
                  name="budget"
                  value={formData.budget}
                  onChange={handleFormChange}
                  variant="outlined"
                  InputProps={{
                    startAdornment: <EuroIcon sx={{ color: 'action.active', mr: 1 }} />
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px'
                    }
                  }}
                />
              </Grid>
              
              <Grid item xs={12}>
                <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
                  Compétences requises
                </Typography>
                
                <Box sx={{ 
                  display: 'flex', 
                  gap: 2,
                  mb: 2,
                  flexWrap: 'wrap'
                }}>
                  {formData.skills.map((skill, index) => (
                    <Chip
                      key={index}
                      label={skill}
                      onDelete={() => handleRemoveSkill(skill)}
                      sx={{
                        backgroundColor: 'primary.light',
                        color: 'primary.dark',
                        fontWeight: 500,
                        '& .MuiChip-deleteIcon': {
                          color: 'primary.dark',
                          '&:hover': {
                            color: 'primary.main'
                          }
                        }
                      }}
                    />
                  ))}
                </Box>
                
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <TextField
                    fullWidth
                    label="Ajouter une compétence"
                    name="currentSkill"
                    value={formData.currentSkill}
                    onChange={handleFormChange}
                    onKeyPress={handleKeyPress}
                    variant="outlined"
                    size="small"
                    InputProps={{
                      startAdornment: <CodeIcon sx={{ color: 'action.active', mr: 1 }} />,
                      sx: { borderRadius: '8px' }
                    }}
                  />
                  
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddSkill}
                    disabled={!formData.currentSkill.trim()}
                    sx={{
                      borderRadius: '8px',
                      px: 3,
                      textTransform: 'none',
                      fontWeight: 500
                    }}
                  >
                    Ajouter
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </DialogContent>
          
          <DialogActions sx={{ 
            px: 3, 
            py: 2,
            backgroundColor: 'background.default'
          }}>
            <Button
              variant="outlined"
              color="inherit"
              onClick={() => setShowForm(false)}
              sx={{
                borderRadius: '8px',
                px: 3,
                textTransform: 'none',
                fontWeight: 500
              }}
            >
              Annuler
            </Button>
            
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={!formData.title || !formData.description || !formData.location || !formData.budget}
              sx={{
                borderRadius: '8px',
                px: 4,
                textTransform: 'none',
                fontWeight: 500,
                boxShadow: '0 2px 10px rgba(108, 92, 231, 0.3)',
                '&:hover': {
                  boxShadow: '0 4px 14px rgba(108, 92, 231, 0.4)'
                }
              }}
            >
              {currentOffer ? 'Mettre à jour' : 'Créer l\'offre'}
            </Button>
          </DialogActions>
        </motion.div>
      </Dialog>
    </Box>
  );
};

export default OffersPage;