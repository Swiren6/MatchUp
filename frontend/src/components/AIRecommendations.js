import { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  List, 
  ListItem, 
  ListItemText, 
  Divider, 
  Chip,
  CircularProgress,
  Button
} from '@mui/material';
import { AutoAwesome, Psychology } from '@mui/icons-material';

const AIRecommendations = ({ userId, users, offers }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    if (userId) {
      const user = users.find(u => u.id === userId);
      setSelectedUser(user);
      generateRecommendations(user);
    }
  }, [userId, users]);

  const generateRecommendations = (user) => {
    setLoading(true);
    
    // Simulation d'un traitement IA (dans un cas réel, vous appelleriez une API)
    setTimeout(() => {
      const userSkills = user.skills || [];
      
      const scoredOffers = offers.map(offer => {
        const requiredSkills = offer.skills || [];
        const matchingSkills = userSkills.filter(skill => 
          requiredSkills.some(reqSkill => 
            reqSkill.toLowerCase().includes(skill.toLowerCase()) ||
            skill.toLowerCase().includes(reqSkill.toLowerCase())
          )
        );
        
        const matchPercentage = (matchingSkills.length / requiredSkills.length) * 100;
        
        return {
          ...offer,
          matchPercentage,
          matchingSkills
        };
      }).filter(offer => offer.matchPercentage > 0)
        .sort((a, b) => b.matchPercentage - a.matchPercentage);
      
      setRecommendations(scoredOffers);
      setLoading(false);
    }, 1500);
  };

  if (!selectedUser) return null;

  return (
    <Card sx={{ mt: 4, bgcolor: 'background.paper' }}>
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          <Psychology color="primary" sx={{ mr: 1 }} />
          <Typography variant="h6" component="div">
            Recommandations IA pour {selectedUser.name}
          </Typography>
        </Box>
        
        <Typography variant="body2" color="text.secondary" mb={2}>
          Voici les offres qui correspondent le mieux à vos compétences:
        </Typography>
        
        {loading ? (
          <Box display="flex" justifyContent="center" p={4}>
            <CircularProgress />
          </Box>
        ) : recommendations.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            Aucune recommandation trouvée pour vos compétences actuelles.
          </Typography>
        ) : (
          <List>
            {recommendations.slice(0, 3).map((offer, index) => (
              <div key={offer.id}>
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary={
                      <Box display="flex" justifyContent="space-between">
                        <Typography fontWeight="medium">
                          {offer.title} ({offer.budget})
                        </Typography>
                        <Chip 
                          label={`${Math.round(offer.matchPercentage)}% match`} 
                          color={
                            offer.matchPercentage > 75 ? 'success' : 
                            offer.matchPercentage > 50 ? 'warning' : 'error'
                          }
                          size="small"
                        />
                      </Box>
                    }
                    secondary={
                      <>
                        <Typography variant="body2" color="text.primary">
                          {offer.description}
                        </Typography>
                        <Box mt={1}>
                          <Typography variant="caption">
                            Compétences correspondantes:
                          </Typography>
                          <Box mt={0.5}>
                            {offer.matchingSkills.map((skill, i) => (
                              <Chip 
                                key={i} 
                                label={skill} 
                                size="small" 
                                sx={{ mr: 1, mt: 0.5 }} 
                                color="primary"
                                variant="outlined"
                              />
                            ))}
                          </Box>
                        </Box>
                      </>
                    }
                  />
                </ListItem>
                {index < recommendations.length - 1 && <Divider />}
              </div>
            ))}
          </List>
        )}
        
        <Box mt={2} display="flex" justifyContent="flex-end">
          <Button 
            variant="outlined" 
            size="small" 
            startIcon={<AutoAwesome />}
            onClick={() => generateRecommendations(selectedUser)}
          >
            Rafraîchir les recommandations
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AIRecommendations;