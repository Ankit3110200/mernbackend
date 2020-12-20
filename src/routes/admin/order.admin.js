const express = require("express");
const { requiresignin, adminMidddleware } = require("../../middleware");
const {
  updateOrder,
  getCustomerOrders,
} = require("../../controller/admin/order.admin");
const router = express.Router();

router.post(`/order/update`, requiresignin, adminMidddleware, updateOrder);
router.post(
  `/order/getCustomerOrders`,
  requiresignin,
  adminMidddleware,
  getCustomerOrders
);

module.exports = router;