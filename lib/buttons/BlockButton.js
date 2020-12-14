import React from 'react';
import { View, StyleSheet, Text, ActivityIndicator, Pressable } from 'react-native';

const BUTTON_HEIGHT = 50;

const BlockButton = ({
  text,
  onPress,
  containerStyle,
  buttonStyle,
  bodyStyle,
  textStyle,
  textColor,
  loading,
  disabled,
  PostFixComponent,
}) => {
  return (
    <Pressable
      delayPressIn={200}
      style={[styles.button, containerStyle]}
      onPress={onPress}
      disabled={loading || disabled}>
      {loading && <ActivityIndicator size="small" color="#FFFFFF" />}
      {!loading && (
        <View style={[styles.body, bodyStyle]}>
          <Text style={[styles.buttonText, { color: textColor }, textStyle]}>{text}</Text>
          {PostFixComponent && <PostFixComponent />}
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 17,
  },
  button: {
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'black',
    height: BUTTON_HEIGHT,
  },
  body: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

BlockButton.defaultProps = {
  textColor: '#FFF',
};

export default BlockButton;
