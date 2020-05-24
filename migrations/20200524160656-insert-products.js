'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db, callback) {
  db.insert(
    'Product', {
      id: 0,
      id_categoria: 1,
      descricao: 'Hamburguer'
  }, callback())
  db.insert(
      'Product', {
        id: 1,
        id_categoria: 2,
        descricao: 'Matrix'
  }, callback())
  db.insert(
      'Product', {
        id: 2,
        id_categoria: 0,
        descricao: 'Sapiens'
  }, callback())
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
