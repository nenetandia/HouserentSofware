
const QueryManager = require('../dataBase/dataBase')
let query = new QueryManager();

class Logement {
    constructor() {

    }
    insertLogement(idTypeLogement,idClientLogement,superficieLogement,nbrePieceLogement,dateConstructionLogement,appartpallierLogement,etagelogement,balconLogement,ascenceurLogement) {
        function recordLogement(idTypeLogement,idClientLogement,superficieLogement,nbrePieceLogement,dateConstructionLogement,appartpallierLogement,etagelogement,balconLogement,ascenceurLogement) {
            return new Promise((resolve, reject ) => {
               try {
                let sentenceSql = `INSERT INTO logements SET dtypelogements_logements=?,idclient_logemnts=?,superficie_logements=?,nbrepiece_logements=?,dateconstruction_logements=?,`
                sentenceSql += `appartpallier_logements=?,dateconstruction_logements=?,appartpallier_logements=?,bic_locataires=?,creation_clients=?`
                let getQuery = query.insertionQuerySql(sentenceSql,[idTypeLogement,idClientLogement,superficieLogement,nbrePieceLogement,dateConstructionLogement,appartpallierLogement,etagelogement,balconLogement,ascenceurLogement]);
                resolve(getQuery)
               } catch (error) {
                resolve({ success: false, err : error, 'message':`Erreur Interne Serveur `,'status':500  })
               }
            })  
        }
        async function action(idTypeLogement,idClientLogement,superficieLogement,nbrePieceLogement,dateConstructionLogement,appartpallierLogement,etagelogement,balconLogement,ascenceurLogement) {
            let logements = await recordLogement(idTypeLogement,idClientLogement,superficieLogement,nbrePieceLogement,dateConstructionLogement,appartpallierLogement,etagelogement,balconLogement,ascenceurLogement) 
            return logements;
        }
        return action(idTypeLogement,idClientLogement,superficieLogement,nbrePieceLogement,dateConstructionLogement,appartpallierLogement,etagelogement,balconLogement,ascenceurLogement);
        
    }
    listLogement() {
        function getAllLogement() {
            return new Promise((resolve, reject ) => {
               try {
                let sentenceSql = `SELECT * FROM logements`
                let getQuery = query.QuerySql(sentenceSql,[],false );
                resolve(getQuery)
               } catch (error) {
                resolve({ success: false, err : error, 'message':`Erreur Interne Serveur `,'status':500  })
               }
            })  
        }
        async function action() {
            let logements = await getAllLogement() 
            return logements;
        }
        return action();
    }
    updateLogement() {
        function updateOneLogement() {
            return new Promise((resolve, reject ) => {
               try {
                let sentenceSql = `UPDATE logements SET ? WHERE id_logements=?`
                let getQuery = query.updateQuerySql(sentenceSql,[] );
                resolve(getQuery)
               } catch (error) {
                resolve({ success: false, err : error, 'message':`Erreur Interne Serveur `,'status':500  })
               }
            })  
        }
        async function action() {
            let modifylogement = await updateOneLogement() 
            return modifylogement;
        }
        return action();

    }
    deleteLogement(id) {
        function recordLogement(id) {
            return new Promise((resolve, reject ) => {
               try {
                let sentenceSql = `DELETE logements WHERE id_logements=?`
                let getQuery = query.deleteQuerySql(sentenceSql,[id]);
                resolve(getQuery)
               } catch (error) {
                resolve({ success: false, err : error, 'message':`Erreur Interne Serveur `,'status':500  })
               }
            })  
        }
        async function action(id) {
            let logements = await recordLogement(id) 
            return logements;
        }
        return action(id);
        
    }


}
module.exports = Logement ;