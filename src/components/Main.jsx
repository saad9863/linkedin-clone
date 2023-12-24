import styled from "styled-components";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";

import EventOutlinedIcon from "@mui/icons-material/EventOutlined";

import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";

import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";

import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import ReactPlayer from "react-player";
import { connect } from "react-redux";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";

import SendIcon from "@mui/icons-material/Send";

import PostModal from "./PostModal.jsx";

import { getArticlesAPI } from "../actions/index.js";
import { useEffect, useState } from "react";

const Main = (props) => {
  const [ShowModal, setShowModal] = useState("close");
  useEffect(() => {
    props.getArticles();
  }, []);
  const handleClick = (e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }

    switch (ShowModal) {
      case "open":
        setShowModal("close");
        break;
      case "close":
        setShowModal("open");
        break;
      default:
        setShowModal("close");
        break;
    }
  };

  return (
    <>
      <Container>
        <ShareBox>
          <div>
            {props.user && props.user.photoURL ? (
              <img src={props.user.photoURL} alt="User Profile" />
            ) : (
              <img src="/images/user.svg" alt="Default User" />
            )}
            <button
              onClick={handleClick}
              disabled={props.loading ? true : false}
            >
              Start a post
            </button>
          </div>
          <div>
            <button>
              <InsertPhotoOutlinedIcon style={{ color: " #1565c0" }} />
              <span>Photo</span>
            </button>

            <button>
              <VideocamOutlinedIcon style={{ color: " #29ab87" }} />
              <span>Video</span>
            </button>

            <button>
              <EventOutlinedIcon style={{ color: " #B59410" }} />
              <span>Event</span>
            </button>

            <button>
              <ArticleOutlinedIcon style={{ color: " #FF7F7F" }} />
              <span>Write articles</span>
            </button>
          </div>
        </ShareBox>
        <Content>
          {props.loading && <img src="./images/icons8-refresh.gif" alt="" />}
          {props.articles.length > 0 &&
            props.articles.map((article, key) => (
              <Article key={key}>
         
                <SharedActor>
                  <a>
                    {article.actor.image ? (
                      <img src={article.actor.image} alt="" />
                    ) : (
                      <img src="/images/user.svg" alt="" />
                    )}
                    <div>
                      <span>{article.actor.title}</span>
                      <span>{article.actor.description}</span>
                      <span>
                        {console.log(props.articles.id)}
                        {article.actor.date.toDate().toLocaleDateString()}
                      </span>
                    </div>
                  </a>
                  <button>
                    <MoreHorizOutlinedIcon />
                  </button>
                </SharedActor>
                <Description>{article.description}</Description>
                <SharedImg>
                  <a>
                    {!article.sharedImg && article.video ? (
                      <ReactPlayer width={"100%"} url={article.video} />
                    ) : (
                      article.sharedImg && (
                        <img src={article.sharedImg} alt="" />
                      )
                    )}
                  </a>
                </SharedImg>
                <SocialCounts>
                  <li>
                    <button>
                      <ThumbUpIcon style={{ fontSize: "small" }} />
                      <span>75</span>
                    </button>
                  </li>
                  <li>
                    <a>{article.comments} comments (currently not working)</a>
                  </li>
                </SocialCounts>
                <SocialActions>
                  <button>
                    <ThumbUpIcon style={{ color: " #1565c0" }} />
                    <span>Like</span>
                  </button>
                  <button>
                    <CommentIcon style={{ color: " #1565c0" }} />
                    <span>Comments</span>
                  </button>
                  <button>
                    <ShareIcon style={{ color: " #1565c0" }} />
                    <span>Share</span>
                  </button>
                  <button>
                    <SendIcon style={{ color: " #1565c0" }} />
                    <span>Send</span>
                  </button>
                </SocialActions>
              </Article>
            ))}
        </Content>
        <PostModal ShowModal={ShowModal} handleClick={handleClick} />
      </Container>
    </>
  );
};

const Container = styled.div`
  grid-area: main;
`;

const CommonCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0/15%), 0 0 0 0 rgb(0 0 0/20%);
`;
const ShareBox = styled(CommonCard)`
  display: flex;
  flex-direction: column;
  color: #958b7b;
  margin: 0 0 8px;
  background: white;

  div {
    button {
      cursor: pointer;
      outline: none;
      color: rgba(0, 0, 0, 0.6);
      font-size: 14px;
      line-height: 1.5;
      cursor: pointer;
      min-height: 48px;
      background: transparent;
      border: none;
      display: flex;
      align-items: center;
      font-weight: 600;
      margin-left: 20px;
    }

    &:first-child {
      display: flex;
      align-items: center;
      padding: 8px 16px 0px 16px;
      img {
        width: 48px;
        border-radius: 50%;
        margin-right: 10px;
      }
      button {
        cursor: pointer;
        margin: 4px 0;
        flex-grow: 1;
        border-radius: 35px;
        padding-left: 16px;
        border: 1px solid rgba(0, 0, 0, 0.15);
        border-radius: 35px;
        background-color: white;
        text-align: left;
      }
    }

    &:nth-child(2) {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      padding-bottom: 4px;
      button {
        span {
          cursor: pointer;
          margin-left: 2px;
          color: #5a5a5a;
        }
      }
    }
  }
`;

const Article = styled(CommonCard)`
  padding: 0;
  margin: 0 0 8px;
  overflow: visible;
`;

const SharedActor = styled.div`
  padding-right: 40px;
  flex-wrap: no-wrap;
  padding: 12px 16px 0;
  margin-bottom: 8px;
  align-items: center;
  display: flex;
  a {
    margin-right: 12px;
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    text-decoration: none;
    img {
      width: 48px;
      height: 48px;
    }

    & > div {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      flex-basis: 0;
      margin-left: 8px;
      overflow: hidden;
      span {
        text-align: left;
        &:first-child {
          font-size: 14px;
          font-weight: 700;
          color: rgba(0, 0, 0, 1);
        }
        &:nth-child(n + 1) {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.6);
        }
      }
    }
  }

  button {
    cursor: pointer;
    position: absolute;
    right: 12px;
    top: 0;
    background: transparent;
    border: none;
    outline: none;
  }
`;

const Description = styled.div`
  padding: 0 16px;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.9);
  font-size: 14px;
  text-align: left;
`;
const SharedImg = styled.div`
  margin-top: 8px;
  width: 100%;
  display: block;
  position: relative;
  background-color: #f9fafb;
  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
`;

const SocialCounts = styled.ul`
  line-height: 1.3;
  display: flex;
  align-items: flex-start;
  overflow: auto;
  margin: 0 16px;
  padding: 8px 0;
  border-bottom: 1px solid #e9e5df;
  list-style: none;
  li {
    margin-right: 5px;
    font-size: 12px;
    button {
      cursor: pointer;
      display: flex;
    }
  }
`;

const SocialActions = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-start;
  margin: 0;
  min-height: 40px;
  padding: 4px 8px;
  button {
    display: inline-flex;
    cursor: pointer;
    align-items: center;
    padding: 8px;
    color: #0a66c2;
    border: none;
    background-color: white;
    @media (min-width: 768px) {
      span {
        margin-left: 8px;
      }
    }
  }
`;
const Content = styled.div`
  text-align: center;
  & > img {
    width: 30px;
  }
`;
const mapStateToProps = (state) => {
  return {
    loading: state.articleState.loading,
    user: state.userState.user,
    articles: state.articleState.articles,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getArticles: () => dispatch(getArticlesAPI()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Main);
