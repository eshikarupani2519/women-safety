import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
} from 'react-native';

import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import EmergencyNumbersScreen from './android/app/src/components/emergencyNumbers';
import EmergencyContactsScreen from './android/app/src/components/emergencyContacts';

/* ---------------- NAV ---------------- */

const Stack = createNativeStackNavigator();

/* ---------------- FEATURES ---------------- */

const features = [
  { title: 'Emergency Numbers', desc: 'Quick access', screen: 'Emergency numbers', color: '#ef4444', icon: '📞' },
  { title: 'Emergency Contacts', desc: 'Trusted contacts', screen: 'Emergency contacts', color: '#3b82f6', icon: '👥' },
  { title: 'Safe Ride', desc: 'Request transport', screen: 'safe', color: '#22c55e', icon: '🚗' },
  { title: 'Track Location', desc: 'Share location', screen: 'track', color: '#a855f7', icon: '📍' },
  { title: 'Find Routes', desc: 'Safe routes', screen: 'routes', color: '#eab308', icon: '🧭' },
  { title: 'Nearby Police', desc: 'Locate stations', screen: 'police', color: '#6366f1', icon: '🛡️' },
  { title: 'Helpers', desc: 'Volunteers', screen: 'helpers', color: '#06b6d4', icon: '📡' },
  { title: 'Get Help', desc: 'More options', screen: 'help', color: '#f97316', icon: '⚠️' },
];

/* ---------------- APP ---------------- */

export default function App() {
  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator>

          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Emergency numbers"
            component={EmergencyNumbersScreen}
          />

          <Stack.Screen
            name="Emergency contacts"
            component={EmergencyContactsScreen}
          />

        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

/* ---------------- HOME SCREEN ---------------- */

function Home({ navigation }: any) {
  const [showSOS, setShowSOS] = useState(false);

  return (
    <View style={{ flex: 1 }}>

      <ScrollView style={styles.container}>

        {/* HEADER */}
        <Text style={styles.title}>⚠️ Safety First</Text>
        <Text style={styles.subtitle}>
          Quick access to safety features
        </Text>

        {/* GRID */}
        <View style={styles.grid}>
          {features.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.card}
              onPress={() => navigation.navigate(item.screen)}
            >
              <Text style={styles.icon}>{item.icon}</Text>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDesc}>{item.desc}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* SAFETY TIPS */}
        <View style={styles.tipsBox}>
          <Text style={styles.tipsTitle}>★ Safety Tips</Text>

          <Text style={styles.tip}>✓ Share location with trusted people</Text>
          <Text style={styles.tip}>✓ Keep emergency contacts updated</Text>
          <Text style={styles.tip}>✓ Use SOS only in real danger</Text>
          <Text style={styles.tip}>✓ Inform someone before traveling</Text>
        </View>

      </ScrollView>

      {/* FLOATING SOS BUTTON */}
      <TouchableOpacity style={styles.sosBtn} onPress={() => setShowSOS(true)}>
        <Text style={styles.sosText}>SOS</Text>
      </TouchableOpacity>

      {/* SOS MODAL */}
      <Modal visible={showSOS} transparent animationType="fade">
        <View style={styles.modalBg}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>🚨 Emergency Alert Sent</Text>
            <Text style={styles.modalText}>
              Your contacts & location have been shared.
            </Text>

            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setShowSOS(false)}
            >
              <Text style={{ color: 'white' }}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </View>
  );
}


/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff'
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold'
  },

  subtitle: {
    color: '#666',
    marginBottom: 15
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },

  card: {
    width: '48%',
    backgroundColor: '#f9fafb',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 3
  },

  icon: {
    fontSize: 28,
    marginBottom: 5
  },

  cardTitle: {
    fontWeight: 'bold'
  },

  cardDesc: {
    color: '#666',
    fontSize: 12
  },

  tipsBox: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f3f4f6',
    borderRadius: 12
  },

  tipsTitle: {
    fontWeight: 'bold',
    marginBottom: 10
  },

  tip: {
    marginBottom: 5,
    color: '#444'
  },

  sosBtn: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: 'red',
    padding: 20,
    borderRadius: 50,
    elevation: 5
  },

  sosText: {
    color: 'white',
    fontWeight: 'bold'
  },

  modalBg: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  modalBox: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    width: '80%',
    alignItems: 'center'
  },

  modalTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10
  },

  modalText: {
    textAlign: 'center',
    marginBottom: 15
  },

  closeBtn: {
    backgroundColor: '#ec4899',
    padding: 10,
    borderRadius: 8
  }
});