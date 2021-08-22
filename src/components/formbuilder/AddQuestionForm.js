import React, { useState } from "react";
import { Button, Input } from "reactstrap";
import PropTypes from "prop-types";
import CustomModal from "../commonComponents/CustomModal";
import CustomInput from "../commonComponents/CustomInput";
import ReactSelect from "../commonComponents/ReactSelect";
import MultiChoiceInput from "../commonComponents/MultiChoiceInput";
import {
  checkValidation,
  getStringInLowerCaseWithOutSpace,
} from "../../helper";

const initialState = {
  question: "",
  answerType: null,
  isRequired: "yes",
};
const AddQuestionForm = ({ isOpen, toggle, addQuestion }) => {
  const [questionData, setQuestionData] = useState(initialState);
  const [options, setOptions] = useState([{ optionText: " " }]);
  const [errors, setErrors] = useState({});

  const onChange = (name, value) => {
    setQuestionData({ ...questionData, [name]: value });
  };

  const validationHandler = (name, error) => {
    setErrors({
      ...errors,
      [name]: error,
    });
  };

  const onOptionsChange = (e, index) => {
    const { name, value } = e.target;
    const optionList = [...options];
    optionList[index][name] = value;
    setOptions(optionList);
  };

  const handleRemoveClick = (index) => {
    const optionList = [...options];
    optionList.splice(index, 1);
    setOptions(optionList);
  };

  const handleAddClick = () => {
    setOptions([...options, { optionText: "" }]);
  };

  const onSave = () => {
    const { question, answerType, isRequired } = questionData;
    const validationError = checkValidation(errors, {
      question,
      answerType,
    });
    if (Object.keys(validationError).length !== 0) {
      setErrors(validationError);
    } else {
      const id = new Date().getTime().toString();
      const data = {
        id,
        question,
        isRequired: isRequired === "yes",
        component: answerType.value,
        options: options.map((option) => ({
          label: option.optionText,
          value: getStringInLowerCaseWithOutSpace(option.optionText),
        })),
        value: "",
        name: getStringInLowerCaseWithOutSpace(question) + id,
        // answerType.value === "customInput"
        //   ? ""
        //   : getStringInLowerCaseWithOutSpace(options[0].optionText),
      };
      addQuestion(data);
      toggle();
    }
  };

  const { question, answerType, isRequired } = questionData;
  const answerTypeOptions = [
    { label: "Text", value: "customInput" },
    { label: "Multichoice Checkbox", value: "checkBox" },
    { label: "Single Select Radio", value: "radioButton" },
  ];

  return (
    <div>
      <CustomModal isOpen={isOpen} toggle={toggle} onAdd={onSave}>
        <CustomInput
          name="question"
          type="text"
          isRequired
          value={question}
          onChange={onChange}
          validationHandler={validationHandler}
          error={errors.question}
          label="Question / Title"
          placeholder="Question"
        />

        <MultiChoiceInput
          name="isRequired"
          label="Is Required?"
          options={[
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" },
          ]}
          value={isRequired}
          onChange={onChange}
          validationHandler={validationHandler}
          error={errors.isRequired}
          type="radio"
        />

        <ReactSelect
          name="answerType"
          value={answerType}
          label="Answer Type"
          isRequired
          onChange={onChange}
          validationHandler={validationHandler}
          error={errors.answerType}
          options={answerTypeOptions}
        />
        {answerType?.value === "checkBox" || answerType?.value === "radioButton"
          ? options.map((option, index) => (
              // eslint-disable-next-line react/jsx-indent
              <div
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                className="d-flex justify-content-center 
                align-items-center mb-3"
              >
                <Input
                  name="optionText"
                  id="optionText"
                  value={option.optionText}
                  onChange={(e) => onOptionsChange(e, index)}
                  className="mr-2"
                  placeholder={`Option ${index + 1}`}
                />
                {options.length !== 1 && (
                  <Button
                    color="danger"
                    size="sm"
                    className="mr-2"
                    onClick={() => handleRemoveClick(index)}
                  >
                    Remove
                  </Button>
                )}
                {options.length - 1 === index && (
                  <Button size="sm" onClick={handleAddClick}>
                    Add
                  </Button>
                )}
              </div>
            ))
          : null}
      </CustomModal>
    </div>
  );
};

AddQuestionForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  addQuestion: PropTypes.func.isRequired,
};

export default AddQuestionForm;
