import * as Yup from 'yup';

export const forgotPasswordSchema = Yup.object({
  email: Yup.string().email('Invalid email format').required('Email is required'),
});