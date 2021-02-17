const express = require("express");
const router = express.Router();
// const { Router } = require("express");
const app=express();
const {ddsignup,ddsignuppost,allupazilla,ddlogin,ddloginpost,ddDashboard,blockProgress,blockProgressFilter,motivation,motivationFilter,fieldDay,fieldDayFilter,review,reviewFilter,
    honey,honeyFilter,recievedCrops,recievedCropsFilter,seedInitial,seedInitialFilter,seedProgress,seedProgressFilter,progressEditPost,preservedProgressEditPost,
    progress,progressYear,progressForm,progressFormPost,progressEdit,progressDelete,preservedProgress,preservedProgressYear,preservedProgressForm,preservedProgressFormPost,preservedProgressEdit,preservedProgressDelete} = require('../controllers/dd.controller');
router.get('/',allupazilla);
router.get('/login',ddlogin);
router.post('/logins',ddloginpost);
router.get('/dashboard',ddDashboard);


router.get('/signup',ddsignup);
router.post('/signups',ddsignuppost);

router.get('/motivation',motivation);
router.post('/motivationFilter',motivationFilter);

router.get('/fieldDay',fieldDay);
router.post('/fieldDayFilter',fieldDayFilter);

router.get('/review',review);
router.post('/reviewFilter',reviewFilter);

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
router.get('/progressDelete/:id',progressDelete);
router.post('/progressEditPost/:id',progressEditPost);

router.get('/preservedProgress',preservedProgress);
router.post('/preservedProgressYear',preservedProgressYear);
router.get('/preservedProgressForm',preservedProgressForm);
router.post('/preservedProgressFormPost',preservedProgressFormPost);
router.get('/preservedProgressEdit/:id',preservedProgressEdit);
router.get('/preservedProgressDelete/:id',preservedProgressDelete);
router.post('/preservedProgressEditPost/:id',preservedProgressEditPost);


module.exports = router;