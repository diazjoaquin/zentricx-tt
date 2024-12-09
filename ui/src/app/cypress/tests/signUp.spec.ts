describe('SignUpForm Component', () => {
    const API_URL = Cypress.env('API_URL');
    const BASE_URL = Cypress.config().baseUrl;

    beforeEach(() => {
      cy.visit('/auth/sign-up');
      cy.intercept('POST', `${API_URL}/auth/register`, {
        statusCode: 202,
        body: { message: 'User registered successfully' },
      }).as('signUpRequest');
    });
  
    it('should render the SignUpForm correctly', () => {
      cy.get('form').should('exist');
      cy.get('input[name="name"]').should('exist');
      cy.get('input[name="email"]').should('exist');
      cy.get('input[name="password"]').should('exist');
      cy.get('input[name="confirm-password"]').should('exist');
      cy.get('button[type="submit"]').should('exist');
    });
  
    it('should validate the name field', () => {
      cy.get('input[name="name"]').type('Jo');
      cy.get('button[type="submit"]').click();
      cy.contains('Name must be at least 3 characters long').should('exist');
    });
  
    it('should validate the email field', () => {
      cy.get('input[name="email"]').type('invalid-email');
      cy.get('button[type="submit"]').click();
      cy.contains('Invalid email address').should('exist');
    });
  
    it('should validate the password field', () => {
      cy.get('input[name="password"]').type('short');
      cy.get('button[type="submit"]').click();
      cy.contains('Password must have at least 8 characters, one uppercase letter, one number, and one special character').should('exist');
    });
  
    it('should validate password confirmation', () => {
      cy.get('input[name="password"]').type('ValidPassword123');
      cy.get('input[name="confirm-password"]').type('DifferentPassword123');
      cy.get('button[type="submit"]').click();
      cy.contains('Passwords must match').should('exist');
    });

    it('should submit the form with valid data', () => {
        cy.get('input[name="name"]').type('John Doe');
        cy.get('input[name="email"]').type('user@example.com');
        cy.get('input[name="password"]').type('ValidPassword123@');
        cy.get('input[name="confirm-password"]').type('ValidPassword123@');
        cy.get('button[type="submit"]').click();
      
        cy.wait('@signUpRequest');
        cy.contains('User created successfully, please sign in').should('exist');
        cy.url().should('eq', `${BASE_URL}/auth/sign-in`);
      });
  });