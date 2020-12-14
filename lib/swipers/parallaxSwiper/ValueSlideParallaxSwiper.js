import React, { useState, useRef, useMemo } from "react";
import { View, StyleSheet, SafeAreaView, Animated, Dimensions } from "react-native";
import { useUpdateEffect } from "../../hooks/lifecycle";
import ValueSlide from "./ValueSlide";

const SCREEN_WIDTH = Dimensions.get("window")?.width;

const ValueSlideParallaxSwiper = ({ slides, index, onIndexChange }) => {
    const swiperRef = useRef();
    const [dragBegin, setDragBegin] = useState(0);

    const nScroll = useRef(new Animated.Value(0)).current;

    useUpdateEffect(() => {
        swiperRef.current.scrollTo({ x: index * SCREEN_WIDTH });
    }, [index]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
            <Animated.ScrollView
                decelerationRate={0.01}
                ref={swiperRef}
                horizontal
                onScrollBeginDrag={(event) => setDragBegin(Math.round(event?.nativeEvent?.contentOffset?.x))}
                onScrollEndDrag={(event) => {
                    const dragEnd = event?.nativeEvent?.contentOffset?.x;
                    const direction = Math.sign(dragBegin - dragEnd);
                    if (Math.abs(dragBegin - dragEnd) > SCREEN_WIDTH / 3) {
                        onIndexChange(index - direction);
                    }
                }}
                snapToOffsets={[SCREEN_WIDTH]}
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: nScroll } } }], {
                    useNativeDriver: true,
                })}
                onMomentumScrollEnd={(event) => {
                    const offset = event?.nativeEvent?.contentOffset?.x;
                    const nextIndex = offset > 0 ? Math.floor(offset / SCREEN_WIDTH) : offset;
                    onIndexChange(nextIndex);
                }}
            >
                {slides?.map((slide, index) => (
                    <View key={index} style={{ width: SCREEN_WIDTH }}>
                        <ValueSlide
                            index={index}
                            title={slide?.title}
                            description={slide?.description}
                            backgroundImage={slide?.backgroundImage}
                            overlayImages={slide?.overlayImages}
                            scrollPosition={nScroll}
                        />
                    </View>
                ))}
            </Animated.ScrollView>
            <View>
                <View style={{ position: "absolute", left: 30, bottom: 48, zIndex: 1, flexDirection: "row" }}>
                    {slides?.map((slide, index) => {
                        const baseVal = index === 0 ? 0 : SCREEN_WIDTH * index;

                        const opacity = nScroll.interpolate({
                            inputRange: [
                                baseVal - SCREEN_WIDTH - 1,
                                baseVal - SCREEN_WIDTH / 3,
                                baseVal + SCREEN_WIDTH / 3,
                                baseVal + SCREEN_WIDTH + 1,
                            ],
                            outputRange: [0, 1, 1, 0],
                        });

                        return (
                            <View key={index} style={[styles.slideIndicator, { backgroundColor: "#F4F4F5" }]}>
                                <Animated.View
                                    style={{ flex: 1, borderRadius: 8, opacity: opacity, backgroundColor: "#069BAB" }}
                                />
                            </View>
                        );
                    })}
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    valueSlidesLinearGradient: {
        flex: 1,
    },
    slideTitle: {
        fontSize: 28,
        fontFamily: "Montserrat-Bold",
        color: "#ffffff",
        textAlign: "left",
        marginLeft: 20,
        width: "50%",
        lineHeight: 45,
    },
    slideSubtitle: {
        fontSize: 15,
        fontFamily: "Montserrat-Medium",
        color: "#aab1ca",
        textAlign: "left",
        lineHeight: 30,
        marginTop: 30,
        marginLeft: 20,
    },
    paginationStyles: {
        marginLeft: 20,
        bottom: 230,
        alignItems: "center",
        alignContent: "center",
        justifyContent: "flex-start",
        width: 100,
    },
    skipButtonContainer: {
        zIndex: 100000,
        alignItems: "flex-end",
        width: "100%",

        position: "absolute",
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

export default ValueSlideParallaxSwiper;
