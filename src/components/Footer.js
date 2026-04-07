export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="footer-logo">Fayyadh<span>Tzy</span>.</div>
      <div className="footer-text" style={{ marginTop: '.5rem' }}>
        © {year} · Berani bermimpi, berani berkarya.
      </div>
      <div className="footer-text" style={{ marginTop: '.25rem', color: 'rgba(61,127,255,.35)' }}>
        Built with React · Laravel · Linux
      </div>
    </footer>
  );
}