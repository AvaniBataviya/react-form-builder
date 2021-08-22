import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Button, Card, CardBody } from "reactstrap";
import formBuilderActionType from "../actions/FormBuilderAction";
import CustomInput from "../components/commonComponents/CustomInput";
import MultiChoiceInput from "../components/commonComponents/MultiChoiceInput";
import AddQuestionForm from "../components/formbuilder/AddQuestionForm";
import {
  getItemFromStorage,
  getStringInLowerCaseWithOutSpace,
  setItemInStorage,
} from "../helper";

const FromBuilder = () => {
  const [questionData, setQuestionData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggle = () => setIsModalOpen(!isModalOpen);
  const [formName, setFormName] = useState("Form");
  const params = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const saveForm = useCallback(
    (payload) => dispatch({ type: formBuilderActionType.SAVE_FORM, payload }),
    [dispatch],
  );
  const onFormNameChange = (_name, value) => {
    setFormName(value);
  };
  const addQuestion = (question) => {
    setQuestionData([...questionData, question]);
  };

  const onChange = () => {};

  const removeQuestion = (id) => {
    const newFormData = [...questionData];
    const questionIndex = newFormData.findIndex((formQuestion) => {
      return formQuestion.id === id;
    });
    newFormData.splice(questionIndex, 1);
    setQuestionData(newFormData);
  };

  const onSave = () => {
    const data = {
      id: params.id,
      formName: formName || "Form",
      createdAt: new Date().toLocaleString(),
      formUrl: `/forms/${params.id}/viewfrom`,
      questions: questionData,
      totalResponse: 0,
    };
    const formsFromStorage = getItemFromStorage("forms");
    if (formsFromStorage) {
      setItemInStorage("forms", {});
      setItemInStorage("forms", [...formsFromStorage, data]);
    } else setItemInStorage("forms", [data]);
    saveForm(data);
    history.push("/");
  };

  const Element = ({
    // eslint-disable-next-line react/prop-types
    formQuestion: { question, isRequired, component, options, value },
  }) => {
    switch (component) {
      case "customInput":
        return (
          <CustomInput
            name={getStringInLowerCaseWithOutSpace(question)}
            value={value}
            isRequired={isRequired}
            label={question}
            onChange={onChange}
            placeholder={question}
          />
        );
      case "checkBox":
        return (
          <MultiChoiceInput
            name={getStringInLowerCaseWithOutSpace(question)}
            value={value}
            isRequired={isRequired}
            label={question}
            onChange={onChange}
            options={options}
            type="checkbox"
          />
        );

      case "radioButton":
        return (
          <MultiChoiceInput
            name={getStringInLowerCaseWithOutSpace(question)}
            value={value}
            isRequired={isRequired}
            label={question}
            onChange={onChange}
            options={options}
            type="radio"
          />
        );

      default:
        return null;
    }
  };

  return (
    <Card>
      <CardBody>
        <div className="d-flex justify-content-between align-items-center">
          <CustomInput
            name="formName"
            value={formName}
            isRequired
            label="Form name"
            onChange={onFormNameChange}
          />
          <Button onClick={toggle}>Add Question</Button>
        </div>
        {questionData?.length > 0
          ? questionData.map((formQuestion) => (
              // eslint-disable-next-line react/jsx-indent
              <Card className="shadow-sm mx-5 my-3" key={formQuestion.id}>
                <CardBody>
                  <div className="d-flex justify-content-end">
                    <Button
                      onClick={() => removeQuestion(formQuestion.id)}
                      color="danger"
                      size="sm"
                    >
                      Remove
                    </Button>
                  </div>
                  <Element formQuestion={formQuestion} />
                </CardBody>
              </Card>
            ))
          : null}
        {questionData?.length > 0 && (
          <div className="d-flex justify-content-end mt-4">
            <Button color="primary" onClick={onSave}>
              Save
            </Button>
          </div>
        )}
      </CardBody>
      {isModalOpen && (
        <AddQuestionForm
          isOpen={isModalOpen}
          toggle={toggle}
          addQuestion={addQuestion}
        />
      )}
    </Card>
  );
};

export default FromBuilder;
