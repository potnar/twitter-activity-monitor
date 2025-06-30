import ActivityForm from './components/ActivityForm';
import ProfilesList from './components/ProfilesList';
import AlertsList from './components/AlertsList';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function App() {
  const [profiles, setProfiles] = useState([]);

  const fetchProfiles = async () => {
    const res = await axios.get('http://localhost:3001/profiles');
    setProfiles(res.data);
  };

  useEffect(() => {
    fetchProfiles();
  }, []);


  return (
    < div className="container mx-auto pt-6" >
      <h1 className="text-3xl font-bold mb-6">Twitter Activity Monitor</h1>
      <ActivityForm onSubmitted={fetchProfiles} />
      <ProfilesList profiles={profiles} />
      <AlertsList />
    </div >
  );
}
