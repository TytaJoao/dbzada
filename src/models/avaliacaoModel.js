import { DataTypes } from "sequelize";
import { sequelize } from "../config/postgres.js";
import Jogo from "./jogoModel.js";

const Avaliacao = sequelize.define(
    'avaliacoes',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nota: {
            type: DataTypes.ENUM('positivo', 'negativo'),
            allowNull: false,
        },
        comentario: {
            type: DataTypes.STRING(255),
        },
        dataAvaliacao: {
            field: 'data_avaliacao',
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Date.now()
        }
    },
    {
        freezeTableName: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
)

Avaliacao.belongsTo(Jogo, {
    as: 'jogo',
    foreignKey:{
        name: 'idJogo',
        field: 'id_jogo',
        allowNull: false
    },
    onUpdate: 'NO ACTION',
    onDelete: 'NO ACTION'
})

export default Avaliacao