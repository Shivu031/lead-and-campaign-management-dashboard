const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataControllers');

// Get Leads
router.get('/leads', dataController.getLeads);

// Get Campaigns
router.get('/campaigns', dataController.getCampaigns);

// Add Dummy Data (For testing purposes)
router.post('/dummy-data', dataController.addDummyData);

// data transformation(ETL)
router.get('/metrics', dataController.transformData);

router.get('/generate-report', dataController.generateReport);

router.post('/send-alert', dataController.sendAlert);

module.exports = router;
