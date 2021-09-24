const QueryManager = require('../dataBase/dataBase')
let query = new QueryManager();

class Utilisateur {
    constructor() {

    }
    insertUtilisateur(idRoleUtilsateur,nomUtilisateur,prenomUtilisateur,fonctionUtilisateur,emailUtilisateur,passwordUtilisateur) {
         function recordUtilisateur(idRoleUtilsateur,nomUtilisateur,prenomUtilisateur,fonctionUtilisateur,emailUtilisateur,passwordUtilisateur) {
            return new Promise(async (resolve, reject ) => {
               try {
                let sentenceSql = `INSERT INTO utilisateur SET idrole_utilisateur=?,nom_utilisateur=?, prenom_utilisateur=?,`
                sentenceSql += `fonction_utilisateur=?,email_utilisateur=?,password_utilisateur=?`
                let getQuery = await  query.insertionQuerySql(sentenceSql,[idRoleUtilsateur,nomUtilisateur,prenomUtilisateur,fonctionUtilisateur,emailUtilisateur,passwordUtilisateur]);
                resolve(getQuery)
               } catch (error) {
                resolve({ success: false, err : error, 'message':`Erreur Interne Serveur `,'status':500  })
               }
            })  
        }
        async function action(idRoleUtilsateur,nomUtilisateur,prenomUtilisateur,fonctionUtilisateur,emailUtilisateur,passwordUtilisateur) {
            let utilisateurs = await recordUtilisateur(idRoleUtilsateur,nomUtilisateur,prenomUtilisateur,fonctionUtilisateur,emailUtilisateur,passwordUtilisateur) 
            return utilisateurs;
        }
        return action(idRoleUtilsateur,nomUtilisateur,prenomUtilisateur,fonctionUtilisateur,emailUtilisateur,passwordUtilisateur);
        
    }
    listUtilisateur() {
        function getAllUtilisateur() {
            return new Promise(async(resolve, reject ) => {
               try {
                let sentenceSql = `SELECT *,idrole_utilisateur AS idrole,`
                sentenceSql += `(SELECT nom_role FROM role WHERE id_role = idrole limit 1  ) AS nomRole`
                sentenceSql += ` FROM utilisateur`
                let getQuery =  await query.QuerySql(sentenceSql,[],false );
                resolve(getQuery)
               } catch (error) {
                resolve({ success: false, err : error, 'message':`Erreur Interne Serveur `,'status':500  })
               }
            })  
        }
        async function action() {
            let utilisateurs = await getAllUtilisateur() 
            return utilisateurs;
        }
        return action();
    }
    findUserByEmail(emailUtilisateur) {
        function findByEmail(emailUtilisateur) {
            return new Promise(async(resolve, reject ) => {
               try {
                let sentenceSql = `SELECT *,idrole_utilisateur AS idrole,`
                sentenceSql += `(SELECT nom_role FROM role WHERE id_role = idrole limit 1 ) AS nomRole`
                sentenceSql += ` FROM utilisateur where email_utilisateur=?`
                let getQuery =  await query.QuerySql(sentenceSql,[emailUtilisateur],false );
                resolve(getQuery)
               } catch (error) {
                resolve({ success: false, err : error, 'message':`Erreur Interne Serveur `,'status':500  })
               }
            })  
        }
        async function action(emailUtilisateur) {
            let utilisateurs = await findByEmail(emailUtilisateur) 
            return utilisateurs;
        }
        return action(emailUtilisateur);
    }
    updateUtilisateur() {
        function updateOneUtilisateur() {
            return new Promise(async (resolve, reject ) => {
               try {
                let sentenceSql = `UPDATE utilisateur SET ? WHERE id_utilisateur=?`
                let getQuery =  await query.updateQuerySql(sentenceSql,[] );
                resolve(getQuery)
               } catch (error) {
                resolve({ success: false, err : error, 'message':`Erreur Interne Serveur `,'status':500  })
               }
            })  
        }
        async function action() {
            let modifyUtilisateur = await updateOneUtilisateur() 
            return modifyUtilisateur;
        }
        return action();

    }
    profilUtilisateur(id) {
         function profilUtilisateur(id) {
            return new Promise(async (resolve, reject ) => {
               try {
                let sentenceSql = `SELECT *,idrole_utilisateur AS idrole,`
                sentenceSql += `(SELECT nom_role FROM role WHERE id_role = idrole limit 1  ) AS nomRole`
                sentenceSql += ` FROM utilisateur WHERE id_utilisateur=?`
                let getQuery = await query.QuerySql(sentenceSql,[id],true );
                resolve(getQuery)
               } catch (error) {
                resolve({ success: false, err : error, 'message':`Erreur Interne Serveur `,'status':500  })
               }
            })  
        }
        async function action(id) {
            let utilisateurs= await profilUtilisateur(id) 
            return utilisateurs;
        }
        return action(id);
    }
    deleteUtilisateur(id) {
        async function recordUtilisateur(id) {
            return new Promise(async (resolve, reject ) => {
               try {
                let sentenceSql = `DELETE utilisateur WHERE id_utilisateur=?`
                let getQuery = await query.deleteQuerySql(sentenceSql,[id]);
                resolve(getQuery)
               } catch (error) {
                resolve({ success: false, err : error, 'message':`Erreur Interne Serveur `,'status':500  })
               }
            })  
        }
        async function action(id) {
            let utilisateurs = await recordUtilisateur(id) 
            return utilisateurs;
        }
        return action(id);
        
    }
    


}

module.exports = Utilisateur ;