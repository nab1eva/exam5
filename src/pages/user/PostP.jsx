import { useLocation } from "react-router-dom";
import "../../scss/post.scss";
import profile from "../../assets/images/profile.png";
import bg from "../../assets/images/bg.png";

const PostP = () => {
  const location = useLocation();
  const post = location.state?.post;

  return (
    <div className="container">
      {post && (
        <div className="post">
          <img
            src={bg}
            alt="img"
          />
          <div className="post-text">
            <div className="text-top d-flex align-items-center gap-4">
              <img src={profile} alt="" />
              <div>
                <h2>Andrew Jonson</h2>
                <span>Posted on {post.updatedAt.split("T")[0]}</span>
              </div>
            </div>
            <h1>{post.title}</h1>
            <h6>{post.category.name} (#{post.tags})</h6>
            <p>{post.description}</p>
            <p>{post.description}</p>
            <br />
            <p>{post.description}</p>
            <p>{post.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostP;
