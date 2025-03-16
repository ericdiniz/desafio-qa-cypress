# Documento de testes para especificar o fluxo dos casos de testes

## LOGIN

### Criar um novo usuário com sucesso
Funcionalidade: Criar um novo usuário
  Cenário: Criar um novo usuário com sucesso
    Dado que estou na página de login
    Quando eu preencho o nome, email e senha válidos
    E clico em "Cadastrar"
    Então o sistema deve exibir a mensagem "Usuário inserido com sucesso"

### Validar que o sistema só permite login com usuário cadastrado
Funcionalidade: Validar login com usuário cadastrado
  Cenário: Tentar login com usuário não cadastrado
    Dado que estou na página de login
    Quando eu preencho o email "nao_cadastrado@exemplo.com" e uma senha
    E clico em "Entrar"
    Então o sistema deve exibir a mensagem "Problemas com o login do usuário"

### Realizar login com sucesso
Funcionalidade: Realizar login com sucesso
  Cenário: Login com credenciais válidas
    Dado que estou na página de login
    Quando eu preencho o email e senha de um usuário cadastrado
    E clico em "Entrar"
    Então o sistema deve redirecionar para a página inicial
    E deve exibir a mensagem "Bem vindo, [Nome do Usuário]!"


## CONTAS

### Adicionar no mínimo 2 contas
Funcionalidade: Adicionar contas
  Cenário: Adicionar duas contas
    Dado que estou logado no sistema
    Quando eu acesso a página de contas
    E adiciono uma conta chamada "Conta 1"
    E adiciono uma conta chamada "Conta 2"
    Então as contas "Conta 1" e "Conta 2" devem ser listadas

### Listar todas as contas
Funcionalidade: Listar contas
  Cenário: Listar contas cadastradas
    Dado que estou logado no sistema
    E existem contas cadastradas
    Quando eu acesso a página de contas
    Então todas as contas cadastradas devem ser exibidas

### Alterar o nome das contas
Funcionalidade: Alterar nome das contas
  Cenário: Alterar nome de uma conta
    Dado que estou logado no sistema
    E existe uma conta chamada "Conta 1"
    Quando eu altero o nome da conta para "Conta Alterada"
    Então o sistema deve exibir a mensagem "Conta alterada com sucesso"
    E a conta deve ser listada como "Conta Alterada"

### Tentar excluir uma conta vinculada a uma movimentação
Funcionalidade: Excluir conta vinculada a movimentação
  Cenário: Tentar excluir conta com movimentação
    Dado que estou logado no sistema
    E existe uma conta com movimentações vinculadas
    Quando eu tento excluir essa conta
    Então o sistema deve exibir a mensagem "Conta com movimentação não pode ser excluída"

### Tentar adicionar uma conta com nome já existente
Funcionalidade: Adicionar conta com nome existente
  Cenário: Tentar adicionar conta duplicada
    Dado que estou logado no sistema
    E existe uma conta chamada "Conta 1"
    Quando eu tento adicionar outra conta chamada "Conta 1"
    Então o sistema deve exibir a mensagem "Já existe uma conta com esse nome"


## MOVIMENTAÇÕES

### Criar no mínimo 2 movimentações (Receita e Despesa)
Funcionalidade: Criar movimentações
  Cenário: Criar movimentações de receita e despesa
    Dado que estou logado no sistema
    Quando eu acesso a página de movimentações
    E crio uma movimentação do tipo "Receita"
    E crio uma movimentação do tipo "Despesa"
    Então as movimentações devem ser listadas corretamente

### Criar no mínimo 2 movimentações para cada conta
Funcionalidade: Criar movimentações por conta
  Cenário: Criar movimentações para diferentes contas
    Dado que estou logado no sistema
    E existem duas contas cadastradas
    Quando eu crio duas movimentações para a "Conta 1"
    E eu crio duas movimentações para a "Conta 2"
    Então as movimentações devem ser associadas às contas corretas

### Criar no mínimo 2 movimentações para cada situação
Funcionalidade: Criar movimentações por situação
  Cenário: Criar movimentações para diferentes situações
    Dado que estou logado no sistema
    Quando eu crio duas movimentações com a situação "Pendente"
    E eu crio duas movimentações com a situação "Efetivada"
    Então as movimentações devem refletir as situações corretas

### Criar no mínimo 2 movimentações para meses diferentes
Funcionalidade: Criar movimentações para meses diferentes
  Cenário: Criar movimentações em meses distintos
    Dado que estou logado no sistema
    Quando eu crio uma movimentação para o mês de "Março"
    E eu crio uma movimentação para o mês de "Abril"
    Então as movimentações devem ser listadas nos meses corretos

### Validar os campos de data
Funcionalidade: Validar campo de data
  Cenário: Tentar criar movimentação com data inválida
    Dado que estou logado no sistema
    Quando eu tento criar uma movimentação com uma data inválida
    Então o sistema deve exibir a mensagem "Data inválida"

### Validar o campo valor
Funcionalidade: Validar campo de valor
  Cenário: Tentar criar movimentação com valor inválido
    Dado que estou logado no sistema
    Quando eu tento criar uma movimentação com um valor inválido
    Então o sistema deve exibir a mensagem "Valor inválido"


## RESUMO MENSAL

### Utilizar filtros para exibir as movimentações criadas
Funcionalidade: Filtrar movimentações
  Cenário: Filtrar movimentações por mês e ano
    Dado que estou logado no sistema
    E existem movimentações cadastradas
    Quando eu aplico um filtro para o mês de "Março" e ano "2025"
    Então as movimentações de "Março/2025" devem ser exibidas

### Excluir uma movimentação
Funcionalidade: Excluir movimentação
  Cenário: Excluir uma movimentação existente
    Dado que estou logado no sistema
    E existe uma movimentação cadastrada
    Quando eu excluo essa movimentação
    Então o sistema deve exibir a mensagem "Movimentação removida com sucesso"


## LOGOUT

### Deslogar do sistema
Funcionalidade: Deslogar do sistema
  Cenário: Deslogar com sucesso
    Dado que estou logado no sistema
    Quando eu clico em "Sair"
    Então o sistema deve redirecionar para a página de login