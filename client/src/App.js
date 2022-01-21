import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

const usePosts = () => {
  const [post, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api');
      const data = await res.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);
  return post;
};

const usePosts2 = () => {
  const [post2, setPosts2] = useState([]);

  useEffect(() => {
    const fetchPosts2 = async () => {
      const res2 = await fetch('/api');
      const data2 = await res2.json();
      setPosts2(data2);
    };
    fetchPosts2();
  }, []);
  return post2;
};
function App() {
  const posts = usePosts();
  const posts2 = usePosts2();
  return (
    <div className='App'>
      {posts.map((post) => (
        <h2>{post.title}</h2>
      ))}
      {posts2.map((post2) => (
        <p>{post2.title}</p>
      ))}
    </div>
  );
}

export default App;
