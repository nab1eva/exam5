import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { request } from "../../server/request";
import "../../scss/categories.scss";
import category from "../../assets/images/category.png";


const CategoriesP = () => {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  useEffect(() => {
    async function getPosts() {
      try {
        let { data } = await request.get(`post/lastones`);
        let filteredPosts = data.filter((post) => {
          const postTitle = post.title.toLowerCase();
          const postDescription = post.description.toLowerCase();
          const query = searchQuery.toLowerCase();
          return postTitle.includes(query) || postDescription.includes(query);
        });
        setPosts(filteredPosts);
      } catch (err) {
        console.log(err.response);
      }
    }
    getPosts();
  }, [searchQuery]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <section>
      <div className="categories-top">
        <div className="container">
          <div className="categories-top-text">
            <h1>Business</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do{" "}
              <br />
              eiusmod tempor incididunt ut labore.
            </p>
            <Link to={"/"}> Blog {">"} Business</Link>
          </div>
        </div>
      </div>
      <section>
        <div className="container">
          <div className="search">
            <input
              type="text"
              placeholder="Searching . . ."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <div>
            <div className="post-cards">
              {currentPosts.map((post, i) => (
                <div key={i}>
                  <div className="post-card">
                    <div className="post-card-left">
                      <Link to={`/posts/${post._id}`} state={{ post }}>
                        <img
                          src={category}
                          alt="img"
                        />
                      </Link>
                    </div>
                    <div className="post-card-right">
                      <Link to={`/posts/${post._id}`} state={{ post }}>
                        <p>{post.category.name}</p>
                        <h3>{post.title}</h3>
                        <p>{post.description.slice(0, 50)}</p>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="pagination">
            {Array.from({ length: Math.ceil(posts.length / postsPerPage) }).map(
              (item, index) => (
                <button
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className={currentPage === index + 1 ? "active" : ""}
                >
                  {index + 1}
                </button>
              )
            )}
          </div>
        </div>
      </section>
    </section>
  );
};

export default CategoriesP;
