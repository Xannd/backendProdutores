const ordersModel = require('../models/orderModels');

const isError = (result) => result && typeof result === 'object' && result.status;

const getAll = async (_req, res) => {
    const orders = await ordersModel.getAll();
    
    if (isError(orders)) {
        return res.status(orders.status).json({ message: orders.message });
    }

    return res.status(200).json(orders);
};

const createOrder = async (req, res) => {
    const createdOrder = await ordersModel.createOrder(req.body);
    
    if (isError(createdOrder)) {
        return res.status(createdOrder.status).json({ message: createdOrder.message });
    }
    
    return res.status(201).json({ 
        message: 'Pedido criado com sucesso!', 
        orderId: createdOrder.insertId 
    });
};

const deleteOrder = async (req, res) => {
    const { id } = req.params;

    const result = await ordersModel.deleteOrder(id);

    if (isError(result)) {
        return res.status(result.status).json({ message: result.message });
    }

    return res.status(200).json({ message: 'Pedido deletado com sucesso!' });
};

const recuseOrder = async (req, res) => {
    const { id } = req.params;

    const result = await ordersModel.recuseOrder(id);

    if (isError(result)) {
        return res.status(result.status).json({ message: result.message });
    }
    
    return res.status(200).json({ message: 'Pedido recusado com sucesso!' });
};

const changeStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body; 

    if (!status) {
        return res.status(400).json({ message: 'O campo status é obrigatório no corpo da requisição.' });
    }

    const result = await ordersModel.changeStatusOrder(id, status);
    
    if (isError(result)) {
        return res.status(result.status).json({ message: result.message });
    }

    return res.status(200).json({ message: 'Status do pedido atualizado com sucesso!' });
};

const updateOrder = async (req, res) => {
    const { id } = req.params;

    const result = await ordersModel.updateOrder(id, req.body);
    
    if (isError(result)) {
        return res.status(result.status).json({ message: result.message });
    }

    return res.status(200).json({ message: 'Pedido atualizado com sucesso!' });
};

module.exports = {
    getAll,
    createOrder,
    deleteOrder,
    updateOrder,
    recuseOrder,
    changeStatus
};