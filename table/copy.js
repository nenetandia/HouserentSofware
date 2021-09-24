const QueryManager = require('../dataBase/dataBase')
let query = new QueryManager();

class Sexe {
    constructor() {

    }
    insertSexe(nomSexe) {
        function recordSexe(nomSexe) {
            return new Promise((resolve, reject ) => {
               try {
                let sentenceSql = `INSERT INTO sexe SET nom_sexe=?`
                let getQuery = query.insertionQuerySql(sentenceSql,[nomSexe]);
                resolve(getQuery)
               } catch (error) {
                resolve({ success: false, err : error, 'message':`Erreur Interne Serveur `,'status':500  })
               }
            })  
        }
        async function action(nomSexe) {
            let sexes = await recordSexe(nomSexe) 
            return sexes;
        }
        return action(nomSexe);
        
    }
    listSexe() {
        function getAllSexe() {
            return new Promise((resolve, reject ) => {
               try {
                let sentenceSql = `SELECT * FROM sexe`
                let getQuery = query.QuerySql(sentenceSql,[],false );
                resolve(getQuery)
               } catch (error) {
                resolve({ success: false, err : error, 'message':`Erreur Interne Serveur `,'status':500  })
               }
            })  
        }
        async function action() {
            let sexes = await getAllSexe() 
            return sexes;
        }
        return action();
    }
    updateSexe(idSexe,nomSexe) {
        function recordsexe(idSexe,nomSexe) {
            return new Promise((resolve, reject ) => {
               try {
                let sentenceSql = `UPDATE sexe SET nom_sexe=? WHERE id_sexe=?`
                let getQuery = query.updateQuerySql(sentenceSql,[nomSexe,idSexe]);
                resolve(getQuery)
               } catch (error) {
                resolve({ success: false, err : error, 'message':`Erreur Interne Serveur `,'status':500  })
               }
            })  
        }
        async function action(idSexe,nomSexe) {
            let sexes = await recordsexe(idSexe,nomSexe) 
            return sexes;
        }
        return action(idSexe,nomSexe);
        
    }
    deleteSexe(idSexe) {
        function recordsexe(idSexe) {
            return new Promise((resolve, reject ) => {
               try {
                let sentenceSql = `DELETE sexe WHERE id_sexe=?`
                let getQuery = query.deleteQuerySql(sentenceSql,[idSexe]);
                resolve(getQuery)
               } catch (error) {
                resolve({ success: false, err : error, 'message':`Erreur Interne Serveur `,'status':500  })
               }
            })  
        }
        async function action(idSexe) {
            let sexes = await recordsexe(idSexe) 
            return sexes;
        }
        return action(idSexe);
        
    }


}
module.exports = Sexe ;
