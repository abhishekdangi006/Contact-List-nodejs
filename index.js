const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();

app.set('view engine' , 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets')); // for style

//middleware
// app.use(function(req,res,next){
//     console.log("middleware is being started");
//     next();
// })

app.get('/home', function(req,res){
    return res.render('home', {'title' : "Ejs server"});
    // res.send("<h1>This is first express js server</h1>");
})
app.get('/practice', function(req,res){
    return res.render('practice', {'title' : "Practice of EJS"});
    // res.send("<h1>This is first express js server</h1>");
})

let contactList = [
    {
        'name' : 'ajay',
        'phone': 685423
    },
    {
        'name' : 'vijay',
        'phone': 68523
    },
    {
        'name' : 'abhishek',
        'phone': 584236512
    },
    {
        'name' : 'ram',
        'phone': 5686521
    },
    {
        'name' : 'sona',
        'phone': 005423
    },
    {
        'name' : 'sakshi',
        'phone': 978645
    }
]


//Showing the list of contact from the database
app.get('/', function(req,res){

    Contact.find({}, function(err, contact){
        if(err){
            console.log("Error while fatching contact from database" , err);
            return;
        }
        return res.render('contact', {
            'title' : "Contact List",
            'contact_list' : contact,
    });
    });
    
    // res.send("<h1>This is first express js server</h1>");
})
// app.get('/contact', function(req,res){
//     res.send("<h1>Contact</h1><p>This is contact page of express server</P>");
// })


//deleting contact form database
app.get('/delete-contact/:id', function(req,res){
    console.log(req.params);
    //get the id from query in ul
    let id = req.params.id;

    //find the contact from the database and deleting it
    Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log("Error while deleing the contact", err);
            return;
        }
        console.log("Contact has been suceesfully deleted");
        res.redirect('back');
    })

    // deleting contact from give array
    // let contactIndex = contactList.findIndex(contact => contact.phone == phone);
    // if(contactIndex != -1){
    //     contactList.splice(contactIndex,1);
    // }
    // res.redirect('back');

});

app.post('/create-contact', function(req, res){
    // contactList.push(req.body);
    // res.redirect('back');

    Contact.create({
        name: req.body.name,
        phone: req.body.phone,
    }, function(err, newContact){
        if(err){
            console.log("Error is showing while creating a contact", err);
            return;
        }
        console.log('*****', newContact);
        return res.redirect('back');
    })
});

app.listen(port,function(err){
    if(err){
        console.log("Error is showing ", err);
    }

    console.log("Your express js server is now live on port", port);
});