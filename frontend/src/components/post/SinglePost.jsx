import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const SinglePost = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});

  // handle fetch single post
  const fetchSinglePost = async () => {
    try {
      const response = await fetch(`http://localhost:3080/api/posts/${id}`);
      const data = await response.json();

      // update local state
      setPost(data);
    } catch (error) {
      console.log("Error fetching", error.message);
    }
  };

  useEffect(() => {
    fetchSinglePost();
  }, [id]);

  const styles = {
    img: {
      width: "100%",
      height: "400px",
      objectFit: "cover",
      borderRadius: "8px",
      marginBottom: "16px",
    },
  };
  return (
    <div className="container my-5">
      <img style={styles.img} src={post.coverImg} alt="" />
      <h1>{post.title}</h1>
      <p>{post.content }</p>
    </div>
  );
};

export default SinglePost;
