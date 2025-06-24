'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('jogo_generos', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
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
      id_genero: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'generos',
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
    await queryInterface.dropTable('jogo_generos');
  }
}; 