import Link from "next/link";

const Footer = () => {
  return (
    <footer className="footer">
      <ul className="footer__links-list">
        <li className="footer__links-list-item">
          <Link
            href="/about-us"
            className="footer__links-list-item-link typography__display--2 typography__weight--600 typography__color--dark-bg-3"
          >
            About Us
          </Link>
        </li>
        {/* <li className="footer__links-list-item">
          <Link
            href="/privacy"
            className="footer__links-list-item-link typography__display--2 typography__weight--600 typography__color--dark-bg-3"
          >
            Privacy
          </Link>
        </li> */}
      </ul>

      <p className="typography__label--3 typography__color--dark-bg-3">
        Copyright © 2023 DataBeast. All Rights Reserved
      </p>

      <ul className="footer__links-list">
        <li className="footer__links-list-item">
          {/* <Link
            href="/"
            className="footer__links-list-item-link typography__display--2 typography__weight--600 typography__color--dark-bg-3"
          >
            email
          </Link>
        </li>
        <li className="footer__links-list-item">
          <Link
            href="/"
            className="footer__links-list-item-link typography__display--2 typography__weight--600 typography__color--dark-bg-3"
          >
            discord
          </Link>
        </li>
        <li className="footer__links-list-item">
          <Link
            href="/"
            className="footer__links-list-item-link typography__display--2 typography__weight--600 typography__color--dark-bg-3"
          >
            instagram
          </Link>
        </li>
        <li className="footer__links-list-item">
          <Link
            href="/"
            className="footer__links-list-item-link typography__display--2 typography__weight--600 typography__color--dark-bg-3"
          >
            twitter
          </Link> */}
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
