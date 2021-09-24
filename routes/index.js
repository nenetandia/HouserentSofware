const express = require('express')
const router = express()

let clientTable = require('../table/clientsTable');
let clientClass = new clientTable() ;

let locataireTable = require('../table/locataireTable');
let locataireClass = new locataireTable() ;

let logementTable = require('../table/logementsTable');
let logementClass = new logementTable() ;

let adresseTable = require('../table/adressesTable');
let adresseClass = new adresseTable() ;

let SexeTable = require('../table/sexeTable');
let sexeClass = new SexeTable();

// let typeLogementTable = require('../table/typeLogementTable');
// let typeLogementClass = new typeLogementTable();

let UtilisateurTable = require('../table/utilisateursTable');
let utilisateurClass = new UtilisateurTable() ;

let RoleTable = require('../table/roleTable')
let roleClass = new RoleTable();

let TypeLogementTable = require('../table/typeLogementTable')
let typeLogementClass = new TypeLogementTable();

const connection = require('../config/dbConnect')

//HOMEPAGE LOGIN
router.get('/', async(req, res) => {
    try {
        res.render('login/login', {layout : 'login'})
    } catch (error) {
        
    }
})

router.get('/dashbord', async(req, res) => {
    try {
        let title = 'Tableau de bord'
        let myScript= 'dashbord'
        console.log(req.session)
        returnViewMain(req,res,'dashbord/dashbord',{title, myScript})
    } catch (error) {
        res.render('errors/500', {layout : false} )
    }
})
router.get('/access', async(req, res) => {
    try {
        let createSuperAdminAccess = await clientClass.createParam()
        console.log('je suis dans access ', createSuperAdminAccess)
        let message= createSuperAdminAccess.message;
        if (createSuperAdminAccess.success) {
            let title= "Liste des access";
            res.json({ message, title }) 
        } else {res.json({message}) }   
    } catch (error) {
        res.json({message:'erreur interne'}) 

    }
})
//CLIENTS
router.get('/clients', async(req, res) => {
    try {
        let findClients = await clientClass.listClient()
        if (findClients.success) {
        let listClients= findClients.datas;
        let title= "Liste des clients";
        console.log('this client list :', listClients)
        res.render('clients/clients', {listClients, title}) 
        } else {res.render('errors/500', {layout : false}) }   
    } catch (error) {
        console.log('erroor in clients', error)
        res.render('errors/500', {layout : false}) 

    }
})

router.get('/addClient', async(req, res) => {
    try {
        let title= "ajouter un client";
        let infoSexes = await sexeClass.listSexe();
        if(infoSexes.success){
            let findSexe = infoSexes.find;
            let sexes = infoSexes.datas
            res.render('clients/formClients', {title, sexes, findSexe})       
        }else {
            res.render('errors/500', {layout : false}) 
        }
             
    } catch (error) {
        console.log('erroor in clients', error)
        res.render('errors/500', {layout : false}) 
    }
})
router.post('/addClient', async(req, res) => {
    try {
        let date_creation = req.body.dde_client;
        let nom_client = req.body.nom_client;
        let email_client = req.body.email_client;
        let telephone_client = req.body.telephone_client;
        let profession_client = req.body.profession_client;
        let ddn_client = req.body.ddn_client;
        let sexe_client = req.body.sexe_client;
        let title= "ajouter un client";
        if(nom_client && email_client && sexe_client && telephone_client && profession_client && ddn_client && date_creation) {
            let addNewClient = await clientClass.insertClient(nom_client,email_client,telephone_client,profession_client,ddn_client,sexe_client,date_creation)
            if (addNewClient.success) { 
                let infoSexes = await sexeClass.listSexe();
                if(infoSexes.success){
                    let findSexe = infoSexes.find;
                    let sexes = infoSexes.datas
                    res.render('clients/formClients', {title, sexes, findSexe, success:true, message:'un client a été bien ajouté'})       
                }else {
                    res.render('errors/500', {layout : false}) 
                }              
            } else {
                res.render('errors/500', {layout : false})
            }            
        } else {
            if(infoSexes.success){
                let findSexe = infoSexes.find;
                let sexes = infoSexes.datas
                res.render('clients/formClients', {title, sexes, findSexe, error: true, message:'vous devez remplir tous les champs'})       
            }else {
                res.render('errors/500', {layout : false}) 
            }            
        }        
    } catch (error) {
        console.log('erroor in clients', error)
        res.render('errors/500', {layout : false}) 

    }
})
router.get('/client/:id', async(req, res) => {
       
    try {
        let id = req.params.id
        let title= "profil client";
        let infoClients = await clientClass.profilClient(id);
        if(infoClients.success){
            let findClient = infoClients.find;
            let client = infoClients.data
            res.render('clients/profilClients', {title, client, findClient})       
        }else {
            res.render('errors/500', {layout : false}) 
        }
             
    } catch (error) {
        console.log('erroor in clients', error)
        res.render('errors/500', {layout : false}) 
    }
})

