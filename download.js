const htpp = require('http');
const fs = require('fs');
const path = require('path');
const uuid = require('uuid/v1');
const downloadPage = (url='http://nodeprogram.com') =>{
    const fetchPage = (urlF, callback) =>{
        htpp.get(url,(response) => {
            let buff='';
            response.on('data', (chunk) =>{
                buff+=chunk; 
            });
            response.on('end', ()=>{
                callback(null,buff);
            });
            response.on('error', (error)=>{
                console.log(error);
                callback(error);
            });
        }).on('error', (error)=>{
            console.log(error.message);
            callback(error);
        });
    }
    
    const folderName = uuid();
    fs.mkdirSync(folderName);
    
    fetchPage(url, (error, data) => {
        if(error){
            return console.log(error);
        }

        fs.writeFileSync(path.join(__dirname, folderName, 'url.txt'), url);
        fs.writeFileSync(path.join(__dirname, folderName, 'file.html'), data);
    
        console.log('downloading is done in folder', folderName);
    });
}
downloadPage(process.argv[2]);