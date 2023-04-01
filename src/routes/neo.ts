import * as validate from '../utils/validate';
import express from 'express';
import { generateNewNeo, getCurrentNeo, getTop10Neos, stopSetRandomNeoJob } from '../model/NeoDB';
const router = express.Router();

//Force Update Current Neo
router.put('/', validate.verifyRequest, validate.verifyAdmin, async function (req, res, next) {
    stopSetRandomNeoJob();
    const {status, error, data} = await generateNewNeo();
    res.status(status).json(error ? {text: error.message} : data);
  });

//Get Current Neo
router.get('/', validate.verifyRequest, async function (req, res, next) {
    const neo = getCurrentNeo();
    res.status(neo ? 200 : 500).json(neo ? {neo: neo} : {text: "Current NEO not set"});
});

//top 10 of size
router.get('/size', validate.verifyRequest, async function (req, res, next) {
  const {status, error, data} = await getTop10Neos("size", false);
  res.status(status).json(error ? {text: error.message} : data);
});

//top 10 of range
router.get('/range', validate.verifyRequest, async function (req, res, next) {
  const {status, error, data} = await getTop10Neos("range", true);
  res.status(status).json(error ? {text: error.message} : data);
});

//top 10 of velocity
router.get('/velocity', validate.verifyRequest, async function (req, res, next) {
  const {status, error, data} = await getTop10Neos("velocity", false);
  res.status(status).json(error ? {text: error.message} : data);
});

export default router;
