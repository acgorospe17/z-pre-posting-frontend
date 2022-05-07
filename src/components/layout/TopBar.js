import { useColorMode } from '../../contexts/ThemeContext';
import NavMenu from './NavMenu';
import UserMenu from './UserMenu';

import React from 'react';
import { useTheme } from '@mui/material/styles';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Tooltip,
} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const TopBar = function() {
  const theme = useTheme();
  const colorMode = useColorMode();


  return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar id="back-to-top-anchor">

            <NavMenu />

            <Typography
              variant="overline"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, fontSize: 24 }}
            >
              Z-Pre Posting
            </Typography>

            <UserMenu />

            <Tooltip title={`set ${theme.palette.mode === 'dark' ? 'light' : 'dark'} mode`} arrow>
              <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
                {theme.palette.mode === 'light' ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Tooltip>

          </Toolbar>
        </AppBar>
      </Box>
  );
}

export default TopBar;