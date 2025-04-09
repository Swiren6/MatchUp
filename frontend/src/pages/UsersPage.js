import { Card, CardContent, Typography, Grid, Avatar } from '@mui/material';
import { Person as PersonIcon } from '@mui/icons-material';
import AIRecommendations from '../components/AIRecommendations';
import { useState } from 'react';

import { offers } from './OffersPage';
import { useSwipeable } from 'react-swipeable';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Card, 
  CardContent, 
  Typography, 
  Grid, 
  Chip, 
  Button,
  IconButton,
  Box
} from '@mui/material';
import { 
  Work as WorkIcon, 
  Close, 
  Favorite, 
  Replay 
} from '@mui/icons-material';



const users = [
  {
    id: 1,
    name: 'Jean Dupont',
    email: 'jean.dupont@example.com',
    role: 'Développeur',
    bio: 'Spécialiste en React et Node.js',
    skills: ['React', 'Node.js', 'JavaScript', 'HTML/CSS']
  },
  {
    id: 2,
    name: 'Marie Martin',
    email: 'marie.martin@example.com',
    role: 'Designer',
    bio: 'UX/UI Designer avec 5 ans d\'expérience',
    skills: ['Figma', 'Sketch', 'Adobe XD', 'Photoshop']
  },
  {
    id: 3,
    name: 'Pierre Lambert',
    email: 'pierre.lambert@example.com',
    role: 'Chef de projet',
    bio: 'Gestion de projets Agile',
    skills: ['Agile', 'Scrum', 'Gestion de projet']
  }
];

const UsersPage = () => {
    const [selectedUserId, setSelectedUserId] = useState(null);
  
    return (
      <div style={{ padding: '20px' }}>
        <Typography variant="h4" gutterBottom>
          Liste des Utilisateurs
        </Typography>
        <Grid container spacing={3}>
          {users.map((user) => (
            <Grid item xs={12} sm={6} md={4} key={user.id}>
              <Card onClick={() => setSelectedUserId(user.id)} sx={{ cursor: 'pointer' }}>
                {/* ... reste du code de la carte utilisateur ... */}
              </Card>
            </Grid>
          ))}
        </Grid>
        
        {selectedUserId && (
          <AIRecommendations 
            userId={selectedUserId} 
            users={users} 
            offers={offers} 
          />
        )}
      </div>
    );
  };

export default UsersPage;