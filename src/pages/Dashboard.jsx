import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { app } from '../firebase/firebase';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Sample user data
const sampleUsers = [
  { id: 1, name: 'John Doe', username: 'johndoe', avatar: '👨‍💻' },
  { id: 2, name: 'Jane Smith', username: 'janesmith', avatar: '👩‍🎨' }, 
  { id: 3, name: 'Alex Johnson', username: 'alexj', avatar: '🧑‍💼' },
];

// Sample posts data
const samplePosts = [
  {
    id: 1,
    user: sampleUsers[0],
    content: 'Just finished my new project! Check it out and let me know what you think. #coding #webdev',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    likes: 42,
    comments: 8,
    shares: 3,
    timeAgo: '2h ago',
    isLiked: false
  },
  {
    id: 2,
    user: sampleUsers[1],
    content: 'Beautiful day for a hike! 🏞️ Nature always helps me clear my mind.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    likes: 128,
    comments: 24,
    shares: 15,
    timeAgo: '5h ago',
    isLiked: true
  },
  {
    id: 3,
    user: sampleUsers[2],
    content: 'Just published a new article about React performance optimization. Link in bio! #react #webdevelopment',
    image: 'https://mediapool.bmwgroup.com/cache/P9/202308/P90519236/P90519236-rolls-royce-la-rose-noire-droptail-600px.jpg',
    likes: 89,
    comments: 12,
    shares: 7,
    timeAgo: '1d ago',
    isLiked: false
  },
  {
    id: 4,
    user: { id: 4, name: 'Sarah Chen', username: 'sarahdev', avatar: '👩‍💻' },
    content: 'Just completed a 10-hour coding session. My brain is fried but the app is coming along nicely! #codingmarathon #webdevelopment',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    likes: 156,
    comments: 23,
    shares: 7,
    timeAgo: '5h ago',
    isLiked: false
  },
  {
    id: 5,
    user: { id: 5, name: 'Mike Johnson', username: 'mikej', avatar: '🧑‍💼' },
    content: 'The new React 18 features are amazing! The concurrent rendering is a game changer for performance. #reactjs #frontend',
    image: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    likes: 89,
    comments: 14,
    shares: 9,
    timeAgo: '7h ago',
    isLiked: false
  },
  {
    id: 6,
    user: { id: 6, name: 'Emma Wilson', username: 'emmacodes', avatar: '👩‍💻' },
    content: 'After 6 months of learning, I finally landed my first developer job! So excited for this new chapter. #codingjourney #webdev #careerchange',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80',
    likes: 342,
    comments: 47,
    shares: 28,
    timeAgo: '1d ago',
    isLiked: true
  }
];

