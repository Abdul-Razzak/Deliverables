'use strict';

const entry = require('../models/comment');

exports.putComment = (name, email, tips) => 

	new Promise((resolve,reject) => {


		const checkinEntry = new entry({

			venue_id: name,
			email: email,
			tips: tips,
			created_at: new Date()
		});

		checkinEntry.save()

		.then(() => resolve({ status: 201, message: 'User Registered Sucessfully !' }))

		.catch(err => {

			if (err.code == 11000) {
						
				reject({ status: 409, message: 'User Already Registered !' });

			} else {

				reject({ status: 500, message: 'Internal Server Error !' });
			}
		});
	});

exports.getComments = (email, venueId) => 
	
	new Promise((resolve,reject) => {

		entry.find({ venue_id: venueId }, { email: 1, created_at: 1, venue_id: 1, tips: 1 })

		.then(entries => resolve(entries))

		.catch(err => reject({ status: 500, message: 'Internal Server Error !' }))

	});

