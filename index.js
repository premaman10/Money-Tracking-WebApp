var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")
const app =express()
app.use(bodyParser.json())
app.use(express.static("mycode"))
app.use(bodyParser.urlencoded({
    extended: true
}))
mongoose.connect("mongodb://localhost:27017/MoneyExpenditure")
var db = mongoose.connection
db.on('error',()=>console.log("error"))
db.once("open",()=> console.log("connected to database"))

app.post("/add",(req,res)=>{
    var category_select = req.body.category_select
    var amount_input = req.body.amount_input
    var information = req.body.information
    var input_date = req.body.input_date

    var data={
        "Category": category_select,
        "Amount":amount_input,
        "Information":information,
        "Date":input_date
    }
    db.collection('USERS').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record inserted succefully")
    })
})
app.get("/",(req,res) =>{
    res.set({
        "Allow-access-Allow-Origin":'*'
    })
    return res.redirect('index.html')
}).listen(5000)

console.log("listening on port 5000")