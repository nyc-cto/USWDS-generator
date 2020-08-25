import { React } from "react";
/**
* JSX Button Component Attributes
* @function Button
* @param {Object} config The configuration object for button attributes
* @property {string} config.class      - The classes inherited from the USWDS CSS files. The default class is `usa-button` and additions can be appended.
* @property {boolean} config.autofocus - The attribute that specifies whether or not the button has input focus when the page loads. Only one element (button) in a document can have this attribute.
* @property {boolean} config.disabled  - The attribute that prevents the user from interacting with a button, i.e. cannot click on the button.
* @property {string} config.name       - The name of the button.
* @property {string} config.type       - The type. Three types:
*                                        <ul>1. Submit: The button submits the form data to the server (default type if not specifed).</ul>
*                                        <ul>2. Button: Used for events (onclick, onfocus, onhover).</ul>
*                                        <ul>3. Reset: Reset controls to their initial values.</ul>
* @property {string} config.value      - The value associated with the button’s name when it’s submitted with the form data.
* @property {string} config.innerText  - The text to displayed on the button.
* @example
*   // Single class usage
*   const config = {
*     class: "usa-button--secondary",
*     autofocus: "true", //boolean value only
*     disabled: "false", //boolean value only
*     name: "Button",
*     type: "submit",
*     value: "",
*     innerText: "Button",
*   }
* @example
*   // Multiple class usage
*   const config = {
*      class: "usa-button--outline usa-button--inverse",
*      autofocus: "true", //boolean value only
*      disabled: "false", //boolean value only
*      name: "Button",
*      type: "submit",
*      value: "",
*      innerText: "Button",
*   }
* @returns {HTMLButtonElement} The JSX HTML button
*/

function Button(props) {
  return /*#__PURE__*/React.createElement("button", {
    class: `usa-button ${props.class}`,
    autofocus: props.autofocus,
    disabled: props.disabled,
    name: props.name,
    type: props.type,
    value: props.value
  }, props.innerText);
}

export default Button;