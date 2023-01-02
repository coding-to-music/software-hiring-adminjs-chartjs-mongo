// require libraries
const express = require("express");
const mongoose = require("mongoose");
const AdminJS = require("adminjs");
const AdminJSExpress = require("@adminjs/express");
const AdminJSMongoose = require("@adminjs/mongoose");
AdminJS.registerAdapter(AdminJSMongoose);

// app config
const config = require("./config");

// config adminJS
const { PositionResourceOptions } = require("./position/position.options");
const { CandidateResourceOptions } = require("./candidate/candidate.options");
const { InterviewResourceOptions } = require("./interview/interview.options");
const { EmailResourceOptions } = require("./email/email.options");
const { StreetResourceOptions } = require("./street/street.options");

const adminJS = new AdminJS({
  databases: [],
  rootPath: "/admin",
  resources: [
    PositionResourceOptions,
    EmailResourceOptions,
    CandidateResourceOptions,
    InterviewResourceOptions,
    StreetResourceOptions,
  ],
  branding: {
    companyName: "Hiring Management App", // title of page
    logo: false, // don't use adminJS default logo
    softwareBrothers: false, // hide adminJS link
    // favicon: ""
  },
  version: {
    app: "Version 1.0.0",
  },
  assets: {
    styles: ["/public/static/react-funnel-pipeline.css"], // custom css files
  },
  dashboard: {
    handler: async (request, response, context) => {
      return { success: true, errorSet: [] }; // dashboard cannot receive props...
    },
    component: AdminJS.bundle("./public/pages/dashboard.jsx"),
  },
  sandbox: {
    handler: async (request, response, context) => {
      return { success: true, errorSet: [] }; // dashboard cannot receive props...
    },
    component: AdminJS.bundle("./public/pages/sandbox.jsx"),
  },
});
adminJS.watch();
const adminJSRouter = AdminJSExpress.buildRouter(adminJS);

// mongoose.connect(`${config.connectionString}/${config.dbname}`, {
// useFindAndModify: false,
// strictQuery: false,

// mount adminJS route and run express app
const app = express();
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(adminJS.options.rootPath, adminJSRouter);

// custom route
const emailRoute = require("./email/email.route");
const statsRoute = require("./stats/stats.route");
const streetStatsRoute = require("./streetStats/streetStats.route");
app.use(express.json()); // after mounting adminJS route to avoid conflict
app.use("/emails", emailRoute);
app.use("/stats", statsRoute);
app.use("/foo", statsRoute);
app.use("/bar", streetStatsRoute);
app.use("/streetstats", streetStatsRoute);
app.use("/public", express.static("public"));
app.use("/", adminJSRouter);

// error handler
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "INTERNAL_ERROR" });
});

app.listen(8080, () =>
  console.log("AdminJS is under http://localhost:8080/admin")
);
