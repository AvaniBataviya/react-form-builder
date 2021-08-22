import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "reactstrap";
import { getItemFromStorage } from "../../helper";
import formBuilderActionType from "../../actions/FormBuilderAction";

const FormListTable = () => {
  const dispatch = useDispatch();
  const updateReduxFormsUsingLocalStorage = useCallback(
    (payload) =>
      dispatch({ type: formBuilderActionType.UPDATE_FORMS, payload }),
    [dispatch],
  );
  useEffect(() => {
    const formsFromStorage = getItemFromStorage("forms");
    console.log(formsFromStorage);
    if (formsFromStorage) updateReduxFormsUsingLocalStorage(formsFromStorage);
  }, [updateReduxFormsUsingLocalStorage]);

  const columns = [
    { header: "Form Name", accesser: "formName" },
    { header: "Form Url", accesser: "formUrl" },
    { header: "Created At", accesser: "createdAt" },
    { header: "Total Responses", accesser: "totalResponse" },
  ];
  const data = useSelector((state) => state.formbuilder.forms);

  return (
    <div className="mt-4">
      <Table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.accesser}>{column.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.length > 0 ? (
            data.map((rowData) => (
              <tr key={rowData.id}>
                {columns.map((column) => (
                  <td key={column.accesser}>{rowData[column.accesser]}</td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No Data Found
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default FormListTable;
