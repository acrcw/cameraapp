let db;
let openrequest=indexedDB.open("mydatabase")
openrequest.addEventListener("success",(e)=>{
    console.log("success")
    db=openrequest.result;
})
openrequest.addEventListener("error",(e)=>{
    console.log("error")
    
})
openrequest.addEventListener("upgradeneeded",(e)=>{
    console.log("upgraded")
    db=openrequest.result;
    //object store can only be created here
    db.createObjectStore("video",{keyPath:"id"});
    db.createObjectStore("image",{keyPath:"id"});
    
})