$(document).ready(()=>{
    function createUser(datas) {
            fetch('/utilisateur',{
                method:'POST',                     
            body:JSON.stringify(datas), 
            headers: { "Content-Type": "application/json" },})                 
            .then(function(response) {                    
                 return response.json();})                 
            .then(function(data) {                                  
                if(data.success){                        
                    let message= data.message;                        
                    Swal.fire("creation Utilisateur", `${message}`, "success");                      
                }else{                         
                    let message= data.message;                        
                    Swal.fire("creation Utilisateur", `${message}`, "error");}                 
                })
            .catch((error)=>{                    
                            let message= "Erreur interne";                     
                            Swal.fire("creation Utilisateur", `${message}`, "error");
            })
    }
    let addUser = $("#add_utilisateur");
    addUser.on('submit', (events)=> {
        events.preventDefault();
        var dataOne = addUser.serializeArray().reduce(function(obj, item) { 
            obj[item.name] = item.value; 
            return obj; 
          }, {}); 

        createUser(dataOne)

    })
})