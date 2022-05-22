var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose
    .connect("mongodb+srv://WilyerArias77:DBadmin2022@cluster0.u3qlx.mongodb.net/EjercicioLogin?retryWrites=true&w=majority")
    .then(function (bodydatos) {
        console.log("esta funcionando")
    }).catch(function (err) {
        console.log("ocurrio un error")

    });

app.use(bodyParser.urlencoded({ extended: true }));
app.set("views" , __dirname + "/src/views");
app.set("view engine", "ejs");
app.use(express.static (__dirname + "/css"));
app.use(express.static (__dirname + "/images"));


var usuario = require("./src/models/login");

//Ruta para acceder al INDEX:
app.get("/", function (req, res) {
    res.render("index");
});

//CAPTURO la informacion del LOGIN y VALIDO el condicional:
app.post("/login", async function (req, res){
    var dato1 = req.body.correo;
    var dato2 = req.body.clave;

    var consulta = await usuario.find({ $and: [{ "email": dato1 }, { "contrasena": dato2 }] });


    if (consulta == '') {
        console.log("Los datos ingresados no son correctos");
        res.render("formulario");
        

    }else {
        var dato3 = consulta[0].email;
        var dato4 = consulta[0].contrasena;
        if (dato3 == dato1 && dato2 == dato4) {
            //res.render('formulario', { datos: consulta })
            console.log("ingresó a completar");
            res.render("completar", {datos: consulta});
        }
    }
});



//Ruta para VER la informacion del usuario y COMPLETAR la informacion si es necesario:
app.post("/completar/:id", async function (req, res) {
    var infouser = await usuario.findById(req.params.id);
    infouser.nombre = req.body.nombre;
    infouser.apellido = req.body.apellido;
    infouser.usuario = req.body.usuario;
    infouser.email = req.body.email;
    infouser.direccion = req.body.direccion;
    infouser.pais = req.body.pais;
    infouser.estado = req.body.estado;
    infouser.codigopostal = req.body.codigopostal;
    infouser.mayorEdad = req.body.mayorEdad;
    infouser.terminosYcondiciones = req.body.terminosYcondiciones;
    infouser.contrasena = req.body.contrasena;

    await infouser.save();
        
    res.redirect("/");


});

//Ruta para CREAR un nuevo USUARIO:
app.post("/registrar", async function (req, res) {
    var registro = req.body;
    console.log(registro);
    
    var nuevo_registro = new usuario(registro);
    await nuevo_registro.save();
    console.log("usuario ingresado");
    res.redirect("/");
});



app.listen(3000);
