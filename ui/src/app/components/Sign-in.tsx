"use client";
import { Form, Formik } from "formik"
import { IApiService } from "../interfaces/IApiService";
import { FormValues } from "../hooks/useAuth";
import { signInSchema } from "../validators/signIn.schema";
import { FormField } from "../common/components/FormField";
import { Button } from "../common/components/Button";


interface SignInProps {
	apiService: IApiService;
  handleSignIn:(
    values: FormValues, 
    apiService: IApiService) => void;
  initialValues: FormValues;
}

export const SignInForm: React.FC<SignInProps> = ({ 
  apiService, 
  handleSignIn, 
  initialValues
}) => {

  
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:py-24 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {handleSignIn(values, apiService)}}
          validationSchema={signInSchema}
        >
          {() => (
          <Form className="space-y-6">
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
            <div>
              <p
                className="mt-2 mb-2 text-center text-sm text-gray-500"
              >
                Not a member?{' '}
                <a
                  href="/auth/sign-up"
                  className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                >
                  Sign up
                </a>
              </p>
              <Button
              type="submit"
              label="Sign in"
              />
            </div>
          </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}