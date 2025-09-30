# Projeto de Integração de Sistemas: Produtores Locais & Consumidores

**Equipe:**
* Felipe Paixão Lima - 2323781
* Rafael Levi Dias Vasconcelos Ponte – 2318845
* Vitor Regison Lima Machado - 2323779
* Alexandre de Oliveira da Costa - 2323780
* Elton Vasconcelos Sales de Castro Braga – 2222925

---

## 1. Objetivo do Trabalho

Este projeto tem como objetivo desenvolver uma API que integre, no mínimo, dois sistemas distintos (o Painel do Consumidor e o Painel do Produtor) para a troca de informações de pedidos. A atividade visa aplicar conceitos de **APIs REST**, protocolos de comunicação (HTTP), tratamento de erros e documentação técnica em um contexto prático.

## 2. Descrição Funcional da Solução

A solução implementa uma plataforma de conexão entre **Produtores Locais e Consumidores**, facilitando o comércio direto e a gestão de pedidos.

### **Fluxo de Trabalho:**
1.  **Consumidor:** Acessa o catálogo, cria um novo pedido (`POST /orders`) e acompanha o status do pedido em um painel Kanban, podendo **excluir** o pedido caso ele ainda esteja **Pendente** (`DELETE /orders/:id`).
2.  **Produtor:** Acessa um painel Kanban que lista todos os pedidos. Ele pode gerenciar o fluxo de produção, alterando o status dos pedidos para *Em Andamento* ou *Finalizado* (`PATCH /orders/:id`) ou recusando-os (`PATCH /orders/:id/recuse`).
3.  **API Central:** Atua como o ponto de comunicação, roteando e processando as solicitações de ambos os sistemas e interagindo com o banco de dados.

### **Relevância Social (ODS 11)**

O projeto se relaciona com o **Objetivo de Desenvolvimento Sustentável (ODS) 11: Cidades e Comunidades Sustentáveis**. Ao facilitar a conexão entre pequenos produtores da região metropolitana e consumidores locais, a plataforma incentiva a economia local, reduz intermediários e promove cadeias de suprimentos mais curtas e resilientes nas comunidades.

## 3. Arquitetura da API e Diagrama

O diagrama de arquitetura completo pode ser visualizado no arquivo **`docs/architecture.md`**.

A solução utiliza uma **Arquitetura de Três Camadas (3-Tier Architecture)**:
1.  **Apresentação (Frontends):** Painel do Consumidor e Painel do Produtor (desenvolvidos em React/Vite).
2.  **Lógica de Negócios (API Central):** Desenvolvida em Node.js/Express, responsável por toda a lógica de pedidos e status.
3.  **Dados (Database):** Camada de persistência para armazenar produtos e pedidos.

---

## 4. Instruções Detalhadas para Execução

### Pré-requisitos
* Node.js e npm instalados.
* Instância de Banco de Dados rodando e configurada na API.

### Execução da API (Backend)
1.  Clone o repositório.
2.  Navegue até a pasta raiz da API e instale as dependências: `npm install`.
3.  Configure as variáveis de ambiente (conexão com o banco de dados).
4.  Inicie o servidor: `npm start` (ou `npm run dev`).
5.  A API estará rodando em `http://localhost:[PORTA]`.

### Execução dos Frontends (Consumidor e Produtor)
Cada frontend possui sua própria pasta:
1.  Navegue até a pasta de cada frontend (`consumer-app/` e `producer-app/`).
2.  Instale as dependências: `npm install`.
3.  Inicie a aplicação: `npm run dev`.

### Instruções para Teste via Postman/Insomnia
Uma coleção completa de testes está disponível na pasta `postman/`.

1.  Importe o arquivo **`postman/collection.json`** no seu cliente REST (Insomnia/Postman).
2.  Defina a URL base como uma variável de ambiente (ex: `http://localhost:3000`).
3.  Siga os testes sequenciais para criar um pedido (`POST`), listar (`GET`), alterar status (`PATCH`) e tentar excluir (`DELETE`).

---

## 5. Documentação das Rotas da API (REST)

### 5.1. Rotas de Pedidos (`/orders`)

| Método | Endpoint | Descrição Funcional |
| :---: | :--- | :--- |
| **GET** | `/orders` | **Lista todos os pedidos** registrados no sistema. |
| **POST** | `/orders` | **Cria um novo pedido** (utilizado pelo Consumidor). |
| **DELETE**| `/orders/:id`| **Exclui um pedido** específico pelo ID (permitido apenas para status Pendente). |
| **PATCH** | `/orders/:id` | **Avança o status** do pedido (utilizado pelo Produtor). |
| **PATCH** | `/orders/:id/recuse`| **Define o status do pedido como Recusado** (utilizado pelo Produtor). |
| **PUT** | `/orders/:id` | **Atualiza completamente** os dados de um pedido existente (se status for Pendente). |

### 5.2. Rotas de Produtos (`/products`)

| Método | Endpoint | Descrição Funcional |
| :---: | :--- | :--- |
| **GET** | `/products` | **Lista todos os produtos** disponíveis no catálogo. |

### 5.3. Códigos de Status (Campo `status`)

| Status ID | Label | Fluxo |
| :---: | :--- | :--- |
| **1** | PENDENTE | Criação do Consumidor $\to$ Aprovação do Produtor. |
| **2** | EM ANDAMENTO | Pedido em produção. |
| **3** | FINALIZADO | Pedido concluído e entregue. |
| **4** | RECUSADO | Pedido rejeitado pelo Produtor. |