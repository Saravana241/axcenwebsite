import React, { useState, useEffect } from "react";
import CompanyLogo from "./images/axcen_logo.png";
import { FaBars, FaTimes } from "react-icons/fa";
import ITConsult from "./images/itconsult.webp";
import SoftArchiDesign from "./images/softarchidesign.jpg";
import SoftDevTest from "./images/softdevtest1.jpg";
import SoftProductDev from "./images/softproddev1.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faPhone,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import linkedin from "./axcenimages/linked.png";
import insta from "./axcenimages/insta.png";

// Import hero section images
import firstQuoteImage from "./images/firstquoteimage.avif";
import secondImage from "./axcenimages/img 2.png";
import thirdImage from "./axcenimages/img 1.png";
import redEllipse from "./axcenimages/red ellipse.png";
import yellowEllipse from "./axcenimages/yellow ellipse.png";
import greenEllipse from "./axcenimages/green ellipse.png";
import bgImage from "./axcenimages/bg image.png";

// Import technology images
import muleSoftImg from "./axcenimages/mule soft.png";
import aiLogoImg from "./axcenimages/ai_logo.jpg";
import ibmImg from "./axcenimages/ibm.png";
import fullstackImg from "./axcenimages/fullstack.webp";

const Home = () => {
  const [activeLink, setActiveLink] = useState("home");
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleNavToggle = () => {
    setIsNavOpen(!isNavOpen);
  };

  const closeNav = () => {
    setIsNavOpen(false);
  };

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex < 2 ? prevIndex + 1 : prevIndex));
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
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

  const jobOpenings = [
    { title: "UI/UX Designer", experience: "4-8 Years Experience", location: "India" },
    { title: "Full Stack Technical Lead", experience: "8-12 Years Experience", location: "India" },
    { title: "Jr. Full Stack Web developer", experience: "1-3 Years Experience", location: "India" },
    { title: "IBM Developer", experience: "5-10 Years Experience", location: "India" },
    { title: "MuleSoft Developer", experience: "3-7 Years Experience", location: "India" },
  ];

  return (
    <div className="overflow-x-hidden">
{/* Navigation Bar */}
<nav className="fixed top-0 left-0 right-0 z-50 bg-gray-50/95 backdrop-blur-sm shadow-sm">
  <div className="container mx-auto px-4 lg:px-6 xl:px-8">
    <div className="flex items-center justify-between h-16 lg:h-20">
      {/* Logo */}
      <div className="flex items-center space-x-2 lg:space-x-3">
        <img
          src={CompanyLogo}
          alt="Axcen Tech Logo"
          className="h-10 w-10 lg:h-16 lg:w-16"
        />
        <div className="hidden sm:block">
          <h3 className="text-xs sm:text-sm lg:text-base font-bold leading-tight whitespace-nowrap">
            Innovation Lab Private Limited
          </h3>
        </div>
      </div>

      {/* Desktop Navigation */}
      <ul className="hidden lg:flex items-center space-x-4 xl:space-x-6">
        {[
          { name: "Home", id: "home" },
          { name: "About Us", id: "axcenaboutus" },
          { name: "Services", id: "axcenservices" },
          { name: "Technologies", id: "axcentechnology" },
          { name: "Industries", id: "axcenindustry" },
          { name: "Contact Us", id: "axcencontactus" },
          { name: "Careers", id: "careers" },
        ].map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`text-xs xl:text-sm font-medium transition-colors hover:text-red-600 no-underline whitespace-nowrap ${
                activeLink === item.id
                  ? "text-white bg-red-600 px-3 py-1.5 rounded"
                  : "text-gray-800"
              }`}
              onClick={closeNav}
            >
              {item.name}
            </a>
          </li>
        ))}
      </ul>

      {/* Mobile Menu Button */}
      <button
        className="lg:hidden text-2xl text-gray-800 p-2"
        onClick={handleNavToggle}
        aria-label="Toggle menu"
      >
        {isNavOpen ? <FaTimes /> : <FaBars />}
      </button>
    </div>

    {/* Mobile Navigation */}
    {isNavOpen && (
      <div className="lg:hidden bg-gray-50 pb-4">
        <ul className="space-y-2">
          {[
            { name: "Home", id: "home" },
            { name: "About Us", id: "axcenaboutus" },
            { name: "Services", id: "axcenservices" },
            { name: "Technologies", id: "axcentechnology" },
            { name: "Industries", id: "axcenindustry" },
            { name: "Contact Us", id: "axcencontactus" },
            { name: "Careers", id: "careers" },
          ].map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`block px-4 py-3 text-base font-medium transition-colors no-underline whitespace-nowrap ${
                  activeLink === item.id
                    ? "text-white bg-red-600"
                    : "text-gray-800 hover:bg-gray-100"
                }`}
                onClick={closeNav}
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
</nav>

{/* Hero Section */}
<section id="home" className="relative min-h-screen overflow-hidden bg-cover bg-center pt-20 lg:pt-24" >
  <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-32">
    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
      {/* Left Content */}
      <div className="text-center lg:text-left z-10 relative">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
          <span className="block animate-fade-in-up">ELEVATING</span>
          <span className="block animate-fade-in-up animation-delay-200">IDEAS,</span>
          <span className="block animate-fade-in-up animation-delay-400">EMPOWERING</span>
          <span className="block animate-fade-in-up animation-delay-600">FUTURES</span>
        </h1>
      </div>

      {/* Right Images with Overlapping Layout */}
      <div className="relative h-[400px] sm:h-[500px] lg:h-[700px] z-10">
        {/* Main Large Image */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 sm:top-50 sm:left-1/2 sm:-translate-x-1/2 lg:top-10 lg:left-[-80px] lg:translate-x-0 lg:translate-y-0 w-[280px] sm:w-[350px] lg:w-[500px] xl:w-[600px] animate-fade-in">
          <img
            src={firstQuoteImage}
            alt="Team collaboration"
            className="w-full rounded-[30px] lg:rounded-[50px] shadow-2xl"
          />
        </div>
        
        {/* Top Right Small Image */}
        <div className="absolute top-20 right-4 w-[150px] sm:top-0 sm:right-0 md:top-[100px] md:right-[150px] lg:top-10 lg:right-[0px] w-[120px] sm:w-[150px] md:w-[180px] lg:w-[280px] xl:w-[350px] animate-fade-in animation-delay-1000 z-20">
          <img
            src={secondImage}
            alt="Innovation"
            className="w-full rounded-2xl lg:rounded-3xl shadow-xl"
          />
        </div>
        
        {/* Bottom Left Medium Image */}
        <div className="absolute bottom-4 left-10 w-[200px] sm:bottom-0 sm:left-0 md:bottom-6 md:left-[120px] lg:bottom-[100px] lg:left-[-90px] sm:w-[200px] md:w-[240px] lg:w-[350px] xl:w-[450px] animate-fade-in animation-delay-2000 z-20">
          <img
            src={thirdImage}
            alt="Technology"
            className="w-full rounded-2xl lg:rounded-3xl shadow-xl"
          />
        </div>
      </div>
    </div>
  </div>

  {/* Animated Circular Backgrounds */}
  <div className="absolute top-[380px] left-[10%] sm:top-[150px] sm:left-[20%] md:top-[400px] md:left-[20%] lg:top-[150px] lg:left-[30%] w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] md:w-[120px] md:h-[120px] lg:w-[300px] lg:h-[300px] rounded-full opacity-80 animate-rotate-360 pointer-events-none">
    <img src={redEllipse} alt="" className="w-full h-full" />
  </div>
  
  <div className="absolute top-[350px] right-[5%] sm:top-[100px] sm:right-[10%] md:top-[350px] md:right-[15%] lg:top-[150px] lg:right-[0%] w-[90px] h-[90px] sm:w-[120px] sm:h-[120px] md:w-[150px] md:h-[150px] lg:w-[300px] lg:h-[300px] rounded-full opacity-80 animate-rotate-360 animation-delay-400 pointer-events-none">
    <img src={yellowEllipse} alt="" className="w-full h-full" />
  </div>
  
  <div className="absolute top-[550px] right-[5%] sm:bottom-[50px] sm:right-[5%] md:top-[600px] md:right-[15%] lg:bottom-[50px] lg:right-[0%] w-[100px] h-[100px] sm:w-[150px] sm:h-[150px] md:w-[180px] md:h-[180px] lg:w-[300px] lg:h-[300px] rounded-full opacity-80 animate-rotate-360 animation-delay-800 pointer-events-none">
    <img src={greenEllipse} alt="" className="w-full h-full" />
  </div>
</section>

      {/* About Us Section */}
      <section id="axcenaboutus" className="py-16 lg:py-24 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <h2 className="text-sm lg:text-4xl sm:text-4xl font-bold text-center mb-8 lg:mb-12">
            Axcen's Commitment to Excellence
          </h2>
        <div className="container mx-auto px-4 lg:px-8">
          
          <div className="max-w-5xl mx-auto text-base lg:text-lg leading-relaxed space-y-4">
            <p>
              The world is evolving rapidly with transformative technological
              advancements, dynamic changes in economies, and a shifting global
              landscape. These changes make it challenging for our people,
              clients, partners, and communities to navigate the evolving
              landscape. At Axcen, we constantly push the boundaries of what's
              possible by leveraging our expertise, experience, and innovative
              ecosystem to empower enterprises, people, and communities to build
              a better Future, Faster. Together. To achieve this, we drive
              business transformation using what we are good at—technology,
              talent, and a robust ecosystem of partners—to eliminate all
              barriers to progress. Our commitment is to a singular goal: to
              relentlessly ensure our clients become their future sustainable
              selves ahead of schedule.
            </p>
            <p>
              We want to use technology to build intimacy, warmth, and
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
        </div>
      </section>

      {/* Services Section - Simple Alternating Layout */}
      <section id="axcenservices" className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-6 lg:mb-8">Services</h2>
          <p className="text-center text-base lg:text-lg max-w-3xl mx-auto mb-16 lg:mb-24 text-gray-700">
            Our software consulting services are designed to help you get the
            most out of your software investment. We can assist you with
            everything from needs assessment and software selection to
            implementation and post-implementation support.
          </p>

          <div className="space-y-16 lg:space-y-32">
            {/* Service 1 */}
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="order-2 lg:order-1">
                <img
                  src={ITConsult}
                  alt="Software Consulting Services"
                  className="w-full rounded-2xl shadow-lg"
                />
              </div>
              <div className="order-1 lg:order-2">
                <h3 className="text-2xl lg:text-3xl font-bold text-blue-900 mb-4">
                  Software Consulting Services
                </h3>
                <p className="text-base lg:text-lg text-gray-700 leading-relaxed">
                  Our software consulting services are designed to help you get
                  the most out of your software investment. We can assist you with
                  everything from needs assessment and software selection to
                  implementation and post-implementation support.
                </p>
              </div>
            </div>

            {/* Service 2 */}
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="order-1">
                <h3 className="text-2xl lg:text-3xl font-bold text-blue-900 mb-4">
                  Software Architecture and Design Services
                </h3>
                <p className="text-base lg:text-lg text-gray-700 leading-relaxed">
                  Our software architecture and design services are designed to
                  help organizations build a new system or modify their existing
                  software systems to stay ahead of the competition. From choosing
                  the right tools to providing guidance, we are a one-stop shop
                  for all your software needs.
                </p>
              </div>
              <div className="order-2">
                <img
                  src={SoftArchiDesign}
                  alt="Software Architecture and Design Services"
                  className="w-full rounded-2xl shadow-lg"
                />
              </div>
            </div>

            {/* Service 3 */}
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="order-2 lg:order-1">
                <img
                  src={SoftDevTest}
                  alt="Software Development and Testing Services"
                  className="w-full rounded-2xl shadow-lg"
                />
              </div>
              <div className="order-1 lg:order-2">
                <h3 className="text-2xl lg:text-3xl font-bold text-blue-900 mb-4">
                  Software Development and Testing Services
                </h3>
                <p className="text-base lg:text-lg text-gray-700 leading-relaxed">
                  Backed by a pool of experienced software developers and testers,
                  Axcen can be your trusted partner in your digital transformation
                  journey. Whether you need a new application developed from
                  scratch or an existing one tested and improved, we have you
                  covered.
                </p>
              </div>
            </div>

            {/* Service 4 */}
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="order-1">
                <h3 className="text-2xl lg:text-3xl font-bold text-blue-900 mb-4">
                  Software Product Development Services
                </h3>
                <p className="text-base lg:text-lg text-gray-700 leading-relaxed">
                  Take advantage of the product engineering services provided by
                  Axcen to turn your ideas into reality. Our full-cycle IT
                  services can take you through all stages of product development
                  starting from ideation till the launch of your product. All
                  these are done at competitive pricing and low turnaround time.
                </p>
              </div>
              <div className="order-2">
                <img
                  src={SoftProductDev}
                  alt="Software Product Development Services"
                  className="w-full rounded-2xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

{/* Technologies Section */}
<section id="axcentechnology" className="py-16 lg:py-24 bg-black text-white">
  <div className="container mx-auto px-4 lg:px-8">
    <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12 lg:mb-16">Technologies</h2>

    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
      {/* Left Column */}
      <div className="space-y-8 lg:space-y-12">
        {/* AI and ML - Left Column */}
        <div className="space-y-4">
          <h3 className="text-2xl lg:text-3xl font-bold mb-6">AI and ML</h3>
          <div className="space-y-3 text-sm lg:text-base">
            <p>&#128173; We leverage cloud computing platforms to scale and deploy AI and ML models with high efficiency and security.</p>
            <p>&#128173; Our expertise in big data allows us to process vast amounts of information, turning raw data into actionable insights.</p>
            <p>&#128173; With our deep learning frameworks, we create sophisticated neural networks that can recognize patterns, make predictions, and evolve with your business.</p>
            <p>&#128173; We integrate AI solutions seamlessly into your existing systems, ensuring smooth operations and maximizing ROI.</p>
            <p>&#128173; Our data visualization tools turn complex datasets into intuitive, easy-to-understand graphics, empowering you to make informed decisions.</p>
            <p>&#128173; We offer end-to-end AI development, from initial concept and prototyping to deployment and ongoing support.</p>
            <p>&#128173; Our AI-driven automation services reduce manual work, optimize workflows, and increase productivity across various business functions.</p>
            <p>&#128173; Embrace the future with our AI solutions designed to enhance customer experience, improve operational efficiency, and drive growth in a competitive market.</p>
            <p>&#128173; We prioritize data security and compliance, ensuring that our AI and ML solutions adhere to the highest standards of privacy and protection.</p>
            <p>&#128173; Stay ahead of the curve with our continuous innovation in AI, as we constantly refine our models to adapt to the latest technological advancements.</p>
            <p>💭 Our AI-powered recommendation engines enhance personalization, providing tailored experiences that drive customer satisfaction and loyalty.</p>
            <p>💭 We harness the power of natural language processing (NLP) to develop intelligent chatbots, virtual assistants, and sentiment analysis tools that understand and respond to human language with precision.</p>
            <p>💭 Through machine learning algorithms, we help you uncover hidden patterns in your data, enabling predictive analytics that anticipate trends and opportunities before they arise.</p>
            <p>💭 Our computer vision solutions empower businesses to analyze and interpret visual data, from image recognition to video analysis, transforming how you engage with the world around you.</p>
            <p>💭 We specialize in reinforcement learning, creating AI systems that learn and adapt through interaction with their environments, leading to continuous improvement and optimal decision-making.</p>
            <p>💭 Our AI-driven predictive maintenance solutions help you prevent equipment failures, reduce downtime, and extend the life of your assets by identifying issues before they become critical.</p>
            <p>💭 With our AI-based fraud detection systems, we safeguard your business by identifying and mitigating fraudulent activities in real-time, ensuring the integrity of your operations.</p>
            <p>💭 We provide custom AI solutions tailored to your industry, whether it's finance, healthcare, retail, or manufacturing, delivering specialized models that address your unique challenges.</p>
            <p>💭 Our AI consulting services guide you through the complexities of AI adoption, offering strategic insights and implementation support to ensure your AI initiatives succeed.</p>
            <p>💭 Leveraging AI for dynamic pricing, we help businesses optimize pricing strategies in real-time, maximizing revenue while staying competitive in the market.</p>
          </div>
        </div>

        {/* MuleSoft - Left Column */}
        <div className="space-y-4">
          <h3 className="text-2xl lg:text-3xl font-bold mb-6">MuleSoft</h3>
          <div className="space-y-3 text-sm lg:text-base">
            <p>&#128173; Axcen is a Strategic MuleSoft Partner with over 2+ years of diverse experience throughout the integration and consulting space.</p>
            <p>&#128173; Learn a little more about us and reach out to discuss how we can help create connected customer experiences for your business.</p>
          </div>
        </div>

        {/* IBM Technologies - Left Column */}
        <div className="space-y-4">
          <h3 className="text-2xl lg:text-3xl font-bold mb-6">IBM Technologies</h3>
          <div className="space-y-3 text-sm lg:text-base">
            <p>&#128173; IBM tools</p>
          </div>
        </div>

        {/* Open Source Technologies - Left Column */}
        <div className="space-y-4">
          <h3 className="text-2xl lg:text-3xl font-bold mb-6">Open Source Technologies</h3>
          <div className="space-y-3 text-sm lg:text-base">
            <p>&#128173; Java development Services</p>
            <p>&#128173; PHP development Services</p>
            <p>&#128173; Python development Services</p>
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="space-y-8 lg:space-y-12">
        {/* IBM Middleware Technologies - Right Column */}
        <div className="space-y-4">
          <h3 className="text-2xl lg:text-3xl font-bold mb-6">IBM Middleware Technologies</h3>
          <div className="space-y-3 text-sm lg:text-base">
            <p>&#128173; Installation, configuring, managing and troubleshooting of WebLogic and WebSphere Application Server for testing, pre-production and production environments.</p>
            <p>&#128173; Administration of IBM HTTP web Servers which involves, Installation & Web instance creation, Security Integration & WebSphere plug-in management across application.</p>
            <p>&#128173; Enterprise application deployments, upgrades & Rollouts on both Web & Application Servers.</p>
            <p>&#128173; Establish and manage environments (testing and production) to enable application development teams.</p>
            <p>&#128173; Complete configuration of application aided activities form deployment, resources and web services integration. Manage shell scripts for Batch Management</p>
            <p>&#128173; Perform load test and performance tuning.</p>
            <p>&#128173; Involve Production to DR switch over and Rollback activity.</p>
            <p>&#128173; Configure Session replication for failover the JVM.</p>
            <p>&#128173; Heap Dump analysis for GC related issues, Out Of Memory Errors.</p>
            <p>&#128173; Manage and Monitoring JVM Performance by Web Sphere Heap size, Garbage Collection and Connection Pools</p>
          </div>
        </div>

        {/* Full Stack - Right Column */}
        <div className="space-y-4">
          <h3 className="text-2xl lg:text-3xl font-bold mb-6">Full Stack</h3>
          <div className="space-y-4 text-sm lg:text-base">
            <div>
              <h4 className="font-semibold text-lg mb-2">React.js</h4>
              <p>&#128173; Axcen leverages React.js for building dynamic and interactive user interfaces. React.js is a JavaScript library for building user interfaces, allowing for the creation of reusable UI components. The component-based architecture of React enables modular and efficient development.</p>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-2">React Native</h4>
              <p>&#128173; Axcen utilizes React Native for building cross-platform mobile applications with a single codebase. React Native allows developers to create natively-rendered mobile apps for iOS and Android using the same principles and libraries as React.js. This approach ensures consistent performance, seamless user experience, and reduced development time.</p>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-2">Django</h4>
              <p>&#128173; Axcen uses Django as a backend web framework written in Python. Django follows the model-view-controller (MVC) architectural pattern, providing a clean and organized way to build web applications. It comes with built-in features such as an ORM (Object-Relational Mapping) system for database interactions and an admin panel for easy content management.</p>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-2">HTML and CSS</h4>
              <p>&#128173; HTML (HyperText Markup Language) is used for structuring the content of web pages. CSS (Cascading Style Sheets) is employed for styling and layout, ensuring a visually appealing and consistent presentation of web pages.</p>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-2">SQL</h4>
              <p>&#128173; Axcen utilizes SQL (Structured Query Language) for database management. SQL is a standard language for interacting with relational databases. It enables tasks such as querying data, updating records, and managing database structures.</p>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-2">Full Stack Development</h4>
              <p>&#128173; Axcen's full-stack development approach involves proficiency in both frontend (React.js, HTML, CSS) and backend (Django, SQL) technologies. Full-stack developers at Axcen are capable of handling end-to-end development tasks, from designing user interfaces to implementing server-side logic and managing databases.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Technology Images */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mt-12 lg:mt-16 max-w-4xl mx-auto">
      <div className="bg-gray-800 rounded-xl overflow-hidden">
        <img src={muleSoftImg} alt="MuleSoft" className="w-full h-32 lg:h-40 object-cover" />
      </div>
      <div className="bg-gray-800 rounded-xl overflow-hidden">
        <img src={aiLogoImg} alt="AI/ML" className="w-full h-32 lg:h-40 object-cover" />
      </div>
      <div className="bg-gray-800 rounded-xl overflow-hidden">
        <img src={ibmImg} alt="IBM" className="w-full h-32 lg:h-40 object-cover" />
      </div>
      <div className="bg-gray-800 rounded-xl overflow-hidden">
        <img src={fullstackImg} alt="Full Stack" className="w-full h-32 lg:h-40 object-cover" />
      </div>
    </div>
  </div>
</section>

      {/* Industries Section */}
      <section id="axcenindustry" className="py-16 lg:py-24 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12 lg:mb-16">Industries</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Banking */}
            <div className="bg-white text-gray-900 rounded-2xl p-6 lg:p-8 shadow-xl">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-2xl">🏦</span>
                </div>
                <h3 className="text-xl lg:text-2xl font-bold">Banking</h3>
              </div>
              <p className="text-sm lg:text-base text-gray-700 leading-relaxed">
                Axcen's strong domain and technology capabilities, focused
                sub-industry offerings, and a strong partner ecosystem, enable
                true end-to-end transformation, helping BFSI customers
                modernize their core, reimagine their go-to-market models,
                adopt cloud, leverage data and insights, and better engage
                with their customers.
              </p>
            </div>

            {/* Healthcare */}
            <div className="bg-white text-gray-900 rounded-2xl p-6 lg:p-8 shadow-xl">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-2xl">⚕️</span>
                </div>
                <h3 className="text-xl lg:text-2xl font-bold">Health Care</h3>
              </div>
              <p className="text-sm lg:text-base text-gray-700 leading-relaxed">
                Our team of certified software developers, healthcare
                professionals, and project managers understand the
                complexities of healthcare IT and the importance of meeting
                regulatory requirements such as HIPAA. We offer custom
                software solutions including EHR systems, telemedicine
                platforms, and patient portals.
              </p>
            </div>

            {/* Energy */}
            <div className="bg-white text-gray-900 rounded-2xl p-6 lg:p-8 shadow-xl md:col-span-2 lg:col-span-1">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-2xl">💡</span>
                </div>
                <h3 className="text-xl lg:text-2xl font-bold">Energy</h3>
              </div>
              <p className="text-sm lg:text-base text-gray-700 leading-relaxed">
                Axcen is already powering the digital transformation of energy
                organizations with technology solutions that help achieve
                core operations goals of safety, reliability, efficiency, and
                profitability. We assist in monitoring, tracking, and
                reporting carbon footprint and support decarbonization of
                operations and expansion into renewables.
              </p>
            </div>
          </div>
        </div>
      </section>

 {/* Contact Us Section */}
<section id="axcencontactus" className="py-16 lg:py-24 bg-gray-100">
  <div className="container mx-auto px-4 lg:px-8">
    <h2 className="text-3xl lg:text-4xl font-bold text-center mb-8 lg:mb-12">Contact Us</h2>
    
    <div className="max-w-4xl mx-auto">
      <p className="text-base lg:text-lg text-gray-700 text-center mb-8 lg:mb-12">
        Feel free to contact us with your specific requirements through
        the contact form below. We value your time and will strive to
        get back to you as soon as possible. Our dedicated team is ready
        to collaborate and bring your software ideas to life.
      </p>

      <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8">
        <h3 className="text-xl lg:text-2xl font-bold mb-6">India</h3>
        <div className="space-y-4 text-sm lg:text-base">
          <div className="flex items-start">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="mt-1 mr-3 text-blue-600 flex-shrink-0" />
            <p className="leading-relaxed">
              No.10, Second Cross,<br />
              Kumaran Nagar, Puthur,<br />
              Thiruchirappalli - 620 017
            </p>
          </div>
          <div className="flex items-center">
            <FontAwesomeIcon icon={faPhone} className="mr-3 text-blue-600 flex-shrink-0" />
            <p>+91 86752 04168</p>
          </div>
          <div className="flex items-center">
            <FontAwesomeIcon icon={faEnvelope} className="mr-3 text-blue-600 flex-shrink-0 " />
            <p>hr@axcentech.com</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* Careers Section */}
      <section id="careers" className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-8">Careers</h2>
          <h3 className="text-2xl lg:text-3xl font-semibold text-center mb-6">Life@Axcen</h3>
          <p className="text-base lg:text-lg text-gray-700 text-center max-w-4xl mx-auto mb-12 lg:mb-16">
            In addition to being driven and innovative, the people at Axcen are
            also fun-loving bunch who know how to enjoy themselves. Whether we
            are celebrating a big win or enjoying each other's company, there's
            always a great sense of camaraderie and lightheartedness that
            pervades our workplace culture. Join us at Axcen, and you'll not
            only be part of a dynamic and growth-oriented team, but you'll also
            get to work with some of the most enjoyable and fun-loving people in
            the industry.
          </p>

          <h3 className="text-2xl lg:text-3xl font-semibold text-center mb-8 lg:mb-12">Current Openings</h3>

          {/* Desktop View - Carousel */}
          <div className="hidden lg:block">
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="text-4xl text-gray-800 hover:text-red-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                &#8249;
              </button>

              <div className="flex gap-6 overflow-hidden">
                {jobOpenings.slice(currentIndex, currentIndex + 3).map((job, index) => (
                  <div key={index} className="bg-blue-900 text-white rounded-2xl p-6 w-80 flex-shrink-0 shadow-lg">
                    <h4 className="text-xl font-bold mb-3">{job.title}</h4>
                    <p className="text-sm mb-2">{job.experience}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-sm">{job.location}</p>
                      <a
                        href="#axcencontactus"
                        className="text-3xl hover:text-red-400 transition-colors"
                        onClick={closeNav}
                      >
                        &#x25B8;
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={handleNext}
                disabled={currentIndex === 2}
                className="text-4xl text-gray-800 hover:text-red-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                &#8250;
              </button>
            </div>
          </div>

          {/* Mobile View - Vertical Scroll */}
          <div className="lg:hidden">
            <div className="flex flex-col items-center gap-4">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="text-4xl text-gray-800 hover:text-red-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                &#x2303;
              </button>

              <div className="w-full max-w-md">
                {jobOpenings.slice(currentIndex, currentIndex + 3).map((job, index) => (
                  <div key={index} className="bg-blue-900 text-white rounded-2xl p-6 mb-4 shadow-lg">
                    <h4 className="text-xl font-bold mb-3">{job.title}</h4>
                    <p className="text-sm mb-2">{job.experience}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-sm">{job.location}</p>
                      <a
                        href="#axcencontactus"
                        className="text-3xl hover:text-red-400 transition-colors"
                        onClick={closeNav}
                      >
                        &#x25B8;
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={handleNext}
                disabled={currentIndex === 2}
                className="text-4xl text-gray-800 hover:text-red-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                &#x2304;
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
<footer className="bg-gray-200 py-8 lg:py-12">
  <div className="container mx-auto px-4 lg:px-8">
    <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
      {/* Logo and Company Name */}
      <div className="flex flex-col items-center lg:flex-row lg:items-center lg:space-x-3">
        <img
          src={CompanyLogo}
          alt="Axcen Tech Logo"
          className="h-12 w-12 lg:h-16 lg:w-16 mb-2 lg:mb-0"
        />
        <h5 className="text-lg lg:text-base text-lg font-bold text-center lg:text-left">
          Innovation Lab Private Limited
        </h5>
      </div>

      {/* Navigation Links - Centered on desktop */}
      <nav className="flex flex-wrap justify-center gap-4 lg:gap-6 lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2">
        <a 
          href="#axcenaboutus" 
          className="text-sm lg:text-base text-gray-800 hover:text-red-600 transition-colors no-underline hover:no-underline"
          onClick={closeNav}
        >
          About Us
        </a>
        <a 
          href="#axcenservices" 
          className="text-sm lg:text-base text-gray-800 hover:text-red-600 transition-colors no-underline hover:no-underline"
          onClick={closeNav}
        >
          Services
        </a>
        <a 
          href="#axcencontactus" 
          className="text-sm lg:text-base text-gray-800 hover:text-red-600 transition-colors no-underline hover:no-underline"
          onClick={closeNav}
        >
          Contact Us
        </a>
      </nav>

      {/* Social Icons - Right side on desktop */}
      <div className="flex gap-4">
        <a
          href="https://www.linkedin.com/company/100545236/admin/feed/posts/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-75 transition-opacity"
        >
          <img src={linkedin} alt="LinkedIn" className="h-8 w-8" />
        </a>
        <a
          href="https://www.instagram.com/axcentechnologies/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-75 transition-opacity"
        >
          <img src={insta} alt="Instagram" className="h-8 w-8" />
        </a>
      </div>
    </div>

    <hr className="my-6 border-gray-300" />
    <p className="text-center text-sm text-gray-600">
      © Copyright 2023, All Rights Reserved
    </p>
  </div>
</footer>

      {/* Custom Styles for Animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(-100%);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease forwards;
        }

        .animate-fade-in {
          animation: fade-in 1.5s ease-in-out forwards;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
        }

        .animation-delay-600 {
          animation-delay: 0.6s;
        }

        .animation-delay-1000 {
          animation-delay: 1s;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
};

export default Home;