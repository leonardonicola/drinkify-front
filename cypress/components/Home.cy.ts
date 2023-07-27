import Home from '@/views/Home.vue'

describe('<Home />', () => {
  it('renders', () => {
    cy.mount(Home)
    cy.get('.card').should('exist')
  })
})
