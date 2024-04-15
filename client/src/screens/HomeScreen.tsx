import React from "react";
import { Typography, Box, CircularProgress, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/reducers/authSlice";
import { LoadingButton } from "@mui/lab";

export const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLogoutLoading } = useSelector((state: any) => state.auth);

  console.log("isLogoutLoading: ", isLogoutLoading);

  const { user } = useSelector((state: any) => state.auth);

  const handleLogout = () => {
    dispatch(logout({ onSuccess: () => navigate("/home") }));
  };

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
          padding: "30px",
        }}
      >
        <Box
          sx={{
            justifyContent: "center",
            textAlign: "center",
            marginBottom: 25,
          }}
        >
          <Typography variant="h5" sx={{ fontSize: 30 }}>
            Home
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <Typography variant="h5" sx={{ fontSize: 20 }}>
              Logged in as
              <Typography sx={{ display: "block", fontSize: 20 }}>
                {user.email}
              </Typography>
            </Typography>
          </Box>
          <LoadingButton
            variant="contained"
            loading={isLogoutLoading}
            onClick={() => handleLogout()}
            loadingIndicator={<CircularProgress size={25} color={"inherit"} />}
            sx={{
              width: "70%",
              textTransform: "none",
              borderRadius: 3,
              marginTop: 5,
            }}
          >
            <Typography
              sx={{
                fontSize: 20,
                visibility: isLogoutLoading ? "hidden" : "visible",
                padding: "5px",
              }}
            >
              Logout
            </Typography>
          </LoadingButton>
        </Box>
      </Paper>
    </Box>
  );
};
