const fs = require('fs')

fs.writeFileSync('./.env', `OPENCAGE_KEY=${process.env.OPENCAGE_KEY}\n`)