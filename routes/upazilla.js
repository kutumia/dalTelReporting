const express = require("express");
const router = express.Router();
// const { Router } = require("express");
const app=express();

const {upazillasignup,upazillasignuppost,upazillalogin,upazillaloginpost,upazillaDashboard,
    blockProgress,blockProgressYear,blockProgressForm,blockProgressFormPost,blockProgressEdit,blockProgressDelete,
    honey,honeyYear,honeyForm,honeyFormPost,honeyEdit,honeyDelete,
    fieldDay,fieldDayYear,fieldDayForm,fieldDayFormPost,fieldDayEdit,fieldDayDelete,fieldDayEditPost,
    motivation,motivationYear,motivationForm,motivationFormPost,motivationEdit,motivationDelete,
    review,reviewYear,reviewForm,reviewFormPost,reviewEdit,reviewDelete,blockProgressEditPost,honeyEditPost,recievedCropsEditPost,
    recievedCrops,recievedCropsYear,recievedCropsForm,recievedCropsFormPost,recievedCropsEdit,recievedCropsDelete,reviewEditPost,
    seedInitial,seedInitialYear,seedInitialForm,seedInitialFormPost,seedInitialEdit,seedInitialDelete,motivationEditPost,seedInitialEditPost,seedProgressEditPost,
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
router.get('/fieldDayDelete/:id',fieldDayDelete);
router.post('/fieldDayEditPost/:id',fieldDayEditPost);

router.get('/motivation',motivation);
router.post('/motivationYear',motivationYear);
router.get('/motivationForm',motivationForm);
router.post('/motivationFormPost',motivationFormPost);
router.get('/motivationEdit/:id',motivationEdit);
router.get('/motivationDelete/:id',motivationDelete);
router.post('/motivationEditPost/:id',motivationEditPost);

router.get('/review',review);
router.post('/reviewYear',reviewYear);
router.get('/reviewForm',reviewForm);
router.post('/reviewFormPost',reviewFormPost);
router.get('/reviewEdit/:id',reviewEdit);
router.get('/reviewDelete/:id',reviewDelete);
router.post('/reviewEditPost/:id',reviewEditPost);

router.get('/blockProgress',blockProgress);
router.post('/blockProgressYear',blockProgressYear);
router.get('/blockProgressForm',blockProgressForm);
router.post('/blockProgressFormPost',blockProgressFormPost);
router.get('/blockProgressEdit/:id',blockProgressEdit);
router.get('/blockProgressDelete/:id',blockProgressDelete);
router.post('/blockProgressEditPost/:id',blockProgressEditPost);

router.get('/honey',honey);
router.post('/honeyYear',honeyYear);
router.get('/honeyForm',honeyForm);
router.post('/honeyFormPost',honeyFormPost);
router.get('/honeyEdit/:id',honeyEdit);
router.get('/honeyDelete/:id',honeyDelete);
router.post('/honeyEditPost/:id',honeyEditPost);

router.get('/recievedCrops',recievedCrops);
router.post('/recievedCropsYear',recievedCropsYear);
router.get('/recievedCropsForm',recievedCropsForm);
router.post('/recievedCropsFormPost',recievedCropsFormPost);
router.get('/recievedCropsEdit/:id',recievedCropsEdit);
router.get('/recievedCropsDelete/:id',recievedCropsDelete);
router.post('/recievedCropsEditPost/:id',recievedCropsEditPost);

router.get('/seedInitial',seedInitial);
router.post('/seedInitialYear',seedInitialYear);
router.get('/seedInitialForm',seedInitialForm);
router.post('/seedInitialFormPost',seedInitialFormPost);
router.get('/seedInitialEdit/:id',seedInitialEdit);
router.get('/seedInitialDelete/:id',seedInitialDelete);
router.post('/seedInitialEditPost/:id',seedInitialEditPost);

router.get('/seedProgress',seedProgress);
router.post('/seedProgressYear',seedProgressYear);
router.get('/seedProgressForm',seedProgressForm);
router.post('/seedProgressFormPost',seedProgressFormPost);
router.get('/seedProgressEdit/:id',seedProgressEdit);
router.get('/seedProgressDelete/:id',seedProgressDelete);
router.post('/seedProgressEditPost/:id',seedProgressEditPost);

module.exports = router;