/************
    IMPORT
************/
const express = require('express')                               // Import Express
const postController = require('../controllers/postController')   // Import Controller dei post

/*************
    ROUTER
*************/
const router = express.Router() // Inizializzazione router express

// Definizione delle rotte CRUD - entità post
router.get('/', postController.index);          // Mostra tutte le ricette
router.get('/:id', postController.show);        // Mostra una ricetta specifica
router.post('/', postController.store);         // Crea una nuova ricetta
router.put('/:id', postController.update);      // Aggiorna una ricetta
router.patch('/:id', postController.modify);    // Modifica una ricetta
router.delete('/:id', postController.destroy);  // Elimina una ricetta

/************
    EXPORT
************/
module.exports = router; // Export del router