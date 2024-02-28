import React from "react";
import { useNavigate } from "react-router-dom";

function NestedComponent(props) {
  // Pull the provided url from provided props
  const { url } = props;
  const navigate = useNavigate();

  return (
    <div>
      <div>Other Page</div>
      <button
        onClick={() => {
          navigate(url);
        }}
      >
        Click to go to Home page
      </button>
    </div>
  );
}

export default NestedComponent;
