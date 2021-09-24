const QueryManager = require('../dataBase/dataBase')
let query = new QueryManager();

class Locataire {
    constructor() {

    }
    insertlocataire(idSexeLocataire,nomLocataire,emailLocataire,telephoneLocataire,ddnLocataire,professionLocataire,bankLocataire,ibanLocataire,bicLocataire,creationlocataire) {
        function recordlocataire(idSexeLocataire,nomLocataire,emailLocataire,telephoneLocataire,ddnLocataire,professionLocataire,bankLocataire,ibanLocataire,bicLocataire,creationlocatairet) {
            return new Promise((resolve, reject ) => {
               try {
                let sentenceSql = `INSERT INTO locataires SET idsexe_locataires=?,nom_locataires=?,email_locataires=?,telephone_locataires=?,ddn_locataires=?,profession_locataires=?,`
                sentenceSql += `bank_locataires=?,iban_locataires=?,bic_locataires=?,creation_clients=?`
                let getQuery = query.insertionQuerySql(sentenceSql,[idSexeLocataire,nomLocataire,emailLocataire,telephoneLocataire,ddnLocataire,professionLocataire,bankLocataire,ibanLocataire,bicLocataire,creationlocataire]);
                resolve(getQuery)
               } catch (error) {
                resolve({ success: false, err : error, 'message':`Erreur Interne Serveur `,'status':500  })
               }
            })  
        }
        async function action(idSexeLocataire,nomLocataire,emailLocataire,telephoneLocataire,ddnLocataire,professionLocataire,bankLocataire,ibanLocataire,bicLocataire,creationlocataire) {
            let locataires = await recordlocataire(idSexeLocataire,nomLocataire,emailLocataire,telephoneLocataire,ddnLocataire,professionLocataire,bankLocataire,ibanLocataire,bicLocataire,creationlocataire) 
            return locataires;
        }
        return action(idSexeLocataire,nomLocataire,emailLocataire,telephoneLocataire,ddnLocataire,professionLocataire,bankLocataire,ibanLocataire,bicLocataire,creationlocataire);
        
    }
    listLocataire() {
        function getAllLocataire() {
            return new Promise((resolve, reject ) => {
               try {
                let sentenceSql = `SELECT *,idsexe_locataires AS idSexe,`
                sentenceSql += `(SELECT nom_sexe FROM sexe WHERE id_sexe = idSexe limit 1  ) AS nomSexe`
                sentenceSql += ` FROM locataires`
                let getQuery = query.QuerySql(sentenceSql,[],false );
                resolve(getQuery)
               } catch (error) {
                resolve({ success: false, err : error, 'message':`Erreur Interne Serveur `,'status':500  })
               }
            })  
        }
        async function action() {
            let locataires = await getAllLocataire() 
            return locataires;
        }
        return action();
    }
    updateLocataire() {
        function updateOneLocataire() {
            return new Promise((resolve, reject ) => {
               try {
                let sentenceSql = `UPDATE locataires SET ? WHERE id_locataires=?`
                let getQuery = query.updateQuerySql(sentenceSql,[] );
                resolve(getQuery)
               } catch (error) {
                resolve({ success: false, err : error, 'message':`Erreur Interne Serveur `,'status':500  })
               }
            })  
        }
        async function action() {
            let modifyLocataire = await updateOneLocataire() 
            return modifyLocataire;
        }
        return action();

    }
    profilLocataire(id) {
        function getProfilLocataire(id) {
            return new Promise((resolve, reject ) => {
               try {
                let sentenceSql = `SELECT *,DATE_FORMAT(creation_locataires,"%d-%m-%Y") AS date_creation,idsexe_locataires AS idSexe,`
                sentenceSql += `(SELECT nom_sexe FROM sexe WHERE id_sexe = idSexe limit 1  ) AS nomSexe`
                sentenceSql += ` FROM locataires WHERE id_locataires=?`
                let getQuery = query.QuerySql(sentenceSql,[id],true );
                resolve(getQuery)
               } catch (error) {
                resolve({ success: false, err : error, 'message':`Erreur Interne Serveur `,'status':500  })
               }
            })  
        }
        async function action(id) {
            let locataires = await getProfilLocataire(id) 
            return locataires;
        }
        return action(id);
    }

    deleteLocataire(id) {
        function recordLocataire(id) {
            return new Promise((resolve, reject ) => {
               try {
                let sentenceSql = `DELETE locataires WHERE id_locataires=?`
                let getQuery = query.deleteQuerySql(sentenceSql,[id]);
                resolve(getQuery)
               } catch (error) {
                resolve({ success: false, err : error, 'message':`Erreur Interne Serveur `,'status':500  })
               }
            })  
        }
        async function action(id) {
            let locataires = await recordLocataire(id) 
            return locataires;
        }
        return action(id);
        
    }



}
module.exports = Locataire ;
