describe('SignInForm Component', () => {
    const API_URL = Cypress.env('API_URL');
    const BASE_URL = Cypress.config().baseUrl;

    beforeEach(() => {
        cy.intercept('POST', `${API_URL}/auth/login`, {
            statusCode: 202,
            body: {
              access_token: 'mock-token',
            },
          }).as('loginRequest');

          cy.intercept('POST', `${API_URL}/auth/login`, {
            statusCode: 400,
            body: {
              error: 'Invalid credentials',
            },
          }).as('badLoginRequest');
      cy.visit('/auth/sign-in');
    });
  
    it('should render the SignInForm correctly', () => {
      cy.get('form').should('exist');
      cy.get('input[name="email"]').should('exist');
      cy.get('input[name="password"]').should('exist');
      cy.get('button[type="submit"]').should('exist');
    });
  
    it('should validate email field', () => {
      cy.get('input[name="email"]').type('invalid-email');
      cy.get('button[type="submit"]').click();
      cy.contains('Invalid email address').should('exist');
    });
  
    it('should validate password field', () => {
      cy.get('input[name="password"]').type('short');
      cy.get('button[type="submit"]').click();
      cy.contains('Password must have at least 8 characters, one uppercase letter, one number, and one special character').should('exist');
    });

    it('should submit the form with valid data', () => {
        
      
        cy.get('input[name="email"]').type('test@test.com');
        cy.get('input[name="password"]').type('ValidPassword123@');
        cy.get('button[type="submit"]').click();

      
        cy.contains('User logged in successfully').should('exist');
          });

      it('should show an error message when API returns an error', () => {
        
      
        cy.get('input[name="email"]').type('wron1g@example.com');
        cy.get('input[name="password"]').type('WrongPassword123@');
        cy.get('button[type="submit"]').click();
      
        cy.wait('@badLoginRequest');
      
        cy.contains('Invalid credentials').should('exist');
      });
  });