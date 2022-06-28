'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "reviews", deps: [place]
 * addColumn "userUserId" to table "users"
 *
 **/

var info = {
    "revision": 2,
    "name": "foreignKey",
    "created": "2022-06-23T22:52:30.132Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "reviews",
            {
                "reviewId": {
                    "type": Sequelize.INTEGER(100),
                    "field": "reviewId",
                    "primaryKey": true,
                    "autoIncrement": true,
                    "allowNull": false
                },
                "rating": {
                    "type": Sequelize.INTEGER,
                    "field": "rating"
                },
                "placePlaceId": {
                    "type": Sequelize.INTEGER.UNSIGNED,
                    "onUpdate": "CASCADE",
                    "onDelete": "NO ACTION",
                    "references": {
                        "model": "place",
                        "key": "place_id"
                    },
                    "allowNull": true,
                    "field": "placePlaceId"
                },
                "review_message": {
                    "type": Sequelize.STRING,
                    "field": "review_message"
                },
                "deleted": {
                    "type": Sequelize.BOOLEAN,
                    "field": "deleted"
                }
            },
            {}
        ]
    },
    // {
    //     fn: "addColumn",
    //     params: [
    //         "users",
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
    // }
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
