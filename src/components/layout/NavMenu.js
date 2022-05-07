import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import InboxIcon from '@mui/icons-material/Inbox';
import PostAddIcon from '@mui/icons-material/PostAdd';

const pages = [
  {text: 'All Posts', icon: <AllInboxIcon />},
  {text: 'My Posts', icon: <InboxIcon />},
  {text: 'Create Post', icon: <PostAddIcon />},
];

function NavMenu() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (page) => {
    setAnchorElNav(null);

    if (page === 'All Posts') {
      navigate('/all-posts');
    }

    if (page === 'My Posts') {
      navigate('/my-posts');
    }

    if (page === 'Create Post') {
      navigate('/create-post');
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Tooltip title="view menu" arrow>
        <IconButton
          onClick={handleOpenNavMenu}
          size="large"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
      </Tooltip>
      <Menu
        id="nav-menu-appbar"
        anchorEl={anchorElNav}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
        sx={{
          display: { xs: 'block' },
        }}
      >
        {pages.map((page, i) => (
          <MenuItem key={i} onClick={() => handleCloseNavMenu(page.text)}>
            <ListItemIcon>{page.icon}</ListItemIcon>
            <ListItemText primary={page.text}/>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  )
}

export default NavMenu;