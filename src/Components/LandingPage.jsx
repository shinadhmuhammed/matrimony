import React, { useEffect, useState } from "react";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { app } from "../Utils/Firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const db = getFirestore(app);

function LandingPage() {
 
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    gender: "",
    password: "",
    confirmPassword: "",
    religion: "",
  });
  const navigate = useNavigate();

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const openSignupModal = () => {
    setIsSignupModalOpen(true);
  };

  const closeSignupModal = () => {
    setIsSignupModalOpen(false);
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
   
  };

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
  };

  const handleSwitchToLogin = () => {
    closeSignupModal();
    openLoginModal();
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log("Login form submitted", loginData);
  
  };



  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        signupData.email,
        signupData.password,
        signupData.username,
        signupData.gender
      );
      await setDoc(doc(db, "users", user.uid), {
        email: signupData.email,
        gender: signupData.gender,
        userName: signupData.username,
      });
      console.log("User signed up successfully");
      navigate('/')
      toast.success('Sign Up  successfully');
    } catch (error) {
      console.error("Error signing up:", error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("userId")) {
      setIsLogged(true);
      
    }
  });

  const handleShowForgotPassword = () => {
    console.log("Show forgot password");
  };

  const handleShowSignup = () => {
    closeLoginModal();
    openSignupModal();
  };

  const handleShowLogin = () => {
    closeSignupModal();
    openLoginModal();
  };

  const Logout = () => {
    localStorage.clear("userId");
    setIsLogged(false);
    toast.success('Logged out successfully');
  };

  const handleUserClick = () => {
    navigate("/users");
  };

  return (
    <div>
        <ToastContainer />
      <div className="relative">
        <img
          src="https://img2.shaadi.com/assests/2023/images/shaadi-desktop-banner-v1.webp"
          alt="landingImage"
          className="w-full h-auto"
        />
        <img
          src="https://img2.shaadi.com/assests/2021/images/Matrimony-Service-by-Shaadi.com.png"
          alt="logo"
          className="absolute top-0 m-4 left-0 mt-8 ml-56"
        />
        {isLogged ? (
          <>
            <button
              onClick={Logout}
              className="absolute top-0 right-0 mt-10 mr-80 text-white font-bold px-4 py-4 rounded"
            >
              Logout ^
            </button>
            <button
              onClick={handleUserClick}
              className="absolute top-0 right-0 mt-10 mr-40 text-white font-bold px-4 py-4 rounded"
            >
              view your partners
            </button>
          </>
        ) : (
          <button
            onClick={openLoginModal}
            className="absolute top-0 right-0 mt-10 mr-80 text-white font-bold px-4 py-4 rounded"
          >
            Login ^
          </button>
        )}
      </div>
      <div className="">
        <h1 className="text-red-500 flex justify-center font-lobster font-light mt-28 text-lg ">
          Millions of Happy Stories
        </h1>
      </div>
      <div className="flex gap-5 mt-10 ml-10 mr-10">
        <div className="max-w-sm rounded overflow-hidden shadow-lg ">
          <img
            className="w-full"
            src="https://i.pinimg.com/736x/70/9f/8e/709f8e55c045a6c689c359d305c2d40a.jpg"
            alt="Sunset in the mountains"
          />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">Naslen & Mamitha</div>
            <p className="text-gray-700 text-base">
              It was like Magic! We connected well in 2 months and decided to
              tie the knot. It seemed like everything was falling in place. We
              trusted our destiny and decided to do a new beginning!
            </p>
          </div>
        </div>

        <div className="max-w-sm rounded overflow-hidden shadow-lg ">
          <img
            className="w-full"
            src="https://i.pinimg.com/736x/70/9f/8e/709f8e55c045a6c689c359d305c2d40a.jpg"
            alt="Sunset in the mountains"
          />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">Naslen & Mamitha</div>
            <p className="text-gray-700 text-base">
              It was like Magic! We connected well in 2 months and decided to
              tie the knot. It seemed like everything was falling in place. We
              trusted our destiny and decided to do a new beginning!
            </p>
          </div>
        </div>
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
          <img
            className="w-full"
            src="https://i.pinimg.com/736x/70/9f/8e/709f8e55c045a6c689c359d305c2d40a.jpg"
            alt="Sunset in the mountains"
          />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">Naslen & Mamitha</div>
            <p className="text-gray-700 text-base">
              It was like Magic! We connected well in 2 months and decided to
              tie the knot. It seemed like everything was falling in place. We
              trusted our destiny and decided to do a new beginning!
            </p>
          </div>
        </div>
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
          <img
            className="w-full"
            src="https://i.pinimg.com/736x/70/9f/8e/709f8e55c045a6c689c359d305c2d40a.jpg"
            alt="Sunset in the mountains"
          />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">Naslen & Mamitha</div>
            <p className="text-gray-700 text-base">
              It was like Magic! We connected well in 2 months and decided to
              tie the knot. It seemed like everything was falling in place. We
              trusted our destiny and decided to do a new beginning!
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center mt-10 ">
        <img
          src="https://img2.shaadi.com/assests/2016/images/home-page-layer-logo.png"
          alt="logo"
          className="h-20 w-20"
        />
      </div>

      <div className="ml-40 mr-40 mt-10 font-extralight">
        <p>
          Shaadi.com, The World's No.1 Matchmaking Service, was founded with a
          simple objective - to help people find happiness. Shaadi.com is a
          social networking site specialising in matchmaking and not just a
          matrimonial service. As a leader in what is sometimes known as the
          matrimony category, we have touched more than 35 million lives.
          Shaadi.com has always differentiated itself from other matrimonials
          through its innovation-led approach. By redefining the way Indian
          brides and grooms meet for marriage, Shaadi.com has created a
          world-renowned brand that has changed the way of finding a life
          partner
        </p>
      </div>
      <div className="mt-6 text-center mb-7">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none">
          Trusted By Million
        </button>
      </div>
      <div className="container mx-auto px-4 bg-gray-200 mb-3 ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <h3 className="text-lg font-bold mb-2">About</h3>
            <ul className="list-none">
              <li>About Us</li>
              <li>Our Team</li>
              <li>Our Story</li>
            </ul>
          </div>

     
          <div>
            <h3 className="text-lg font-bold mb-2">Contact</h3>
            <ul className="list-none">
              <li>Contact Us</li>
              <li>Support</li>
              <li>Feedback</li>
            </ul>
          </div>

         
          <div>
            <h3 className="text-lg font-bold mb-2">Privacy Policy</h3>
            <ul className="list-none">
              <li>Terms of Service</li>
              <li>Privacy Statement</li>
              <li>Cookie Policy</li>
            </ul>
          </div>

        
          <div>
            <h3 className="text-lg font-bold mb-2">Developers</h3>
            <ul className="list-none">
              <li>API Documentation</li>
              <li>Developer Resources</li>
              <li>Community</li>
            </ul>
          </div>
        </div>
      </div>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={closeLoginModal}
        handleShowForgotPassword={handleShowForgotPassword}
        handleShowSignup={handleShowSignup}
        loginData={loginData}
        handleChange={handleLoginChange}
        handleSubmit={handleLoginSubmit}
        setIsLogged={setIsLogged}
      />

      <SignupModal
        isOpen={isSignupModalOpen}
        onClose={closeSignupModal}
        signupData={signupData}
        handleChange={handleSignupChange}
        handleSubmit={handleSignupSubmit}
        handleSwitchToLogin={handleSwitchToLogin}
      />
    </div>
  );
}

export default LandingPage;
