/************
    IMPORT
************/
const posts = require ('../data/posts.js')       // Import dei dati della risorsa post

/********************
    FUNZIONI ROTTE
*********************/

// index - mostra tutte le ricette
function index (req, res) {
    res.send("Lista delle ricette");
}

// show - mostra una ricetta specifica
function show(req, res) {
    res.send("Dettagli ricetta " + req.params.id);
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
    res.send("Eliminata ricetta " + req.params.id)
}


/************
    EXPORT
************/
module.exports = { index, show, store, update, modify, destroy };  // Export funzioni controller