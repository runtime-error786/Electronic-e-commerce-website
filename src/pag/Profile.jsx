import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Se } from '../Action';
import { useDispatch } from 'react-redux';

function UserProfile() {
   
      
   let di = useDispatch();
  const [profileData, setProfileData] = useState("");
  di(Se("n"));
  
  useEffect(() => {
    // Fetch profile data when the component mounts
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      // Make a GET request to the /profile endpoint
      const response = await axios.get('http://localhost:2001/profile', {
        withCredentials: true, // Send cookies with the request
      });
      // If the request is successful, update the state with the profile data
      setProfileData(response.data);
     
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };
  const transformedData = profileData?.categoryQuantities?.map(category => ({
    name: category._id,
    qty: category.totalQuantity,
    pv: 0, // Add other properties if needed
    amt: 0, // Add other properties if needed
  })) || [];
  const getRandomColor = () => {
    // Generate a random hex color
    return '#' + Math.floor(Math.random()*16777215).toString(16);
  };
  const categoryColors = transformedData.map(() => getRandomColor());

  return (
    <div>
     
          <div className="i45">
          <p className="i2q">Name: {profileData.fname} {profileData.lname}</p>
          <p className="i2q">Phone: {profileData.phone}</p>
          <p className="i2q">City: {profileData.city}</p>
          <p className="i2q">Country: {profileData.country}</p>
          <p className="i2q">Email: {profileData.email}</p>
          <p className="i2q">Role: {profileData.role}</p>
          </div>
          <div className="i3q">
          <img
              
              src={`http://localhost:2001${profileData.profilePic}`}
              alt="Profile"
              style={{ maxWidth: '200px', maxHeight: '200px' ,borderRadius: "30px"}}
            />
          </div>
          <div className="l1">
          <i className="fa-solid fa-user fa-2xl hi"  ></i>
          <h1 className="hw">{profileData.tc}</h1>
          </div>

          
          <div className="l2">
          <i class="fa-solid fa-sack-dollar fa-2xl hj"></i>
          <h1 className="hs">{profileData.price}</h1>
          </div>
          <div className='lp'>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={300}
            height={300}
            data={transformedData} // Use fetched categoryQuantities data
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="qty" fill={getRandomColor()} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export {UserProfile};
