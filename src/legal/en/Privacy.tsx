import site from '../../../site.json';
import { Email, Publisher, updated } from '../Layout';

export default function Privacy() {
  return (
    <>
      <p className="updated">Last updated: {updated()}</p>

      <div className="summary">
        <p><strong>In short:</strong> Starfall Grove, the story game, collects no personal data. Your progress is saved only on your own device, and we never receive it. <b>Mini Rift</b>, our online battle game, has accounts: we keep your username, email, a hash of your password, your game progress, friends and match results on our server. Chat is passed on, not stored. Neither game has ads, analytics or tracking, and you can delete your Mini Rift account at any time.</p>
      </div>

      <p>This policy explains what happens to your data when you play <b>Starfall Grove</b> or <b>Mini Rift</b>, whether in a web browser, as an Android app from Google Play or as an iOS app from the App Store, and when you visit this website. Together these are called "the games" below.</p>

      <h2>1. Who is responsible</h2>
      <p>The games are made and published by:</p>
      <Publisher />

      <h2>2. What Starfall Grove saves on your device</h2>
      <p>To remember your adventure, Starfall Grove uses your browser's or app's local storage on your own device. This data never leaves your device, and nobody else can see it, including us. It contains:</p>
      <ul>
        <li><b>Your progress</b> for each hero: level, experience, gold, bag and gear, quests, achievements, mounts and chapter stars.</li>
        <li><b>Your settings</b>: sound volumes, graphics quality, key bindings and the hero you picked last.</li>
        <li><b>The game files</b>, so it can start and play without a connection (an offline cache kept by the browser or app).</li>
      </ul>
      <p>None of this contains your name, email, contacts, location or any other personal data. You can delete it at any time by clearing the site data for the game in your browser, or by uninstalling the app.</p>

      <h2>3. What Starfall Grove does not collect</h2>
      <p>Starfall Grove has no user accounts and no sign-in. It contains no advertising, no analytics or statistics tools, no social media plug-ins and no tracking of any kind. It does not ask for access to your location, contacts, photos, camera or microphone. It makes no network requests of its own except to load its own files, for example the hero intro films.</p>

      <h2>4. Backups you make</h2>
      <p>In Starfall Grove's Settings you can <b>export</b> a backup file of your saves, or <b>import</b> one. The file is created on your device and read on your device. It goes wherever you choose to put it, and it is never sent to us.</p>

      <h2>5. Mini Rift (online battles)</h2>
      <p>Mini Rift is played with other people over the internet, so unlike Starfall Grove it needs accounts and a server. This is what it keeps there:</p>
      <ul>
        <li><b>Your account</b>: the username and email address you sign up with, and your password, stored only as a salted hash (we can't read it). The email is used for password reset links and to answer you if you write to us. We don't send newsletters.</li>
        <li><b>Your sign-ins</b>: each device you log in on keeps a random sign-in key; our server stores only a scrambled (hashed) form of it, so it can keep you logged in. Logging out forgets it; resetting your password signs every other device out.</li>
        <li><b>Your game profile</b>: your coins, player level and experience, the heroes and skins you own and wear, your charm, your ratings and ranks, your totals of games, wins, kills, deaths and assists, and your last twelve matches.</li>
        <li><b>Friends</b>: your friend list, friend requests and the players you blocked.</li>
        <li><b>Chat</b>: messages you write in rooms, matches or to a friend are passed on to the other players in real time and are <b>not stored</b>. Only when a player reports a message do we keep that message with the report (the reporter, the reported player, the reason and the time), to review it.</li>
        <li><b>Match records</b>: for each finished match, the room code, mode, map, winner and duration, and for every player in it the name, hero, team and match statistics.</li>
        <li><b>Connection data</b>: while you are connected, the server handles your IP address and what you do in a match. We use this only to run the game and do not store it. The hosting provider may keep technical logs for security.</li>
      </ul>
      <p>Other players see your username, hero, skin, level, rank, match statistics, online status (friends only) and what you write in chat. Please don't use your real name or anything personal as your username. Usernames with insults are refused and rude words in chat are masked. You can block and report any player.</p>
      <p><b>Why we process it:</b> to give you the game you signed up for, including accounts, matchmaking, friends, chat, your progress and the ladder (Art. 6(1)(b) GDPR), and to keep the game secure and fair, including reviewing reports (Art. 6(1)(f) GDPR).</p>
      <p><b>How long:</b> your account is kept until you delete it. On Mini Rift's Profile page, <b>Delete my profile</b> removes your account, profile and friend list from our server immediately; you can also ask us by email. Reports are kept for up to 12 months. Match records are kept for match history and statistics; if you want your name removed from them too, email us.</p>
      <p><b>Where:</b> the Mini Rift server and its database are run for us by the hosting provider <b>MonsterASP.NET</b>, and password reset emails are sent through <b>Google's Gmail</b> service, which processes them only to deliver them. The browser version of Mini Rift is delivered by GitHub Pages (section 6).</p>
      <p>Mini Rift has no ads, no analytics and no purchases: coins can only be earned by playing.</p>

      <h2>6. Hosting of the website and the browser versions</h2>
      <p>This website and the browser versions of the games are hosted on <b>GitHub Pages</b>, a service of GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA. When you open a page, your browser connects to GitHub's servers. For this to work, and for security, GitHub processes technical connection data such as your IP address, the date and time, the requested file and your browser type, and it may keep these in server logs. We do not have access to these logs. GitHub may process this data in the USA. For details see the <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" rel="noopener">GitHub Privacy Statement</a>.</p>
      <p>The legal basis is our legitimate interest in delivering the games and this website reliably and securely (Art. 6(1)(f) GDPR). The fonts are delivered together with the games from the same place, so no request goes to Google Fonts or any other third party.</p>

      <h2>7. App stores</h2>
      <p>If you download a game from <b>Google Play</b> or the <b>Apple App Store</b>, the download and your store account are handled by Google or Apple under their own privacy policies. Stores may give developers anonymous, combined statistics such as the number of installs, or crash reports if you have allowed that in your device settings. These do not tell us who you are.</p>
      <ul>
        <li>Google: <a href="https://policies.google.com/privacy" rel="noopener">policies.google.com/privacy</a></li>
        <li>Apple: <a href="https://www.apple.com/legal/privacy/" rel="noopener">apple.com/legal/privacy</a></li>
      </ul>

      <h2>8. Children</h2>
      <p>Starfall Grove collects no personal data from anyone, so it collects none from children either. Mini Rift has chat with other players and is meant for players aged 13 and over. Children should not sign up for it; if a child under 13 has made an account, a parent can delete it from the Profile page or ask us by email, and we will delete it.</p>

      <h2>9. Your rights</h2>
      <p>Under the GDPR and similar laws you have the right to access your personal data and to have it corrected or erased. You can also restrict or object to its processing, receive it in a portable form, and complain to a data protection supervisory authority. For Starfall Grove we hold no data about you. For Mini Rift, your profile is shown on its Profile page and can be deleted there; for anything else, email us from the address on your account and include your username. You are welcome to contact us at any time.</p>

      <h2>10. Changes to this policy</h2>
      <p>If the games start handling data differently, we will update this policy before that change goes live, and change the date at the top.</p>

      <h2>11. Contact</h2>
      <p>If you have questions about privacy, email <Email />. Mini Rift in the browser: <a href={site.mobaUrl} rel="noopener">{site.mobaUrl.replace(/^https:\/\//, '')}</a>.</p>
    </>
  );
}
