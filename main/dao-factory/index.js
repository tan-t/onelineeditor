const storage = require('node-persist');
const _ = require('lodash');
const Dao = require('./dao.js');

console.log('start init storage');
storage.initSync();
console.log('end init storage');



module.exports = {
    getFavoriteDao(){
        var FavoriteDao = function() {

        };

        FavoriteDao.prototype = {
            getKey() {
                return 'favorite';
            }
        };

        _.extend(FavoriteDao.prototype,Dao.prototype);

        var favoriteDao = new FavoriteDao();
        favoriteDao.init(storage);
        return favoriteDao;
    }
};