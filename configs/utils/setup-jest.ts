const path = require('path');

[".env", ".local.env"].forEach(filename => {
    require('dotenv').config({
        path: path.join(__dirname, '..', '..', filename),
    });
})

