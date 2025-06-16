# Kanban - Aplicação Laravel + PostgreSQL

Este projeto é uma aplicação de gerenciamento de tarefas estilo **Kanban**, desenvolvida com **Laravel**, utilizando **PostgreSQL** como banco de dados e **Vite** para build dos assets frontend.

---

## Requisitos

Antes de começar, certifique-se de ter os seguintes requisitos instalados na sua máquina:

- **PHP >= 8.3**
- **Composer**
- **PostgreSQL**
- **Node.js** (versão mais recente) e **npm**

---

## Configuração Inicial

### Criar o banco de dados

No PostgreSQL, crie manualmente um banco de dados com o nome:

```
kanban
```

---

### Clonar o repositório

```bash
git clone https://github.com/r-andomguy/kanban-app
cd kanban
```

---

### Configurar o arquivo `.env`

Copie o arquivo de exemplo `.env.example` para um novo `.env`:

```bash
cp .env.example .env
```

Edite o arquivo `.env` e configure os dados do banco de dados conforme abaixo:

```
DB_CONNECTION=pgsql
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=kanban
DB_USERNAME=postgres
DB_PASSWORD=sua_senha
```

---

### Instalar as dependências PHP

```bash
composer install
```

---

### . Gerar a chave da aplicação

```bash
php artisan key:generate
```

---

### Rodar as migrações

```bash
php artisan migrate
```

Isso irá criar as tabelas necessárias no banco de dados.

---

## Configuração do Frontend (Vite)

### Inicializar o npm

Se ainda não houver um `package.json`, inicialize com:

```bash
npm init -y
```

---

### Instalar as dependências do frontend

```bash
npm install
```

---

### Rodar o servidor Vite

```bash
npm run start
```

---

## Rodar o servidor Laravel

No terminal, execute:

```bash
php artisan serve
```

O backend estará disponível em:  
[http://127.0.0.1:8000](http://127.0.0.1:8000)

---

## Estrutura Esperada

```
kanban/
├── app/
├── bootstrap/
├── config/
├── database/
├── public/
├── resources/
├── routes/
├── storage/
├── tests/
├── .env
├── composer.json
├── package.json
├── vite.config.js
└── ...
```

---

## Documentação da API (via Postman)
https://documenter.getpostman.com/view/34780718/2sB2x6nCS3

## Tecnologias Utilizadas

- **Laravel 11**
- **PostgreSQL**
- **PHP 8.3**
- **Composer**
- **Node.js / npm**
- **Vite**

---

## Autor

Bruno Coelho Ribas
