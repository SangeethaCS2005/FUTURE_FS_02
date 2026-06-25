const express = require("express");
const router = express.Router();

const {
  getLeads,
  addLead,
  deleteLead
} = require("../controllers/leadController");

router.get("/", getLeads);
router.post("/", addLead);
router.delete("/:id", deleteLead);

module.exports = router;