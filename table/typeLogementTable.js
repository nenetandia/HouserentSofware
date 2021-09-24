const QueryManager = require('../dataBase/dataBase')
let query = new QueryManager();

class TypeLogement {
    constructor() {

    }
    insertTypeLogement(type_logement,disponibilite_logements) {
        function recordTypeLogement(type_logement,disponibilite_logements) {
            return new Promise((resolve, reject ) => {
               try {
                let sentenceSql = `INSERT INTO typelogements SET type_logements=?, disponibilite_logements=?`
                let getQuery = query.insertionQuerySql(sentenceSql,[type_logement,disponibilite_logements]);
                resolve(getQuery)
               } catch (error) {
                resolve({ success: false, err : error, 'message':`Erreur Interne Serveur `,'status':500  })
               }
            })  
        }
        async function action(type_logement,disponibilite_logements) {
            let sexes = await recordTypeLogement(type_logement,disponibilite_logements) 
            return sexes;
        }
        return action(type_logement,disponibilite_logements);
        
    }
    listTypeLogement() {
        function getAllTypeLogement() {
            return new Promise((resolve, reject ) => {
               try {
                let sentenceSql = `SELECT * FROM typelogements`
                let getQuery = query.QuerySql(sentenceSql,[],false );
                resolve(getQuery)
               } catch (error) {
                resolve({ success: false, err : error, 'message':`Erreur Interne Serveur `,'status':500  })
               }
            })  
        }
        async function action() {
            let typeLogements = await getAllTypeLogement() 
            return typeLogements;
        }
        return action();
    }
    updateTypeLogement(idtypelogement, disponibilte_logement) {
        function recordTypeLogement(idtypelogement, disponibilte_logement) {
            return new Promise((resolve, reject ) => {
               try {
                let sentenceSql = `UPDATE typelogements SET type_logement=? disponibilte_logements WHERE id_typelogements=?`
                let getQuery = query.updateQuerySql(sentenceSql,[type_logement, disponibilte_logement]);
                resolve(getQuery)
               } catch (error) {
                resolve({ success: false, err : error, 'message':`Erreur Interne Serveur `,'status':500  })
               }
            })  
        }
        async function action(idtypelogement, disponibilte_logement) {
            let sexes = await recordTypeLogement(idtypelogement, disponibilte_logement) 
            return sexes;
        }
        return action(idtypelogement, disponibilte_logement);
        
    }
    deleteTypeLogement(idtypelogement) {
        function recordTypeLogement(idtypelogement) {
            return new Promise((resolve, reject ) => {
               try {
                let sentenceSql = `DELETE typelogements WHERE id_typelogements=?`
                let getQuery = query.deleteQuerySql(sentenceSql,[idtypelogement]);
                resolve(getQuery)
               } catch (error) {
                resolve({ success: false, err : error, 'message':`Erreur Interne Serveur `,'status':500  })
               }
            })  
        }
        async function action(idtypelogement) {
            let sexes = await recordTypeLogement(idtypelogement) 
            return sexes;
        }
        return action(idtypelogement);
        
    }


}
module.exports = TypeLogement ;
