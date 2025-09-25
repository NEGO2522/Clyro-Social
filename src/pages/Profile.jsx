import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { app } from '../firebase/firebase';

// Sample user data (in a real app, this would come from your backend)
const sampleUser = {
  id: 1,
  name: 'John Doe',
  username: 'johndoe',
  avatar: '👨‍💻',
  coverPhoto: 'https://images.unsplash.com/photo-1485470733090-0aae1788d5af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1517&q=80',
  bio: 'Frontend Developer | React Enthusiast | Coffee Lover | Building amazing web experiences',
  location: 'San Francisco, CA',
  website: 'johndoe.dev',
  joinDate: 'Joined June 2023',
  following: 245,
  followers: 1280,
  isFollowing: false
};

// Sample user posts
const samplePosts = [
  {
    id: 1,
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
    content: 'Just published a new article about React performance optimization. Link in bio! #react #webdevelopment',
    image: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    likes: 89,
    comments: 12,
    shares: 7,
    timeAgo: '1d ago',
    isLiked: false
  }
];

const Profile = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const auth = getAuth(app);
  const [user, setUser] = useState(sampleUser);
  const [posts, setPosts] = useState(samplePosts);
  const [activeTab, setActiveTab] = useState('posts');
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: sampleUser.name,
    bio: sampleUser.bio,
    location: sampleUser.location,
    website: sampleUser.website
  });

  // In a real app, you would fetch the user data and posts here
  useEffect(() => {
    // Fetch user data based on username
    // const fetchUserData = async () => {
    //   try {
    //     const userData = await getUserByUsername(username);
    //     setUser(userData);
    //     const userPosts = await getUserPosts(userData.id);
    //     setPosts(userPosts);
    //   } catch (error) {
    //     console.error('Error fetching user data:', error);
    //     navigate('/not-found');
    //   }
    // };
    // fetchUserData();
  }, [username, navigate]);

  const handleFollow = () => {
    setUser(prev => ({
      ...prev,
      isFollowing: !prev.isFollowing,
      followers: prev.isFollowing ? prev.followers - 1 : prev.followers + 1
    }));
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

  const handleEditProfile = () => {
    if (isEditing) {
      // In a real app, you would save the changes to your backend here
      setUser(prev => ({
        ...prev,
        ...editData
      }));
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header - Same as Dashboard for consistency */}
      <header className="bg-gray-800 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-indigo-400">Clyro</Link>
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-gray-300 hover:text-white px-3 py-1">Home</Link>
            <Link to="/explore" className="text-gray-300 hover:text-white px-3 py-1">Explore</Link>
            <button
              onClick={() => signOut(auth).then(() => navigate('/login'))}
              className="px-4 py-1.5 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors text-sm"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Cover Photo */}
        <div className="relative h-48 md:h-64 bg-gray-800 rounded-t-lg overflow-hidden">
          <img 
            src={user.coverPhoto} 
            alt="Cover" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50"></div>
        </div>

        {/* Profile Header */}
        <div className="relative bg-gray-800 rounded-b-lg shadow-lg -mt-16 px-6 pb-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between">
            <div className="flex flex-col md:flex-row items-center md:items-end space-x-0 md:space-x-6">
              <div className="h-32 w-32 rounded-full border-4 border-gray-800 bg-gray-700 -mt-16 flex items-center justify-center text-5xl">
                {user.avatar}
              </div>
              <div className="mt-4 md:mt-0 text-center md:text-left">
                {isEditing ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      name="name"
                      value={editData.name}
                      onChange={handleInputChange}
                      className="bg-gray-700 text-white rounded px-3 py-1 w-full"
                    />
                    <input
                      type="text"
                      name="bio"
                      value={editData.bio}
                      onChange={handleInputChange}
                      className="bg-gray-700 text-white rounded px-3 py-1 w-full"
                    />
                    <input
                      type="text"
                      name="location"
                      value={editData.location}
                      onChange={handleInputChange}
                      placeholder="Location"
                      className="bg-gray-700 text-white rounded px-3 py-1 w-full text-sm"
                    />
                    <input
                      type="text"
                      name="website"
                      value={editData.website}
                      onChange={handleInputChange}
                      placeholder="Website"
                      className="bg-gray-700 text-white rounded px-3 py-1 w-full text-sm"
                    />
                  </div>
                ) : (
                  <>
                    <h1 className="text-2xl font-bold">{user.name}</h1>
                    <p className="text-gray-300">@{user.username}</p>
                    <p className="mt-2 text-gray-300">{user.bio}</p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-400">
                      {user.location && (
                        <div className="flex items-center">
                          <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {user.location}
                        </div>
                      )}
                      {user.website && (
                        <a 
                          href={`https://${user.website}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-indigo-400 hover:underline flex items-center"
                        >
                          <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                          </svg>
                          {user.website}
                        </a>
                      )}
                      <div>{user.joinDate}</div>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="flex space-x-3 mt-4 md:mt-0 justify-center md:justify-end">
              <button
                onClick={handleEditProfile}
                className={`px-4 py-1.5 rounded-md text-sm font-medium ${isEditing ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-700 hover:bg-gray-600'}`}
              >
                {isEditing ? 'Save Changes' : 'Edit Profile'}
              </button>
              {!isEditing && (
                <button
                  onClick={handleFollow}
                  className={`px-4 py-1.5 rounded-md text-sm font-medium ${user.isFollowing ? 'bg-gray-700 hover:bg-gray-600' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                >
                  {user.isFollowing ? 'Following' : 'Follow'}
                </button>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="flex justify-between md:justify-start md:space-x-8 mt-6 pt-4 border-t border-gray-700">
            <div className="text-center">
              <div className="text-xl font-bold">{formatNumber(posts.length)}</div>
              <div className="text-sm text-gray-400">Posts</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold">{formatNumber(user.followers)}</div>
              <div className="text-sm text-gray-400">Followers</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold">{formatNumber(user.following)}</div>
              <div className="text-sm text-gray-400">Following</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-700 mt-6">
          <button
            className={`px-4 py-3 font-medium text-sm ${activeTab === 'posts' ? 'text-indigo-400 border-b-2 border-indigo-500' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('posts')}
          >
            Posts
          </button>
          <button
            className={`px-4 py-3 font-medium text-sm ${activeTab === 'media' ? 'text-indigo-400 border-b-2 border-indigo-500' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('media')}
          >
            Media
          </button>
          <button
            className={`px-4 py-3 font-medium text-sm ${activeTab === 'likes' ? 'text-indigo-400 border-b-2 border-indigo-500' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('likes')}
          >
            Likes
          </button>
        </div>

        {/* Posts */}
        <div className="mt-4 space-y-4">
          {activeTab === 'posts' && posts.map(post => (
            <div key={post.id} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <div className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center text-xl">
                    {user.avatar}
                  </div>
                  <div>
                    <div className="font-medium">{user.name}</div>
                    <div className="text-xs text-gray-400">{post.timeAgo}</div>
                  </div>
                </div>
                <p className="mt-3">{post.content}</p>
                {post.image && (
                  <div className="mt-3 rounded-lg overflow-hidden">
                    <img 
                      src={post.image} 
                      alt="Post" 
                      className="w-full h-auto max-h-96 object-cover"
                    />
                  </div>
                )}
                <div className="flex justify-between mt-4 pt-3 border-t border-gray-700 text-gray-400">
                  <button 
                    className={`flex items-center space-x-1 ${post.isLiked ? 'text-red-500' : 'hover:text-gray-300'}`}
                    onClick={() => handleLike(post.id)}
                  >
                    <svg className="h-5 w-5" fill={post.isLiked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span>{post.likes}</span>
                  </button>
                  <button className="flex items-center space-x-1 hover:text-gray-300">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span>{post.comments}</span>
                  </button>
                  <button className="flex items-center space-x-1 hover:text-gray-300">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    <span>{post.shares}</span>
                  </button>
                  <button className="flex items-center space-x-1 hover:text-gray-300">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          {activeTab === 'media' && (
            <div className="text-center py-10 text-gray-400">
              <svg className="h-12 w-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p>No media to show</p>
            </div>
          )}
          
          {activeTab === 'likes' && (
            <div className="text-center py-10 text-gray-400">
              <svg className="h-12 w-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
              </svg>
              <p>No likes yet</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Profile;