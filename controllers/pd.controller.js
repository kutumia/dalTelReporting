const db=require('../models');
const pd = db.pd;
const dd = db.dd;
const ad = db.ad;
const upazilla = db.upazilla;
const blockProgress = db.blockProgress;
const honey = db.honey;
const recievedCrops = db.recievedCrops;
const seedInitial = db.seedInitial;
const seedProgress = db.seedProgress;
const progress = db.progress;
const preservedProgress = db.preservedProgress;
const review = db.review;
const motivation = db.motivation;
const fieldDay = db.fieldDay;


const jwt= require('jsonwebtoken');
const bcrypt= require('bcryptjs'); 

const { request, response } = require('express');
const express = require('express');


module.exports.pdlogin=async(req,res)=>{
    res.render('pd/login', { title: 'ডাল,তেল ও মসলা বীজ উৎপাদন সংরক্ষণ ও বিতরণ (৩য় পর্যায়) প্রকল্প',msg:'' });
    res.send("log");
};

module.exports.pdloginpost=async(req,res)=>{
    try {
        const uname = req.body.uname;
        const password = req.body.password;
        pd.findAll({ where: {uname: uname} })
        .then(data => {
            if(data.length > 0){
                bcrypt.compare(password,data[0].password,function(err, result) {
                    if(result== true){
                        req.session.type = "pd";
                        req.session.user_id = data[0].id;
                        const id=req.session.user_id;
                        // res.locals.type = req.session.type;
                        // res.locals.user_id = req.session.user_id;
                        console.log("session=", req.session.type,res.locals);
                        // const token=jwt.sign({id},process.env.JWT_SECRET,token{
                        //     expiresIn:process.env.JWT_EXPIRES_IN
                        // });
                        // console.log("the token is :"+)
                        res.redirect('/pd/dashboard');
                    }
                    else{
                        return res.status(200).render('pd/login', { title: 'ডাল,তেল ও মসলা বীজ উৎপাদন সংরক্ষণ ও বিতরণ (৩য় পর্যায়) প্রকল্প',msg:'Please provide a username and password' });
                    }
                });
            }else{
                return res.status(200).render('pd/login', { title: 'ডাল,তেল ও মসলা বীজ উৎপাদন সংরক্ষণ ও বিতরণ (৩য় পর্যায়) প্রকল্প',msg:'Please provide a username and password' });
            }
        })
        .catch(err => {
              res.status(500).send({
                message:
                  err.message || "Some error occurred while retrieving tutorials."
              });
            });
        // upazilla.findAll({ where: {uname: uname} })
        // .then(data => {
        //     if(data.length > 0){
        //         bcrypt.compareSync(password , upazilla.password, function(err, result) {
        //             if(result== true){
        //                 res.redirect('/upazilla/dashboard');
        //             }
        //             else{
        //                 res.redirect('/upazilla/dashboard');
        //             }
        //         });
        //     }else{
        //         return res.status(200).render('upazilla/login', { title: 'Horticulture Wing Central Management Software',msg:'Please provide a username and password' });
        //     }
        // })
        // .catch(err => {
        //   res.status(500).send({
        //     message:
        //       err.message || "Some error occurred while retrieving tutorials."
        //   });
        // });

        
    }
    catch(error){
        console.log(error);
    } 
};

module.exports.pdDashboard = async(req,res) => {
    console.log("pddashboard",res.locals.type);
    res.render('pd/dashboard', { title: 'ডাল,তেল ও মসলা বীজ উৎপাদন সংরক্ষণ ও বিতরণ (৩য় পর্যায়) প্রকল্প',msg:'Welcome' });
};
//logIn controller end

