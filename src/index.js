import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { /*BrowserRouter as*/ Router } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import history from './history';

// Routes
import AppRoutes from './routes';

ReactDOM.render(
    <Router history={history}>
        <AppRoutes history={history} />
    </Router>,
    document.getElementById('root')
    );
    
serviceWorker.unregister();
