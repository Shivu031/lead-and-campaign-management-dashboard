import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import './analytics.css';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Register the required components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Analytics = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch campaigns data from the backend
        axios.get('/api/campaigns')
        .then(response => {
            setCampaigns(response.data); // Set the fetched data to the campaigns state
            setLoading(false); // Set loading to false after data is fetched
        })
        .catch(error => {
            console.error('Error fetching campaign data:', error);
            setLoading(false);
        });
    }, []);

    // Prepare data for the chart
    const data = {
        labels: campaigns.map(campaign => campaign.name), // Extract campaign names
        datasets: [
        {
            label: 'Leads Generated',
            data: campaigns.map(campaign => campaign.leadsGenerated), // Extract leads generated for each campaign
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
        }
        ]
    };

  return (
    <div className="analytics">
        <h1>Analytics</h1>
        {loading ? (
            <p>Loading data...</p>
        ) : (
            <Bar data={data} />
        )}
    </div>
  );
};

export default Analytics;
