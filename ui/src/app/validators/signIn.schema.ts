import * as Yup from 'yup';

const emailValidationSchema = Yup.string()
  .email('Invalid email address')
  .matches(
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    'Email must be in a valid format'
  )
  .required('Email is required');

  const passwordValidationSchema = Yup.string()
  .matches(
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/,
    'Password must have at least 8 characters, one uppercase letter, one number, and one special character'
  )
  .required('Password is required');

export const signInSchema = Yup.object({
	email: emailValidationSchema,
	password: passwordValidationSchema
});