************Lead and Campaign Management Dashboard*******

### Project Overview
    This project is a full-stack application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). It simulates a backend for handling leads and campaigns data and provides a frontend interface to manage and visualize the data.
    

### Key Features:

1. Backend API for managing leads and campaigns:
    Fetch leads and campaigns.
    Add dummy leads and campaigns.
    Generate reports (CSV/PDF).
    Send email alerts based on lead thresholds.
2. Frontend:
    Dashboard with customizable widgets displaying metrics.
    Leads management section.
    Analytics section visualized using Chart.js.
    Reporting tool to download CSV/PDF reports.
    Responsive design for both desktop and mobile devices.


### Technologies Used

## Backend:
    Node.js: Backend framework
    Express.js: Web framework for Node.js
    MongoDB: NoSQL database
    Mongoose: ODM for MongoDB
    Nodemailer: Sending emails
    json2csv: Generating CSV files
    pdfkit: Generating PDF files
## Frontend:
    React.js: Frontend library for building user interfaces
    Axios: For making HTTP requests
    Chart.js: Data visualization library
    React Bootstrap: For responsive design
    React Modal: For managing modals


##### Project Setup

## Backend Setup
1. Initialize Project
    mkdir backend
    cd backend
    npm init -y
2. Install devdependencies
    npm i -D nodemon
3. Install dependencies
    npm install
4. Start the server
    nodemon

## Frontend setup
1. Navigate to the frontend directory:
    cd ../frontend
2. Install dependencies:
    npm install
3. Start the frontend:
    npm run start


#### API Endpoints
Here are the backend API endpoints that the frontend interacts with:

## Leads and Campaigns
1. GET http://localhost:5000/api/leads
    Fetch all leads from the database.
2. POST http://localhost:5000/api/dummy-data
    Adds dummy data (leads and campaigns) to the database.
3. GET http://localhost:5000/api/campaigns
    Fetch all campaigns from the database.

## Data Metrics and Analytics
1. GET http://localhost:5000/api/metrics
    Fetch total leads, total budget, and average leads per campaign.

## Report Generation
1. GET http://localhost:5000/api/generate-report?type=csv
    Generate a CSV report of campaign data.

2. GET http://localhost:5000/api/generate-report?type=pdf
    Generate a PDF report of campaign data.

## Email Alerts
1. POST http://localhost:5000/api/send-alert
    Send email alerts when the total leads fall below a threshold.


#### Project Structure

1. Backend 
    backend/
    ├── controllers/
    │   └── dataController.js      # API logic for handling requests
    ├── models/
    │   ├── campaign.js            # Mongoose model for Campaigns
    │   └── lead.js                # Mongoose model for Leads
    ├── routes/
    │   └── api.js                 # Defines the API routes
    ├── .env                       # Environment variables (not included in repo)
    ├── server.js                  # Main server file
    └── package.json               # Node dependencies and scripts

2. Frontend
    frontend/
    ├── src/
    │   ├── components/
    │   │   ├── sidebar/Sidebar.js         # Sidebar navigation
    │   │   ├── dashboard/Dashboard.js       # Main dashboard view
    │   │   ├── leads/Leads.js           # Leads management
    │   │   ├── analytics/Analytics.js       # Data analytics with Chart.js
    │   │   ├── reports/Reports.js         # Report generation page
    │   └── App.js                 # Main app component
    ├── .env                       # Environment variables (not included in repo)
    └── package.json               # React dependencies and scripts


##### Features
1. Leads and Campaigns Management
    Add Leads and Campaigns: Admin can add dummy leads and campaigns for testing purposes.
    Fetch Data: Fetch all leads and campaigns via API.
2. Analytics
    Chart.js is used to visualize the data.
    Real-time statistics on leads generated per campaign.
3. Email Alerts
    Alerts are sent to a specified email when the total number of leads falls below a given threshold.
    Configurable using the /send-alert API.
4. Report Generation
    Generate CSV and PDF reports based on the data.
    Downloadable via the frontend interface.
5. Use Media Queries for responsiveness