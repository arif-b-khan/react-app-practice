import React from "react";
import { Pencil, X, PlusSquare } from "react-bootstrap-icons";

export default function AuthorAction({isSubmitting, editMode, handleEdit, handleDelete}){
    return (<div className="author-float-right col" disabled={isSubmitting}>
    <a onClick={handleEdit}>
        {editMode ?
      <PlusSquare color="royalblue" size={20}></PlusSquare> : 
      <Pencil color="royalblue" size={20}></Pencil>
    }
    </a>
    <a onClick={handleDelete}>
      <X color="royalblue" size={20}>
        Delete
      </X>
    </a>
  </div>);
}