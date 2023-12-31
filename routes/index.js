var express = require('express');
var router = express.Router();
const {conexion} = require('../database/conexion')

/* Obtener página de inicio */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Enrutamiento para visualizar los medicos de la base de datos
router.get('/doctors_list', (req, res) => {
  conexion.query('SELECT * FROM medicos;', (error, resultado) => {
    if (error) {
      console.log('Ocurrio un error en la ejecución', error)
      res.status(500).send('Error en la ejecución')
    } else {
      console.log(resultado)
      res.status(200).render('doctors_list', { title:'Doctors List',resultado: resultado })
    }
  })
})

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
      res.status(200).redirect('/doctors_list')
    }
  })
})

//Enrutamiento para visualizar pacientes de la base de datos
router.get('/patients_list', (req, res) => {
  conexion.query('SELECT * FROM pacientes;', (error, resultado) => {
    if (error) {
      console.log('Ocurrio un error en la ejecución', error)
      res.status(500).send('Error en la ejecución')
    } else {
      res.status(200).render('patients_list', { title: 'Patients List', resultado: resultado })
    }
  })
})

// Enrutamiento para agregar un paciente a la base de datos
router.post('/register-patient', (req, res) => {
  const nombres = req.body.nombres
  const apellidos = req.body.apellidos
  const cedula = req.body.cedula
  const fecha_nacimiento =req.body.fecha_nacimiento
  const telefono = req.body.telefono
  
  conexion.query(`INSERT INTO pacientes (cedula, nombres, apellidos, fecha_nacimiento, telefono) VALUES (${cedula}, '${nombres}', '${apellidos}', '${fecha_nacimiento}', '${telefono}')`, (error, resultado) => {
    if (error) {
      console.log(error)
      res.status(500).send('Ocurrio un error en la consulta')
    } else {
      res.status(200).redirect('/patients_list')
    }
  })
})

//Enrutamiento para consultar medicos de una especialidad
router.post('/consulta_citas', (req, res) => {
  const especialidad = req.body.especialidad
  
  conexion.query(`SELECT * FROM medicos WHERE especialidad='${especialidad}';`, (error, resultado) => {
    if (error) {
      console.log(error)
      res.status(500).send('Ocurrio un error en la consulta')
    } else {
      res.status(200).render('agendar_cita', { title: 'Agendar Cita', resultado })
    }
  })
})

//Enrutamiento para visualizar citas agendadas
router.get('/listado-citas', (req, res) => {
  conexion.query(`SELECT fecha_cita, CONCAT(pacientes.nombres,' ',pacientes.apellidos) AS paciente, pacientes.telefono, medicos.especialidad, medicos.consultorio, CONCAT(medicos.nombres,' ', medicos.apellidos) AS medico FROM cita_medica, pacientes, medicos WHERE cedula_medico=medicos.cedula AND cedula_paciente=pacientes.cedula AND fecha_cita >= curdate() order by fecha_cita asc;`, (error, resultado) => {
    if (error) {
      console.log('Ocurrio un error en la ejecución', error)
      res.status(500).send('Error en la ejecución')
    } else {
      res.status(200).render('citas', { title: 'Citas Médicas Agendadas', resultado })
    }
  })
})

//Enrutamiento para registrar en base de datos la cita agendada
router.post('/registrar_cita', (req, res) => {
  const cc_paciente = req.body.cedula
  const fecha = req.body.fecha_cita
  const cc_medico = req.body.medico
  
  conexion.query(`INSERT INTO cita_medica (cedula_medico, cedula_paciente, fecha_cita) VALUES (${cc_medico}, '${cc_paciente}', '${fecha}')`, (error) => {
    if (error) {
      console.log('Ocurrio un error en la ejecución', error)
      res.status(500).send('Error en la ejecución')
    } else {
      res.status(200).redirect('/consulta_citas')
    }
  })
})



module.exports = router;
