import './App.css';
import Books from "./Components/Books";
import Header from './Shared/Header';
import { Route, Switch, Redirect } from "react-router-dom";
import NotFound from "./Shared/NotFound";
import Authors from './Components/Authors';
import BookDetail from "./Components/BookDetail";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import AddBook from './Components/AddBook';

function App() {
    return (
        <>
            <Header />
            <div className="container">
                <Breadcrumb />
                <div className="text-center mt-5">
                    <Switch>
                        <Route exact path="/"><Redirect to="/books" /></Route>
                        <Route exact path="/books"><Books /></Route>
                        <Route exact path="/books/:bookid"><BookDetail /></Route>
                        <Route exact path="/books/add/:id"><AddBook /> </Route>
                        <Route path="/authors"><Authors /></Route>
                        <Route><NotFound /></Route>
                    </Switch>
                </div>
            </div>
        </>
    );
}

export default App;
