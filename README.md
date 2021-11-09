

# Desafio 1 do Ignite Trilha NodeJS

<img alt="Ignite" src="./assets/capa_ignite.png" />

<h3 align="center">
  Desafio 01: Conceitos do Node.js
</h3>
<p align="center">
	<img alt="GitHub top language" src="https://img.shields.io/github/languages/top/taohansens/Desafio01-Conceitos-do-Node.js?style=flat" />
	<a href="https://app.rocketseat.com.br/me/taohansens">
		<img alt="Rocketseat Account" src="https://img.shields.io/badge/taohansens-rocketseat-blueviolet" />
    </a>
    <img alt="License" src="https://img.shields.io/badge/license-MIT-%2304D361" />
</p>


<p align="center">
  <a href="#rocket-sobre-o-desafio">Sobre o desafio</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#keyboard-instalação-e-execução-do-projeto">Instalação e Execução do Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#rotas-da-aplicação">Rotas da aplicação</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#especificação-dos-testes">Específicação dos testes</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-licença">Licença</a>
</p>


## :rocket: Sobre o desafio

Nesse desafio foi criada uma aplicação backend para treinar o que aprendi até agora no Node.js.

É uma aplicação para gerenciar tarefas (em inglês *ToDos*). 

Nela, será permitida a criação de um usuário com os atributos `name` e `username` e as operações (CRUD: Create, Read, Update e Delete) envolvendo os *ToDos* 

- Criar um novo *ToDo*;
- Listar os *ToDos*;
- Alterar o `title` e `deadline` de um *ToDo* existente;
- Marcar um *ToDo* como concluído;
- Excluir um *ToDo*;

Tudo isso para cada usuário em específico (o `username` será passado pelo header).

## :keyboard: Instalação e Execução do Projeto

- Clone este repositório

```bash
> git clone https://github.com/taohansens/Desafio01-Conceitos-do-Node.js.git
```

- Navegue até o diretório raiz do projeto

```bash
> cd Desafio01-Conceitos-do-Node.js
```

- Instale as dependências com o Yarn

```bash
yarn
```

- Execute o projeto

```bash
yarn dev
```

## Rotas da aplicação

| GET `/users` |
| ------------ |

A rota deve receber `password` no body da requisição, com o valor "Ignite@", que irá retornar um array com todos os usuários cadastrados e seus respectivos ToDos.

````Json
{
    "password": "Ignite@"
}
````


| POST `/users` |
| ------------ |

A rota deve receber `name` e `username` dentro do body da requisição (JSON). Ao cadastrar um novo usuário, ele deve ser armazenado dentro de um objeto no seguinte formato:  

```json
{ 
	"name": "Tao Hansen", 
	"username": "taohansens"
}
```

A resposta dessa requisição será um objeto do tipo User com resposta HTTP 201 (Created).

```json
{
    "id": "7973135b-1c55-4aab-b540-0483fdbce093", //Gerado pela biblioteca uuid;
    "name": "Tao Hansen",
    "username": "taohansens",
    "todos": [] // Inicializa o vetor vazio dos ToDos.
}
```

| GET `/todos` |
| ------------ |

A rota deve receber, pelo header da requisição, uma propriedade `username` contendo o username do usuário e retornar uma lista com todas as tarefas desse usuário.

A resposta será um vetor com os ToDos do usuário que contém o mesmo username do header.

| POST `/todos` |
| ------------ |

A rota deve receber `title` e `deadline` dentro do body da requisição (JSON) e, uma propriedade `username` contendo o username do usuário dentro do header da requisição. 

Ao criar um novo *todo*, ele será armazenada dentro da lista `todos` do usuário que está criando essa tarefa. 

```json
{
    "title": "Lavar o banheiro",
    "deadline": "2021-11-08" // A data deverá ser incluída nessa formato. (YYYY-MM-DD)
}
```

E a resposta do servidor ao enviar a requisição, se for um usuário válido será um objeto do tipo ToDo com  resposta HTTP 201 (Created).

````json
{
    "id": "3009c173-772f-41b1-bc58-7259c5ccc671", // Gerado pela biblioteca uuid;
    "title": "Lavar o banheiro",
    "done": false, // Done sempre iniciará como False.
    "deadline": "2021-11-08T00:00:00.000Z",
    "created_at": "2021-11-09T01:50:19.545Z" // Momento da criação do ToDo.
}
````

Ou, se o username não existir, estendendo também a todas as outras rotas, retornará um json com o código HTTP 404 (Not Found):

````json
{
    "error": "User not found!"
}
````

| PUT `/todos/:id` |
| ------------ |

A rota deve receber, pelo header da requisição, uma propriedade `username` contendo o username do usuário e receber as propriedades `title` e `deadline` dentro do corpo. É preciso alterar **apenas** o `title` e o `deadline` da tarefa que possua o `id` igual ao `id` presente nos parâmetros da rota.

Como exemplo, o iddo ToDo acima será enviado na rota  */todos/3009c173-772f-41b1-bc58-7259c5ccc671*

O username no header, e o Body:

````json
{
    "title": "Tarefa Alterada",
    "deadline": "2022-11-08"
}
````

Como retorno o objeto alterado com a resposta HTTP 200 (OK).

````json
{
    "id": "3009c173-772f-41b1-bc58-7259c5ccc671",
    "title": "Tarefa Alterada",
    "done": false,
    "deadline": "2022-11-08",
    "created_at": "2021-11-09T01:50:19.545Z"
}
````

Em caso de não existir o ToDo, isso também para as demais rotas incluídas após essa,  será a resposta HTTP 404, e o Json com a mensagem de erro:

````json
{
    "error": "ToDo not found."
}
````

| PATCH `/todos/:id/done` |
| ------------ |

A rota deve receber, pelo header da requisição, uma propriedade `username` contendo o username do usuário e alterar a propriedade `done` para `true` no *todo* que possuir um `id` igual ao `id` presente nos parâmetros da rota.

O retorno será um objeto json com a resposta HTTP 200.

```````json
{
    "id": "3009c173-772f-41b1-bc58-7259c5ccc671",
    "title": "Tarefa Alterada",
    "done": true,
    "deadline": "2022-11-08",
    "created_at": "2021-11-09T01:50:19.545Z"
}
```````

| DELETE `/todos/:id` |
| ------------ |

A rota deve receber, pelo header da requisição, uma propriedade `username` contendo o username do usuário e excluir o *todo* que possuir um `id` igual ao `id` presente nos parâmetros da rota. A resposta não terá conteúdo, será apenas o HTTP 204.

Na pasta "Postman" contém uma Collection exportada com todas as requisições salvas.

## Especificação dos testes

Testes realizados utilizando o framework [Jest · Delightful JavaScript Testing](https://jestjs.io/pt-BR/).

Para completar o desafio, a aplicação foi aprovada nos seguintes testes:

![Tests](assets\tests-approved.png)

#### Testes de usuários

- **Should be able to create a new user**

- **Should not be able to create a new user when username already exists**

#### Testes de *ToDos*

- **Should be able to list all user's todos**

- **Should be able to create a new todo**

- **Should be able to update a todo**.

- **Should not be able to update a non existing todo**

- **Should be able to mark a todo as done**

- **Should not be able to mark a non existing todo as done**

- **Should be able to delete a todo**

- **Should not be able to delete a non existing todo**

## :memo: Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](https://github.com/git/git-scm.com/blob/master/MIT-LICENSE.txt) para mais detalhes.
