import { FaSearch } from 'react-icons/fa';

export default function SearchBooks({ search, setSearch }) {
  return (
    <div style={{ padding: '4px', backgroundColor: '#fff', marginTop: '12px' }}>
      <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', borderRadius: '4px', padding: '8px', backgroundColor: '#f9f9f9' }}>
        <FaSearch style={{ color: '#666', marginRight: '8px' }} />
        <input
          type="text"
          placeholder="Search user by name or Id..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: '100%', background: 'transparent', outline: 'none', fontSize: '0.875rem' }}
        />
      </div>
    </div>
  );
}