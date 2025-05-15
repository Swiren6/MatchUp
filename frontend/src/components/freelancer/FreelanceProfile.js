import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Avatar,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Divider,
  Chip,
  CircularProgress,
  Tabs,
  Tab,
  Paper,
  Badge,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Rating
} from '@mui/material';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Work as WorkIcon,
  School as EducationIcon,
  Code as SkillsIcon,
  Star as RatingIcon,
  Payment as PaymentIcon,
  LocationOn as LocationIcon,
  Edit as EditIcon,
  Save as SaveIcon
} from '@mui/icons-material';

const FreelancerProfile = () => {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);

  // Mock data - À remplacer par votre appel API
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        // Simulation appel API
        setTimeout(() => {
          setProfile({
            id: 1,
            name: "Sirine Abdelkhalek",
            email: "Sirine.Abdelkhalek@freelance.com",
            phone: "+216 22 33 44 55",
            avatar: "/avatars/freelancer1.jpg",
            title: "Développeur Fullstack React/Node",
            location: "Tunis",
            rate: 65,
            rating: 4.7,
            completedProjects: 24,
            skills: ["React", "Node.js", "TypeScript", "GraphQL", "MongoDB"],
            experience: [
              {
                id: 1,
                role: "Développeur Frontend",
                company: "TechCorp",
                duration: "2020 - Présent",
                description: "Développement d'applications React avec Redux"
              },
              {
                id: 2,
                role: "Développeur Fullstack",
                company: "WebSolutions",
                duration: "2018 - 2020",
                description: "Développement d'APIs Node.js et interfaces React"
              }
            ],
            education: [
              {
                id: 1,
                degree: "Master en Informatique",
                institution: "Université Tek Up",
                year: "2018"
              }
            ],
            portfolio: [
              {
                id: 1,
                title: "Plateforme E-commerce",
                description: "Développement complet avec React et Node.js",
                url: "https://example.com/project1"
              }
            ],
            availability: "Disponible immédiatement"
          });
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error("Erreur de chargement du profil:", error);
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSave = () => {
    // Logique de sauvegarde à implémenter
    setEditMode(false);
    console.log("Profil sauvegardé:", profile);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
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
      {/* En-tête */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ display: 'flex', alignItems: 'center' }}>
          <PersonIcon sx={{ mr: 2, fontSize: '2rem' }} />
          Mon Profil Freelance
        </Typography>
        
        {editMode ? (
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={handleSave}
            sx={{ ml: 2 }}
          >
            Enregistrer
          </Button>
        ) : (
          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            onClick={() => setEditMode(true)}
            sx={{ ml: 2 }}
          >
            Modifier le profil
          </Button>
        )}
      </Box>

      {/* Onglets */}
      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Présentation" icon={<PersonIcon />} />
          <Tab label="Compétences" icon={<SkillsIcon />} />
          <Tab label="Expérience" icon={<WorkIcon />} />
          <Tab label="Portfolio" icon={<EducationIcon />} />
        </Tabs>
      </Paper>

      {/* Contenu des onglets */}
      {activeTab === 0 && (
        <Grid container spacing={3}>
          {/* Colonne de gauche - Avatar et infos basiques */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  badgeContent={
                    <Chip
                      label={profile.availability}
                      size="small"
                      color="success"
                      sx={{ 
                        position: 'absolute',
                        bottom: 10,
                        right: 10,
                        transform: 'scale(0.8)'
                      }}
                    />
                  }
                >
                  <Avatar
                    src={profile.avatar}
                    sx={{ width: 150, height: 150, mb: 2 }}
                  />
                </Badge>
                
                {editMode ? (
                  <Button variant="outlined" sx={{ mb: 2 }}>
                    Changer la photo
                  </Button>
                ) : null}
                
                <Typography variant="h5" gutterBottom textAlign="center">
                  {profile.name}
                </Typography>
                
                <Typography variant="subtitle1" color="primary" textAlign="center">
                  {profile.title}
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <LocationIcon color="action" sx={{ mr: 1 }} />
                  <Typography variant="body2">
                    {profile.location}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                  <Rating
                    value={profile.rating}
                    precision={0.1}
                    readOnly
                    sx={{ mr: 1 }}
                  />
                  <Typography variant="body2">
                    {profile.rating} ({profile.completedProjects} projets)
                  </Typography>
                </Box>
                
                <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                  <PaymentIcon color="action" sx={{ mr: 1 }} />
                  <Typography variant="h6">
                    {profile.rate}€/heure
                  </Typography>
                </Box>
              </CardContent>
            </Card>
            
            <Card sx={{ mt: 2 }}>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  À propos de moi
                </Typography>
                {editMode ? (
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined"
                    placeholder="Décrivez-vous en quelques mots..."
                  />
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    Développeur passionné avec 5 ans d'expérience dans la création d'applications web modernes.
                    Spécialisé dans les technologies JavaScript fullstack.
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
          
          {/* Colonne de droite - Détails */}
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Informations personnelles
                </Typography>
                
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Nom complet"
                      name="name"
                      value={profile.name}
                      onChange={handleChange}
                      disabled={!editMode}
                      variant={editMode ? "outlined" : "standard"}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Titre professionnel"
                      name="title"
                      value={profile.title}
                      onChange={handleChange}
                      disabled={!editMode}
                      variant={editMode ? "outlined" : "standard"}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      value={profile.email}
                      onChange={handleChange}
                      disabled={!editMode}
                      variant={editMode ? "outlined" : "standard"}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Téléphone"
                      name="phone"
                      value={profile.phone}
                      onChange={handleChange}
                      disabled={!editMode}
                      variant={editMode ? "outlined" : "standard"}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Localisation"
                      name="location"
                      value={profile.location}
                      onChange={handleChange}
                      disabled={!editMode}
                      variant={editMode ? "outlined" : "standard"}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Taux horaire (€)"
                      name="rate"
                      value={profile.rate}
                      onChange={handleChange}
                      disabled={!editMode}
                      variant={editMode ? "outlined" : "standard"}
                      type="number"
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
      
      {/* Onglet Compétences */}
      {activeTab === 1 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Mes Compétences
            </Typography>
            
            {editMode ? (
              <Box>
                <TextField
                  fullWidth
                  label="Ajouter des compétences (séparées par des virgules)"
                  placeholder="React, Node.js, TypeScript"
                  sx={{ mb: 2 }}
                />
                <Button variant="contained" size="small">
                  Ajouter
                </Button>
              </Box>
            ) : null}
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
              {profile.skills.map((skill, index) => (
                <Chip
                  key={index}
                  label={skill}
                  color="primary"
                  variant="outlined"
                  onDelete={editMode ? () => {} : null}
                />
              ))}
            </Box>
          </CardContent>
        </Card>
      )}
      
      {/* Onglet Expérience */}
      {activeTab === 2 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Mon Expérience Professionnelle
            </Typography>
            
            {editMode && (
              <Button variant="outlined" sx={{ mb: 2 }}>
                Ajouter une expérience
              </Button>
            )}
            
            <List>
              {profile.experience.map((exp) => (
                <ListItem key={exp.id} alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar>
                      <WorkIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={exp.role}
                    secondary={
                      <>
                        <Typography component="span" variant="body2" color="text.primary">
                          {exp.company} • {exp.duration}
                        </Typography>
                        <br />
                        {exp.description}
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      )}
      
      {/* Onglet Portfolio */}
      {activeTab === 3 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Formation
                </Typography>
                
                <List>
                  {profile.education.map((edu) => (
                    <ListItem key={edu.id}>
                      <ListItemAvatar>
                        <Avatar>
                          <EducationIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={edu.degree}
                        secondary={`${edu.institution} • ${edu.year}`}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Projets Réalisés
                </Typography>
                
                <List>
                  {profile.portfolio.map((project) => (
                    <ListItem key={project.id}>
                      <ListItemText
                        primary={project.title}
                        secondary={project.description}
                      />
                      <Button size="small" href={project.url} target="_blank">
                        Voir
                      </Button>
                    </ListItem>
                  ))}
                </List>
                
                {editMode && (
                  <Button variant="outlined" sx={{ mt: 2 }}>
                    Ajouter un projet
                  </Button>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default FreelancerProfile;