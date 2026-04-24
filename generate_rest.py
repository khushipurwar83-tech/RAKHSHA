import os

files_to_create = {
    # Backend Models
    "RAKHSHA/backend/src/models/Route.py": """from sqlalchemy import Column, String, Integer, Float, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
import uuid
from src.config.database import Base

class Route(Base):
    __tablename__ = "routes"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey('users.id'))
    start_lat = Column(Float)
    start_lng = Column(Float)
    end_lat = Column(Float)
    end_lng = Column(Float)
    safety_score = Column(Float)
""",
    "RAKHSHA/backend/src/models/Report.py": """from sqlalchemy import Column, String, Text, Float, DateTime, ForeignKey, Integer
from sqlalchemy.dialects.postgresql import UUID
import uuid
from src.config.database import Base

class Report(Base):
    __tablename__ = "user_reports"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey('users.id'))
    description = Column(Text)
    photo_url = Column(String(500))
    severity = Column(Integer)
""",
    "RAKHSHA/backend/src/models/Refuge.py": """from sqlalchemy import Column, String, Boolean
from sqlalchemy.dialects.postgresql import UUID
import uuid
from src.config.database import Base

class Refuge(Base):
    __tablename__ = "safe_havens"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(255))
    type = Column(String(100))
    address = Column(String(500))
    is_verified = Column(Boolean, default=True)
""",

    # Mobile Components
    "RAKHSHA/mobile/components/common/GlassCard.js": """import React from 'react';
import { View, StyleSheet } from 'react-native';

const GlassCard = ({ children, style }) => (
  <View style={[styles.card, style]}>
    {children}
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    backdropFilter: 'blur(10px)',
  }
});
export default GlassCard;
""",
    "RAKHSHA/mobile/components/stealth/StealthToggle.js": """import React from 'react';
import { Switch, View, Text, StyleSheet } from 'react-native';
import { useStealthMode } from '../../contexts/StealthModeContext';

const StealthToggle = () => {
  const { isStealthMode, toggleStealthMode } = useStealthMode();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Stealth Mode</Text>
      <Switch value={isStealthMode} onValueChange={toggleStealthMode} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: { flexDirection: 'row', justifyContent: 'space-between', padding: 16, backgroundColor: '#111' },
  text: { color: 'white', fontSize: 16 }
});
export default StealthToggle;
""",

    # Mobile Screens
    "RAKHSHA/mobile/screens/08_Home.js": """import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import SOSButton from '../components/emergency/SOSButton';
import StealthToggle from '../components/stealth/StealthToggle';

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <StealthToggle />
      <View style={styles.center}>
        <SOSButton />
        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Navigation')}>
          <Text style={styles.btnText}>Plan Safe Route</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0A0A' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  btn: { marginTop: 20, padding: 16, backgroundColor: '#00F0FF', borderRadius: 8 },
  btnText: { color: '#0A0A0A', fontWeight: 'bold' }
});
""",
    "RAKHSHA/mobile/screens/21_StealthMode.js": """import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { useSOSStore } from '../store/useSOSStore';

export default function StealthMode() {
  const { activateSOS } = useSOSStore();
  // Long press volume mock -> tap hidden logo
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Today's Weather</Text>
      <Text style={styles.temp}>72°F</Text>
      <Text style={styles.desc}>Sunny, clear skies</Text>
      
      <TouchableWithoutFeedback onLongPress={activateSOS}>
        <View style={styles.hiddenTrigger} />
      </TouchableWithoutFeedback>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  temp: { fontSize: 64, color: '#333', marginTop: 20 },
  desc: { fontSize: 18, color: '#666' },
  hiddenTrigger: { position: 'absolute', bottom: 0, left: 0, width: 100, height: 100 }
});
""",

    # Web Dashboard HTML
    "RAKHSHA/web/police/index.html": """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>RAKHSHA | Police Dashboard</title>
    <link href="../assets/css/tailwind.css" rel="stylesheet">
    <script src="https://cdn.socket.io/4.7.5/socket.io.min.js"></script>
    <style>
        body { background-color: #0A0A0A; color: white; font-family: 'Inter', sans-serif; }
        .glass { background: rgba(255,255,255,0.05); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.1); }
    </style>
</head>
<body>
    <div class="flex h-screen">
        <aside class="w-64 glass p-6">
            <h1 class="text-2xl font-bold text-red-500 mb-8">RAKHSHA HQ</h1>
            <nav class="space-y-4">
                <a href="live.html" class="block text-cyan-400">Live Alerts</a>
                <a href="reports.html" class="block text-gray-400 hover:text-white">Reports</a>
            </nav>
        </aside>
        <main class="flex-1 p-8">
            <h2 class="text-3xl font-bold mb-6">Active Emergencies</h2>
            <div id="alerts-container" class="grid grid-cols-1 md:grid-cols-2 gap-6"></div>
        </main>
    </div>
    <script>
        const socket = io("http://localhost:8000");
        const container = document.getElementById('alerts-container');
        
        socket.emit("join_room", "police_dashboard");
        
        socket.on("sos_alert", (data) => {
            const card = document.createElement('div');
            card.className = "glass p-6 rounded-xl border-red-500 border-2";
            card.innerHTML = `
                <h3 class="text-xl font-bold text-red-500 mb-2">SOS ALERT</h3>
                <p>User ID: ${data.user_id}</p>
                <p>Location: ${data.location.latitude}, ${data.location.longitude}</p>
                <button class="mt-4 bg-cyan-500 text-black px-4 py-2 rounded font-bold">Dispatch Unit</button>
            `;
            container.prepend(card);
        });
    </script>
</body>
</html>
"""
}

# Create missing directories and files
for filepath, content in files_to_create.items():
    directory = os.path.dirname(filepath)
    os.makedirs(directory, exist_ok=True)
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)

print("Generated scaffold successfully.")
