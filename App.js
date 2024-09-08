import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [c, setC] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const solveQuadratic = () => {
    const aNum = parseFloat(a);
    const bNum = parseFloat(b);
    const cNum = parseFloat(c);

    // Reset kết quả và lỗi
    setResult(null);
    setError('');

    // Kiểm tra input trống
    if (a.trim() === '' || b.trim() === '' || c.trim() === '') {
      setError('Vui lòng nhập đầy đủ các hệ số!');
      return;
    }

    // Kiểm tra giá trị nhập có hợp lệ không
    if (isNaN(aNum) || isNaN(bNum) || isNaN(cNum)) {
      setError('Hệ số phải là số hợp lệ!');
      return;
    }

    // Xử lý khi a = 0 (phương trình bậc nhất hoặc đặc biệt)
    if (aNum === 0) {
      // Nếu b = 0 và c khác 0, vô nghiệm
      if (bNum === 0) {
        if (cNum !== 0) {
          setResult('Phương trình vô nghiệm');
        } else {
          setResult('Phương trình có vô số nghiệm');
        }
      } else {
        // Phương trình bậc nhất bx + c = 0
        const x = -cNum / bNum;
        setResult(`Phương trình bậc nhất có nghiệm: x = ${x.toFixed(2)}`);
      }
    } else {
      // Giải phương trình bậc 2 khi a khác 0
      const delta = bNum * bNum - 4 * aNum * cNum;

      if (delta > 0) {
        const x1 = (-bNum + Math.sqrt(delta)) / (2 * aNum);
        const x2 = (-bNum - Math.sqrt(delta)) / (2 * aNum);
        setResult(`Phương trình có 2 nghiệm: x1 = ${x1.toFixed(2)}, x2 = ${x2.toFixed(2)}`);
      } else if (delta === 0) {
        const x = -bNum / (2 * aNum);
        setResult(`Phương trình có nghiệm kép: x = ${x.toFixed(2)}`);
      } else {
        setResult('Phương trình vô nghiệm thực');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Giải phương trình bậc 2</Text>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Nhập hệ số a"
        keyboardType="numeric"
        value={a}
        onChangeText={setA}
      />
      <TextInput
        style={styles.input}
        placeholder="Nhập hệ số b"
        keyboardType="numeric"
        value={b}
        onChangeText={setB}
      />
      <TextInput
        style={styles.input}
        placeholder="Nhập hệ số c"
        keyboardType="numeric"
        value={c}
        onChangeText={setC}
      />

      <Button title="Giải phương trình" onPress={solveQuadratic} />

      {result && <Text style={styles.result}>{result}</Text>}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#007BFF',
    borderWidth: 2,
    borderRadius: 5,
    width: '100%',
    marginBottom: 15,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  result: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007BFF',
  },
  error: {
    color: 'red',
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
  },
});
