import { 
  Card, 
  CardContent, 
  Typography, 
  Grid, 
  Avatar, 
  Chip, 
  Button,
  IconButton,
  Box,
  Tabs,
  Tab,
  CircularProgress,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { 
  Person as PersonIcon, 
  Work as WorkIcon,
  Favorite,
  Close,
  FilterList
} from '@mui/icons-material';
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Données utilisateurs étendues avec des rôles
const usersData = [
  {
    id: 1,
    name: 'Jean Dupont',
    email: 'jean.dupont@example.com',
    role: 'Freelanceur',
    type: 'freelancer',
    bio: 'Spécialiste en React et Node.js',
    skills: ['React', 'Node.js', 'JavaScript', 'HTML/CSS'],
    profilePic: '/avatars/1.jpg'
  },
  {
    id: 2,
    name: 'Marie Martin',
    email: 'marie.martin@example.com',
    role: 'Designer',
    type: 'freelancer',
    bio: 'UX/UI Designer avec 5 ans d\'expérience',
    skills: ['Figma', 'Sketch', 'Adobe XD', 'Photoshop'],
    profilePic: '/avatars/2.jpg'
  },
  {
    id: 3,
    name: 'Pierre Lambert',
    email: 'pierre.lambert@example.com',
    role: 'Chef de projet',
    type: 'recruiter',
    bio: 'Gestion de projets Agile',
    skills: ['Agile', 'Scrum', 'Gestion de projet'],
    profilePic: '/avatars/3.jpg'
  },
  {
    id: 4,
    name: 'Sophie Dubois',
    email: 'sophie.dubois@example.com',
    role: 'Développeuse Fullstack',
    type: 'freelancer',
    bio: 'Spécialisée en JavaScript et Python',
    skills: ['JavaScript', 'Python', 'Django', 'React'],
    profilePic: '/avatars/4.jpg'
  },
  {
    id: 5,
    name: 'Thomas Leroy',
    email: 'thomas.leroy@example.com',
    role: 'Responsable RH',
    type: 'recruiter',
    bio: 'Recrutement tech et gestion des talents',
    skills: ['Recrutement', 'Management', 'RH'],
    profilePic: '/avatars/5.jpg'
  },
  {
    id: 6,
    name: 'Laura Petit',
    email: 'laura.petit@example.com',
    role: 'Développeuse Mobile',
    type: 'freelancer',
    bio: 'Création d\'applications iOS et Android',
    skills: ['Swift', 'Kotlin', 'Flutter', 'React Native'],
    profilePic: '/avatars/6.jpg'
  }
];

// Nombre d'utilisateurs à charger à chaque fois
const USERS_PER_PAGE = 6;

const UsersPage = ({ activeTab }) => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedTab, setSelectedTab] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const observer = useRef();
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Simuler le chargement des données
  useEffect(() => {
    setIsLoading(true);
    // Simuler une requête API
    setTimeout(() => {
      const startIndex = 0;
      const endIndex = page * USERS_PER_PAGE;
      const loadedUsers = usersData.slice(startIndex, endIndex);
      
      setUsers(loadedUsers);
      setFilteredUsers(loadedUsers);
      setIsLoading(false);
      setHasMore(endIndex < usersData.length);
    }, 800);
  }, [page]);

  // Filtrer les utilisateurs en fonction de l'onglet sélectionné
  useEffect(() => {
    if (selectedTab === 'all') {
      setFilteredUsers(users);
    } else {
      setFilteredUsers(users.filter(user => user.type === selectedTab));
    }
  }, [selectedTab, users]);

  // Observer pour l'infinite scroll
  const lastUserElementRef = useCallback(node => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    
    if (node) observer.current.observe(node);
  }, [isLoading, hasMore]);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
    setPage(1); // Réinitialiser la pagination lors du changement de filtre
  };

  const handleUserClick = (userId) => {
    setSelectedUserId(selectedUserId === userId ? null : userId);
  };

  return (
    <Box sx={{ padding: isMobile ? 2 : 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Liste des Utilisateurs
        </Typography>
        <FilterList color="primary" />
      </Box>

      {/* Filtres par type d'utilisateur */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs 
          value={selectedTab} 
          onChange={handleTabChange} 
          variant={isMobile ? 'scrollable' : 'standard'}
          scrollButtons="auto"
        >
          <Tab label="Tous" value="all" />
          <Tab label="Freelanceurs" value="freelancer" />
          <Tab label="Recruteurs" value="recruiter" />
        </Tabs>
      </Box>

      {/* Liste des utilisateurs */}
      <Grid container spacing={3}>
        <AnimatePresence>
          {filteredUsers.map((user, index) => (
            <Grid 
              item 
              xs={12} 
              sm={6} 
              md={4} 
              key={user.id}
              ref={index === filteredUsers.length - 1 ? lastUserElementRef : null}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card 
                  onClick={() => handleUserClick(user.id)}
                  sx={{ 
                    cursor: 'pointer',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: theme.shadows[6]
                    }
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item>
                        <Avatar 
                          src={user.profilePic} 
                          sx={{ width: 56, height: 56 }}
                        >
                          <PersonIcon />
                        </Avatar>
                      </Grid>
                      <Grid item xs>
                        <Typography variant="h6" component="div">
                          {user.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {user.email}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                          <WorkIcon sx={{ fontSize: 16, mr: 0.5, color: user.type === 'freelancer' ? 'primary.main' : 'secondary.main' }} />
                          <Typography 
                            variant="body2" 
                            color={user.type === 'freelancer' ? 'primary.main' : 'secondary.main'}
                            sx={{ fontWeight: 'medium' }}
                          >
                            {user.role}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>

                    <AnimatePresence>
                      {selectedUserId === user.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Typography variant="body1" sx={{ mt: 2 }}>
                            {user.bio}
                          </Typography>
                          <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            {user.skills.map((skill, index) => (
                              <Chip 
                                key={index} 
                                label={skill} 
                                variant="outlined" 
                                size="small"
                                sx={{ 
                                  borderRadius: 1,
                                  '&:hover': {
                                    backgroundColor: theme.palette.action.hover
                                  }
                                }}
                              />
                            ))}
                          </Box>
                          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                            <Button 
                              variant="outlined" 
                              size="small"
                              startIcon={<Favorite />}
                              onClick={(e) => {
                                e.stopPropagation();
                                // Ajouter aux favoris
                              }}
                            >
                              Favoris
                            </Button>
                            <Button 
                              variant="contained" 
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                // Contacter l'utilisateur
                              }}
                            >
                              Contacter
                            </Button>
                          </Box>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </AnimatePresence>
      </Grid>

      {/* Indicateur de chargement */}
      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Message quand il n'y a plus d'utilisateurs à charger */}
      {!hasMore && !isLoading && (
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 3 }}>
          Vous avez atteint la fin de la liste
        </Typography>
      )}
    </Box>
  );
};

export default UsersPage;