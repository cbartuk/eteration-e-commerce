import { FaTwitter, FaMedium, FaLinkedin } from "react-icons/fa";
import { Dancing_Script } from "next/font/google";

const dancingScript = Dancing_Script({
  weight: "400",
  subsets: ["latin"],
});

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-6">
      <div className="container mx-auto px-4 text-center">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Left Side */}
          <div className="mb-4 md:mb-0">
            <h2 className="text-lg font-semibold">Eteration Shop</h2>
            <p className={`text-md italic ${dancingScript.className}`}>
              Discover more, shop smarter, live better!
            </p>
          </div>

          {/* Middle Social Icons */}
          <div className="flex justify-center space-x-6 mb-4 md:mb-0">
            <a
              href="https://x.com/SenatorMaul"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href="https://medium.com/@canbartuklc"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaMedium size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/cbartuk/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin size={24} />
            </a>
          </div>

          {/* Right Side */}
          <div>
            <p className="text-sm">
              &copy; 2024 Eteration Shop. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
