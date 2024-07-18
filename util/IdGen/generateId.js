const { head } = require("../../routes/users");


const generateId = (last_id)=>{
    
    let prefix = last_id.substring(0,4).split("");
    let number = Number(last_id.substring(4,9))


    if(number>=9999){
        number = 0;
        let header = 3;
        const newPrefix = increasePrefix(prefix, header)
        return(newPrefix + (number).toString().padStart(4, "0"))
       
    }else{
        const newId = prefix.join("")+ (number+1).toString().padStart(4, "0")
        return(newId)
    }

}


function increasePrefix(prefix, header){

    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

    if(prefix[header] == letters[letters.length-1]){
        prefix[header] = letters[0]
        header = header-1
        increasePrefix(prefix, header);
    }else{
        prefix[header] = letters[letters.indexOf(prefix[header])+1]
    }
    return prefix.join("")
}

module.exports = generateId;