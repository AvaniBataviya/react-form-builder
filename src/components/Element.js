import React from "react";
import PropTypes from "prop-types";
import CustomInput from "./commonComponents/CustomInput";
import MultiChoiceInput from "./commonComponents/MultiChoiceInput";

const Element = ({
  // eslint-disable-next-line react/prop-types
  formQuestion: { question, isRequired, component, options, value, name },
  onChange,
  validationHandler,
}) => {
  switch (component) {
    case "customInput":
      return (
        <CustomInput
          name={name}
          value={value}
          isRequired={isRequired}
          label={question}
          onChange={onChange}
          placeholder={question}
          validationHandler={validationHandler}
        />
      );
    case "checkBox":
      return (
        <MultiChoiceInput
          name={name}
          value={value}
          isRequired={isRequired}
          label={question}
          onChange={onChange}
          options={options}
          type="checkbox"
          validationHandler={validationHandler}
        />
      );

    case "radioButton":
      return (
        <MultiChoiceInput
          name={name}
          value={value}
          isRequired={isRequired}
          label={question}
          onChange={onChange}
          options={options}
          type="radio"
          validationHandler={validationHandler}
        />
      );

    default:
      return null;
  }
};

Element.propTypes = {
  formQuestion: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  validationHandler: PropTypes.func.isRequired,
};
export default Element;
