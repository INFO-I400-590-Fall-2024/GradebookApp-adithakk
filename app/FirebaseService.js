import { collection, addDoc } from 'firebase/firestore';

// Example function to add a student
async function addStudent(studentData) {
  try {
    const docRef = await addDoc(collection(db, 'students'), studentData);
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}