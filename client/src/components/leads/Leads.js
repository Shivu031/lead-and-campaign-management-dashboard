import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import './leads.css';

const Leads = () => {
    const [leads, setLeads] = useState([]);
    const [campaigns, setCampaigns] = useState([]);
    const [selectedLead, setSelectedLead] = useState(null);

    useEffect(() => {
        // fetch leads
        axios.get('/api/leads')
        .then(res => setLeads(res.data))
        .catch(err => console.log(err));

        // Fetch campaigns
        axios.get('/api/campaigns')
        .then(res => setCampaigns(res.data))
        .catch(err => console.log(err));
    }, []);

    const openModal = (lead) => setSelectedLead(lead);
    const closeModal = () => setSelectedLead(null);

   // Helper function to get campaign details
    const getCampaignDetails = (campaignName) => {
        const campaign = campaigns.find(c => c.name === campaignName);
        return campaign ? campaign : { name: 'N/A', budget: 'N/A', leadsGenerated: 'N/A' }; // Default values if campaign not found
    };

  return (
    <div className="leads">
        <h1>Leads</h1>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Campaign</th>
                </tr>
            </thead>
            <tbody>
                {leads.map(lead => {
                    const campaignDetails = getCampaignDetails(lead.campaign); // Get campaign details for the lead
                    return(
                        <tr key={lead._id} onClick={() => openModal(lead)}>
                            <td>{lead.name}</td>
                            <td>{lead.email}</td>
                            <td>{lead.campaign}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>

        <Modal isOpen={!!selectedLead} onRequestClose={closeModal}>
            {selectedLead && (
            <div>
                <h2>{selectedLead.name}</h2>
                <p>Email: {selectedLead.email}</p>
                <p>Campaign: {getCampaignDetails(selectedLead.campaign).name}</p> {/* Display campaign name */}
                <p>Budget: {getCampaignDetails(selectedLead.campaign).budget}</p> {/* Display campaign budget */}
                <p>Leads Generated: {getCampaignDetails(selectedLead.campaign).leadsGenerated}</p> {/* Display leads generated */}
            </div>
            )}
            <button onClick={closeModal} className='leadBtn'>Close</button>
        </Modal>
    </div>
  );
};

export default Leads;
