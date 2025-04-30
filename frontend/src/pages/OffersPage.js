import React, { useState } from 'react';
import { Card, CardContent, Typography, Grid, Chip, Button, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar } from '@mui/material';
import { Work as WorkIcon } from '@mui/icons-material';

// Déclaration des données des offres
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
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [appliedOffers, setAppliedOffers] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  // Handle apply button click
  const handleApply = () => {
    setAppliedOffers((prev) => [...prev, selectedOffer.id]); // Add the offerId to the appliedOffers array
    setSnackbarMessage('Vous avez postulé avec succès!');
    setOpenSnackbar(true);
    setOpenDialog(false); // Close the dialog after applying
  };

  const handleOpenDialog = (offer) => {
    setSelectedOffer(offer); // Set the selected offer data
    setOpenDialog(true); // Open the dialog
  };

  const handleCloseDialog = () => {
    setOpenDialog(false); // Close the dialog without applying
  };

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
                <Button 
                  variant="contained" 
                  size="small" 
                  sx={{ mt: 1 }}
                  disabled={appliedOffers.includes(offer.id)} // Disable if already applied
                  onClick={() => handleOpenDialog(offer)} // Open the dialog with the offer's details
                >
                  {appliedOffers.includes(offer.id) ? 'Postulé' : 'Postuler'}
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

      {/* Snackbar to show application status */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
      />

      {/* Dialog (Modal) to show offer details */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{selectedOffer?.title}</DialogTitle>
        <DialogContent>
          <Typography variant="body1"><strong>Description:</strong> {selectedOffer?.description}</Typography>
          <Typography variant="body1"><strong>Budget:</strong> {selectedOffer?.budget}</Typography>
          <Typography variant="body1"><strong>Compétences requises:</strong></Typography>
          <div style={{ margin: '10px 0' }}>
            {selectedOffer?.skills.map((skill, index) => (
              <Chip key={index} label={skill} size="small" sx={{ mr: 1, mt: 1 }} />
            ))}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Fermer
          </Button>
          <Button 
            onClick={handleApply} 
            color="primary"
            disabled={appliedOffers.includes(selectedOffer?.id)} // Disable if already applied
          >
            {appliedOffers.includes(selectedOffer?.id) ? 'Postulé' : 'Postuler'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

// Exportez à la fois le composant et les données si nécessaire
export { offers };
export default OffersPage;
