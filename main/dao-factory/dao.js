const _ = require('lodash');
Dao = function() {

};

Dao.prototype = {
    init(storage) {
        this.storage_ = storage;
        this.items_ = this.selectAll();
    },
    commit() {
        var json = JSON.stringify(this.items_);
        this.storage_.setItemSync(this.getKey(),json);
        this.items_ = this.selectAll(this.getKey());
    },
    selectAll() {
        return JSON.parse(this.storage_.getItemSync(this.getKey()) || '[]');
    },
    insert(item) {
        this.items_.push(item);
    },
    delete(id) {
        this.items_ = this.items_.filter(item=>item.id != id);
    },
    update(item) {
       _.extend(this.items_.find(i=>i.id === item.id),item);
    }
};

module.exports = Dao;