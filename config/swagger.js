const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

function swaggerSetup (portNumber, expressApp){
    const swaggerOptions = {
        swaggerDefinition:{
            info:{
                title: 'Profiler APIs',
                description: 'Profile APIs Info.',
                contact: {
                    name: 'm.magdy.isl@gmail.com'
                },
                servers:[`https://localhost:${portNumber}`]
            }
        },
        apis: [
            'server.js',
            './routes/api/*.js'
        ]
    }
    const swaggerDocs = swaggerJsDoc(swaggerOptions)
    expressApp.use('/api/docs',swaggerUi.serve,swaggerUi.setup(swaggerDocs))
} 

module.exports = swaggerSetup;