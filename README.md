# Como configurar sua aplicação ?

## Configuração da aplicação Discord
1. Acesse o [Discord Developer Portal](https://discord.com/developers/applications)
2. Crie uma nova aplicação
3. Na aba "OAuth2", adicione a URL de redirecionamento `http://localhost:5173/auth/callback`
4. Copie o CLIENT ID e o CLIENT SECRET e adicione no arquivo `.env` na raiz do projeto

#####  P.S: Sua aplicação deve precisa ter essa rota configurada para receber o token de autenticação

## Configuração do ambiente
1. Instale o [Node.js](https://nodejs.org/en/download/)
2. Instale o [Yarn](https://yarnpkg.com/getting-started/install) ou [NPM](https://www.npmjs.com/get-npm)
3. Clone o repositório e acesse a pasta do projeto via terminal
4. Execute o comando `yarn` ou `npm install` para instalar as dependências
5. Execute o comando `yarn run dev` ou `npm run dev` para iniciar o servidor

# Dê deploy e seja feliz. 

