import * as Yup from "yup";

export const signupValidationSchema = Yup.object().shape({
  fullName: Yup.string().required("Full name is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10,15}$/, "Invalid phone number") // Adjust as needed for your requirements
    .required("Phone number is required"),
});
