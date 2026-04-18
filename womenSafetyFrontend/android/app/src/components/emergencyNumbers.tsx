import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Linking,
  ScrollView
} from 'react-native';

const emergencyNumbers = [
  { number: '112', service: 'National Emergency', icon: '🚨' },
  { number: '100', service: 'Police', icon: '👮' },
  { number: '108', service: 'Ambulance', icon: '🚑' },
  { number: '101', service: 'Fire Brigade', icon: '🔥' },
  { number: '1091', service: 'Women Helpline', icon: '🛡️' },
  { number: '181', service: 'Women Distress Helpline', icon: '👩' },
  { number: '1098', service: 'Child Helpline', icon: '👶' },
];

const makeCall = (num: string) => {
  Linking.openURL(`tel:${num}`);
};

const EmergencyNumbersScreen = () => {
  return (
    <ScrollView style={styles.container}>

      <Text style={styles.title}>Emergency Numbers</Text>
      <Text style={styles.subtitle}>
        Quick access numbers for immediate help
      </Text>

      {/* CARDS */}
      {emergencyNumbers.map((item) => (
        <View key={item.number} style={styles.card}>

          <Text style={styles.icon}>{item.icon}</Text>

          <View style={{ flex: 1 }}>
            <Text style={styles.number}>{item.number}</Text>
            <Text style={styles.service}>{item.service}</Text>

            <TouchableOpacity
              style={styles.btn}
              onPress={() => makeCall(item.number)}
            >
              <Text style={styles.btnText}>📞 Call Now</Text>
            </TouchableOpacity>

          </View>
        </View>
      ))}

      {/* FOOTER */}
      <View style={styles.footer}>
        <Text style={styles.footerTitle}>
          International Emergency Numbers
        </Text>

        <View style={styles.footerBox1}>
          <Text style={styles.footerTextBold}>Europe</Text>
          <Text style={styles.footerText}>Dial 112 from any location</Text>
        </View>

        <View style={styles.footerBox2}>
          <Text style={styles.footerTextBold}>Australia</Text>
          <Text style={styles.footerText}>Dial 000 from any location</Text>
        </View>

      </View>

    </ScrollView>
  );
};

export default EmergencyNumbersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold'
  },
  subtitle: {
    color: '#666',
    marginBottom: 15
  },

  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 3,
    alignItems: 'center'
  },

  icon: {
    fontSize: 30,
    marginRight: 15
  },

  number: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#db2777'
  },

  service: {
    color: '#555',
    marginBottom: 10
  },

  btn: {
    backgroundColor: '#ec4899',
    padding: 10,
    borderRadius: 10
  },

  btnText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold'
  },

  footer: {
    marginTop: 20,
    padding: 15,
    borderRadius: 12,
    backgroundColor: '#f9f9f9'
  },

  footerTitle: {
    fontWeight: 'bold',
    marginBottom: 10
  },

  footerBox1: {
    backgroundColor: '#ffe4e6',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10
  },

  footerBox2: {
    backgroundColor: '#ede9fe',
    padding: 10,
    borderRadius: 10
  },

  footerTextBold: {
    fontWeight: 'bold'
  },

  footerText: {
    color: '#555'
  }
});