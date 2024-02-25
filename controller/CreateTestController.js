const {Test} = require("../model/TestModel")
const {Test_Result} = require("../model/TestResults")

//To Create new Test
const Create_Test = async(req , res) => {
    try{
        const data = req.body;
        d = new Date();
        utc = d.getTime() + (d.getTimezoneOffset() * 60000);
        nd = new Date(utc + (3600000*+5.5));
        var ist =  nd.toLocaleString();
        ist = ist.split(',')[0]
        const new_test = new Test({
            Test_name : data.Test_name,
            Test_date : ist,
            Test_Timings : data.Test_Timings,
            conducted : false,
            Questions : data.Questions
        })

        await new_test.save()
        .then(async(response) => {
            console.log(response);
            const new_resultTest = new Test_Result({
                Test_id : response._id,
                Test_Name : response.Test_name,
                Test_Scores : []
            })
            await new_resultTest.save()
            return res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            return res.status(400).json("Unable to create a new test")
        }) 
    }
    catch(err){
        console.log(err);
        return res.status(400).json("Unable to create a new test")
    }
}

//Fetch all the Tests details only not conducted to frontend
const Get_All_Tests = async(req , res) => {
    try{
        const tests = await Test.find({
            conducted : false
        });
        return res.status(200).json(tests);
    }
    catch(err){
        console.log(err);
        return res.status(400).json("Unable to fetch all tests")
    }
}

//fetch clicked tests only those which are not expired
const Selected_Test = async(req , res) => {
    try{
        const {id} = req.params;
        await Test.findByIdAndUpdate(
            id,
            {
                $set : {
                    conducted : true
                }
            },{
                new : true
            }
        )
        .then((res) => {
            console.log(test_info);
            return res.status(200).json(test_info);
        })
        .catch(err => {
            console.log(err);
            return res.status(400).json("Unable to fetch required test")
        })
    }
    catch(err){
        console.log(err);
        return res.status(400).json("Unable to fetch required test")
    }
}

//collect results from frontend
const send_results = async(req , res) => {
    try{
        const {id} = req.params;
        const data = req.body;
        const new_Score = {
            student_id : data.id,
            student_name : data.name,
            student_score : data.score
        }
        await Test_Result.findOneAndUpdate(
            {
                Test_id : id
            },
            {
                $push : {
                    Test_Scores : new_Score
                },
                $sort: {
                    Test_Scores : -1
                }
            },
            {
                new : true
            }
        )
        .then((res) => {
            console.log(res)
            return res.status(200).json(res);
        })
        .catch(err => {
            console.log(err);
            return res.status(400).json("Unable to add results to database")
        })
    }
    catch(err){
        console.log(err);
        return res.status(400).json("Unable to add results")
    }
}


//sending LeaderBoard for selected test

const LeaderBoard = async(req , res) => {
    try{
        const {ldrBrd} = req.params;
        await Test_Result.find({
            Test_id : ldrBrd
        })
        .then((res) => {
            console.log(res);
            return res.status(200).json(res);
        })
        .catch(err => {
            console.log(err);
           return res.status(400).json("Unable fetch leader board")
        })
    }
    catch(err){
        console.log(err);
        return res.status(400).json("Unable fetch leader board")
    }
}

//Fetch all the Tests which are completed

const completedTests = async(req , res) => {
    try{
        const tests = await Test.find({
            conducted : true
        });
        return res.status(200).json(tests);
    }
    catch(err){
        console.log(err);
        return res.status(400).json("Unable to fetch all tests")
    }
}


module.exports = {
    Create_Test,
    Get_All_Tests,
    Selected_Test,
    send_results,
    LeaderBoard,
    completedTests
}