# Projeto Desenvolvimento Web - Bimestre 2

## Instalação e Execução

Siga os passos abaixo para rodar o projeto localmente:

---

## ⚙️ Configuração da Aplicação

1. Clonar o repositório:

```sh
git clone https://github.com/luan-tavares/unifaat-2026-dw-project
```

2. Entrar na pasta do projeto:

```sh
cd unifaat-2026-dw-project
```

3. Instalar as dependências:

```sh
npm install
```

4. Copiar o arquivo `.env` (**escolha apenas um, dependendo do seu sistema**):

Linux / Mac:
```sh
cp .env.example .env
```

Windows (CMD):
```sh
copy .env.example .env
```

5. Editar o arquivo `.env` e definir as credenciais do banco e do RabbitMQ:

```env
POSTGRES_HOST=localhost
POSTGRES_DB=unifaat_dw
POSTGRES_PORT=6789
POSTGRES_USER=unifaat_user
POSTGRES_PASSWORD=123456

RABBITMQ_HOST=localhost
RABBITMQ_PORT=5672
RABBITMQ_USER=unifaat
RABBITMQ_PASSWORD=123456

JWT_SECRET=segredo

NODE_WEB_PORT=3000
```

6. Executar as migrations obrigatoriamente antes de rodar a aplicação ou os comandos:

```sh
node _command.js migrate
```

> No ambiente Docker, use também `.env.docker` com `IS_DOCKER=true`.

---

## � Banco de Dados

### Executar Migrations

Após o banco estar pronto, execute as migrations:

```sh
node _command.js migrate
```

### Executar Seeds

```sh
node _command.js seed
```

### Reverter Última Migração

```sh
node _command.js migrate:rollback
```

---

## 🧠 Jobs e Fila RabbitMQ

### Criar um Job

Os jobs ficam em `app/Jobs/` e devem ser exportados usando `createJob({ name, handle })`.

Exemplo `app/Jobs/ExampleJob.js`:

```js
import { createJob } from '../../utils/job.js'

export default createJob({
    name: 'ExampleJob',
    handle: async (payload) => {
        const { name } = payload
        console.log(`Enviando e-mail de boas-vindas para o usuário ${name}`)
    }
})
```

### Despachar um Job para a Fila

Use o método `dispatch()` do job exportado. O job será enviado para a fila RabbitMQ especificada.

Exemplo:

```js
import ExampleJob from './app/Jobs/ExampleJob.js'

await ExampleJob.dispatch('default', { name: 'luan' })
```

### Executar o Worker

O worker lê jobs da fila RabbitMQ e executa o `handle(payload)` correspondente.

```sh
node _worker.js --queue=default
```

Se `--queue` não for informado, o worker usa a fila `default`.

---

## �🚀 Servidor Backend Node

Iniciar o servidor localmente:

```sh
node _web.js
```

O servidor estará disponível em: http://localhost:3000

---

## 🐳 Docker

Após configurar o `.env`, basta subir os containers:

```sh
docker compose up
```

A aplicação web ficará disponível em: http://localhost:8080

---

## 🔄 Comandos

O projeto usa `_command.js` para registrar comandos em `app/Commands/`.

Exemplo de comando de jobs:

```sh
node _command.js create-example-job
```

---

## 🔄 Nodemon (Opcional)

Para desenvolvimento com reload automático:

Global:
```sh
npm install -g nodemon
nodemon _web.js
```

Local:
```sh
npm install --save-dev nodemon
./node_modules/.bin/nodemon _web.js
```

---

## 🧭 Estrutura do Projeto

