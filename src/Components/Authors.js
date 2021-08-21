import React from "react";
import { useQueryClient, useIsFetching } from "react-query";
import { Formik } from "formik";
import * as yup from "yup";
import AuthorList from "./Shared/AuthorList";
import { Form, Button, ListGroup, Row, Col } from "react-bootstrap";
import CustomSpinner from "../Shared/CustomSpinner";
import useFetch from "../Services/useFetch";
import postData from "../Services/postData";
import deleteData from "../Services/deleteData";
import updateData from "../Services/updateData";
import "./Authors.scss";

const schema = yup.object().shape({
  name: yup.string().required(),
});

let counter = 0;
function Authors(props) {
  const API_PATH = "authors";
  const isFetching = useIsFetching();
  const queryClient = useQueryClient();
  let { data: authors, error, isLoading } = useFetch(API_PATH);

  const {
    mutateAsync: postMutateAsync,
    error: postError,
    isLoading: postLoading,
  } = postData(API_PATH);

  const {
    mutateAsync: deleteMutateAsync,
    error: deleteError,
    isLoading: deleteLoading,
  } = deleteData(API_PATH);


  const {
    mutateAsync: updateMutateAsync,
    error: updateError,
    isLoading: updateLoading,
  } = updateData(API_PATH);

  const authorError = error && postError && deleteError;
  console.log(
    `IsLoading: ${isLoading}, PostLoading: ${postLoading} DeleteLoading: ${deleteLoading}, Fetching: ${isFetching}`
  );
  if (isLoading || postLoading || deleteLoading || updateLoading || isFetching)
    return <CustomSpinner />;
  if (error || postError || deleteError || updateError) throw authorError;
  counter = counter + 1;
  console.log(counter);
  const authorList = authors.map((author) => {
    return (
      <ListGroup.Item key={author.id}>
        <AuthorList handleDelete={() => deleteAuthor(author.id)} author={author} handleFormSubmit={(id, data, actions) => updateAuthorForm(id, data, actions)}>
        </AuthorList>
      </ListGroup.Item>
    );
  });

  function invalidateAuthors() {
    queryClient.invalidateQueries(API_PATH, { exact: true });
  }

  async function deleteAuthor(id) {
    console.log(`Author deletion id ${id}`);
    try {
      authors = [...authors.filter((a) => a.id !== id)];
      await deleteMutateAsync(id);
      console.log(`Author has been delete`);
      invalidateAuthors();
    } catch (err) {
      console.error(err);
    }
  }

  async function addAuthorForm(data, actions) {
    if (authors.find((a) => a.name === data.name)) {
      console.log("Author exists");
      actions.setStatus({
        name: `Author: "${data.name}" already exists`,
      });
      return;
    }
    try {
      const newAuthor = await postMutateAsync(data);
      invalidateAuthors();
      console.log(newAuthor);
      actions.resetForm();
    } catch (error) {
      console.error(error);
    } finally {
      console.log("Completed");
    }
  }

  async function updateAuthorForm(authorId, data, actions){
    console.log(`AuthorId: ${authorId}`);
    if (authors.find((a) => a.name === data.name)) {
      console.log("Author exists");
      actions.setStatus({
        name: `Author: "${data.name}" already exists`,
      });
      return false;
    }
    try {
      const updateAuthor = await updateMutateAsync({...data, id:authorId});
      invalidateAuthors();
      console.log(updateAuthor);
      actions.resetForm();
    } catch (error) {
      console.error(error);
    } finally {
      console.log("Completed");
    }
    return true;
  }

  return (
    <>
      <ListGroup>{authorList}</ListGroup>
      <Formik
        validationSchema={schema}
        onSubmit={addAuthorForm}
        initialValues={{
          name: "",
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
                <Form.Label className="author-form-label" column sm="2">
                  Author Name:
                </Form.Label>
                <Col sm="8">
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
                <div className="col-sm-2">
                  <Button type="submit" disabled={isInvalid || isSubmitting}>
                    +
                  </Button>
                </div>
              </Form.Group>
              {status && status.name && (
                <div className="myapp-error">{status.name}</div>
              )}
            </Form>
          );
        }}
      </Formik>
    </>
  );
}

export default Authors;
