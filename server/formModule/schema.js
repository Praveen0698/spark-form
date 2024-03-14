require("dotenv").config();
const mongoose = require("mongoose");

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("form db connected");
  })
  .catch((err) => {
    console.log(err);
  });

const educationSchema = new mongoose.Schema({
  courseTitle: String,
  subject: String,
  universityBoard: String,
  institution: String,
  cgpaPercentage: String,
  regNoYear: String,
  uploadOne: String,
});

const formSchema = new mongoose.Schema({
  photo: String,
  signOne: String,
  signTwo: String,

  officeEmployeeCode: String,
  officeDepartment: String,
  officeOffice: String,

  name: String,
  dob: String,
  sex: String,
  fatherName: String,
  motherName: String,
  nationality: String,
  state: String,
  caste: String,
  religion: String,
  casteCategory: String,
  physicallyHandicapped: String,
  exServicemen: String,
  panNumber: String,
  voterId: String,
  rationCardNo: String,
  identificationOne: String,
  identificationTwo: String,
  identificationThree: String,
  height: String,
  martialStatus: String,
  spouseName: String,
  spouseReligion: String,
  spouseCaste: String,
  interReligionCaste: String,
  spouseEmployeed: String,
  spouseEmployeedIn: String,
  addressProof: String,
  panCardFile: String,

  presentHouseName: String,
  presentStreetName: String,
  presentPlace: String,
  presentPin: String,
  presentState: String,
  presentDistrict: String,
  presentTaluk: String,
  presentVillage: String,
  presentPhoneNo: String,
  presentHomeTown: String,
  presentEmail: String,

  permanentHouseName: String,
  permanentStreetName: String,
  permanentPlace: String,
  permanentPin: String,
  permanentState: String,
  permanentDistrict: String,
  permanentTaluk: String,
  permanentVillage: String,
  permanentPhoneNo: String,
  permanentHomeTown: String,
  permanentEmail: String,

  source: String,
  generalRecruitment: String,
  method: String,
  scaleOfPay: String,
  adviceMemo: String,
  adviceMemoDate: String,
  districtRecruitment: String,
  ifDistrictRecruitment: String,
  serialNoAdviceMemo: String,
  entryCategory: String,
  appointmentOrder: String,
  appointmentOrderDate: String,

  education: [educationSchema],
  accountNumber: String,
  bankName: String,
  ifscCode: String,
  accountHolder: String,

  declarationStation: String,
  declarationDate: String,
  declarationName: String,
  declarationSignature: String,
});

const formModel = mongoose.model("form", formSchema);

module.exports = formModel;
