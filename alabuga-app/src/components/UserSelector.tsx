import React from 'react';

const EDU_USERS = [
  { id: '1', name: 'User 1' },
  { id: '2', name: 'User 2' }, 
  { id: '3', name: 'User 3' }
];

const HR_USERS = [
  { id: 'a1b2c3d4-1234-5678-90ab-cdef12345678', name: 'HR User 1' }
];

export const UserSelector: React.FC = () => {
  const currentEduUser = localStorage.getItem('eduUserId') || '1';
  const currentHrUser = localStorage.getItem('hrUserId') || HR_USERS[0].id;

  const handleEduUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    localStorage.setItem('eduUserId', e.target.value);
    window.location.reload();
  };

  const handleHrUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    localStorage.setItem('hrUserId', e.target.value);
    window.location.reload();
  };

  return (
    <div style={{ position: 'fixed', top: 10, right: 10, background: 'white', padding: 10, border: '1px solid #ccc', zIndex: 1000 }}>
      <div>
        <label>Edu User: </label>
        <select value={currentEduUser} onChange={handleEduUserChange}>
          {EDU_USERS.map(user => (
            <option key={user.id} value={user.id}>{user.name}</option>
          ))}
        </select>
      </div>
      <div style={{ marginTop: 5 }}>
        <label>HR User: </label>
        <select value={currentHrUser} onChange={handleHrUserChange}>
          {HR_USERS.map(user => (
            <option key={user.id} value={user.id}>{user.name}</option>
          ))}
        </select>
      </div>
    </div>
  );
};