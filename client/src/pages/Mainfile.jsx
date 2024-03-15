import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Signature from "../components/Signature";
import Office from "../components/Office";
import Personal from "../components/Personal";
import Contact from "../components/Contact";
import Recruitment from "../components/Recruitment";
import Education from "../components/Education";
import Account from "../components/Account";
import Footer from "../components/Footer";
import axios from "axios";
import { Button, Modal, Box, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Mainfile = () => {
  const navigation = useNavigate();
  const [formData, setFormData] = useState({
    photo: "",
    signOne: "",
    signTwo: "",

    officeEmployeeCode: "",
    officeDepartment: "",
    officeOffice: "",

    name: "",
    dob: "",
    sex: "",
    fatherName: "",
    motherName: "",
    nationality: "",
    state: "",
    caste: "",
    religion: "",
    casteCategory: "",
    physicallyHandicapped: "",
    exServicemen: "",
    panNumber: "",
    voterId: "",
    rationCardNo: "",
    identificationOne: "",
    identificationTwo: "",
    identificationThree: "",
    height: "",
    martialStatus: "",
    spouseName: "",
    spouseReligion: "",
    spouseCaste: "",
    interReligionCaste: "",
    spouseEmployeed: "",
    spouseEmployeedIn: "",
    addressProof: "",
    panCardFile: "",

    presentHouseName: "",
    presentStreetName: "",
    presentPlace: "",
    presentPin: "",
    presentState: "",
    presentDistrict: "",
    presentTaluk: "",
    presentVillage: "",
    presentPhoneNo: "",
    presentHomeTown: "",
    presentEmail: "",

    permanentHouseName: "",
    permanentStreetName: "",
    permanentPlace: "",
    permanentPin: "",
    permanentState: "",
    permanentDistrict: "",
    permanentTaluk: "",
    permanentVillage: "",
    permanentPhoneNo: "",
    permanentHomeTown: "",
    permanentEmail: "",

    source: "",
    generalRecruitment: "",
    method: "",
    scaleOfPay: "",
    adviceMemo: "",
    adviceMemoDate: "",
    districtRecruitment: "",
    ifDistrictRecruitment: "",
    serialNoAdviceMemo: "",
    entryCategory: "",
    appointmentOrder: "",
    appointmentOrderDate: "",

    education: [
      {
        courseTitle: "",
        subject: "",
        universityBoard: "",
        institution: "",
        cgpaPercentage: "",
        regNoYear: "",
        uploadOne: "",
      },
    ],
    accountNumber: "",
    bankName: "",
    ifscCode: "",
    accountHolder: "",

    declarationStation: "",
    declarationDate: "",
    declarationName: "",
    declarationSignature: "",
  });
  const [bgColor, setBgColor] = useState("");
  const [text, setText] = useState("");
  const [address, setAddress] = useState("");
  const [file, setFile] = useState("");
  const { state } = useLocation();

  useEffect(() => {
    if (state) {
      const tokenData = jwtDecode(state.accesstoken);
      setBgColor(tokenData.colorPicker);
      setText(tokenData.companyName);
      setAddress(tokenData.address);
      setFile(tokenData.file);
    } else {
      navigation("/");
    }
  }, []);

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);

    window.location.reload();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const handleSave = async () => {
    await axios
      .post("http://localhost:3600/spark-form", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => handleOpen())
      .catch((err) => console.error(err));
  };

  return (
    <>
      <div className="fullpage">
        <div className="headerrr">
          <div className="headerr" style={{ backgroundColor: `${bgColor}` }}>
            <div>
              <img
                src={`http://localhost:3800/Images/${file}`}
                alt=""
                className="logo-img"
              />
            </div>
            <h1>{text}</h1>
          </div>
        </div>
        <div className="App">
          <form onSubmit={handleSubmit}>
            <Header />
            <Signature formData={formData} setFormData={setFormData} />
            <Office formData={formData} setFormData={setFormData} />
            <Personal formData={formData} setFormData={setFormData} />
            <Contact formData={formData} setFormData={setFormData} />
            <Recruitment formData={formData} setFormData={setFormData} />
            <Education formData={formData} setFormData={setFormData} />
            <Account formData={formData} setFormData={setFormData} />
            <Footer formData={formData} setFormData={setFormData} />
          </form>

          <div className="buttons-cont">
            <button className="submit-btn" onClick={handleSave}>
              Submit
            </button>
          </div>
        </div>
        <div className="footer" style={{ backgroundColor: `${bgColor}` }}>
          <div className="full-col"></div>
          <div
            className="full-color"
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            {" "}
            <p
              style={{ fontSize: "0.8rem", color: "white", marginBottom: "0" }}
            >
              {" "}
              {address}
            </p>
          </div>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box display="flex" justifyContent="space-between">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Form Submitted Successfully
            </Typography>
          </Box>
          <Button
            style={{
              color: "white",
              backgroundColor: "green",
              width: "5%",
              marginTop: "10px",
            }}
            onClick={handleClose}
          >
            OK
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default Mainfile;
