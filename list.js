import * as dynamoDBLib from './libs/dynamodb-lib';
import { success, failure } from './libs/response-lib';

export const main = async event => {
    const params = {
        TableName: process.env.tableName,
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
            ':userId': event.requestContext.identity.cognitoIdentityId,
        },
    };

    try {
        const result = await dynamoDBLib.call('query', params);
        return success(result.Items);
    } catch (error) {
        return failure({ status: false });
    }
};
