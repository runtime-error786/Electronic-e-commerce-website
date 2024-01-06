import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Se } from '../Action';
import { useDispatch,useSelector } from 'react-redux';
function CProfile() {
  let di = useDispatch();
  di(Se("n"));
      
   
  const [profileData, setProfileData] = useState("");

  
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
     
          <div className="i45a">
          <p className="i2qa">Name: {profileData.fname} {profileData.lname}</p>
          <p className="i2qa">Phone: {profileData.phone}</p>
          <p className="i2qa">City: {profileData.city}</p>
          <p className="i2qa">Country: {profileData.country}</p>
          <p className="i2qa">Email: {profileData.email}</p>
          <p className="i2qa">Role: {profileData.role}</p>
          </div>
          <div className="i3qa">
          <img
              
              src={`http://localhost:2001${profileData.profilePic}`}
              alt="Profile"
              style={{ maxWidth: '200px', maxHeight: '200px' ,borderRadius: "30px"}}
            />
          </div>
          <div className='lpa'>
        
      </div>
    </div>
  );
}

export {CProfile};
