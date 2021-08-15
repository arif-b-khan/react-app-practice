import React from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../Services/useFetch';
import CustomSpinner from "../Shared/CustomSpinner";

function BookDetail(props) {
    const { bookid } = useParams();
    const {data: book, error, loading} = useFetch(`books/${bookid}`);

    if(error) throw error;
    if(loading) return <CustomSpinner />


    return (
        <div>
        <p>{book.title}</p>      
        </div>
    );
}

export default BookDetail;