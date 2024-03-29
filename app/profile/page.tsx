'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useEffect, useState } from 'react';

const ProfilePage = () => {
  const [privateKey, setPrivateKey] = useState('');

  useEffect(() => {
    const storedPrivateKey = localStorage.getItem('ai-home-wallet-key');
    if (storedPrivateKey) {
      setPrivateKey(storedPrivateKey);
    }
  }, []);

  const handlePrivateKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrivateKey(e.target.value);
  };

  const handleSavePrivateKey = () => {
    localStorage.setItem('ai-home-wallet-key', privateKey);
  };

  const handleLogPrivateKey = () => {
    const storedPrivateKey = localStorage.getItem('ai-home-wallet-key');
    console.log('Stored Private Key:', storedPrivateKey);
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <h1 className='text-3xl font-bold mb-4'>Profile Page</h1>
      <div className='mb-4'>
        <Input
          type='text'
          placeholder='Enter your private key'
          value={privateKey}
          onChange={handlePrivateKeyChange}
        />
      </div>
      <div className='mb-4'>
        <Button onClick={handleSavePrivateKey}>Save Private Key</Button>
      </div>
      {/* <div>
        <Button onClick={handleLogPrivateKey}>Log Private Key</Button>
      </div> */}
    </div>
  );
};

export default ProfilePage;
