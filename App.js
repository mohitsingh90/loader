import React, { useEffect } from "react";
import { View } from "react-native";
import Animated, { interpolateColor, useAnimatedProps, useDerivedValue, useSharedValue, withTiming } from "react-native-reanimated";
import { Circle, Svg } from "react-native-svg";
import 'react-native-gesture-handler';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const radius = 45;
const circumference = radius * Math.PI * 2;
const duration = 6000;  // Duration for the outer circle (faster)
const innerDuration = 8000;  // Duration for the inner circle (slower)

const App = () => {

  const strokeOffset = useSharedValue(circumference);

  // Percentage for the outer circle
  const percentage = useDerivedValue(() => {
    const number = ((circumference - strokeOffset.value) / circumference ) * 100;
    return withTiming(number, { duration: duration });
  });

  // Stroke color for the outer circle
  const strokeColor = useDerivedValue(() => {
    return interpolateColor(
      percentage.value,
      [0, 50, 100],
      ["#9E4784", "#66347F", "#37306B"]
    );
  });

  // Animated props for the outer circle
  const animatedCircleProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: withTiming(strokeOffset.value, { duration: duration }),
      stroke: strokeColor.value,
    };
  });

  // Animated props for the inner (smaller) circle
  const animatedSmallCircleProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: withTiming(strokeOffset.value, { duration: innerDuration }),  // Use innerDuration for slower animation
      stroke: "gray",
    };
  });

  useEffect(() => {
    strokeOffset.value = 0;  // Start animation when the component mounts
  }, []);

  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <View style={{backgroundColor: "red", width: 170, height: 170, borderRadius: 170 / 2, position: 'absolute',}}></View>
      
      <Svg height="80%" width="80%" viewBox="0 0 100 100">
        {/* Background circle */}
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
          transform="rotate(-90 50 50)"  // Rotate by -90 degrees to start from top
        />
        
        {/* Rotated Outer Circle (loader circle with faster animation) */}
        <AnimatedCircle
          animatedProps={animatedCircleProps}
          cx="50"
          cy="50"
          r="45"
          strokeDasharray={`${radius * Math.PI * 2}`}
          strokeWidth="10"
          fill="transparent"
          strokeLinecap="round"
          transform="rotate(-90 50 50)"  // Rotate by -90 degrees to start from top
        />
      </Svg>
    </View>
  );
};

export default App;
