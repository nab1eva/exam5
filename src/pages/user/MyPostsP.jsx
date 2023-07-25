import { Fragment, useEffect, useState } from "react";
import { Button, Modal, Form, Input } from "antd";
import { Link } from "react-router-dom";
import { request } from "../../server/request";
import "../../scss/myposts.scss";

const MyPostsP = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  const onFinish = async (values) => {
    try {
      const { name, id, image, description } = values.user;

      await request.post(
        "https://blog-backend-production-a0a8.up.railway.app/api/v1/post",
        {
          title: name,
          id,
          imageUrl: image,
          description,
        }
      );

      setIsModalOpen(false);
      setPosts((prevPosts) => [
        ...prevPosts,
        {
          _id: "unique_id_for_new_post",
          title: name,
          id,
          imageUrl: image,
          description,
        },
      ]);
    } catch (error) {
      console.log(error.response);
    }
  };

  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  useEffect(() => {
    async function getPosts() {
      try {
        let { data } = await request.get(
          "https://blog-backend-production-a0a8.up.railway.app/api/v1/post/lastones"
        );
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
        <div>
          <Fragment>
            <div className="myposts-top d-flex align-items-center justify-content-between">
              <h1>My posts</h1>
              <button type="primary" onClick={showModal}>
                Add
              </button>
            </div>
            <hr />
            <Modal
              title="Add post"
              visible={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              okText="Add"
              cancelButtonProps={{ style: { display: "none" } }}
              okButtonProps={{ style: { display: "none" } }}
            >
              <Form
                {...layout}
                name="nest-messages"
                onFinish={onFinish}
                style={{
                  maxWidth: 600,
                }}
              >
                <Form.Item
                  name={["user", "name"]}
                  label="Title"
                  rules={[
                    {
                      required: true,
                      message: "Please write Title!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name={["user", "category"]}
                  label="Category"
                  rules={[
                    {
                      required: true,
                      message: "Please write category!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item name={["user", "image"]} label="Image">
                  <Input />
                </Form.Item>
                <Form.Item name={["user", "description"]} label="Description">
                  <Input.TextArea />
                </Form.Item>
                <Form.Item
                  wrapperCol={{
                    ...layout.wrapperCol,
                    offset: 8,
                  }}
                >
                  <button className="btnn" type="submit">
                    Add Post
                  </button>
                </Form.Item>
              </Form>
            </Modal>
          </Fragment>
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
                            src={
                              "https://s3-alpha-sig.figma.com/img/f36a/ceb1/331b3b8ac3a1d67fcd41a038e1383b54?Expires=1691366400&Signature=FDh5WVSK549XQXRA5xJlmyzVCMEzaKapUTOgfmemrrvrnaEaeXVUDaCwRLWQrL2dPQhqcUGINIbAPh3dQjdH9a94Pi1EnZlvbC6TiZDKyFl9CSM5STS56L0MU9URHB9nH8f76Qou5-VzV2lfvMC~B~Pw8crk8vSZEHpiwf41pkBzDIMHkVDMbfMLNMFHG~TQQJT-VH5A0cD~rQD1-IUFDpvwWSy5v9Dp~cDOsegYYqwztBJrDyrHZE25wgN1DaT-eV6VtFh6A3i-9IS2MBqRZkH7q0fzZxbNEJmgh9AsRqXMn7hnPqM25xXNUFHI-2CSeVDRIv-WsWZbFkGxJwCcFQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
                            }
                            alt="img"
                          />
                        </Link>
                      </div>
                      <div className="post-card-right">
                        <Link to={`/posts/${post._id}`} state={{ post }}>
                          <span>{post.category.name}</span>
                          <h3>{post.title}</h3>
                          <p>{post.description.slice(0, 100)}</p>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="pagination">
              {Array.from({
                length: Math.ceil(posts.length / postsPerPage),
              }).map((item, index) => (
                <button
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className={currentPage === index + 1 ? "active" : ""}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default MyPostsP;
