const db=require('../models');
const pd = db.pd;
const dd = db.dd;     
const upazilla = db.upazilla;
const blockProgress = db.blockProgress;
const honey = db.honey;
const recievedCrops = db.recievedCrops;
const seedInitial = db.seedInitial;
const seedProgress = db.seedProgress;
const review = db.review;
const motivation = db.motivation;
const fieldDay = db.fieldDay;


const jwt= require('jsonwebtoken');
const bcrypt= require('bcryptjs'); 

const { request, response } = require('express');
const express = require('express');

module.exports.upazillalogin=async(req,res)=>{
    res.render('upazilla/login', { title: 'ডাল,তেল ও মসলা বীজ উৎপাদন সংরক্ষণ ও বিতরণ (৩য় পর্যায়) প্রকল্প',msg:'' });
    res.send("log");
};

module.exports.upazillaloginpost=async(req,res)=>{
    try {
        const uname = req.body.uname;
        const password = req.body.password;
        upazilla.findAll({ where: {uname: uname} })
        .then(data => {
            if(data.length > 0){
                bcrypt.compare(password,data[0].password,function(err, result) {
                    if(result== true){
                        req.session.type = "upazilla";
                        req.session.user_id = data[0].id;
                        const id=req.session.user_id;
                        // res.locals.type = req.session.type;
                        // res.locals.user_id = req.session.user_id;
                        console.log("session=", req.session.type,res.locals);
                        // const token=jwt.sign({id},process.env.JWT_SECRET,token{
                        //     expiresIn:process.env.JWT_EXPIRES_IN
                        // });
                        // console.log("the token is :"+)
                        res.redirect('/upazilla/dashboard');
                    }
                    else{
                        return res.status(200).render('upazilla/login', { title: 'ডাল,তেল ও মসলা বীজ উৎপাদন সংরক্ষণ ও বিতরণ (৩য় পর্যায়) প্রকল্প',msg:'Please provide a username and password' });
                    }
                });
            }else{
                return res.status(200).render('upazilla/login', { title: 'ডাল,তেল ও মসলা বীজ উৎপাদন সংরক্ষণ ও বিতরণ (৩য় পর্যায়) প্রকল্প',msg:'Please provide a username and password' });
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

module.exports.upazillaDashboard = async(req,res) => {
    console.log("upazilladashboard",res.locals.type);
    res.render('upazilla/dashboard', { title: 'ডাল,তেল ও মসলা বীজ উৎপাদন সংরক্ষণ ও বিতরণ (৩য় পর্যায়) প্রকল্প',msg:'Welcome' });
};
//logIn controller end

//signUp controller
module.exports.upazillasignup=async(req,res)=>{
    await dd.findAll()
    .then(data => {
        console.log("inside");
        res.render('upazilla/signup', { title: 'ডাল,তেল ও মসলা বীজ উৎপাদন সংরক্ষণ ও বিতরণ (৩য় পর্যায়) প্রকল্প',msg:'',records: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('upazilla/signup', { title: 'ডাল,তেল ও মসলা বীজ উৎপাদন সংরক্ষণ ও বিতরণ (৩য় পর্যায়) প্রকল্প',msg:'',records: err });
    })
};
module.exports.upazillasignuppost=async(req,res)=>{
    try {
        const{dds,uname,password,confirmPassword}=req.body;
        const ddata=await dd.findAll();
        const data = await upazilla.findAll({ where: {uname: uname} });
        
        if(data.length > 0){
            res.render('upazilla/signup',{title: 'ডাল,তেল ও মসলা বীজ উৎপাদন সংরক্ষণ ও বিতরণ (৩য় পর্যায়) প্রকল্প',msg:'ERROR: The upazilla is already enrolled!',records: ddata})
        }
        else if(password !== confirmPassword){
           res.render('upazilla/signup',{title: 'ডাল,তেল ও মসলা বীজ উৎপাদন সংরক্ষণ ও বিতরণ (৩য় পর্যায়) প্রকল্প',msg:'ERROR: Passwords do not match!',records: ddata})
        }
        else{
            const hashedPassword = await bcrypt.hash(password, 10);
            console.log(hashedPassword);
            try{
                const createupazilla = await upazilla.create({
                    uname: uname,
                    password:hashedPassword,
                    dd_id:dds,
                    pd_id:1
                    })
                res.render('upazilla/signup',{title: 'ডাল,তেল ও মসলা বীজ উৎপাদন সংরক্ষণ ও বিতরণ (৩য় পর্যায়) প্রকল্প',msg:'upazilla Registered Successfully!',records: ddata})
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
    await fieldDay.findAll({
        where: {upazilla: req.session.user_id}
    })
    .then(data => {
        console.log("inside",data);
        res.render('upazilla/fieldDay/fieldDay', { title: 'ফসল সংগ্রহোত্তর প্রতিবেদন',success:'', records: data });
    })
    .catch(err => {
        console.log("outside",err);
    })
     
    //  records:result

};

module.exports.fieldDayYear=async(req,res)=>{
    await fieldDay.findAll({
        where: {year: req.body.year,upazilla_id: req.session.user_id}
    })
    .then(data => {
        res.render('upazilla/fieldDay/fieldDayTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        console.log("outside",err);    })

};

module.exports.fieldDayForm=async(req,res)=>{
    res.render('upazilla/fieldDay/fieldDayForm', { title: 'ফসল সংগ্রহোত্তর প্রতিবেদন',msg:'' ,success:'',user_id: req.session.user_id});
};

module.exports.fieldDayFormPost=async(req,res)=>{
    var date= req.body.date;
    var present= req.body.present;
    var male= req.body.male;
    var female= req.body.female;
    var resource= req.body.resource;
    var resourceDetails= req.body.resourceDetails;
    var year =req.body.year;
    var user_id =req.body.user_id;

    await fieldDay.create({
        date: date,
        present:present,
        male:male,
        female:female,
        resource:resource,
        resourceDetails:resourceDetails,
        year:year,
        upazilla_id:user_id
    })
        
        .then(data => {
            res.redirect('/upazilla/fieldDay');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};
module.exports.fieldDayEdit=async(req,res)=>{
    await fieldDay.findByPk(req.params.id)
    .then(data => {
        console.log("inside");
        res.render('upazilla/fieldDay/fieldDayEdit', { title: 'প্রশিক্ষণপ্রাপ্ত কৃষকের তথ্য',msg:'' ,success:'',records:data,user_id: req.session.user_id});
    })
    .catch(err => {
        console.log("err");
    })
};
module.exports.fieldDayEditPost=async(req,res)=>{
    var date= req.body.date;
    var present= req.body.present;
    var male= req.body.male;
    var female= req.body.female;
    var resource= req.body.resource;
    var resourceDetails= req.body.resourceDetails;
    var year =req.body.year;
    var user_id =req.body.user_id;

    await fieldDay.update({
        date: date,
        present:present,
        male:male,
        female:female,
        resource:resource,
        resourceDetails:resourceDetails,
        year:year,
    },
    {
        where: {id: req.params.id}
    })
        .then(data => {
            res.redirect('/upazilla/fieldDay');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
  
};
module.exports.fieldDayDelete=async(req,res)=>{
    var fieldDayDelete = await fieldDay.findByPk(req.params.id);
    try {
        fieldDayDelete.destroy();
        res.redirect("/upazilla/fieldDay");
    }
    catch{
        res.render('errorpage',err);
    }
};
//fieldDay controller end

//motivation controller
module.exports.motivation=async(req,res)=>{
    await motivation.findAll({
        where: {upazilla: req.session.user_id}
    })
    .then(data => {
        console.log("inside",data);
        res.render('upazilla/motivation/motivation', { title: 'ফসল সংগ্রহোত্তর প্রতিবেদন',success:'', records: data });
    })
    .catch(err => {
        console.log("outside",err);
    })
     
    //  records:result

};

module.exports.motivationYear=async(req,res)=>{
    await motivation.findAll({
        where: {year: req.body.year,upazilla_id: req.session.user_id}
    })
    .then(data => {
        res.render('upazilla/motivation/motivationTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        console.log("outside",err);
        })

};

module.exports.motivationForm=async(req,res)=>{
    res.render('upazilla/motivation/motivationForm', { title: 'ফসল সংগ্রহোত্তর প্রতিবেদন',msg:'' ,success:'',user_id: req.session.user_id});
};

module.exports.motivationFormPost=async(req,res)=>{
    var date= req.body.date;
    var name= req.body.name;
    var place= req.body.place;
    var details= req.body.details;
    var year =req.body.year;
    var user_id =req.body.user_id;

    await motivation.create({
        date: date,
        name:name,
        place:place,
        details:details,
        year:year,
        upazilla_id:user_id
    })
        
        .then(data => {
            res.redirect('/upazilla/motivation');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};
module.exports.motivationEdit=async(req,res)=>{
    await motivation.findByPk(req.params.id)
    .then(data => {
        console.log("inside");
        res.render('upazilla/motivation/motivationEdit', { title: 'প্রশিক্ষণপ্রাপ্ত কৃষকের তথ্য',msg:'' ,success:'',records:data,user_id: req.session.user_id});
    })
    .catch(err => {
        console.log("err");
    })
};
module.exports.motivationEditPost=async(req,res)=>{
    var date= req.body.date;
    var name= req.body.name;
    var place= req.body.place;
    var details= req.body.details;
    var year =req.body.year;
    var user_id =req.body.user_id;

    await motivation.update({
        date: date,
        name:name,
        place:place,
        details:details,
        year:year,
    },
    {
        where: {id: req.params.id}
    })
        .then(data => {
            res.redirect('/upazilla/motivation');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
  
};
module.exports.motivationDelete=async(req,res)=>{
    var motivationDelete = await motivation.findByPk(req.params.id);
    try {
        motivationDelete.destroy();
        res.redirect("/upazilla/motivation");
    }
    catch{
        res.render('errorpage',err);
    }
};
//motivation controller end

//review controller
module.exports.review=async(req,res)=>{
    await review.findAll({
        where: {upazilla: req.session.user_id}
    })
    .then(data => {
        console.log("inside",data);
        res.render('upazilla/review/review', { title: 'ফসল সংগ্রহোত্তর প্রতিবেদন',success:'', records: data });
    })
    .catch(err => {
        console.log("outside",err);
    })
     
    //  records:result

};

module.exports.reviewYear=async(req,res)=>{
    await review.findAll({
        where: {year: req.body.year,upazilla_id: req.session.user_id}
    })
    .then(data => {
        res.render('upazilla/review/reviewTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        console.log("outside",err);
    })

};

module.exports.reviewForm=async(req,res)=>{
    res.render('upazilla/review/reviewForm', { title: 'ফসল সংগ্রহোত্তর প্রতিবেদন',msg:'' ,success:'',user_id: req.session.user_id});
};

module.exports.reviewFormPost=async(req,res)=>{
    var date= req.body.date;
    var present= req.body.present;
    var male= req.body.male;
    var female= req.body.female;
    var resource= req.body.resource;
    var resourceDetails= req.body.resourceDetails;
    var year =req.body.year;
    var user_id =req.body.user_id;

    await review.create({
        date: date,
        present:present,
        male:male,
        female:female,
        resource:resource,
        resourceDetails:resourceDetails,
        year:year,
        upazilla_id:user_id
    })
        
        .then(data => {
            res.redirect('/upazilla/review');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};
module.exports.reviewEdit=async(req,res)=>{
    await review.findByPk(req.params.id)
    .then(data => {
        console.log("inside");
        res.render('upazilla/review/reviewEdit', { title: 'প্রশিক্ষণপ্রাপ্ত কৃষকের তথ্য',msg:'' ,success:'',records:data,user_id: req.session.user_id});
    })
    .catch(err => {
        console.log("err");
    })
};
module.exports.reviewEditPost=async(req,res)=>{
    var date= req.body.date;
    var present= req.body.present;
    var male= req.body.male;
    var female= req.body.female;
    var resource= req.body.resource;
    var resourceDetails= req.body.resourceDetails;
    var year =req.body.year;
    var user_id =req.body.user_id;

    await review.update({
        date: date,
        present:present,
        male:male,
        female:female,
        resource:resource,
        resourceDetails:resourceDetails,
        year:year,
    },
    {
        where: {id: req.params.id}
    })
        .then(data => {
            res.redirect('/upazilla/review');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
  
};
module.exports.reviewDelete=async(req,res)=>{
    var reviewDelete = await review.findByPk(req.params.id);
    try {
        reviewDelete.destroy();
        res.redirect("/upazilla/review");
    }
    catch{
        res.render('errorpage',err);
    }
};
//review controller end

//blockProgress controller
module.exports.blockProgress=async(req,res)=>{
    await blockProgress.findAll({
        where: {upazilla_id: req.session.user_id}
    })
    .then(data => {
        console.log("inside");
        res.render('upazilla/blockProgress/blockProgress', { title: 'উপজেলাওয়ারী বীজ উতপাদনে ব্লকের অগ্রগতি',success:'', records: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('upazilla/blockProgress/blockProgress', { title: 'উপজেলাওয়ারী বীজ উতপাদনে ব্লকের অগ্রগতি',success:'', records: err });
    })
     
    //  records:result

};

module.exports.blockProgressYear=async(req,res)=>{
    await blockProgress.findAll({
        where: {year: req.body.year,upazilla_id: req.session.user_id}
    })
    .then(data => {
        console.log("inside",data);
        res.render('upazilla/blockProgress/blockProgressTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        console.log("outside",data);
        res.render('upazilla/blockProgress/blockProgressYear', { title: 'উপজেলাওয়ারী বীজ উতপাদনে ব্লকের অগ্রগতি',success:'', records: err });
    })

};

module.exports.blockProgressForm=async(req,res)=>{
    res.render('upazilla/blockProgress/blockProgressForm', { title: 'উপজেলাওয়ারী বীজ উতপাদনে ব্লকের অগ্রগতি',msg:'' ,success:'',user_id: req.session.user_id});
};

module.exports.blockProgressFormPost=async(req,res)=>{
    var aname= req.body.aname;
    var dname= req.body.dname;
    var upazilla= req.body.upazilla;
    var crop= req.body.crop;
    var trialnum= req.body.trialnum;
    var seed= req.body.seed;
    var organic= req.body.organic;
    var chemical= req.body.chemical;
    var purify= req.body.purify;
    var balainashok= req.body.balainashok;
    var agacha= req.body.agacha;
    var signboard= req.body.signboard;
    var register= req.body.register;
    var comment= req.body.comment;
    var year =req.body.year;
    var user_id =req.body.user_id;

    await blockProgress.create({
        aname: aname,
        dname:dname,
        upazilla:upazilla,
        crop:crop,
        trialnum:trialnum,
        seed:seed,
        organic:organic,
        chemical:chemical,
        purify:purify,
        balainashok:balainashok,
        agacha:agacha,
        signboard:signboard,
        register:register,
        comment:comment,
        year:year,
        upazilla_id:user_id
    
  
    })
    
        
        .then(data => {
            res.redirect('/upazilla/blockProgress');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};
module.exports.blockProgressEdit=async(req,res)=>{
    var id=req.params.id;
    console.log('id',id);
    res.render('upazilla/blockProgress/blockProgressForm', { title: 'উপজেলাওয়ারী বীজ উতপাদনে ব্লকের অগ্রগতি',msg:'' ,success:'',user_id: req.session.user_id});
};

module.exports.blockProgressDelete=async(req,res)=>{
   
            res.redirect('/upazilla/blockProgress');
        
  
};
//blockProgress controller end

//honey controller
module.exports.honey=async(req,res)=>{
    await honey.findAll({
        where: {upazilla: req.session.user_id}
    })
    .then(data => {
        console.log("inside",data);
        res.render('upazilla/honey/honey', { title: 'মৌচাষী সংক্রান্ত তথ্য',success:'', records: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('upazilla/honey/honey', { title: 'মৌচাষী সংক্রান্ত তথ্য',success:'', records: err });
    })
     
    //  records:result

};

module.exports.honeyYear=async(req,res)=>{
    await honey.findAll({
        where: {year: req.body.year,upazilla_id: req.session.user_id}
    })
    .then(data => {
        res.render('upazilla/honey/honeyTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('upazilla/honey/honeyYear', { title: 'মৌচাষী সংক্রান্ত তথ্য',success:'', records: err });
    })

};

module.exports.honeyForm=async(req,res)=>{
    res.render('upazilla/honey/honeyForm', { title: 'মৌচাষী সংক্রান্ত তথ্য',msg:'' ,success:'',user_id: req.session.user_id});
};

module.exports.honeyFormPost=async(req,res)=>{
    var upazilla= req.body.upazilla;
    var name= req.body.name;
    var address= req.body.address;
    var mnum= req.body.mnum;
    var box= req.body.box;
    var production= req.body.production;
    var foshol= req.body.foshol;
    var whichbox= req.body.whichbox;
    var sthanio= req.body.sthanio;
    var experience= req.body.experience;
    var sme= req.body.sme;
    var year =req.body.year;
    var user_id =req.body.user_id;

    await honey.create({
        upazilla: upazilla,
        name:name,
        address:address,
        mnum:mnum,
        box:box,
        production:production,
        foshol:foshol,
        whichbox:whichbox,
        sthanio:sthanio,
        experience:experience,
        sme:sme,
        year:year,
        upazilla_id:user_id
    })
    
        
        .then(data => {
            res.redirect('/upazilla/honey');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};
module.exports.honeyEdit=async(req,res)=>{
    var id=req.params.id;
    console.log('id',id);
    res.render('upazilla/honey/honeyForm', { title: 'মৌচাষী সংক্রান্ত তথ্য',msg:'' ,success:'',user_id: req.session.user_id});
};

module.exports.honeyDelete=async(req,res)=>{
    
            res.redirect('/upazilla/honey');
        
};
//honey controller end

//recievedCrops controller
module.exports.recievedCrops=async(req,res)=>{
    await recievedCrops.findAll({
        where: {upazilla: req.session.user_id}
    })
    .then(data => {
        console.log("inside",data);
        res.render('upazilla/recievedCrops/recievedCrops', { title: 'ফসল সংগ্রহোত্তর প্রতিবেদন',success:'', records: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('upazilla/recievedCrops/recievedCrops', { title: 'ফসল সংগ্রহোত্তর প্রতিবেদন',success:'', records: err });
    })
     
    //  records:result

};

module.exports.recievedCropsYear=async(req,res)=>{
    await recievedCrops.findAll({
        where: {year: req.body.year,upazilla_id: req.session.user_id}
    })
    .then(data => {
        res.render('upazilla/recievedCrops/recievedCropsTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('upazilla/recievedCrops/recievedCropsYear', { title: 'ফসল সংগ্রহোত্তর প্রতিবেদন',success:'', records: err });
    })

};

module.exports.recievedCropsForm=async(req,res)=>{
    res.render('upazilla/recievedCrops/recievedCropsForm', { title: 'ফসল সংগ্রহোত্তর প্রতিবেদন',msg:'' ,success:'',user_id: req.session.user_id});
};

module.exports.recievedCropsFormPost=async(req,res)=>{
    var block= req.body.block;
    var farmer= req.body.farmer;
    var crop= req.body.crop;
    var breed= req.body.breed;
    var area= req.body.area;
    var bopondate= req.body.bopondate;
    var cutdate= req.body.cutdate;
    var folon= req.body.folon;
    var hectorfolon= req.body.hectorfolon;
    var seedAmount= req.body.seedAmount;
    var comment= req.body.comment;
    var year =req.body.year;
    var user_id =req.body.user_id;

    await recievedCrops.create({
        block: block,
        farmer:farmer,
        crop:crop,
        breed:breed,
        area:area,
        bopondate:bopondate,
        cutdate:cutdate,
        folon:folon,
        hectorfolon:hectorfolon,
        seedAmount:seedAmount,
        comment:comment,
        year:year,
        upazilla_id:user_id
    })
        
        .then(data => {
            res.redirect('/upazilla/recievedCrops');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};
module.exports.recievedCropsEdit=async(req,res)=>{
    var id=req.params.id;
    console.log('id',id);
    res.render('upazilla/recievedCrops/recievedCropsForm', { title: 'ফসল সংগ্রহোত্তর প্রতিবেদন',msg:'' ,success:'',user_id: req.session.user_id});
};

module.exports.recievedCropsDelete=async(req,res)=>{
    
            res.redirect('/upazilla/recievedCrops');
        
  
};
//recievedCrops controller end

//seedInitial controller
module.exports.seedInitial=async(req,res)=>{
    await seedInitial.findAll({
        where: {upazilla: req.session.user_id}
    })
    .then(data => {
        console.log("inside",data);
        res.render('upazilla/seedInitial/seedInitial', { title: 'বীজ উৎপাদন ব্লকের কৃষকের প্রাথমিক প্রতিবেদন',success:'', records: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('upazilla/seedInitial/seedInitial', { title: 'বীজ উৎপাদন ব্লকের কৃষকের প্রাথমিক প্রতিবেদন',success:'', records: err });
    })
     
    //  records:result

};

module.exports.seedInitialYear=async(req,res)=>{
    await seedInitial.findAll({
        where: {year: req.body.year,upazilla_id: req.session.user_id}
    })
    .then(data => {
        res.render('upazilla/seedInitial/seedInitialTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('upazilla/seedInitial/seedInitialYear', { title: 'বীজ উৎপাদন ব্লকের কৃষকের প্রাথমিক প্রতিবেদন',success:'', records: err });
    })

};

module.exports.seedInitialForm=async(req,res)=>{
    res.render('upazilla/seedInitial/seedInitialForm', { title: 'বীজ উৎপাদন ব্লকের কৃষকের প্রাথমিক প্রতিবেদন',msg:'' ,success:'',user_id: req.session.user_id});
};

module.exports.seedInitialFormPost=async(req,res)=>{
    var name= req.body.name;
    var fname= req.body.fname;
    var mnum= req.body.mnum;
    var nid= req.body.nid;
    var village= req.body.village;
    var block= req.body.block;
    var union= req.body.union;
    var cname= req.body.cname;
    var breed= req.body.breed;
    var saao= req.body.saao;
    var year =req.body.year;
    var user_id =req.body.user_id;

    await seedInitial.create({
        name: name,
        fname:fname,
        mnum:mnum,
        nid:nid,
        village:village,
        block:block,
        union:union,
        cname:cname,
        breed:breed,
        saao:saao,
        year:year,
        upazilla_id:user_id
    })
        .then(data => {
            res.redirect('/upazilla/seedInitial');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};
module.exports.seedInitialEdit=async(req,res)=>{
    var id=req.params.id;
    console.log('id',id);
    res.render('upazilla/seedInitial/seedInitialForm', { title: 'বীজ উৎপাদন ব্লকের কৃষকের প্রাথমিক প্রতিবেদন',msg:'' ,success:'',user_id: req.session.user_id});
};

module.exports.seedInitialDelete=async(req,res)=>{
    
            res.redirect('/upazilla/seedInitial');
       
};
//seedInitial controller end

//seedProgress controller
module.exports.seedProgress=async(req,res)=>{
    await seedProgress.findAll({
        where: {upazilla: req.session.user_id}
    })
    .then(data => {
        console.log("inside",data);
        res.render('upazilla/seedProgress/seedProgress', { title: 'বীজ উৎপাদন ব্লকে বীজ বপনের অগ্রগতির প্রতিবেদন(বপনের দুই সপ্তাহের মধ্যে পাঠাতে হবে)',success:'', records: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('upazilla/seedProgress/seedProgress', { title: 'বীজ উৎপাদন ব্লকে বীজ বপনের অগ্রগতির প্রতিবেদন(বপনের দুই সপ্তাহের মধ্যে পাঠাতে হবে)',success:'', records: err });
    })
     
    //  records:result

};

module.exports.seedProgressYear=async(req,res)=>{
    await seedProgress.findAll({
        where: {year: req.body.year,upazilla_id: req.session.user_id}
    })
    .then(data => {
        res.render('upazilla/seedProgress/seedProgressTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('upazilla/seedProgress/seedProgressYear', { title: 'বীজ উৎপাদন ব্লকে বীজ বপনের অগ্রগতির প্রতিবেদন(বপনের দুই সপ্তাহের মধ্যে পাঠাতে হবে)',success:'', records: err });
    })

};

module.exports.seedProgressForm=async(req,res)=>{
    res.render('upazilla/seedProgress/seedProgressForm', { title: 'বীজ উৎপাদন ব্লকে বীজ বপনের অগ্রগতির প্রতিবেদন(বপনের দুই সপ্তাহের মধ্যে পাঠাতে হবে)',msg:'' ,success:'',user_id: req.session.user_id});
};

module.exports.seedProgressFormPost=async(req,res)=>{
    var name= req.body.name;
    var mnum= req.body.mnum;
    var village= req.body.village;
    var block= req.body.block;
    var union= req.body.union;
    var cname= req.body.cname;
    var breed= req.body.breed;
    var bopondate= req.body.bopondate;
    var situation= req.body.situation;
    var saao= req.body.saao;
    var year =req.body.year;
    var user_id =req.body.user_id;

    await seedProgress.create({
        name: name,
        mnum:mnum,
        village:village,
        block:block,
        union:union,
        cname:cname,
        breed:breed,
        bopondate:bopondate,
        situation:situation,
        saao:saao,
        year:year,
        upazilla_id:user_id

    })   
        
        .then(data => {
            res.redirect('/upazilla/seedProgress');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};
module.exports.seedProgressEdit=async(req,res)=>{
    var id=req.params.id;
    console.log('id',id);
    res.render('upazilla/seedProgress/seedProgressForm', { title: 'বীজ উৎপাদন ব্লকে বীজ বপনের অগ্রগতির প্রতিবেদন(বপনের দুই সপ্তাহের মধ্যে পাঠাতে হবে)',msg:'' ,success:'',user_id: req.session.user_id});
};

module.exports.seedProgressDelete=async(req,res)=>{
    
            res.redirect('/upazilla/seedProgress');
        
  
};
//seedProgress controller end
