import React, { useState, useEffect } from 'react';
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
  TextField,
  InputAdornment,
  Badge,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  LinearProgress,
  CircularProgress,
  Tooltip,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  useTheme
} from '@mui/material';
import {
  Person as PersonIcon,
  Business as BusinessIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Email as EmailIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  Refresh as RefreshIcon,
  Add as AddIcon,
  Star as StarIcon,
  Work as WorkIcon,
  LocationOn as LocationIcon,
  School as EducationIcon,
  Schedule as ExperienceIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// =============== Styles personnalisés ===============
const PremiumCard = styled(Card)(({ theme }) => ({
  borderRadius: '16px',
  boxShadow: '0 8px 32px rgba(0,0,0,0.05)',
  transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
  background: theme.palette.background.paper,
  border: '1px solid rgba(255,255,255,0.1)',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 40px rgba(0,0,0,0.1)'
  }
}));

const StatusBadge = styled(Badge)(({ theme, status }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: status === 'active' ? theme.palette.success.main : theme.palette.error.main,
    color: theme.palette.common.white,
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    width: 14,
    height: 14,
    borderRadius: '50%'
  }
}));

const PremiumTableHead = styled(TableHead)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
  '& .MuiTableCell-head': {
    color: theme.palette.common.white,
    fontWeight: 600,
    fontSize: '0.85rem',
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
    borderBottom: 'none',
    padding: '16px 24px',
    '&:hover': {
      background: 'rgba(255,255,255,0.15)',
      transition: 'all 0.3s ease'
    },
    '&:first-of-type': {
      borderTopLeftRadius: '12px'
    },
    '&:last-of-type': {
      borderTopRightRadius: '12px'
    }
  }
}));

const HighlightRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor: theme.palette.action.hover
  },
  '&:hover': {
    backgroundColor: theme.palette.action.selected,
    '& .MuiTableCell-body': {
      color: theme.palette.text.primary,
      fontWeight: 500
    }
  }
}));

