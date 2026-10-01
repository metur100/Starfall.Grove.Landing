import { Email, Publisher, updated } from '../Layout';

export default function Privacy() {
  return (
    <>
      <p className="updated">Last updated: {updated()}</p>

      <div className="summary">
        <p><strong>In short:</strong> Starfall Grove does not collect any personal data. There are no accounts, no ads, no analytics and no tracking. Your progress is saved only on your own device, and we never receive it.</p>
      </div>

      <p>This policy explains what happens to your data when you play Starfall Grove, whether in a web browser, as the Android app from Google Play or as the iOS app from the App Store, and when you visit this website. Together these are called "the game" below.</p>

      <h2>1. Who is responsible</h2>
      <p>The game is made and published by:</p>
      <Publisher />

      <h2>2. What the game saves on your device</h2>
      <p>To remember your adventure, the game uses your browser's or app's local storage on your own device. This data never leaves your device, and nobody else can see it, including us. It contains:</p>
      <ul>
        <li><b>Your progress</b> for each hero: level, experience, gold, bag and gear, quests, achievements, mounts and chapter stars.</li>
        <li><b>Your settings</b>: sound volumes, graphics quality, key bindings and the hero you picked last.</li>
        <li><b>The game files</b>, so it can start and play without a connection (an offline cache kept by the browser or app).</li>
      </ul>
      <p>None of this contains your name, email, contacts, location or any other personal data. You can delete it at any time by clearing the site data for the game in your browser, or by uninstalling the app.</p>

      <h2>3. What we do not collect</h2>
      <p>The game has no user accounts and no sign-in. It contains no advertising, no analytics or statistics tools, no social media plug-ins and no tracking of any kind. It does not ask for access to your location, contacts, photos, camera or microphone. The game makes no network requests of its own except to load its own files, for example the hero intro films.</p>

      <h2>4. Backups you make</h2>
      <p>In Settings you can <b>export</b> a backup file of your saves, or <b>import</b> one. The file is created on your device and read on your device. It goes wherever you choose to put it, and it is never sent to us.</p>

      <h2>5. Hosting of the website and the browser version</h2>
      <p>This website and the browser version of the game are hosted on <b>GitHub Pages</b>, a service of GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA. When you open a page, your browser connects to GitHub's servers. For this to work, and for security, GitHub processes technical connection data such as your IP address, the date and time, the requested file and your browser type, and it may keep these in server logs. We do not have access to these logs. GitHub may process this data in the USA. For details see the <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" rel="noopener">GitHub Privacy Statement</a>.</p>
      <p>The legal basis is our legitimate interest in delivering the game and this website reliably and securely (Art. 6(1)(f) GDPR). The fonts are delivered together with the game from the same place, so no request goes to Google Fonts or any other third party.</p>

      <h2>6. App stores</h2>
      <p>If you download the game from <b>Google Play</b> or the <b>Apple App Store</b>, the download, any purchase and your store account are handled by Google or Apple under their own privacy policies. Stores may give developers anonymous, combined statistics such as the number of installs, or crash reports if you have allowed that in your device settings. These do not tell us who you are.</p>
      <ul>
        <li>Google: <a href="https://policies.google.com/privacy" rel="noopener">policies.google.com/privacy</a></li>
        <li>Apple: <a href="https://www.apple.com/legal/privacy/" rel="noopener">apple.com/legal/privacy</a></li>
      </ul>

      <h2>7. Children</h2>
      <p>Starfall Grove is a storybook adventure that people of all ages can play. Because the game collects no personal data from anyone, it collects none from children either.</p>

      <h2>8. Your rights</h2>
      <p>Under the GDPR and similar laws you have the right to access your personal data and to have it corrected or erased. You can also restrict or object to its processing, receive it in a portable form, and complain to a data protection supervisory authority. Because we hold no personal data about players, a request to us will usually find nothing. You are still welcome to contact us at any time.</p>

      <h2>9. Changes to this policy</h2>
      <p>If the game ever starts handling data differently, for example by adding online features, we will update this policy before that change goes live, and change the date at the top.</p>

      <h2>10. Contact</h2>
      <p>If you have questions about privacy, email <Email />.</p>
    </>
  );
}
