import { Link } from "react-router-dom";
import { Heart, Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Our Workshops", path: "/services" },
    { name: "Get Involved", path: "/get-involved" },
    { name: "News", path: "/news" },
    { name: "Resources", path: "/resources" },
    { name: "Contact", path: "/contact" },
    { name: "FAQ", path: "/faq" },
    { name: "Donate", path: "/donate" },
  ];

  return (
    <footer className="bg-secondary text-secondary-foreground mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <Link to="/" className="flex items-center gap-2 font-bold text-xl mb-4">
                <img src="/Logo.png" alt="Logo" className="h-8 w-8" />
              <span>GetItDone</span>
            </Link>
            <p className="text-secondary-foreground/80 mb-4">
              Empowering communities through education and skill development. 
              Together, we can reduce unemployment and build a brighter future.
            </p>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-smooth"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-smooth"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-smooth"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-smooth"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="mailto:info@getitdone.org"
                className="hover:text-accent transition-smooth"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-secondary-foreground/80 hover:text-accent transition-smooth"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-2 text-secondary-foreground/80">
              <li>
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:info@getitdone.org"
                  className="hover:text-accent transition-smooth"
                >
                  info@getitdone.org
                </a>
              </li>
              <li>
                <strong>Phone:</strong> +27 (0) 11 123 4567
              </li>
              <li>
                <strong>Address:</strong>
                <br />
                123 Community Street
                <br />
                Johannesburg, 2000
                <br />
                South Africa
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-secondary-foreground/20 pt-6 text-center text-secondary-foreground/80">
          <p>
            © {currentYear} GetItDone Educational NGO. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
