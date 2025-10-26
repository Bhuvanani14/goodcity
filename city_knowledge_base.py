"""
City Knowledge Base - Telangana/Hyderabad Specific Information
Static responses for common city issues and complaints
"""

# Telangana/Hyderabad Government Bodies
TELANGANA_BODIES = {
    "ghmc": {
        "name": "GHMC (Greater Hyderabad Municipal Corporation)",
        "handles": ["roads", "potholes", "sanitation", "garbage", "parks", "streetlights"],
        "phone": "040-21111111",
        "website": "https://www.ghmc.gov.in",
        "app": "GHMC App"
    },
    "hmwssb": {
        "name": "HMWS&SB (Hyderabad Metropolitan Water Supply & Sewerage Board)",
        "handles": ["water supply", "water leak", "sewage", "drainage"],
        "phone": "155313",
        "website": "https://www.hyderabadwater.gov.in"
    },
    "transco": {
        "name": "TS TRANSCO & TSSPDCL",
        "handles": ["electricity", "power outage", "streetlight", "electric pole"],
        "phone": "1912",
        "website": "https://www.tssouthernpower.com"
    },
    "pollution": {
        "name": "Telangana State Pollution Control Board",
        "handles": ["pollution", "air quality", "noise", "environmental"],
        "phone": "040-23300489",
        "website": "https://www.tspcb.gov.in"
    },
    "traffic": {
        "name": "Hyderabad Traffic Police",
        "handles": ["traffic", "traffic signal", "road safety", "accidents"],
        "phone": "100 / 040-27853333",
        "website": "https://www.hyderabadtrafficpolice.gov.in"
    },
    "police": {
        "name": "Telangana State Police",
        "handles": ["safety", "crime", "emergency", "law enforcement"],
        "phone": "100",
        "website": "https://www.tspolice.gov.in"
    },
    "hmda": {
        "name": "HMDA (Hyderabad Metropolitan Development Authority)",
        "handles": ["planning", "zoning", "building permit", "land use"],
        "phone": "040-23311327",
        "website": "https://www.hmda.gov.in"
    }
}

