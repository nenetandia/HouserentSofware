const QueryManager = require('../dataBase/dataBase')
let query = new QueryManager();

class Role {
    constructor() {

    }
    insertRole(nomRole,disponibiliteRole) {
        function recordRole(nomRole,disponibiliteRole) {
            return new Promise((resolve, reject ) => {
               try {
                let sentenceSql = `INSERT INTO role SET nom_role=?,disponibilite_role=?`
                let getQuery = query.insertionQuerySql(sentenceSql,[nomRole,disponibiliteRole]);
                resolve(getQuery)
               } catch (error) {
                resolve({ success: false, err : error, 'message':`Erreur Interne Serveur `,'status':500  })
               }
            })  
        }
        async function action(nomRole,disponibiliteRole) {
            let roles = await recordRole(nomRole,disponibiliteRole) 
            return roles;
        }
        return action(nomRole,disponibiliteRole);
        
    }
    listRole() {
        function getAllRole() {
            return new Promise((resolve, reject ) => {
               try {
                let sentenceSql = `SELECT * FROM role`
                let getQuery = query.QuerySql(sentenceSql,[],false );
                resolve(getQuery)
               } catch (error) {
                resolve({ success: false, err : error, 'message':`Erreur Interne Serveur `,'status':500  })
               }
            })  
        }
        async function action() {
            let roles = await getAllRole() 
            return roles;
        }
        return action();
    }
    listRoleDispo(dispo) {
        function getAllRoleDispo(dispo) {
            return new Promise((resolve, reject ) => {
               try {
                let sentenceSql = `SELECT * FROM role where disponibilite_role=?`
                let getQuery = query.QuerySql(sentenceSql,[dispo],false );
                resolve(getQuery)
               } catch (error) {
                resolve({ success: false, err : error, 'message':`Erreur Interne Serveur `,'status':500  })
               }
            })  
        }
        async function action(dispo) {
            let roles = await getAllRoleDispo(dispo) 
            return roles;
        }
        return action(dispo);
    }
    updateRole(idRole,nomRole,disponibiliteRole) {
        function recordrole(idRole,nomRole,disponibiliteRole) {
            return new Promise((resolve, reject ) => {
               try {
                let sentenceSql = `UPDATE role SET nom_role=?, disponibilite_role=? WHERE id_role=?`
                let getQuery = query.updateQuerySql(sentenceSql,[nomRole,disponibiliteRole,idRole]);
                resolve(getQuery)
               } catch (error) {
                resolve({ success: false, err : error, 'message':`Erreur Interne Serveur `,'status':500  })
               }
            })  
        }
        async function action(idRole,nomRole,disponibiliteRole) {
            let roles = await recordrole(idRole,nomRole,disponibiliteRole) 
            return roles;
        }
        return action(idRole,nomRole,disponibiliteRole);
        
    }
    deleteRole(idRole) {
        function recordrole(idRole) {
            return new Promise((resolve, reject ) => {
               try {
                let sentenceSql = `DELETE role WHERE id_role=?`
                let getQuery = query.deleteQuerySql(sentenceSql,[idRole]);
                resolve(getQuery)
               } catch (error) {
                resolve({ success: false, err : error, 'message':`Erreur Interne Serveur `,'status':500  })
               }
            })  
        }
        async function action(idRole) {
            let roles = await recordrole(idRole) 
            return roles;
        }
        return action(idRole);
        
    }


}
module.exports = Role ;
