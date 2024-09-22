// index.js
const app = require("./adminModule/adminApp");

const ADMIN_PORT = process.env.ADMIN_PORT || 3600;

app.listen(ADMIN_PORT, () => {
  console.log(`Admin server started on port ${ADMIN_PORT}`);
});
