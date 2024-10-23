const Lead = require('../models/lead');
const Campaign = require('../models/campaign');
const { Parser } = require('json2csv');
const PDFDocument = require('pdfkit');
const nodemailer = require('nodemailer');

// Fetch dummy leads
exports.getLeads = async (req, res) => {
  try {
    const leads = await Lead.find();
    res.json(leads);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Fetch dummy campaigns
exports.getCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find();
    res.json(campaigns);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Simulate adding multiple leads and campaigns (For testing)
exports.addDummyData = async (req, res) => {
  try {
    // Example leads and campaigns arrays (can be provided through req.body)
    const leads = [
      { name: 'John', email: 'john@example.com', campaign: 'Campaign A' },
      { name: 'Jane', email: 'jane@example.com', campaign: 'Campaign B' },
      { name: 'Mike', email: 'mike@example.com', campaign: 'Campaign A' },
    ];

    const campaigns = [
      { name: 'Campaign A', budget: 1000, leadsGenerated: 10 },
      { name: 'Campaign B', budget: 2000, leadsGenerated: 20 },
      { name: 'Campaign C', budget: 1500, leadsGenerated: 15 },
    ];

    // Save multiple leads using insertMany
    await Lead.insertMany(leads);

    // Save multiple campaigns using insertMany
    await Campaign.insertMany(campaigns);

    res.json({ message: 'Multiple leads and campaigns added' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};  

exports.transformData = async (req, res) => {
  try {
    const campaigns = await Campaign.find();
    const totalBudget = campaigns.reduce((acc, campaign) => acc + campaign.budget, 0);
    const totalLeads = campaigns.reduce((acc, campaign) => acc + campaign.leadsGenerated, 0);

    const metrics = {
      totalBudget,
      totalLeads,
      averageLeadsPerCampaign: totalLeads / campaigns.length
    };

    res.json(metrics);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};
  

// Generate report in CSV or PDF format
exports.generateReport = async (req, res) => {
  try {
    const campaigns = await Campaign.find();

    // Check the requested format from query parameter (default to CSV)
    const format = req.query.format || 'csv';

    if (format === 'csv') {
      // CSV report
      const json2csvParser = new Parser();
      const csv = json2csvParser.parse(campaigns);
      
      res.header('Content-Type', 'text/csv');
      res.attachment('campaign-report.csv');
      return res.send(csv);
      
    } else if (format === 'pdf') {
      // PDF report
      const doc = new PDFDocument();
      
      res.header('Content-Type', 'application/pdf');
      res.attachment('campaign-report.pdf');

      // Pipe the PDF to response
      doc.pipe(res);

      // Add title to the PDF
      doc.fontSize(20).text('Campaign Report', { align: 'center' });

      // Add campaigns data to PDF
      campaigns.forEach(campaign => {
        doc.fontSize(12).text(`Name: ${campaign.name}`);
        doc.text(`Budget: ${campaign.budget}`);
        doc.text(`Leads Generated: ${campaign.leadsGenerated}`);
        doc.moveDown(); // Adds a line space
      });

      // End the PDF stream
      doc.end();
    } else {
      // Unsupported format
      res.status(400).json({ error: 'Unsupported report format' });
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error while generating report' });
  }
};


exports.sendAlert = async (req, res) => {
  const threshold = req.body.threshold || 100;
  const email = req.body.email; // Retrieve email from request body

  if (!email) {
      return res.status(400).json({ message: 'Email is required' }); // Handle missing email
  }

  const totalLeads = await Lead.countDocuments();

  if (totalLeads < threshold) {
      const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
      }
  });

  const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Lead Alert Email',
      text: `The total number of leads is below the threshold: ${totalLeads}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return res.status(500).send(error.toString());
      }
      res.json({ message: 'Alert sent' });
  });
  } else {
      res.json({ message: 'No alert necessary' });
  }
};