const candidatesData = [
  {
    id: 1,
    name: 'Sarra Amine',
    email: 'sarra.amine@example.com',
    position: 'Développeuse Fullstack',
    status: 'disponible',
    lastUpdate: '2023-06-15',
    skills: ['React', 'Node.js', 'TypeScript', 'GraphQL'],
    avatar: '/avatars/1.jpg',
    verified: true,
    experience: 5,
    location: 'Tunis, Tunisie',
    education: "Master en Informatique",
    salaryExpectation: '18000-21000 TND',
    noticePeriod: '1 mois',
    lastActive: 'Aujourd\'hui'
  },
  {
    id: 2,
    name: 'Amine Ben Ali',
    email: 'amine.benali@example.com',
    position: 'Designer UX/UI',
    status: 'en recherche',
    lastUpdate: '2023-06-20',
    skills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping'],
    avatar: '/avatars/2.jpg',
    verified: true,
    experience: 3,
    location: 'Sfax, Tunisie',
    education: "Licence en Design",
    salaryExpectation: '13500-16500 TND',
    noticePeriod: '2 semaines',
    lastActive: 'Hier'
  },
  {
    id: 3,
    name: 'Khaled Trabelsi',
    email: 'khaled.trabelsi@example.com',
    position: 'Ingénieur DevOps',
    status: 'disponible',
    lastUpdate: '2023-06-18',
    skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
    avatar: '/avatars/3.jpg',
    verified: false,
    experience: 4,
    location: 'Sousse, Tunisie',
    education: "Ingénieur Informatique",
    salaryExpectation: '19500-22500 TND',
    noticePeriod: '3 semaines',
    lastActive: 'Il y a 2 jours'
  },
  {
    id: 4,
    name: 'Sonia Ben Jemia',
    email: 'sonia.benj@example.com',
    position: 'Product Manager',
    status: 'en poste',
    lastUpdate: '2023-04-10',
    skills: ['Agile', 'Scrum', 'Product Strategy', 'Roadmapping'],
    avatar: '/avatars/4.jpg',
    verified: true,
    experience: 7,
    location: 'Gabès, Tunisie',
    education: "MBA",
    salaryExpectation: '24000-27000 TND',
    noticePeriod: '2 mois',
    lastActive: 'Il y a 1 semaine'
  },
  {
    id: 5,
    name: 'Amira Jaziri',
    email: 'amira.jaziri@example.com',
    position: 'Data Scientist',
    status: 'disponible',
    lastUpdate: '2023-06-22',
    skills: ['Python', 'Machine Learning', 'TensorFlow', 'Data Visualization'],
    avatar: '/avatars/5.jpg',
    verified: true,
    experience: 4,
    location: 'Bizerte, Tunisie',
    education: "PhD en Data Science",
    salaryExpectation: '21000-25500 TND',
    noticePeriod: '1 mois',
    lastActive: 'Aujourd\'hui'
  },
  {
    id: 6,
    name: 'Hatem Kacem',
    email: 'hatem.kacem@example.com',
    position: 'Développeur Frontend',
    status: 'en recherche',
    lastUpdate: '2023-06-21',
    skills: ['React', 'Vue.js', 'CSS-in-JS', 'Accessibilité'],
    avatar: '/avatars/6.jpg',
    verified: false,
    experience: 2,
    location: 'Monastir, Tunisie',
    education: "Licence en Informatique",
    salaryExpectation: '12000-15000 TND',
    noticePeriod: 'Immédiat',
    lastActive: 'Hier'
  },
  {
    id: 7,
    name: 'Nizar Ayadi',
    email: 'nizar.ayadi@example.com',
    position: 'Développeur Backend',
    status: 'en poste',
    lastUpdate: '2023-03-15',
    skills: ['Java', 'Spring Boot', 'Microservices', 'SQL'],
    avatar: '/avatars/7.jpg',
    verified: true,
    experience: 6,
    location: 'Kairouan, Tunisie',
    education: "Master en Génie Logiciel",
    salaryExpectation: '19500-22500 TND',
    noticePeriod: '1 mois',
    lastActive: 'Il y a 3 jours'
  },
  {
    id: 8,
    name: 'Ines Mansouri',
    email: 'ines.mansouri@example.com',
    position: 'Ingénieure QA',
    status: 'disponible',
    lastUpdate: '2023-06-19',
    skills: ['Tests automatisés', 'Selenium', 'Jest', 'Cypress'],
    avatar: '/avatars/8.jpg',
    verified: true,
    experience: 3,
    location: 'Tataouine, Tunisie',
    education: "Master en Qualité Logicielle",
    salaryExpectation: '13500-16500 TND',
    noticePeriod: '2 semaines',
    lastActive: 'Il y a 2 jours'
  },
  {
    id: 9,
    name: 'Walid Gharbi',
    email: 'walid.gharbi@example.com',
    position: 'Développeur Mobile',
    status: 'en recherche',
    lastUpdate: '2023-06-17',
    skills: ['React Native', 'Flutter', 'iOS', 'Android'],
    avatar: '/avatars/9.jpg',
    verified: false,
    experience: 3,
    location: 'Sfax, Tunisie',
    education: "Licence Professionnelle",
    salaryExpectation: '15000-18000 TND',
    noticePeriod: '1 mois',
    lastActive: 'Il y a 3 jours'
  },
  {
    id: 10,
    name: 'Safa Khelifi',
    email: 'safa.khelifi@example.com',
    position: 'Technical Writer',
    status: 'en poste',
    lastUpdate: '2023-01-25',
    skills: ['Documentation', 'Markdown', 'Guides API', 'Communication Technique'],
    avatar: '/avatars/10.jpg',
    verified: true,
    experience: 5,
    location: 'Tunis, Tunisie',
    education: "Master en Communication Technique",
    salaryExpectation: '16500-19500 TND',
    noticePeriod: '2 mois',
    lastActive: 'Il y a 1 semaine'
  }
];


// =============== Composants ===============
const MatchIndicator = ({ value }) => {
  const theme = useTheme();
  const color = value >= 80 ? 'success' : value >= 60 ? 'warning' : 'error';
  
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Box sx={{ width: '100%' }}>
        <LinearProgress 
          variant="determinate" 
          value={value} 
          color={color}
          sx={{ 
            height: 6,
            borderRadius: 3,
            backgroundColor: theme.palette.action.hover
          }}
        />
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ minWidth: 30 }}>
        {value}%
      </Typography>
    </Box>
  );
};

