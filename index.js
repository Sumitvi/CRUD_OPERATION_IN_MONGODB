const express = require("express");
const app = express();
const port = 8080;
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");

// Requiring Method-override
const methodOverride = require("method-override");

app.use(express.static(__dirname));



app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(methodOverride("_method"));
// Isko Nahi Likhenge to req.body ka use nahi kar payenge
app.use(express.urlencoded({ extended: true }));

main().then((res) => {
    console.log("Connected Sucessfully");
}).catch((err) => {
    console.log(err);
})

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}


app.get("/", (req, res) => {
    res.send("Yahhh Its On working Condition");
})

app.listen(port, () => {
    console.log("Server has Listening");
})

// Inserting the data

let chat1 = new Chat({
    from: "Rahul",
    to: "Rajeev",
    msg: "Hello Rajeev",
    created_at: new Date()
})

// chat1.save().then((res)=>{
//     console.log(res);
// }).catch((err)=>{
//     console.log(err);
// })


// Index Route
app.get("/chats", async (req, res) => {
    let chats = await Chat.find();
    // console.log(chats);
    res.render("chats.ejs", { chats });

})


// New Message Route
app.get("/chats/new", (req, res) => {
    res.render("newform.ejs");


})

// Create Route
app.post("/chats", (req, res) => {
    let { from, to, msg, created_at } = req.body;
    let chat = new Chat({
        from: from,
        to: to,
        msg: msg,
        created_at: new Date(),
    })

    console.log(chat);
    //    res.send("Working");
    chat.save().then((res) => {
        console.log(res);
    }).catch((err) => {
        console.log(err);
    })

    res.redirect("/chats");

})


// Edit Route

app.get("/chats/:id/edit", async (req, res) => {
    let { id } = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs", { chat })
})

// Update Route - Not Working
app.put("/chats/:id",(req,res)=>{
    let {id}=req.params;
    let {msg : newMsg} = req.body;

    let UpdatedChat = Chat.findByIdAndUpdate(id,{msg : newMsg},{runvalidator : true, new:true})
    console.log(UpdatedChat);

    res.redirect("/chats");
})

// let UpdatedChat = await Chat.findByIdAndUpdate(id, { msg: newMsg },
//     {
//         new: true,
//         runValidators: true
//     })





// DELETE Route

app.delete("/chats/:id", async (req, res) => {
    let { id } = req.params;
    let DeleteUser = await Chat.findByIdAndDelete(id);
    console.log(DeleteUser);
    res.redirect("/chats");
})