const fs = require("fs")
const express = require("express") 
const csv = require("csv-parser")
const multer = require("multer")
const {promisify} = require("util")
const pipeline = promisify(require("stream").pipeline)
const results=[]


const app=express()
app.use(express.json())
app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin","*")
    res.setHeader("Access-Control-Allow-Headers","*")
    next()
})
app.get("/",(req,res) => res.status(200).send("hello world"))


const upload = multer();
 app.post("/upload", upload.single("file"), async (req,res,next) => {
   try{ const {
        file,
    } = req;
    //console.log("inside upload")
     // console.log(file)
    const fileName = Math.floor(Math.random() * 1000)+'.csv';
    //console.log(fileName)
    await pipeline(file.stream,
         fs.createWriteStream(`${__dirname}/uploads/${fileName}`))
         
        //results=[];
         fs.createReadStream(`${__dirname}/uploads/${fileName}`)
         .pipe(csv({}))
          .on('data',(data) => results.push(data))
           .on('end',() =>{
              // console.log(results)
            res.send(results)
          })
          results.splice(0,results.length)
          
         

   }
   catch{
       (error) => console.log(error.message)
   }
}
)

  




 ////listener
app.listen(process.env.PORT || 9000)