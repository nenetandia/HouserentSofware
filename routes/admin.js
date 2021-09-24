const express = require('express');
// const router = express.Router();
const router = express();
let clientTable = require('../table/clientsTable');
let clientClass = new clientTable() ;



router.get('/', async(req, res) => {
    try {
        res.render('homePageAdmin')
    } catch (error) {
        
    }
})
router.post('/clients', async(req, res) => {
    try {
        // let 
        let data = {
            nom_clients: request.body.name,
            email_clients: request.body.email,
            telephone_clients: request.body.phone,
            profession_clients: request.body.profession,
            ddn_clients: request.body.date_of_birth,
            dde_clients: new Date()
        }
        if (data.nom_clients && data.email_clients && data.profession_clients && data.telephone_clients && data.ddn_clients) {
            
        } else {
            res.render('homePageAdmin', {errMessage : 'vous devez remplir tous les champs'})
        }
    } catch (error) {
        
    }
})

router.post('/locataires', async(req, res) => {

    try {
        let data = {
            nom_locataires: request.body.name,
            prenom_locataires: request.body.prenom,
            ddn_locataires: request.body.date_of_birth,
            profession_locataires: request.body.profession,
            banque_locataires: request.body.bank,
            bic_locataires: request.body.iban,
            iban_locataires: this.request.body.iban,
            dde_locataires: new Date()
        }
        if (data.nom_locataires && data.email_locataires && data.profession_locataires && data.telephone_locataires && data.ddn_locataires) {
            Connection.query('INSERT locataires SET ?', data, (error, result) => {
                if (error) throw error;
                res.render('homePageAdmin', {message: 'votre article a bien été ajouté', error: error})
            });
        } else {
            res.render('homePageAdmin', {errMessage : 'vous devez remplir tous les champs'})
        }
    } catch (error) {
        
    }
})



















module.exports = router 