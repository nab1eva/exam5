import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { request } from "../../server/request";
import "../../scss/categories.scss";

const CategoriesP = () => {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const albumId = JSON.parse(localStorage.getItem("ID"));

  const postsPerPage = 5;

  useEffect(() => {
    async function getPosts() {
      try {
        let { data } = await request.get(`/post?category=${albumId}`);
        let newDate = data.data;
        let filteredPosts = newDate.filter((post) => {
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
  }, [searchQuery, albumId]);

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
        {" "}
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
                        src="https://s3-alpha-sig.figma.com/img/f36a/ceb1/331b3b8ac3a1d67fcd41a038e1383b54?Expires=1691366400&Signature=FDh5WVSK549XQXRA5xJlmyzVCMEzaKapUTOgfmemrrvrnaEaeXVUDaCwRLWQrL2dPQhqcUGINIbAPh3dQjdH9a94Pi1EnZlvbC6TiZDKyFl9CSM5STS56L0MU9URHB9nH8f76Qou5-VzV2lfvMC~B~Pw8crk8vSZEHpiwf41pkBzDIMHkVDMbfMLNMFHG~TQQJT-VH5A0cD~rQD1-IUFDpvwWSy5v9Dp~cDOsegYYqwztBJrDyrHZE25wgN1DaT-eV6VtFh6A3i-9IS2MBqRZkH7q0fzZxbNEJmgh9AsRqXMn7hnPqM25xXNUFHI-2CSeVDRIv-WsWZbFkGxJwCcFQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
                        alt="img"
                      />
                    </Link>
                  </div>
                  <div className="post-card-right">
                    <Link to={`/posts/${post._id}`} state={{ post }}>
                      <span>{post.category.name}</span>
                      <h1>{post.title}</h1>
                      <p>{post.category.description}</p>
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
  );
};

export default CategoriesP;