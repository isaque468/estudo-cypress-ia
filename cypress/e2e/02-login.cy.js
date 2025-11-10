// ========================================
// TESTE 2: LOGIN DE USUÁRIO
// Arquivo: cypress/e2e/02-login.cy.js
// ========================================

describe('Login de Usuário', () => {
  
  // Roda antes de cada teste
  beforeEach(() => {
    cy.visit('/') // Visita a página inicial
  })
  
  // TESTE 2.1: Login com sucesso
  it('Deve fazer login com credenciais válidas', () => {
    cy.fixture('usuario').then((usuario) => {
      
      // Usa o comando customizado de login (definido em commands.js)
      cy.login('emailduplicado@teste.com', usuario.cadastro.senha)
      
      // Verifica se logou com sucesso
      cy.verificarLogin(usuario.cadastro.nome)
      
      // Verifica se botão de logout está visível
      cy.get('a[href="/logout"]').should('be.visible')
    })
  })
  
  // TESTE 2.2: Erro com email inválido
  it('Deve exibir erro com email inválido', () => {
    cy.fixture('usuario').then((usuario) => {
      cy.get('a[href="/login"]').click()
      
      // Tenta login com credenciais inválidas
      cy.get('[data-qa="login-email"]').type(usuario.loginInvalido.email)
      cy.get('[data-qa="login-password"]').type(usuario.loginInvalido.senha)
      cy.get('[data-qa="login-button"]').click()
      
      // Verifica mensagem de erro
      cy.contains('Your email or password is incorrect!').should('be.visible')
    })
  })
  
  // TESTE 2.3: Erro com senha incorreta
  it('Deve exibir erro com senha incorreta', () => {
    cy.get('a[href="/login"]').click()
    
    cy.get('[data-qa="login-email"]').type('emailduplicado@teste.com')
    cy.get('[data-qa="login-password"]').type('senhaerrada123')
    cy.get('[data-qa="login-button"]').click()
    
    cy.contains('Your email or password is incorrect!').should('be.visible')
  })
  
  // TESTE 2.4: Validação de campos vazios
  it('Não deve permitir login com campos vazios', () => {
    cy.get('a[href="/login"]').click()
    
    // Tenta fazer login sem preencher
    cy.get('[data-qa="login-button"]').click()
    
    // Verifica validação HTML5
    cy.get('[data-qa="login-email"]').then(($input) => {
      expect($input[0].validationMessage).to.exist
    })
  })
  
  // TESTE 2.5: Logout com sucesso
  it('Deve fazer logout com sucesso', () => {
    cy.fixture('usuario').then((usuario) => {
      // Faz login
      cy.login('emailduplicado@teste.com', usuario.cadastro.senha)
      cy.verificarLogin(usuario.cadastro.nome)
      
      // Faz logout
      cy.logout()
      
      // Verifica se voltou para página de login
      cy.contains('Login to your account').should('be.visible')
    })
  })
  
})