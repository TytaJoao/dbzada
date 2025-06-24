import { DataTypes } from "sequelize";
import { sequelize } from "../config/postgres.js";

const JogoGenero = sequelize.define(
    'jogo_generos',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        id_jogo: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'jogos',
                key: 'id_jogo'
            }
        },
        id_genero: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'generos',
                key: 'id'
            }
        }
    },
    {
        freezeTableName: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
)

export default JogoGenero; 