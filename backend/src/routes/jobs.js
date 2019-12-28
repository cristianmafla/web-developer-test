import express from 'express';
import * as jobs from '../dbSql/controllers/jobs';

const router = express.Router();

router.get('/job', jobs.job);

router.get('/jobs', jobs.jobs);

export default router;
