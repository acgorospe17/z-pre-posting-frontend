import React, { useState, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import SignInOrSignUp from '../login/SignInOrSignUp';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  IconButton,
  Tooltip,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Badge,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LogoutIcon from '@mui/icons-material/Logout';

const settings = [
  {text: 'Edit Profile', icon: <ManageAccountsIcon />},
  {text: 'Logout', icon: <LogoutIcon />}
];

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

const UserMenu = function() {
  const { currentUser, logout } = useAuth();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const memUser = useRef();
  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
    memUser.current = currentUser;
  };

  const handleCloseUserMenu = (setting) => {
    setAnchorElUser(null);

    if (setting === 'Logout') {
      logout();
      navigate('/all-posts');
    }

    if (setting === 'Edit Profile') {
      navigate('/edit-profile');
    }

    if (memUser.current !== currentUser) {
      navigate('/my-posts');
    }
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title={currentUser ? 'view settings' : 'log in'} arrow>
        <IconButton onClick={handleOpenUserMenu}>
          {currentUser ?
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              variant="dot"
            >
              <Avatar src={currentUser?.photoURL} sx={{ width: 24, height: 24 }} />
            </StyledBadge>
            :
            <Avatar src={"/broken-image.jpg"} sx={{ width: 24, height: 24 }} />
          }
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="user-menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
        MenuListProps={{
          disablePadding: true
        }}
      >
        {currentUser ?
          settings.map((setting, i) => (
            <MenuItem key={i} onClick={() => handleCloseUserMenu(setting.text)}>
              <ListItemIcon >{setting.icon}</ListItemIcon>
              <ListItemText  primary={setting.text}/>
            </MenuItem>
          ))
          :
          <SignInOrSignUp />
        }
      </Menu>
    </Box>
  )
}

export default UserMenu;