import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { HashRouter } from "react-router-dom";

import {create} from 'jss';
import globalPlugin from 'jss-global';
import nestedPlugin from 'jss-plugin-nested';

import style from './style';

const jss = create();
jss.use(globalPlugin());
jss.use(nestedPlugin());

const sheet = jss.createStyleSheet(style).attach();

ReactDOM.render(
  <HashRouter>
    <App jss={sheet} />
  </HashRouter>,
  document.getElementById('root_node')
);