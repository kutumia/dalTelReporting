const express = require("express");
const router = express.Router();
// const { Router } = require("express");
const app=express();
const {ddsignup,ddsignuppost,allupazilla,ddlogin,ddloginpost,ddDashboard,blockProgress,blockProgressFilter,
    honey,honeyFilter,recievedCrops,recievedCropsFilter,seedInitial,seedInitialFilter,seedProgress,seedProgressFilter,
    progress,progressYear,progressForm,progressFormPost,progressEdit,progressDelete,preservedProgress,preservedProgressYear,preservedProgressForm,preservedProgressFormPost,preservedProgressEdit,preservedProgressDelete} = require('../controllers/dd.controller');
router.get('/',allupazilla);
router.get('/login',ddlogin);
router.post('/logins',ddloginpost);
router.get('/dashboard',ddDashboard);


router.get('/signup',ddsignup);
router.post('/signups',ddsignuppost);

router.get('/blockProgress',blockProgress);
router.post('/blockProgressFilter',blockProgressFilter);

router.get('/honey',honey);
router.post('/honeyFilter',honeyFilter);

router.get('/recievedCrops',recievedCrops);
router.post('/recievedCropsFilter',recievedCropsFilter);

router.get('/seedInitial',seedInitial);
router.post('/seedInitialFilter',seedInitialFilter);

router.get('/seedProgress',seedProgress);
router.post('/seedProgressFilter',seedProgressFilter);

router.get('/progress',progress);
router.post('/progressYear',progressYear);
router.get('/progressForm',progressForm);
router.post('/progressFormPost',progressFormPost);
router.get('/progressEdit/:id',progressEdit);
router.post('/progressDelete/:id',progressDelete);

router.get('/preservedProgress',preservedProgress);
router.post('/preservedProgressYear',preservedProgressYear);
router.get('/preservedProgressForm',preservedProgressForm);
router.post('/preservedProgressFormPost',preservedProgressFormPost);
router.get('/preservedProgressEdit/:id',preservedProgressEdit);
router.post('/preservedProgressDelete/:id',preservedProgressDelete);


module.exports = router;