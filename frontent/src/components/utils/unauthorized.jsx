import { FaLock } from 'react-icons/fa';

export default function Unauthorize() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', color: 'red', fontSize: '1.25rem', gap: '16px' }}>
      <FaLock style={{ fontSize: '3rem' }} />
      <p>You do not have permission to access this page.</p>
    </div>
  );
}