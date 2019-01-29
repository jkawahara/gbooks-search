// *** Include Modules: npm (react)
import React from "react";

// Export function for importing into App.js
export function Card(props) {
  return (
    <div className="card text-left">
      <div className="card-header">
        <h2>{props.heading}</h2>
      </div>
      <div className="card-body">{props.children}</div>
    </div>
  );
}
