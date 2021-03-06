import React from "react";
import { FormGroup, FormText, Input, Label } from "reactstrap";
import PropTypes from "prop-types";
import { getRegExp, getSentenceFromCamelCase } from "../../helper";

const CustomInput = ({
  checked,
  className,
  disabled,
  error,
  fixLength,
  helperText,
  isRequired,
  label,
  minLength,
  maxLength,
  name,
  onChange,
  placeholder,
  reqType,
  style,
  type,
  validationHandler,
  value,
}) => {
  const onChangeHandler = (event) => {
    onChange(name, event.target.value);
  };

  const onValidationChange = (event) => {
    if (!validationHandler) return;
    const inputValue = event.target.value;
    let errorMessage = "";
    if (!inputValue && isRequired) {
      errorMessage = `Please enter ${getSentenceFromCamelCase(name)}.`;
    } else if (minLength && inputValue.length < minLength) {
      errorMessage = `${
        name.charAt(0).toUpperCase() + getSentenceFromCamelCase(name).slice(1)
      } must be at least ${minLength} characters long.`;
    } else if (maxLength && inputValue.length > maxLength) {
      errorMessage = `${
        name.charAt(0).toUpperCase() + getSentenceFromCamelCase(name).slice(1)
      } must be ${minLength} characters long.`;
    } else if (fixLength && inputValue.length !== fixLength) {
      errorMessage = `${
        name.charAt(0).toUpperCase() + getSentenceFromCamelCase(name).slice(1)
      } must be ${fixLength} characters.`;
    } else if (inputValue && reqType && !getRegExp(reqType).test(inputValue)) {
      errorMessage = `Please enter valid ${getSentenceFromCamelCase(name)}.`;
    }
    validationHandler(name, errorMessage);
  };

  return (
    <FormGroup>
      {label ? (
        <>
          <Label for={name}>{label}</Label>
          {isRequired ? <span className="text-danger">*</span> : null}
        </>
      ) : null}
      <Input
        type={type}
        name={name}
        id={name}
        value={value}
        checked={checked}
        placeholder={placeholder}
        className={className}
        style={style}
        disabled={disabled}
        onChange={onChangeHandler}
        onBlur={onValidationChange}
      />
      {helperText && <FormText color="muted">{helperText}</FormText>}
      {error ? <span className="text-danger fs-12">{error}</span> : null}
    </FormGroup>
  );
};

CustomInput.defaultProps = {
  checked: false,
  className: "",
  disabled: false,
  error: "",
  fixLength: 0,
  helperText: "",
  isRequired: false,
  label: "",
  minLength: 0,
  maxLength: 0,
  placeholder: "",
  reqType: "",
  style: {},
  type: "text",
  validationHandler: () => {},
};

CustomInput.propTypes = {
  checked: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  fixLength: PropTypes.number,
  helperText: PropTypes.string,
  isRequired: PropTypes.bool,
  label: PropTypes.string,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  reqType: PropTypes.string,
  style: PropTypes.object,
  type: PropTypes.string,
  validationHandler: PropTypes.func,
  value: PropTypes.any.isRequired,
};

export default CustomInput;
