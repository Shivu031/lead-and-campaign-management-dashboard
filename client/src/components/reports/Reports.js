import React from 'react';
import axios from 'axios';
import './reports.css';

const Reports = () => {
    const downloadReport = (type) => {
        axios.get(`/api/generate-report?format=${type}`, { responseType: 'blob' })
        .then(res => {
          // Create a blob URL for the response
          const url = window.URL.createObjectURL(new Blob([res.data]));
          const link = document.createElement('a');
          // Set file name according to the type (csv or pdf)
          link.href = url;
          link.setAttribute('download', `report.${type}`);
          document.body.appendChild(link);
          link.click();
          // Clean up the link after download
          document.body.removeChild(link);
        })
        .catch(err => console.log('Error downloading the report:', err));
    };

    return (
        <div className="reports">
          <h1>Reports</h1>
          <div className="reportsBtn">
            <button onClick={() => downloadReport('csv')}>Download CSV</button>
            <button onClick={() => downloadReport('pdf')}>Download PDF</button>
          </div>
        </div>
    );
};

export default Reports;
