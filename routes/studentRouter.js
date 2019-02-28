const studentsRouter = require('express').Router();
const knex = require('knex');


const knexConfig = require('../knexfile.js')
const db = knex(knexConfig.development);



//GET:

studentsRouter.get('/', (req, res) => {
	db('students')
		.then((student) => {
			res.status(200).json(student);
		})
		.catch((error) => {
			res.status(500).json(error);
		});
});

// GET by Id:

studentsRouter.get('/:id', (req, res) => {
	db('students')
		.where({ id: req.params.id })
		.then((student) => {
			res.status(200).json(student);
		})
		.catch((error) => {
			res.status(500).json(error);
		});
});

// POST:

studentsRouter.post('/', (req, res) => {
	db('students')
		.insert(req.body)
		.then((studentId) => {
			const [ id ] = studentId;
			db('students').where({ id }).first().then((student) => {
				res.status(201).json(student);
			});
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

// DELETE:

studentsRouter.delete('/:id', (req, res) => {
	db('students')
		.where({ id: req.params.id })
		.del()
		.then((response) => {
			if (response > 0) {
				res.status(200).json({ message: 'The requested student has successfully been deleted.' });
			} else {
				res.status(404).json({ message: 'Requested student cannot be found' });
			}
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

// PUT:

studentsRouter.put('/:id', (req, res) => {
	db('students')
		.where({ id: req.params.id })
		.update(req.body)
		.then((response) => {
			if (response > 0) {
				db('students').where({ id: req.params.id }).first().then((student) => {
					res.status(200).json(student);
				});
			} else {
				res.status(404).json({ message: 'Requested student not found. ' });
			}
		})
		.catch((error) => {
			res.status(500).json(error);
		});
});

module.exports = studentsRouter;