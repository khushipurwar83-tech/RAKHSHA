import React from 'react';
import { View, Text, Button } from 'react-native';
export default function Onboarding({ navigation }) { return <View><Text>Onboarding</Text><Button title='Next' onPress={() => navigation.replace('Login')} /></View>; }