import React from 'react';
import { render, screen } from '@testing-library/react';
import ReactDOM from 'react-dom';
import Courses from './Courses';
import {BrowserRouter} from 'react-router-dom';



describe("Test courses page", function(){
    it('Courses component renders correctly', () => {
        const div = document.createElement('div');
        ReactDOM.render(<BrowserRouter><Courses /></BrowserRouter>, div);
      });

    it('Courses component renders correctly', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter><Courses /></BrowserRouter>, div);
    });

})