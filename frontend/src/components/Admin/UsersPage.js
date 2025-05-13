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
  Star as StarIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// =============== Styles personnalisés ===============
const PremiumCard = styled(Card)(({ theme }) => ({
  borderRadius: '16px',
  boxShadow: '0 8px 32px rgba(0,0,0,0.05)',
  transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
  background: theme.palette.background.paper,
  border: '1px solid rgba(255,255,255,0.1)',
  backdropFilter: 'blur(10px)',
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

// =============== Données ===============
const usersData = [
  {
    id: 1,
    name: 'Jean Dupont',
    email: 'jean.dupont@example.com',
    role: 'Développeur Fullstack',
    status: 'active',
    lastActive: '2023-05-15',
    skills: ['React', 'Node.js', 'TypeScript', 'GraphQL'],
    avatar: '/avatars/1.jpg',
    verified: true,
    projects: 12,
    performance: 4.8,
    joinDate: '2021-03-10',
    premium: true
  },
  {
    id: 2,
    name: 'Marie Lambert',
    email: 'marie.lambert@example.com',
    role: 'Designer UX/UI',
    status: 'active',
    lastActive: '2023-06-20',
    skills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping'],
    avatar: '/avatars/2.jpg',
    verified: true,
    projects: 8,
    performance: 4.5,
    joinDate: '2020-11-15',
    premium: false
  },
  {
    id: 3,
    name: 'Thomas Martin',
    email: 'thomas.martin@example.com',
    role: 'DevOps Engineer',
    status: 'active',
    lastActive: '2023-06-18',
    skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
    avatar: '/avatars/3.jpg',
    verified: false,
    projects: 15,
    performance: 4.2,
    joinDate: '2022-01-05',
    premium: true
  },
  {
    id: 4,
    name: 'Sophie Dubois',
    email: 'sophie.dubois@example.com',
    role: 'Product Manager',
    status: 'inactive',
    lastActive: '2023-04-10',
    skills: ['Agile', 'Scrum', 'Product Strategy', 'Roadmapping'],
    avatar: '/avatars/4.jpg',
    verified: true,
    projects: 5,
    performance: 3.9,
    joinDate: '2021-08-22',
    premium: false
  },
  {
    id: 5,
    name: 'Alexandre Petit',
    email: 'alex.petit@example.com',
    role: 'Data Scientist',
    status: 'active',
    lastActive: '2023-06-22',
    skills: ['Python', 'Machine Learning', 'TensorFlow', 'Data Visualization'],
    avatar: '/avatars/5.jpg',
    verified: true,
    projects: 7,
    performance: 4.7,
    joinDate: '2022-03-14',
    premium: true
  },
  {
    id: 6,
    name: 'Élodie Rousseau',
    email: 'elodie.r@example.com',
    role: 'Frontend Developer',
    status: 'active',
    lastActive: '2023-06-21',
    skills: ['React', 'Vue.js', 'CSS-in-JS', 'Accessibility'],
    avatar: '/avatars/6.jpg',
    verified: false,
    projects: 9,
    performance: 4.3,
    joinDate: '2021-05-30',
    premium: false
  },
  {
    id: 7,
    name: 'Nicolas Lefevre',
    email: 'nico.lefevre@example.com',
    role: 'Backend Developer',
    status: 'inactive',
    lastActive: '2023-03-15',
    skills: ['Java', 'Spring Boot', 'Microservices', 'SQL'],
    avatar: '/avatars/7.jpg',
    verified: true,
    projects: 11,
    performance: 3.8,
    joinDate: '2020-09-12',
    premium: false
  },
  {
    id: 8,
    name: 'Camille Bernard',
    email: 'camille.b@example.com',
    role: 'QA Engineer',
    status: 'active',
    lastActive: '2023-06-19',
    skills: ['Automated Testing', 'Selenium', 'Jest', 'Cypress'],
    avatar: '/avatars/8.jpg',
    verified: true,
    projects: 14,
    performance: 4.6,
    joinDate: '2022-02-28',
    premium: true
  },
  {
    id: 9,
    name: 'Lucas Moreau',
    email: 'lucas.moreau@example.com',
    role: 'Mobile Developer',
    status: 'active',
    lastActive: '2023-06-17',
    skills: ['React Native', 'Flutter', 'iOS', 'Android'],
    avatar: '/avatars/9.jpg',
    verified: false,
    projects: 6,
    performance: 4.1,
    joinDate: '2021-11-03',
    premium: false
  },
  {
    id: 10,
    name: 'Amélie Girard',
    email: 'amelie.g@example.com',
    role: 'Technical Writer',
    status: 'inactive',
    lastActive: '2023-01-25',
    skills: ['Documentation', 'Markdown', 'API Guides', 'Technical Communication'],
    avatar: '/avatars/10.jpg',
    verified: true,
    projects: 4,
    performance: 3.7,
    joinDate: '2020-12-10',
    premium: false
  }
];
// =============== Composants ===============
const PerformanceIndicator = ({ value }) => {
  const theme = useTheme();
  const color = value >= 4.5 ? 'success' : value >= 4.0 ? 'warning' : 'error';
  
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <StarIcon fontSize="small" color={color} />
      <Box sx={{ width: '100%' }}>
        <LinearProgress 
          variant="determinate" 
          value={value * 20} 
          color={color}
          sx={{ 
            height: 6,
            borderRadius: 3,
            backgroundColor: theme.palette.action.hover
          }}
        />
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ minWidth: 30 }}>
        {value.toFixed(1)}
      </Typography>
    </Box>
  );
};

