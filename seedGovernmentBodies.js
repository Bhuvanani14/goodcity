const mongoose = require('mongoose');
const GovernmentBody = require('./models/GovernmentBody');

// Use environment variable for MongoDB URI, fallback to local for backward compatibility
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/improve_my_city';

async function seedGovernmentBodies() {
    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB for seeding government bodies.');

        // Clear existing government bodies
        await GovernmentBody.deleteMany({});
        console.log('Cleared existing government bodies.');

        // Government bodies data
        const governmentBodiesData = [
            // Infrastructure & Road Safety
            {
                name: "Municipal Corporation (Roads & Infrastructure Department)",
                category: "infrastructure",
                department: "Roads & Infrastructure",
                jurisdiction: "municipal",
                priority: "primary",
                contactInfo: {
                    phone: "1800-XXX-XXXX",
                    email: "roads@municipal.gov.in",
                    website: "https://municipal.gov.in/roads"
                }
            },
            {
                name: "Public Works Department (PWD)",
                category: "infrastructure",
                department: "Public Works",
                jurisdiction: "state",
                priority: "primary",
                contactInfo: {
                    phone: "1800-XXX-XXXX",
                    email: "pwd@state.gov.in",
                    website: "https://pwd.state.gov.in"
                }
            },
            {
                name: "National Highways Authority of India (NHAI)",
                category: "infrastructure",
                department: "Highways",
                jurisdiction: "central",
                priority: "primary",
                contactInfo: {
                    phone: "1800-XXX-XXXX",
                    email: "info@nhai.gov.in",
                    website: "https://nhai.gov.in"
                }
            },
            {
                name: "State Transport Department",
                category: "infrastructure",
                department: "Transport",
                jurisdiction: "state",
                priority: "secondary",
                contactInfo: {
                    phone: "1800-XXX-XXXX",
                    email: "transport@state.gov.in",
                    website: "https://transport.state.gov.in"
                }
            },

            // Sanitation & Waste Management
            {
                name: "Municipal Corporation (Sanitation Department)",
                category: "sanitation",
                department: "Sanitation",
                jurisdiction: "municipal",
                priority: "primary",
                contactInfo: {
                    phone: "1800-XXX-XXXX",
                    email: "sanitation@municipal.gov.in",
                    website: "https://municipal.gov.in/sanitation"
                }
            },
            {
                name: "Swachh Bharat Mission (Central Government)",
                category: "sanitation",
                department: "Swachh Bharat Mission",
                jurisdiction: "central",
                priority: "primary",
                contactInfo: {
                    phone: "1800-XXX-XXXX",
                    email: "info@swachhbharatmission.gov.in",
                    website: "https://swachhbharatmission.gov.in"
                }
            },
            {
                name: "State Pollution Control Board",
                category: "sanitation",
                department: "Pollution Control",
                jurisdiction: "state",
                priority: "secondary",
                contactInfo: {
                    phone: "1800-XXX-XXXX",
                    email: "info@spcb.gov.in",
                    website: "https://spcb.gov.in"
                }
            },
            {
                name: "Local Ward Councilor",
                category: "sanitation",
                department: "Local Governance",
                jurisdiction: "local",
                priority: "supporting",
                contactInfo: {
                    phone: "Contact through Municipal Office",
                    email: "ward@municipal.gov.in",
                    website: "https://municipal.gov.in/wards"
                }
            },

            // Public Utilities
            {
                name: "Municipal Corporation (Water/Electricity Department)",
                category: "utilities",
                department: "Utilities",
                jurisdiction: "municipal",
                priority: "primary",
                contactInfo: {
                    phone: "1800-XXX-XXXX",
                    email: "utilities@municipal.gov.in",
                    website: "https://municipal.gov.in/utilities"
                }
            },
            {
                name: "State Electricity Board",
                category: "utilities",
                department: "Electricity",
                jurisdiction: "state",
                priority: "primary",
                contactInfo: {
                    phone: "1800-XXX-XXXX",
                    email: "info@seb.gov.in",
                    website: "https://seb.gov.in"
                }
            },
            {
                name: "Local Water Supply Authority",
                category: "utilities",
                department: "Water Supply",
                jurisdiction: "municipal",
                priority: "secondary",
                contactInfo: {
                    phone: "1800-XXX-XXXX",
                    email: "water@municipal.gov.in",
                    website: "https://municipal.gov.in/water"
                }
            },
            {
                name: "Public Health Engineering Department",
                category: "utilities",
                department: "Public Health Engineering",
                jurisdiction: "state",
                priority: "secondary",
                contactInfo: {
                    phone: "1800-XXX-XXXX",
                    email: "phe@state.gov.in",
                    website: "https://phe.state.gov.in"
                }
            },

            // Environment & Public Spaces
            {
                name: "Municipal Corporation (Gardening Department)",
                category: "environment",
                department: "Gardening & Parks",
                jurisdiction: "municipal",
                priority: "primary",
                contactInfo: {
                    phone: "1800-XXX-XXXX",
                    email: "gardening@municipal.gov.in",
                    website: "https://municipal.gov.in/gardening"
                }
            },
            {
                name: "Forest Department",
                category: "environment",
                department: "Forests",
                jurisdiction: "state",
                priority: "primary",
                contactInfo: {
                    phone: "1800-XXX-XXXX",
                    email: "info@forest.gov.in",
                    website: "https://forest.gov.in"
                }
            },
            {
                name: "State Pollution Control Board",
                category: "environment",
                department: "Pollution Control",
                jurisdiction: "state",
                priority: "secondary",
                contactInfo: {
                    phone: "1800-XXX-XXXX",
                    email: "info@spcb.gov.in",
                    website: "https://spcb.gov.in"
                }
            },
            {
                name: "Ministry of Environment, Forest and Climate Change",
                category: "environment",
                department: "Environment",
                jurisdiction: "central",
                priority: "secondary",
                contactInfo: {
                    phone: "1800-XXX-XXXX",
                    email: "info@moefcc.gov.in",
                    website: "https://moefcc.gov.in"
                }
            },

            // Civic Amenities & Services
            {
                name: "Municipal Corporation (General Administration)",
                category: "civic",
                department: "General Administration",
                jurisdiction: "municipal",
                priority: "primary",
                contactInfo: {
                    phone: "1800-XXX-XXXX",
                    email: "admin@municipal.gov.in",
                    website: "https://municipal.gov.in/admin"
                }
            },
            {
                name: "Local Ward Councilor",
                category: "civic",
                department: "Local Governance",
                jurisdiction: "local",
                priority: "primary",
                contactInfo: {
                    phone: "Contact through Municipal Office",
                    email: "ward@municipal.gov.in",
                    website: "https://municipal.gov.in/wards"
                }
            },
            {
                name: "State Urban Development Department",
                category: "civic",
                department: "Urban Development",
                jurisdiction: "state",
                priority: "secondary",
                contactInfo: {
                    phone: "1800-XXX-XXXX",
                    email: "urban@state.gov.in",
                    website: "https://urban.state.gov.in"
                }
            },
            {
                name: "Public Grievance Redressal System",
                category: "civic",
                department: "Public Grievances",
                jurisdiction: "central",
                priority: "supporting",
                contactInfo: {
                    phone: "1800-XXX-XXXX",
                    email: "pgportal@gov.in",
                    website: "https://pgportal.gov.in"
                }
            },

            // Safety & Law Enforcement
            {
                name: "Local Police Station",
                category: "safety",
                department: "Police",
                jurisdiction: "local",
                priority: "primary",
                contactInfo: {
                    phone: "100",
                    email: "police@state.gov.in",
                    website: "https://police.state.gov.in"
                }
            },
            {
                name: "Municipal Corporation (Security Department)",
                category: "safety",
                department: "Municipal Security",
                jurisdiction: "municipal",
                priority: "secondary",
                contactInfo: {
                    phone: "1800-XXX-XXXX",
                    email: "security@municipal.gov.in",
                    website: "https://municipal.gov.in/security"
                }
            },
            {
                name: "Traffic Police",
                category: "safety",
                department: "Traffic Police",
                jurisdiction: "state",
                priority: "primary",
                contactInfo: {
                    phone: "103",
                    email: "traffic@state.gov.in",
                    website: "https://trafficpolice.state.gov.in"
                }
            },
            {
                name: "State Home Department",
                category: "safety",
                department: "Home Affairs",
                jurisdiction: "state",
                priority: "secondary",
                contactInfo: {
                    phone: "1800-XXX-XXXX",
                    email: "home@state.gov.in",
                    website: "https://home.state.gov.in"
                }
            }
        ];

        await GovernmentBody.insertMany(governmentBodiesData);
        console.log(`Seeded ${governmentBodiesData.length} government bodies successfully.`);

        console.log('Government bodies seeding complete!');
    } catch (error) {
        console.error('Government bodies seeding failed:', error);
    } finally {
        mongoose.disconnect();
        console.log('Disconnected from MongoDB.');
    }
}

seedGovernmentBodies();
