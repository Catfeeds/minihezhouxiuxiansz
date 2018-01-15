require('./config$');
require('./importScripts$');
function success() {
require('../..//app');
require('../..//pages/index/index');
require('../..//pages/detail/detail');
require('../..//pages/personal/personal');
require('../..//pages/location/location');
require('../..//pages/orderform/orderform');
require('../..//pages/screen/screen');
require('../..//pages/shopPage/shopPage');
require('../..//pages/product/product');
require('../..//pages/orderAffirm/orderAffirm');
require('../..//pages/site/site');
require('../..//pages/orderAffirm/orderAffirm');
require('../..//pages/newLlocation/newLlocation');
require('../..//pages/classify/classify');
require('../..//pages/user/user');
require('../..//pages/cart/cart');
require('../..//pages/goodsClassify/goodsClassify');
require('../..//pages/shop/shop');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
