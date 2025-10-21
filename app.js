/************************************BLOG SERVER*************************************/

/************
    IMPORT
************/
const express = require('express')                           // Import del modulo Express
const chalk = require('chalk');                              // Import del pacchetto chalk
const postsRouter = require('./routers/postsRouter');        // Import del router che gestisce le rotte dei post
const errorServer = require('./middlewares/errorServer');    // Import del middleware errorServer
const notFound = require('./middlewares/notFound');          // Import del middleware notFound

/***************************
    CONFIGURAZIONE EXPRESS
****************************/
const app = express();           // Inizializzazione dell'app Express
const port = 3000;               // Definizione della porta su cui il server deve rimanere in ascolto


/***************
    MIDDLEWARE
****************/
app.use(express.json());          // Registrazione body-parser per "application/json"
app.use('/posts', postsRouter);   // Registrazione del router con prefisso /posts 
app.use(errorServer);             // Registrazione del middleware "errorServer" che gestisce gli errori interni del server 
app.use(notFound);                // Registrazione del middleware "notFound" che gestisce le rotte inesistenti (404 Not Found)




/*********************
    AVVIO SERVER
*********************/
// Il server viene messo in ascolto sulla porta 3000
app.listen(port, () => {
    console.log(chalk.red("Server in ascolto sulla porta " + port));
})