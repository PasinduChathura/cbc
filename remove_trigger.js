'use strict';
const { Sequelize } = require('/app/node_modules/sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up({ context: queryInterface }) {
    // Drop the triggers
    await queryInterface.sequelize.query(`DROP TRIGGER IF EXISTS tranTriggerInsert;`);
    await queryInterface.sequelize.query(`DROP TRIGGER IF EXISTS tranTriggerUpdate;`);
  },

  async down({ context: queryInterface }) {
    // (Optional) Recreate the triggers if you want to roll back
    // Example only — use your real CREATE TRIGGER SQL here
    await queryInterface.sequelize.query(`
      CREATE TRIGGER tranTriggerInsert
      ON Transactions
      AFTER INSERT
      AS
      BEGIN
        INSERT INTO TranSummary(id, originId, paymentMode, custMobile, transType, cardLabel, traceNo, invoiceNo, amount, currency, batchNo, pan, merchantId, terminalId, dateTime, expDate, nii, rrn, authCode, signData, tipAmount, entryMode, dccCurrency, dccTranAmount, lat, lng, isAway, createdAt, updatedAt)
        SELECT id, originId, paymentMode, custMobile, transType, cardLabel, traceNo, invoiceNo, amount, currency, batchNo, pan, merchantId, terminalId, dateTime, expDate, nii, rrn, authCode, signData, tipAmount, entryMode, dccCurrency, dccTranAmount, lat, lng, isAway, createdAt, updatedAt
        FROM INSERTED;
      END;
    `);

    await queryInterface.sequelize.query(`
      CREATE TRIGGER tranTriggerUpdate
      ON Transactions
      AFTER UPDATE
      AS
      BEGIN
        UPDATE TranSummary
        SET transType = (SELECT transType FROM INSERTED),
            updatedAt = (SELECT updatedAt FROM INSERTED),
            isAway = (SELECT isAway FROM INSERTED)
        WHERE id = (SELECT id FROM INSERTED);
      END;
    `);
  },
};
