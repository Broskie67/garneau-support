const multer = require('multer')
const path = require('path')
const fs = require('fs')

const uploadPath = path.join(__dirname, '../../uploads')

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true })
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname)
    cb(null, file.fieldname + '-' + uniqueSuffix + extension );
  },
})

const fileFilter = (req, file, cb) => {
  const typesAutorises = [
    'application/pdf',
    'image/png',
    'image/jpeg',
    'image/webp'
  ];

  if (typesAutorises.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Type de fichier non autorisé.'));
  }
}

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
})

module.exports = upload