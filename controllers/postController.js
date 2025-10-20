/************
    IMPORT
************/
const posts = require ('../data/posts.js')              // Import dei dati della risorsa post

/********************
    FUNZIONI ROTTE
*********************/

// index - mostra tutte le ricette
function index (req, res) {

    let postsfiltrato = posts;

    /*
        Se è stata passata una query string "tags":
        - Filtra l'array posts in base al tag specificato
        - Sovrascrivi la variabile "postsFiltrati" con i risultati filtrati
    */
    if(req.query.tags) {
        postsfiltrato = posts.filter( 
            (post) => post.tags.includes(req.query.tags)
        )
    };

    res.json(postsfiltrato)                                 // Invia al client lista completa o filtrata delle ricette
}

// show - mostra una ricetta specifica
function show(req, res) {
    const id = parseInt(req.params.id) ;                  // Recupera stringa "id" dall'URL e la converte in numero
    const post = posts.find(post => post.id === id);      // Cerca ricetta con l'id specificato nell'array "posts"

    /* Se la ricetta non esiste:
      - Imposta codice di stato HTTP 404 
      - Invia al client messaggio d'errore
      - Termina l'esecuzione della funzione show
   */
    if (!post)
        return res.status(404).json(
            {
                status: 404,
                error: "Not Found",
                message: "Ricetta non trovata"
            }
        )

    /* 
        Se la ricetta esiste:
        - Invia al client la ricetta trovata 
    */
    res.json(post);
}

// store - crea una nuova ricetta
function store(req, res) {
    console.log(req.body);             // Stampa nel terminale il corpo della richiesta in arrivo dal client
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
       - Termina l'esecuzione della funzione destroy
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