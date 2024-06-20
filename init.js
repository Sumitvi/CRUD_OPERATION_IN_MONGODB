const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

main().then((res)=>{
    console.log("Connected Sucessfully");
}).catch((err)=>{
    console.log(err);
})

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}



let chat1 = new Chat({
    from :"Rahul",
    to :"Rajeev",
    msg:"Hello Rajeev",
    created_at : new Date()
})

// chat1.save().then((res)=>{
//     console.log(res);
// }).catch((err)=>{
//     console.log(err);
// 


let allchats = [
    {

        from :"Sujal",
        to :"Aman",
        msg:"Hello Aman Dost",
        created_at : new Date()

    },

    {

        from :"Sanjeev",
        to :"Rohan",
        msg:"Khana Kha Liya",
        created_at : new Date()

    },

    {

        from :"Sohit",
        to :"Sonil",
        msg:"Kaisa hai bhai",
        created_at : new Date()

    },

    {

        from :"Samrat",
        to :"Rohink",
        msg:"Hello Dii",
        created_at : new Date()

    },

    {

        from :"Raman",
        to :"Pratigya",
        msg:"Hii Pratigya what are you doing??",
        created_at : new Date()

    },

]

Chat.insertMany(allchats);