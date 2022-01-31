import React from 'react';
import ReactDOM from 'react-dom';

import './index.css'

import header from './layouts/header.jsx';
import Sidebar from './layouts/sidebar.jsx';
import page_content from './layouts/content.jsx';


ReactDOM.render(header, document.getElementById('header'));
ReactDOM.render(<Sidebar />, document.getElementById('sidebar'));
ReactDOM.render(page_content, document.getElementById('content'));


