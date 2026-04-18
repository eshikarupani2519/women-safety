import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
  Linking
} from 'react-native';

interface Contact {
  id: number;
  name: string;
  phone: string;
  relationship: string;
}

const EmergencyContactsScreen = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    name: '',
    phone: '',
    relationship: ''
  });

  // GET ALL CONTACTS
  const fetchContacts = async () => {
    try {
      const res = await fetch('http://YOUR_IP:8000/contacts/all');
      const data = await res.json();
      setContacts(data);
    } catch (err) {
      Alert.alert('Error', 'Failed to load contacts');
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // ADD CONTACT
  const handleAddContact = async () => {
    try {
      const res = await fetch('http://YOUR_IP:8000/contacts/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      if (res.ok) {
        Alert.alert('Success', 'Contact added');
        setForm({ name: '', phone: '', relationship: '' });
        setShowForm(false);
        fetchContacts();
      } else {
        Alert.alert('Error', 'Failed to add contact');
      }
    } catch {
      Alert.alert('Error', 'Backend not reachable');
    }
  };

  // SEND ALERT
  const handleNotify = async (id: number, name: string) => {
    try {
      const res = await fetch(
        `http://YOUR_IP:8000/contacts/alert/${id}`,
        { method: 'POST' }
      );

      if (res.ok) {
        Alert.alert('Success', `Alert sent to ${name}`);
      }
    } catch {
      Alert.alert('Error', 'Failed to send alert');
    }
  };

  // CALL CONTACT
  const callContact = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  const renderItem = ({ item }: { item: Contact }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.rel}>{item.relationship}</Text>
      <Text style={styles.phone}>{item.phone}</Text>

      <TouchableOpacity
        style={styles.callBtn}
        onPress={() => callContact(item.phone)}
      >
        <Text style={styles.btnText}>Call</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.alertBtn}
        onPress={() => handleNotify(item.id, item.name)}
      >
        <Text style={styles.btnText}>Send Alert</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Emergency Contacts</Text>

      {/* ADD BUTTON */}
      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => setShowForm(!showForm)}
      >
        <Text style={styles.btnText}>+ Add Contact</Text>
      </TouchableOpacity>

      {/* FORM */}
      {showForm && (
        <View style={styles.form}>
          <TextInput
            placeholder="Name"
            style={styles.input}
            value={form.name}
            onChangeText={(t) => setForm({ ...form, name: t })}
          />

          <TextInput
            placeholder="Phone"
            style={styles.input}
            value={form.phone}
            onChangeText={(t) => setForm({ ...form, phone: t })}
          />

          <TextInput
            placeholder="Relationship"
            style={styles.input}
            value={form.relationship}
            onChangeText={(t) =>
              setForm({ ...form, relationship: t })
            }
          />

          <TouchableOpacity
            style={styles.saveBtn}
            onPress={handleAddContact}
          >
            <Text style={styles.btnText}>Save</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* CONTACT LIST */}
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />

    </View>
  );
};

export default EmergencyContactsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10
  },
  addBtn: {
    backgroundColor: '#ec4899',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10
  },
  form: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 3
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 8,
    borderRadius: 8
  },
  saveBtn: {
    backgroundColor: '#a855f7',
    padding: 12,
    borderRadius: 10
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 2
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  rel: {
    color: '#666'
  },
  phone: {
    marginBottom: 10
  },
  callBtn: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 8,
    marginBottom: 5
  },
  alertBtn: {
    backgroundColor: '#ec4899',
    padding: 10,
    borderRadius: 8
  },
  btnText: {
    color: 'white',
    textAlign: 'center'
  }
});