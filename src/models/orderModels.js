const connection = require("./connection")


const getAll = async () => {
    try {
        const [orders] = await connection.execute(`
            SELECT t1.id, t1.quantidade, t1.valor, t1.local_entrega, t1.data_criacao, t1.data_entrega, t1.obs, t1.status, t2.nome_produto AS produto, t3.abreviacao  
            FROM pedidos AS t1
            JOIN produtos AS t2 ON t1.produto = t2.id
            JOIN unidades_vendas AS t3 ON t2.unidade_venda = t3.id
            `);
        return orders;
        		
    } catch (error) {
        return { status: 500, message: "Problemas internos ao buscar os pedidos." };
    }
};

const createOrder = async (order) => {
    try {
        
        const { product, count, total, adress_delivery, date_delivery} = order;

        const [createdOrder] = await connection.execute(
            "INSERT INTO pedidos(produto, quantidade, valor, local_entrega, data_entrega, status) value(?, ?, ?, ?, ?, ?)",
            [product, count, total, adress_delivery, date_delivery, '1'] // '1' = Pendente
        );

        return {insertId: createdOrder.insertId};
    } catch (error) {
        return { status: 500, message: "Problemas ao inserir um novo pedido." };
    }
};

const deleteOrder = async (id) => {
    try {
        const [existingOrder] = await connection.execute("SELECT id FROM pedidos WHERE id = ?", [id]);

        if (existingOrder.length === 0) {
            return { status: 404, message: `Pedido com ID ${id} não encontrado.` };
        }

        const [removeOrder] = await connection.execute("DELETE FROM pedidos WHERE id = ?", [id]);
        
        return removeOrder;

    } catch (error) {
        return { status: 500, message: "Problemas ao deletar o pedido." };
    }
};

const recuseOrder = async (id) => {
    try {
        const [updateResult] = await connection.execute("UPDATE pedidos SET status = 4 WHERE id = ?", [id]);

        if (updateResult.affectedRows === 0) {
            return { status: 404, message: `Pedido com ID ${id} não encontrado.` };
        }
        
        return updateResult;

    } catch (error) {
        return { status: 500, message: "Problemas ao recusar o pedido." };
    }
};

const changeStatusOrder = async (id, status) => {
    try {
        const [updateResult] = await connection.execute("UPDATE pedidos SET status = ? WHERE id = ?", [status, id]);
        
        if (updateResult.affectedRows === 0) {
            return { status: 404, message: `Pedido com ID ${id} não encontrado.` };
        }

        return updateResult;

    } catch (error) {
        return { status: 500, message: "Problemas ao atualizar o status do pedido." };
    }
};

const updateOrder = async (id, order) => {
    try {
        const [selectOrder] = await connection.execute("SELECT status FROM pedidos WHERE id = ?", [id]);

        if (selectOrder.length === 0) {
            return { status: 404, message: "Pedido não encontrado." };
        }

        if (selectOrder[0].status != 1) { 
            return { status: 400, message: "Pedidos que não se encontram mais como pendentes não podem ser atualizados."} 
        }
        
        let setClauses = [];
        let params = [];
        const allowedFields = ['produto', 'quantidade', 'valor', 'local_entrega', 'data_entrega', 'status'];
        
        for (const field of allowedFields) {
            if (order[field] !== undefined) {
                setClauses.push(`${field} = ?`);
                params.push(order[field]);
            }
        }
        
        if (setClauses.length === 0) {
            return { status: 400, message: "Nenhum campo válido para atualização fornecido." };
        }

        const query = `UPDATE pedidos SET ${setClauses.join(", ")} WHERE id = ?`;
        params.push(id);

        const [updatedOrder] = await connection.execute(query, params);
        
        if (updatedOrder.affectedRows === 0) {
            return { status: 200, message: "Pedido encontrado, mas nenhum dado foi alterado." };
        }

        return updatedOrder;

    } catch (error) {
        console.error("Erro no updateOrder:", error);
        return { status: 500, message: "Problemas ao atualizar o pedido." };
    }
};

module.exports = {
    getAll,
    createOrder,
    deleteOrder,
    updateOrder,
    recuseOrder,
    changeStatusOrder
};