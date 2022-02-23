exports.invalidURL = (req, res) => {
	res.status(404).send({ msg: 'Invalid URL' });
};

exports.errorHandlers = (err, req, res, next) => {
	if (err.code === '22P02' || err.code === '23502' || err.code === '23503') {
		res.status(400).send({ msg: 'Bad Request' });
	}
	if (err.status && err.msg) {
		res.status(err.status).send({ msg: err.msg });
	} else {
		res.status(500).send({ msg: 'Server error' });
	}
};
