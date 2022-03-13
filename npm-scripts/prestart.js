const fs = require('fs');
const path = require('path');

(async () => {
  // Remove if exist previous .env file on main folder.
  if (fs.existsSync(path.resolve('./.env'))) fs.unlinkSync(path.resolve('./.env'));
  // Check if exist .env file by environment flag and copy to main folder.
  if (fs.existsSync(path.resolve(`./env/.env.${process.argv[2]}`))) {
    fs.copyFileSync(path.resolve(`./env/.env.${process.argv[2]}`), path.resolve('./.env'));
  } else {
    process.exit(1);
  }
})();
