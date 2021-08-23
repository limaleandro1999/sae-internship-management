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

## Templates de email/documento

No diretório do `backend` existe uma pasta chamada `templates` a qual armazena os templates utilizados nos e-mails e na geração de documentos `.docx`. Os templates do e-mail utilizam [handlebars](https://handlebarsjs.com/) e os templates para geração de documentos utilizam a biblioteca [docxtemplater](https://docxtemplater.com/).

## Armazenamento de arquivos

Até agora os arquivos de relatórios e documentos referentes ao processo de estágio são armazenados na pasta `/uploads` no backend. O upload de arquivos é feito utilizando uma das funcionalidades do NestJS. [Exemplo](https://docs.nestjs.com/techniques/file-upload). Para o futuro seria interessante mover esses arquivos para um servidor ou serviço próprio para arquivos como o [AWS S3](https://aws.amazon.com/pt/s3/).

## Ambiente de produção

Para o ambiente de produção foram escritos Dockerfiles para ambos [frontend](frontend/Dockerfile) e [backend](backend/Dockerfile) e um arquivo [docker-compose.yml](docker-compose.yml) que facilitam no processo de subir para produção já que o docker permite o uso de imagens que contém todas as dependências necessárias e processo de build de ambos os lados são feitos pelo docker utilizando Dockerfiles.

### Simular ambiente de produção na sua máquina

Para simular o ambiente de produção é necessário a instalação do docker e do docker-compose:

- [Docker](https://docs.docker.com/engine/install/)
- [Docker-compose](https://docs.docker.com/compose/install/)
  
Após isso é necessário criar dois arquivos na raiz do repositório: `.backend.env` e `.database.env`. O primeiro arquivo seta as variáveis de ambiente utilizadas pelo backend e o segundo especifica define as credenciais que serão utilizadas para criar um banco de dados no container do PostgreSQL. Na raiz do repositório existem os arquivos [.backend.env.example](.backend.env.example) e [.database.env.example](.database.env.example) que são exemplos dos arquivos citados.

Feito isso, para simular em sua máquina modifique a linha 21 do arquivo [docker-compose.yml](docker-compose.yml) para que ela aponte para o endereço local onde está rodando o servidor na sua máquina

![Arquivo docker-compose.yml](https://drive.google.com/uc?export=view&id=1X-Qb90Du9w8hXpYKW3jGvxZgsEkve7Nl)

Então, na raiz do repositório rode:
```
$ docker-compose up -d
```

Esse comando irá criar as imagens docker e iniciar os containers, dependendo da sua máquina esse processo pode demorar um pouco.

### Rodar o projeto em produção

Para rodar o projeto em produção faça os passos indicados na sessão anterior, exceto o de modificar o arquivo `docker-compose.yml`. Para o futuro seria interessante que fosse configurado um CI para fazer este processo automaticamente após alguma alteração ser mergeada em master.

## O sistema

O sistema é dividido em 3 módulos principais: setor de estágio, orientadores de estágio e estagiários. O primeiro é utilizado tanto pelos usuários do setor de estágio, quanto os administradores de campus e administradores. O usuário administrador tem como função manter os campus e criar usuários administradores de campus. O administrador de campus também pode criar outros administradores campus dentro do campus ao qual ele está alocado e também é responsável por criar usuários de setor de estágio. Este é responsável por manter as outras informações disponíveis no módulo: cursos, orientadores de estágio, empresas, estagiários e processos de estágios. Ao criar um registro de orientador de estágio ou de estagiário, um e-mail será enviado para o e-mail informado para que seja completado o cadastro.

O módulo de orientadores de estágio é utilizado pelo orientadores para fazer o acompanhamento dos seus estagiários, podendo acessar as informações dos alunos, horários de estágio e de aula, relatórios mensais e semestrais.

O módulo de estagiários é utilizado pelos alunos para pode visualizar informações dos prazos de entrega de suas tarefas e relatórios e também para entregá-los.