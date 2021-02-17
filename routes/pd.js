const express = require("express");
const router = express.Router();
// const { Router } = require("express");
const app=express();

const {pdsignup,pdsignuppost,pdlogin,pdloginpost,pdDashboard,review,reviewFilter,reviewDistrictFilter,fieldDay,fieldDayFilter,fieldDayDistrictFilter,motivation,motivationFilter,motivationDistrictFilter,
    blockProgress,blockProgressFilter,blockProgressDistrictFilter,honey,honeyFilter,honeyDistrictFilter,
    recievedCrops,recievedCropsFilter,recievedCropsDistrictFilter,seedInitial,seedInitialFilter,seedInitialDistrictFilter,seedProgress,seedProgressFilter,seedProgressDistrictFilter,
    progress,progressFilter,preservedProgress,preservedProgressFilter} = require('../controllers/pd.controller');
router.get('/login',pdlogin);
router.post('/logins',pdloginpost);
router.get('/dashboard',pdDashboard);

router.get('/signup',pdsignup);
router.post('/signups',pdsignuppost);

router.get('/review',review);
router.post('/reviewFilter',reviewFilter);
router.post('/reviewDistrictFilter',reviewDistrictFilter);

router.get('/fieldDay',fieldDay);
router.post('/fieldDayFilter',fieldDayFilter);
router.post('/fieldDayDistrictFilter',fieldDayDistrictFilter);

router.get('/motivation',motivation);
router.post('/motivationFilter',motivationFilter);
router.post('/motivationDistrictFilter',motivationDistrictFilter);

router.get('/blockProgress',blockProgress);
router.post('/blockProgressFilter',blockProgressFilter);
router.post('/blockProgressDistrictFilter',blockProgressDistrictFilter);

router.get('/honey',honey);
router.post('/honeyFilter',honeyFilter);
router.post('/honeyDistrictFilter',honeyDistrictFilter);

router.get('/recievedCrops',recievedCrops);
router.post('/recievedCropsFilter',recievedCropsFilter);
router.post('/recievedCropsDistrictFilter',recievedCropsDistrictFilter);

router.get('/seedInitial',seedInitial);
router.post('/seedInitialFilter',seedInitialFilter);
router.post('/seedInitialDistrictFilter',seedInitialDistrictFilter);

router.get('/seedProgress',seedProgress);
router.post('/seedProgressFilter',seedProgressFilter);
router.post('/seedProgressDistrictFilter',seedProgressDistrictFilter);


router.get('/progress',progress);
router.post('/progressFilter',progressFilter);

router.get('/preservedProgress',preservedProgress);
router.post('/preservedProgressFilter',preservedProgressFilter);


module.exports = router;