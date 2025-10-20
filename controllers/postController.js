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
    const newId = posts[posts.length - 1].id + 1;    // Crea un nuovo id per la ricetta da aggiungere
    const newPost = {                               // Crea un nuovo oggetto ricetta recuperando i dati dal corpo della richiesta
        id: newId,
        title: req.body.title,
        content: req.body.content,
        image: req.body.image,    
        tags: req.body.tags
    };

    posts.push(newPost);              // Aggiunge la nuova ricetta all'array delle ricette
    console.log(newPost);             // Stampa nel terminale l'array aggiornato
    res.status(201).json(newPost) ;   /* Invia al client la nuova ricetta con codice di stato HTTP 201 (Created)
                                         per comunicare l'avvenuto successo della richiesta */
}

// update - Aggiorna una ricetta
function update(req, res) {
    const id = parseInt(req.params.id);                   // Recupera stringa "id" dall'URL e la converte in numero
    const post = posts.find(post => post.id === id);      // Cerca ricetta con l'id specificato nell'array "posts"

    /* Se la ricetta non esiste:
       - Imposta codice di stato HTTP 404 
       - Invia al client messaggio d'errore  
       - Termina l'esecuzione della funzione update
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
        - Aggiorna i campi della ricetta con i dati ricevuti nel corpo della richiesta
    */
    post.title = req.body.title;
    post.content = req.body.content;
    post.image = req.body.image;
    post.tags = req.body.tags;

    console.log(post);               // Stampa nel terminale l'array aggiornato
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
        - Invia al client codice di stato http 204 (No Content)
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