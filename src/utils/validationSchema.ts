import * as yup from "yup";

export const signupValidationSchema = yup.object({
  email: yup
    .string()
    .email("Email must be a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters long.")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(
      /[!@#$%^&*]/,
      "Password must contain at least one special character",
    )
    .required("Password is required"),
  passwordConfirmation: yup
    .string()
    .required()
    .oneOf([yup.ref("password")], "Password must match"),
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
});

export const loginValidationSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required("Password is required"),
});
