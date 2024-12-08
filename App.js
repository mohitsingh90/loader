// ParentComponent.js
import React, { useState, useEffect } from "react";
import { Loader } from "./app/src/component/CircleLoader";

const App = () => {
  return (
   <Loader percentage={60}/>
  );
};

export default App;
