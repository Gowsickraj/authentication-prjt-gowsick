const express = require("express")
const dotenv = require("dotenv")
const { connectDB } = require("./config/db.js")
const { router } = require("./routes/auth.js")

const port = process.env.PORT || 5000


const app = express()
app.use(express.json())
dotenv.config()

app.use("/api/users",router)

connectDB()
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);

})