//signUp controller
module.exports.pdsignup=async(req,res)=>{
    res.render('pd/signup', { title: 'ডাল,তেল ও মসলা বীজ উৎপাদন সংরক্ষণ ও বিতরণ (৩য় পর্যায়) প্রকল্প',msg:'' });
    res.send("log");
};
module.exports.pdsignuppost=async(req,res)=>{
    try {
        const{uname,password,confirmPassword}=req.body;

        const data = await pd.findAll({ where: {uname: uname} })
        if(data.length > 0){
            res.render('pd/signup',{title: 'ডাল,তেল ও মসলা বীজ উৎপাদন সংরক্ষণ ও বিতরণ (৩য় পর্যায়) প্রকল্প',msg:'ERROR: The pd is already enrolled!'})
        }
        else if(password !== confirmPassword){
            return res.render('pd/signup',{title: 'ডাল,তেল ও মসলা বীজ উৎপাদন সংরক্ষণ ও বিতরণ (৩য় পর্যায়) প্রকল্প',msg:'ERROR: Passwords do not match!'})
        }
        else{
            const hashedPassword = await bcrypt.hash(password, 10);
            console.log(hashedPassword);
            try{
                const createpd = await pd.create({
                    uname: uname,
                    password:hashedPassword,
                    pd_id:1
                    })
                res.render('pd/signup',{title: 'ডাল,তেল ও মসলা বীজ উৎপাদন সংরক্ষণ ও বিতরণ (৩য় পর্যায়) প্রকল্প',msg:'pd Registered Successfully!'})
            }
            catch (err) {
                console.log(err);
            }
            
        }
    }
    catch(error){
        console.log(error);
    } 
};
//signUp controller end

//fieldDay controller
module.exports.fieldDay=async(req,res)=>{
    try{
        var districts=await dd.findAll();
        console.log("inside");
        res.render('pd/fieldDay/fieldDay', { title: 'মাঠ দিবস',success:'',district:districts });
    }
    catch(err){
        console.log("outside",err);
        res.render('pd/fieldDay/fieldDay', { title: 'মাঠ দিবস',success:''});
    }
     
    //  records:result

};

