"use strict";

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db) {
  return db.runSql(`
    INSERT INTO sports_events (event_name, odds) VALUES
      ('Soccer: Manchester United vs Liverpool', ARRAY[1.75, 2.0, 3.0]),
      ('Basketball: Lakers vs Warriors', ARRAY[1.85, 1.3, 3.1]), 
      ('Tennis: Nadal vs Djokovic', ARRAY[1.35, 3.1, 4.1]),
      ('Boxing: Fury vs Joshua', ARRAY[1.15, 1.9, 4.3]),
      ('Cricket: India vs Australia', ARRAY[2.75, 3.3, 4.9])
  `);
};

exports.down = function (db) {
  return db.runSql(`
    DELETE FROM sports_events 
    WHERE event_id IN (
      SELECT event_id FROM sports_events 
      ORDER BY event_id 
      LIMIT 5
    )
  `);
};

exports._meta = {
  version: 1,
};
