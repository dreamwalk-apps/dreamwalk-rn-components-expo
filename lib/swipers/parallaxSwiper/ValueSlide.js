import React from 'react';
import { View, Animated, Image, Text, StyleSheet, Dimensions } from 'react-native';
const SCREEN_WIDTH = Dimensions.get('window')?.width;

const ValueSlide = ({ title, description, backgroundImage, overlayImages, scrollPosition, index }) => {
  const baseValue = index > 0 ? SCREEN_WIDTH * index : 0;

  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: 186, justifyContent: 'flex-end', alignSelf: 'center', marginTop: 95 }}>
        <Animated.Image source={backgroundImage} />
        {overlayImages?.map((overlayImage, overlayImageIndex) => {
          const imageComponentX = scrollPosition.interpolate({
            inputRange: [
              baseValue - SCREEN_WIDTH,
              baseValue - SCREEN_WIDTH / 2,
              baseValue,
              baseValue + SCREEN_WIDTH / 2,
              baseValue + SCREEN_WIDTH,
            ],
            outputRange: [
              overlayImage.translateMax,
              overlayImage.translateMax,
              0,
              -overlayImage.translateMax,
              -overlayImage.translateMax,
            ],
          });

          return (
            <Animated.Image
              key={overlayImageIndex}
              source={overlayImage?.uri}
              style={[
                styles.overlayImage,
                {
                  zIndex: index + 1,
                  transform: [{ translateX: imageComponentX }],
                  ...overlayImage?.basePosition,
                },
              ]}
            />
          );
        })}
      </View>
      <View style={{ marginTop: 54 }}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlayImage: {
    position: 'absolute',
  },
  title: {
    // fontFamily: 'NunitoSans-ExtraBold',
    fontSize: 23,
    lineHeight: 34,
    color: '#394C62',
    alignSelf: 'flex-start',
    marginLeft: 30,
  },
  description: {
    // fontFamily: 'OpenSans-Bold',
    fontSize: 15,
    lineHeight: 26,
    color: '#5D6F88',
    alignSelf: 'flex-start',
    marginLeft: 30,
    marginTop: 12,
  },
});

export default ValueSlide;
