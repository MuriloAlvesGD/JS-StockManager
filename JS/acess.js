const fs = require('fs');
const path = '../acess.json';


function load() {
    let contentJson;
    try{
        contentJson = JSON.parse(fs.readFileSync(path, 'utf8'));
    } catch (e){
        return ''
    }
    return contentJson;
}

function save(content){
        const contentString = JSON.stringify(content);
        return fs.writeFileSync(path, contentString);
}

function isEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (regex.test(email)) {
        return true; // Email válido
    } else {
        return false; // Email inválido
    }
}

function saveAcess(email, password){
    let content = load();
    const newUser = {
        email: email,
        password: password
    }
    if (content === ''){
        const temp = [newUser];
        save(temp);
    }

    else{
        const temp = [newUser];
        const saveArray = temp.concat(content);
        save(saveArray);
    }
}

function verifyAcess(email, password){
    const content = load();
    const result = content.some(obj => obj.email === email && obj.password === password);
    return result;
}