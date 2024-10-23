const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CampaignSchema = new Schema({
    name: { 
        type: String, 
        required: true 
    },
    budget: { 
        type: Number, 
        required: true 
    },
    leadsGenerated: { 
        type: Number, 
        default: 0 
    },
    date: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model('Campaign', CampaignSchema);
