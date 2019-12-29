import express from 'express';
import * as ctrl from '../dbSql/controllers';

const router = express.Router();

//findOne
router.get('/user/:id', ctrl.users.user);

//findAll
router.get('/users', ctrl.users.users);

//create
router.post('/user/new', ctrl.users.create);

//login
router.post('/user/login', ctrl.users.login);

export default router;
