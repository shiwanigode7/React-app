import React from "react";
import { AsteriskStyles } from "./AsteriskStyles";

export default function Asterisk() {
  const asteriskStyleClasses = AsteriskStyles();

  return (
    <span className={ asteriskStyleClasses.asteriskSymbol }>*</span>
  )
}