router.put('/client', async(req, res) => {
    console.log('first router')
        try {
            let title= "profil client";
            let modifyClient = await clientClass.updateClient();
            if(modifyClient.success){
                let findClient = modifyClient.find;
                let client = modifyClient.data
                res.render('clients/profilClients', {title, client, findClient})       
            }else {
                res.render('errors/500', {layout : false}) 
            }
                
        } catch (error) {
            console.log('erroor in clients', error)
            res.render('errors/500', {layout : false}) 
        }

});
  router.delete('/client/:id', async(req, res) => {

    try {
        let title= "profil client";
        let infoClients = await clientClass.deleteClient();
        if(infoClients.success){
            let findClient = infoClients.find;
            let client = infoClients.data
            res.render('clients/profilClients', {title, client, findClient})       
        }else {
            res.render('errors/500', {layout : false}) 
        }
            
    } catch (error) {
        console.log('erroor in clients', error)
        res.render('errors/500', {layout : false}) 
    }
});


//TENANT
router.get('/locataires', async(req, res) => {
    try {
        let findLocataires = await locataireClass.listLocataire()
        console.log('klllll', findLocataires)
        if (findLocataires.success) {
        console.log('this is locataires list :', findLocataires)
        let listLocataires= findLocataires.datas;
        let title= "Liste des locataires";
        res.render('locataires/locataires', {listLocataires, title}) 
        } else {res.render('errors/500', {layout : false}) }   
    } catch (error) {
        console.log('erroor in locataires', error)
        res.render('errors/500', {layout : false}) 

    }
})
router.get('/locataire', async(req, res) => {
    try {
        let title= "ajouter un locataire";
        let infoSexes = await sexeClass.listSexe();
        if(infoSexes.success){
            let findSexe = infoSexes.find;
            let sexes = infoSexes.datas
            res.render('locataires/formLocataires', {title, sexes, findSexe})       
        }else {
            res.render('errors/500', {layout : false}) 
        }
             
    } catch (error) {
        console.log('erroor in locataires', error)
        res.render('errors/500', {layout : false}) 
    }
})
router.post('/locataire', async(req, res) => {
    try {
        let date_creation = req.body.dde_locataire;
        let nom_locataire = req.body.nom_locataire;
        let email_locataire = req.body.email_client;
        let telephone_locataire = req.body.telephone_locataire;
        let profession_locataire = req.body.profession_locataire;
        let ddn_locataire = req.body.ddn_locataire;
        let sexe_locataire = req.body.sexe_locataire;
        let bank_locataire = req.body.bank_locataire;
        let iban_locataire = req.body.iban_locataire;
        let bic_locataire = req.body.bic_locataire;

        let title= "ajouter un locataire";
        if(sexe_locataire && nom_locataire && email_locataire && telephone_locataire && ddn_locataire && profession_locataire && bank_locataire && iban_locataire && bic_locataire && date_creation) {
            let addNewLocataire = await locataireClass.insertlocataire(sexe_locataire,nom_locataire,email_locataire,telephone_locataire,ddn_locataire,profession_locataire,bank_locataire,iban_locataire,bic_locataire,date_creation)
            if (addNewLocataire.success) { 
                let infoSexes = await sexeClass.listSexe();
                if(infoSexes.success){
                    let findSexe = infoSexes.find;
                    let sexes = infoSexes.datas
                    res.render('locataires/formLocataires', {title, sexes, findSexe, success:true, message:'un locataire a été bien ajouté'})       
                }else {
                    res.render('errors/500', {layout : false}) 
                }              
            } else {
                res.render('errors/500', {layout : false})
            }            
        } else {
            if(infoSexes.success){
                let findSexe = infoSexes.find;
                let sexes = infoSexes.datas
                res.render('locataires/formLocataires', {title, sexes, findSexe, error: true, message:'vous devez remplir tous les champs'})       
            }else {
                res.render('errors/500', {layout : false}) 
            }            
        }        
    } catch (error) {
        console.log('erroor in locataires', error)
        res.render('errors/500', {layout : false}) 

    }
})
//APPARTMENT
router.get('/logements', async(req, res) => {
    try {
        let findLogements = await logementClass.listLogement()
        if (findLogements.success) {
        console.log('this is logements list :', findLogements)
        let listlogements= findLogements.datas;
        let title= "Liste des logements";
        res.render('logements/logements', {listlogements, title}) 
        } else {res.render('errors/500', {layout : false}) }   
    } catch (error) {
        console.log('erroor in logements', error)
        res.render('errors/500', {layout : false}) 
    }
})
router.get('/logement', async(req, res) => {
    try {
        let title= "ajouter un logements";
        let infoTypeLogement = await typeLogementClass.listTypeLogement();
        if(infoTypeLogement.success){
            let findTypeLogement = infoTypeLogement.find;
            let TypeLogements = infoTypeLogement.datas
            res.render('logements/logementsForm', {title,findTypeLogement,TypeLogements })       
        }else {
            res.render('errors/500', {layout : false}) 
        }
             
    } catch (error) {
        console.log('erroor in logements', error)
        res.render('errors/500', {layout : false}) 
    }
})
router.post('/logement', async(req, res) => {
    try {
        let idtypelogements_logements = req.body.idtypelogements_logements;
        let idclient_logements = req.body.nom_locataire;
        let superficie_logements = req.body.superficie_logements;
        let nbrepiece_logements = req.body.nbrepiece_logements;
        let dateconstruction_logements = req.body.dateconstruction_logements;
        let appartpallier_logements = req.body.appartpallier_logements;
        let etage_logements = req.body.etage_logements;
        let balcon_logements = req.body.balcon_logements;
        let ascenseur_logements = req.body.ascenseur_logements;
        let dde_logement = req.body.dde_logement;

        let title= "ajouter un logement";
        if(idtypelogements_logements && idclient_logements && superficie_logements && nbrepiece_logements && dateconstruction_logements && appartpallier_logements && etage_logements && balcon_logements && ascenseur_logements && dde_logement) {
            let addNewLogement = await logementClass.insertLogement(idtypelogements_logements && idclient_logements && superficie_logements && nbrepiece_logements && dateconstruction_logements && appartpallier_logements && etage_logements && balcon_logements && ascenseur_logements && dde_logement)
            if (addNewLogement.success) { 
                let infoTypeLogement = await typeLogementClass.listTypeLogement();
                if(infoTypeLogement.success){
                    let findTypeLogement = infoTypeLogements.find;
                    let typeLogements = infoTypeLogement.datas
                    res.render('logements/logementsForm', {title, typeLogements, findTypeLogement, success:true, message:'un logement a été bien ajouté'})       
                }else {
                    res.render('errors/500', {layout : false}) 
                }              
            } else {
                res.render('errors/500', {layout : false})
            }            
        } else {
            if(infoTypeLogement.success){
                let findTypeLogement = infoTypeLogement.find;
                let typeLogements = infoTypeLogement.datas
                res.render('locataires/formLocataires', {title, typeLogements, findTypeLogement, error: true, message:'vous devez remplir tous les champs'})       
            }else {
                res.render('errors/500', {layout : false}) 
            }            
        }        
    } catch (error) {
        console.log('erroor in logements', error)
        res.render('errors/500', {layout : false}) 

    }
})

