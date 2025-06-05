import Jogo from "../models/jogoModel.js";

const get = async (req, res) => {
    try {
        const id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;

        if (!id) {
            const response = await Jogo.findAll({
                order: [['id', 'ASC']],
                include: ['desenvolvedora', 'distribuidora', 'genero']
            });
            return res.status(200).send({
                message: 'Dados encontrados',
                data: response
            });
        }

        const response = await Jogo.findOne({
            where: { id },
            include: ['desenvolvedora', 'distribuidora', 'genero']
        });

        if (!response) {
            return res.status(404).send('not found');
        }

        return res.status(200).send({
            message: 'Dados encontrados',
            data: response
        });
    } catch (error) {
        return res.status(500).send({
            message: error.message
        });
    }
};

const create = async (corpo) => {
    try {
        const {
            titulo,
            dataLancamento,
            preco,
            classificacao,
            idDesenvolvedora,
            idDistribuidora,
            idGenero
        } = corpo;

        const response = await Jogo.create({
            titulo,
            dataLancamento,
            preco,
            classificacao,
            idDesenvolvedora,
            idDistribuidora,
            idGenero
        });

        return response;
    } catch (error) {
        throw new Error(error.message);
    }
};

const update = async (corpo, id) => {
    try {
        const response = await Jogo.findOne({ where: { id } });

        if (!response) {
            throw new Error('Registro não encontrado');
        }

        Object.keys(corpo).forEach((item) => response[item] = corpo[item]);
        await response.save();

        return response;
    } catch (error) {
        throw new Error(error.message);
    }
};

const destroy = async (req, res) => {
    try {
        const id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;

        if (!id) {
            return res.status(400).send('informa ai paizão');
        }

        const response = await Jogo.findOne({ where: { id } });

        if (!response) {
            return res.status(404).send('not found');
        }

        await response.destroy();

        return res.status(200).send({
            message: 'registro excluído',
            data: response
        });
    } catch (error) {
        return res.status(500).send({
            message: error.message
        });
    }
};

const persist = async (req, res) => {
    try {
        const id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;

        if (!id) {
            const response = await create(req.body);
            return res.status(201).send({
                message: 'criado com sucesso!',
                data: response
            });
        }

        const response = await update(req.body, id);
        return res.status(201).send({
            message: 'atualizado com sucesso!',
            data: response
        });
    } catch (error) {
        return res.status(500).send({
            message: error.message
        });
    }
};

export default {
    get,
    persist,
    update,
    destroy
};
