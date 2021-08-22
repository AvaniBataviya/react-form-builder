import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Button, Card, CardBody } from "reactstrap";
import Element from "../components/Element";
import { getItemFromStorage, setItemInStorage } from "../helper";
import formBuilderActionType from "../actions/FormBuilderAction";

const ViewForm = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const addForm = useCallback(
    (payload) => dispatch({ type: formBuilderActionType.ADD_FORM, payload }),
    [dispatch],
  );

  const onInputChange = useCallback(
    (payload) => dispatch({ type: formBuilderActionType.ON_CHANGE, payload }),
    [dispatch],
  );

  useEffect(() => {
    const forms = getItemFromStorage("forms");
    const selectedForm = forms.find((form) => form.id === params.id);
    addForm(selectedForm);
  }, [params.id, addForm]);

  const formData = useSelector((state) => state.formbuilder.form);

  const validationHandler = () => {};

  const onChange = (name, value) => {
    onInputChange({ name, value });
  };

  const history = useHistory();
  const onSave = () => {
    const forms = getItemFromStorage("forms");
    const updatedForms = forms.map((form, index) => {
      if (form.id === formData.id) {
        return {
          ...form,
          totalResponse: forms[index].totalResponse + 1,
        };
      }
      return form;
    });
    setItemInStorage("forms", {});
    setItemInStorage("forms", updatedForms);
    // eslint-disable-next-line no-unreachable
    alert("Thank you for submitting!!");
    history.push("/");
  };
  return (
    <div>
      {formData ? (
        <div>
          <Card className="shadow-sm mx-5 my-3">
            <CardBody>
              <h3>{formData.formName}</h3>
            </CardBody>
          </Card>
          {formData.questions?.length > 0
            ? formData.questions.map((formQuestion) => (
                // eslint-disable-next-line react/jsx-indent
                <Card className="shadow-sm mx-5 my-3" key={formQuestion.id}>
                  <CardBody>
                    <Element
                      formQuestion={formQuestion}
                      onChange={onChange}
                      validationHandler={validationHandler}
                    />
                  </CardBody>
                </Card>
              ))
            : null}
          <div className="d-flex justify-content-center">
            <Button color="primary" onClick={onSave}>
              Save
            </Button>
          </div>
        </div>
      ) : (
        <h2>Some thing went wrong!!</h2>
      )}
    </div>
  );
};

export default ViewForm;
