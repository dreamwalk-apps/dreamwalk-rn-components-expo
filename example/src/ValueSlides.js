import React, { useState, useRef, useMemo } from 'react';
import { View, StyleSheet, SafeAreaView, Animated, Dimensions } from 'react-native';
import BlockButton from '../../lib/buttons/BlockButton';
import ValueSlideParallaxSwiper from '../../lib/swipers/parallaxSwiper/ValueSlideParallaxSwiper';

const SCREEN_WIDTH = Dimensions.get('window')?.width;
const MAX_OVERLAY_TRANSLATE_X = -58;
const SLIDES = [
  {
    title: 'Take detailed Surveys',
    description: `In AnaAudit, we survey you on a\nnumber of different and complex\ncases, often based on real-life\npatient scenarios`,
    backgroundImage: require('../assets/images/slide-1-background.png'),
    overlayImages: [
      {
        uri: require('../assets/images/slide-1-component-1.png'),
        basePosition: { bottom: 16, right: 46 },
        translateMax: MAX_OVERLAY_TRANSLATE_X,
      },
      {
        uri: require('../assets/images/slide-1-component-2.png'),
        basePosition: { top: 46, left: 17 },
        translateMax: -MAX_OVERLAY_TRANSLATE_X,
      },
    ],
  },
  {
    title: 'Join our community',
    description: `Join our growing community of\naccredited anaesthetists.\nThrough our verification process,\nwe ensure that each survey result\nis completed by a verified medical\nprofessional`,
    backgroundImage: require('../assets/images/slide-2-background.png'),
    overlayImages: [
      {
        uri: require('../assets/images/slide-2-component-1.png'),
        basePosition: { bottom: 44, right: 32 },
        translateMax: MAX_OVERLAY_TRANSLATE_X,
      },
      {
        uri: require('../assets/images/slide-2-component-2.png'),
        basePosition: { top: 0, left: 85 },
        translateMax: -MAX_OVERLAY_TRANSLATE_X,
      },
    ],
  },
  {
    title: 'View survey results',
    description: `Find out how you compare with\nother anaesthetists. See what\ntechniques, procedures and\nmedications are being used today\nby your peers`,
    backgroundImage: require('../assets/images/slide-3-background.png'),
    overlayImages: [
      {
        uri: require('../assets/images/slide-3-component-1.png'),
        basePosition: { bottom: 0, right: 29 },
        translateMax: MAX_OVERLAY_TRANSLATE_X,
      },
      {
        uri: require('../assets/images/slide-3-component-2.png'),
        basePosition: { bottom: 0, left: 0 },
        translateMax: -MAX_OVERLAY_TRANSLATE_X,
      },
    ],
  },
];

const ValueSlides = ({ navigation }) => {
  const swiperRef = useRef();
  const [slideIndex, setSlideIndex] = useState(0);

  const onNextPressed = () => {
    if (slideIndex < SLIDES?.length - 1) {
      setSlideIndex(slideIndex + 1);
    } else {
      setSlideIndex(0);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
      <ValueSlideParallaxSwiper slides={SLIDES} index={slideIndex} onIndexChange={setSlideIndex} />
      <BlockButton text={'Next'} onPress={() => onNextPressed()} containerStyle={styles.nextButton} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  valueSlidesLinearGradient: {
    flex: 1,
  },
  slideTitle: {
    fontSize: 28,
    fontFamily: 'Montserrat-Bold',
    color: '#ffffff',
    textAlign: 'left',
    marginLeft: 20,
    width: '50%',
    lineHeight: 45,
  },
  slideSubtitle: {
    fontSize: 15,
    fontFamily: 'Montserrat-Medium',
    color: '#aab1ca',
    textAlign: 'left',
    lineHeight: 30,
    marginTop: 30,
    marginLeft: 20,
  },
  paginationStyles: {
    marginLeft: 20,
    bottom: 230,
    // bottom: 0,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'flex-start',
    width: 100,
  },
  skipButtonContainer: {
    zIndex: 100000,
    alignItems: 'flex-end',
    width: '100%',

    position: 'absolute',
    right: 0,
    top: 0,
    marginTop: 40,
  },
  nextButton: {
    margin: 30,
  },
  slideIndicator: {
    width: 20,
    height: 8,
    borderRadius: 8,
    marginRight: 10,
  },
});

export default ValueSlides;
