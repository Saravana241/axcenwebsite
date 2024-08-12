import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CompanyLogo from "./images/axcen_logo.png";
import { FaBars, FaTimes } from "react-icons/fa";
import ITConsult from "./images/itconsult.webp";
import SoftArchiDesign from "./images/softarchidesign.jpg";
import SoftDevTest from "./images/softdevtest1.jpg";
import SoftProductDev from "./images/softproddev1.jpg";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faPhone,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import uploadIcon from "./axcenimages/upload-icon.png";
import trashIcon from "./axcenimages/trash_bin.png";
import linkedin from "./axcenimages/linked.png";
import insta from "./axcenimages/insta.png";

const Home = () => {
  const [activeLink, setActiveLink] = useState("home");
  const [isNavOpen, setIsNavOpen] = useState(false);
  const setShowTechnologyLinks = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleNavToggle = () => {
    setIsNavOpen(!isNavOpen);
  };

  const closeNav = () => {
    setIsNavOpen(false);
    setShowTechnologyLinks(false); // Close the additional links when the navigation is closed
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFourthDiv, setShowFourthDiv] = useState(false);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex < 2 ? prevIndex + 1 : prevIndex));
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setUploadedFiles(files);
    setFormData({ ...formData, resume: files[0] });
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    setUploadedFiles(files);
    setFormData({ ...formData, resume: files[0] });
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const removeFile = (index) => {
    setUploadedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    descriptionbox: "",
    recipientEmail: "",
    resume: null,
  });

  const [errors, setErrors] = useState({});

  /*   const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear the specific error when the field is updated
    if (errors[name]) {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
  }; */

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "resume") {
      setFormData({
        ...formData,
        resume: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }

    if (errors[name]) {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First Name is required";
    if (!formData.lastName) newErrors.lastName = "Last Name is required";
    if (!formData.recipientEmail) {
      newErrors.recipientEmail = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.recipientEmail)) {
      newErrors.recipientEmail = "Email address is invalid";
    }
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Phone Number is required";
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone Number must be exactly 10 digits";
    }
    if (!formData.descriptionbox)
      newErrors.descriptionbox = "Description is required";
    if (!formData.resume) newErrors.resume = "Resume is required";

    return newErrors;
  };

  /*  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({}); // Clear any existing errors
    console.log("formData", formData);

    
    try {
      const response = await fetch(
        "http://localhost:3001/axcentech/axcentable",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        console.error("Failed to save data to the server", response);
        return;
      }

      console.log("Form Data successfully submitted to the server");

      // Reset the form data
      setFormData({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        descriptionbox: "",
        recipientEmail: "", // Optionally reset recipientEmail if needed
      });

      // Navigate to "/thank"
      navigate("/thank");
    } catch (error) {
      console.error("An error occurred while submitting the form:", error);
    }
  }; */

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    console.log("formData", formData);

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const response = await fetch(
        "http://localhost:3001/axcentech/axcentable",
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      if (!response.ok) {
        console.error("Failed to save data to the server", response);
        return;
      }

      console.log("Form Data successfully submitted to the server");

      setFormData({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        descriptionbox: "",
        recipientEmail: "",
        resume: null,
      });

      // Navigate to "/thank"
      navigate("/thank");
    } catch (error) {
      console.error("An error occurred while submitting the form:", error);
    }
  };

  const handleScroll = () => {
    const sections = document.querySelectorAll("section");

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const isVisible =
        rect.top <= window.innerHeight / 2 &&
        rect.bottom >= window.innerHeight / 2;

      if (isVisible) {
        setActiveLink(section.id);
      }
    });
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <div className="axcenweb">
        <div className="quotes">
          <div className="navigationbar">
            <nav className="navbar navbar-expand-lg navbar-light">
              <div className="container">
                <div className="axcen-logo">
                  <img
                    src={CompanyLogo}
                    alt="Axcen Tech Logo"
                    width="100"
                    height="100"
                  />
                  <h3> </h3>
                </div>

                <button
                  className="navbar-toggler"
                  type="button"
                  onClick={handleNavToggle}
                >
                  {isNavOpen ? <FaTimes /> : <FaBars />}
                </button>

                <div
                  className={`collapse navbar-collapse ${
                    isNavOpen ? "show" : ""
                  }`}
                >
                  <ul className="navbar-nav">
                    <li
                      className={`nav-item homenav ${
                        activeLink === "home" ? "active" : ""
                      }`}
                    >
                      <a
                        href="#home"
                        className="nav-link home"
                        onClick={closeNav}
                      >
                        Home
                      </a>
                    </li>

                    <li
                      className={`nav-item ${
                        activeLink === "axcenaboutus" ? "active" : ""
                      }`}
                    >
                      <a
                        href="#axcenaboutus"
                        className="nav-link home"
                        onClick={closeNav}
                      >
                        About Us
                      </a>
                    </li>

                    <li
                      className={`nav-item ${
                        activeLink === "axcenservices" ? "active" : ""
                      }`}
                    >
                      <a
                        href="#axcenservices"
                        className="nav-link"
                        onClick={closeNav}
                      >
                        Services
                      </a>
                    </li>

                    <li
                      className={`nav-item ${
                        activeLink === "axcentechnology" ? "active" : ""
                      }`}
                    >
                      <a
                        href="#axcentechnology"
                        className="nav-link"
                        onClick={closeNav}
                      >
                        Technologies
                      </a>
                    </li>

                    <li
                      className={`nav-item ${
                        activeLink === "axcenindustry" ? "active" : ""
                      }`}
                    >
                      <a
                        href="#axcenindustry"
                        className="nav-link"
                        onClick={closeNav}
                      >
                        Industries
                      </a>
                    </li>

                    <li
                      className={`nav-item contact-us ${
                        activeLink === "axcencontactus" ? "active" : ""
                      }`}
                    >
                      <a
                        href="#axcencontactus"
                        className="nav-link"
                        onClick={closeNav}
                      >
                        Contact Us
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
          <section id="home">
            <div className="quotesimages">
              <div className="axcenquotes">
                <h1>
                  <span>ELEVATING &nbsp; </span>
                  <span>IDEAS,&nbsp; </span>
                  <span>EMPOWERING &nbsp;</span>
                  <span>FUTURES &nbsp;</span>
                </h1>
              </div>
              <div className="redcircle"></div>
              <div className="yellowcircle"></div>
              <div className="greencircle"></div>

              <div className="firstquoteimage"></div>

              <div className="secondquoteimage"></div>
              <div className="thirdquoteimage"></div>
            </div>
          </section>
        </div>
        <section id="axcenaboutus">
          <div className="aboutus">
            <h4> Axcen's Commitment to Excellence</h4>
            <p className="abouttext">
              The world is evolving rapidly with transformative technological
              advancements, dynamic changes in economies, and a shifting global
              landscape. These changes make it challenging for our people,
              clients, partners, and communities to navigate the evolving
              landscape. At Axcen, we constantly push the boundaries of what’s
              possible by leveraging our expertise, experience, and innovative
              ecosystem to empower enterprises, people, and communities to build
              a better Future, Faster. Together. To achieve this, we drive
              business transformation using what we are good at—technology,
              talent, and a robust ecosystem of partners—to eliminate all
              barriers to progress. Our commitment is to a singular goal: to
              relentlessly ensure our clients become their future sustainable
              selves ahead of schedule.
              <br />
              <br /> We want to use technology to build intimacy, warmth, and
              empathy through the experiences we create. Our purpose is to
              unleash new possibilities and impact every human we touch. Our
              net-zero pledge leverages renewable energy, waste management, and
              a focus on the practices of a circular economy to ensure a
              healthier, safer, and more sustainable business. Our vision lets
              us be as ambitious as we want to be. It allows us to think beyond
              what we did until yesterday. Today, we have become the catalyst
              that takes all our stakeholders to the future, faster. Together.
            </p>
          </div>
        </section>
        <section id="axcenservices">
          <div className="services">
            <h4>Services</h4>
            <p>
              Our software consulting services are designed to help you get the
              most out of your software investment. We can assist you with
              everything from needs assessment and software selection to
              implementation and post-implementation support.
            </p>
          </div>
          <div>
            {" "}
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
          </div>

          <div className="software-consultant">
            <img
              src={ITConsult}
              alt="Software Consulting Services"
              width="700"
              height="400"
              className="responsive-image"
            />
          </div>
          <div className="soft-consultant">
            <div className="Consulting-content">
              <p>
                <span>Software Consulting Services</span>
                <br />
                <br />
                Our software consulting services are designed to help you get
                the most out of your software investment. We can assist you with
                everything from needs assessment and software selection to
                implementation and post-implementation support.
              </p>
            </div>
          </div>
          <div className="soft-architech">
            <img
              src={SoftArchiDesign}
              alt="Software Architecture and Design Services"
              width="700"
              height="400"
              className="responsive-image"
            />
          </div>
          <div className="soft-archi">
            <div className="Archi-content">
              <p>
                <span> Software Architecture and Design Services </span>
                <br />
                <br />
                Our software architecture and design services are designed to
                help organizations build a new system or modify their existing
                software systems to stay ahead of the competition. From choosing
                the right tools to providing guidance, we are a one-stop shop
                for all your software needs.
              </p>
            </div>
          </div>
          <div className="soft-develop">
            <img
              src={SoftDevTest}
              alt="Software Development and Testing Services"
              width="700"
              height="400"
              className="responsive-image"
            />
          </div>
          <div className="soft-dev">
            <div className="Develop-content">
              <p>
                <span>Software Development and Testing Services </span>
                <br />
                <br />
                Backed by a pool of experienced software developers and testers,
                InApp can be your trusted partner in your digital transformation
                journey. Whether you need a new application developed from
                scratch or an existing one tested and improved, we have you
                covered.
              </p>
            </div>
          </div>
          <div className="soft-product">
            <img
              src={SoftProductDev}
              alt="Software Product Development Services"
              width="700"
              height="400"
              className="responsive-image"
            />
          </div>
          <div className="soft-prod">
            <div className="Product-content">
              <p>
                <span>Software Product Development Services </span>
                <br />
                <br />
                Take advantage of the product engineering services provided by
                Axcen to turn your ideas into reality. Our full-cycle IT
                services can take you through all stages of product development
                starting from ideation till the launch of your product. All
                these are done at competitive pricing and low turnaround time.
              </p>
            </div>
          </div>
        </section>
        <section id="axcentechnology">
          <div className="technology">
            <h4>Technologies</h4>
            <div className="ibmtechdef">
              <h3> IBM Middleware Technologies</h3>
              <p>
                <dd>
                  <span style={{ color: "black" }}>&#128173;</span>{" "}
                  Installation, configuring, managing and troubleshooting of
                  WebLogic and WebSphere Application Server for testing,
                  pre-production and production environments.
                </dd>
                <dd>
                  &#128173; Administration of IBM HTTP web Servers which
                  involves, Installation & Web instance creation, Security
                  Integration & WebSphere plug-in management across application.
                </dd>
                <dd>
                  &#128173; Enterprise application deployments, upgrades &
                  Rollouts on both Web & Application Servers .
                </dd>
                <dd>
                  &#128173; Establish and manage environments (testing and
                  production) to enable application development teams .
                </dd>
                <dd>
                  &#128173; Complete configuration of application aided
                  activities form deployment, resources and web services
                  integration. Manage shell scripts for Batch Management
                </dd>
                <dd>&#128173; Perform load test and performance tuning .</dd>
                <dd>
                  &#128173; Involve Production to DR switch over and Rollback
                  activity .
                </dd>
                <dd>
                  &#128173; Configure Session replication for failover the JVM .
                </dd>
                <dd>
                  &#128173; Heap Dump analysis for GC related issues, Out Of
                  Memory Errors .
                </dd>
                <dd>
                  &#128173; Manage and Monitoring JVM Performance by Web Sphere
                  Heap size, Garbage Collection and Connection Pools
                </dd>{" "}
              </p>
            </div>
            <div className="fulltechdef">
              <h3>Full Stack</h3>
              <p>
                <dl>React.js</dl>
                <dd>
                  {" "}
                  &#128173; Axcen leverages React.js for building dynamic and
                  interactive user interfaces. React.js is a JavaScript library
                  for building user interfaces, allowing for the creation of
                  reusable UI components. The component-based architecture of
                  React enables modular and efficient development.
                </dd>
                <br />
                <dl> Django</dl>
                <dd>
                  {" "}
                  &#128173; Axcen uses Django as a backend web framework written
                  in Python. Django follows the model-view-controller (MVC)
                  architectural pattern, providing a clean and organized way to
                  build web applications. It comes with built-in features such
                  as an ORM (Object-Relational Mapping) system for database
                  interactions and an admin panel for easy content management.
                </dd>{" "}
                <br />
                <dl>HTML and CSS</dl>
                <dd>
                  {" "}
                  &#128173; HTML (HyperText Markup Language) is used for
                  structuring the content of web pages. CSS (Cascading Style
                  Sheets) is employed for styling and layout, ensuring a
                  visually appealing and consistent presentation of web pages.
                </dd>
                <br />
                <dl>SQL</dl>
                <dd>
                  {" "}
                  &#128173; Axcen utilizes SQL (Structured Query Language) for
                  database management. SQL is a standard language for
                  interacting with relational databases. It enables tasks such
                  as querying data, updating records, and managing database
                  structures.
                </dd>
                <br />
                <dl>Full Stack Development</dl>{" "}
                <dd>
                  {" "}
                  &#128173; Axcen's full-stack development approach involves
                  proficiency in both frontend (React.js, HTML, CSS) and backend
                  (Django, SQL) technologies. Full-stack developers at Axcen are
                  capable of handling end-to-end development tasks, from
                  designing user interfaces to implementing server-side logic
                  and managing databases.
                </dd>{" "}
              </p>
            </div>
            <div className="muletechdef">
              <h3>MuleSoft</h3>
              <p>
                <dd>
                  &#128173; Axcen is a Strategic MuleSoft Partner with over 2+
                  years of diverse experience throughout the integration and
                  consulting space.
                </dd>{" "}
                <dd>
                  &#128173; Learn a little more about us and reach out to
                  discuss how we can help create connected customer experiences
                  for your business.
                </dd>
              </p>
            </div>
            <div className="othertechdef">
              <div className="bpmtech">
                <h3>IBM Technologies</h3>
                <p>&#128173; IBM tolls</p>
              </div>
              <div className="opensource">
                <h3>Open Source Technologies</h3>
                <p>
                  {" "}
                  &#128173; Java development Services <br />
                  &#128173; PHP development Services <br />
                  &#128173; Python development Services
                </p>
              </div>
            </div>
            <div className="techimages">
              <div className="muleimg"></div>
              <div className="ibmimg"></div>
              <div className="fullimg"></div>
            </div>
          </div>
        </section>
        <section id="axcenindustry">
          <div className="industries">
            <h3>Industries</h3>
            <div className="threeind">
              <div className="bankind">
                <div className="bankimgtitle">
                  <p>Banking</p>
                </div>
                <p className="banktext">
                  {" "}
                  Axcen’s strong domain and technology capabilities, focused
                  sub-industry offerings, and a strong partner ecosystem, enable
                  true end-to-end transformation, helping BFSI customers
                  modernize their core, reimagine their go-to-market models,
                  adopt cloud, leverage data and insights, and better engage
                  with their customers through insightful analytics,
                  personalized marketing, and tailored experiences.
                </p>
              </div>
              <div className="healthind">
                <div className="healthimgtitle">
                  <p>Health Care</p>
                </div>
                <p className="healthtext">
                  {" "}
                  Our team of certified software developers, healthcare
                  professionals, and project managers understand the
                  complexities of healthcare IT and the importance of meeting
                  regulatory requirements such as HIPAA. We offer a range of
                  custom software solutions to meet the unique needs of
                  healthcare organizations, including electronic health record
                  (EHR) systems, telemedicine platforms, clinical decision
                  support systems (CDSS), and patient portals.
                </p>
              </div>
              <div className="energyind">
                <div className="energyimgtitle">
                  <p>Energy </p>
                </div>
                <p className="energytext">
                  {" "}
                  Axcen is already powering the digital transformation of energy
                  organizations with technology solutions and services that not
                  only help them achieve their core operations goals of safety,
                  reliability, efficiency, and profitability but also help
                  monitor, track, account, and report carbon footprint and
                  assist in trading carbon credits through holistic emissions
                  management and decarbonization of operations, and expansion
                  into renewables
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="axcencontactus">
          <div className="contact-container contactus">
            <div className="contact-message">
              <h3>Contact Us</h3>
              <p className="contact-text">
                Feel free to contact us with your specific requirements through
                the contact form below. We value your time and will strive to
                get back to you as soon as possible. Our dedicated team is ready
                to collaborate and bring your software ideas to life. Let’s
                create something amazing together! For information regarding job
                opportunities...
              </p>
            </div>
            <div className="address-container">
              <h3>India</h3>
              <span className="locspan">
                <FontAwesomeIcon icon={faMapMarkerAlt} />
                &nbsp; No.10, Second Cross,
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Kumaran Nagar,
                Puthur,
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Thiruchirappalli
                - 620 017
              </span>
              <br />
              <span className="locspan">
                <FontAwesomeIcon icon={faPhone} />
                &nbsp; +91 86752 04168
              </span>
              <br />
              <span className="locspan">
                <FontAwesomeIcon icon={faEnvelope} />
                &nbsp; hr@axcentech.com
              </span>
              {/*  <iframe
            title="Google Map"
            width="400"
            height="300"
            frameBorder="0"
            style={{ border: 0 }}
            src={`https://www.google.com/maps/embed/v1/place?q=No.10,Second+Cross,Kumaran+Nagar,Puthur,Thiruchirappalli-620017,Tamil+Nadu,India&key=axcen-412307`}
            allowFullScreen
          ></iframe> */}
            </div>
            <div className="map">
              {" "}
              <iframe
                title="Google Map"
                width="100%"
                height="400"
                frameBorder="0"
                style={{ border: 0 }}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.7350437474264!2d79.43988801482368!3d10.782411792318016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baba99b07398a63%3A0xf17b2bfbd043784e!2sKumaran%20Nagar%2C%20Puthur%2C%20Tiruchirappalli%2C%20Tamil%20Nadu%20620%20017%2C%20India!5e0!3m2!1sen!2suk!4v1678901126875!5m2!1sen!2suk"
                allowFullScreen
              ></iframe>
            </div>

            <div className="contact-form-container">
              <h2></h2>
              <form className="contact-form" onSubmit={handleSubmit}>
                <label className="getintouch">Get in touch</label>
                <label>
                  First Name
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                  {errors.firstName && (
                    <span className="error">{errors.firstName}</span>
                  )}
                </label>
                <br />

                <label>
                  Last Name
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                  {errors.lastName && (
                    <span className="error">{errors.lastName}</span>
                  )}
                </label>
                <br />

                <label>
                  Email
                  <input
                    type="email"
                    name="recipientEmail"
                    className="emailcont"
                    value={formData.recipientEmail}
                    onChange={handleChange}
                  />
                  {errors.recipientEmail && (
                    <span className="error">{errors.recipientEmail}</span>
                  )}
                </label>
                <br />

                <label>
                  Phone Number
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                  />
                  {errors.phoneNumber && (
                    <span className="error">{errors.phoneNumber}</span>
                  )}
                </label>
                <br />

                <label>
                  How can we help you?
                  <textarea
                    name="descriptionbox"
                    value={formData.descriptionbox}
                    onChange={handleChange}
                  />
                  {errors.descriptionbox && (
                    <span className="error">{errors.descriptionbox}</span>
                  )}
                </label>
                <br />

                <div
                  className="upload-container"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <div style={{ flex: 1 }}>
                    <label>
                      Upload Resume
                      <input
                        type="file"
                        name="resume"
                        onChange={handleFileChange}
                        style={{ display: "none" }}
                      />
                      <div
                        className="drop-area"
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        style={{
                          border: "2px dashed #ccc",
                          padding: "20px",
                          textAlign: "center",
                          margin: "10px 0",
                        }}
                      >
                        <img
                          src={uploadIcon}
                          alt="Upload Icon"
                          style={{ width: "50px", marginBottom: "10px" }}
                        />
                        <p>Drag & Drop your files here or click to browse</p>
                        <button
                          className="browsebtn"
                          type="button"
                          onClick={() =>
                            document.querySelector('input[type="file"]').click()
                          }
                        >
                          Browse
                        </button>
                      </div>
                    </label>
                    {errors.resume && (
                      <span className="error">{errors.resume}</span>
                    )}
                  </div>
                  <div style={{ flex: 1, marginBottom: "20px" }}>
                    <label>
                      Uploaded Files
                      <ul>
                        {uploadedFiles.map((file, index) => (
                          <li key={index} style={{ margin: "5px 0" }}>
                            <div
                              className="uploadedFiles"
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                              }}
                            >
                              <span
                                style={{
                                  color: "medium-blue",
                                  fontWeight: "bold",
                                }}
                              >
                                {file.name}
                              </span>
                              <img
                                className="trashbin"
                                src={trashIcon}
                                alt="Remove"
                                style={{
                                  cursor: "pointer",
                                  marginLeft: "10px",
                                  width: "15px",
                                }}
                                onClick={() => removeFile(index)} // Function to remove the file
                              />
                            </div>
                          </li>
                        ))}
                      </ul>
                    </label>
                  </div>
                </div>

                <br />
                <button className="subbut" type="submit">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </section>

        <div className="careersinaxcen">
          <h3>Careers</h3>

          <h4>Life@Axcen</h4>
          <p>
            {" "}
            In addition to being driven and innovative, the people at Axcen are
            also fun-loving bunch who know how to enjoy themselves. Whether we
            are celebrating a big win or enjoying each other's company, there's
            always a great sense of camaraderie and lightheartedness that
            pervades our workplace culture. Join us at Axcen, and you'll not
            only be part of a dynamic and growth-oriented team, but you'll also
            get to work with some of the most enjoyable and fun-loving people in
            the industry
          </p>
        </div>
        <div className="currentopen">
          <h3>Current Openings</h3>
          <div className="openings">
            <div className="topopening">
              <button
                className="previous"
                onClick={handlePrev}
                disabled={currentIndex === 0}
              >
                &#8249;
              </button>
              <button
                className="up"
                onClick={handlePrev}
                disabled={currentIndex === 0}
              >
                &#x2303;
              </button>
              {[currentIndex, currentIndex + 1, currentIndex + 2].map(
                (index) => (
                  <div key={index}>
                    {index === 0 && (
                      <div className="ui-ux">
                        <h4>UI/UX Designer</h4>
                        <p className="exp">4-8 Years Experience</p>
                        <p className="place">
                          India
                          <a
                            href="#axcencontactus"
                            className="uicontact"
                            onClick={closeNav}
                          >
                            &#x25B8;
                          </a>
                        </p>
                      </div>
                    )}
                    {index === 1 && (
                      <div className="fullstack">
                        <h4>Full Stack Technical Lead</h4>
                        <p className="exp">8-12 Years Experience</p>
                        <p className="place">
                          India
                          <a
                            href="#axcencontactus"
                            className="fullcontact"
                            onClick={closeNav}
                          >
                            &#x25B8;
                          </a>
                        </p>
                      </div>
                    )}
                    {index === 2 && (
                      <div className="jrfullstack">
                        <h4>Jr. Full Stack Web developer</h4>
                        <p className="exp">1-3 Years Experience</p>
                        <p className="place">
                          India
                          <a
                            href="#axcencontactus"
                            className="jrfullcontact"
                            onClick={closeNav}
                          >
                            &#x25B8;
                          </a>
                        </p>
                      </div>
                    )}
                    {index === 3 && (
                      <div
                        className={`endopening ${
                          showFourthDiv ? "showFourthDiv" : ""
                        }`}
                      >
                        <div className="ibmdevelop">
                          <h4>IBM Developer</h4>
                          <p className="exp">5-10 Years Experience</p>
                          <p className="place">
                            India
                            <a
                              href="#axcencontactus"
                              className="ibmcontact"
                              onClick={closeNav}
                            >
                              &#x25B8;
                            </a>
                          </p>
                        </div>
                      </div>
                    )}
                    {index === 4 && (
                      <div
                        className={`endopening ${
                          showFourthDiv ? "showFourthDiv" : ""
                        }`}
                      >
                        <div className="muledevelop">
                          <h4>MuleSoft Developer</h4>
                          <p className="exp">3-7 Years Experience</p>
                          <p className="place">
                            India
                            <a
                              href="#axcencontactus"
                              className="mulecontact"
                              onClick={closeNav}
                            >
                              &#x25B8;
                            </a>
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )
              )}

              <button
                className="next"
                onClick={handleNext}
                disabled={currentIndex === 2}
              >
                &#8250;
              </button>
              <button
                className="down"
                onClick={handleNext}
                disabled={currentIndex === 2}
              >
                &#x2304;
              </button>
            </div>
          </div>
        </div>
        <div className="footerpart">
          <div className="footer-axcen-logo">
            <img
              src={CompanyLogo}
              alt="Axcen Tech Logo"
              width="50"
              height="50"
            />
            <h5> Innovation Lab Private Limited</h5>

            <ul className="footernavbar-nav">
              <li className="footernav-item footerabout">
                <a
                  href="#axcenaboutus"
                  className="footernav-link"
                  onClick={closeNav}
                >
                  About Us
                </a>
              </li>
              <li className="footernav-item footerservice">
                <a
                  href="#axcenservices"
                  className="footernav-link"
                  onClick={closeNav}
                >
                  Services
                </a>
              </li>

              <li className="footernav-item footercontact">
                <a
                  href="#axcencontactus"
                  className="footernav-link"
                  onClick={closeNav}
                >
                  Contact Us
                </a>
              </li>
            </ul>
            <div className="social-icons">
              <div className="linkedin">
                <a
                  //href="https://www.linkedin.com/"
                  href="https://www.linkedin.com/company/100545236/admin/feed/posts/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={linkedin}
                    alt="LinkedIn"
                    //style={{ width: "24px", height: "24px", marginLeft: "10px" }}
                  />
                </a>
              </div>

              <div className="insta">
                <a
                  //href="https://www.instagram.com/"
                  href="https://www.instagram.com/axcentechnologies/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={insta} alt="Instagram" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="copyhr">
        <hr></hr>
        <p className="copyright"> © Copyright 2023, All Rights Reserved </p>
      </div>
    </div>
  );
};

export default Home;