router.get('/adresses', async(req, res) => {
    try {
        let listAdresse = await adresseClass.listAdresse()
        if (listAdresse.success) {
        console.log('this is adresses list :', listAdresse)
        res.render('adresses/adresses', {listAdresse}) 
        } else {res.render('errors/500', {layout : false}) }   
    } catch (error) {
        console.log('erroor in adresses', error)
        res.render('errors/500', {layout : false}) 

    }
    })
    //USERS
router.get('/utilisateurs', async(req, res) => {
        try {
            let findUtilisateur = await utilisateurClass.listUtilisateur()
            if (findUtilisateur.success) {
            let listUtilisateur= findUtilisateur.datas;
            let title= "Liste des Utilisateurs";
            console.log('this Utilisateur list :', listUtilisateur)
            res.render('utilisateurs/utilisateur', {listUtilisateur, title}) 
            } else {res.render('errors/500', {layout : false}) }   
        } catch (error) {
            console.log('erroor in Utilisateur', error)
            res.render('errors/500', {layout : false}) 
    
        }
    })
    router.get('/utilisateur', async(req, res) => {
        try {
            console.log('am in get create utilisateur')

            let title= "ajouter un utilisateur";
            let myScript = 'utilisateur'
            let infoRole = await roleClass.listRoleDispo(1);
            console.log(infoRole)
            if(infoRole.success){
                let findRole = infoRole.find;
                let roles = infoRole.datas
                res.render('utilisateurs/utilisateurForm', {title,roles,myScript,findRole})       
            }else {
                res.render('errors/500', {layout : false}) 
            }
                 
        } catch (error) {
            console.log('erroor in utilisateurs', error)
            res.render('errors/500', {layout : false}) 
        }
    })
    router.post('/utilisateur', async(req, res) => {
        try {
            let idrole_utilisateur = req.body.role_utilisateur;
            let nom_utilisateur = req.body.nom_utilisateur;
            let prenom_utilisateur = req.body.prenom_utilisateur;
            let fonction_utilisateur = req.body.fonction_utilisateur;
            let email_utilisateur = req.body.email_utilisateur;
            let password_utilisateur = req.body.motdepasse_utilisateur;
            if(idrole_utilisateur >0 && nom_utilisateur && prenom_utilisateur && fonction_utilisateur && email_utilisateur && password_utilisateur) {
                if(validateEmail(email_utilisateur)){
                    let verifyEmail = await utilisateurClass.findUserByEmail(email_utilisateur)
                    if(verifyEmail.success) {
                        if(!verifyEmail.find){
                            let addNewUtilisateur = await utilisateurClass.insertUtilisateur(idrole_utilisateur,nom_utilisateur, prenom_utilisateur,fonction_utilisateur, email_utilisateur,password_utilisateur)
                            console.log(addNewUtilisateur)
                            if (addNewUtilisateur.success) { 
                                res.json({success: true, message:'Un nouveau utilisateur a été ajouté'})      
                            } else {
                                res.json({success: false, message:'Une Erreur est survenue lors de l\'enregistrement'})
                            }            
                        }else {
                            res.json({success: false, message:"Cette adresse email a déja été enregistré"})
                        }

                    }else {
                        res.json({success: false, message:'Erreur interne lors de la vérification de l\'email'})

                    }
                }else {
                    res.json({success: false, message:"Cette adresse email n'est pas valide"})

                }
                
                
            } else {
                res.json({success: false, message:'Vous devez remplir tous les champs  '})

            }        
        } catch (error) {
            console.log('erroor in utilisateur', error)
            res.json({success: false, message:'Erreur interne'})
    
        }
    })
    // LOGIN
    router.post('/',async(req,res,next)=>{ 
        // console.log("req.body",req.body) 
        try { 
            let username= req.body.username; 
            let password= req.body.password; 
    
            if(username && password){ 
                let findUser= await utilisateurClass.findUserByEmail(username); 
                console.log('this is finduser', findUser)
                if(findUser.success){ 
                    if(findUser.find){ 
                    
                        let cryptedPass= findUser.datas[0].password_utilisateur 
                        
                        if(cryptedPass==password){ 
                            //faire une session
                            let userinfo = findUser.datas[0]
                            req.session.connected= true; 
                            req.session.username= userinfo.email_utilisateur 
                            req.session.surname= userinfo.nom_utilisateur
                            req.session.firstname= userinfo.prenom_utilisateur
                            req.session.idUser= userinfo.id_utilisateur; 
                            req.session.nameRole= userinfo.nomRole
                            req.session.nameFonction= userinfo.fonction_utilisateur; 
                            req.session.fullname= userinfo.prenom_utilisateur + ' ' + userinfo.nom_utilisateur
                            req.session.token= "token"; 

                            return res.status(200).json({success:true,message:"Vous êtes connecté"}); 

                        }else{ 
                            return res.status(200).json({success:false,message:"L'identifiant et/ou le mot de passe sont invalides"}); 
                        } 
                    }else{ 
                        return res.status(200).json({success:false,message:"L'identifiant et/ou le mot de passe sont invalides"}); 
                    } 
                }else{ 
                    return res.status(500).json({success:false,message:"Erreur interne connexion"}); 
                } 
            }else{ 
                if(!username){ 
                    return res.status(200).json({success:false,message:" Vous devez renseigner l'identifiant "}); 
                }else{ 
                    if(!password){ 
                        return res.status(200).json({success:false,message:" Vous devez renseigner le mot de passe "}); 
                    }else{ 
                        return res.status(200).json({success:false,message:"Erreur paramètre"}); 
                    } 
                } 
            } 
        } catch (error) { 
            console.log('error',error) 
            return res.status(500).json({success:false,message:"Erreur interne connexion"}); 
        } 
    }); 
   
    /********************** 
 *                    * 
 *      deconnexion     *  
 *                    * 
 **********************/ 
