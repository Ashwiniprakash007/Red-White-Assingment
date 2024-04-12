import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';
import  { useNavigate }  from 'react-router-dom';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleProductClick = () => {
    navigate('/');
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  const handleCategoryClick = () => {
    navigate('/category');
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Red&White Shopping
          </Typography>
          <IconButton onClick={handleCartClick} color="inherit" aria-label="cart">
            <ShoppingCartIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={open} onClose={handleDrawerClose}>
        <List>
          <ListItem button onClick={handleCategoryClick}>
            <ListItemText primary="Category" />
          </ListItem>
          <ListItem onClick={handleProductClick}  >
            <ListItemText primary="Products" />
          </ListItem>
          {/* <ListItem button onClick={handleDrawerClose}>
            <ListItemText primary="Electronics" />
          </ListItem>
          <ListItem button onClick={handleDrawerClose}>
            <ListItemText primary="Contact" />
          </ListItem> */}
        </List>
      </Drawer>
    </div>
  );
};

export default Navbar;