module.exports.fieldDayFilter=async(req,res)=>{
    await fieldDay.findAll({ 
        where: {year: req.body.year,upazilla_id: req.body.upazilla}
    })
    .then(data => {
        res.render('pd/fieldDay/fieldDayTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('pd/fieldDay/fieldDayYear', { title: 'মাঠ দিবস',success:'', records: err });
    })

};

module.exports.fieldDayDistrictFilter=async(req,res)=>{
    try{
        // var dds=await dd.findAll({where: {id: req.body.district}});
        var upazillass=await upazilla.findAll({where: {dd_id: req.body.district}});
        console.log("inside");
        res.send(upazillass)
    }
    catch(err){
        console.log("outside",err);
        res.render('pd/fieldDay/fieldDay', { title: 'মাঠ দিবস',success:'', upazillas:err });
    }
     

};
//fieldDay controller end

//motivation controller
module.exports.motivation=async(req,res)=>{
    try{
        var districts=await dd.findAll();
        console.log("inside");
        res.render('pd/motivation/motivation', { title: 'মোটিভেশন ট্যুর',success:'',district:districts });
    }
    catch(err){
        console.log("outside",err);
        res.render('pd/motivation/motivation', { title: 'মোটিভেশন ট্যুর',success:''});
    }
     
    //  records:result

};

module.exports.motivationFilter=async(req,res)=>{
    await motivation.findAll({ 
        where: {year: req.body.year,upazilla_id: req.body.upazilla}
    })
    .then(data => {
        res.render('pd/motivation/motivationTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('pd/motivation/motivationYear', { title: 'মোটিভেশন ট্যুর',success:'', records: err });
    })

};

module.exports.motivationDistrictFilter=async(req,res)=>{
    try{
        // var dds=await dd.findAll({where: {id: req.body.district}});
        var upazillass=await upazilla.findAll({where: {dd_id: req.body.district}});
        console.log("inside");
        res.send(upazillass)
    }
    catch(err){
        console.log("outside",err);
        res.render('pd/motivation/motivation', { title: 'মোটিভেশন ট্যুর',success:'', upazillas:err });
    }
     

};
//motivation controller end

//review controller
module.exports.review=async(req,res)=>{
    try{
        var districts=await dd.findAll();
        console.log("inside");
        res.render('pd/review/review', { title: 'রিভিউ ডিস্কাশন',success:'',district:districts });
    }
    catch(err){
        console.log("outside",err);
        res.render('pd/review/review', { title: 'রিভিউ ডিস্কাশন',success:''});
    }
     
    //  records:result

};

module.exports.reviewFilter=async(req,res)=>{
    await review.findAll({ 
        where: {year: req.body.year,upazilla_id: req.body.upazilla}
    })
    .then(data => {
        res.render('pd/review/reviewTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('pd/review/reviewYear', { title: 'রিভিউ ডিস্কাশন',success:'', records: err });
    })

};

module.exports.reviewDistrictFilter=async(req,res)=>{
    try{
        // var dds=await dd.findAll({where: {id: req.body.district}});
        var upazillass=await upazilla.findAll({where: {dd_id: req.body.district}});
        console.log("inside");
        res.send(upazillass)
    }
    catch(err){
        console.log("outside",err);
        res.render('pd/review/review', { title: 'রিভিউ ডিস্কাশন',success:'', upazillas:err });
    }
     

};
//review controller end

//blockProgress controller
module.exports.blockProgress=async(req,res)=>{
    try{
        var districts=await dd.findAll();
        console.log("inside");
        res.render('pd/blockProgress/blockProgress', { title: 'উপজেলাওয়ারী বীজ উতপাদনে ব্লকের অগ্রগতি',success:'',district:districts });
    }
    catch(err){
        console.log("outside",err);
        res.render('pd/blockProgress/blockProgress', { title: 'উপজেলাওয়ারী বীজ উতপাদনে ব্লকের অগ্রগতি',success:''});
    }
     
    //  records:result

};

module.exports.blockProgressFilter=async(req,res)=>{
    await blockProgress.findAll({ 
        where: {year: req.body.year,upazilla_id: req.body.upazilla}
    })
    .then(data => {
        res.render('pd/blockProgress/blockProgressTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('pd/blockProgress/blockProgressYear', { title: 'উপজেলাওয়ারী বীজ উতপাদনে ব্লকের অগ্রগতি',success:'', records: err });
    })

};

module.exports.blockProgressDistrictFilter=async(req,res)=>{
    try{
        // var dds=await dd.findAll({where: {id: req.body.district}});
        var upazillass=await upazilla.findAll({where: {dd_id: req.body.district}});
        console.log("inside");
        res.send(upazillass)
    }
    catch(err){
        console.log("outside",err);
        res.render('pd/blockProgress/blockProgress', { title: 'উপজেলাওয়ারী বীজ উতপাদনে ব্লকের অগ্রগতি',success:'', upazillas:err });
    }
     

};
//blockProgress controller end

//honey controller
module.exports.honey=async(req,res)=>{
    try{
        var districts=await dd.findAll();
        console.log("inside");
        res.render('pd/honey/honey', { title: 'মৌচাষী সংক্রান্ত তথ্য',success:'',district:districts });
    }
    catch(err){
        console.log("outside",err);
        res.render('pd/honey/honey', { title: 'মৌচাষী সংক্রান্ত তথ্য',success:''});
    }
     
    //  records:result

};

module.exports.honeyFilter=async(req,res)=>{
    await honey.findAll({ 
        where: {year: req.body.year,upazilla_id: req.body.upazilla}
    })
    .then(data => {
        res.render('pd/honey/honeyTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('pd/honey/honeyYear', { title: 'মৌচাষী সংক্রান্ত তথ্য',success:'', records: err });
    })

};

module.exports.honeyDistrictFilter=async(req,res)=>{
    try{
        // var dds=await dd.findAll({where: {id: req.body.district}});
        var upazillass=await upazilla.findAll({where: {dd_id: req.body.district}});
        console.log("inside");
        res.send(upazillass)
    }
    catch(err){
        console.log("outside",err);
        res.render('pd/honey/honey', { title: 'মৌচাষী সংক্রান্ত তথ্য',success:'', upazillas:err });
    }
     

};
//honey controller end

//recievedCrops controller
module.exports.recievedCrops=async(req,res)=>{
    try{
        var districts=await dd.findAll();
        console.log("inside");
        res.render('pd/recievedCrops/recievedCrops', { title: 'ফসল সংগ্রহোত্তর প্রতিবেদন',success:'',district:districts });
    }
    catch(err){
        console.log("outside",err);
        res.render('pd/recievedCrops/recievedCrops', { title: 'ফসল সংগ্রহোত্তর প্রতিবেদন',success:''});
    }
     
    //  records:result

};

module.exports.recievedCropsFilter=async(req,res)=>{
    await recievedCrops.findAll({ 
        where: {year: req.body.year,upazilla_id: req.body.upazilla}
    })
    .then(data => {
        res.render('pd/recievedCrops/recievedCropsTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('pd/recievedCrops/recievedCropsYear', { title: 'ফসল সংগ্রহোত্তর প্রতিবেদন',success:'', records: err });
    })

};

module.exports.recievedCropsDistrictFilter=async(req,res)=>{
    try{
        // var dds=await dd.findAll({where: {id: req.body.district}});
        var upazillass=await upazilla.findAll({where: {dd_id: req.body.district}});
        console.log("inside");
        res.send(upazillass)
    }
    catch(err){
        console.log("outside",err);
        res.render('pd/recievedCrops/recievedCrops', { title: 'ফসল সংগ্রহোত্তর প্রতিবেদন',success:'', upazillas:err });
    }
     

};
//recievedCrops controller end

//seedInitial controller
module.exports.seedInitial=async(req,res)=>{
    try{
        var districts=await dd.findAll();
        console.log("inside");
        res.render('pd/seedInitial/seedInitial', { title: 'বীজ উৎপাদন ব্লকের কৃষকের প্রাথমিক প্রতিবেদন',success:'',district:districts });
    }
    catch(err){
        console.log("outside",err);
        res.render('pd/seedInitial/seedInitial', { title: 'বীজ উৎপাদন ব্লকের কৃষকের প্রাথমিক প্রতিবেদন',success:''});
    }
     
    //  records:result

};

module.exports.seedInitialFilter=async(req,res)=>{
    await seedInitial.findAll({ 
        where: {year: req.body.year,upazilla_id: req.body.upazilla}
    })
    .then(data => {
        res.render('pd/seedInitial/seedInitialTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('pd/seedInitial/seedInitialYear', { title: 'বীজ উৎপাদন ব্লকের কৃষকের প্রাথমিক প্রতিবেদন',success:'', records: err });
    })

};

module.exports.seedInitialDistrictFilter=async(req,res)=>{
    try{
        // var dds=await dd.findAll({where: {id: req.body.district}});
        var upazillass=await upazilla.findAll({where: {dd_id: req.body.district}});
        console.log("inside");
        res.send(upazillass)
    }
    catch(err){
        console.log("outside",err);
        res.render('pd/seedInitial/seedInitial', { title: 'বীজ উৎপাদন ব্লকের কৃষকের প্রাথমিক প্রতিবেদন',success:'', upazillas:err });
    }
     

};
//seedInitial controller end

//seedProgress controller
module.exports.seedProgress=async(req,res)=>{
    try{
        var districts=await dd.findAll();
        console.log("inside");
        res.render('pd/seedProgress/seedProgress', { title: 'বীজ উৎপাদন ব্লকে বীজ বপনের অগ্রগতির প্রতিবেদন(বপনের দুই সপ্তাহের মধ্যে পাঠাতে হবে)',success:'',district:districts });
    }
    catch(err){
        console.log("outside",err);
        res.render('pd/seedProgress/seedProgress', { title: 'বীজ উৎপাদন ব্লকে বীজ বপনের অগ্রগতির প্রতিবেদন(বপনের দুই সপ্তাহের মধ্যে পাঠাতে হবে)',success:''});
    }
     
    //  records:result

};

module.exports.seedProgressFilter=async(req,res)=>{
    await seedProgress.findAll({ 
        where: {year: req.body.year,upazilla_id: req.body.upazilla}
    })
    .then(data => {
        res.render('pd/seedProgress/seedProgressTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('pd/seedProgress/seedProgressYear', { title: 'বীজ উৎপাদন ব্লকে বীজ বপনের অগ্রগতির প্রতিবেদন(বপনের দুই সপ্তাহের মধ্যে পাঠাতে হবে)',success:'', records: err });
    })

};

module.exports.seedProgressDistrictFilter=async(req,res)=>{
    try{
        // var dds=await dd.findAll({where: {id: req.body.district}});
        var upazillass=await upazilla.findAll({where: {dd_id: req.body.district}});
        console.log("inside");
        res.send(upazillass)
    }
    catch(err){
        console.log("outside",err);
        res.render('pd/seedProgress/seedProgress', { title: 'বীজ উৎপাদন ব্লকে বীজ বপনের অগ্রগতির প্রতিবেদন(বপনের দুই সপ্তাহের মধ্যে পাঠাতে হবে)',success:'', upazillas:err });
    }
     

};
//seedProgress controller end

//progress controller
module.exports.progress=async(req,res)=>{ 
    try{
        var districtss=await dd.findAll({where: {pd_id: req.session.user_id}});
        console.log("inside");
        res.render('pd/progress/progress', { title: 'জেলার উপপরিচালক কর্তৃক প্রেরিত অগ্রগতির প্রতিবেদন ',success:'',districts:districtss });
    }
    catch(err){
        console.log("outside",err);
        res.render('pd/progress/progress', { title: 'জেলার উপপরিচালক কর্তৃক প্রেরিত অগ্রগতির প্রতিবেদন ',success:'', districts:err });
    }
     
    //  records:result

};

module.exports.progressFilter=async(req,res)=>{
    await progress.findAll({ 
        where: {year: req.body.year,dd_id: req.body.district}
    })
    .then(data => {
        res.render('pd/progress/progressTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('pd/progress/progressYear', { title: 'জেলার উপপরিচালক কর্তৃক প্রেরিত অগ্রগতির প্রতিবেদন ',success:'', records: err });
    })

};
//progress controller end

//progress controller
module.exports.preservedProgress=async(req,res)=>{ 
    try{
        var districtss=await dd.findAll({where: {pd_id: req.session.user_id}});
        console.log("inside");
        res.render('pd/preservedProgress/preservedProgress', { title: 'বীজ উৎপাদনে ব্লকে উৎপাদিত ও সংরক্ষিত বীজের পরিমাণ তথ্য',success:'',districts:districtss });
    }
    catch(err){
        console.log("outside",err);
        res.render('pd/preservedProgress/preservedProgress', { title: 'বীজ উৎপাদনে ব্লকে উৎপাদিত ও সংরক্ষিত বীজের পরিমাণ তথ্য',success:'', districts:err });
    }
     
    //  records:result

};

module.exports.preservedProgressFilter=async(req,res)=>{
    await preservedProgress.findAll({ 
        where: {year: req.body.year,dd_id: req.body.district}
    })
    .then(data => {
        res.render('pd/preservedProgress/preservedProgressTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('pd/preservedProgress/preservedProgressYear', { title: 'বীজ উৎপাদনে ব্লকে উৎপাদিত ও সংরক্ষিত বীজের পরিমাণ তথ্য',success:'', records: err });
    })

};
//progress controller end