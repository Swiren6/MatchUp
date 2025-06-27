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
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Snackbar,
  Badge,
  IconButton,
  Tooltip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  useTheme,
  Fade,
  Zoom,
  Slide,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Rating
} from '@mui/material';
import {
  Person,
  Email,
  Phone,
  Security,
  Settings,
  Edit,
  Save,
  LockReset,
  Notifications,
  ExpandMore,
  ExpandLess,
  Logout,
  VerifiedUser,
  Computer,
  Palette,
  Language,
  Delete,
  CloudUpload,
  AdminPanelSettings,
  CalendarToday,
  Public,
  Work,
  Description,
  Visibility,
  VisibilityOff,
  QrCode,
  Sms,
  Apps,
  DarkMode,
  LightMode,
  LocationOn,
  School,
  Business,
  Star,
  StarBorder,
  AccessTime,
  EventAvailable
} from '@mui/icons-material';
import { BarChart, Timeline } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Styles personnalisés
const ProfileCard = styled(Card)(({ theme }) => ({
  borderRadius: '16px',
  boxShadow: theme.shadows[4],
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[8]
  }
}));

const SecurityBadge = styled(Chip)(({ theme }) => ({
  borderRadius: '8px',
  padding: theme.spacing(0.5),
  fontWeight: 'bold'
}));

const StatCard = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  background: `linear-gradient(145deg, ${theme.palette.background.paper} 0%, ${theme.palette.action.hover} 100%)`,
  boxShadow: theme.shadows[2],
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[4]
  }
}));

