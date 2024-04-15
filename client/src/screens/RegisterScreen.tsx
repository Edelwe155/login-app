import React from "react";
import { Typography, Box, CircularProgress, Paper } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { CustomInput } from "../elements/CustomInput";
import { useNavigate } from "react-router-dom";
import { register } from "../store/reducers/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { registerSchema } from "../schemas/indext";

export const RegisterScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isRegisterLoading } = useSelector((state: any) => state.auth);

  const handleFormSubmit = (values: any) => {
    dispatch(
      register({
        user: {
          email: values.email,
          reEmail: values.reEmail,
          password: values.password,
        },
        onSuccess: () => navigate("/login"),
      })
    );
  };

  const { values, handleBlur, handleChange, handleSubmit, touched, errors } =
    useFormik({
      initialValues: {
        email: "",
        reEmail: "",
        password: "",
      },
      validationSchema: registerSchema,
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
        <Box sx={{ justifyContent: "center", textAlign: "center" }}>
          <Typography variant="h5" sx={{ fontSize: 30 }}>
            Sign up
          </Typography>
        </Box>
        <Box sx={{ width: "100%" }}>
          <CustomInput
            disabled={isRegisterLoading}
            label="Email"
            id="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
          />
          <CustomInput
            disabled={isRegisterLoading}
            label="Re-enter email"
            id="reEmail"
            value={values.reEmail}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.reEmail && Boolean(errors.reEmail)}
            helperText={touched.reEmail && errors.reEmail}
          />
          <CustomInput
            disabled={isRegisterLoading}
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
          loading={isRegisterLoading}
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
              visibility: isRegisterLoading ? "hidden" : "visible",
              padding: "5px",
            }}
          >
            Sign up
          </Typography>
        </LoadingButton>
      </Paper>
    </Box>
  );
};
