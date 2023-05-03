const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, path.join(__dirname + '/../../public/img/uploads'));
    },
    
    filename: (req, file, cb)=>{
        let actualFileName = `new-${path.parse(file.originalname).name.trim()}+${Date.now()}`
        cb(null, 'new-'+ file.originalname.trim()) + Date.now(); 
    }
 });
 
 const upload = multer({ storage: storage });
 
 module.exports = upload;