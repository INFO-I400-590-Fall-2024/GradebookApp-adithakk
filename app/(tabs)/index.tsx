import React, { useState } from 'react';
import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import FirebaseFetcher from "../../components/FirebaseFetcher";
import { db } from "../../firebase.config";

async function addStudent(studentData: object, setError: React.Dispatch<React.SetStateAction<string>>, setSuccess: React.Dispatch<React.SetStateAction<string>>) {
  try {
    const docRef = await addDoc(collection(db, 'students'), studentData);
    console.log('Document written with ID: ', docRef.id);
    setError(''); // Clear any previous error message
    setSuccess('Student added successfully!');
  } catch (e) {
    console.error('Error adding document: ', e);
    setError('Failed to add student');
    setSuccess(''); // Clear any success message if there's an error
  }
}

export default function Index() {
  const [name, setName] = useState('');
  const [grades, setGrades] = useState('');
  const [score, setScore] = useState('');
  const [absences, setAbsences] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleAddStudent = () => {
    if (!name || !grades || !score || !absences) {
      setError('All fields are required.');
      setSuccess('');
      return;
    }
    
    const studentData = {
      name: name.trim(),
      grades: grades.trim(),
      score: parseFloat(score),
      absences: parseInt(absences, 10),
    };
    
    addStudent(studentData, setError, setSuccess);
    setName('');
    setGrades('');
    setScore('');
    setAbsences('');
  };

  return (
    <View style={styles.container}>
      <FirebaseFetcher />
      {/* <Text style={styles.title}>Add a New Student</Text> */}
      
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      
      <TextInput
        placeholder="Grades"
        value={grades}
        onChangeText={setGrades}
        style={styles.input}
      />
      
      <TextInput
        placeholder="Score"
        value={score}
        onChangeText={setScore}
        keyboardType="numeric"
        style={styles.input}
      />
      
      <TextInput
        placeholder="Absences"
        value={absences}
        onChangeText={setAbsences}
        keyboardType="numeric"
        style={styles.input}
      />
      
      <TouchableOpacity style={styles.button} onPress={handleAddStudent}>
        <Text style={styles.buttonText}>Add Student</Text>
      </TouchableOpacity>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      {success ? <Text style={styles.successText}>{success}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 24,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    height: 48,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#FF4500',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
  successText: {
    color: 'green',
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
});