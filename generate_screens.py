import os

mobile_screens = {
    "RAKHSHA/mobile/screens/01_Splash.js": """import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

export default function Splash({ navigation }) {
  useEffect(() => { setTimeout(() => navigation.replace('Onboarding'), 2000); }, []);
  return (
    <View style={styles.container}>
      <LottieView source={require('../assets/animations/logo.json')} autoPlay loop={false} style={{ width: 200, height: 200 }} />
    </View>
  );
}
const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: '#0A0A0A', justifyContent: 'center', alignItems: 'center' }});
""",
    "RAKHSHA/mobile/screens/02_Onboarding.js": "import React from 'react';\nimport { View, Text, Button } from 'react-native';\nexport default function Onboarding({ navigation }) { return <View><Text>Onboarding</Text><Button title='Next' onPress={() => navigation.replace('Login')} /></View>; }",
    "RAKHSHA/mobile/screens/03_Login.js": "import React from 'react';\nimport { View, Text, Button } from 'react-native';\nexport default function Login({ navigation }) { return <View><Text>Login</Text><Button title='Login' onPress={() => navigation.replace('Home')} /></View>; }",
    "RAKHSHA/mobile/screens/04_Register.js": "import React from 'react';\nimport { View, Text } from 'react-native';\nexport default function Register() { return <View><Text>Register</Text></View>; }",
    "RAKHSHA/mobile/screens/05_ForgotPassword.js": "import React from 'react';\nimport { View, Text } from 'react-native';\nexport default function ForgotPassword() { return <View><Text>ForgotPassword</Text></View>; }",
    "RAKHSHA/mobile/screens/06_ResetPassword.js": "import React from 'react';\nimport { View, Text } from 'react-native';\nexport default function ResetPassword() { return <View><Text>ResetPassword</Text></View>; }",
    "RAKHSHA/mobile/screens/07_EmailVerification.js": "import React from 'react';\nimport { View, Text } from 'react-native';\nexport default function EmailVerification() { return <View><Text>EmailVerification</Text></View>; }",
    "RAKHSHA/mobile/screens/09_RoutePlanner.js": "import React from 'react';\nimport { View, Text } from 'react-native';\nexport default function RoutePlanner() { return <View><Text>RoutePlanner</Text></View>; }",
    "RAKHSHA/mobile/screens/11_SOSPanel.js": "import React from 'react';\nimport { View, Text } from 'react-native';\nexport default function SOSPanel() { return <View><Text>SOSPanel</Text></View>; }",
    "RAKHSHA/mobile/screens/12_FakeCall.js": "import React from 'react';\nimport { View, Text } from 'react-native';\nexport default function FakeCall() { return <View><Text>FakeCall</Text></View>; }",
    "RAKHSHA/mobile/screens/13_ReportUnsafe.js": "import React from 'react';\nimport { View, Text } from 'react-native';\nexport default function ReportUnsafe() { return <View><Text>ReportUnsafe</Text></View>; }",
    "RAKHSHA/mobile/screens/14_Heatmap.js": "import React from 'react';\nimport { View, Text } from 'react-native';\nexport default function Heatmap() { return <View><Text>Heatmap</Text></View>; }",
    "RAKHSHA/mobile/screens/15_SafeHavens.js": "import React from 'react';\nimport { View, Text } from 'react-native';\nexport default function SafeHavens() { return <View><Text>SafeHavens</Text></View>; }",
    "RAKHSHA/mobile/screens/16_Guardians.js": "import React from 'react';\nimport { View, Text } from 'react-native';\nexport default function Guardians() { return <View><Text>Guardians</Text></View>; }",
    "RAKHSHA/mobile/screens/17_LiveTracking.js": "import React from 'react';\nimport { View, Text } from 'react-native';\nexport default function LiveTracking() { return <View><Text>LiveTracking</Text></View>; }",
    "RAKHSHA/mobile/screens/18_PeerEscort.js": "import React from 'react';\nimport { View, Text } from 'react-native';\nexport default function PeerEscort() { return <View><Text>PeerEscort</Text></View>; }",
    "RAKHSHA/mobile/screens/19_Checkins.js": "import React from 'react';\nimport { View, Text } from 'react-native';\nexport default function Checkins() { return <View><Text>Checkins</Text></View>; }",
    "RAKHSHA/mobile/screens/20_Profile.js": "import React from 'react';\nimport { View, Text } from 'react-native';\nexport default function Profile() { return <View><Text>Profile</Text></View>; }",
    "RAKHSHA/mobile/screens/22_EmergencySettings.js": "import React from 'react';\nimport { View, Text } from 'react-native';\nexport default function EmergencySettings() { return <View><Text>EmergencySettings</Text></View>; }",
    "RAKHSHA/mobile/screens/23_History.js": "import React from 'react';\nimport { View, Text } from 'react-native';\nexport default function History() { return <View><Text>History</Text></View>; }",
    "RAKHSHA/mobile/screens/24_OfflineMode.js": "import React from 'react';\nimport { View, Text } from 'react-native';\nexport default function OfflineMode() { return <View><Text>OfflineMode</Text></View>; }",
    
    # Lottie Placeholder
    "RAKHSHA/mobile/assets/animations/logo.json": '{"v":"5.5.2","fr":60,"ip":0,"op":60,"w":500,"h":500,"nm":"Comp 1","ddd":0,"assets":[],"layers":[]}'
}

for filepath, content in mobile_screens.items():
    directory = os.path.dirname(filepath)
    os.makedirs(directory, exist_ok=True)
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)

print("Generated mobile screens successfully.")
