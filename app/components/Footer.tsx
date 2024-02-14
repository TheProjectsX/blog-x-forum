const Footer = (props: any) => {
  return (
    <footer
      className="footer footer-center p-10 bg-base-200 text-base-content rounded"
      {...props}
    >
      <nav className="grid grid-flow-col gap-4">
        <a className="link link-hover">Blog</a>
        <a className="link link-hover">Forum</a>
        <a className="link link-hover">About</a>
      </nav>
      <aside>
        <p>Copyright © 2024@TheProjectsX - All Rights Reserved</p>
      </aside>
    </footer>
  );
};

export default Footer;
