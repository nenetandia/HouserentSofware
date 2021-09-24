const QueryManager = require('../dataBase/dataBase')
let query = new QueryManager();

class Client {
    constructor() {

    }
    insertClient(nomClient,emailClient,telephoneClient,professionClient,ddnClient,idSexeClient,creationClient) {
         function recordClient(nomClient,emailClient,telephoneClient,professionClient,ddnClient,idSexeClient,creationClient) {
            return new Promise(async (resolve, reject ) => {
               try {
                let sentenceSql = `INSERT INTO clients SET nom_clients=?,email_clients=?,`
                sentenceSql += `telephone_clients=?,profession_clients=?,ddn_clients=?,idsexe_clients=?,dde_clients=?`
                let getQuery = await  query.insertionQuerySql(sentenceSql,[nomClient,emailClient,telephoneClient,professionClient,ddnClient,idSexeClient,creationClient]);
                resolve(getQuery)
               } catch (error) {
                resolve({ success: false, err : error, 'message':`Erreur Interne Serveur `,'status':500  })
               }
            })  
        }
        async function action(nomClient,emailClient,telephoneClient,professionClient,ddnClient,idSexeClient,creationClient) {
            let clients = await recordClient(nomClient,emailClient,telephoneClient,professionClient,ddnClient,idSexeClient,creationClient) 
            return clients;
        }
        return action(nomClient,emailClient,telephoneClient,professionClient,ddnClient,idSexeClient,creationClient);
        
    }
    listClient() {
        function getAllClient() {
            return new Promise(async(resolve, reject ) => {
               try {
                let sentenceSql = `SELECT *,idsexe_clients AS idSexe,`
                sentenceSql += `(SELECT nom_sexe FROM sexe WHERE id_sexe = idSexe limit 1  ) AS nomSexe`
                sentenceSql += ` FROM clients`
                let getQuery =  await query.QuerySql(sentenceSql,[],false );
                resolve(getQuery)
               } catch (error) {
                resolve({ success: false, err : error, 'message':`Erreur Interne Serveur `,'status':500  })
               }
            })  
        }
        async function action() {
            let clients = await getAllClient() 
            return clients;
        }
        return action();
    }
    updateClient(idclient,nomClient,emailClient,telephoneClient,professionClient,ddnClient,idSexeClient,creationClient) {
        function updateOneClient(idclient,nomClient,emailClient,telephoneClient,professionClient,ddnClient,idSexeClient,creationClient) {
            return new Promise(async (resolve, reject ) => {
               try {
                let sentenceSql = `UPDATE clients SET nom_clients=?,email_clients=?,telephone_clients=?,profession_clients=?,ddn_clients=?,nomSexe=? WHERE id_clients=?`
                let getQuery =  await query.updateQuerySql(sentenceSql,[nomClient,emailClient,telephoneClient,professionClient,ddnClient,idSexeClient,creationClient,idclient] );
                resolve(getQuery)
               } catch (error) {
                resolve({ success: false, err : error, 'message':`Erreur Interne Serveur `,'status':500  })
               }
            })  
        }
        async function action() {
            let modifyClients = await updateOneClient(idclient,nomClient,emailClient,telephoneClient,professionClient,ddnClient,idSexeClient,creationClient) 
            return modifyClients;
        }
        return action();

    }
    profilClient(id) {
         function getProfilClient(id) {
            return new Promise(async (resolve, reject ) => {
               try {
                let sentenceSql = `SELECT *,DATE_FORMAT(dde_clients,"%d-%m-%Y") AS date_creation,idsexe_clients AS idSexe,`
                sentenceSql += `(SELECT nom_sexe FROM sexe WHERE id_sexe = idSexe limit 1  ) AS nomSexe`
                sentenceSql += ` FROM clients WHERE id_clients=?`
                let getQuery = await query.QuerySql(sentenceSql,[id],true );
                resolve(getQuery)
               } catch (error) {
                resolve({ success: false, err : error, 'message':`Erreur Interne Serveur `,'status':500  })
               }
            })  
        }
        async function action(id) {
            let clients = await getProfilClient(id) 
            return clients;
        }
        return action(id);
    }
    deleteClient(id) {
        async function recordClient(id) {
            return new Promise(async (resolve, reject ) => {
               try {
                let sentenceSql = `DELETE clients WHERE id_clients=?`
                let getQuery = await query.deleteQuerySql(sentenceSql,[id]);
                resolve(getQuery)
               } catch (error) {
                resolve({ success: false, err : error, 'message':`Erreur Interne Serveur `,'status':500  })
               }
            })  
        }
        async function action(id) {
            let clients = await recordClient(id) 
            return clients;
        }
        return action(id);
        
    }
    createParam() {
        function getAutorisation() {
            return new Promise(async (resolve, reject ) => {
               try {
                let sentenceSql = `SELEcT * From autorisation`
                let getQuery = await query.QuerySql(sentenceSql,[], false);
                resolve(getQuery)
               } catch (error) {
                resolve({ success: false, err : error, 'message':`Erreur Interne Serveur `,'status':500  })
               }
            })  
        }
        async function action() {
                let autorisations = await getAutorisation() 
                if( autorisations.success){
                    if( autorisations.find){
                        let count = 0, errors=0;
                        for await( let autorisation of autorisations.datas ) {
                            let sentenceSql = `insert into access set idrole_access=?,idautorisation_access=?,niveau_access=?;`
                            let getQuery = await query.insertionQuerySql(sentenceSql,[1,autorisation.id_autorisation,1]);
                            if (!getQuery.success) {
                                errors++
                            }
                            count++
                            if (count==autorisations.datas.length) {
                                if(errors==autorisations.datas.length){
                                    return {success: false, message:"Une erreur est survenue"}
                                } else if(errors>0){
                                    return {success: true, message:"Une ou pluisieurs erreurs sont survenues pendant l'enregistrement"}

                                }else {return {message:'les access ont bien été enregistré',success: true  }}
                            }
                        }
                    }
                }else { return autorisations}
        }
        return action();
        
    }


}

module.exports = Client ;