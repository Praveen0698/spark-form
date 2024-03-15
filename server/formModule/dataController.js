const formModel = require("./schema");

exports.createForm = async (req, res) => {
  try {
    const formData = req.body;
    const photo = req.files.filter((item) => item.fieldname === "photo");
    const signOne = req.files.filter((item) => item.fieldname === "signOne");
    const signTwo = req.files.filter((item) => item.fieldname === "signTwo");
    const addressProof = req.files.filter(
      (item) => item.fieldname === "addressProof"
    );
    const panCardFile = req.files.filter(
      (item) => item.fieldname === "panCardFile"
    );

    const educationFiles = req.files.filter((item) =>
      item.fieldname.startsWith("education")
    );

    const form = new formModel({
      photo: photo ? photo[0].filename : "",
      signOne: signOne ? signOne[0].filename : "",
      signTwo: signTwo ? signTwo[0].filename : "",
      officeEmployeeCode: formData.officeEmployeeCode || "",
      officeDepartment: formData.officeDepartment || "",
      officeOffice: formData.officeOffice || "",
      name: formData.name || "",
      dob: formData.dob || "",
      sex: formData.sex || "",
      fatherName: formData.fatherName || "",
      motherName: formData.motherName || "",
      nationality: formData.nationality || "",
      state: formData.state || "",
      caste: formData.caste || "",
      religion: formData.religion || "",
      casteCategory: formData.casteCategory || "",
      physicallyHandicapped: formData.physicallyHandicapped || "",
      exServicemen: formData.exServicemen || "",
      panNumber: formData.panNumber || "",
      voterId: formData.voterId || "",
      rationCardNo: formData.rationCardNo || "",
      identificationOne: formData.identificationOne || "",
      identificationTwo: formData.identificationTwo || "",
      identificationThree: formData.identificationThree || "",
      height: formData.height || "",
      martialStatus: formData.martialStatus || "",
      spouseName: formData.spouseName || "",
      spouseReligion: formData.spouseReligion || "",
      spouseCaste: formData.spouseCaste || "",
      interReligionCaste: formData.interReligionCaste || "",
      spouseEmployeed: formData.spouseEmployeed || "",
      spouseEmployeedIn: formData.spouseEmployeedIn || "",
      addressProof: addressProof ? addressProof[0].filename : "",
      panCardFile: panCardFile ? panCardFile[0].filename : "",
      presentHouseName: formData.presentHouseName || "",
      presentStreetName: formData.presentStreetName || "",
      presentPlace: formData.presentPlace || "",
      presentPin: formData.presentPin || "",
      presentState: formData.presentState || "",
      presentDistrict: formData.presentDistrict || "",
      presentTaluk: formData.presentTaluk || "",
      presentVillage: formData.presentVillage || "",
      presentPhoneNo: formData.presentPhoneNo || "",
      presentHomeTown: formData.presentHomeTown || "",
      presentEmail: formData.presentEmail || "",
      permanentHouseName: formData.permanentHouseName || "",
      permanentStreetName: formData.permanentStreetName || "",
      permanentPlace: formData.permanentPlace || "",
      permanentPin: formData.permanentPin || "",
      permanentState: formData.permanentState || "",
      permanentDistrict: formData.permanentDistrict || "",
      permanentTaluk: formData.permanentTaluk || "",
      permanentVillage: formData.permanentVillage || "",
      permanentPhoneNo: formData.permanentPhoneNo || "",
      permanentHomeTown: formData.permanentHomeTown || "",
      permanentEmail: formData.permanentEmail || "",
      source: formData.source || "",
      generalRecruitment: formData.generalRecruitment || "",
      method: formData.method || "",
      scaleOfPay: formData.scaleOfPay || "",
      adviceMemo: formData.adviceMemo || "",
      adviceMemoDate: formData.adviceMemoDate || "",
      districtRecruitment: formData.districtRecruitment || "",
      ifDistrictRecruitment: formData.ifDistrictRecruitment || "",
      serialNoAdviceMemo: formData.serialNoAdviceMemo || "",
      entryCategory: formData.entryCategory || "",
      appointmentOrder: formData.appointmentOrder || "",
      appointmentOrderDate: formData.appointmentOrderDate || "",
      education: formData.education.map((edu, index) => ({
        courseTitle: formData.education[index].courseTitle || "",
        subject: formData.education[index].subject || "",
        universityBoard: formData.education[index].universityBoard || "",
        institution: formData.education[index].institution || "",
        cgpaPercentage: formData.education[index].cgpaPercentage || "",
        regNoYear: formData.education[index].regNoYear || "",
        uploadOne: educationFiles ? educationFiles[index].filename : "",
      })),
      accountNumber: formData.accountNumber || "",
      bankName: formData.bankName || "",
      ifscCode: formData.ifscCode || "",
      accountHolder: formData.accountHolder || "",
      declarationStation: formData.declarationStation || "",
      declarationDate: formData.declarationDate || "",
      declarationName: formData.declarationName || "",
      declarationSignature: formData.declarationSignature || "",
    });

    await form.save();

    res.status(201).json({ message: "Form submitted successfully" });
  } catch (error) {
    console.error("Error submitting form:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getForm = async (req, res) => {
  await formModel
    .find({})
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
};
