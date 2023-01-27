const mongoose = require('mongoose');

main().catch(err => console.log("The error is showing you are not connected to server",err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
  console.log("Your database is now connected on following site- mongodb://127.0.0.1:27017/test");
  
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