const AdminProfile = () => {
  const theme = useTheme();
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: '',
    showPassword: false
  });
  const [settings, setSettings] = useState({
    darkMode: false,
    language: 'fr',
    dateFormat: 'fr',
    notifications: {
      email: true,
      push: true,
      critical: true
    }
  });
  const [qrDialogOpen, setQrDialogOpen] = useState(false);
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    about: true,
    stats: true,
    activity: false
  });

  // Chargement des données
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setTimeout(() => {
          setProfile({
            id: 1,
            name: "Admin Principal",
            email: "admin@matchup.com",
            phone: "+33 6 12 34 56 78",
            avatar: "/avatars/admin.jpg",
            role: "Super Administrateur",
            lastLogin: new Date().toISOString(),
            twoFactorEnabled: true,
            location: "Paris, France",
            bio: "Administrateur système avec 8 ans d'expérience dans la gestion de plateformes web complexes.",
            education: "Master en Informatique - Université Paris-Saclay",
            company: "MatchUp Inc.",
            skills: [
              { name: "Gestion de serveurs", level: 4 },
              { name: "Sécurité informatique", level: 5 },
              { name: "Base de données", level: 4 },
              { name: "Développement web", level: 3 }
            ],
            stats: {
              users: 1245,
              offers: 89,
              applications: 543,
              activeSessions: 2,
              responseTime: "1.2s"
            },
            recentActivity: [
              {
                id: 1,
                action: "A modifié les paramètres du système",
                date: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
                icon: <Settings />
              },
              {
                id: 2,
                action: "A approuvé 5 nouvelles candidatures",
                date: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
                icon: <Description />
              },
              {
                id: 3,
                action: "A résolu un ticket critique",
                date: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
                icon: <VerifiedUser />
              }
            ],
            sessions: [
              {
                id: 1,
                device: "Chrome sur Windows",
                ip: "192.168.1.1",
                location: "Paris, France",
                lastActivity: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
                current: true
              },
              {
                id: 2,
                device: "Firefox sur MacOS",
                ip: "192.168.1.2",
                location: "Lyon, France",
                lastActivity: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
                current: false
              }
            ]
          });
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error("Erreur de chargement du profil:", error);
        setLoading(false);
        showSnackbar("Erreur de chargement du profil", "error");
      }
    };

    fetchProfile();
  }, []);

  // Fonctions utilitaires
  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const handleSave = () => {
    setEditMode(false);
    showSnackbar("Profil mis à jour avec succès", "success");
  };

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  const handlePasswordChange = (prop) => (event) => {
    setPasswordData({ ...passwordData, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setPasswordData({ ...passwordData, showPassword: !passwordData.showPassword });
  };

  const handleSettingsChange = (prop) => (event) => {
    setSettings({ ...settings, [prop]: event.target.checked });
  };

  const handleNotificationChange = (type) => (event) => {
    setSettings({
      ...settings,
      notifications: {
        ...settings.notifications,
        [type]: event.target.checked
      }
    });
  };

  const terminateSession = (sessionId) => {
    setTimeout(() => {
      setProfile(prev => ({
        ...prev,
        sessions: prev.sessions.filter(s => s.id !== sessionId),
        stats: {
          ...prev.stats,
          activeSessions: prev.stats.activeSessions - 1
        }
      }));
      showSnackbar("Session terminée", "success");
    }, 300);
  };

  const terminateAllSessions = () => {
    setTimeout(() => {
      setProfile(prev => ({
        ...prev,
        sessions: prev.sessions.filter(s => s.current),
        stats: {
          ...prev.stats,
          activeSessions: 1
        }
      }));
      showSnackbar("Toutes les autres sessions ont été terminées", "success");
    }, 300);
  };

  const handlePasswordSubmit = () => {
    if (passwordData.new !== passwordData.confirm) {
      showSnackbar("Les mots de passe ne correspondent pas", "error");
      return;
    }
    setTimeout(() => {
      setPasswordData({ current: '', new: '', confirm: '', showPassword: false });
      setPasswordDialogOpen(false);
      showSnackbar("Mot de passe changé avec succès", "success");
    }, 800);
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Fade in timeout={500}>
      <Box sx={{ p: { xs: 2, md: 4 } }}>
        {/* En-tête amélioré */}
        <Slide in direction="down" timeout={300}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            mb: 4,
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.dark} 100%)`,
            color: 'white',
            p: 3,
            borderRadius: 2,
            boxShadow: 3,
            position: 'relative',
            overflow: 'hidden',
            '&:before': {
              content: '""',
              position: 'absolute',
              top: 0,
              right: 0,
              width: '100%',
              height: '100%',
              backgroundImage: 'radial-gradient(circle at 75% 25%, rgba(255,255,255,0.1) 0%, transparent 50%)',
              pointerEvents: 'none'
            }
          }}>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                <AdminPanelSettings sx={{ mr: 2, fontSize: 'inherit' }} />
                Mon Profil Administrateur
              </Typography>
              <Typography variant="subtitle1" sx={{ opacity: 0.9, mt: 0.5 }}>
                Gestion complète de votre compte et paramètres
              </Typography>
            </Box>
          
          </Box>
        </Slide>

        {/* Onglets */}
        <Zoom in timeout={500}>
          <Paper sx={{ 
            mb: 4, 
            borderRadius: 2, 
            overflow: 'hidden',
            background: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
            backdropFilter: 'blur(10px)'
          }}>
            <Tabs
              value={activeTab}
              onChange={(e, newValue) => setActiveTab(newValue)}
              variant="fullWidth"
              indicatorColor="secondary"
              textColor="inherit"
              sx={{
                '& .MuiTab-root': {
                  fontWeight: 'bold',
                  fontSize: '0.9rem',
                  py: 1.5,
                  minHeight: 'auto'
                }
              }}
            >
              <Tab label="Profil" icon={<Person />} iconPosition="start" />
              <Tab label="Sécurité" icon={<Security />} iconPosition="start" />
              <Tab label="Paramètres" icon={<Settings />} iconPosition="start" />
            </Tabs>
          </Paper>
        </Zoom>

        {/* Contenu - Profil amélioré */}
        {activeTab === 0 && (
          <Grid container spacing={3}>
            {/* Colonne gauche */}
            <Grid item xs={12} md={4}>
              <ProfileCard>
                <CardContent sx={{ textAlign: 'center', position: 'relative' }}>
                  {/* Badge admin */}
                  <Box sx={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    zIndex: 2
                  }}>
                    <Tooltip title="Administrateur vérifié">
                      <VerifiedUser sx={{ 
                        fontSize: 32,
                        color: theme.palette.secondary.main,
                        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
                      }} />
                    </Tooltip>
                  </Box>

                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    badgeContent={
                      <Tooltip title="En ligne">
                        <Box sx={{ 
                          width: 16, 
                          height: 16, 
                          bgcolor: 'success.main', 
                          borderRadius: '50%',
                          border: `2px solid ${theme.palette.background.paper}`,
                          boxShadow: theme.shadows[1]
                        }} />
                      </Tooltip>
                    }
                  >
                    <Avatar
                      src={profile.avatar}
                      sx={{ 
                        width: 140, 
                        height: 140, 
                        mb: 2,
                        border: `4px solid ${theme.palette.primary.main}`,
                        boxShadow: theme.shadows[4]
                      }}
                    />
                  </Badge>

                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mt: 1 }}>
                    {profile.name}
                  </Typography>
                  
                  <Chip
                    label={profile.role}
                    color="secondary"
                    variant="filled"
                    size="medium"
                    icon={<AdminPanelSettings />}
                    sx={{ 
                      mb: 2,
                      px: 2,
                      py: 1,
                      fontSize: '0.9rem',
                      fontWeight: 'bold'
                    }}
                  />

                  {/* Section À propos */}
                  <Box sx={{ 
                    mt: 3,
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: 2,
                    overflow: 'hidden'
                  }}>
                    <Box 
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        p: 2,
                        bgcolor: 'action.hover',
                        cursor: 'pointer'
                      }}
                      onClick={() => toggleSection('about')}
                    >
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        À propos
                      </Typography>
                      {expandedSections.about ? <ExpandLess /> : <ExpandMore />}
                    </Box>
                    
                    <Collapse in={expandedSections.about}>
                      <Box sx={{ p: 2, textAlign: 'left' }}>
                        <Typography variant="body2" sx={{ mb: 2 }}>
                          {profile.bio}
                        </Typography>
                        
                        <List dense>
                          <ListItem sx={{ px: 0 }}>
                            <ListItemIcon sx={{ minWidth: 36 }}>
                              <Email color="primary" />
                            </ListItemIcon>
                            <ListItemText 
                              primary={profile.email} 
                              secondary="Email professionnel"
                            />
                          </ListItem>
                          <ListItem sx={{ px: 0 }}>
                            <ListItemIcon sx={{ minWidth: 36 }}>
                              <Phone color="primary" />
                            </ListItemIcon>
                            <ListItemText 
                              primary={profile.phone} 
                              secondary="Téléphone"
                            />
                          </ListItem>
                          <ListItem sx={{ px: 0 }}>
                            <ListItemIcon sx={{ minWidth: 36 }}>
                              <LocationOn color="primary" />
                            </ListItemIcon>
                            <ListItemText 
                              primary={profile.location} 
                              secondary="Localisation"
                            />
                          </ListItem>
                          <ListItem sx={{ px: 0 }}>
                            <ListItemIcon sx={{ minWidth: 36 }}>
                              <School color="primary" />
                            </ListItemIcon>
                            <ListItemText 
                              primary={profile.education} 
                              secondary="Formation"
                            />
                          </ListItem>
                          <ListItem sx={{ px: 0 }}>
                            <ListItemIcon sx={{ minWidth: 36 }}>
                              <Business color="primary" />
                            </ListItemIcon>
                            <ListItemText 
                              primary={profile.company} 
                              secondary="Entreprise"
                            />
                          </ListItem>
                        </List>
                      </Box>
                    </Collapse>
                  </Box>

                  {/* Section Compétences */}
                  <Box sx={{ mt: 3 }}>
                    <Typography variant="subtitle1" sx={{ 
                      fontWeight: 'bold',
                      mb: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                      Compétences
                      <Edit fontSize="small" sx={{ cursor: 'pointer', opacity: 0.7 }} />
                    </Typography>
                    
                    <Box sx={{ mt: 1 }}>
                      {profile.skills.map((skill, index) => (
                        <Box key={index} sx={{ mb: 2 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                            <Typography variant="body2">{skill.name}</Typography>
                            <Typography variant="body2" color="text.secondary">
                              {skill.level}/5
                            </Typography>
                          </Box>
                          <Rating
                            value={skill.level}
                            readOnly
                            precision={0.5}
                            icon={<Star fontSize="inherit" sx={{ color: theme.palette.secondary.main }} />}
                            emptyIcon={<StarBorder fontSize="inherit" />}
                          />
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </CardContent>
              </ProfileCard>

              {/* Section Statistiques */}
              <ProfileCard sx={{ mt: 3 }}>
                <CardContent>
                  <Box 
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      mb: 2,
                      cursor: 'pointer'
                    }}
                    onClick={() => toggleSection('stats')}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                      <Timeline sx={{ mr: 1 }} />
                      Statistiques
                    </Typography>
                    {expandedSections.stats ? <ExpandLess /> : <ExpandMore />}
                  </Box>
                  
                  <Collapse in={expandedSections.stats}>
                    <Grid container spacing={2}>
                      {[
                        { 
                          label: 'Utilisateurs', 
                          value: profile.stats.users, 
                          icon: <Person fontSize="small" />,
                          trend: 'up',
                          change: '+12%'
                        },
                        { 
                          label: 'Offres', 
                          value: profile.stats.offers, 
                          icon: <Work fontSize="small" />,
                          trend: 'up',
                          change: '+5%'
                        },
                        { 
                          label: 'Candidatures', 
                          value: profile.stats.applications, 
                          icon: <Description fontSize="small" />,
                          trend: 'down',
                          change: '-3%'
                        },
                        { 
                          label: 'Temps de réponse', 
                          value: profile.stats.responseTime, 
                          icon: <AccessTime fontSize="small" />,
                          trend: 'up',
                          change: '20% plus rapide'
                        }
                      ].map((item, index) => (
                        <Grid item xs={6} key={index}>
                          <StatCard>
                            <Typography variant="h5" sx={{ 
                              fontWeight: 'bold',
                              color: item.trend === 'up' ? theme.palette.success.main : theme.palette.error.main
                            }}>
                              {item.value}
                            </Typography>
                            <Typography variant="caption" sx={{ 
                              display: 'block',
                              color: item.trend === 'up' ? theme.palette.success.main : theme.palette.error.main,
                              mb: 0.5
                            }}>
                              {item.change}
                            </Typography>
                            <Typography variant="body2" sx={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              justifyContent: 'center',
                              color: 'text.secondary'
                            }}>
                              {item.icon}
                              <Box component="span" sx={{ ml: 0.5 }}>{item.label}</Box>
                            </Typography>
                          </StatCard>
                        </Grid>
                      ))}
                    </Grid>
                  </Collapse>
                </CardContent>
              </ProfileCard>
            </Grid>

            {/* Colonne droite */}
            <Grid item xs={12} md={8}>
              <ProfileCard>
                <CardContent>
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    mb: 3 
                  }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                      <Person sx={{ mr: 1, verticalAlign: 'middle' }} />
                      Informations personnelles
                    </Typography>
                    {editMode ? (
                      <Button 
                        variant="contained" 
                        startIcon={<Save />} 
                        onClick={handleSave}
                        sx={{
                          borderRadius: '12px',
                          px: 3,
                          fontWeight: 'bold',
                          boxShadow: theme.shadows[2],
                          '&:hover': {
                            boxShadow: theme.shadows[4]
                          }
                        }}
                      >
                        Enregistrer
                      </Button>
                    ) : (
                      <Button 
                        variant="outlined" 
                        startIcon={<Edit />} 
                        onClick={() => setEditMode(true)}
                        sx={{
                          borderRadius: '12px',
                          px: 3,
                          fontWeight: 'bold'
                        }}
                      >
                        Modifier
                      </Button>
                    )}
                  </Box>

                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Nom complet"
                        name="name"
                        value={profile.name}
                        onChange={(e) => setProfile({...profile, [e.target.name]: e.target.value})}
                        disabled={!editMode}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Person />
                            </InputAdornment>
                          )
                        }}
                        variant={editMode ? "outlined" : "filled"}
                        sx={{ mb: 2 }}
                      />
                      
                      <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        value={profile.email}
                        onChange={(e) => setProfile({...profile, [e.target.name]: e.target.value})}
                        disabled={!editMode}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Email />
                            </InputAdornment>
                          ),
                          type: 'email'
                        }}
                        variant={editMode ? "outlined" : "filled"}
                        sx={{ mb: 2 }}
                      />
                    </Grid>
                    
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Téléphone"
                        name="phone"
                        value={profile.phone}
                        onChange={(e) => setProfile({...profile, [e.target.name]: e.target.value})}
                        disabled={!editMode}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Phone />
                            </InputAdornment>
                          )
                        }}
                        variant={editMode ? "outlined" : "filled"}
                        sx={{ mb: 2 }}
                      />
                      
                      <TextField
                        fullWidth
                        label="Localisation"
                        name="location"
                        value={profile.location}
                        onChange={(e) => setProfile({...profile, [e.target.name]: e.target.value})}
                        disabled={!editMode}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LocationOn />
                            </InputAdornment>
                          )
                        }}
                        variant={editMode ? "outlined" : "filled"}
                        sx={{ mb: 2 }}
                      />
                    </Grid>
                    
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Bio"
                        name="bio"
                        value={profile.bio}
                        onChange={(e) => setProfile({...profile, [e.target.name]: e.target.value})}
                        disabled={!editMode}
                        multiline
                        rows={4}
                        variant={editMode ? "outlined" : "filled"}
                        sx={{ mb: 2 }}
                      />
                    </Grid>
                  </Grid>

                  {editMode && (
                    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                      <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<LockReset />}
                        onClick={() => setPasswordDialogOpen(true)}
                        sx={{
                          borderRadius: '12px',
                          px: 3,
                          fontWeight: 'bold'
                        }}
                      >
                        Changer le mot de passe
                      </Button>
                    </Box>
                  )}
                </CardContent>
              </ProfileCard>

              {/* Section Activité récente */}
              <ProfileCard sx={{ mt: 3 }}>
                <CardContent>
                  <Box 
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      mb: 2,
                      cursor: 'pointer'
                    }}
                    onClick={() => toggleSection('activity')}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                      <EventAvailable sx={{ mr: 1 }} />
                      Activité récente
                    </Typography>
                    {expandedSections.activity ? <ExpandLess /> : <ExpandMore />}
                  </Box>
                  
                  <Collapse in={expandedSections.activity}>
                    <List dense>
                      {profile.recentActivity.map((activity, index) => (
                        <ListItem key={index} sx={{ px: 0 }}>
                          <ListItemIcon sx={{ 
                            minWidth: 36,
                            color: theme.palette.primary.main
                          }}>
                            {activity.icon}
                          </ListItemIcon>
                          <ListItemText
                            primary={activity.action}
                            secondary={formatDate(activity.date)}
                            secondaryTypographyProps={{ 
                              variant: 'caption',
                              color: 'text.secondary'
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                </CardContent>
              </ProfileCard>
            </Grid>
          </Grid>
        )}

        {/* Contenu - Sécurité (inchangé) */}
        {activeTab === 1 && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <ProfileCard>
                <CardContent>
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                    <Security color="primary" sx={{ mr: 1 }} />
                    Sécurité du compte
                  </Typography>

                  <Box sx={{ mb: 4 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        Authentification à deux facteurs
                      </Typography>
                      <SecurityBadge
                        label={profile.twoFactorEnabled ? "Activée" : "Désactivée"}
                        color={profile.twoFactorEnabled ? "success" : "error"}
                      />
                    </Box>
                    
                    {profile.twoFactorEnabled ? (
                      <Box sx={{ p: 2, borderRadius: 2, bgcolor: 'success.light', border: `1px solid ${theme.palette.success.main}` }}>
                        <Typography variant="body2" sx={{ mb: 2 }}>
                          Votre compte est sécurisé par une authentification à deux facteurs.
                        </Typography>
                        <Button variant="outlined" startIcon={<QrCode />} onClick={() => setQrDialogOpen(true)} sx={{ mr: 2 }}>
                          Voir QR Code
                        </Button>
                        <Button variant="outlined" color="error" startIcon={<Delete />}>
                          Désactiver 2FA
                        </Button>
                      </Box>
                    ) : (
                      <Box sx={{ p: 2, borderRadius: 2, bgcolor: 'error.light', border: `1px solid ${theme.palette.error.main}` }}>
                        <Typography variant="body2" sx={{ mb: 2 }}>
                          Votre compte n'est pas protégé par une authentification à deux facteurs.
                        </Typography>
                        <Button variant="contained" startIcon={<QrCode />} onClick={() => setQrDialogOpen(true)} sx={{ mr: 2 }}>
                          Activer avec QR Code
                        </Button>
                        <Button variant="outlined" startIcon={<Sms />}>
                          Activer par SMS
                        </Button>
                      </Box>
                    )}
                  </Box>

                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
                      Mot de passe
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Dernière modification il y a 3 mois
                    </Typography>
                    <Button 
                      variant="contained" 
                      startIcon={<LockReset />} 
                      onClick={() => setPasswordDialogOpen(true)}
                      sx={{
                        borderRadius: '12px',
                        px: 3,
                        fontWeight: 'bold'
                      }}
                    >
                      Changer le mot de passe
                    </Button>
                  </Box>
                </CardContent>
              </ProfileCard>
            </Grid>

            <Grid item xs={12} md={6}>
              <ProfileCard>
                <CardContent>
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                    <Computer color="primary" sx={{ mr: 1 }} />
                    Sessions actives
                  </Typography>

                  <List>
                    {profile.sessions.map((session) => (
                      <ListItem 
                        key={session.id}
                        secondaryAction={
                          !session.current && (
                            <IconButton 
                              edge="end" 
                              onClick={() => terminateSession(session.id)} 
                              color="error"
                              sx={{
                                '&:hover': {
                                  backgroundColor: 'error.light'
                                }
                              }}
                            >
                              <Delete />
                            </IconButton>
                          )
                        }
                        sx={{
                          bgcolor: session.current ? 'action.selected' : 'background.paper',
                          borderRadius: 1,
                          mb: 1
                        }}
                      >
                        <ListItemIcon>
                          <Computer color={session.current ? "primary" : "inherit"} />
                        </ListItemIcon>
                        <ListItemText
                          primary={session.device}
                          secondary={`${session.location} • Activité ${formatDate(session.lastActivity)}`}
                        />
                      </ListItem>
                    ))}
                  </List>

                  {profile.sessions.length > 1 && (
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<Logout />}
                      onClick={terminateAllSessions}
                      sx={{ 
                        mt: 2,
                        borderRadius: '12px',
                        px: 3,
                        fontWeight: 'bold'
                      }}
                    >
                      Fermer toutes les autres sessions
                    </Button>
                  )}
                </CardContent>
              </ProfileCard>
            </Grid>
          </Grid>
        )}

        {/* Contenu - Paramètres (inchangé) */}
        {activeTab === 2 && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <ProfileCard>
                <CardContent>
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                    <Palette color="primary" sx={{ mr: 1 }} />
                    Apparence
                  </Typography>

                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.darkMode}
                        onChange={handleSettingsChange('darkMode')}
                        color="primary"
                      />
                    }
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {settings.darkMode ? <DarkMode sx={{ mr: 1 }} /> : <LightMode sx={{ mr: 1 }} />}
                        {settings.darkMode ? 'Mode sombre' : 'Mode clair'}
                      </Box>
                    }
                    sx={{ mb: 2 }}
                  />

                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mt: 3, mb: 2 }}>
                    Couleur principale
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    {['primary', 'secondary', 'error', 'warning', 'info', 'success'].map((color) => (
                      <Tooltip key={color} title={color}>
                        <IconButton 
                          sx={{ 
                            bgcolor: `${color}.main`, 
                            width: 40, 
                            height: 40, 
                            '&:hover': { 
                              bgcolor: `${color}.dark`,
                              transform: 'scale(1.1)'
                            },
                            transition: 'all 0.2s'
                          }} 
                        />
                      </Tooltip>
                    ))}
                  </Box>
                </CardContent>
              </ProfileCard>
            </Grid>

            <Grid item xs={12} md={6}>
              <ProfileCard>
                <CardContent>
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                    <Language color="primary" sx={{ mr: 1 }} />
                    Langue et région
                  </Typography>

                  <FormControl fullWidth sx={{ mb: 3 }}>
                    <InputLabel>Langue</InputLabel>
                    <Select
                      value={settings.language}
                      label="Langue"
                      onChange={(e) => setSettings({...settings, language: e.target.value})}
                    >
                      <MenuItem value="fr">Français</MenuItem>
                      <MenuItem value="en">English</MenuItem>
                      <MenuItem value="es">Español</MenuItem>
                    </Select>
                  </FormControl>

                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
                    Format de date
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button 
                      variant={settings.dateFormat === 'fr' ? 'contained' : 'outlined'}
                      onClick={() => setSettings({...settings, dateFormat: 'fr'})}
                      sx={{
                        borderRadius: '12px',
                        px: 3,
                        fontWeight: 'bold'
                      }}
                    >
                      JJ/MM/AAAA
                    </Button>
                    <Button 
                      variant={settings.dateFormat === 'us' ? 'contained' : 'outlined'}
                      onClick={() => setSettings({...settings, dateFormat: 'us'})}
                      sx={{
                        borderRadius: '12px',
                        px: 3,
                        fontWeight: 'bold'
                      }}
                    >
                      MM/JJ/AAAA
                    </Button>
                  </Box>
                </CardContent>
              </ProfileCard>
            </Grid>

            <Grid item xs={12}>
              <ProfileCard>
                <CardContent>
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                    <Notifications color="primary" sx={{ mr: 1 }} />
                    Notifications
                  </Typography>

                  <Box>
                    <FormControlLabel
                      control={<Switch checked={settings.notifications.email} onChange={handleNotificationChange('email')} />}
                      label="Notifications par email"
                      sx={{ mb: 1 }}
                    />
                    <FormControlLabel
                      control={<Switch checked={settings.notifications.push} onChange={handleNotificationChange('push')} />}
                      label="Notifications push"
                      sx={{ mb: 1 }}
                    />
                    <FormControlLabel
                      control={<Switch checked={settings.notifications.critical} onChange={handleNotificationChange('critical')} />}
                      label="Alertes critiques"
                    />
                  </Box>
                </CardContent>
              </ProfileCard>
            </Grid>
          </Grid>
        )}

        {/* Dialog QR Code */}
        <Dialog 
          open={qrDialogOpen} 
          onClose={() => setQrDialogOpen(false)}
          PaperProps={{
            sx: {
              borderRadius: 3,
              overflow: 'hidden'
            }
          }}
        >
          <DialogTitle sx={{ 
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
            color: 'white'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <QrCode sx={{ mr: 1 }} />
              Authentification à deux facteurs
            </Box>
          </DialogTitle>
          <DialogContent sx={{ textAlign: 'center', p: 4 }}>
            <Typography variant="h6" gutterBottom>
              Scanner le QR Code avec votre application d'authentification
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              my: 3,
              p: 2,
              border: '1px dashed',
              borderColor: 'divider',
              borderRadius: 2
            }}>
              <Box sx={{ 
                width: 200, 
                height: 200, 
                bgcolor: 'action.hover',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <QrCode sx={{ fontSize: 80, color: 'text.secondary' }} />
              </Box>
            </Box>
            <Typography variant="body2" color="text.secondary">
              OU entrez ce code manuellement: <strong>JBSWY3DPEHPK3PXP</strong>
            </Typography>
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button 
              onClick={() => setQrDialogOpen(false)}
              sx={{
                borderRadius: '12px',
                px: 3,
                fontWeight: 'bold'
              }}
            >
              Fermer
            </Button>
          </DialogActions>
        </Dialog>

        {/* Dialog Mot de passe */}
        <Dialog 
          open={passwordDialogOpen} 
          onClose={() => setPasswordDialogOpen(false)}
          PaperProps={{
            sx: {
              borderRadius: 3,
              overflow: 'hidden'
            }
          }}
        >
          <DialogTitle sx={{ 
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
            color: 'white'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <LockReset sx={{ mr: 1 }} />
              Changer le mot de passe
            </Box>
          </DialogTitle>
          <DialogContent sx={{ pt: 3 }}>
            <TextField
              fullWidth
              label="Mot de passe actuel"
              type={passwordData.showPassword ? 'text' : 'password'}
              value={passwordData.current}
              onChange={handlePasswordChange('current')}
              sx={{ mb: 2 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton 
                      onClick={handleClickShowPassword} 
                      edge="end"
                      sx={{
                        '&:hover': {
                          backgroundColor: 'transparent'
                        }
                      }}
                    >
                      {passwordData.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <TextField
              fullWidth
              label="Nouveau mot de passe"
              type={passwordData.showPassword ? 'text' : 'password'}
              value={passwordData.new}
              onChange={handlePasswordChange('new')}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Confirmer le nouveau mot de passe"
              type={passwordData.showPassword ? 'text' : 'password'}
              value={passwordData.confirm}
              onChange={handlePasswordChange('confirm')}
            />
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button 
              onClick={() => setPasswordDialogOpen(false)}
              sx={{
                borderRadius: '12px',
                px: 3,
                fontWeight: 'bold'
              }}
            >
              Annuler
            </Button>
            <Button 
              variant="contained" 
              onClick={handlePasswordSubmit}
              disabled={!passwordData.current || !passwordData.new || !passwordData.confirm}
              sx={{
                borderRadius: '12px',
                px: 3,
                fontWeight: 'bold'
              }}
            >
              Confirmer
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert 
            onClose={handleCloseSnackbar} 
            severity={snackbar.severity}
            sx={{ 
              width: '100%',
              borderRadius: '12px',
              alignItems: 'center',
              boxShadow: theme.shadows[6]
            }}
            elevation={6}
            variant="filled"
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </Fade>
  );
};

export default AdminProfile;