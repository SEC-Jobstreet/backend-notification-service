const amqp = require('amqplib/callback_api');
const client = require('./client');
// Connect to the RabbitMQ server
amqp.connect('amqp://34.142.156.221', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    // Create a channel
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }
        // Define the queue name
        const queue = 'publishJob';
        // Assert the queue exists
        channel.assertQueue(queue, { durable: false });
        console.log(queue);
        // Consume messages from the queue
        channel.consume(queue, function(msg) {
            let message= JSON.parse(msg.content.toString());
            let JobURL=`http://35.187.238.233:3000/job-detail?job_id=${message.ID}`;
            client.createPost({
                "id": message.ID,
                "jobName": message.Title,
                "companyName": message.EnterpriseName,
                "location": message.EnterpriseAddress,
                "description": message.Description,
                "url": JobURL
            },(err, response)=>
                {
                    if(err)
                    {
                        console.log(err);
                    }
                    if(response)
                    {
                        console.log(response);
                    }
                });
        }, { noAck: true });
    });
});
