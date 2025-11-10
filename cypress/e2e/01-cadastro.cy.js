// ========================================
// TESTE 1: CADASTRO DE USUÁRIO
// Arquivo: cypress/e2e/01-cadastro.cy.js
// ========================================

describe('Cadastro de Usuário', () => {
  
  // Este bloco roda ANTES de cada teste (it)
  beforeEach(() => {
    // Visita a página inicial do site
    cy.visit('/')
  })
  
  // TESTE 1.1: Cadastro bem-sucedido
  it('Deve cadastrar um novo usuário com sucesso', () => {
    
    // Carrega os dados do arquivo usuario.json (fixtures)
    cy.fixture('usuario').then((usuario) => {
      
      // Passo 1: Clicar no botão de Signup/Login
      cy.get('a[href="/login"]').click()
      
      // Passo 2: Verificar se está na página correta
      cy.url().should('include', '/login')
      cy.contains('New User Signup!').should('be.visible')
      
      // Passo 3: Gerar email aleatório para evitar duplicação
      const timestamp = new Date().getTime()
      const emailAleatorio = `teste${timestamp}@example.com`
      
      // Passo 4: Preencher nome e email para signup
      cy.get('[data-qa="signup-name"]').type(usuario.cadastro.nome)
      cy.get('[data-qa="signup-email"]').type(emailAleatorio)
      cy.get('[data-qa="signup-button"]').click()
      
      // Passo 5: Verificar se foi para página de cadastro
      cy.contains('Enter Account Information').should('be.visible')
      
      // Passo 6: Preencher formulário completo
      cy.preencherCadastro(usuario.cadastro)
      
      // Passo 7: Verificar mensagem de sucesso
      cy.contains('Account Created!').should('be.visible')
      
      // Passo 8: Clicar em continuar
      cy.get('[data-qa="continue-button"]').click()
      
      // Passo 9: Verificar se está logado
      cy.verificarLogin(usuario.cadastro.nome)
      
      // Passo 10: Fazer logout
      cy.logout()
    })
  })
  
  // TESTE 1.2: Erro ao cadastrar com email duplicado
  it('Deve exibir erro ao tentar cadastrar com email já existente', () => {
    cy.fixture('usuario').then((usuario) => {
      cy.get('a[href="/login"]').click()
      
      // Tenta cadastrar com email que já existe
      cy.get('[data-qa="signup-name"]').type(usuario.cadastro.nome)
      cy.get('[data-qa="signup-email"]').type('emailduplicado@teste.com')
      cy.get('[data-qa="signup-button"]').click()
      
      // Verifica se apareceu mensagem de erro
      cy.contains('Email Address already exist!').should('be.visible')
    })
  })
  
  // TESTE 1.3: Validação de campos obrigatórios
  it('Não deve permitir cadastro com campos obrigatórios vazios', () => {
    cy.get('a[href="/login"]').click()
    
    // Tenta submeter sem preencher nada
    cy.get('[data-qa="signup-button"]').click()
    
    // Navegador mostra validação HTML5
    cy.get('[data-qa="signup-name"]').then(($input) => {
      expect($input[0].validationMessage).to.exist
    })
  })
  
})