# Response templates for different issue types
RESPONSES = {
    "pothole": {
        "keywords": ["pothole", "road damage", "crater", "road hole", "broken road"],
        "response": """For **potholes and road damage** in Hyderabad:

📞 **Contact GHMC (Greater Hyderabad Municipal Corporation)**
- Phone: 040-21111111
- Website: https://www.ghmc.gov.in
- App: Download "GHMC App" to report directly

📝 **Information to provide:**
- Exact location (street name, landmark)
- Size of the pothole
- Photo if possible

🚀 **Quick tip:** Use the GHMC mobile app for fastest response!"""
    },
    
    "streetlight": {
        "keywords": ["streetlight", "street light", "lamp post", "lighting", "dark street"],
        "response": """For **streetlight issues** in Hyderabad:

⚡ **Contact TSSPDCL (Telangana State Southern Power Distribution Company)**
- Phone: 1912
- Website: https://www.tssouthernpower.com
- Report online through their portal

📝 **Information to provide:**
- Exact location of the streetlight
- Pole number (if visible)
- Nature of problem (not working, flickering, damaged)

💡 **Note:** For streetlights on main roads, you can also contact GHMC at 040-21111111"""
    },
    
    "water": {
        "keywords": ["water supply", "water leak", "no water", "water problem", "tap water", "water shortage"],
        "response": """For **water supply issues** in Hyderabad:

💧 **Contact HMWS&SB (Hyderabad Metropolitan Water Supply & Sewerage Board)**
- Phone: 155313
- Website: https://www.hyderabadwater.gov.in
- 24/7 Customer Care: 155313

📝 **Common issues they handle:**
- No water supply
- Low water pressure
- Water leaks
- Water quality issues
- Meter problems

🚰 **Emergency:** For water leaks, call immediately to prevent wastage"""
    },
    
    "garbage": {
        "keywords": ["garbage", "trash", "waste", "sanitation", "dump", "litter", "cleaning"],
        "response": """For **garbage and sanitation issues** in Hyderabad:

🗑️ **Contact GHMC (Greater Hyderabad Municipal Corporation)**
- Phone: 040-21111111
- Website: https://www.ghmc.gov.in
- App: GHMC App for direct complaints

📝 **Services they provide:**
- Door-to-door garbage collection
- Cleaning of public areas
- Removal of illegal dumps
- Sanitation services

♻️ **Tip:** Hyderabad has segregated waste collection - separate dry and wet waste!"""
    },
    
    "sewage": {
        "keywords": ["sewage", "drainage", "sewer", "manhole", "overflow", "blockage"],
        "response": """For **sewage and drainage issues** in Hyderabad:

🚿 **Contact HMWS&SB**
- Phone: 155313
- Website: https://www.hyderabadwater.gov.in
- 24/7 Emergency: 155313

📝 **Common issues:**
- Sewage overflow
- Blocked drains
- Manhole issues
- Drainage problems

⚠️ **Emergency:** Report sewage overflows immediately for health and safety"""
    },
    
    "park": {
        "keywords": ["park", "playground", "garden", "public space", "green space"],
        "response": """For **park and public space issues** in Hyderabad:

🌳 **Contact GHMC**
- Phone: 040-21111111
- Website: https://www.ghmc.gov.in

📝 **They handle:**
- Park maintenance
- Playground repairs
- Garden upkeep
- Public space improvements

🎯 **Tip:** Specify which park/location in Ameerpet for faster action"""
    },
    
    "traffic": {
        "keywords": ["traffic", "traffic signal", "traffic light", "signal not working", "traffic problem"],
        "response": """For **traffic signal and road safety issues** in Hyderabad:

🚦 **Contact Hyderabad Traffic Police**
- Phone: 100 or 040-27853333
- Website: https://www.hyderabadtrafficpolice.gov.in
- Twitter: @HYDTP (very responsive!)

📝 **Issues they handle:**
- Non-functional traffic signals
- Traffic congestion
- Road safety concerns
- Traffic violations

📱 **Quick tip:** Tweet @HYDTP with location for fast response!"""
    },
    
    "electricity": {
        "keywords": ["power", "electricity", "outage", "power cut", "no power", "electric"],
        "response": """For **electricity and power issues** in Hyderabad:

⚡ **Contact TSSPDCL**
- Phone: 1912 (24/7 Call Center)
- Website: https://www.tssouthernpower.com
- SMS: Send 'POWER <Service Connection Number>' to 9440794407

📝 **Services:**
- Power outages
- Billing issues
- New connections
- Meter problems

🔌 **Emergency:** For electrical hazards, call 1912 immediately"""
    },
    
    "pollution": {
        "keywords": ["pollution", "noise", "air quality", "dust", "smoke", "environmental"],
        "response": """For **pollution and environmental issues** in Hyderabad:

🌍 **Contact Telangana State Pollution Control Board**
- Phone: 040-23300489
- Website: https://www.tspcb.gov.in
- Email: tpcb@telangana.gov.in

📝 **Issues they handle:**
- Air pollution
- Noise pollution
- Water pollution
- Industrial emissions
- Environmental violations

⚠️ **Note:** For immediate health emergencies, also call local police at 100"""
    },
    
    "safety": {
        "keywords": ["safety", "crime", "theft", "emergency", "police", "security"],
        "response": """For **safety and law enforcement** in Hyderabad:

👮 **Contact Telangana State Police**
- Emergency: 100
- Non-emergency: 040-27853333
- Website: https://www.tspolice.gov.in

🚨 **Services:**
- Emergency response
- Crime reporting
- Safety concerns
- Law enforcement

📱 **Apps:** Download "Hawk Eye" app for quick police assistance in Hyderabad"""
    },
    
    "building": {
        "keywords": ["building", "construction", "permit", "illegal construction", "planning", "zoning"],
        "response": """For **building and planning issues** in Hyderabad:

🏗️ **Contact HMDA (Hyderabad Metropolitan Development Authority)**
- Phone: 040-23311327
- Website: https://www.hmda.gov.in

📝 **Issues they handle:**
- Building permits
- Illegal constructions
- Planning violations
- Zoning issues
- Land use concerns

🏛️ **Also contact GHMC** (040-21111111) for municipal building violations"""
    },
    
    "general": {
        "keywords": [],
        "response": """I can help you with **Hyderabad/Telangana city issues**! 🏙️

**Common issues I can help with:**
- 🕳️ Potholes and road damage
- 💡 Streetlights
- 💧 Water supply issues  
- 🗑️ Garbage and sanitation
- 🚿 Sewage and drainage
- 🌳 Parks and public spaces
- 🚦 Traffic signals
- ⚡ Electricity problems
- 🌍 Pollution concerns
- 👮 Safety and police

**Key Contacts:**
- GHMC: 040-21111111
- Water (HMWS&SB): 155313
- Electricity (TSSPDCL): 1912
- Emergency/Police: 100

**Tell me what issue you're facing, and I'll provide specific contact information!**"""
    }
}


def get_response(user_input):
    """
    Match user input to predefined responses
    Returns appropriate response based on keywords
    """
    user_input_lower = user_input.lower()
    
    # Check each response type for keyword matches
    for issue_type, data in RESPONSES.items():
        if issue_type == "general":
            continue
            
        for keyword in data["keywords"]:
            if keyword in user_input_lower:
                return data["response"]
    
    # If no match found, return general response
    return RESPONSES["general"]["response"]


def get_all_contacts():
    """Return formatted list of all important contacts"""
    contacts = "📞 **Important Contacts for Hyderabad/Telangana:**\n\n"
    
    for body_id, info in TELANGANA_BODIES.items():
        contacts += f"**{info['name']}**\n"
        contacts += f"📞 Phone: {info['phone']}\n"
        contacts += f"🌐 Website: {info['website']}\n"
        if 'app' in info:
            contacts += f"📱 App: {info['app']}\n"
        contacts += f"Handles: {', '.join(info['handles'])}\n\n"
    
    return contacts