```
unifaat-2026-dw-project/
├── app/
│   ├── Commands/
│   │   ├── CreateExampleJobCommand.js
│   │   ├── ListTablesCommand.js
│   │   ├── MigrationCommand.js
│   │   ├── MigrationRollbackCommand.js
│   │   ├── SeedCommand.js
│   │   └── TestCommand.js
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── AddressApi/
│   │   │   │   ├── CreateAddressController.js
│   │   │   │   ├── DeleteAddressController.js
│   │   │   │   ├── GetAddressController.js
│   │   │   │   ├── ListAddressController.js
│   │   │   │   └── UpdateAddressController.js
│   │   │   ├── CourseApi/
│   │   │   │   ├── CreateCourseController.js
│   │   │   │   ├── DeleteCourseController.js
│   │   │   │   ├── GetCourseController.js
│   │   │   │   ├── ListCourseController.js
│   │   │   │   └── UpdateCourseController.js
│   │   │   ├── UserApi/
│   │   │   │   ├── AddCourseController.js
│   │   │   │   ├── CreateUserController.js
│   │   │   │   ├── DeleteUserController.js
│   │   │   │   ├── GetUserController.js
│   │   │   │   ├── ListUserController.js
│   │   │   │   ├── UploadImageController.js
│   │   │   │   └── UpdateUserController.js
│   │   │   ├── Queries/
│   │   │   │   ├── AddressApi/
│   │   │   │   └── UserApi/
│   │   │   ├── GetFileController.js
│   │   │   ├── ListFilesController.js
│   │   │   ├── LoginController.js
│   │   │   └── Return404Controller.js
│   │   ├── Middlewares/
│   │   │   ├── AuthMiddleware.js
│   │   │   └── VerifyImageMiddleware.js
│   │   ├── SwaggerDoc.js
│   ├── Jobs/
│   │   └── ExampleJob.js
│   └── Models/
│       ├── AddressModel.js
│       ├── CourseModel.js
│       ├── CourseUserModel.js
│       └── UserModel.js
├── bootstrap/
│   ├── app.js
│   └── config.js
├── database/
│   ├── connections/
│   │   ├── postgres.js
│   │   ├── rabbit.js
│   │   └── sequelize.js
│   ├── migrations/
│   │   ├── 001_create_users_table.js
│   │   ├── 002_create_addresses_table.js
│   │   ├── 003_create_courses_table.js
│   │   └── 004_create_course_user_table.js
│   ├── seeds/
│   │   └── initialSeed.js
│   └── relations.js
├── docker/
│   ├── nginx/
│   │   ├── Dockerfile
│   │   └── default.conf
│   ├── node-command/
│   │   └── Dockerfile
│   ├── node-web/
│   │   └── Dockerfile
│   ├── node-worker/
│   │   └── Dockerfile
│   └── postgres/
│       └── init/
│           ├── 001-migrations.sql
│           ├── 002-addresses.sql
│           ├── 003-courses.sql
│           └── 004-users-courses.sql
├── docs/
│   ├── Address.json
│   ├── Login.json
│   └── User.json
├── public/
│   ├── 404.html
│   └── teste.css
├── routes/
│   ├── router.js
│   └── apis/
│       ├── addressRouter.js
│       ├── courseRouter.js
│       └── userRouter.js
├── storage/
│   ├── logs/
│   ├── users/
│   └── arquivo.txt
├── tests/
│   └── example.test.js
├── utils/
│   ├── job.js
│   ├── loadCommands.js
│   ├── loadJobs.js
│   └── migrationUtils.js
├── _command.js
├── _web.js
├── _worker.js
├── docker-compose.yml
├── insomnia.json
├── package.json
├── package-lock.json
├── readme.md
├── .env
├── .env.example
├── .env.docker
├── .gitignore
└── command, web (binários)
```

### Descrição das Pastas

- **`app/`** - Regras de negócio da aplicação
  - **`Commands/`** - Comandos CLI (migrations, seeds, etc)
  - **`Http/Controllers/`** - Controllers que tratam as rotas HTTP
  - **`Http/Middlewares/`** - Middlewares de autenticação e validação
  - **`Models/`** - Modelos Sequelize para ORM

