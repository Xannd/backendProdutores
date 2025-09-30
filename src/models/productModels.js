const connection = require("./connection"); 

const getProducts = async () => {
    try {
        const [products] = await connection.execute(`
            SELECT t1.id, t1.nome_produto, t1.preco, t2.abreviacao 
            FROM produtos AS t1
            JOIN unidades_vendas AS t2 ON t1.unidade_venda = t2.id`
        );
        return products;

    } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        return { status: 500, message: "Problemas internos ao buscar o catálogo de produtos." };
    }
};

module.exports = {
    getProducts
};