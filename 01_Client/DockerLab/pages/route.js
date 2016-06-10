/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

import setting from './setting';
import login from './login';
import index from './index';

const Route = {
  getPageSetting: function() {
    return setting;
  },
  getPageLogin: function() {
    return login;
  },
  getPageIndex: function() {
    return index;
  },
};

export default Route;
