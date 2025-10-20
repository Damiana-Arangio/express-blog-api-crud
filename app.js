/************************************BLOG SERVER*************************************/

/************
    IMPORT
************/
const express = require('express')                      // Import del modulo Express
const chalk = require('chalk');                         // Import del pacchetto chalk
const postsRouter = require('./routers/postsRouter')    // Import del router che gestisce le rotte dei post

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


/*********************
    AVVIO SERVER
*********************/
// Il server viene messo in ascolto sulla porta 3000
app.listen(port, () => {
    console.log(chalk.red("Server in ascolto sulla porta " + port));
})