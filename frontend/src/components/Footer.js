function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <p className="footer__copyrights">&copy;2021-{currentYear} Mesto Russia</p>
    </footer>
  )
}

export default Footer;