- **`bootstrap/`** - Inicialização da aplicação
  
- **`database/`** - Banco de dados
  - **`connections/`** - Conexões com Postgres e Sequelize
  - **`migrations/`** - Scripts de criação de tabelas (versionados)
  - **`seeds/`** - Scripts de população inicial do banco

- **`docker/`** - Configurações Docker
  - **`postgres/init/`** - Scripts SQL de inicialização

- **`routes/`** - Definição de rotas HTTP

- **`storage/`** - Armazenamento de arquivos enviados

- **`tests/`** - Testes automatizados usando assert nativo

- **`utils/`** - Funções utilitárias


---

## 📦 Containers Docker

| Container              | Host              | Porta Interna | Porta Externa (localhost) |
|------------------------|-------------------|---------------|---------------------------|
| postgres-container     | postgres_host     | 5432          | 6789                      |
| rabbitmq-container     | rabbitmq_host     | 5672          | 5672                      |
| nodeweb-container      | nodeweb_host      | 3000          | -                         |
| nodecommand-container  | nodecommand_host  | -             | -                         |
| nodeworker-container   | nodeworker_host   | -             | -                         |
| nginx-container        | nginx-container   | 80            | 8080                      |

### Executar Commands no Docker

Para executar um comando dentro do container (ex: migrate):

```sh
docker compose exec nodeweb-container node _command.js migrate
```

Ou sem precisar parar os containers (efêmero):

```sh
docker compose run --rm nodeweb-container node _command.js seed
```

---

## 📝 Tutorial: Criando um Command CLI

### Como Criar um Novo Command

1. **Crie o arquivo do comando** em `app/Commands/`:

```javascript
// app/Commands/MyCustomCommand.js

export default {
    name: 'my-command',
    description: 'Descrição do que o comando faz',
    
    // Opcional: aliases para atalhos
    alias: 'mc',
    
    // Opcional: opções do comando
    options: [
        ['-f, --force', 'Força a execução'],
        ['-v, --verbose', 'Modo verboso']
    ],

    async handle(options) {
        try {
            console.log('Executando meu comando...');
            
            if (options.force) {
                console.log('Modo force ativado!');
            }
            
            console.log('Comando concluído com sucesso.');
        } catch (error) {
            console.error('Erro:', error.message);
            process.exit(1);
        }
    }
}
```

2. **Pronto!** O comando será carregado automaticamente pelo `loadCommands.js`.

### Como Executar um Command

**Na máquina local:**

```sh
# Execução básica
node _command.js my-command

# Com alias
node _command.js mc

# Com opções
node _command.js my-command --force --verbose
```

**Dentro do Docker (efêmero):**

```sh
docker compose run --rm nodeweb-container node _command.js my-command
```

**Dentro do Docker (persistente):**

```sh
docker compose exec nodeweb-container node _command.js my-command
```

### Exemplo: Command com Banco de Dados

```javascript
// app/Commands/MyDatabaseCommand.js

import postgres from '../../database/connections/postgres.js';

export default {
    name: 'db:info',
    description: 'Mostra informações do banco de dados',

    async handle() {
        try {
            console.log('Conectando ao banco...');
            
            // Executar query
            const result = await postgres.query('SELECT version()');
            console.log('Versão do PostgreSQL:', result.rows[0].version);
            
            // Contar usuários
            const users = await postgres.query('SELECT COUNT(*) as total FROM users');
            console.log('Total de usuários:', users.rows[0].total);
            
        } catch (error) {
            console.error('Erro:', error.message);
            process.exit(1);
        } finally {
            await postgres.close();
        }
    }
}
```

### Commands Disponíveis

| Comando | Alias | Descrição |
|---------|-------|-----------|
| `migrate` | - | Executa migrations pendentes |
| `migrate:rollback` | - | Desfaz o último batch de migrations |
| `seed` | - | Popula o banco com dados iniciais |
| `test` | - | Executa testes |


