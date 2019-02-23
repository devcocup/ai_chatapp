const Joi = require ('joi');

const Post = require ('../models/postModals');
const HttpStatus = require ('http-status-codes');

module.exports = {
  AddPost (req, res) {
    const schema = Joi.object ().keys ({
      post: Joi.string ().required (),
    });

    const {error} = Joi.validate (req.body, schema);
    if (error && error.details) {
      return res.status (HttpStatus.BAD_REQUEST).json ({msg: error.details});
    }

    const body = {
      userId: req.user._id,
      username: req.user.username,
      post: req.body.post,
      created: new Date (),
    };

    Post.create (body)
      .then (post => {
        res.status (HttpStatus.OK).json ({
          message: 'Post Created',
          post,
        });
      })
      .catch (err => {
        res.status (HttpStatus.INTERNAL_SERVER_ERROR).json ({
          message: 'Error occured',
        });
      });
  },
};
