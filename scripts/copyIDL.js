const fs = require('fs');
const idl = require('../target/idl/voto_electronico.json');

fs.writeFileSync('../app/src/idl.json', JSON.stringify(idl));