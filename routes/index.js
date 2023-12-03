var express = require('express');
var router = express.Router();
const {conexion} = require('../database/conexion')

/* Obtener página de inicio */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Enrutamiento para agregar un medico a la base de datos
router.post('/register-doctor', (req, res) => {
  const nombres = req.body.nombres
  const apellidos = req.body.apellidos
  const cedula = req.body.cedula
  const consultorio = req.body.consultorio
  const telefono = req.body.telefono
  const correo = req.body.correo
  const especialidad = req.body.especialidad
  
  conexion.query(`INSERT INTO medicos (cedula, nombres, apellidos, especialidad, consultorio, correo, telefono) VALUES (${cedula}, '${nombres}', '${apellidos}', '${especialidad}', '${consultorio}', '${correo}', '${telefono}')`, (error, resultado) => {
    if (error) {
      console.log('Ocurrio un error en la ejecución', error)
      res.status(500).send('Error en la ejecución')
    } else {
      res.status(200).redirect('/')
    }
  })
})




module.exports = router;
