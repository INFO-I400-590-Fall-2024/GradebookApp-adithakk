import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase.config';
export default function FirebaseFetcher() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'students'));
      const studentData = [];
      querySnapshot.forEach((doc) => {
        studentData.push({ id: doc.id, ...doc.data() });
      });
      setStudents(studentData);
    };

    fetchData();
  }, []);

  return (
    <View>
      {students.map((student) => (
        <Text key={student.id}>{student.Name}</Text>
      ))}
    </View>
  );
}
