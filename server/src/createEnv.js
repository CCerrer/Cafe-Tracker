import fs from 'fs'
fs.createReadStream('.sample-env')
  .pipe(fs.createWriteStream('.env'))
