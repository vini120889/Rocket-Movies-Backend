<h1 align="center">RocketMovies Back-End</h1>

<div align="center">

  
</div>


## 🧐 Sobre <a name = "about_pt"></a>

Projeto Back-end com funcionalidades de cadastrar usuários e que possibilite adicionar notas sobre seus filmes favoritos, informando a sua nota ao filme e possíveis tags sobre ele.

## ⛏️ Tecnologias usadas <a name = "built_using_pt"></a>

- [NodeJs](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [SQLite](https://www.sqlite.org/index.html)
- [Knex](https://knexjs.org)
- [JWT](https://jwt.io)
- [Cookies](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Cookies)

## 🏁 Iniciando o projeto <a name = "getting_started_pt"></a>

Essas instruções vão te guiar sobre como ter uma cópia funcional do projeto na sua máquina local para desenvolvimento e testes.

### Pre-requisitos

Inicialmente você vai precisar de alguns programas instalados para que consiga fazer uso:

- [Visual Studio Code](https://code.visualstudio.com) - Editor de código
- [Node.js + npm](https://nodejs.org/en) - Versão LTS recomendada
- [Beekeeper Studio](https://www.beekeeperstudio.io) - Sistema de gerenciamento de banco de dados


### Instalação

Um passo a passo de como realizar a instalação dos arquivos na sua máquina.

Primeiramente, faça o download, clone do repositório ou uma cópia dos arquivos para seu computador.

Abra os arquivos com o VSCODE e abra o terminal do editor através do comando CTRL + ' ou por meio da barra de ferramentas.

Em seguida, no terminal, execute a seguinte linha de comando:

```
npm install
```
Esse comando irá instalar todas as dependências necessárias para que consiga realizar os testes.

Em seguida, execute uma das duas linhas de comando a seguir para iniciar o servidor local: 

```
npm run dev
```

Por fim, execute a seguinte linha de código:

```
npm run migrate
```

Esse código irá executar as migrations presentes no código necessárias para criar as tabelas de notas e tags dentro do banco de dados que foi criado automaticamente.

## 🔧 Testes <a name = "tests_pt"></a>

Foram criados três testes para essa aplicação utilizando o JEST.

Os testes incluem criação de usuário, criar usuários com um email que já existe e de atualização de usuário.

Para os testes, foi utilizada a técnica de utilização de um banco de dados em memória com o objetivo de evitar a utilização do banco de dados real.

Para iniciar os testes, no terminal, digite o seguinte comando:
```
npm run test
```















