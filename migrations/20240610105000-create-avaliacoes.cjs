'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('avaliacoes', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      nota: {
        type: Sequelize.ENUM('positivo', 'negativo'),
        allowNull: false
      },
      comentario: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      data_avaliacao: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      },
      id_jogo: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'jogos',
          key: 'id_jogo'
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
    await queryInterface.dropTable('avaliacoes');
  }
}; 