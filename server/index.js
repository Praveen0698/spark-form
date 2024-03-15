// index.js
const app = require("./adminModule/adminApp");
const formApp = require("./formModule/formApp");
const createApp = require("./createModule/createApp");

const ADMIN_PORT = process.env.ADMIN_PORT || 3600;
const FORM_PORT = process.env.FORM_PORT || 3700;
const USER_PORT = process.env.USER_PORT || 3800;

app.listen(ADMIN_PORT, () => {
  console.log(`Admin server started on port ${ADMIN_PORT}`);
});

// formApp.listen(FORM_PORT, () => {
//   console.log(`Form server started on port ${FORM_PORT}`);
// });

// createApp.listen(USER_PORT, () => {
//   console.log(`User server started on port ${USER_PORT}`);
// });
