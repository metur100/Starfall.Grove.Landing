import site from '../../site.json';
import { Address, Email } from './Layout';

export default function Imprint() {
  return (
    <>
      <p className="updated">Legal notice (Impressum) under § 5 DDG</p>

      <h2>Publisher</h2>
      <Address />

      <h2>Contact</h2>
      <p>Email: <Email /></p>

      <h2>Responsible for the content</h2>
      <p>Under § 18 (2) MStV: {site.developer}, address as above.</p>

      <h2>Consumer dispute resolution</h2>
      <p>We are neither obliged nor willing to take part in dispute resolution proceedings before a consumer arbitration board.</p>

      <h2>Liability for links</h2>
      <p>This website contains links to external websites, such as the app stores. We have no influence on their content, and their providers are responsible for it. When we set the links, we found no apparent violations of the law. If we become aware of any, we will remove the link.</p>
    </>
  );
}
