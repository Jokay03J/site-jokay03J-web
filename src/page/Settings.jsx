import React from 'react';
import NavBar from '../component/NavBar';
import SettingsForm from '../component/SettingsForm';

const Settings = () => {
  return (
    <div className='bg-stone-100'>
      <NavBar/>
      <SettingsForm/>
    </div>
  );
};

export default Settings;