import * as yup from "yup";

const passwordRules = /^(?=.*\d)[^\s]{6,20}$/;

export const registerSchema = yup.object().shape({
  email: yup.string().email("Please verify your email").required("Required"),
  reEmail: yup
    .string()
    .email("Please verify your email")
    .oneOf([yup.ref("email")], "Your emails don`t match")
    .required("Required"),
  password: yup
    .string()
    .min(6, "Your password is too short")
    .matches(passwordRules, "Please verify your password")
    .required("Required"),
});

export const loginSchema = yup.object().shape({
  email: yup.string().email("Please verify your email").required("Required"),
  password: yup
    .string()
    .min(6, "Your password is too short")
    .matches(passwordRules, { message: "Please verify your password" })
    .required("Required"),
});
