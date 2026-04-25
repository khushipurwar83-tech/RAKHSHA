INSERT INTO safe_havens (name, type, location, address) VALUES 
('Central Police Station', 'police', ST_SetSRID(ST_MakePoint(77.2100, 28.6120), 4326), 'Connaught Place, Delhi'),
('City General Hospital', 'hospital', ST_SetSRID(ST_MakePoint(77.2090, 28.6149), 4326), 'Ansari Nagar, Delhi'),
('Metro Security Hub', 'police', ST_SetSRID(ST_MakePoint(77.2210, 28.6230), 4326), 'Rajiv Chowk, Delhi'),
('All India Medical Institute', 'hospital', ST_SetSRID(ST_MakePoint(77.2100, 28.5672), 4326), 'Safdarjung, Delhi'),
('Northeast Shield Post', 'police', ST_SetSRID(ST_MakePoint(77.2800, 28.6800), 4326), 'Shahdara, Delhi'),
('South Safety Clinic', 'hospital', ST_SetSRID(ST_MakePoint(77.2400, 28.5400), 4326), 'Greater Kailash, Delhi');