const Student = require('../model/student')

const index = (req,res,next)=>{
    Student.find()
    .then(response =>{
        res.json({
            response
        }).catch(error=>{
            res.json({message: "An error occured"})
        })
    })
}

const show = (req,res,next)=>{
    let id = req.params.id
    Student.findById(id).then(response=>{
        res.json({
            response
        })
    }).catch(error=>{
        res.json({
            message: "An error occured"
        })
    })
}

const insert = (req,res,next)=>{
    let student = new Student({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        age: req.body.age
    })
    student.save()
    .then(()=>{
        res.json({message:"Student added successfully!"})
    }).catch(()=>{
        res.json({message:"An error occured"})
    })
}

const update = (req,res,next)=>{
    let id = req.params.id  
    Student.findByIdAndUpdate(id,{$set: req.body},{new:true})
    .then(()=>{
        res.json({message: "Student updated successfully"})
    }).catch(()=>{
        res.json({message: "An error occured"})
    })
}

const deleteStudent = (req,res,next)=>{
    let id = req.params.id;
    Student.findByIdAndRemove(id)
    .then(()=>{
        res.json({message: "Student removed successfully"})
    }).catch(()=>{
        res.json({message: "An error occured"})
    })
}

module.exports = {
    deleteStudent,show,index,insert,update
}