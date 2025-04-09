import { Card, CardContent, Typography, Grid, Chip, Button } from '@mui/material';
import { Work as WorkIcon } from '@mui/icons-material';

// Déclaration des données des offres (ne pas utiliser 'export' ici)
const offers = [
  {
    id: 1,
    title: 'Site E-commerce',
    description: 'Développement d\'une plateforme e-commerce avec React et Node.js',
    budget: '5000€',
    skills: ['React', 'Node.js', 'MongoDB'],
    status: 'Ouvert'
  },
  {
    id: 2,
    title: 'Application Mobile',
    description: 'Création d\'une application mobile cross-platform avec React Native',
    budget: '8000€',
    skills: ['React Native', 'Firebase'],
    status: 'En cours'
  },
  {
    id: 3,
    title: 'Refonte UI/UX',
    description: 'Redesign complet de l\'interface utilisateur d\'une application web',
    budget: '3000€',
    skills: ['Figma', 'UI Design', 'UX Research'],
    status: 'Ouvert'
  }
];

const OffersPage = () => {
  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Offres de Projets
      </Typography>
      <Grid container spacing={3}>
        {offers.map((offer) => (
          <Grid item xs={12} sm={6} md={4} key={offer.id}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <WorkIcon color="primary" /> {offer.title}
                </Typography>
                <Typography color="text.secondary" sx={{ mt: 1 }}>
                  Budget: {offer.budget}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {offer.description}
                </Typography>
                <div style={{ margin: '10px 0' }}>
                  {offer.skills.map((skill, index) => (
                    <Chip key={index} label={skill} size="small" sx={{ mr: 1, mt: 1 }} />
                  ))}
                </div>
                <Button variant="contained" size="small" sx={{ mt: 1 }}>
                  Postuler
                </Button>
                <Chip 
                  label={offer.status} 
                  color={offer.status === 'Ouvert' ? 'success' : 'warning'} 
                  size="small" 
                  sx={{ float: 'right', mt: 1.5 }} 
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

// Exportez à la fois le composant et les données si nécessaire
export { offers };
export default OffersPage;