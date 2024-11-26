"use client";
import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, Button, Input, Avatar } from '@nextui-org/react';
import axios from 'axios';

const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState({
    _id: '',
    name: '',
    department: '',
    email: '',
    role: '',
  });

  useEffect(() => {
    const storedProfile = sessionStorage.getItem('userProfile');
    if (storedProfile) {
      const profile = JSON.parse(storedProfile);
      setUserProfile(profile);
      setUpdatedProfile(profile);
    } else {
      // Use dummy data if no profile is found
      const dummyProfile = {
        name: 'John Doe',
        department: 'Agriculture',
        email: 'johndoe@example.com',
      };
      setUserProfile(dummyProfile);
      setUpdatedProfile(dummyProfile);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProfile({
      ...updatedProfile,
      [name]: value,
    });
  };

  const handleSave = async () => {
    if (userProfile) {
      const role = userProfile.role === "admin" || userProfile.role === "superadmin" ? "faculty" : userProfile.role;
      const { _id } = userProfile;
      try {
        await axios.put(`/api/${role}?_id=${_id}`, updatedProfile);
        setUserProfile(updatedProfile);
        sessionStorage.setItem('userProfile', JSON.stringify(updatedProfile));
        setIsEditing(false);
      } catch (error) {
        console.error("Error updating user profile:", error);
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen bg-gradient-to-br from-green-400 to-green-200"> 
      <Card className="w-full max-w-4xl h-auto overflow-hidden shadow-lg rounded-lg bg-white">
        <CardHeader className="border-b border-gray-200 pb-6 mb-6">
          <h4 className="text-3xl font-bold text-gray-800">
            {userProfile ? (
              userProfile.role === 'admin' ? 'Admin Profile' :
              userProfile.role === 'faculty' ? 'Faculty Profile' :
              userProfile.role === 'superadmin' ? "Superadmin Profile" :
              'Your Profile'
            ) : 'Loading...'}
          </h4>
        </CardHeader>

        <CardBody className="flex flex-row p-6 space-x-8">
          {/* Left side for Avatar */}
          <div className="flex-shrink-0 w-1/3 flex justify-center">
            <Avatar
              src="/avtar.jpg"
              size="xl"
              className="bg-gradient-to-br from-[#FFB457] to-[#FF705B] text-black/120"
              style={{ width: '200px', height: '200px', borderRadius: '50%' }}
            />
          </div>

          {/* Right side for Profile Details */}
          <div className="w-2/3 flex flex-col space-y-6">
            {isEditing ? (
              <>
                <Input
                  fullWidth
                  label="Name"
                  name="name"
                  size='md'
                  variant='bordered'
                  value={updatedProfile.name}
                  onChange={handleInputChange}
                />
                <Input
                  fullWidth
                  label="Department"
                  name="department"
                  size='md'
                  variant='bordered'
                  value={updatedProfile.department}
                  onChange={handleInputChange}
                />
                <Input
                  fullWidth
                  label="Email"
                  name="email"
                  size='md'
                  variant='bordered'
                  value={updatedProfile.email}
                  onChange={handleInputChange}
                />
                <div className="flex justify-end space-x-4">
                  <Button auto size='md' onClick={handleSave} variant='solid' color="primary">
                    Save
                  </Button>
                  <Button auto size='md' variant='ghost' color='error' onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                </div>
              </>
            ) : (
              <>
                {userProfile ? (
                  <>
                    <p className="text-lg text-gray-700"><strong>Name:</strong> {userProfile.name}</p>
                    <p className="text-lg text-gray-700"><strong>Department:</strong> {userProfile.department}</p>
                    <p className="text-lg text-gray-700"><strong>Email:</strong> {userProfile.email}</p>
                    <div className="flex justify-end">
                      <Button auto size="md" variant='ghost' color='primary' onClick={() => setIsEditing(true)}>
                        Edit Profile
                      </Button>
                    </div>
                  </>
                ) : (
                  <p>Loading profile...</p>
                )}
              </>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Profile;
