'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "place", deps: []
 * createTable "users", deps: []
 *
 **/

var info = {
    "revision": 1,
    "name": "usermodel",
    "created": "2022-06-01T20:21:41.121Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "place",
            {
                "place_id": {
                    "type": Sequelize.INTEGER.UNSIGNED,
                    "field": "place_id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "place_name": {
                    "type": Sequelize.STRING(45),
                    "field": "place_name",
                    "unique": true,
                    "allowNull": false
                },
                "place_location": {
                    "type": Sequelize.STRING(45),
                    "field": "place_location",
                    "allowNull": false
                },
                "place_phonenumber": {
                    "type": Sequelize.INTEGER,
                    "field": "place_phonenumber",
                    "allowNull": true
                },
                "place_category": {
                    "type": Sequelize.STRING(45),
                    "field": "place_category",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "users",
            {
                "UserId": {
                    "type": Sequelize.INTEGER,
                    "field": "UserId",
                    "primaryKey": true,
                    "autoIncrement": true,
                    "allowNull": false
                },
                "FirstName": {
                    "type": Sequelize.STRING,
                    "field": "FirstName"
                },
                "LastName": {
                    "type": Sequelize.STRING,
                    "field": "LastName"
                },
                "Email": {
                    "type": Sequelize.STRING,
                    "field": "Email",
                    "unique": true
                },
                "Username": {
                    "type": Sequelize.STRING,
                    "field": "Username",
                    "unique": true
                },
                "Password": {
                    "type": Sequelize.STRING,
                    "field": "Password"
                },
                "Admin": {
                    "type": Sequelize.BOOLEAN,
                    "field": "Admin",
                    "defaultValue": false
                },
                "Deleted": {
                    "type": Sequelize.BOOLEAN,
                    "field": "Deleted",
                    "defaultValue": false
                }
            },
            {}
        ]
    }
];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
