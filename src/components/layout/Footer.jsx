import "./footer.scss";
import facebook from "../../assets/images/facebook.svg";
import twitter from "../../assets/images/twitter.svg";
import instagram from "../../assets/images/instagram.svg";
import linkedin from "../../assets/images/linkedin.svg";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer d-flex justify-content-between align-items-center">
          <div className="footer-text d-flex">
            <p>Finstreet 118 2561 Fintown</p>
            <p>Hello@finsweet.com 020 7993 2905</p>
          </div>
          <div className="footer-socials d-flex align-items-center">
            <a href="https://www.facebook.com/">
              <img src={facebook} alt="Facebook" />
            </a>
            <a href="https://www.twitter.com/">
              <img src={twitter} alt="Twitter" />
            </a>
            <a href="https://www.instagram.com/">
              <img src={instagram} alt="Instagram" />
            </a>
            <a href="https://www.linkedin.com/">
              <img src={linkedin} alt="LinkedIn" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
