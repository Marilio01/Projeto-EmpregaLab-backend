
# EmpregaLab - Backend

Este repositório contém o backend da aplicação **EmpregaLab**, uma plataforma voltada para o desenvolvimento de **soft skills** e empregabilidade.
O sistema oferece uma API RESTful desenvolvida em **NestJS** para gerenciamento de usuários, autenticação, endereços e consulta de CEP.

---

## 💻 Front-end

Este backend pode ser consumido por um front-end (por exemplo em Angular ou outra tecnologia) responsável pela interface com o usuário.
Caso exista um front-end específico do projeto, você pode referenciá-lo aqui:

```
URL_DO_FRONTEND_AQUI
```

---

## ⚙️ Principais Funcionalidades

O sistema foi desenvolvido com foco em **usuários, autenticação e endereços**, sendo a base para futuras funcionalidades voltadas a soft skills.

* **Autenticação e Usuários**

  * Cadastro de novos usuários
  * Login com JWT (JSON Web Token)
  * Atualização de dados do usuário

* **Consulta de CEP**

  * Integração com ViaCEP para consulta automática de endereço

* **Gerenciamento de Endereços**

  * Cadastro e atualização de endereço vinculado ao usuário

> ⚠️ Este projeto **não contém módulos de produtos, pedidos ou pagamentos** — apenas o essencial para autenticação, usuário, CEP e endereço.

---

## ✨ Tecnologias e Arquitetura

* **Framework:** NestJS (Node.js + TypeScript)
* **Linguagem:** TypeScript
* **Banco de Dados:** PostgreSQL
* **ORM:** TypeORM (com suporte a migrações)
* **Arquitetura Modular:** `AuthModule`, `UserModule`, `AddressModule`, `CepModule`
* **Validação:** DTOs com `class-validator` e `class-transformer`

---

## 🚀 Como Executar o Projeto

### 📌 Pré-requisitos

* Node.js (>= 20.11)
* PostgreSQL em execução

### 📥 1. Clonar o projeto

```bash
git clone URL_DO_SEU_REPOSITORIO_AQU.git
cd empregalab-backend
npm install
```

### ⚙️ 2. Configurar variáveis de ambiente

Crie um arquivo **.env.development.local** na raiz do projeto:

```env
# Banco de Dados PostgreSQL
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=seu_usuario_do_banco
DB_PASSWORD=sua_senha_do_banco
DB_DATABASE=seu_banco_de_dados

# JWT
JWT_SECRET=sua_chave_secreta_para_jwt
JWT_EXPIRE_IN=7d

# ViaCEP
URL_CEP_CORREIOS=https://viacep.com.br/ws/{CEP}/json/

# Porta da API
PORT=8080
```

---

### ▶️ 3. Iniciar o servidor

#### Modo desenvolvimento (com watch):

```bash
npm run start:dev
```

#### Modo produção:

```bash
npm run build
npm run start:prod
```

---

## 🧪 Testes (se configurados)

```bash
npm run test          # executa todos
npm run test:watch    # modo watch
npm run test:cov      # cobertura de testes
```

---

## 🧩 Modelo de Dados (Visão Geral)

### **User**

| Campo     | Tipo   | Descrição           |
| --------- | ------ | ------------------- |
| id        | number | Identificador único |
| nome      | string | Nome do usuário     |
| email     | string | E-mail (único)      |
| senha     | string | Hash da senha       |
| createdAt | date   | Data de criação     |
| updatedAt | date   | Data de atualização |

### **Address**

| Campo       | Tipo   | Descrição              |
| ----------- | ------ | ---------------------- |
| id          | number | Identificador único    |
| userId      | number | Relacionado ao usuário |
| cep         | string | CEP                    |
| rua         | string | Logradouro             |
| numero      | string | Número                 |
| complemento | string | Opcional               |
| bairro      | string | Bairro                 |
| cidade      | string | Cidade                 |
| estado      | string | Estado                 |

---

## 📌 Consulta de CEP

A consulta é realizada usando a URL configurada no `.env`:

```
https://viacep.com.br/ws/{CEP}/json/
```

O sistema retorna os dados já estruturados, facilitando o cadastro do endereço.

