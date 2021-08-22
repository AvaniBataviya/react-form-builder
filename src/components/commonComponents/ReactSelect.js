import React from "react";
import Select from "react-select";
import { FormGroup, FormText, Label } from "reactstrap";
import PropTypes from "prop-types";
import { getSentenceFromCamelCase } from "../../helper";

const ReactSelect = ({
  className,
  error,
  helperText,
  isClearable,
  isDisabled,
  isLoading,
  isMulti,
  isRequired,
  isSearchable,
  label,
  loadingMessage,
  menuPlacement,
  name,
  noOptionsMessage,
  onChange,
  options,
  validationHandler,
  value,
}) => {
  const selectRef = React.useRef();

  const onChangeHandler = (selectedValue) => {
    onChange(name, selectedValue);
  };
  const onValidationChange = (selectedValue) => {
    let errorMessage = "";
    if (selectedValue.length === 0 && isRequired) {
      errorMessage = `Please enter ${getSentenceFromCamelCase(name)}.`;
    }
    validationHandler(name, errorMessage);
  };
  const customStyles = {
    control: (styles) => {
      return {
        ...styles,
        cursor: isDisabled ? "not-allowed" : "default",
        opacity: 0.8,
      };
    },
  };

  return (
    <FormGroup>
      {label ? (
        <>
          <Label for={name}>{label}</Label>
          {isRequired ? <span className="text-danger">*</span> : null}
        </>
      ) : null}
      <Select
        className={className}
        classNamePrefix="react_select"
        isClearable={isClearable}
        isDisabled={isDisabled}
        isLoading={isLoading}
        isMulti={isMulti}
        isSearchable={isSearchable}
        loadingMessage={() => loadingMessage}
        menuPlacement={menuPlacement}
        name={name}
        noOptionsMessage={() => noOptionsMessage}
        onChange={onChangeHandler}
        options={options}
        onBlur={() => {
          if (selectRef.current) {
            const selectValue = selectRef.current.select.getValue();
            onValidationChange(selectValue);
          }
        }}
        ref={selectRef}
        styles={customStyles}
        value={value}
      />
      {helperText && <FormText color="muted">{helperText}</FormText>}
      {error ? <span className="text-danger fs-12">{error}</span> : null}
    </FormGroup>
  );
};

ReactSelect.defaultProps = {
  className: "",
  error: "",
  helperText: "",
  isClearable: true,
  isDisabled: false,
  isLoading: false,
  isMulti: false,
  isRequired: false,
  isSearchable: false,
  label: "",
  loadingMessage: "Loading...",
  menuPlacement: "bottom",
  noOptionsMessage: "No options",
  validationHandler: () => {},
  value: null,
};

ReactSelect.propTypes = {
  className: PropTypes.string,
  error: PropTypes.string,
  helperText: PropTypes.string,
  isClearable: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isMulti: PropTypes.bool,
  isRequired: PropTypes.bool,
  isLoading: PropTypes.bool,
  isSearchable: PropTypes.bool,
  label: PropTypes.string,
  loadingMessage: PropTypes.string,
  menuPlacement: PropTypes.string,
  name: PropTypes.string.isRequired,
  noOptionsMessage: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  validationHandler: PropTypes.func,
  value: PropTypes.object,
};

export default ReactSelect;
