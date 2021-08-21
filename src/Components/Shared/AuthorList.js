import React, { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { Form, Row, Col } from "react-bootstrap";
import "./AuthorList.scss";
import AuthorActionPanel from "./AuthorActionPanel";

const schema = yup.object().shape({
  name: yup.string().required(),
});

export default function AuthorList({ author, handleDelete, handleFormSubmit }) {
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState(author.name);
  let formikRef = React.createRef();

  function handleEditForm(values, actions) {
    console.log(JSON.stringify(values));
    let formResult = false;
    (async () => {formResult = await handleFormSubmit(author.id, values, actions);})();
    console.log(`FormResult: ${formResult}`);
    if (formResult) setEdit(false);
  }

  function handleEdit(e) {
    e.preventDefault();
    setEdit(!edit);
  }

  function handleAuthorDelete(e) {
    e.preventDefault();
    handleDelete(e);
  }

  function handleAuthorClear(e) {
    e.preventDefault();
    console.log("Clearing author form");
    setName(author.name);
    setEdit(false);
  }

  function onFormikSubmit() {
    formikRef.handleSubmit();
  }

  const readOnlyForm = (
    <div className="row">
      <div className="col">{name}</div>
      <AuthorActionPanel
        isSubmitting={false}
        handleEdit={handleEdit}
        handleDelete={handleAuthorDelete}
      ></AuthorActionPanel>
    </div>
  );
  const editForm = (
    <Formik
      innerRef={(p) => (formikRef = p)}
      validationSchema={schema}
      onSubmit={handleEditForm}
      initialValues={{
        name: name,
      }}
    >
      {({
        handleSubmit,
        handleChange,
        values,
        touched,
        isValid,
        errors,
        status,
        isSubmitting,
      }) => {
        const isInvalid = !isValid;
        return (
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group
              as={Row}
              className="author-form-group mb-3"
              controlId="handleName"
            >
              <Col sm="10">
                <Form.Control
                  type="text"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  isInvalid={touched.name && !!errors.name}
                ></Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Col>
              <Col sm="2">
                <AuthorActionPanel
                  editMode={edit}
                  isSubmitting={false}
                  handleEdit={onFormikSubmit}
                  handleDelete={handleAuthorClear}
                ></AuthorActionPanel>
              </Col>
            </Form.Group>

            {status && status.name && (
              <div className="myapp-error">{status.name}</div>
            )}
          </Form>
        );
      }}
    </Formik>
  );

  return (
    <div className="author container">{edit ? editForm : readOnlyForm}</div>
  );
}
