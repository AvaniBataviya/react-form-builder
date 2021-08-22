import React from "react";
import { FormGroup, CustomInput, Label } from "reactstrap";
import PropTypes from "prop-types";
import { getSentenceFromCamelCase } from "../../helper";

const MultiChoiceInput = ({
  className,
  disabled,
  error,
  isRequired,
  label,
  name,
  onChange,
  options,
  style,
  validationHandler,
  value,
  type,
}) => {
  const onChangeHandler = (event) => {
    onChange(name, event.target.value);
  };

  const onValidationChange = (event) => {
    if (!validationHandler) return;
    let errorMessage = "";
    if (!event.target.value && isRequired) {
      errorMessage = `Please enter ${getSentenceFromCamelCase(name)}.`;
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
      <>
        {options.map((option) => (
          <CustomInput
            checked={option.value === value}
            disabled={disabled}
            className={className}
            id={option.value}
            key={option.value}
            label={option.label}
            name={name}
            onBlur={onValidationChange}
            onChange={onChangeHandler}
            style={style}
            type={type}
            value={option.value}
          />
        ))}
      </>
      {error ? <span className="text-danger fs-12">{error}</span> : null}
    </FormGroup>
  );
};

MultiChoiceInput.defaultProps = {
  className: "",
  disabled: false,
  error: "",
  isRequired: false,
  label: "",
  style: {},
  validationHandler: () => {},
};

MultiChoiceInput.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  isRequired: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  style: PropTypes.object,
  validationHandler: PropTypes.func,
  value: PropTypes.any.isRequired,
  options: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
};

export default MultiChoiceInput;
