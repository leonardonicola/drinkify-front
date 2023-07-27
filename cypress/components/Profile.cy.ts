import Profile from '@/views/Profile.vue'

describe('<Home />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(Profile, {})
  })
})
