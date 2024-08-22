const { app } = require('@azure/functions');

app.http('HelloWorld', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);

        return { body: "Hi" };
    }
});
