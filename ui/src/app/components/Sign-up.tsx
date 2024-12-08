"use client";
import { Form, Formik } from "formik"
import { signUpSchema } from "@/app/validators/signUp.schema"
import { IApiService } from "../interfaces/IApiService";
import { FormValues } from "../hooks/useAuth";
import { FormField } from "../common/components/FormField";
import { Button } from "../common/components/Button";

interface SignUpFormProps {
	apiService: IApiService;
  handleSignUp: (
    values: FormValues, 
    apiService: IApiService, 
  ) => void;
  initialValues: FormValues;
}

export const SignUpForm: React.FC<SignUpFormProps> = ({ 
  apiService, 
  handleSignUp, 
  initialValues}) => {

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:py-14 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-5 tracking-tight text-gray-900">Sign up</h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => handleSignUp(values, apiService)}
          validationSchema={signUpSchema}
        >
          {() => (
          <Form className="space-y-4">
            <FormField
            type="text"
            name="name"
            label="Name"
            id="name"
            placeHolder="Your name"
            required
            />
            <FormField
            type="email"
            name="email"
            label="Email address"
            id="email"
            placeHolder="Email address"
            required
            />
            <FormField
            type="password"
            name="password"
            label="Password"
            id="password"
            placeHolder="Your password"
            required
            />
            <FormField
            type="password"
            name="confirm-password"
            label="Confirm Password"
            id="confirm-password"
            placeHolder="Confirm your password"
            required
            />
            <div className="pt-4">
              <p
                className="text-center text-sm text-gray-500 pb-2"
              >
                Already a member?{' '}
                <a
                  href="/auth/sign-in"
                  className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                >
                  Sign in
                </a>
              </p>
              <Button
              type="submit"
              label="Sign up"
              />
            </div>
          </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}