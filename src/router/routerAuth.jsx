import React, { useState } from "react";
import { Navigate } from "react-router-dom";

export const RouterAuth = ({ children }) => {


  return (
    <>{localStorage.getItem("token") ? children : <Navigate to="/login" />}</>
  );
};
