var express = require('express');

var bodyParser = require('body-parser');

var User = require('./models/User');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json())

app.post('/save', function(req, res){
    let user = new User();
    user.name = req.body.name;
    user.number =  req.body.number;
    user.email =  req.body.email;
    user.password =  req.body.password;
    user.save(user, function(err, user){
        if(err) return res.status(400).send({error : err.message});
        res.send({message : "saved...."});
    });
});

app.put('/update/:id', function(req, res){
    User.findOne({_id : req.params.id}, function(err, user){
        if(err) res.send(err);
        user.name = req.body.name;
        user.save(user, function(err, user){
            res.send({message : "updated....."})
        });
    });
})

app.delete('/delete/:id', function(req, res){
    User.deleteOne({_id : req.params.id}, function(err, user){
        if(err) res.send(err);
        res.send({message : "deleted.."}); 
    });
});

app.get('/', function(req, res){
    User.find({}, function(err, users){
        if(err) res.send(err);
        res.send(users);
    });
});

app.listen(4000, function(){
    console.log("app listen on 4000");
})