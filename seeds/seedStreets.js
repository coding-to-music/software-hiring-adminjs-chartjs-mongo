const mongoose = require("mongoose");
const Street = require("../models/street");

const streetDetail = require("./streetDetail");

require("dotenv").config();

const mongoDB = process.env.MONGO_URI;

mongoose
    .connect(mongoDB, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .then(() => console.log("CONNECTED TO MONGODB"))
    .catch((err) => console.log(err));

const clearAll = async function () {
    console.log("clearAll BEGIN");
    await Street.deleteMany();
    console.log("clearAll END");
};

const seedStreet = async function () {
    // const studentList = await Student.find();
    await Street.deleteMany();

    const startNum = 0;

    for (let i = startNum; i <= streetDetail.length - 1; i++) {
        var skip = false;
        // let streets = [];
        var name = streetDetail[i].name;
        var fromStreet = streetDetail[i].fromStreet;
        var to = streetDetail[i].to;
        var width = streetDetail[i].width;
        var streetLength = streetDetail[i].streetLength;
        var streetDate = streetDetail[i].streetDate;
        var noncity = streetDetail[i].noncity;
        var unnacceptedlength = streetDetail[i].unnacceptedlength;

        if (streetLength == "825+/-") {
            streetLength = 825;
            console.log("Setting streetLength", name + " " + streetLength);
        }

        if (streetLength == "650+/-") {
            streetLength = 650;
            console.log("Setting streetLength", name + " " + streetLength);
        }

        if (width == "25-30") {
            width = "27.5";
            console.log("Setting width", name + " " + width);
        }

        if (width == "30-40") {
            width = "35";
            console.log("Setting width", name + " " + width);
        }

        if (width == "30-35") {
            width = "32.5";
            console.log("Setting width", name + " " + width);
        }

        if (width == "30-60") {
            width = "45";
            console.log("Setting width", name + " " + width);
        }

        if (width == "50-60") {
            width = "55";
            console.log("Setting width", name + " " + width);
        }

        if (width == "40-25") {
            width = "30";
            console.log("Setting width", name + " " + width);
        }

        if (width == "40-50") {
            width = "45";
            console.log("Setting width", name + " " + width);
        }

        if (width == "40-24-28") {
            width = "30";
            console.log("Setting width", name + " " + width);
        }
        if (width == "63-125") {
            width = "100";
            console.log("Setting width", name + " " + width);
        }

        if (width == "70-160") {
            width = "100";
            console.log("Setting width", name + " " + width);
        }

        if (width == "95-70") {
            width = "80";
            console.log("Setting width", name + " " + width);
        }

        if (width == "103-63") {
            width = "80";
            console.log("Setting width", name + " " + width);
        }

        if (width == "66-160") {
            width = "100";
            console.log("Setting width", name + " " + width);
        }

        // check if streetLength and width are numbers, if so then calculate the area
        // console.log(/\d/.test(streetLength));
        var area = 0;
        if (/\d/.test(streetLength) && /\d/.test(width)) {
            area = streetLength * width;
            console.log(
                "area ",
                name + " " + streetLength + " X " + width + " = " + area
            );
        }
        // const _id = streetDetail[i]._id;
        // const subjectID = streetDetail[i].subjectID;
        // const name = streetDetail[i].name;
        // const credit = streetDetail[i].credit;
        // for (let j = 0; j <= studentList.length - 1; j++) {
        //     if (studentList[j].streets.includes(_id)) {
        //         console.log("hello");
        //         students.push(studentList[j]._id);
        //     } else {
        //         console.log("hi");
        //     }
        // }

        const street = new Street({
            name,
            fromStreet,
            to,
            width,
            streetLength,
            streetDate,
            noncity,
            unnacceptedlength,
            area,

            // name,
            // subjectID,
            // _id,
            // credit,
            // students,
        });

        if (!skip) {
            await street.save();
            console.log("created newStreet Save ", i + " " + name);
        } else {
            console.log("Skipping ", i + " " + name);
        }
    }
};
seedStreet().then(() => {
    mongoose.connection.close();
});

// clearAll().then(() => {
//     seedCourse();
//     seedStudent();
//     newExam();
//     addAdmin();
//     // seedTeacher();
//     // seedRecord();
//     // mongoose.connection.close();
// });
