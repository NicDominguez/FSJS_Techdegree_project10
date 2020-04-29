import React from "react";
import { Redirect } from "react-router-dom";

// Componenet that runs signOut funciton from context and then redirects to homepage
export default ({ context }) => {
  context.actions.signOut();
  return <Redirect to="/" />;
};
