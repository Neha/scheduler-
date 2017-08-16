import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import Login from './components/Login';
import List from './components/List';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <BrowserRouter>
    <div>
        <Switch>

            <Route path="/" component={App}/>

        </Switch>
    </div>
</BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
