function BuscarCurso({ search, onSearchChange, onSearch, onClear }) {
  return (
    <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Buscar por nombre del curso"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSearch()}
      />
      <button onClick={onSearch}>Buscar</button>
      <button onClick={onClear}>Limpiar</button>
    </div>
  );
}

export default BuscarCurso;