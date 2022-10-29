const multer = require('multer');
const Path = require("path")
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/profile')
    },
     filename:(req,file,callback) =>{
        const ext=file.mimetype.split('/')[1]
        callback(null,`image-${Date.now()}.${ext}`)
    }
  })
  888
  const fileFilter =
    (req, file, cb) => {
        const acceptableExtensions = ['.jpeg','.jpg','.png','.svg'];
        if (!(acceptableExtensions.includes(Path.extname(file.originalname)))) {
          return cb(new Error('Upload Only images files'));
        }
        cb(null,true)
    }
    // To reject this file pass `false`, like so:

  module.exports= {storage,fileFilter};