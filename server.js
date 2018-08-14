// require express
var express = require("express");
// path module -- try to figure out where and why we use this
var path = require("path");
// create the express app
var app = express();
var bodyParser = require('body-parser');
// use it!
app.use(bodyParser.json());
// static content
app.use(express.static(__dirname + '/public/dist/public'));


var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/manager_db');

var ProductSchema = new mongoose.Schema({
    name: {type: String},
    price: {type: Number},
    image_url: {type: String}},
    {timestamps: true}
);

function validator(data) {
    errors = [];

    if(data.name.length < 1) {
        errors.push({
            error: "name",
            message: "Name cannot be blank"
        });
    }

    if(data.price < 0) {
        errors.push({
            error: "price",
            message: "Price cannot be negative"
        });
    }

    if(data.image_url < 1) {
        errors.push({
            error: "image_url",
            message: "Image Url cannot be blank"
        });
    }

    return errors;
}

mongoose.model("Product", ProductSchema);
var Product = mongoose.model("Product");


app.get("/getProducts", function(req, res) {
    Product.find({}, function(err, products) {
        if(err) {
            return res.json({hasErrors: true, errors: err});
        }
        else{
            return res.json(products);
        }
    })
})

app.get("/getOneProduct/:id", function(req, res) {
    Product.findOne({_id: req.params.id}, function(err, product) {
        if(err) {
            return res.json({hasErrors: true, errors: err});
        }
        else{
            return res.json(product);
        }
    })
})

app.post("/newProduct", function(req, res) {
    var errors = validator(req.body);

    if(errors.length > 0) {
        return res.json({hasErrors: true, errors: errors});
    }

    else {
        var newProduct = new Product(req.body);
        newProduct.save(function(err) {
            if(err) {
                return res.json({hasErrors: true, errors});
            }
            else {
                return res.json({hasErrors: false, errors: []});
            }
        });
    }
});

app.put("/editProduct/:id", function(req, res) {
    var errors = validator(req.body);

    if(errors.length > 0) {
        return res.json({hasErrors: true, errors: errors});
    }

    else {
        Product.findOne({_id: req.params.id}, function(err, product) {
            if(err) {
                return res.json({hasErrors: true, errors: errors});
            }
            else {
                product.name = req.body.name;
                product.price = req.body.price;
                product.image_url = req.body.image_url;

                product.save(function(err) {
                    if(err) {
                        return res.json({hasErrors: true, errors: errors});
                    }
                    else{
                        return res.json({hasErrors: false, errors: []})
                    }
                });
            }
        });
    }
});

app.delete("/deleteProduct/:id", function(req, res) {
    Product.remove({_id: req.params.id}, function(err) {
        if(err) {
            return res.json({hasErrors: true, errors: errors});
        }
        else {
            return res.json({hasErrors: true, errors: []});
        }
    });
});

app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./public/dist/public/index.html"))
});


// tell the express app to listen on port 8000
app.listen(8000, function() {
 console.log("listening on port 8000");
});