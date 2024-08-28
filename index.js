const express = require("express");
const mongoose  = require("mongoose")
const errorHandler = require("./middleware/errorHandler")
const dotenv = require("dotenv");
const app = express();
// Load environment variables from .env file
dotenv.config();
app.use(express.json());

// Use PORT from environment variables or default to 5001
const port = process.env.PORT || 5001;

mongoose.connect("mongodb+srv://kamaldeep7503:UscQHa6zfm2JvRPF@backenddb.h5aup.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB")
  .then(() => { console.log('Connected!') 
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
});

app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
// app.use(errorHandler);


