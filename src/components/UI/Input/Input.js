import React from "react";

import classes from "./Input.css";
const Input = (props) => {
  let inputElement = null;

  const InputStyledClasses = [classes.InputElement];

  props.shouldValidate &&
    !props.valid &&
    props.dirty &&
    InputStyledClasses.push(classes.Invalid);

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={InputStyledClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;

    case "textarea":
      inputElement = (
        <textarea
          className={InputStyledClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;

    case "select":
      inputElement = (
        <select
          className={InputStyledClasses.join(" ")}
          value={props.value}
          onChange={props.changed}
        >
          {props.elementConfig.options.map((selectOption) => (
            <option key={selectOption.value} value={selectOption.value}>
              {selectOption.displayValue}
            </option>
          ))}
        </select>
      );
      break;

    default:
      inputElement = (
        <input
          className={InputStyledClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
  }
  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default Input;
