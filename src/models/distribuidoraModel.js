import { DataTypes } from "sequelize";
import { sequelize } from "../config/postgres.js";

const Distribuidora = sequelize.define(
    'distribuidoras',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nome: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        pais: {
            type: DataTypes.STRING(14),
            allowNull: false,
            unique: true
        },
        anoFundacao: {
            field: "ano_fundacao",
            type: DataTypes.DATEONLY,
            allowNull: false
        }
    },
    {
        freezeTableName: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
)

export default Distribuidora