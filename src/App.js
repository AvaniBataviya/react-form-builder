import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Spinner } from "reactstrap";
import Layout from "./components/layout";

const FormList = lazy(() => import("./pages/FormList"));
const FromBuilder = lazy(() => import("./pages/FromBuilder"));
const NoMatch = lazy(() => import("./pages/NoMatch"));
const ViewForm = lazy(() => import("./pages/ViewForm"));

function App() {
  return (
    <Router>
      <Layout>
        <Suspense fallback={<Spinner type="grow" color="primary" size="lg" />}>
          <Switch>
            <Route exact path="/" component={FormList} />
            <Route exact path="/forms/:id" component={FromBuilder} />
            <Route exact path="/forms/:id/viewfrom" component={ViewForm} />
            <Route path="*" component={NoMatch} />
          </Switch>
        </Suspense>
      </Layout>
    </Router>
  );
}

export default App;
