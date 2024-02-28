import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// This page provides a button with a redirect to "/other"
function Home() {
  // fetchResponse is a constant in this component's state. Use handleFetchResponse(newValue)
  // to update the value of fetchResponse
  const [fetchResponse, handleFetchResponse] = useState();

  // Calling navigate() will allow us to redirect the webpage
  const navigate = useNavigate();

  // Anything returned will be rendered in React
  return (
    <div>
      <div>Home Page</div>
      <button
        onClick={() => {
          navigate("/other");
        }}
      >
        Click to go to Other page
      </button>
      <button
        onClick={() => {
          fetch("/api/ping", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              param0: "Frontend"
            })
          })
            .then((res) => res.json())
            .then((response) => {
              console.log("API Responded With: ");
              console.log(response);
              if (response?.data) {
                handleFetchResponse(response.data);
              } else {
                console.log("Malformed data response");
              }
            })
            .catch((err) => {
              console.log(err)
              handleFetchResponse("An API error occured");
            });
        }}
      >
        Fetch backend
      </button>
      {/* Conditionally render this div if fetchResponse is a valid value */}
      {fetchResponse ? <div>{fetchResponse}</div> : null}
    </div>
  );
}

export default Home;
