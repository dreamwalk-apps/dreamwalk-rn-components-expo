import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, Pressable } from 'react-native';

const Menu = ({ navigation }) => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
          <View style={styles.body}>
            <View style={styles.row}>
              <Pressable onPress={() => navigation?.navigate('inputs')}>
                <Text>Inputs</Text>
              </Pressable>
            </View>
            <View style={styles.row}>
              <Pressable onPress={() => navigation?.navigate('buttons')}>
                <Text>Buttons</Text>
              </Pressable>
            </View>
            <View style={styles.row}>
              <Pressable onPress={() => navigation?.navigate('value_slides')}>
                <Text>Value Slide Swiper</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    backgroundColor: '#FFF',
  },
  body: {
    flex: 1,
    backgroundColor: '#FFF',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    marginVertical: 15,
  },
});

export default Menu;
