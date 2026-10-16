
function Header({ titulo }) {
  return (
    <header className="topbar">
      <div>
        <p className="eyebrow">ESPACIO ACADÉMICO</p>
        <h2>{titulo}</h2>
      </div>

      <span className="status-badge">Mi espacio</span>
    </header>
  )
}

export default Header
