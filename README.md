# Repylon - Integração Shopify Simplificada

Este é um projeto Next.js que demonstra a integração com Google e Shopify, além de funcionalidades de processamento de email.

## Requisitos

- Node.js 18.0.0 ou superior
- npm ou yarn

## Instalação

1. Clone este repositório
2. Instale as dependências:

```bash
npm install
# ou
yarn install
```

3. Configure as variáveis de ambiente:

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

```
GOOGLE_CLIENT_ID=seu_client_id_do_google
GOOGLE_CLIENT_SECRET=seu_client_secret_do_google
SHOPIFY_API_KEY=sua_api_key_da_shopify
SHOPIFY_API_SECRET=seu_api_secret_da_shopify
NEXTAUTH_SECRET=uma_string_aleatoria_segura
NEXTAUTH_URL=http://localhost:3000
```

## Desenvolvimento

Para iniciar o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
```

Acesse [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

## Funcionalidades

- **Autenticação Google**: Login e integração com a conta Google
- **Autenticação Shopify**: Conexão com lojas Shopify
- **Processamento de Email**: Envio de emails de boas-vindas e notificações

## Estrutura do Projeto

- `/src/app`: Páginas e componentes da aplicação
- `/src/lib`: Bibliotecas e utilitários
  - `/src/lib/google`: Integração com Google
  - `/src/lib/shopify`: Integração com Shopify
- `/src/core`: Lógica de negócio
  - `/src/core/emailProcessor.ts`: Processador de emails

## Deploy na Vercel

Este projeto está configurado para deploy na Vercel. Ao fazer o deploy, configure as mesmas variáveis de ambiente mencionadas acima nas configurações do projeto na Vercel.

## Licença

MIT
