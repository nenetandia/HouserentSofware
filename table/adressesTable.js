const QueryManager = require('../dataBase/dataBase')
let query = new QueryManager();

class Adresse {
    constructor() {

    }
    insertAdresse(nomAdresse,numeroAdresse,rueAdresse,cpAdresse,villeAdresse,departementAdresse,regionAdresse,paysAdresse) {
        function recordAdresse(nomAdresse,numeroAdresse,rueAdresse,cpAdresse,villeAdresse,departementAdresse,regionAdresse,paysAdresse) {
            return new Promise((resolve, reject ) => {
               try {
                let sentenceSql = `INSERT INTO adresses SET nom_adresses=?,numero_adresses=?,rue_adresses=?,cp_adresses=?,`
                sentenceSql += `ville_adresses=?,departement_adressess=?,region_adresses=?,pays_adresses`
                let getQuery = query.insertionQuerySql(sentenceSql,[nomAdresse,numeroAdresse,rueAdresse,cpAdresse,villeAdresse,departementAdresse,regionAdresse,paysAdresse]);
                resolve(getQuery)
               } catch (error) {
                resolve({ success: false, err : error, 'message':`Erreur Interne Serveur `,'status':500  })
               }
            })  
        }
        async function action(nomAdresse,numeroAdresse,rueAdresse,cpAdresse,villeAdresse,departementAdresse,regionAdresse,paysAdresse) {
            let adressess = await recordadresses(nomAdresse,numeroAdresse,rueAdresse,cpAdresse,villeAdresse,departementAdresse,regionAdresse,paysAdresse) 
            return adressess;
        }
        return action(nomAdresse,numeroAdresse,rueAdresse,cpAdresse,villeAdresse,departementAdresse,regionAdresse,paysAdresse);
        
    }
    listAdresse() {
        function getAllAdresse() {
            return new Promise((resolve, reject ) => {
               try {
                let sentenceSql = `SELECT * FROM adresses`
                let getQuery = query.QuerySql(sentenceSql,[],false );
                resolve(getQuery)
               } catch (error) {
                resolve({ success: false, err : error, 'message':`Erreur Interne Serveur `,'status':500  })
               }
            })  
        }
        async function action() {
            let adresses = await getAllAdresse() 
            return adresses;
        }
        return action();
    }
    

}
module.exports = Adresse ;