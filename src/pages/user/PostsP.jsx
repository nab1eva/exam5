import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { request } from "../../server/request";

const PostsP = () => {
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
      <div className="container">
        <div className="search">
          <input
            type="text"
            placeholder="Searching . . ."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <h2 className="allh3">All posts</h2>
          <hr />
        </div>
        <div>
          <div className="post-cards">
            {currentPosts.map((post, i) => (
              <div key={i}>
                <div className="post-card">
                  <div className="post-card-left">
                    <Link to={`/posts/${post._id}`} state={{ post }}>
                      <img
                        src="https://s3-alpha-sig.figma.com/img/0624/fa81/56d20f4f437855e425ccde79eec2a93c?Expires=1691366400&Signature=R2lzQn2HEZ45EtIIg35b4sy6aDJf2dyWeIfsfgNZHWKauUZeWYRTpeZrDND4K2C4KoRLWWvhUQqFkPUFfv9IGGrp5tSZZ1kp1aDaj7wxIgYKz19iV9H6urPkIWVfq~~dV0bNXm4F1e2b-MZ8rVYOofWNTJok-04d~NvUQuNYaaGTV2u2ayurY0z7CYvBQV~zWfPn1~1vSYn6y-KwU-E2CN5t1zKHmhb-aTOJg3XWj4OLMTwwsXosuDIqQWNMGG9NptKo6EtNGdB~5joTIpCWxp-Dvjfkzz-XAqrd-2Oje~mEEesJOcZ7BVjW53a4R0HO44q5shsgPiiuV~EPwpdgqQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
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
  );
};

export default PostsP;
