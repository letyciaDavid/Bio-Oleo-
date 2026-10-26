# BioÓleo Digital — Plataforma de Gestão Ambiental
> **Módulo de Frontend: Telas de Login e Cadastro**  
> **Instituição:** Faculdade de Tecnologia — ADS  
> **Projeto:** Bio Óleo Cianorte — Plataforma de Logística Reversa de Óleo Vegetal Usado  
> **Responsável pelo Frontend:** Letycia dos Santos David (RA: 60007125)  
> **Responsável pelo Backend e Banco de Dados:** Gabriel da Costa Peres (RA: 60005556)  

---

## 1. Visão Geral do Módulo

Este repositório contém a implementação do frontend das telas de **Login** e **Cadastro** da plataforma **BioÓleo Digital**. A interface foi desenvolvida seguindo rigorosamente a identidade visual e os protótipos em alta fidelidade definidos no documento de especificação do projeto acadêmico.

A plataforma atende estabelecimentos geradores de óleo vegetal residual (restaurantes, condomínios, escolas e comércios), permitindo futuramente a solicitação de coletas, controle de bombonas, extrato de pontos e emissão de certificados ambientais.

---

## 2. Estrutura de Arquivos

```text
Nova pasta/
│
├── login.html             # Tela de Login (HTML puro + semântico)
├── cadastro.html          # Tela de Cadastro (HTML puro + semântico)
├── index.html             # Redirecionador HTML para login.html
│
├── css/
│   └── style.css          # Folha de estilos CSS (classes intuitivas em português, responsivo)
│
├── img/
│   ├── hero_photo.png     # Imagem oficial de herói visual (reciclagem e folhagem)
│   ├── login_hero.png     # Imagem alternativa
│   ├── logo.png           # Logotipo da folha/gota BioÓleo
│   └── logo_badge.png     # Badge institucional
│
└── README.md              # Documentação acadêmica e guia de integração
```

---

## 3. Identidade Visual e Tecnologias

- **HTML5 Semântico:** Estrutura limpa usando `<main>`, `<section>`, `<aside>`, `<header>`, `<footer>`, com tags e atributos semânticos, sem scripts JavaScript.
- **CSS3 Puro (Vanilla):** Nomes de classes simplificados e em português (ex: `.container-login`, `.painel-lateral`, `.campo-com-icone`, `.input-texto`), organizados por seções, com variáveis `:root`, Flexbox, CSS Grid, cantos arredondados e responsividade completa.
  - **Paleta de Cores:**
    - Verde BioÓleo Primário: `#0E5B38` (com gradientes `#072A19` a `#127A4B`)
    - Verde Folha Claro: `#34D399` / `#10B981`
    - Dourado/Âmbar (Óleo): `#D97706`
    - Superfícies Neutras: `#EEF3F0` (fundo) e `#FFFFFF` (cards)
- **Ícones SVG Nativos:** Renderizados via SVG inline e otimizados, sem dependência de bibliotecas externas.

---

## 4. O que está Implementado e Funcionando

### 4.1 Tela de Login (`login.php` / `login.html`)
- [x] Herói institucional com imagem oficial da plataforma e pilares da BioÓleo Cianorte.
- [x] Título e mensagem de boas-vindas (*"Bem-vindo! Faça login para continuar."*).
- [x] Campo para **E-mail ou Telefone** com validação de formato.
- [x] Campo de **Senha** com botão interativo para **mostrar ou ocultar** (troca dinâmica de ícone de olho).
- [x] Opção *"Lembrar de mim"* e link amigável *"Esqueceu sua senha?"*.
- [x] Botão de ação principal *"Entrar"* com feedback de hover e clique.
- [x] Divisor estético e botões de acesso social (*Entrar com Google* e *Entrar com Facebook*) fiéis ao protótipo.
- [x] Link funcional de navegação direta para a tela de **Cadastro** (*"Ainda não tem uma conta? Criar conta"*).
- [x] Validação em tempo real (no evento `input` e `blur`) e validação geral no `submit`.
- [x] Caixa de mensagens de alerta (`#alertBox`) para erros e avisos de status.

### 4.2 Tela de Cadastro (`cadastro.php` / `cadastro.html`)
- [x] Botão no topo *"← Voltar ao login"* para fácil navegação.
- [x] Campo **Nome completo** (com validação de tamanho mínimo e presença de sobrenome).
- [x] Campo **E-mail** (com validação estrita de formato via expressão regular).
- [x] Campo **Telefone** com **máscara automática** no formato brasileiro `(99) 99999-9999`.
- [x] Campo **Tipo de perfil** (alinhado à tabela `Usuario.tipo` do DER: *Restaurante, Condomínio, Escola, Empresa, Residencial*).
- [x] Campo **Senha** com botão de **mostrar/ocultar** e medidor visual de força da senha (*Fraca, Média, Forte*).
- [x] Campo **Confirmar senha** com botão de **mostrar/ocultar** e checagem de igualdade em tempo real.
- [x] Botão principal *"Cadastrar"*.
- [x] Link de navegação de retorno (*"Já tem uma conta? Entrar"*).
- [x] **Interface Limpa e Segura:** O formulário não simula autenticação ou registro fictício enquanto a integração com o banco de dados não estiver configurada no backend, exibindo apenas validações de preenchimento para o usuário.