const UsersDashboard = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const theme = useTheme();

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setUsers(usersData);
      setFilteredUsers(usersData);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let result = users;
    
    if (searchTerm) {
      result = result.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    if (statusFilter !== 'all') {
      result = result.filter(user => user.status === statusFilter);
    }
    
    setFilteredUsers(result);
    setPage(0);
  }, [searchTerm, statusFilter, users]);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedUsers = filteredUsers.sort((a, b) => {
    if (a[orderBy] < b[orderBy]) return order === 'asc' ? -1 : 1;
    if (a[orderBy] > b[orderBy]) return order === 'asc' ? 1 : -1;
    return 0;
  });

  const handleMenuOpen = (event, user) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedUser(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const columns = [
    { id: 'name', label: 'Utilisateur', minWidth: 220 },
    { id: 'role', label: 'Rôle', minWidth: 150 },
    { id: 'status', label: 'Statut', minWidth: 100 },
    { id: 'performance', label: 'Performance', minWidth: 180 },
    { id: 'projects', label: 'Projets', minWidth: 100, align: 'center' },
    { id: 'joinDate', label: 'Membre depuis', minWidth: 140 },
    { id: 'actions', label: '', minWidth: 100, align: 'right' }
  ];

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
          <BusinessIcon sx={{ mr: 2, verticalAlign: 'middle' }} />
          Tableau de bord Premium
        </Typography>
        
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          sx={{ 
            borderRadius: '12px',
            px: 3,
            py: 1,
            textTransform: 'none',
            fontWeight: 600,
            boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
            '&:hover': {
              boxShadow: '0 6px 20px rgba(0,0,0,0.15)'
            }
          }}
        >
          Nouvel utilisateur
        </Button>
      </Box>

      {/* Barre de filtres */}
      <PremiumCard sx={{ mb: 4 }}>
        <CardContent sx={{ p: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                placeholder="Rechercher..."
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
            
            <Grid item xs={12} md={3}>
              <TextField
                select
                fullWidth
                variant="outlined"
                size="small"
                label="Statut"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                sx={{ 
                  borderRadius: '12px',
                  '& .MuiOutlinedInput-root': {
                    background: theme.palette.background.default
                  }
                }}
              >
                <MenuItem value="all">Tous statuts</MenuItem>
                <MenuItem value="active">Actif</MenuItem>
                <MenuItem value="inactive">Inactif</MenuItem>
              </TextField>
            </Grid>
            
            <Grid item xs={12} md={3}>
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
          { title: 'Utilisateurs actifs', value: users.filter(u => u.status === 'active').length, icon: <PersonIcon />, color: 'success' },
          { title: 'Utilisateurs vérifiés', value: users.filter(u => u.verified).length, icon: <CheckCircleIcon />, color: 'primary' },
          { title: 'Performance moyenne', value: (users.reduce((acc, user) => acc + user.performance, 0) / users.length).toFixed(1), icon: <StarIcon />, color: 'warning' },
          { title: 'Utilisateurs premium', value: users.filter(u => u.premium).length, icon: <BusinessIcon />, color: 'secondary' }
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
                      {stat.value}
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
              ) : sortedUsers.length > 0 ? (
                sortedUsers
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((user) => (
                    <HighlightRow hover key={user.id}>
                      {/* Colonne Utilisateur */}
                      <TableCell sx={{ py: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <StatusBadge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            variant="dot"
                            status={user.status}
                          >
                            <Avatar 
                              src={user.avatar} 
                              sx={{ 
                                width: 48, 
                                height: 48,
                                mr: 2,
                                border: `2px solid ${user.premium ? theme.palette.secondary.main : theme.palette.divider}`
                              }}
                            >
                              <PersonIcon />
                            </Avatar>
                          </StatusBadge>
                          <Box>
                            <Typography fontWeight={600} sx={{ display: 'flex', alignItems: 'center' }}>
                              {user.name}
                              {user.premium && (
                                <StarIcon color="secondary" fontSize="small" sx={{ ml: 1 }} />
                              )}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {user.email}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      
                      {/* Colonne Rôle */}
                      <TableCell>
                        <Chip
                          label={user.role}
                          size="small"
                          sx={{ 
                            borderRadius: '6px',
                            background: theme.palette.action.selected,
                            fontWeight: 500
                          }}
                        />
                      </TableCell>
                      
                      {/* Colonne Statut */}
                      <TableCell>
                        <Chip
                          label={user.status === 'active' ? 'Actif' : 'Inactif'}
                          size="small"
                          color={user.status === 'active' ? 'success' : 'error'}
                          sx={{
                            borderRadius: '6px',
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            fontSize: '0.75rem'
                          }}
                        />
                      </TableCell>
                      
                      {/* Colonne Performance */}
                      <TableCell>
                        <PerformanceIndicator value={user.performance} />
                      </TableCell>
                      
                      {/* Colonne Projets */}
                      <TableCell align="center">
                        <Typography variant="h6" fontWeight={600}>
                          {user.projects}
                        </Typography>
                      </TableCell>
                      
                      {/* Colonne Membre depuis */}
                      <TableCell>
                        <Typography>
                          {new Date(user.joinDate).toLocaleDateString('fr-FR')}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {Math.floor((new Date() - new Date(user.joinDate)) / (1000 * 60 * 60 * 24 * 30))} mois
                        </Typography>
                      </TableCell>
                      
                      {/* Colonne Actions */}
                      <TableCell align="right">
                        <Tooltip title="Actions">
                          <IconButton
                            onClick={(e) => handleMenuOpen(e, user)}
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
                        Aucun utilisateur trouvé
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
          count={sortedUsers.length}
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
            <EditIcon fontSize="small" />
          </ListItemIcon>
          Modifier
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <EmailIcon fontSize="small" />
          </ListItemIcon>
          Envoyer un email
        </MenuItem>
        {selectedUser?.premium && (
          <MenuItem onClick={handleMenuClose}>
            <ListItemIcon>
              <StarIcon fontSize="small" color="secondary" />
            </ListItemIcon>
            Gérer l'abonnement
          </MenuItem>
        )}
        <Divider />
        <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="error" />
          </ListItemIcon>
          Supprimer
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default UsersDashboard;