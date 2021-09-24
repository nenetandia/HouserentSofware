let db = require('../config/dbConnect'); 

class QueryManager{ 

    QuerySql(requestSql,dataSql,returnOne){ 
        async function insertionSql(requestSql,dataSql,returnOne){ 
            return new Promise((resolve,reject)=>{ 
                try { 
                    db.query(requestSql,dataSql,function(err,results){ 
                        if(err){ 
                            resolve({'success':false,'err':err,'message':`Erreur Interne serveur `,'status':500}); 
                        }else{ 
                            if(results.length>0){ 
                                let dataToReturn= returnOne?{'success':true,'status':200,'find':true,'data':results[0]}:{'success':true,'status':200,'find':true,'datas':results}; 
                                resolve(dataToReturn); 
                            }else{ 
                                let dataToReturn= returnOne?{'success':true,'status':200,'find':false,'data':results[0]}:{'success':true,'status':200,'find':false,'datas':results}; 
                                resolve(dataToReturn); 
                            }  
                        } 
                    });  
                } catch (error) { 
                    resolve({'success':false,'err':err,'message':`Erreur Interne serveur `,'status':500}); 
                } 
            }) 
        } 

        async function insertionData(requestSql,dataSql,returnOne){ 
            let record = await insertionSql(requestSql,dataSql,returnOne); 
            return record; 
        } 

        return insertionData(requestSql,dataSql,returnOne); 
    } 

    insertionQuerySql(requestSql,dataSql){ 
        async function insertionSql(requestSql,dataSql){ 
            return new Promise((resolve,reject)=>{ 
                try { 
                    db.query(requestSql,dataSql,function(err,results){ 
                        if(err){ 
                            resolve({'success':false,'err':err,'message':`Erreur Interne serveur `,'status':500}); 
                        }else{ 
                            resolve({'success':true,'status':200,'id':results.insertId});     
                        } 
                    });  
                } catch (error) { 
                    resolve({'success':false,'err':err,'message':`Erreur Interne serveur `,'status':500}); 
                } 
            }) 
        } 

        async function insertionData(requestSql,dataSql){ 
            let record = await insertionSql(requestSql,dataSql); 
            return record; 
        } 

        return insertionData(requestSql,dataSql); 
    } 

    updateQuerySql(requestSql,dataSql){ 
        async function updateSql(requestSql,dataSql){ 
            return new Promise((resolve,reject)=>{ 
                try { 
                    db.query(requestSql,dataSql,function(err,results){ 
                        if(err){ 
                            resolve({'success':false,'err':err,'message':`Erreur Interne serveur `,'status':500}); 
                        }else{ 
                            if(results.affectedRows>=1){ 
                                resolve({'success':true,'status':200,update:true});  
                            }else{ 
                                resolve({'success':true,'status':200,update:false});  
                            } 
                        } 
                    });  
                } catch (error) { 
                    resolve({'success':false,'err':err,'message':`Erreur Interne serveur `,'status':500}); 
                } 
            }) 
        } 

        async function updateData(requestSql,dataSql){ 
            let record = await updateSql(requestSql,dataSql); 
            return record; 
        } 

        return updateData(requestSql,dataSql); 
    } 

    deleteQuerySql(requestSql,dataSql){ 
        async function deleteSql(requestSql,dataSql){ 
            return new Promise((resolve,reject)=>{ 
                try { 
                    db.query(requestSql,dataSql,function(err,results){ 
                        if(err){ 
                            resolve({'success':false,'err':err,'message':`Erreur Interne serveur `,'status':500}); 
                        }else{ 
                            if(results.affectedRows>=1){ 
                                resolve({'success':true,'status':200,delete:true});  
                            }else{ 
                                resolve({'success':true,'status':200,delete:false});  
                            } 
                        } 
                    });  
                } catch (error) { 
                    resolve({'success':false,'err':err,'message':`Erreur Interne serveur `,'status':500}); 
                } 
            }) 
        } 

        async function deleteData(requestSql,dataSql){ 
            let record = await deleteSql(requestSql,dataSql); 
            return record; 
        } 

        return deleteData(requestSql,dataSql); 
    } 

} 

module.exports= QueryManager; 
