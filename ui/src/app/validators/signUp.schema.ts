import * as Yup from 'yup';

const emailValidationSchema = Yup.string()
  .email('Invalid email address')
  .matches(
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    'Email must be in a valid format'
  )
  .required('Email is required');

  const nameValidationSchema = Yup.string()
  .matches(
    /^[a-zA-Z\s]+$/,
    'Name must contain only letters and spaces'
  ) // Validación con regexp
  .min(3, 'Name must be at least 3 characters long')
  .required('Name is required');

  const passwordValidationSchema = Yup.string()
  .matches(
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/,
    'Password must have at least 8 characters, one uppercase letter, one number, and one special character'
  )
  .required('Password is required');

export const signUpSchema = Yup.object({
  name: nameValidationSchema,
  email: emailValidationSchema,
  password: passwordValidationSchema,
  ["confirm-password"]: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('You must confirm the password'),
});