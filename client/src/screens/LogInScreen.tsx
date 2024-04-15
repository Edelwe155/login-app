import React from "react";
import { Typography, Box, CircularProgress, Paper } from "@mui/material";
import { CustomInput } from "../elements/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/reducers/authSlice";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { loginSchema } from "../schemas/indext";
import { LoadingButton } from "@mui/lab";

export const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoginLoading } = useSelector((state: any) => state.auth);

  const handleFormSubmit = (values: any) => {
    dispatch(
      login({
        user: {
          email: values.email,
          password: values.password,
        },
        onSuccess: () => navigate("/home"),
      })
    );
  };

  const { values, handleBlur, handleChange, handleSubmit, touched, errors } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: loginSchema,
      onSubmit: handleFormSubmit,
    });

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
        component="form"
        onSubmit={handleSubmit}
        elevation={3}
        sx={{
          width: "20%",
          maxWidth: 400,
          height: "70%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "30px",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Typography variant="h5" sx={{ fontSize: 30 }}>
            Login
          </Typography>
        </Box>
        <Box sx={{ width: "100%" }}>
          <CustomInput
            disabled={isLoginLoading}
            label="Email"
            id="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
          />
          <CustomInput
            disabled={isLoginLoading}
            label="Password"
            id="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
          />
        </Box>
        <LoadingButton
          type="submit"
          variant="contained"
          loading={isLoginLoading}
          loadingIndicator={<CircularProgress size={20} color={"inherit"} />}
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
              visibility: isLoginLoading ? "hidden" : "visible",
              padding: "5px",
            }}
          >
            Login
          </Typography>
        </LoadingButton>
      </Paper>
    </Box>
  );
};
