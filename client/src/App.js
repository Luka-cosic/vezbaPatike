import React from 'react';
import Jumbotron from './components/Jumbotron';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Muske from './pages/Muske/Muske';
import Zenske from './pages/Zenske/Zenske';
import Decije from './pages/Decije/Decije';
import Navbar from './components/Navbar/Navbar';
import SveNarucene from './pages/SveNarucene/SveNarucene';
import { Provider } from 'react-redux';
import { store } from './store';
import Single from './pages/Single/Single';


function App() {
    return(
        <Provider store={store}>
        <BrowserRouter>
            <Jumbotron />
            <Navbar />
            <Route exact path="/"  component={Home} />
            <Route  path="/muske" component={Muske} />
            <Route  path="/zenske" component={Zenske} />
            <Route  path="/decije" component={Decije} />
            <Route  path="/single" component={Single} />
            <Route path="/sveNarucene" component={SveNarucene} />


        </BrowserRouter>
        </Provider>
    )
}


export default App;