('use strict');
const { Sequelize, DataTypes } = require('/app/node_modules/sequelize');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up({ context: queryInterface }) {
    await queryInterface.addColumn(
      'TRANSACTIONS', // Table name
      'receiptViewCount', // New column name receiptViewCount
      {
        type: Sequelize.INTEGER, // Data type (adjust if necessary)
        defaultValue: 0, // Default value
        allowNull: false, // Ensuring it is not null
      }
    );
  },
  async down({ context: queryInterface }) {
    await queryInterface.removeColumn('TRANSACTIONS', 'receiptViewCount');
  },
};
