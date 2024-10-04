// copyAssets.js
const fs = require('fs-extra');
const path = require('path');

// Define source and destination directories
const srcDir = path.join(__dirname, 'out', '_next', 'static');
const destDir = path.join(__dirname, 'out', 'static');

// Function to copy assets from src to dest
fs.copy(srcDir, destDir)
  .then(() => console.log('Assets copied to static folder'))
  .catch(err => console.error(err));
