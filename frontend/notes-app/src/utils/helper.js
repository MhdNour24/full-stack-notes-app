
export const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return emailPattern.test(email);
}

export const getInitials=(name)=>{
    if(!name) {
        return ""
    }
    const words= name.split(" ");
    let initials=""
    const length=words.length;
    if(length===1) {
        initials= words[0].slice(0,2);
    }
    for(let i=0; i<length; i++) {
        initials+=words[i][0];
    }
    return initials.toUpperCase()
}