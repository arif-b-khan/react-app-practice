import React from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../Services/useFetch';
import CustomSpinner from "../Shared/CustomSpinner";

function CourseDetail(props) {
    const { courseid } = useParams();
    const {data: course, error, loading} = useFetch(`courses/${courseid}`);

    if(error) throw error;
    if(loading) return <CustomSpinner />


    return (
        <div>
        <p>{course.title}</p>      
        </div>
    );
}

export default CourseDetail;