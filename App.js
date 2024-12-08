import React, { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedProps,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Circle, Svg, LinearGradient, Stop } from "react-native-svg";
import 'react-native-gesture-handler';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const radius = 45;
const circumference = radius * Math.PI * 2;
const duration = 60000;  // Duration for both circles (60 seconds)
const innerDuration = 60000;  // Duration for the inner circle (60 seconds)

const App = () => {
  // Shared value for the stroke dash offset
  const strokeOffset = useSharedValue(circumference);

  // Percentage for the outer circle
  const percentage = useDerivedValue(() => {
    const number = ((circumference - strokeOffset.value) / circumference) * 100;
    return withTiming(number, { duration: duration });
  });

  // Interpolate the gradient color based on the percentage
  const strokeColor = useDerivedValue(() => {
    return interpolateColor(percentage.value, [0, 50, 100], [
      "#9E4784",
      "#66347F",
      "#37306B",
    ]);
  });

  // Animated props for the outer circle (with dynamic gradient)
  const animatedCircleProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: withTiming(strokeOffset.value, { duration: duration }),
      stroke: "url(#dynamicGradient)",  // Reference the dynamic gradient
    };
  });

  // Animated props for the inner (smaller) circle
  const animatedSmallCircleProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: withTiming(strokeOffset.value, { duration: innerDuration }), // Inner circle uses the same duration
      stroke: "gray",
    };
  });

  // Set the initial value for the animation
  useEffect(() => {
    strokeOffset.value = 0;
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          backgroundColor: "red",
          width: 170,
          height: 170,
          borderRadius: 170 / 2,
          position: "absolute",
        }}
      ></View>

      <Svg height="80%" width="80%" viewBox="0 0 100 100">
        {/* Define the Dynamic Gradient */}
        <LinearGradient id="dynamicGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor={strokeColor.value} stopOpacity="1" />
          <Stop offset="100%" stopColor={strokeColor.value} stopOpacity="1" />
        </LinearGradient>

        {/* Background circle (gray) */}
        <Circle
          cx="50"
          cy="50"
          r="45"
          stroke="#E7E7E7"
          strokeWidth="10"
          fill="transparent"
        />

        {/* Rotated Inner Circle (smaller circle with slower animation) */}
        <AnimatedCircle
          animatedProps={animatedSmallCircleProps}
          cx="50"
          cy="50"
          r="35"
          strokeDasharray={`${radius * Math.PI * 2}`}
          strokeWidth="10"
          fill="transparent"
          transform="rotate(-90 50 50)" // Rotate by -90 degrees to start from top
        />

        {/* Rotated Outer Circle (loader circle with dynamic gradient animation) */}
        <AnimatedCircle
          animatedProps={animatedCircleProps}
          cx="50"
          cy="50"
          r="45"
          strokeDasharray={`${radius * Math.PI * 2}`}
          strokeWidth="10"
          fill="transparent"
          strokeLinecap="round"
          transform="rotate(-90 50 50)" // Rotate by -90 degrees to start from top
        />
      </Svg>
    </View>
  );
};

export default App;
