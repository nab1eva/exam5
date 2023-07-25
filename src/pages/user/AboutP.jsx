import arms from "../../assets/images/arms.png";
import people from "../../assets/images/people.png";
import "../../scss/about.scss";

const AboutP = () => {
  return (
    <section>
      <div className="container">
        <div className="about-top">
          <div className="about-top-left">
            <span>Our mision</span>
            <h1>Creating valuable content for creatives all around the</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Non
              blandit massa enim nec. Scelerisque viverra mauris in aliquam sem.
              At risus viverra adipiscing at in tellus.
            </p>
          </div>
          <div className="about-top-right">
            <span>Our Vision</span>
            <h1>A platform that empowers individuals to improve</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Non
              blandit massa enim nec. Scelerisque viverra mauris in aliquam sem.
              At risus viverra adipiscing at in tellus.
            </p>
          </div>
        </div>

        <div className="about-bottom">
          <div className="about-bottom-text">
            <h1>Our team of creatives</h1>
            <h3>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt.
            </h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat.
            </p>
          </div>
          <div className="about-bottom-img1">
            <img src={arms} alt="" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="103"
              height="116"
              viewBox="0 0 103 116"
              fill="none"
            >
              <path
                d="M0 42.8469C0 19.1832 19.4417 0 43.4242 0H103V116H0V42.8469Z"
                fill="#FFD050"
              />
            </svg>
          </div>
        </div>
        <div className="about-bottom">
          <div className="about-bottom-img2">
            <img src={people} alt="" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="74"
              height="74"
              viewBox="0 0 74 74"
              fill="none"
            >
              <circle cx="37" cy="37" r="37" fill="#592EA9" />
            </svg>
          </div>
          <div className="about-bottom-text">
            <h1>Our team of creatives</h1>
            <h3>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt.
            </h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutP;
