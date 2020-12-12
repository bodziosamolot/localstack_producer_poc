// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
const express = require('express')
const app = express()
const port = 3000

console.log('Starting producer')
// Set region
AWS.config.update({ region: 'eu-west-2' });

// Create publish parameters
var params = {
    Message: 'MESSAGE_TEXT', /* required */
    TopicArn: 'arn:aws:sns:us-east-1:000000000000:local_sns'
};

// Create promise and SNS service object
var sns = new AWS.SNS({ apiVersion: '2010-03-31', endpoint: 'http://localstack:4566' });


app.post('/', (req, res) => {
    var publishTextPromise = sns.publish(params).promise();

    // Handle promise's fulfilled/rejected states
    publishTextPromise.then(
        function (data) {
            console.log(`Message ${params.Message} sent to the topic ${params.TopicArn}`);
            console.log("MessageID is " + data.MessageId);
        }).catch(
            function (err) {
                console.error(err, err.stack);
            });
    res.status(200).send();
})

app.listen(port, () => {
    console.log(`Producer server listening at http://localhost:${port}`)
})