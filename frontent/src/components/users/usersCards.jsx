import React from 'react';
import { FaUser, FaEye, FaEdit, FaTrash } from 'react-icons/fa';

export default function UserCard({ users = [], setModalForm, setEditUser, handleDelete, userRole }) {
  return (
    <div style={{ marginTop: '20px' }}>
      <table style={{ width: '100%', fontSize: '0.875rem', textAlign: 'center', color: '#333' }}>
        <thead>
          <tr>
            <th style={{ padding: '2px', textAlign: 'left' }}>User ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            if (!user) return null;
            const key = user._id || user.email || index;
            return (
              <tr key={key} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '8px', textAlign: 'left', width: '80px' }}>
                  {user._id ?? 'N/A'}
                </td>
                <td style={{ display: 'flex', alignItems: 'center', padding: '8px', textAlign: 'left' }}>
                  <FaUser style={{ color: '#999', marginRight: '6px' }} />
                  <span>{user.username ?? 'Unknown'}</span>
                </td>
                <td style={{ padding: '8px', textAlign: 'left' }}>
                  {user.email ?? 'N/A'}
                </td>
                <td style={{ padding: '8px', textAlign: 'center' }}>
                  {user.role ?? 'N/A'}
                </td>
                <td style={{ display: 'flex', justifyContent: 'center', gap: '12px', padding: '8px' }}>
                  <FaEye style={{ cursor: 'pointer' }} onClick={() => alert('View details not implemented')} />
                  {userRole === 'librarian' && (
                    <>
                      <FaEdit
                        style={{ cursor: 'pointer', color: '#666' }}
                        onClick={() => {
                          setEditUser(user);
                          setModalForm(true);
                        }}
                      />
                      <FaTrash
                        style={{ cursor: 'pointer', color: '#666' }}
                        onClick={() => handleDelete(user._id)}
                      />
                    </>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}