import React from 'react';
import {render} from 'react-dom';
import Layout from './containers/Layout/Layout'; 
import Column from './components/Column/Column'; 
import './index.scss';

render(
    <Layout>
        <Column column={null}/>
    </Layout>,
    document.getElementById('root')
);