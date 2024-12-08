import React, { useState, useEffect } from "react";
import { View, Button } from "react-native";
import { Loader } from "./app/src/component/CircleLoader";

const App = () => {
  const [percentage, setPercentage] = useState(100); // Start with 100%

  // Simulate percentage decrease over time (unfill animation)
  useEffect(() => {
    const interval = setInterval(() => {
      setPercentage((prev) => (prev > 0 ? prev - 1 : 100)); // Decrease percentage every 600ms
    }, 600);

    return () => clearInterval(interval); // Cleanup the interval on unmount
  }, []);

  return (
    <Loader percentage={percentage} innerPercentage={percentage}/>
  );
};

export default App;
