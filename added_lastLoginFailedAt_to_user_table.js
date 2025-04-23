('use strict');
const { Sequelize, DataTypes } = require('/app/node_modules/sequelize');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up({ context: queryInterface }) {
    await queryInterface.addColumn(
      'USERS', // Table name
      'LASTLOGINFAILEDAT', // New column name
      {
        type: Sequelize.DATE, // Data type (adjust if necessary)
      }
    );
  },

  async down({ context: queryInterface }) {
    await queryInterface.removeColumn('USERS', 'LASTLOGINFAILEDAT');
  },
};
