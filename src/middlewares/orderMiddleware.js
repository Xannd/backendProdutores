const validateFieldProduct = (req, res, next) => {
    const { body } = req;

    if(body.product == undefined){
        return res.status(400).json({ message:'O campo produto é obrigatório'});
    }

    if(body.product == ''){
        return res.status(400).json({ message:'Produto não pode ser vazio'});
    }

    next();
}

const validateFieldStatus = (req, res, next) => {
    const { body } = req;

    if(body.status == undefined){
        return res.status(400).json({ message:'O campo status é obrigatório'});
    }

    if(body.status == ''){
        return res.status(400).json({ message:'Status não pode ser vazio'});
    }

    next();
}

const validateFullOrder = (req, res, next) => {
    const { body } = req;

    const requiredFields = ['product', 'count', 'total', 'adress_delivery', 'date_delivery'];

    for (const field of requiredFields) {
        if (body[field] === undefined) {
            return res.status(400).json({ 
                message: `O campo '${field}' é obrigatório para a atualização completa (PUT).` 
            });
        }
    }

    for (const field of requiredFields) {
        if (body[field] === '') {
            return res.status(400).json({ 
                message: `O campo '${field}' não pode ser vazio.` 
            });
        }
    }

    next();
};

const validateOrderCreation = (req, res, next) => {
    const { body } = req;

    const requiredFields = ['product', 'count', 'total', 'adress_delivery', 'date_delivery'];

    for (const field of requiredFields) {
        if (body[field] === undefined) {
            return res.status(400).json({ 
                message: `O campo '${field}' é obrigatório para a criação do pedido.` 
            });
        }
    }

    for (const field of requiredFields) {
        if (typeof body[field] === 'string' && body[field].trim() === '') {
            return res.status(400).json({ 
                message: `O campo '${field}' não pode ser vazio.` 
            });
        }
    }
    
    next();
};

module.exports = {
    validateFieldProduct,
    validateFieldStatus,
    validateFullOrder,
    validateOrderCreation
};