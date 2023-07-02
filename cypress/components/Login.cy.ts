import Login from '@/views/Login.vue'
describe('<Login />', () => {
  it('should throw error if input not email', () => {
    cy.mount(Login)
    cy.get('[luquinhas-homosexual=email-input]').type('Dev Full Ciclo')
    cy.get('[data-cy=email-error-msg]').should('have.text', '*Este campo precisa ser um e-mail')
  })
})
