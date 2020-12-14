import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';

import FloatingLabelInput from '../../lib/inputs/FloatingLabelInput';

const Inputs = () => {
  const [basicUsageVal, setBasicUsageVal] = useState('');
  const [secureInputVal, setSecureInputVal] = useState('');
  const [inputWithIconVal, setInputWithIconVal] = useState('');

  return (
    <ScrollView keyboardShouldPersistTaps="never" style={styles.container}>
      <FloatingLabelInput
        placeholder="Floating Label"
        value={basicUsageVal}
        onChangeText={setBasicUsageVal}
        containerstyle={{ marginTop: 20 }}
      />
      <FloatingLabelInput
        placeholder="Secure input"
        value={secureInputVal}
        onChangeText={setSecureInputVal}
        containerstyle={{ marginTop: 20 }}
        secureTextEntry
      />
      <FloatingLabelInput
        placeholder="Floating Label w/ right component"
        value={inputWithIconVal}
        onChangeText={setInputWithIconVal}
        containerstyle={{ marginTop: 20 }}
        InputRightComponent={() => (
          <Image source={require('../assets/images/calendar-ic.png')} style={{ alignSelf: 'center', marginTop: 6 }} />
        )}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
  },
});

export default Inputs;
