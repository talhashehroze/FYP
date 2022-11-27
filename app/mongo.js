const express =  require('express')
const { default: mongoose } = require('mongoose')
const mongo = require('mongoose')
const app =express()

const uri = 'mongodb+srv://talha:talha@cluster0.r1aufiu.mongodb.net/?retryWrites=true&w=majority'

const MongoConnect = () => (

async function connect()
{
    try {
        await mongoose.connect(uri)
        console.log('mongo connected')
    } catch (error) {
        console.log('error')
    }
}
)

export default MongoConnect