import React from "react";
import useFetch from "../Services/useFetch";
import { Link, useRouteMatch } from "react-router-dom";
import CustomSpinner from "../Shared/CustomSpinner";

export default function Courses() {
  const { data: courses, error, loading } = useFetch("courses");
  const { path, url } = useRouteMatch();
  console.log(`Path: ${path}, Url: ${url}`);
  if (error) throw error;

  if (loading) {
    return (
      <CustomSpinner />
    );
  }

  const coursesList = courses.map((c) => {
    return (
      <tr key={c.id.toString()}>
        <td>{c.id}</td>
        <td><Link to={`${url}courses/${c.id}`}>{c.title}</Link></td>
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
