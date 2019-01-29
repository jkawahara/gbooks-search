// *** Include Modules: npm (react), style.css
import React from "react";
import "./style.css";

// Export functions for importing into /pages

export function List({ children }) {
  return (
    <div className="list-overflow-container">
      <ul className="list-group">{children}</ul>
    </div>
  );
}

export function ListItem(props) {
  return (
    <li className="list-group-item">
      <a className="btn btn-primary text-white float-right" href={props.infoLink} role="button" alt={props.infoLink}>View</a>
      <h3>Title: {props.title}</h3>
      <h3>Written By: {props.authors}</h3>
      <img alt={props.title} className="img-fluid float-left mr-3" src={props.imageLinks} style={{ margin: "0 auto" }} />
      <h3>{props.description}</h3>
    </li>
  )
}
