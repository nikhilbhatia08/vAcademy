const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validator = require("validator")
const {LoginModel} = require("../model/StudentModel")

const MakeToken = (user) => {
    const key = process.env.JWT_Key;
    return jwt.sign({
        name : user.name,
        email : user.email
    } , key)
}

const Register = async(req , res) => {
    try{
        const {name , email , password} = req.body;
        let student = await LoginModel.findOne({email})

        if(student !== null){
            return res.status(400).json("User already Exists");
        }

        if(!name  || !email || !password){
            return res.status(400).json("Fields cannot be empty");
        }

        const duplicate = email;
        let splits = duplicate.split("@");

        if(!(splits[1] == "cmrcet" && (splits[2] === "stu.ac.in" || splits[2] === "org.ac.in" || splits[2] === "fac.ac.in") )){
            return res.status(400).json("Invalid Email");
        }
        const designation = splits[2].split(".")[0];

        if(!validator.isStrongPassword(password)){
            return res.status(400).json("Enter a strong password")
        }

        student = new LoginModel({
            name,
            email,
            des : designation,
            password
        })

        const salt = await bcrypt.genSalt(10);
        console.log(student)
        student.password = await bcrypt.hash(student.password , salt)
        student.save()
        .then(()=>{
            getToken = MakeToken(student);
            console.log(student)
            return res.status(200).json({
                name : student.name,
                email : student.email,
                Token : getToken
            })
        })
    }
    catch(err){
        console.log(err)
    }
}

const Login  = async(req , res) => {
    try{
        const {email , password} = req.body;
        const student = await LoginModel.findOne({email});

        const duplicate = email;
        let splits = duplicate.split("@");

        if(!(splits[1] == "cmrcet" && (splits[2] === "stu.ac.in" || splits[2] === "org.ac.in" || splits[2] === "stu.ac.in") )){
            return res.status(400).json("Invalid Email");
        }

        if(!student){
            return res.status(400).json("User not found");
        }

        const PassMatch = await bcrypt.compare(password , student.password)

        if(!PassMatch){
            return res.status(400).json("incorrect password");
        }
        const Token = MakeToken(student)
        console.log(student)
        return res.status(200).json({
            name : student.name,
            email : student.email,
            Token : Token
        })
    }
    catch(err){
        console.log(err)
    }
}

module.exports = {Register , Login}
