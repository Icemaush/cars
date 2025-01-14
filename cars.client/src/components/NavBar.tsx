import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const NavBar = () => {
  const getPage = () => {
    return window.location.href.split("/").pop()
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ marginRight: 8 }}>
            Cars
          </Typography>
          <Box display={"flex"} gap={2}>
            <Button
              variant={getPage() === "" ? "contained" : "text"}
              color="warning"
              sx={{ color: "white" }}
              href={"/"}
            >
              Home
            </Button>
            <Button
              variant={getPage() === "registration" ? "contained" : "text"}
              color="warning"
              sx={{ color: "white" }}
              href={"/registration"}
            >
              Registrations
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

//variant = { getPage() === "" ? "contained" : "outlined"}

export default NavBar