const RecruitersDashboard = () => {
  const [candidates, setCandidates] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [experienceFilter, setExperienceFilter] = useState('all');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const theme = useTheme();

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setCandidates(candidatesData);
      setFilteredCandidates(candidatesData);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let result = candidates;
    
    if (searchTerm) {
      result = result.filter(candidate => 
        candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    if (statusFilter !== 'all') {
      result = result.filter(candidate => candidate.status === statusFilter);
    }
    
    if (locationFilter !== 'all') {
      result = result.filter(candidate => candidate.location.includes(locationFilter));
    }
    
    if (experienceFilter !== 'all') {
      const [min, max] = experienceFilter.split('-').map(Number);
      result = result.filter(candidate => {
        const exp = candidate.experience;
        return exp >= min && (max ? exp <= max : true);
      });
    }
    
    setFilteredCandidates(result);
    setPage(0);
  }, [searchTerm, statusFilter, locationFilter, experienceFilter, candidates]);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedCandidates = filteredCandidates.sort((a, b) => {
    if (a[orderBy] < b[orderBy]) return order === 'asc' ? -1 : 1;
    if (a[orderBy] > b[orderBy]) return order === 'asc' ? 1 : -1;
    return 0;
  });

  const handleMenuOpen = (event, candidate) => {
    setAnchorEl(event.currentTarget);
    setSelectedCandidate(candidate);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedCandidate(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const columns = [
    { id: 'name', label: 'Candidat', minWidth: 220 },
    { id: 'position', label: 'Poste recherché', minWidth: 180 },
    { id: 'status', label: 'Disponibilité', minWidth: 120 },
    { id: 'experience', label: 'Expérience (ans)', minWidth: 120 },
    { id: 'location', label: 'Localisation', minWidth: 140 },
    { id: 'match', label: 'Correspondance', minWidth: 150 },
    { id: 'actions', label: '', minWidth: 100, align: 'right' }
  ];

  // Calcul de la correspondance fictive (pour l'exemple)
  const calculateMatch = (candidate) => {
    // Simulation basée sur l'expérience et le statut
    let match = 50;
    if (candidate.status === 'disponible') match += 20;
    if (candidate.status === 'en recherche') match += 15;
    if (candidate.experience >= 5) match += 15;
    if (candidate.verified) match += 10;
    return Math.min(match, 100);
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 4
      }}>
        <Typography variant="h4" sx={{ 
          fontWeight: 700,
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          <WorkIcon sx={{ mr: 2, verticalAlign: 'middle' }} />
          Tableau de bord Recruteur
        </Typography>
        
       
      </Box>

      {/* Barre de filtres */}
      <PremiumCard sx={{ mb: 4 }}>
        <CardContent sx={{ p: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                placeholder="Rechercher candidats..."
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="primary" />
                    </InputAdornment>
                  ),
                  sx: { 
                    borderRadius: '12px',
                    background: theme.palette.background.default
                  }
                }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Grid>
            
            <Grid item xs={12} md={2}>
              <TextField
                select
                fullWidth
                variant="outlined"
                size="small"
                label="Disponibilité"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                sx={{ 
                  borderRadius: '12px',
                  '& .MuiOutlinedInput-root': {
                    background: theme.palette.background.default
                  }
                }}
              >
                <MenuItem value="all">Tous</MenuItem>
                <MenuItem value="disponible">Disponible</MenuItem>
                <MenuItem value="en recherche">En recherche</MenuItem>
                <MenuItem value="en poste">En poste</MenuItem>
              </TextField>
            </Grid>
            
            <Grid item xs={12} md={2}>
              <TextField
                select
                fullWidth
                variant="outlined"
                size="small"
                label="Localisation"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                sx={{ 
                  borderRadius: '12px',
                  '& .MuiOutlinedInput-root': {
                    background: theme.palette.background.default
                  }
                }}
              >
                <MenuItem value="all">Toutes</MenuItem>
                <MenuItem value="Paris">Paris</MenuItem>
                <MenuItem value="Lyon">Lyon</MenuItem>
                <MenuItem value="Marseille">Marseille</MenuItem>
                <MenuItem value="Toulouse">Toulouse</MenuItem>
                <MenuItem value="Nantes">Nantes</MenuItem>
              </TextField>
            </Grid>
            
            <Grid item xs={12} md={2}>
              <TextField
                select
                fullWidth
                variant="outlined"
                size="small"
                label="Expérience"
                value={experienceFilter}
                onChange={(e) => setExperienceFilter(e.target.value)}
                sx={{ 
                  borderRadius: '12px',
                  '& .MuiOutlinedInput-root': {
                    background: theme.palette.background.default
                  }
                }}
              >
                <MenuItem value="all">Tous</MenuItem>
                <MenuItem value="0-2">0-2 ans</MenuItem>
                <MenuItem value="3-5">3-5 ans</MenuItem>
                <MenuItem value="6-10">6-10 ans</MenuItem>
                <MenuItem value="10">10+ ans</MenuItem>
              </TextField>
            </Grid>
            
            <Grid item xs={12} md={2}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<RefreshIcon />}
                sx={{ 
                  borderRadius: '12px',
                  height: '40px',
                  borderWidth: '2px',
                  '&:hover': {
                    borderWidth: '2px'
                  }
                }}
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('all');
                  setLocationFilter('all');
                  setExperienceFilter('all');
                }}
              >
                Réinitialiser
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </PremiumCard>

      {/* Statistiques */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {[
          { title: 'Candidats disponibles', value: candidates.filter(c => c.status === 'disponible').length, icon: <PersonIcon />, color: 'success' },
          { title: 'Candidats vérifiés', value: candidates.filter(c => c.verified).length, icon: <CheckCircleIcon />, color: 'primary' },
          { title: 'Expérience moyenne', value: (candidates.reduce((acc, c) => acc + c.experience, 0) / candidates.length), icon: <ExperienceIcon />, color: 'warning' },
          { title: 'Nouvelles candidatures', value: candidates.filter(c => c.lastActive === 'Aujourd\'hui' || c.lastActive === 'Hier').length, icon: <AddIcon />, color: 'secondary' }
        ].map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <PremiumCard>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography color="text.secondary" variant="body2" sx={{ mb: 1 }}>
                      {stat.title}
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                      {typeof stat.value === 'number' ? stat.value.toFixed(stat.value % 1 === 0 ? 0 : 1) : stat.value}
                    </Typography>
                  </Box>
                  <Box sx={{
                    width: 48,
                    height: 48,
                    borderRadius: '12px',
                    background: theme.palette[stat.color].light,
                    color: theme.palette[stat.color].dark,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {stat.icon}
                  </Box>
                </Box>
              </CardContent>
            </PremiumCard>
          </Grid>
        ))}
      </Grid>

      {/* Tableau principal */}
      <PremiumCard>
        <TableContainer>
          <Table>
            <PremiumTableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    onClick={() => handleRequestSort(column.id)}
                    sx={{ cursor: 'pointer' }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {column.label}
                      {orderBy === column.id ? (
                        <Box component="span" sx={{ ml: 1 }}>
                          {order === 'asc' ? (
                            <ArrowUpwardIcon fontSize="small" sx={{ opacity: 0.8 }} />
                          ) : (
                            <ArrowDownwardIcon fontSize="small" sx={{ opacity: 0.8 }} />
                          )}
                        </Box>
                      ) : null}
                    </Box>
                  </TableCell>
                ))}
              </TableRow>
            </PremiumTableHead>
            
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center" sx={{ py: 6 }}>
                    <CircularProgress size={60} thickness={4} />
                  </TableCell>
                </TableRow>
              ) : sortedCandidates.length > 0 ? (
                sortedCandidates
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((candidate) => (
                    <HighlightRow hover key={candidate.id}>
                      {/* Colonne Candidat */}
                      <TableCell sx={{ py: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <StatusBadge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            variant="dot"
                            status={candidate.status === 'en poste' ? 'inactive' : 'active'}
                          >
                            <Avatar 
                              src={candidate.avatar} 
                              sx={{ 
                                width: 48, 
                                height: 48,
                                mr: 2,
                                border: `2px solid ${candidate.verified ? theme.palette.success.main : theme.palette.divider}`
                              }}
                            >
                              <PersonIcon />
                            </Avatar>
                          </StatusBadge>
                          <Box>
                            <Typography fontWeight={600} sx={{ display: 'flex', alignItems: 'center' }}>
                              {candidate.name}
                              {candidate.verified && (
                                <CheckCircleIcon color="success" fontSize="small" sx={{ ml: 1 }} />
                              )}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {candidate.email}
                            </Typography>
                            <Box sx={{ display: 'flex', mt: 0.5 }}>
                              {candidate.skills.slice(0, 3).map((skill, index) => (
                                <Chip
                                  key={index}
                                  label={skill}
                                  size="small"
                                  sx={{ 
                                    mr: 1,
                                    borderRadius: '4px',
                                    fontSize: '0.65rem',
                                    height: 20
                                  }}
                                />
                              ))}
                            </Box>
                          </Box>
                        </Box>
                      </TableCell>
                      
                      {/* Colonne Poste recherché */}
                      <TableCell>
                        <Typography fontWeight={500}>
                          {candidate.position}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {candidate.salaryExpectation}
                        </Typography>
                      </TableCell>
                      
                      {/* Colonne Disponibilité */}
                      <TableCell>
                        <Chip
                          label={
                            candidate.status === 'disponible' ? 'Disponible' : 
                            candidate.status === 'en recherche' ? 'En recherche' : 'En poste'
                          }
                          size="small"
                          color={
                            candidate.status === 'disponible' ? 'success' : 
                            candidate.status === 'en recherche' ? 'warning' : 'error'
                          }
                          sx={{
                            borderRadius: '6px',
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            fontSize: '0.75rem'
                          }}
                        />
                        <Typography variant="caption" display="block" color="text.secondary">
                          {candidate.noticePeriod}
                        </Typography>
                      </TableCell>
                      
                      {/* Colonne Expérience */}
                      <TableCell>
                        <Typography variant="h6" fontWeight={600}>
                          {candidate.experience} ans
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {candidate.education}
                        </Typography>
                      </TableCell>
                      
                      {/* Colonne Localisation */}
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <LocationIcon color="primary" fontSize="small" sx={{ mr: 1 }} />
                          <Typography>
                            {candidate.location}
                          </Typography>
                        </Box>
                        <Typography variant="caption" color="text.secondary">
                          Dernière activité: {candidate.lastActive}
                        </Typography>
                      </TableCell>
                      
                      {/* Colonne Correspondance */}
                      <TableCell>
                        <MatchIndicator value={calculateMatch(candidate)} />
                        <Typography variant="caption" color="text.secondary">
                          Dernière mise à jour: {new Date(candidate.lastUpdate).toLocaleDateString('fr-FR')}
                        </Typography>
                      </TableCell>
                      
                      {/* Colonne Actions */}
                      <TableCell align="right">
                        <Tooltip title="Actions">
                          <IconButton
                            onClick={(e) => handleMenuOpen(e, candidate)}
                            sx={{
                              background: theme.palette.action.hover,
                              '&:hover': {
                                background: theme.palette.action.selected
                              }
                            }}
                          >
                            <MoreVertIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </HighlightRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center" sx={{ py: 6 }}>
                    <Box sx={{ textAlign: 'center' }}>
                      <SearchIcon sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} />
                      <Typography variant="h6" color="text.secondary">
                        Aucun candidat trouvé
                      </Typography>
                      <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                        Essayez de modifier vos critères de recherche
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={sortedCandidates.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Lignes par page :"
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} sur ${count}`}
          sx={{ 
            borderTop: '1px solid',
            borderColor: 'divider',
            px: 3,
            py: 2
          }}
        />
      </PremiumCard>

      {/* Menu contextuel */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        elevation={4}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
          sx: {
            borderRadius: '12px',
            minWidth: 200,
            boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
            border: '1px solid rgba(0,0,0,0.05)'
          }
        }}
      >
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          Voir le profil
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <EmailIcon fontSize="small" />
          </ListItemIcon>
          Contacter
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <WorkIcon fontSize="small" />
          </ListItemIcon>
          Proposer un poste
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          Ajouter une note
        </MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="error" />
          </ListItemIcon>
          Exclure
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default RecruitersDashboard;