'use strict';
const AWS = require('aws-sdk');
AWS.config.setPromisesDependency(require('bluebird'));
AWS.config.update({ region: 'us-east-1' });

const fetchPreferences = (chatId) => {
    return new Promise((resolve, reject) => {
        const dynamodb = new AWS.DynamoDB();
        dynamodb.getItem({
            TableName: "pollyanna_bot",
            Key: {
                'chat_id' : { N: chatId.toString() },
            },
        }, (err, data) => {
            if (err) reject(err);
            else resolve(data.Item);
        });
    });
}

const savePreferences = (chatId, voice) => {
    return new Promise((resolve, reject) => {
        const dynamodb = new AWS.DynamoDB();
        dynamodb.putItem({
            TableName: "pollyanna_bot",
            Item: {
                'chat_id' : { N: chatId.toString() },
                'voice_id' : { S: voice },
            },
        }, (err, data) => {
            if (err) reject(err);
            else resolve(data.Item);
        });
    });
}

const fetchAnswer = (chatId, line) => {
    return new Promise((resolve, reject) => {
        const dynamodb = new AWS.DynamoDB();
        dynamodb.getItem({
            TableName: "pollyanna_bot_answers",
            Key: {
                'chat_id' : { N: chatId.toString() },
                'line' : { S: line.toLowerCase() },
            },
        }, (err, data) => {
            if (err) reject(err);
            else resolve(data.Item);
        });
    });
}

const saveAnswer = (chatId, line, answer) => {
    return new Promise((resolve, reject) => {
        const dynamodb = new AWS.DynamoDB();
        dynamodb.putItem({
            TableName: "pollyanna_bot_answers",
            Item: {
                'chat_id' : { N: chatId.toString() },
                'line': { S: line.toLowerCase().trim() },
                'answer': { S: answer.trim() },
            },
        }, (err, data) => {
            if (err) reject(err);
            else resolve(data.Item);
        });
    });
}


module.exports = { fetchPreferences, savePreferences, saveAnswer, fetchAnswer };
