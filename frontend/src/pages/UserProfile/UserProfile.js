// UserProfile.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography, Grid, Chip, Button } from '@mui/material';

const UserProfile = () => {
  const { userId } = useParams(); // Récupère l'ID de l'utilisateur dans l'URL
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/user/${userId}`);
        const data = await response.json();
        
        if (response.ok) {
          setUserData(data);
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (!userData) {
    return <Typography>Profile not found.</Typography>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Profil de {userData.name}
      </Typography>
      <Typography variant="h6">Email: {userData.email}</Typography>

      <Typography variant="h5" sx={{ mt: 3 }}>
        Offres postulées
      </Typography>
      <Grid container spacing={3}>
        {userData.appliedOffers.length === 0 ? (
          <Typography>Aucune offre postulée</Typography>
        ) : (
          userData.appliedOffers.map((offer) => (
            <Grid item xs={12} sm={6} md={4} key={offer._id}>
              <Card>
                <CardContent>
                  <Typography variant="h5">{offer.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Budget: {offer.budget}
                  </Typography>
                  <Typography variant="body2">{offer.description}</Typography>
                  <div style={{ marginTop: '10px' }}>
                    {offer.skills.map((skill, index) => (
                      <Chip key={index} label={skill} size="small" sx={{ mr: 1, mt: 1 }} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </div>
  );
};

export default UserProfile;
