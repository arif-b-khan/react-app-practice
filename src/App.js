// import './App.css';
import Courses from "./Components/Courses";
import Header from './Shared/Header';
import { Route, Switch } from "react-router-dom";
import NotFound from "./Shared/NotFound";
import Authors from './Components/Authors';
import CourseDetail from "./Components/CourseDetail";
import Breadcrumb from 'react-bootstrap/Breadcrumb';

function App() {
    return (
        <>
            <Header />
            <div className="container">
                <Breadcrumb />
                <div className="text-center mt-5">
                    <Switch>
                        <Route exact path="/"><Courses /></Route>
                        <Route path="/courses/:courseid"><CourseDetail /></Route>
                        <Route path="/authors"><Authors /></Route>
                        <Route><NotFound /></Route>
                    </Switch>
                </div>
            </div>
        </>
    );
}

export default App;