//dec Deconnexion 
//@route post /deconnexion 
//@access private 
router.get('/deconnexion',async(req, res, next)=>{ 
    //console.log.log("req.session",req.session) 
    return await checkConnex(req, res, next); 

},async (req,res)=>{ 
    try { 
        req.session.destroy((err)=>{ 
            res.redirect('/?deconnexion=true'); 
        }) 
        //res.render('dashboard/dashboard',{layout:'main','linkLogo':linkLogo}); 
    } catch (error) { 
        //console.log.log(error) 
        res.render('errors/500')    } 
}); 

/********************** 
 *                    * 
 *      deconnexion     *  
 *                    * 
 **********************/ 
 function checkConnex(req, res, next) {
    if(req.session.connected == true) {
        next();
    }else {
        res.render('errors/403')
    }
 }


    function validateEmail(mail)  
    { 
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail)) 
        { 
            return true 
        } 
        return false 
    }     

    function returnViewMain(req,res,file,data){ 
        let reqSessionInfo= req.session 
        let idUser=""; 
        let surname=""; 
        let firstname=""; 
        let nameRole=""; 
        let nameFonction=""; 
        let fullname = "";
        let username = "";
        if(reqSessionInfo){ 
            idUser=reqSessionInfo.idUser; 
            surname=reqSessionInfo.surname; 
            firstname=reqSessionInfo.firstname; 
            nameRole=reqSessionInfo.nameRole; 
            nameFonction=reqSessionInfo.nameFonction;
            username=reqSessionInfo.username; 
            fullname=reqSessionInfo.fullname; 

        } 
        let userInfos={idUser,surname,firstname,nameRole,nameFonction, fullname, username} 
    
        data.layout='main'; 
        data.infosUser=userInfos; 
        return  res.render(file,data); 
    } 
    

module.exports = router;