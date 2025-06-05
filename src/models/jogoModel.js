import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../config/postgres.js";
import Desenvolvedora from "./desenvolvedoraModel.js";
import Distribuidora from "./distribuidoraModel.js";
import Genero from "./generoModel.js";

const Jogo = sequelize.define(
    'jogos',
    {
        id: {
            field: 'id_jogo',
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        titulo: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        dataLancamento: {
            field: "data_lancamento",
            type: DataTypes.DATEONLY,
            allowNull: false,
            defaultValue: Sequelize.NOW
        },
        preco: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        classificacao: {
            field: 'classificacao_etaria',
            type: DataTypes.STRING(20),
            allowNull: false
        },
    },
    {
        freezeTableName: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
);

Jogo.belongsTo(Desenvolvedora, {
    as: 'desenvolvedora',
    foreignKey:{
        name: 'idDesenvolvedora',
        field: 'id_desenvolvedora',
        allowNull: false
    },
    onUpdate: 'NO ACTION',
    onDelete: 'NO ACTION'
});

Jogo.belongsTo(Distribuidora, {
    as: 'distribuidora',
    foreignKey:{
        name: 'idDistribuidora',
        field: 'id_distribuidora',
        allowNull: false
    },
    onUpdate: 'NO ACTION',
    onDelete: 'NO ACTION'
});

Jogo.belongsTo(Genero, {
    as: 'genero',
    foreignKey:{
        name: 'idGenero',
        field: 'id_genero',
        allowNull: false
    },
    onUpdate: 'NO ACTION',
    onDelete: 'NO ACTION'
});

export default Jogo;
