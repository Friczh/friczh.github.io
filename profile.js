// profile.js

import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Lanyard } from 'react-discord-status';
import { Drawer, AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import { ExpandableDrawer } from './ExpandableDrawer'; // Hypothetical component for drawer navigation

const App = () => {
  const [themeMode, setThemeMode] = useState('light');
  const [discordStatus, setDiscordStatus] = useState(null);

  const themes = {
    emerald: createTheme({
      palette: {
        mode: 'light',
        primary: {
          main: '#4caf50', // Emerald
        },
      },
    }),
    lightBlue: createTheme({
      palette: {
        mode: 'dark',
        primary: {
          main: '#03a9f4', // Light Blue
        },
      },
    }),
  };

  const toggleTheme = () => {
    setThemeMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    const fetchDiscordStatus = async () => {
      const response = await fetch('https://api.lanyard.rest/v1/users/YOUR_DISCORD_ID');
      const data = await response.json();
      setDiscordStatus(data);
    };
    fetchDiscordStatus();
    const intervalId = setInterval(fetchDiscordStatus, 30000); // Fetch every 30 sec
    return () => clearInterval(intervalId);
  }, []);

  return (
    <ThemeProvider theme={themeMode === 'light' ? themes.emerald : themes.lightBlue}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">My App</Typography>
          <IconButton onClick={toggleTheme} color="inherit">Toggle Theme</IconButton>
        </Toolbar>
      </AppBar>
      <ExpandableDrawer />
      <Lanyard userID="YOUR_DISCORD_ID" />
    </ThemeProvider>
  );
};

export default App;