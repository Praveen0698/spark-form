import React, { useState, useEffect } from "react";
import { Button, Modal, Box, Typography } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import TextField from "@mui/material/TextField";
import InputColor from "react-input-color";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import noDataImg from "../assets/nodata.png";

function AdminPanel() {
  const navigation = useNavigate();

  const { state } = useLocation();

  const [open, setOpen] = useState(false);
  const [openTable, setOpenTable] = useState(false);
  const [color, setColor] = useState("");
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    companyName: "",
    colorPicker: "",
    address: "",
    file: "",
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setError("");
    setFormData({
      userName: "",
      password: "",
      companyName: "",
      colorPicker: "",
      address: "",
      file: "",
    });
  };
  const handleTableOpen = () => setOpenTable(true);
  const handleTableClose = () => setOpenTable(false);

  const handleInputChange = (e) => {
    if (e.target.name === "file") {
      setFormData({
        ...formData,
        [e.target.name]: e.target.files[0],
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  useEffect(() => {
    if (state) {
      const tokenData = jwtDecode(state.accesstoken).userType;
      if (tokenData != "admin") {
        navigation("/admin");
      }
    } else {
      navigation("/admin");
    }
  }, []);

  useEffect(() => {
    if (color !== "") {
      setFormData({
        ...formData,
        colorPicker: color,
      });
      setColor("");
    }
  }, [color]);

  const [error, setError] = useState("");

  const handleSave = async () => {
    try {
      await axios
        .post("http://localhost:3600/create-user", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.data === "failure") {
            setError("** User already exist");
          } else {
            handleClose();
            getUser();
            setFormData({
              userName: "",
              password: "",
              companyName: "",
              colorPicker: "",
              address: "",
            });
          }
        })
        .catch((err) => console.error(err));
    } catch (error) {
      console.error(error);
    }
  };

  const [getUserData, setGetUserData] = useState([]);
  const [getFormData, setGetFormData] = useState([]);

  const getUser = async () => {
    await axios
      .get("http://localhost:3600/get-user")
      .then((result) => setGetUserData(result.data))
      .catch((err) => console.error(err));
  };

  const getForm = async () => {
    await axios
      .get("http://localhost:3600/spark-form")
      .then((result) => setGetFormData(result.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getUser();
    getForm();
  }, []);

  const [currentPage, setcurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = getFormData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(getFormData.length / itemsPerPage);

  const nextPage = () => {
    setcurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setcurrentPage(currentPage - 1);
  };

  return (
    <>
      <header className="panel">
        <h1>Admin Panel</h1>
        <div className="header-button">
          <button id="logout-btn" onClick={handleOpen}>
            Register
          </button>
          <button id="logout-btn" onClick={handleTableOpen}>
            View
          </button>
          <button id="logout-btn" onClick={() => navigation("/admin")}>
            Logout
          </button>
        </div>

        {/* Modal for Register */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Button
              onClick={handleClose}
              style={{ marginTop: "-30px", marginLeft: "94%" }}
            >
              <ClearIcon />
            </Button>
            <Typography id="modal-modal-title" variant="h6" component="h1">
              LOGIN CREDENTIALS
            </Typography>
            <form>
              <TextField
                style={{ margin: "10px 0" }}
                fullWidth
                label="Username"
                id="fullWidth1"
                name="userName"
                value={formData.userName}
                onChange={handleInputChange}
              />
              <TextField
                style={{ margin: "5px 0" }}
                fullWidth
                label="Password"
                id="fullWidth2"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
              <TextField
                style={{ margin: "5px 0" }}
                fullWidth
                label="Company Name"
                id="fullWidth3"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
              />
              <TextField
                style={{ margin: "5px 0" }}
                fullWidth
                label="Address"
                id="fullWidth3"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
              />
              <TextField
                type="file"
                style={{ margin: "5px 0" }}
                name="file"
                onChange={handleInputChange}
              />
              <div className="input-group">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "5px",
                    gap: "10px",
                  }}
                >
                  <Typography variant="h6" component="h6">
                    Choose color
                  </Typography>
                  <div style={{ margin: "5px 0", height: "100px" }}>
                    <InputColor
                      initialValue="#5e72e4"
                      placement="right"
                      value={formData.colorPicker}
                      onChange={(e) => setColor(e.rgba)}
                    />
                  </div>
                </div>
              </div>
              <p
                style={{
                  color: "red",
                  marginTop: "-20px",
                  marginBottom: "2rem",
                }}
              >
                {error}
              </p>
              <Button
                style={{
                  backgroundColor: "green",
                  marginTop: "-25px",
                  borderRadius: "5px",
                  border: "none",
                  fontSize: "12px",
                  fontWeight: "700",
                  color: "white",
                  width: "100%",
                  height: "40px",
                }}
                onClick={handleSave}
              >
                CREATE
              </Button>
            </form>
          </Box>
        </Modal>

        {/* Modal for View */}
        <Modal
          open={openTable}
          onClose={handleTableClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 600,
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Button
              onClick={handleTableClose}
              style={{ marginTop: "-40px", marginLeft: "94%" }}
            >
              <ClearIcon />
            </Button>
            <Typography id="modal-modal-title" variant="h6" component="h1">
              User Details
            </Typography>
            {/* Table content */}

            <div
              id="table-user"
              style={{ height: "250px", overflowY: "scroll" }}
            >
              <Table striped bordered hover style={{ margin: "0" }}>
                <thead>
                  <tr className="table-dark">
                    <th>Sl No</th>
                    <th>Company Name</th>
                    <th>User Name</th>
                  </tr>
                </thead>
                <tbody>
                  {getUserData?.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.companyName}</td>
                      <td>{item.username}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Box>
        </Modal>
      </header>
      <div>
        {getFormData.length > 0 ? (
          <Table striped bordered hover>
            <thead>
              <tr className="table-dark">
                <th>Sl No</th>
                <th>Candidate Name</th>
                <th>Date Of Birth</th>
                <th>State</th>
                <th>Declaration Date</th>
                <th>Declaration Name</th>
              </tr>
            </thead>
            <tbody>
              {currentItems?.map((item, index) => (
                <tr>
                  <td>{index + indexOfFirstItem + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.dob}</td>
                  <td>{item.state}</td>
                  <td>{item.declarationDate}</td>
                  <td>{item.declarationName}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <div
            style={{
              width: "100%",
              textAlign: "center",
              position: "absolute",
              top: "35%",
            }}
          >
            <img src={noDataImg} alt="no-data" />
          </div>
        )}

        <div style={{ position: "absolute", bottom: "2%", left: "10px" }}>
          <div>
            <button onClick={prevPage} disabled={currentPage === 1}>
              Previous
            </button>
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages || totalPages === 0}
            >
              Next
            </button>
          </div>
          <div>
            Page {totalPages === 0 ? 0 : currentPage} of {totalPages}
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminPanel;
