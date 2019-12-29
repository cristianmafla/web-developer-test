import express from 'express';
import * as ctrl from '../dbSql/controllers';

const router = express.Router();

//one
router.get('/job/:id', ctrl.jobs.job);

//all
router.get('/jobs', ctrl.jobs.jobs);

//create
router.post('/job/new', ctrl.jobs.create);

//update
router.post('/job/update',ctrl.jobs.update);

//delete
router.post('/job/delete',ctrl.jobs.deleteJob);

export default router;
