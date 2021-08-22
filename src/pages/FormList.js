import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import FormListTable from "../components/formlist/FormListTable";

const FormList = () => {
  const timeStamp = new Date().getTime();

  return (
    <Card>
      <CardBody>
        <div className="d-flex justify-content-between align-inter-cetnter">
          <h3>Form List</h3>
          <Link to={`forms/${timeStamp}`} className="btn btn-primary">
            Create From
          </Link>
        </div>
        <FormListTable />
      </CardBody>
    </Card>
  );
};

export default FormList;
