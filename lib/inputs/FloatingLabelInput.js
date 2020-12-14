import React, { useRef, useEffect, useState, forwardRef } from 'react';
import { View, TextInput, Animated, TouchableWithoutFeedback, StyleSheet, Image, Text, Platform } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { usePrevious, useUpdateEffect } from '../hooks/lifecycle';

const PLACEHOLDER_SCALE_AFTER = 0.75;
const PLACEHOLDER_X_AFTER = -16;
const PLACEHOLDER_Y_AFTER = Platform.OS === 'ios' ? -18 : -12;
const INPUT_TOP_MARGIN = 15;
const PLACEHOLDER_POSITION_END = 'end';
const PLACEHOLDER_POSITION_START = 'start';

const FloatingLabelInput = forwardRef(
  (
    {
      value,
      placeholder,
      multiline,
      maxCharacters,
      maxLength,
      secureTextEntry,
      onChangeText,
      autoCapitalize,
      keyboardType,
      containerstyle,
      notEditable,
      onSubmitEditing,
      onLayout,
      hasError,
      InputRightComponent,
      InputLeftComponent,
      containerProps,
      onFocus,
      onBlur,
      textInputProps,
    },
    inputRef,
  ) => {
    const [_secureTextEntry, setSecureTextEntry] = useState(secureTextEntry);
    const placeholderScale = useRef(new Animated.Value(value ? PLACEHOLDER_SCALE_AFTER : 1)).current;
    const placeholderY = useRef(new Animated.Value(value ? PLACEHOLDER_Y_AFTER : 0)).current;
    const placeholderX = useRef(new Animated.Value(value ? PLACEHOLDER_X_AFTER : 0)).current;

    const [placeholderHeight, setPlaceholderHeight] = useState(0);
    const [inputWidth, setInputWidth] = useState(0);
    const [placeholderPosition, setPlaceholderPosition] = useState(
      value ? PLACEHOLDER_POSITION_END : PLACEHOLDER_POSITION_START,
    );
    const previousValue = usePrevious(value);

    useEffect(() => {
      if (value) {
        placeholderX.setValue((inputWidth * PLACEHOLDER_SCALE_AFTER - inputWidth) / 2);
      } else {
        placeholderX.setValue(0);
      }
    }, [inputWidth]);

    // If the value is set programatically rather than via user input
    // then placeholder position needs to be manually updated
    useUpdateEffect(() => {
      if (!previousValue && value) {
        setPlaceholderPosition(PLACEHOLDER_POSITION_END);
        placeholderScale.setValue(PLACEHOLDER_SCALE_AFTER);
        placeholderY.setValue(PLACEHOLDER_Y_AFTER);
        placeholderX.setValue((inputWidth * PLACEHOLDER_SCALE_AFTER - inputWidth) / 2);
      }
    }, [value]);

    const _onFocus = () => {
      Animated.parallel([
        Animated.timing(placeholderY, {
          toValue: PLACEHOLDER_Y_AFTER,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(placeholderX, {
          toValue: (inputWidth * PLACEHOLDER_SCALE_AFTER - inputWidth) / 2,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(placeholderScale, {
          toValue: PLACEHOLDER_SCALE_AFTER,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setPlaceholderPosition(PLACEHOLDER_POSITION_END);
      });

      if (onFocus) {
        onFocus();
      }
    };

    const _onBlur = () => {
      if (value === '') {
        Animated.parallel([
          Animated.timing(placeholderY, {
            toValue: 5,
            duration: 250,
            useNativeDriver: true,
          }),
          Animated.timing(placeholderX, {
            toValue: 0,
            duration: 250,
            useNativeDriver: true,
          }),
          Animated.timing(placeholderScale, {
            toValue: 1,
            duration: 250,
            useNativeDriver: true,
          }),
        ]).start(() => {
          setPlaceholderPosition(PLACEHOLDER_POSITION_START);
        });
      }

      if (onBlur) {
        onBlur();
      }
    };

    const onLayoutPlaceholder = (e) => {
      const { height } = e.nativeEvent.layout;

      setPlaceholderHeight(height);
    };

    const onInputLayout = (event) => {
      setInputWidth(event?.nativeEvent?.layout?.width);
    };

    return (
      <View style={containerstyle} {...containerProps} onLayout={onLayout}>
        <TouchableWithoutFeedback onPress={() => inputRef?.current?.focus()}>
          <View style={styles.inputContainer} onLayout={onInputLayout}>
            <Animated.View
              style={[
                styles.placeholderContainer,
                {
                  height: placeholderHeight,
                  width: inputWidth,
                  top: INPUT_TOP_MARGIN - placeholderHeight / 2,
                  marginTop: 20,
                  transform: [{ translateY: placeholderY }],
                },
              ]}>
              <Animated.Text
                onLayout={onLayoutPlaceholder}
                numberOfLines={1}
                style={[
                  styles.placeholder,
                  {
                    width: inputWidth,
                    transform: [{ translateX: placeholderX }, { scale: placeholderScale }],
                  },
                ]}>
                {placeholder}
              </Animated.Text>
            </Animated.View>
            <View style={{ flex: 1, flexDirection: 'row', marginBottom: 3 }}>
              {InputLeftComponent && (
                <InputLeftComponent placeholderShown={placeholderPosition === PLACEHOLDER_POSITION_START} />
              )}
              <TextInput
                secureTextEntry={_secureTextEntry}
                ref={inputRef}
                scrollEnabled={false}
                onFocus={_onFocus}
                onBlur={_onBlur}
                value={value}
                multiline={multiline}
                style={styles.input}
                onChangeText={onChangeText}
                autoCapitalize={autoCapitalize}
                keyboardType={keyboardType}
                editable={!notEditable}
                // selectionColor={Colours.textPrimary}
                onSubmitEditing={onSubmitEditing}
                maxLength={maxLength}
                {...textInputProps}
              />
              {secureTextEntry && (
                <TouchableOpacity
                  delayPressIn={250}
                  onPress={() => setSecureTextEntry(!_secureTextEntry)}
                  style={styles.secureEntryContainer}>
                  <Image source={require('../icons/show-ic.png')} />
                </TouchableOpacity>
              )}
              {InputRightComponent && <InputRightComponent />}
            </View>
            <View style={[styles.separator, { backgroundColor: hasError ? '#FF476B' : '#DEE0E5' }]} />
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  separator: {
    height: 1,
  },
  placeholder: {
    // fontFamily: "Jost-Medium",
    fontSize: 16,
    color: '#BCC0C9',
    letterSpacing: 0.2,
    lineHeight: 20,
    position: 'absolute',
    textAlign: 'left',
  },
  inputContainer: {
    // backgroundColor: '#F5F6F7',
    minHeight: 57,
    justifyContent: 'flex-start',
  },
  input: {
    flex: 1,

    margin: 0,
    padding: 0,
    // fontFamily: 'NunitoSans-ExtraBold',
    fontSize: 16,
    letterSpacing: 0.2,
    // color: Colours.textPrimary,
    // paddingTop: 25,
    // paddingHorizontal: 25,
    paddingBottom: Platform.OS === 'ios' ? 5 : 0,
    // marginBottom: 5,
    marginTop: INPUT_TOP_MARGIN * 2,
    // backgroundColor: 'cyan',
  },
  secureEntryContainer: {
    justifyContent: 'flex-end',
    height: '100%',
    paddingBottom: 15,
    paddingLeft: 15,
  },
  placeholderContainer: {
    position: 'absolute',
    justifyContent: 'flex-start',
  },
});

export default FloatingLabelInput;
