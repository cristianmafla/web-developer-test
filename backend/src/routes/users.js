import express from 'express';
import * as users from '../dbSql/controllers/users';

const router = express.Router();

router.get('/user', users.user);

router.get('/users', users.users);

export default router;
