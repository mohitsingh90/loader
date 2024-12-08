import React, { useEffect } from "react";
import { TextInput, View } from "react-native";
import Animated, { interpolateColor, useAnimatedProps, useDerivedValue, useSharedValue, withTiming } from "react-native-reanimated";
import { Circle, Svg, LinearGradient } from "react-native-svg";
import 'react-native-gesture-handler';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedText = Animated.createAnimatedComponent(TextInput);

const radius = 45;
const circumference = radius * Math.PI * 2;
const duration = 6000;

const App = () => {

  const strokeOffset = useSharedValue(circumference);

  const percentage = useDerivedValue(() => {
    const number = ((circumference - strokeOffset.value) / circumference ) * 100;
    return withTiming(number, { duration: duration });
  });

  const strokeColor = useDerivedValue(() => {
    return interpolateColor(
      percentage.value,
      [0, 50, 100],
      ["#9E4784", "#66347F", "#37306B"]
    );
  });

  const animatedCircleProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: withTiming(strokeOffset.value, { duration: duration }),
      stroke: strokeColor.value,
    };
  });

  const animatedSmallCircleProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: withTiming(strokeOffset.value, { duration: duration }),
      stroke: "gray",
    };
  });

  const animatedTextProps = useAnimatedProps(() => {
    return {
      text: `${Math.round(percentage.value)} %`
    }
  });

  useEffect(() => {
    strokeOffset.value = 0;
  }, []);

  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      {/* <AnimatedText
        style={{
          color:"#37306B",
          fontSize: 24,
          fontWeight: 'bold',
          position: 'absolute',
        }}
        animatedProps={animatedTextProps}
      /> */}
      <View style={{backgroundColor: "red", width: 170, height: 170, borderRadius: 170 / 2, position: 'absolute',}}></View>
      <Svg height="80%" width="80%" viewBox="0 0 100 100">
        <Circle 
          cx="50"
          cy="50"
          r="45"
          stroke="#E7E7E7"
          strokeWidth="10"
          fill="transparent"
        />
        
        {/* Rotated Small Circle (secondary circle) */}
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
        
        {/* Rotated Animated Circle (loader circle) */}
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
