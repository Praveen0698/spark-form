import React from "react";

const Footer = ({ formData, setFormData }) => {
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <section className="contact office">
      <h3>
        PART-G: <span>Declaration</span>
      </h3>

      <h2 className="declaration">Declaration by the prospective employee</h2>
      <diV>
        <p>
          The information furnished by me in this joining report is correct to
          the best of my knowledge and are based on valid documents. I also
          hereby produce the original documents in respect of all the
          information given below before the reporting officer for verification.
          I am also aware of the fact that penal action would be taken against
          me if any of the information provided by me is found fraudulent.
        </p>
      </diV>
      <div className="station-sign">
        <table>
          <tbody>
            <tr>
              <td>Station</td>
              <td>
                <input
                  type="text"
                  name="declarationStation"
                  value={formData.declarationStation}
                  onChange={(e) => handleInputChange(e)}
                />
              </td>
              <td>Date</td>
              <td>
                <input
                  type="text"
                  name="declarationDate"
                  value={formData.declarationDate}
                  onChange={(e) => handleInputChange(e)}
                />
              </td>
            </tr>
            <tr>
              <td>Name</td>
              <td>
                <input
                  type="text"
                  name="declarationName"
                  value={formData.declarationName}
                  onChange={(e) => handleInputChange(e)}
                />
              </td>
              <td>Signature</td>
              <td>
                <input
                  type="text"
                  name="declarationSignature"
                  value={formData.declarationSignature}
                  onChange={(e) => handleInputChange(e)}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <h3>
        PART-H: <span>Verification (For office use)</span>
      </h3>
      <div>
        <p className="verify-p">
          Verified the original documents and found eligible for admission to
          duty.
        </p>
      </div>
      <div className="name">
        <p>
          Name & dated signature of the <br /> Reporting Officer
        </p>
      </div>
      <div className="declaration">
        <p className="verify-p">
          Admitted to duty. Employee details may be furnished into SPARK and PEN
          obtained.
        </p>
      </div>
      <div className="name">
        <p>
          Name and dated signature of the <br /> Appointing Authority
        </p>
      </div>
    </section>
  );
};

export default Footer;
