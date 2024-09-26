export const schema = {
    "models": {},
    "enums": {},
    "nonModels": {
        "TiVotes": {
            "name": "TiVotes",
            "fields": {
                "Id": {
                    "name": "Id",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "VoteId": {
                    "name": "VoteId",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                }
            }
        },
        "TiVotesConnection": {
            "name": "TiVotesConnection",
            "fields": {
                "items": {
                    "name": "items",
                    "isArray": true,
                    "type": {
                        "nonModel": "TiVotes"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true
                },
                "nextToken": {
                    "name": "nextToken",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                }
            }
        }
    },
    "codegenVersion": "3.4.4",
    "version": "61afed72b5b4a23aef734ad5ba1cdacd"
};