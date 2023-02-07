const mongoose = require('mongoose');
mongoose.set("strictQuery", true);

mongoose.connect(process.env.MONGO_URL)
.then(() =>{
    console.log('db is connected!')
})
.catch((ex) =>{
    console.log('db connection failed: ', ex)
})