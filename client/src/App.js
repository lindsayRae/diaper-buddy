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
function App() {
  const posts = usePosts();
  return (
    <div className='App'>
      {posts.map((post) => (
        <h2>{post.title}</h2>
      ))}
    </div>
  );
}

export default App;
