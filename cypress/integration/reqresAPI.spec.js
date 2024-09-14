describe('ReqRes API Tests', () => {
  
    // Test List Users
    it('List Users', () => {
      cy.request('GET', 'https://reqres.in/api/users').then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.data).to.be.an('array');
        expect(response.body.data[0]).to.have.property('id');
      });
    });
  
    // Test Single User
    it('Single User', () => {
      cy.request('GET', 'https://reqres.in/api/users/2').then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.data).to.have.property('id', 2);
        expect(response.body.data).to.have.property('email');
      });
    });
  
    // Test Single User Not Found
    it('Single User Not Found', () => {
      cy.request({method: 'GET', url: 'https://reqres.in/api/users/23', failOnStatusCode: false}).then((response) => {
        expect(response.status).to.eq(404);
      });
    });
  
    // Test List Resources
    it('List Resources', () => {
      cy.request('GET', 'https://reqres.in/api/unknown').then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.data).to.be.an('array');
        expect(response.body.data[0]).to.have.property('name');
      });
    });
  
    // Test Single Resource
    it('Single Resource', () => {
      cy.request('GET', 'https://reqres.in/api/unknown/2').then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.data).to.have.property('name', 'fuchsia rose');
      });
    });
  
    // Test Single Resource Not Found
    it('Single Resource Not Found', () => {
      cy.request({method: 'GET', url: 'https://reqres.in/api/unknown/23', failOnStatusCode: false}).then((response) => {
        expect(response.status).to.eq(404);
      });
    });
  
    // Test Create User
    it('Create User', () => {
      cy.request('POST', 'https://reqres.in/api/users', {
        name: 'John Doe',
        job: 'leader'
      }).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property('id');
        expect(response.body).to.have.property('createdAt');
      });
    });
  
    // Test Update User (PUT)
    it('Update User (PUT)', () => {
      cy.request('PUT', 'https://reqres.in/api/users/2', {
        name: 'Jane Doe',
        job: 'zion resident'
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('name', 'Jane Doe');
      });
    });
  
    // Test Update User (PATCH)
    it('Update User (PATCH)', () => {
      cy.request('PATCH', 'https://reqres.in/api/users/2', {
        job: 'zion resident'
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('job', 'zion resident');
      });
    });
  
    // Test Delete User
    it('Delete User', () => {
      cy.request('DELETE', 'https://reqres.in/api/users/2').then((response) => {
        expect(response.status).to.eq(204);
      });
    });
  
    // Test Register - Successful
    it('Register Successful', () => {
      cy.request('POST', 'https://reqres.in/api/register', {
        email: 'eve.holt@reqres.in',
        password: 'pistol'
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('token');
      });
    });
  
    // Test Register - Unsuccessful
    it('Register Unsuccessful', () => {
      cy.request({
        method: 'POST',
        url: 'https://reqres.in/api/register',
        failOnStatusCode: false,
        body: {email: 'sydney@fife'}
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body.error).to.eq('Missing password');
      });
    });
  
    // Test Login - Successful
    it('Login Successful', () => {
      cy.request('POST', 'https://reqres.in/api/login', {
        email: 'eve.holt@reqres.in',
        password: 'cityslicka'
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('token');
      });
    });
  
    // Test Login - Unsuccessful
    it('Login Unsuccessful', () => {
      cy.request({
        method: 'POST',
        url: 'https://reqres.in/api/login',
        failOnStatusCode: false,
        body: {email: 'peter@klaven'}
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body.error).to.eq('Missing password');
      });
    });
  
    // Test Delayed Response
    it('Delayed Response', () => {
      cy.request('GET', 'https://reqres.in/api/users?delay=3').then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.data).to.be.an('array');
      });
    });
  });
  