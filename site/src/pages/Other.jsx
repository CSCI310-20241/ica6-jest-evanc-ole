import React, { useState } from "react";
import NestedComponent from "../components/NestedComponent";

// Use a nested component with provided props to redirect the user to "/"
// and a counter which is modified by a set of buttons
function Other() {
  // counter is a constant in this component's state. Use handleCounter(newValue)
  // to update the value of counter
  const [counter, handleCounter] = useState(0);

  // JS allows us to set variables equal to functions
  const resetCounter = () => {
    handleCounter(0);
  };

  return (
    <div>
      {/* Use a nested component to return the user to the url we specify here. */}
      <NestedComponent url={"/"} />

      <div>
        <div id="counter">Current state counter: {counter}</div>
        {/* Conditional rendering. Rendering "null" is equivalent to rendering nothing. */}
        {counter > 10 ? <div>Counter is greater than 10.</div> : null}
        <button id="incrementcounter" onClick={() => handleCounter(counter + 1)}>
          Increment counter
        </button>
        <button id="clearcounter" onClick={() => resetCounter()}>
          Clear counter
        </button>
      </div>
    </div>
  );
}

export default Other;
