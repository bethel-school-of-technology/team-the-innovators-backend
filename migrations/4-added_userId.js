'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "UserId" from table "reviews"
 * removeColumn "userUserId" from table "users"
 * addColumn "userUserId" to table "reviews"
 * addColumn "userId" to table "reviews"
 *
 **/

var info = {
    "revision": 4,
    "name": "added_userId",
    "created": "2022-06-28T00:11:46.092Z",
    "comment": ""
};

var migrationCommands = [
    // {
    //     fn: "removeColumn",
    //     params: ["reviews", "UserId"]
    // },
    // {
    //     fn: "removeColumn",
    //     params: ["users", "userUserId"]
    // },
    // {
    //     fn: "addColumn",
    //     params: [
    //         "reviews",
    //         "userUserId",
    //         {
    //             "type": Sequelize.INTEGER,
    //             "field": "userUserId",
    //             "onUpdate": "CASCADE",
    //             "onDelete": "SET NULL",
    //             "references": {
    //                 "model": "users",
    //                 "key": "UserId"
    //             },
    //             "allowNull": true
    //         }
    //     ]
    // },
    {
        fn: "addColumn",
        params: [
            "reviews",
            "userId",
            {
                "type": Sequelize.INTEGER,
                "field": "userId",
                "onUpdate": "CASCADE",
                "onDelete": "SET NULL",
                "references": {
                    "model": "users",
                    "key": "UserId"
                },
                "allowNull":  true
            }
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
