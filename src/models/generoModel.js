import { DataTypes } from "sequelize";
import { sequelize } from "../config/postgres.js";

const Genero = sequelize.define(
    'generos',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nome: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        descricao: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
    },
    {
        freezeTableName: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
)

export default Genero