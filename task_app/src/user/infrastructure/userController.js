const express = require('express');
const lodash = require('lodash');
const multer = require('multer');
const registrarUser = require('../application/createUser');
const handler = require('../../middleware/handler');
const validateUser = require('../../middleware/user/validateUserCreate');
const auth = require('../../middleware/auth');
const { getUserById, getUsers } = require('../application/getUsers');
const deleteUser = require('../application/deleteUser');
const updateUser = require('../application/updateUser');

const router = express.Router();

const storage = multer.memoryStorage({
  destination: (req, file, cb) => {
    cb(null, './src/user/images');
  },
  limits: {
    fileSize: 1000000
  },
  filename: (req, file, cb) => {
    const format = new RegExp('\\.(jpg|jpeg|png)$');
    if (!file.originalname.match(format)) {
      return cb(new Error('Not a valid file format'));
    }

    return cb(undefined, true);
  }
});

const upload = multer({ storage }).single('avatar');

router.post(
  '/me/profile',
  [auth, upload],
  handler(async (req, res) => {
    const { file, authUser } = req;

    const response = await updateUser(authUser.id, {
      avatarImg: file.buffer
    });

    if (lodash.isEmpty(response)) {
      return res.status(404).send();
    }

    if (response.error) {
      return res.status(400).send();
    }

    return res.json(response);
  }),
  // eslint-disable-next-line no-unused-vars
  (error, req, res, next) => {
    res.status(400).json({ error: error.message });
  }
);

router.get(
  '/me',
  auth,
  handler(async (req, res) => {
    const { id } = req.authUser;

    const response = await getUserById(id);

    if (lodash.isEmpty(response)) {
      return res.status(404).send();
    }

    return res.json(response);
  })
);

router.get(
  '/',
  auth,
  handler(async (req, res) => {
    const response = await getUsers();
    res.json(response);
  })
);

router.post(
  '/create',
  validateUser,
  handler(async (req, res) => {
    const { user } = req;
    await registrarUser(user);
    res.redirect(307, '/loggin/');
  })
);

router.delete(
  '/',
  auth,
  handler(async (req, res) => {
    const { id } = req.authUser;
    await deleteUser(id);
    res.status(204).send();
  })
);

router.patch(
  '/',
  auth,
  handler(async (req, res) => {
    const { id } = req.authUser;

    const user = lodash.pick(req.body, ['name', 'password']);

    const response = await updateUser(id, user);

    if (lodash.isEmpty(response)) {
      return res.status(404).send();
    }

    if (response.error) {
      return res.status(400).send();
    }

    return res.json(response);
  })
);

// eslint-disable-next-line import/no-commonjs
module.exports = router;
