/************
    IMPORT
************/
const posts = require ('../data/posts.js')              // Import dei dati della risorsa post

/********************
    FUNZIONI ROTTE
*********************/

// index - mostra tutte le ricette
function index (req, res) {
    res.json(posts)
}

// show - mostra una ricetta specifica
function show(req, res) {
    const id = parseInt(req.params.id) ;                  // Recupera stringa "id" dall'URL e la converte in numero
    const post = posts.find(post => post.id === id);      // Cerca ricetta con l'id specificato nell'array "posts"
    res.json(post);                                       // Invia ricetta trovata al client
}

// store - crea una nuova ricetta
function store(req, res) {
    res.send("Creata nuova ricetta");
}

// update - Aggiorna una ricetta
function update(req, res) {
    res.send("Aggiornata ricetta " + req.params.id);
}

// modify - Modifica una ricetta
function modify(req, res) {
    res.send('Modifica parziale ricetta ' + req.params.id);
}

// destroy - Elimina una ricetta
function destroy(req, res) {
    const id = parseInt(req.params.id);                   // Recupera stringa "id" dall'URL e la converte in numero
    const post = posts.find(post => post.id === id);      // Cerca ricetta con l'id specificato nell'array "posts"

    /* Se la ricetta non esiste: 
       - Imposta codice di stato HTTP 404 
       - Invia al client messaggio d'errore
       - Esci dalla funzione destroy
    */
    if(!post)
        return res.status(404).json (
            { 
                status: 404,
                error: "Not Found" , 
                message: "Ricetta non trovata"
            }
        )

    /* 
        Se la ricetta esiste:
        - Elimina post dall'array posts
        - Invia al client codice di stato http 204 (nessun contenuto)
          per comunicare l'esito positivo della richiesta
    */
   posts.splice(posts.indexOf(post), 1)
   res.sendStatus(204);
   console.log(posts); 
}


/************
    EXPORT
************/
module.exports = { index, show, store, update, modify, destroy };  // Export funzioni controller