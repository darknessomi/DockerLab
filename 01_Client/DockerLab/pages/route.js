/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

import setting from './setting';
import login from './login';
import index from './index';
import host from './host';
import image from './image';
import container from './container';
import containerdetail from './containerdetail';

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
  getPageHost: function() {
    return host;
  },
  getPageImage: function() {
    return image;
  },
  getPageContainer: function() {
    return container;
  },
  getPageContainerDetail: function() {
    return containerdetail;
  },
};

export default Route;