const Dashboard = () => {
  const navigate = useNavigate();
  const auth = getAuth(app);
  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState(samplePosts);
  const [newComment, setNewComment] = useState({});
  const mainContentRef = useRef(null);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleLike = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !post.isLiked
        };
      }
      return post;
    }));
  };

  const handleCommentChange = (postId, value) => {
    setNewComment({
      ...newComment,
      [postId]: value
    });
  };

  const handleAddComment = (postId) => {
    if (!newComment[postId]?.trim()) return;
    
    // In a real app, you would add the comment to your database here
    console.log(`New comment on post ${postId}:`, newComment[postId]);
    
    // For demo purposes, we'll just clear the input
    setNewComment({
      ...newComment,
      [postId]: ''
    });
  };

  // Filter posts based on search query
  const filteredPosts = posts.filter(post => 
    post.user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    post.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Suggested users to follow (excluding current user)
  const suggestedUsers = sampleUsers.filter(user => user.id !== 1);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <header className="bg-gray-800 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold text-indigo-400">Clyro</h1>
          
          {/* Search Bar */}
          <div className="relative w-1/3">
            <input
              type="text"
              placeholder="Search posts and users..."
              className="w-full px-4 py-2 rounded-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg 
              className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="text-gray-300 hover:text-white">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <button className="text-gray-300 hover:text-white">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-1.5 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors text-sm"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main 
        ref={mainContentRef}
        className="h-[calc(100vh-64px)] max-w-[1600px] mx-auto px-4 grid grid-cols-1 md:grid-cols-12 gap-4 overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {/* Left Sidebar - User Profile */}
        <div className="hidden md:flex flex-col md:col-span-2 h-full overflow-y-auto">
          <div className="bg-gray-800 rounded-lg shadow-lg p-4 sticky top-4 border border-gray-700">
            <div className="flex items-center space-x-4 mb-4">
              <div className="text-4xl">👤</div>
              <div>
                <h2 className="font-semibold">Your Name</h2>
                <p className="text-sm text-gray-500">@yourusername</p>
              </div>
            </div>
            <div className="flex justify-between text-sm text-gray-600 border-t border-b border-gray-700 py-3 my-3">
              <div className="text-center">
                <div className="font-semibold">1,234</div>
                <div>Posts</div>
              </div>
              <div className="text-center">
                <div className="font-semibold">5.6K</div>
                <div>Followers</div>
              </div>
              <div className="text-center">
                <div className="font-semibold">234</div>
                <div>Following</div>
              </div>
            </div>
            <button className="w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-1.5 px-4 rounded-md text-sm transition-colors">
              Edit Profile
            </button>
          </div>

          {/* Spacer */}
          <div className="h-6"></div>

          {/* Suggested Users */}
          <div className="bg-gray-800 rounded-lg shadow-lg p-4 mt-4 border border-gray-700">
            <h3 className="font-semibold text-gray-300 mb-3">People you may know</h3>
            <div className="space-y-3">
              {suggestedUsers.map(user => (
                <div key={user.id} className="flex items-center justify-between">
                  <Link to={`/${user.username}`} className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded-lg">
                    <div className="text-2xl">{user.avatar}</div>
                    <div>
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-gray-400">@{user.username}</p>
                    </div>
                  </Link>
                  <button className="text-xs bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded-md transition-colors">
                    Follow
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Feed */}
        <div 
          className="md:col-span-7 h-full overflow-y-auto px-2 py-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          id="posts-container"
        >
          {/* Create Post */}
          <div className="bg-gray-800 rounded-lg shadow-lg p-4 mb-6 border border-gray-700">
            <div className="flex space-x-3">
              <div className="text-2xl">👤</div>
              <input
                type="text"
                placeholder="What's on your mind?"
                className="flex-1 bg-gray-700 text-white rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400"
                onClick={() => document.getElementById('create-post-modal').showModal()}
              />
            </div>
            <div className="flex justify-between mt-3 pt-3 border-t">
              <button className="flex items-center text-gray-300 hover:bg-gray-700 px-3 py-1.5 rounded-md">
                <svg className="h-5 w-5 mr-1 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Photo
              </button>
              <button className="flex items-center text-gray-300 hover:bg-gray-700 px-3 py-1.5 rounded-md">
                <svg className="h-5 w-5 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Video
              </button>
              <button className="flex items-center text-gray-300 hover:bg-gray-700 px-3 py-1.5 rounded-md">
                <svg className="h-5 w-5 mr-1 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Feeling
              </button>
            </div>
          </div>

          {/* Posts */}
          {filteredPosts.map(post => (
            <div key={post.id} className="bg-gray-800 rounded-lg shadow-lg mb-6 overflow-hidden border border-gray-700">
              {/* Post Header */}
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">{post.user.avatar}</div>
                    <div>
                      <Link to={`/${post.user.username}`} className="hover:underline">
                        <h3 className="font-semibold">{post.user.name}</h3>
                      </Link>
                      <p className="text-xs text-gray-400">
                        <Link to={`/${post.user.username}`} className="hover:underline">
                          @{post.user.username} · {post.timeAgo}
                        </Link>
                      </p>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                    </svg>
                  </button>
                </div>
                <p className="mt-3 text-gray-200">{post.content}</p>
              </div>
              
              {/* Post Image */}
              {post.image && (
                <div className="w-full h-80 bg-gray-700 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt="Post content" 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              {/* Post Stats */}
              <div className="px-4 py-2 border-t border-b border-gray-700 text-sm text-gray-400 flex justify-between">
                <div className="flex items-center">
                  <div className="flex -space-x-1">
                    <div className="h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">👍</div>
                    <div className="h-5 w-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs">❤️</div>
                    <div className="h-5 w-5 rounded-full bg-yellow-400 flex items-center justify-center text-white text-xs">😄</div>
                  </div>
                  <span className="ml-2">{post.likes}</span>
                </div>
                <div>
                  <span>{post.comments} comments • {post.shares} shares</span>
                </div>
              </div>
              
              {/* Post Actions */}
              <div className="px-4 py-2 flex justify-between border-b border-gray-700">
                <button 
                  className={`flex-1 flex items-center justify-center py-2 rounded-md hover:bg-gray-700 ${post.isLiked ? 'text-indigo-400' : 'text-gray-400'}`}
                  onClick={() => handleLike(post.id)}
                >
                  <svg className="h-5 w-5 mr-1" fill={post.isLiked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                  </svg>
                  Like
                </button>
                <button className="flex-1 flex items-center justify-center py-2 rounded-md hover:bg-gray-700 text-gray-400">
                  <svg className="h-5 w-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Comment
                </button>
                <button className="flex-1 flex items-center justify-center py-2 rounded-md hover:bg-gray-700 text-gray-400">
                  <svg className="h-5 w-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  Share
                </button>
              </div>
              
              {/* Comments Section */}
              <div className="p-4">
                {/* Comment Input */}
                <div className="flex items-start space-x-2 mt-2">
                  <div className="text-lg">👤</div>
                  <div className="flex-1 bg-gray-700 rounded-full px-4 py-2">
                    <div className="flex">
                      <input
                        type="text"
                        placeholder="Write a comment..."
                        className="flex-1 bg-transparent border-none focus:outline-none text-sm text-white placeholder-gray-400"
                        value={newComment[post.id] || ''}
                        onChange={(e) => handleCommentChange(post.id, e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleAddComment(post.id)}
                      />
                      <button 
                        className="text-indigo-400 font-medium text-sm hover:text-indigo-300"
                        onClick={() => handleAddComment(post.id)}
                      >
                        Post
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Sidebar - Pages to Follow */}
        <div className="hidden md:flex flex-col md:col-span-2 h-full overflow-y-auto">
          <div className="space-y-4 mt-8">
            <div className="bg-gray-800 rounded-lg shadow-lg p-4 border border-gray-700">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-gray-300">Pages to Follow</h3>
                <button className="text-xs text-indigo-400 hover:text-indigo-300">See All</button>
              </div>
              
              {/* Categories */}
              <div className="flex flex-wrap gap-2 mb-4">
                {['All', 'Tech', 'Sports', 'Music', 'Gaming', 'News'].map((category) => (
                  <button 
                    key={category}
                    className="text-xs bg-gray-700 hover:bg-gray-600 text-gray-200 px-3 py-1 rounded-full transition-colors"
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Pages List */}
              <div className="space-y-4">
                {[
                  { name: 'Tech Insights', category: 'Technology', followers: '1.2M', avatar: '💻' },
                  { name: 'Sports World', category: 'Sports', followers: '3.4M', avatar: '⚽' },
                  { name: 'Music Lovers', category: 'Music', followers: '5.7M', avatar: '🎵' },
                  { name: 'Gaming Universe', category: 'Gaming', followers: '2.1M', avatar: '🎮' },
                  { name: 'Daily News', category: 'News', followers: '4.5M', avatar: '📰' },
                ].map((page, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl bg-gray-700 w-10 h-10 rounded-full flex items-center justify-center">
                        {page.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{page.name}</p>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-400">{page.followers} members</span>
                        </div>
                      </div>
                    </div>
                    <button className="text-xs bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1 rounded-md transition-colors">
                      Join
                    </button>
                  </div>
                ))}
              </div>
              
              {/* Show More Button */}
              <button className="w-full mt-4 text-center text-sm text-indigo-400 hover:text-indigo-300">
                Show more pages
              </button>
            </div>

            {/* Additional Right Sidebar Content */}
            <div className="bg-gray-800 rounded-lg shadow-lg p-4 border border-gray-700">
              <h3 className="font-semibold text-gray-300 mb-3">Trending Now</h3>
              <div className="space-y-3">
                {[
                  { topic: '#ReactJS', posts: '45.6K' },
                  { topic: '#WebDev', posts: '32.1K' },
                  { topic: '#TechNews', posts: '28.9K' },
                ].map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium">{item.topic}</p>
                      <p className="text-xs text-gray-400">{item.posts} posts</p>
                    </div>
                    <button className="text-gray-400 hover:text-gray-200">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Create Post Modal */}
      <dialog id="create-post-modal" className="modal">
        <div className="modal-box max-w-2xl bg-gray-800 text-white">
          <h3 className="font-bold text-lg mb-4">Create Post</h3>
          <div className="flex items-start space-x-3 mb-4">
            <div className="text-2xl">👤</div>
            <div>
              <p className="font-medium">Your Name</p>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <button className="flex items-center px-2 py-1 bg-gray-100 rounded-md">
                  <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Friends
                </button>
              </div>
            </div>
          </div>
          <textarea 
            className="textarea w-full h-32 mb-4 bg-gray-700 border-gray-600 text-white placeholder-gray-400" 
            placeholder="What's on your mind?"
          ></textarea>
          <div className="bg-gray-700 rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">Add to your post</span>
              <div className="flex space-x-2">
                <button className="p-2 rounded-full hover:bg-gray-600">
                  <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </button>
                <button className="p-2 rounded-full hover:bg-gray-600">
                  <svg className="h-5 w-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
                <button className="p-2 rounded-full hover:bg-gray-600">
                  <svg className="h-5 w-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className="modal-action">
            <button className="btn bg-indigo-600 hover:bg-indigo-700 border-none text-white">Post</button>
            <button className="btn bg-gray-600 hover:bg-gray-500 border-none text-white" onClick={() => document.getElementById('create-post-modal').close()}>Close</button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Dashboard;