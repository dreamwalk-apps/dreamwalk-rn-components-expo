import React from "react";
import { View, StyleSheet, Text, Image, ActivityIndicator, Pressable, Easing } from "react-native";
// import LinearGradient from 'react-native-linear-gradient';
import { LinearGradient } from "expo-linear-gradient";

import AnimatedGradientTransition from "./AnimatedGradientTransition";

const BUTTON_HEIGHT = 50;

const GradientBlockButton = ({
    text,
    onPress,
    containerStyle,
    buttonStyle,
    bodyStyle,
    textStyle,
    textColor,
    gradientColors,
    gradientStart,
    gradientEnd,
    loading,
    disabled,
    gradientTransitionDuration,
    PostFixComponent,
}) => {
    return (
        <Pressable
            delayPressIn={200}
            style={[{ height: BUTTON_HEIGHT }, containerStyle]}
            onPress={onPress}
            disabled={loading || disabled}
        >
            <AnimatedGradientTransition
                start={gradientStart}
                end={gradientEnd}
                locations={[0, 1]}
                colors={gradientColors}
                animated={{
                    toValue: 1,
                    duration: gradientTransitionDuration,
                    easing: Easing.linear,
                }}
                style={[styles.gradient, buttonStyle]}
            >
                {loading && <ActivityIndicator size="small" color="#FFFFFF" />}
                {!loading && (
                    <View style={[styles.body, bodyStyle]}>
                        <Text style={[styles.buttonText, { color: textColor }, textStyle]}>{text}</Text>
                        {PostFixComponent && <PostFixComponent />}
                    </View>
                )}
            </AnimatedGradientTransition>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    buttonText: {
        fontSize: 17,
    },
    gradient: {
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        flex: 1,
    },
    body: {
        flexDirection: "row",
        alignItems: "center",
    },
});

GradientBlockButton.defaultProps = {
    gradientColors: ["rgb(37, 155, 228)", "rgb(1, 116, 185)"],
    textColor: "#FFF",
    gradientTransitionDuration: 150,
    gradientStart: {
        x: -0.03,
        y: 0.47,
    },
    gradientEnd: {
        x: 1.03,
        y: 0.53,
    },
};

export default GradientBlockButton;
