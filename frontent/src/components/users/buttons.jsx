function Button({ children, onClick, type = 'button', icon = null }) {
  return (
    <button
      type={type}
      onClick={onClick}
      style={{
        padding: '6px 12px',
        color: 'white',
        backgroundColor: '#007bff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
      }}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
}

export default Button;