const express = require("express");
const router = express.Router();
// const { Router } = require("express");
const app=express();

const {upazillasignup,upazillasignuppost,upazillalogin,upazillaloginpost,upazillaDashboard,
    blockProgress,blockProgressYear,blockProgressForm,blockProgressFormPost,blockProgressEdit,blockProgressDelete,
    honey,honeyYear,honeyForm,honeyFormPost,honeyEdit,honeyDelete,
    fieldDay,fieldDayYear,fieldDayForm,fieldDayFormPost,fieldDayEdit,fieldDayDelete,
    motivation,motivationYear,motivationForm,motivationFormPost,motivationEdit,motivationDelete,
    review,reviewYear,reviewForm,reviewFormPost,reviewEdit,reviewDelete,
    recievedCrops,recievedCropsYear,recievedCropsForm,recievedCropsFormPost,recievedCropsEdit,recievedCropsDelete,
    seedInitial,seedInitialYear,seedInitialForm,seedInitialFormPost,seedInitialEdit,seedInitialDelete,
    seedProgress,seedProgressYear,seedProgressForm,seedProgressFormPost,seedProgressEdit,seedProgressDelete} = require('../controllers/upazilla.controller');
router.get('/login',upazillalogin);
router.post('/logins',upazillaloginpost);
router.get('/dashboard',upazillaDashboard);

router.get('/signup',upazillasignup);
router.post('/signups',upazillasignuppost);

router.get('/fieldDay',fieldDay);
router.post('/fieldDayYear',fieldDayYear);
router.get('/fieldDayForm',fieldDayForm);
router.post('/fieldDayFormPost',fieldDayFormPost);
router.get('/fieldDayEdit/:id',fieldDayEdit);
router.post('/fieldDayDelete/:id',fieldDayDelete);

router.get('/motivation',motivation);
router.post('/motivationYear',motivationYear);
router.get('/motivationForm',motivationForm);
router.post('/motivationFormPost',motivationFormPost);
router.get('/motivationEdit/:id',motivationEdit);
router.post('/motivationDelete/:id',motivationDelete);

router.get('/review',review);
router.post('/reviewYear',reviewYear);
router.get('/reviewForm',reviewForm);
router.post('/reviewFormPost',reviewFormPost);
router.get('/reviewEdit/:id',reviewEdit);
router.post('/reviewDelete/:id',reviewDelete);

router.get('/blockProgress',blockProgress);
router.post('/blockProgressYear',blockProgressYear);
router.get('/blockProgressForm',blockProgressForm);
router.post('/blockProgressFormPost',blockProgressFormPost);
router.get('/blockProgressEdit/:id',blockProgressEdit);
router.post('/blockProgressDelete/:id',blockProgressDelete);

router.get('/honey',honey);
router.post('/honeyYear',honeyYear);
router.get('/honeyForm',honeyForm);
router.post('/honeyFormPost',honeyFormPost);
router.get('/honeyEdit/:id',honeyEdit);
router.post('/honeyDelete/:id',honeyDelete);

router.get('/recievedCrops',recievedCrops);
router.post('/recievedCropsYear',recievedCropsYear);
router.get('/recievedCropsForm',recievedCropsForm);
router.post('/recievedCropsFormPost',recievedCropsFormPost);
router.get('/recievedCropsEdit/:id',recievedCropsEdit);
router.post('/recievedCropsDelete/:id',recievedCropsDelete);

router.get('/seedInitial',seedInitial);
router.post('/seedInitialYear',seedInitialYear);
router.get('/seedInitialForm',seedInitialForm);
router.post('/seedInitialFormPost',seedInitialFormPost);
router.get('/seedInitialEdit/:id',seedInitialEdit);
router.post('/seedInitialDelete/:id',seedInitialDelete);

router.get('/seedProgress',seedProgress);
router.post('/seedProgressYear',seedProgressYear);
router.get('/seedProgressForm',seedProgressForm);
router.post('/seedProgressFormPost',seedProgressFormPost);
router.get('/seedProgressEdit/:id',seedProgressEdit);
router.post('/seedProgressDelete/:id',seedProgressDelete);


module.exports = router;