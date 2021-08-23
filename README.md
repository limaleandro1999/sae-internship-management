# SAE - Sistema de Acompanhamento de Estágios

## Arquitetura

A arquitetura do SAE é divida em duas partes: frontend e backend. No frontend temos uma aplicação desenvolvida utilizando React que é renderizada no lado do cliente. E no backend temos uma API REST construída utilizando Node.js e o framework NestJS. Além disso a aplicação utiliza um banco de dados PostgreSQL.
## Linguagens/Frameworks utilizados

O SAE foi desenvolvido utilizando tecnologias vindas do mundo Javascript. Como dito anteriormente, o frontend foi desenvolvido utilizado React sendo utilizado Javascript como linguagem. Além disso foi utilizado um framework chamado React Admin, que faz o gerenciamento de dados no lado do cliente e também provê uma UI.

No backend, foi utilzado Node.js e Typescript como linguagem. Também foi utilizado o framework NestJS que foi utilizado para auxilar no desenvolvimento da API Rest e na organização dos arquivos. Adicionalmente, foi utilizado o TypeORM para fazer a comunicação com o banco de dados e fazer o mapeamento das entidades com o banco

Links:

- [Node.js v12.18.4+](https://nodejs.org/en/)
- [NestJS](https://nestjs.com/)
- [TypeORM](https://typeorm.io/#/)
- [React](https://pt-br.reactjs.org/)
- [React Admin](https://marmelab.com/react-admin/)
- [React Router](https://reactrouter.com/)
- [Material UI](https://material-ui.com/)
## Requisitos para o desenvolvimento

Para o desenvolvimento é necessário instalar algumas ferramentas:

- [Node.js guia de instalação](https://www.treinaweb.com.br/blog/instalando-e-gerenciando-varias-versoes-do-node-js-com-nvm)
- [Yarn](https://classic.yarnpkg.com/en/docs/install/#windows-stable)
- [PostgreSQL](https://www.postgresql.org/download/)

Também é necessário criar dois arquivos `.env`, um no diretório `backend` e outro no diretório `frontend`. Neles existem dois arquivos [exemplo .env para frontend](frontend/.env.example) e [exemplo .env para backend](backend/.env.example)

## Sugestão de editor de código

- [Visual Studio Code](https://code.visualstudio.com/)
## Como rodar o projeto

Para rodar o projeto na sua máquina é necessário ter instalado as ferramentas listadas anteriormente. Feito isso, na primeira vez após fazer o clone do repositório é necessário instalar as dependências tanto do backend quanto do frontend. Para isso siga os seguintes passos:

```
$ cd backend/ ## entra no diretório do backend
$ yarn ## instala as dependências do backend

$ cd .. # volta para a raiz do projeto

$ cd frontend/ ## entra no diretório do frontend
$ yarn ## instala as dependências do frontend
```

Após instalar as dependências, você pode iniciar as aplicações. Primeiro inicie o backend, por padrão ele iniciará na porta 3000, mas caso queira mudar a porta basta setar a variável de ambiente `PORT` no arquivo `.env` do backend. Como rodar:

```
$ cd backend/ ## entra no diretório do backend
$ yarn start:dev ## inicializa o backend
```

Caso queria inicializar utilizando modo debug, rode:

```
$ cd backend/ ## entra no diretório do backend
$ yarn start:debug ## inicializa o backend
```

Após rodar o backend, é a hora de inicializar o frontend, para isso rode:

```
$ cd frontend/ ## entra no diretório do frontend
$ yarn start ## inicializa o frontend
```

Caso o backend ou algum outro processo esteja utilizando a porta 3000 o CLI perguntará se você quer utilizar outra porta para rodar o frontend

![Mensagem de porta já utilizada](https://drive.google.com/uc?export=view&id=1Oe8dZYd41xjrOodIgxQGsdcM-cmKCjfC)

Aperte a tecla "Y" e o CLI escolherá outra porta

## Formatar código

Para manter o padrão de código este projeto utiliza [eslint](https://eslint.org/) + [prettier](https://prettier.io/) para fazer isto. Tanto no backend quanto no fronent existe um comando para fazer o formatamento automático do código:

```
$ cd backend/ ## entra no diretório do backend
$ yarn format ## formata o código do backend
```

```
$ cd frontend/ ## entra no diretório do frontend
$ yarn format ## formata o código do frontend
```