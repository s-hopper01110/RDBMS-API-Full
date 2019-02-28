const cohortRouter = require('express').Router();
const knex = require('knex');


const knexConfig = require('../knexfile.js')
const db = knex(knexConfig.development);



//GET:

cohortRouter.get('/', (req, res) => {
	db('cohorts')
		.then((cohort) => {
			res.status(200).json(cohort);
		})
		.catch((error) => {
			res.status(500).json(error);
		});
});

// GET by Id:

cohortRouter.get('/:id', (req, res) => {
	db('cohorts')
		.where({ id: req.params.id })
		.then((cohort) => {
			res.status(200).json(cohort);
		})
		.catch((error) => {
			res.status(500).json(error);
		});
});

//Get student by cohort ID:

cohortRouter.get('/:id/students', (req, res) => {
    const { id } = req.params
	db('students')
		.where({ 'cohort_id': id })
		.then((student) => {
			res.status(200).json(student);
		})
		.catch((error) => {
			res.status(500).json(error);
		});
});

// POST:

cohortRouter.post('/', (req, res) => {
	db('cohorts')
		.insert(req.body)
		.then((cohortId) => {
			const [ id ] = cohortId;
			db('cohorts').where({ id }).first().then((cohort) => {
				res.status(201).json(cohort);
			});
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

// DELETE:

cohortRouter.delete('/:id', (req, res) => {
	db('cohorts')
		.where({ id: req.params.id })
		.del()
		.then((response) => {
			if (response > 0) {
				res.status(200).json({ message: 'The requested cohort has successfully been deleted.' });
			} else {
				res.status(404).json({ message: 'Requested cohort cannot be found' });
			}
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

// PUT:

cohortRouter.put('/:id', (req, res) => {
	db('cohorts')
		.where({ id: req.params.id })
		.update(req.body)
		.then((response) => {
			if (response > 0) {
				db('cohorts').where({ id: req.params.id }).first().then((cohort) => {
					res.status(200).json(cohort);
				});
			} else {
				res.status(404).json({ message: 'Requested cohort not found. ' });
			}
		})
		.catch((error) => {
			res.status(500).json(error);
		});
});

module.exports = cohortRouter;
