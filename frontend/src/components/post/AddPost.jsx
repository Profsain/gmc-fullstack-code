import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const AddPost = () => {
  // form state
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState("");
  const [coverImg, setCoverImg] = useState("");
  const [coverImgError, setCoverImgError] = useState("");
  const [tags, setTags] = useState("");
  const [tagsError, setTagsError] = useState("");
  const [content, setContent] = useState("");
  const [contentError, setContentError] = useState("");
  const [isAllValid, setIsAllValid] = useState(false);

  // handle title change and validation
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    if (e.target.value.length < 20) {
      setTitleError("Title must be at least 20 characters");
    } else {
      setTitleError("");
    }
  };

  // handle cover image change and validation
  const handleCoverImgChange = (e) => {
    setCoverImg(e.target.value);
    if (e.target.value.length < 10) {
      setCoverImgError("Cover image url must be at least 10 characters");
    } else {
      setCoverImgError("");
    }
  }

  // handle tags change and validation
  const handleTagsChange = (e) => {
    setTags(e.target.value);
    if (e.target.value.length < 15) {
      setTagsError("Tags must be at least 15 characters");
    } else {
      setTagsError("");
    }
  }

  // handle content change and validation
  const handleContentChange = (e) => {
    setContent(e.target.value);
    if (e.target.value.length < 50) {
      setContentError("Content must be at least 50 characters");
    } else {
      setContentError("");
    }
  }


  // handle is all valid
  const handleIsAllValid = () => {
    if (titleError === "" && coverImgError === "" && tagsError === "" && contentError === "") {
      setIsAllValid(true);
    } else {
      setIsAllValid(false);
    }
   };

  // handle clear input field
  const clearFields = () => {
    setTitle("");
    setCoverImg("");
    setTags("");
    setContent("");
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // create post object
    const postData = {
      title,
      coverImg,
      tags: tags.split(","),
      content,
    };

    // check if all fields are valid
    handleIsAllValid();

    if (isAllValid) {
      try {
        // send post data to backend
        const response = await fetch("http://localhost:3080/api/createPost", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        });

        if (response.ok) {
          console.log("Post added successfully");
          clearFields();
        } else {
          console.log("Failed to add post");
        }
      } catch (error) {
        console.log("Error creating post: ", error.message);
      }
    }
  };

  return (
    <div className="container my-4">
      <h1 className="text-primary">Add New Post</h1>

      <div className="mt-4">
        <form onSubmit={(e) => handleSubmit(e)}>
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>Post Title</Form.Label>
            <Form.Control
              onChange={(e) => handleTitleChange(e)}
              value={title}
              type="text"
              placeholder="Enter post title"
            />
            <Form.Text className="text-danger">{titleError}</Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="coverImg">
            <Form.Label>Cover Image Url</Form.Label>
            <Form.Control
              onChange={(e) => handleCoverImgChange(e)}
              value={coverImg}
              type="text"
              placeholder="Enter cover image url"
            />
            <Form.Text className="text-danger">{coverImgError}</Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="tags">
            <Form.Label>Post Tags</Form.Label>
            <Form.Control
              onChange={(e) => handleTagsChange(e)}
              value={tags}
              type="text"
              placeholder="Enter post tags separated by comma"
            />
            <Form.Text className="text-danger">{tagsError}</Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="content">
            <Form.Label>Post Content</Form.Label>
            <Form.Control
              onChange={(e) => handleContentChange(e)}
              value={content}
              as="textarea"
              rows={8}
            />
            <Form.Text className="text-danger">{contentError}</Form.Text>
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddPost;
