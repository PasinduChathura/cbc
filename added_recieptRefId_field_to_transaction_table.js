('use strict');
const { Sequelize, DataTypes } = require('/app/node_modules/sequelize');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up({ context: queryInterface }) {
    await queryInterface.addColumn(
      'TRANSACTIONS', // Table name
      'receiptRefId', // New column name receiptRefId
      {
        type: Sequelize.STRING(100), // Data type (adjust if necessary)
      }
    );
  },
  async down({ context: queryInterface }) {
    await queryInterface.removeColumn('TRANSACTIONS', 'receiptRefId');
  },
};
