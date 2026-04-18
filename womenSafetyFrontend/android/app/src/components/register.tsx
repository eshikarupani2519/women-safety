import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView
} from 'react-native';

const RegisterScreen = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [verified, setVerified] = useState(false);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  // SEND OTP
  const sendOtp = async () => {
    try {
      const res = await fetch('http://YOUR_IP:8000/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: form.phone })
      });

      const data = await res.json();

      if (res.ok) {
        Alert.alert('Success', 'OTP Sent Successfully');
        setOtpSent(true);
      } else {
        Alert.alert('Error', data.detail || 'Failed to send OTP');
      }
    } catch {
      Alert.alert('Error', 'Backend not reachable');
    }
  };

  // VERIFY OTP
  const verifyOtp = async () => {
    try {
      const res = await fetch('http://YOUR_IP:8000/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: form.phone,
          otp: otp
        })
      });

      const data = await res.json();

      if (res.ok) {
        Alert.alert('Success', 'OTP Verified');
        setVerified(true);
      } else {
        Alert.alert('Error', data.detail || 'Invalid OTP');
      }
    } catch {
      Alert.alert('Error', 'Backend not reachable');
    }
  };

  // REGISTER
  const handleRegister = async () => {
    if (!verified) {
      Alert.alert('Error', 'Please verify OTP first');
      return;
    }

    try {
      setLoading(true);

      const res = await fetch('http://YOUR_IP:8000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
        Alert.alert('Success', 'Registered Successfully');
      } else {
        Alert.alert('Error', data.detail || 'Registration Failed');
      }
    } catch {
      Alert.alert('Error', 'Backend not reachable');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <Text style={styles.title}>Women Safety Registration</Text>

      {!success ? (
        <View>

          {/* NAME */}
          <TextInput
            placeholder="Full Name"
            style={styles.input}
            value={form.name}
            onChangeText={(text) => handleChange('name', text)}
          />

          {/* EMAIL */}
          <TextInput
            placeholder="Email"
            style={styles.input}
            value={form.email}
            onChangeText={(text) => handleChange('email', text)}
          />

          {/* PHONE */}
          <TextInput
            placeholder="Phone"
            style={styles.input}
            value={form.phone}
            onChangeText={(text) => handleChange('phone', text)}
          />

          {/* SEND OTP */}
          <TouchableOpacity style={styles.btn} onPress={sendOtp}>
            <Text style={styles.btnText}>Send OTP</Text>
          </TouchableOpacity>

          {/* OTP */}
          {otpSent && (
            <>
              <TextInput
                placeholder="Enter OTP"
                style={styles.input}
                value={otp}
                onChangeText={setOtp}
              />

              <TouchableOpacity style={styles.btn2} onPress={verifyOtp}>
                <Text style={styles.btnText}>Verify OTP</Text>
              </TouchableOpacity>
            </>
          )}

          {/* REGISTER */}
          <TouchableOpacity
            style={[styles.btn3, !verified && { opacity: 0.5 }]}
            onPress={handleRegister}
            disabled={!verified || loading}
          >
            <Text style={styles.btnText}>
              {loading ? 'Registering...' : 'Register Now'}
            </Text>
          </TouchableOpacity>

        </View>
      ) : (
        <Text style={styles.success}>
          Registered Successfully ✅
        </Text>
      )}

    </ScrollView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
    justifyContent: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10
  },
  btn: {
    backgroundColor: '#ec4899',
    padding: 15,
    borderRadius: 10,
    marginTop: 10
  },
  btn2: {
    backgroundColor: '#a855f7',
    padding: 15,
    borderRadius: 10,
    marginTop: 10
  },
  btn3: {
    backgroundColor: '#db2777',
    padding: 15,
    borderRadius: 10,
    marginTop: 20
  },
  btnText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  success: {
    fontSize: 18,
    color: 'green',
    textAlign: 'center'
  }
});