# 📚 Documentação de Rotas da API REST

Esta API foi desenvolvida para integrar dois sistemas distintos (Consumidor e Produtor) no fluxo de pedidos, seguindo os requisitos de projeto[cite: 17, 22]. A comunicação utiliza o protocolo **REST/HTTP** [cite: 24] e troca dados em formato JSON.

## 1. Rotas de Pedidos (`/orders`)

Gerenciam a criação, consulta, exclusão e alteração de status dos pedidos.

| Método | Endpoint | Descrição Funcional | Middleware |
| :---: | :--- | :--- | :--- |
| **GET** | `/orders` | **Lista todos os pedidos** registrados no sistema. Utilizado pelo Produtor (painel Kanban) e pelo Consumidor (acompanhamento). | N/A |
| **POST** | `/orders` | **Cria um novo pedido** no sistema. Rota utilizada pelo **Consumidor** ao finalizar a compra. | `validateOrderCreation` |
| **DELETE**| `/orders/:id`| **Exclui um pedido** específico pelo ID. Permitido apenas para o **Consumidor** se o pedido estiver no status **Pendente** (Status ID 1). | N/A |
| **PATCH** | `/orders/:id` | **Avança o status** do pedido (ex: Pendente $\to$ Em Andamento; Em Andamento $\to$ Finalizado). Rota principal usada pelo **Produtor** no fluxo Kanban. | N/A |
| **PATCH** | `/orders/:id/recuse`| **Define o status do pedido como Recusado**. Rota utilizada pelo **Produtor**. | N/A |
| **PUT** | `/orders/:id` | **Atualiza completamente** os dados de um pedido existente pelo ID. | `validateFieldProduct` |

### **Modelo de Corpo (Body) para POST /orders**

| Campo | Tipo | Obrigatório | Descrição |
| :--- | :--- | :--- | :--- |
| `product` | String/Int | Sim | ID do produto. |
| `count` | String/Int | Sim | Quantidade do produto. |
| `total` | String/Decimal | Sim | Valor total do pedido. |
| `adress_delivery` | String | Sim | Endereço completo para a entrega. |
| `date_delivery` | Date | Sim | Data planejada para a entrega. |

**Exemplo de Requisição (POST/orders):**
```json
{
  "product": "P001",
  "count": "2",
  "total": "45.90",
  "adress_delivery": "Rua Principal, 123 - Aldeota",
  "date_delivery": "2025-10-20"
}