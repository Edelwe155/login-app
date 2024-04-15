import React from "react";
import { Typography, Button, Box, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const WelcomeScreen = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "97vh",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "20%",
          maxWidth: 400,
          height: "70%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 25,
          padding: "30px",
        }}
      >
        <Box
          sx={{
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Typography variant="h5" sx={{ fontSize: 30 }}>
            Welcome
          </Typography>
        </Box>
        <Box
          sx={{ justifyContent: "center", textAlign: "center", width: "100%" }}
        >
          <Button
            onClick={() => navigate("/signup")}
            variant="contained"
            sx={{
              mb: 5,
              width: "70%",
              textTransform: "none",
              borderRadius: 3,
            }}
          >
            <Typography sx={{ fontSize: 20, padding: "5px" }}>
              Sign Up
            </Typography>
          </Button>
          <Button
            onClick={() => navigate("/login")}
            variant="contained"
            sx={{
              width: "70%",
              textTransform: "none",
              borderRadius: 3,
            }}
          >
            <Typography sx={{ fontSize: 20, padding: "5px" }}>
              Log In
            </Typography>
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};
