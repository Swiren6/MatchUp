import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';

const Navigation = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Mon Application
        </Typography>
        <Button color="inherit" component={Link} to="/users">
          Utilisateurs
        </Button>
        <Button color="inherit" component={Link} to="/offers">
          Offres
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;