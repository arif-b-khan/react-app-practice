import React from "react";
import Spinner from "react-bootstrap/Spinner";
import useFetch from "../Services/useFetch";

export default function Courses() {
  const { data: courses, error, loading } = useFetch("courses");

  if (error) throw error;

  if (loading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  const coursesList = courses.map((c) => {
    return (
        <tr key={c.id.toString()}>
          <td>{c.id}</td>
          <td>{c.title}</td>
          <td>{c.category}</td>
        </tr>
    );
  });
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Title</th>
          <th scope="col">Category</th>
        </tr>
      </thead>
      <tbody>{coursesList}</tbody>
    </table>
  );
}
