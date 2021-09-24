$(document).ready(()=>{
    function connexion(username, password) {
        if(username, password){
            fetch('/',{
                method:'POST',                     
            body:JSON.stringify({ username,password}), 
            headers: { "Content-Type": "application/json" },})                 
            .then(function(response) {                    
                 return response.json();})                 
            .then(function(data) {                                  
                if(data.success){                        
                    location.href ='/dashbord'; 
                    let message= data.message;                        
                    Swal.fire("connexion", `${message}`, "success");                      
                }else{                         
                    let message= data.message;                        
                    Swal.fire("connexion", `${message}`, "error");}                 
                })
            .catch((error)=>{                    
                            let message= "Erreur interne1";                     
                            Swal.fire("connexion", `${message}`, "error");
            })
        }else {
            Swal.fire("connexion", `Vous devez renseigner un identifiant et un mot de passe`, "error");
        }
    }
    $("#connexionBtn").on('click', ()=> {
        let username =  $("#username").val()
        let password =  $("#password").val()
        connexion(username, password)

    })
})