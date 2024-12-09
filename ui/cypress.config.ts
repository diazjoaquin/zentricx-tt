import { defineConfig } from 'cypress';
import dotenv from 'dotenv';

dotenv.config();

// https://docs.cypress.io/guides/references/configuration
export default defineConfig({
	video: false,
	screenshotOnRunFailure: false,
	port: process.env.CYPRESS_HOST_PORT ? +process.env.CYPRESS_HOST_PORT : 3001,
	e2e: {
		env: {
			API_URL: process.env.CYPRESS_API_URL_PREFIX,
		},
		baseUrl: process.env.CYPRESS_BASE_URL_PREFIX || 'http://localhost:3000',
		specPattern: './src/app/cypress/tests/**/*.spec.{js,jsx,ts,tsx}',
        supportFile: false,
	},
});