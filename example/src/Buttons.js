import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import BlockButton from '../../lib/buttons/BlockButton';
import GradientBlockButton from '../../lib/buttons/GradientBlockButton';

const Buttons = () => {
  const [floatingLabelVal, setFloatingLabelVal] = useState('');
  return (
    <ScrollView keyboardShouldPersistTaps="never" style={styles.container}>
      <GradientBlockButton
        onPress={() => {}}
        text="Gradient Button"
        containerStyle={{ alignSelf: 'stretch', marginTop: 20 }}
      />
      <BlockButton loading text="Block Button" containerStyle={{ alignSelf: 'stretch', marginTop: 20 }} />
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

export default Buttons;
