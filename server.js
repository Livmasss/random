const PORT = 80

const RandomOrg = require("random-org")
const express = require("express")
const formidable = require("express-formidable")

const random = new RandomOrg({ apiKey: 'de83aeca-84fc-48ae-a390-00f192a59f7d' })
const app = express()

app.use(express.static("./static"))
app.listen(PORT, (err) => {
    if (err)
        console.log(err)
})

app.post("/random_int", formidable(), async (req, res) => {
    try {
        const minNumber = req.fields.min
        const maxNumber = req.fields.max
    
        const nums = await random.generateIntegers({
            min: minNumber, max: maxNumber, n: 1 })
       console.log(nums.random.data[0])

       res.send(
        JSON.stringify(nums.random.data[0]))
    }
    catch(err) {
        res.send(JSON.stringify({ 
            err: err.message
        }))
    }
})
