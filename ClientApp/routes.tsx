import * as React from 'react';
import { Router, Route, HistoryBase } from 'react-router';
import { Layout } from './components/Layout';
import Home from './components/Home';
import Select from './components/Select';
import Import from './components/Import';

export default <Route component={ Layout }>
    <Route path='/' components={{ body: Home }} />
    <Route path='/select' components={{ body: Select }} />
    <Route path='/import' components={{ body: Import }} />
</Route>;

// Enable Hot Module Replacement (HMR)
if (module.hot) {
    module.hot.accept();
}

/*
        <Route path='(:startDateIndex)' /> {  }
    </Route>
*/
