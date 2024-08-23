//globalSetup.js
import dotenv from 'dotenv';

async function globalSetup(config) {
  dotenv.config({
    path: '.env',
    override: true
  });
}

module.exports = globalSetup;
