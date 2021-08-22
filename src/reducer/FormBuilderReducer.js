import formBuilderActionType from "../actions/FormBuilderAction";

export const initialFromsBuilderState = {
  forms: [],
  form: {},
};

export const formBuilderReducer = (
  state = initialFromsBuilderState,
  action,
) => {
  switch (action.type) {
    case formBuilderActionType.SAVE_FORM: {
      return {
        ...state,
        forms: [...state.forms, action.payload],
      };
    }

    case formBuilderActionType.UPDATE_FORMS: {
      return {
        ...state,
        forms: [...action.payload],
      };
    }

    case formBuilderActionType.ADD_FORM: {
      return {
        ...state,
        form: action.payload,
      };
    }
    case formBuilderActionType.ON_CHANGE: {
      const newForm = { ...state.form };
      const updatedData = {
        ...newForm,
        questions: newForm.questions.map((question) => {
          if (question.name === action.payload.name) {
            return {
              ...question,
              value: action.payload.value,
            };
          }
          return question;
        }),
      };
      return {
        ...state,
        form: updatedData,
      };
    }

    default:
      return state;
  }
};
