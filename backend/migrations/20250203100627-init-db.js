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
  return Promise.all([
    db.createTable("sports_events", {
      event_id: { type: "int", primaryKey: true, autoIncrement: true },
      event_name: { type: "string", notNull: true, length: 255 },
      odds: { type: "decimal[]", notNull: true, precision: 10, scale: 2 },
    }),

    db.createTable("users", {
      user_id: { type: "int", primaryKey: true, autoIncrement: true },
      email: { type: "string", notNull: true, length: 255 },
      password: { type: "string", notNull: true, length: 255 },
    }),

    db.runSql(`CREATE TYPE bet_result AS ENUM ('win', 'draw', 'lose')`),

    db.createTable("bets", {
      bet_id: { type: "int", primaryKey: true, autoIncrement: true },
      user_id: {
        type: "int",
        notNull: true,
        foreignKey: {
          name: "bets_user_id_fk",
          table: "users",
          rules: {
            onDelete: "CASCADE",
          },
          mapping: "user_id",
        },
      },
      event_id: {
        type: "int",
        notNull: true,
        foreignKey: {
          name: "bets_event_id_fk",
          table: "sports_events",
          rules: {
            onDelete: "CASCADE",
          },
          mapping: "event_id",
        },
      },
      odd: { type: "decimal", notNull: true, precision: 10, scale: 2 },
      value: { type: "decimal", notNull: true, precision: 10, scale: 2 },
      result: { type: "bet_result", notNull: true },
    }),
  ]);
};

exports.down = function (db) {
  return Promise.all([
    db.dropTable("bets"),
    db.runSql(`DROP TYPE bet_result`),
    db.dropTable("users"),
    db.dropTable("sports_events"),
  ]);
};

exports._meta = {
  version: 1,
};
