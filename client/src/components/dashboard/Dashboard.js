import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import './dashboard.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const Dashboard = () => {
  const [metrics, setMetrics] = useState(null);
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    // Fetch metrics
    axios.get('/api/metrics')
      .then(res => setMetrics(res.data))
      .catch(err => console.log(err));

    // Fetch campaigns
    axios.get('/api/campaigns')
      .then(res => setCampaigns(res.data))
      .catch(err => console.log(err));
  }, []);

  const data = {
    labels: campaigns.map(campaign => campaign.name),
    datasets: [
      {
        label: 'Leads Generated',
        data: campaigns.map(campaign => campaign.leadsGenerated),
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false,
      }
    ]
  };

  return (
    <div className="dashboard">
        <h1>Lead and Campaign Management Dashboard</h1>
        {metrics ? (
          <div className="widgets">
            <div className="widget">
              <h3>Total Budget</h3>
              <p>{metrics.totalBudget}</p>
            </div>
            <div className="widget">
              <h3>Total Leads</h3>
              <p>{metrics.totalLeads}</p>
            </div>
            <div className="widget">
              <h3>Avg leads per campaign</h3>
              <p>{metrics.averageLeadsPerCampaign}</p>
            </div>
          </div>
        ) : <p>Loading metrics...</p>}

        <div className="chart">
          <h3>Leads per Campaign</h3>
          <div className="chartGraph">
            <Line data={data} />  
          </div>
        </div>

        <div className="campaigns">
          <h2>Campaigns</h2>
          <ul>
          {campaigns.map(campaign => (
              <li key={campaign._id}>
                <h4>{campaign.name}</h4>
                <p>Budget: ${campaign.budget}</p>
                <p>Leads Generated: {campaign.leadsGenerated}</p>
              </li>
          ))}
          </ul>
        </div>
    </div>
  );
};

export default Dashboard;