### 4.3 Navegação e Responsividade
- [x] Navegação bidirecional testada: **Login ↔ Cadastro**.
- [x] Layout desktop split-screen em 2 colunas com banner institucional à esquerda e formulário à direita.
- [x] Layout responsivo para dispositivos móveis (formato Mobile-First / PWA) com cards adaptados e excelente usabilidade ao toque.

---

## 5. O que Depende do Backend (Gabriel Peres)

Conforme a divisão de responsabilidades da equipe acadêmica, as seguintes tarefas cabem à etapa de backend:
1. **Conexão com o Banco de Dados MySQL:** Script de conexão PDO (`conexao.php`) utilizando o schema definido no DER (`id_usuario`, `nome`, `email`, `senha`, `tipo`).
2. **Processamento do Cadastro (`POST` em `cadastro.php`):**
   - Receber os campos via `$_POST['nome']`, `$_POST['email']`, `$_POST['telefone']`, `$_POST['tipo']`, `$_POST['senha']`.
   - Gerar o hash seguro da senha via `password_hash($senha, PASSWORD_DEFAULT)`.
   - Verificar se o e-mail já existe na base de dados (`SELECT id_usuario FROM Usuario WHERE email = ?`).
   - Inserir o novo usuário na tabela `Usuario`.
3. **Processamento da Autenticação (`POST` em `login.php`):**
   - Consultar o usuário por e-mail no banco.
   - Validar o hash com `password_verify($senhaDigitada, $hashBanco)`.
   - Iniciar a sessão PHP com `session_start()` e armazenar os dados de sessão (`$_SESSION['usuario_id']`, etc.).
   - Redirecionar para a tela interna do sistema (Dashboard/Início) combinada com os outros integrantes.
4. **Recuperação de Senha:** Envio de e-mail com token temporário caso o usuário solicite.

---

## 6. Como Abrir e Executar as Páginas

Você pode executar o frontend de três maneiras simples:

### Opção A — Pré-visualização Imediata no Navegador (Sem servidor)
1. Dê dois cliques no arquivo `login.html` ou `cadastro.html`.
2. A página abrirá instantaneamente no seu navegador padrão (Google Chrome, Microsoft Edge, Firefox, etc.).
3. A navegação entre os links funcionará perfeitamente.

### Opção B — Servidor Local Embutido com Python (Recomendado para testes)
Na pasta do projeto, abra o terminal e digite:
```bash
python -m http.server 8000
```
Em seguida, abra o navegador e acesse:
```text
http://localhost:8000/login.html
```

### Opção C — Ambiente PHP / XAMPP (Para o Gabriel integrar com MySQL)
1. Copie a pasta deste projeto para a pasta `htdocs` do XAMPP (ex: `C:\xampp\htdocs\biooleo`).
2. Inicie os módulos **Apache** e **MySQL** no painel do XAMPP.
3. Abra no navegador:
```text
http://localhost/biooleo/login.php
```

---

## 7. Guia de Testes Realizados

Para assegurar a qualidade da entrega, os seguintes cenários foram testados:
1. **Campos Vazios:** Clicar em *"Entrar"* ou *"Cadastrar"* sem preencher dados gera alertas visuais e bordas vermelhas nos campos obrigatórios.
2. **Validação de E-mail:** Inserir um texto sem `@` ou sem domínio (ex: `usuario@`) exibe a mensagem de formato incorreto.
3. **Correspondência de Senha:** Digitar senhas divergentes na tela de cadastro exibe aviso imediato de que as senhas não coincidem.
4. **Máscara de Telefone:** Digitar apenas números aplica a formatação automática `(XX) XXXXX-XXXX`.
5. **Mostrar / Ocultar Senha:** Clicar no ícone de olho revela os caracteres digitados e altera o ícone correspondente.
6. **Navegação:** Clicar em *"Criar conta"* na tela de login abre a tela de cadastro, e clicar em *"Voltar ao login"* ou *"Entrar"* retorna para a tela de login.
7. **Redimensionamento:** Reduzir a largura da janela para simular celular adapta o layout para o formato mobile vertical sem quebras visuais.
