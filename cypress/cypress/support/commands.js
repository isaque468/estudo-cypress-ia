// ***********************************************
// Comandos customizados reutilizáveis
// ***********************************************

// Comando para fazer login
Cypress.Commands.add('login', (email, senha) => {
  cy.get('a[href="/login"]').click()
  cy.get('[data-qa="login-email"]').type(email)
  cy.get('[data-qa="login-password"]').type(senha)
  cy.get('[data-qa="login-button"]').click()
})

// Comando para gerar email aleatório
Cypress.Commands.add('gerarEmailAleatorio', () => {
  const timestamp = new Date().getTime()
  return `teste${timestamp}@example.com`
})

// Comando para verificar se está logado
Cypress.Commands.add('verificarLogin', (nomeUsuario) => {
  cy.contains(`Logged in as ${nomeUsuario}`).should('be.visible')
})

// Comando para fazer logout
Cypress.Commands.add('logout', () => {
  cy.get('a[href="/logout"]').click()
  cy.url().should('include', '/login')
})

// Comando para limpar carrinho (se necessário)
Cypress.Commands.add('limparCarrinho', () => {
  cy.get('a[href="/view_cart"]').click()
  cy.get('body').then(($body) => {
    if ($body.find('.cart_quantity_delete').length > 0) {
      cy.get('.cart_quantity_delete').each(($el) => {
        cy.wrap($el).click()
        cy.wait(500)
      })
    }
  })
})

// Comando para preencher formulário de cadastro
Cypress.Commands.add('preencherCadastro', (dados) => {
  // Título (Mr. ou Mrs.)
  if (dados.titulo === 'Mr') {
    cy.get('#id_gender1').check()
  } else {
    cy.get('#id_gender2').check()
  }
  
  cy.get('[data-qa="password"]').type(dados.senha)
  
  // Data de nascimento
  cy.get('[data-qa="days"]').select(dados.dia)
  cy.get('[data-qa="months"]').select(dados.mes)
  cy.get('[data-qa="years"]').select(dados.ano)
  
  // Newsletter e ofertas
  cy.get('#newsletter').check()
  cy.get('#optin').check()
  
  // Informações de endereço
  cy.get('[data-qa="first_name"]').type(dados.nome)
  cy.get('[data-qa="last_name"]').type(dados.sobrenome)
  cy.get('[data-qa="company"]').type(dados.empresa)
  cy.get('[data-qa="address"]').type(dados.endereco)
  cy.get('[data-qa="address2"]').type(dados.endereco2)
  cy.get('[data-qa="country"]').select(dados.pais)
  cy.get('[data-qa="state"]').type(dados.estado)
  cy.get('[data-qa="city"]').type(dados.cidade)
  cy.get('[data-qa="zipcode"]').type(dados.cep)
  cy.get('[data-qa="mobile_number"]').type(dados.telefone)
  
  cy.get('[data-qa="create-account"]').click()
})