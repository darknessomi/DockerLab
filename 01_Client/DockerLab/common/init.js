import AV from 'avoscloud-sdk';
import CONST from './CONST';

AV.init({
  appId: CONST.APPID,
  appKey: CONST.APPKEY
});
AV.Promise.setPromisesAPlusCompliant(true);

export default AV;