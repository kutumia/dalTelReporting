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

const jwt= require('jsonwebtoken');
const bcrypt= require('bcryptjs'); 

const { request, response } = require('express');
const express = require('express');

module.exports.upazillatable=async(req,res)=>{
    res.json({ message: "hello upazilla" });
};

module.exports.allupazilla=async(req,res)=>{
    res.json({ message: "hello upazilla" });
};


module.exports.ddlogin=async(req,res)=>{
    res.render('dd/login', { title: 'ডাল,তেল ও মসলা বীজ উৎপাদন সংরক্ষণ ও বিতরণ (৩য় পর্যায়) প্রকল্প',msg:'' });
    res.send("log");
};

module.exports.ddloginpost=async(req,res)=>{
    try {
        const uname = req.body.uname;
        const password = req.body.password;
        dd.findAll({ where: {uname: uname} })
        .then(data => {
            if(data.length > 0){
                bcrypt.compare(password,data[0].password,function(err, result) {
                    if(result== true){
                        req.session.type = "dd";
                        req.session.user_id = data[0].id;
                        const id=req.session.user_id;
                        // res.locals.type = req.session.type;
                        // res.locals.user_id = req.session.user_id;
                        console.log("session=", req.session.type,res.locals);
                        // const token=jwt.sign({id},process.env.JWT_SECRET,token{
                        //     expiresIn:process.env.JWT_EXPIRES_IN
                        // });
                        // console.log("the token is :"+)
                        res.redirect('/dd/dashboard');
                    }
                    else{
                        return res.status(200).render('dd/login', { title: 'ডাল,তেল ও মসলা বীজ উৎপাদন সংরক্ষণ ও বিতরণ (৩য় পর্যায়) প্রকল্প',msg:'Please provide a username and password' });
                    }
                });
            }else{
                return res.status(200).render('dd/login', { title: 'ডাল,তেল ও মসলা বীজ উৎপাদন সংরক্ষণ ও বিতরণ (৩য় পর্যায়) প্রকল্প',msg:'Please provide a username and password' });
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

module.exports.ddDashboard = async(req,res) => {
    console.log("dddashboard",res.locals.type);
    res.render('dd/dashboard', { title: 'ডাল,তেল ও মসলা বীজ উৎপাদন সংরক্ষণ ও বিতরণ (৩য় পর্যায়) প্রকল্প',msg:'Welcome' });
};
//logIn controller end

//signUp controller
module.exports.ddsignup=async(req,res)=>{
        res.render('dd/signup', { title: 'ডাল,তেল ও মসলা বীজ উৎপাদন সংরক্ষণ ও বিতরণ (৩য় পর্যায়) প্রকল্প',msg:''});
};
module.exports.ddsignuppost=async(req,res)=>{
    try {
        const{ads,uname,password,confirmPassword}=req.body;
        const data = await dd.findAll({ where: {uname: uname} })
        if(data.length > 0){
            res.render('dd/signup',{title: 'ডাল,তেল ও মসলা বীজ উৎপাদন সংরক্ষণ ও বিতরণ (৩য় পর্যায়) প্রকল্প',msg:'ERROR: The dd is already enrolled!' })
        }
        else if(password !== confirmPassword){
            return res.render('dd/signup',{title: 'ডাল,তেল ও মসলা বীজ উৎপাদন সংরক্ষণ ও বিতরণ (৩য় পর্যায়) প্রকল্প',msg:'ERROR: Passwords do not match!' })
        }
        else{
            const hashedPassword = await bcrypt.hash(password, 10);
            console.log(hashedPassword);
            try{
                const createdd = await dd.create({
                    uname: uname,
                    password:hashedPassword,
                    pd_id:1
                    })
                res.render('dd/signup',{title: 'ডাল,তেল ও মসলা বীজ উৎপাদন সংরক্ষণ ও বিতরণ (৩য় পর্যায়) প্রকল্প',msg:'dd Registered Successfully!'})
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

//blockProgress controller
module.exports.blockProgress=async(req,res)=>{ 
    try{
        var upazillass=await upazilla.findAll({where: {dd_id: req.session.user_id}});
        console.log("inside");
        res.render('dd/blockProgress/blockProgress', { title: 'উপজেলাওয়ারী বীজ উতপাদনে ব্লকের অগ্রগতি',success:'',upazillas:upazillass });
    }
    catch(err){
        console.log("outside",err);
        res.render('dd/blockProgress/blockProgress', { title: 'উপজেলাওয়ারী বীজ উতপাদনে ব্লকের অগ্রগতি',success:'', upazillas:err });
    }
     
    //  records:result

};

module.exports.blockProgressFilter=async(req,res)=>{
    await blockProgress.findAll({ 
        where: {year: req.body.year,upazilla_id: req.body.upazilla}
    })
    .then(data => {
        res.render('dd/blockProgress/blockProgressTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('dd/blockProgress/blockProgressFilter', { title: 'উপজেলাওয়ারী বীজ উতপাদনে ব্লকের অগ্রগতি',success:'', records: err });
    })

};
//blockProgress controller end

//honey controller
module.exports.honey=async(req,res)=>{ 
    try{
        var upazillass=await upazilla.findAll({where: {dd_id: req.session.user_id}});
        console.log("inside");
        res.render('dd/honey/honey', { title: 'মৌচাষী সংক্রান্ত তথ্য',success:'',upazillas:upazillass });
    }
    catch(err){
        console.log("outside",err);
        res.render('dd/honey/honey', { title: 'মৌচাষী সংক্রান্ত তথ্য',success:'', upazillas:err });
    }
     
    //  records:result

};

module.exports.honeyFilter=async(req,res)=>{
    await honey.findAll({ 
        where: {year: req.body.year,upazilla_id: req.body.upazilla}
    })
    .then(data => {
        res.render('dd/honey/honeyTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('dd/honey/honeyFilter', { title: 'মৌচাষী সংক্রান্ত তথ্য',success:'', records: err });
    })

};
//honey controller end

//recievedCrops controller
module.exports.recievedCrops=async(req,res)=>{ 
    try{
        var upazillass=await upazilla.findAll({where: {dd_id: req.session.user_id}});
        console.log("inside");
        res.render('dd/recievedCrops/recievedCrops', { title: 'ফসল সংগ্রহোত্তর প্রতিবেদন',success:'',upazillas:upazillass });
    }
    catch(err){
        console.log("outside",err);
        res.render('dd/recievedCrops/recievedCrops', { title: 'প্রশিক্ষণপ্রাপ্ত কৃষকের তথ্য',success:'', upazillas:err });
    }
     
    //  records:result

};

module.exports.recievedCropsFilter=async(req,res)=>{
    await recievedCrops.findAll({ 
        where: {year: req.body.year,upazilla_id: req.body.upazilla}
    })
    .then(data => {
        res.render('dd/recievedCrops/recievedCropsTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('dd/recievedCrops/recievedCropsFilter', { title: 'ফসল সংগ্রহোত্তর প্রতিবেদন',success:'', records: err });
    })

};
//recievedCrops controller end

//seedInitial controller
module.exports.seedInitial=async(req,res)=>{ 
    try{
        var upazillass=await upazilla.findAll({where: {dd_id: req.session.user_id}});
        console.log("inside");
        res.render('dd/seedInitial/seedInitial', { title: 'বীজ উৎপাদন ব্লকের কৃষকের প্রাথমিক প্রতিবেদন',success:'',upazillas:upazillass });
    }
    catch(err){
        console.log("outside",err);
        res.render('dd/seedInitial/seedInitial', { title: 'বীজ উৎপাদন ব্লকের কৃষকের প্রাথমিক প্রতিবেদন',success:'', upazillas:err });
    }
     
    //  records:result

};

module.exports.seedInitialFilter=async(req,res)=>{
    await seedInitial.findAll({ 
        where: {year: req.body.year,upazilla_id: req.body.upazilla}
    })
    .then(data => {
        res.render('dd/seedInitial/seedInitialTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('dd/seedInitial/seedInitialFilter', { title: 'প্রশিক্ষণপ্রাপ্ত কৃষকের তথ্য',success:'', records: err });
    })

};
//seedInitial controller end

//seedProgress controller
module.exports.seedProgress=async(req,res)=>{ 
    try{
        var upazillass=await upazilla.findAll({where: {dd_id: req.session.user_id}});
        console.log("inside");
        res.render('dd/seedProgress/seedProgress', { title: 'বীজ উৎপাদন ব্লকে বীজ বপনের অগ্রগতির প্রতিবেদন(বপনের দুই সপ্তাহের মধ্যে পাঠাতে হবে)',success:'',upazillas:upazillass });
    }
    catch(err){
        console.log("outside",err);
        res.render('dd/seedProgress/seedProgress', { title: 'বীজ উৎপাদন ব্লকে বীজ বপনের অগ্রগতির প্রতিবেদন(বপনের দুই সপ্তাহের মধ্যে পাঠাতে হবে)',success:'', upazillas:err });
    }
     
    //  records:result

};

module.exports.seedProgressFilter=async(req,res)=>{
    await seedProgress.findAll({ 
        where: {year: req.body.year,upazilla_id: req.body.upazilla}
    })
    .then(data => {
        res.render('dd/seedProgress/seedProgressTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('dd/seedProgress/seedProgressFilter', { title: 'বীজ উৎপাদন ব্লকে বীজ বপনের অগ্রগতির প্রতিবেদন(বপনের দুই সপ্তাহের মধ্যে পাঠাতে হবে)',success:'', records: err });
    })

};
//seedProgress controller end

//blockProgress controller
module.exports.progress=async(req,res)=>{
    await progress.findAll({
        where: {dd_id: req.session.user_id}
    })
    .then(data => {
        console.log("inside",data);
        res.render('dd/progress/progress', { title: 'অগ্রগতির প্রতিবেদন ',success:'', records: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('dd/progress/progress', { title: 'অগ্রগতির প্রতিবেদন ',success:'', records: err });
    })
     
    //  records:result

};

module.exports.progressYear=async(req,res)=>{
    await progress.findAll({
        where: {year: req.body.year,dd_id: req.session.user_id}
    })
    .then(data => {
        res.render('dd/progress/progressTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('dd/progress/progressYear', { title: 'অগ্রগতির প্রতিবেদন ',success:'', records: err });
    })

};

module.exports.progressForm=async(req,res)=>{
    res.render('dd/progress/progressForm', { title: 'অগ্রগতির প্রতিবেদন ',msg:'' ,success:'',user_id: req.session.user_id});
};

module.exports.progressFormPost=async(req,res)=>{
    var upazilla= req.body.upazilla;
    var sme= req.body.sme;
    var robi= req.body.robi;
    var kharifone= req.body.kharifone;
    var khariftwo= req.body.khariftwo;
    var block= req.body.block;
    var gojano= req.body.gojano;
    var comment= req.body.comment;
    var year =req.body.year;
    var user_id =req.body.user_id;

    await progress.create({
        upazilla:upazilla,
        sme:sme,
        robi:robi,
        kharifone:kharifone,
        khariftwo:khariftwo,
        block:block,
        gojano:gojano,
        comment:comment,
        year:year,
        dd_id:user_id
    
  
    })
    
        
        .then(data => {
            res.redirect('/dd/progress');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};
module.exports.progressEdit=async(req,res)=>{
    var id=req.params.id;
    console.log('id',id);
    res.render('dd/progress/progressForm', { title: ' অগ্রগতির প্রতিবেদন ',msg:'' ,success:'',user_id: req.session.user_id});
};

module.exports.progressDelete=async(req,res)=>{
   
            res.redirect('/dd/progress');
        
  
};
//progress controller end

//preservedProgress controller
module.exports.preservedProgress=async(req,res)=>{
    await preservedProgress.findAll({
        where: {dd_id: req.session.user_id}
    })
    .then(data => {
        console.log("inside",data);
        res.render('dd/preservedProgress/preservedProgress', { title: 'বীজ উৎপাদনে ব্লকে উৎপাদিত ও সংরক্ষিত বীজের পরিমাণ তথ্য',success:'', records: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('dd/preservedProgress/preservedProgress', { title: 'বীজ উৎপাদনে ব্লকে উৎপাদিত ও সংরক্ষিত বীজের পরিমাণ তথ্য',success:'', records: err });
    })
     
    //  records:result

};

module.exports.preservedProgressYear=async(req,res)=>{
    await preservedProgress.findAll({
        where: {year: req.body.year,dd_id: req.session.user_id}
    })
    .then(data => {
        res.render('dd/preservedProgress/preservedProgressTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('dd/preservedProgress/preservedProgressYear', { title: 'বীজ উৎপাদনে ব্লকে উৎপাদিত ও সংরক্ষিত বীজের পরিমাণ তথ্য',success:'', records: err });
    })

};

module.exports.preservedProgressForm=async(req,res)=>{
    res.render('dd/preservedProgress/preservedProgressForm', { title: 'বীজ উৎপাদনে ব্লকে উৎপাদিত ও সংরক্ষিত বীজের পরিমাণ তথ্য',msg:'' ,success:'',user_id: req.session.user_id});
};

module.exports.preservedProgressFormPost=async(req,res)=>{
    var name= req.body.name;
    var production= req.body.production;
    var preserved= req.body.preserved;
    var sold= req.body.sold;
    var customer= req.body.customer;
    var comment= req.body.comment;
    var year =req.body.year;
    var user_id =req.body.user_id;

    await preservedProgress.create({
        name: name,
        production:production,
        preserved:preserved,
        sold:sold,
        customer:customer,
        comment:comment,
        year:year,
        dd_id:user_id
    
  
    })
    
        
        .then(data => {
            res.redirect('/dd/preservedProgress');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};
module.exports.preservedProgressEdit=async(req,res)=>{
    var id=req.params.id;
    console.log('id',id);
    res.render('dd/preservedProgress/preservedProgressForm', { title: 'বীজ উৎপাদনে ব্লকে উৎপাদিত ও সংরক্ষিত বীজের পরিমাণ তথ্য',msg:'' ,success:'',user_id: req.session.user_id});
};

module.exports.preservedProgressDelete=async(req,res)=>{
   
            res.redirect('/dd/preservedProgress');
        
  
};
//preservedProgress controller end