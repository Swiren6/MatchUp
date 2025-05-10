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
  Switch,
  FormControlLabel,
  Paper,
  Tabs,
  Tab
} from '@mui/material';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Security as SecurityIcon,
  Settings as SettingsIcon,
  BarChart as StatsIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  LockReset as PasswordIcon
} from '@mui/icons-material';
import './AdminProfile.css'

const AdminProfile = () => {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  // Données mock (à remplacer par votre API)
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        // Simulation appel API
        setTimeout(() => {
          setProfile({
            id: 1,
            name: "Admin Principal",
            email: "admin@matchup.com",
            phone: "+33 6 12 34 56 78",
            avatar: "/avatars/admin.jpg",
            role: "Super Administrateur",
            lastLogin: "2023-05-20T14:30:00Z",
            stats: {
              users: 1245,
              offers: 89,
              applications: 543,
              activeSessions: 3
            }
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
    // Ici vous ajouterez la logique de sauvegarde
    setEditMode(false);
    // Exemple : axios.put('/api/admin/profile', profile);
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
          Mon Profil Administrateur
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
            Modifier
          </Button>
        )}
      </Box>

      {/* Onglets */}
      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="Informations" icon={<PersonIcon />} />
          <Tab label="Sécurité" icon={<SecurityIcon />} />
          <Tab label="Paramètres" icon={<SettingsIcon />} />
        </Tabs>
      </Paper>

      {/* Contenu des onglets */}
      {activeTab === 0 && (
        <Grid container spacing={3}>
          {/* Colonne de gauche - Avatar et infos basiques */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar
                  src={profile.avatar}
                  sx={{ width: 120, height: 120, mb: 2 }}
                />
                {editMode ? (
                  <Button variant="outlined" sx={{ mb: 2 }}>
                    Changer la photo
                  </Button>
                ) : null}
                
                <Typography variant="h6" gutterBottom>
                  {profile.name}
                </Typography>
                
                <Chip
                  label={profile.role}
                  color="primary"
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
                
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    <EmailIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                    {profile.email}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    <PhoneIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                    {profile.phone}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
            
            <Card sx={{ mt: 2 }}>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                  <SecurityIcon sx={{ mr: 1 }} />
                  Dernière connexion
                </Typography>
                <Typography variant="body2">
                  {new Date(profile.lastLogin).toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          {/* Colonne de droite - Formulaire d'édition */}
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
                </Grid>
                
                {editMode && (
                  <Box sx={{ mt: 3 }}>
                    <Button
                      variant="contained"
                      startIcon={<PasswordIcon />}
                      onClick={() => console.log("Changer mot de passe")}
                    >
                      Changer le mot de passe
                    </Button>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
      
      
      
      {/* Onglet Sécurité */}
      {activeTab === 2 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Sécurité du compte
            </Typography>
            
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" gutterBottom>
                Authentification à deux facteurs
              </Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={true}
                    onChange={() => {}}
                    color="primary"
                  />
                }
                label="Activée"
              />
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Ajoutez une couche de sécurité supplémentaire à votre compte.
              </Typography>
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" gutterBottom>
                Sessions actives
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Vous avez {profile.stats.activeSessions} sessions actives.
              </Typography>
              <Button
                variant="outlined"
                color="error"
                size="small"
                sx={{ mt: 1 }}
              >
                Fermer toutes les autres sessions
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}
      
      {/* Onglet Paramètres */}
      {activeTab === 3 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Préférences
            </Typography>
            
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" gutterBottom>
                Notifications
              </Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={notifications}
                    onChange={(e) => setNotifications(e.target.checked)}
                    color="primary"
                  />
                }
                label="Recevoir les notifications par email"
              />
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" gutterBottom>
                Apparence
              </Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={darkMode}
                    onChange={(e) => setDarkMode(e.target.checked)}
                    color="primary"
                  />
                }
                label="Mode sombre"
              />
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default AdminProfile;