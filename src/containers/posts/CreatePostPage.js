import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import PostForm from "../../components/posts/PostForm";
import Validate from "../../components/form/Validate";
import { connect } from "react-redux";
import { createPost } from "../../actions/postActions";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
const CreatePostPage = ({ errors, createPost, loading, history }) => {
  const [post, setPost] = useState({
    title: "",
    body: "",
    errors: {},
  });

  const [description, setDescription] = useState();
  useEffect(() => {
    setPost((post) => {
      return { ...post, errors };
    });
  }, [errors]);

  const handleChange = (e) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = { ...post.errors, ...Validate(name, value).errors };
    setPost({ ...post, errors: { ...error } });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, body } = post;
    createPost({ title, body }, history);
  };
  const setEditorState = (editorState) => {
    console.log("editorState", editorState);
    setDescription(editorState);
  };
  return (
    <>
      <PostForm
        loading={loading}
        post={post}
        onChange={handleChange}
        onBlur={handleBlur}
        onSubmit={handleSubmit}
      />
      {/* <Editor
        editorState={description}
      //   onChange={handleChange}
        onSubmit={handleSubmit}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        toolbar={{
          inline: { inDropdown: true },
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
          history: { inDropdown: true },
        }}
        onEditorStateChange={setEditorState}
      /> */}
    </>
  );
};

const mapStateToProps = (state) => ({
  loading: state.post.postLoading,
  errors: state.errors,
});

CreatePostPage.propTypes = {
  createPost: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, { createPost })(CreatePostPage);
