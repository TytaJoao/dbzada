'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('jogos', {
      id_jogo: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      titulo: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      data_lancamento: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      },
      preco: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      classificacao_etaria: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      id_desenvolvedora: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'desenvolvedoras',
          key: 'id'
        },
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION'
      },
      id_distribuidora: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'distribuidoras',
          key: 'id'
        },
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION'
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('jogos');
  }
}; 