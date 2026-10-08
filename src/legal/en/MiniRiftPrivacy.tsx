import site from '../../../site.json';
import { Email, Publisher, route, updated } from '../Layout';

/** Mini Rift's own privacy policy: the online game with accounts, friends, chat and a server. */
export default function MiniRiftPrivacy() {
  return (
    <>
      <p className="updated">Last updated: {updated()}</p>

      <div className="summary">
        <p><strong>In short:</strong> Mini Rift is an online game, so it needs an account and a server. We keep your username, email address, a hash of your password, your game progress, your friends and your match results. Chat is passed on to other players and not stored, unless someone reports a message. We send you only the emails the game needs (welcome and confirmation, password reset). There are no ads, no analytics, no tracking and no purchases, and you can delete your account at any time from the Profile page.</p>
      </div>

      <p>This policy is for <b>Mini Rift</b>, the 3v3 online battle game by <b>{site.studio}</b>, whether you play it in a web browser, as an Android app from Google Play or as an iOS app from the App Store. Our story game Starfall Grove collects no personal data at all and has <a href={route('privacy')}>its own privacy policy</a>.</p>

      <h2>1. Who is responsible</h2>
      <p>Mini Rift is made and published by:</p>
      <Publisher />
      <p>More details are in the <a href={route('imprint')}>imprint</a>.</p>

      <h2>2. Your account</h2>
      <p>To play, you create an account. We store:</p>
      <ul>
        <li><b>Your username</b>, which other players see. You can change it on the Profile page; we keep only the current one.</li>
        <li><b>Your email address</b>, which only we see. We use it to confirm your registration, to send password reset links, and to answer you if you write to us.</li>
        <li><b>Your password</b>, stored only as a salted hash (PBKDF2). We can't read it, and we never send it anywhere.</li>
        <li><b>Whether you confirmed your email</b>, and while a confirmation or password reset is waiting, a hash of its one-time code and when it expires (7 days for confirmation, 1 hour for a reset).</li>
        <li><b>When the account was created.</b></li>
      </ul>

      <h2>3. Staying signed in</h2>
      <p>Each device you sign in on keeps a random sign-in key in its local storage. Our server stores only a hashed form of it, so it can keep you signed in. Logging out forgets the key; resetting your password signs every other device out. To protect accounts from password guessing, the server briefly remembers failed log-ins for a username (for 5 minutes, in memory only).</p>

      <h2>4. Your game profile</h2>
      <p>To keep your progress, the server stores your game profile:</p>
      <ul>
        <li>your coins, player level and experience;</li>
        <li>the heroes and skins you own, the skin each hero wears, your charm and your <b>profile picture</b> (an emblem, creature or hero portrait you chose in the game);</li>
        <li>your ratings and ranks for battles and duels;</li>
        <li>your totals of games, wins, kills, deaths and assists, games and wins per hero, and your last twelve matches;</li>
        <li>your daily quests and how far you got today, and the day of your last first-win bonus.</li>
      </ul>

      <h2>5. Friends, chat and reports</h2>
      <ul>
        <li><b>Friends</b>: your friend list, friend requests waiting for your answer, and the players you blocked.</li>
        <li><b>Chat</b>: messages you write in rooms, in matches or to a friend, and map pings in a match, are passed on to the other players in real time and are <b>not stored</b>.</li>
        <li><b>Reports</b>: if you report a player, or someone reports you, we keep the report: who reported whom, the reason, the reported message (if any) and the time. Reports are also emailed to us so we can review them.</li>
      </ul>

      <h2>6. Match records</h2>
      <p>For each finished match the server keeps the room code, mode, map, winner and duration, and for every player in it the name, hero, team and match statistics (such as kills, deaths, assists and damage). They are used for match history, the ladder and balancing the heroes.</p>

      <h2>7. What other players see</h2>
      <p>Other players see your username, profile picture, level, rank, hero and skin, your match statistics, your place on the ladder, what you write in chat and, for your friends only, whether you are online. Please don't use your real name or anything personal as your username. Usernames with insults are refused, and rude words in chat are masked. You can block and report any player.</p>

      <h2>8. What stays on your device</h2>
      <p>The game uses your browser's or app's local storage for your sign-in key, the name you last used, your last chosen match type and size, and your sound and graphics settings. This is needed for the game you choose to play (§ 25(2)(2) TDDDG) and is deleted when you clear the site data or uninstall the app. The app is a frame around the browser game: it asks for no permissions apart from vibration (for rumble when you are hit) and opens any other link in your browser.</p>

      <h2>9. Emails</h2>
      <p>We send only the emails the game needs: a <b>welcome email</b> with a link to confirm your registration when you sign up (and again if you ask for it on the Profile page), and a <b>password reset</b> link when you ask for one. We send no newsletters or advertising. The emails are sent through <b>Google's Gmail</b> service, which processes them only to deliver them.</p>

      <h2>10. Connection data and where your data is kept</h2>
      <p>While you are connected, the server handles your IP address and what you do in a match, only to run the game; it does not store them. The Mini Rift server and its database are run for us by the hosting provider <b>MonsterASP.NET</b>, which may keep technical logs for security. The game's files (the browser version) are delivered by <b>GitHub Pages</b>, a service of GitHub, Inc., USA, which processes connection data such as your IP address to deliver them (see the <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" rel="noopener">GitHub Privacy Statement</a>). Google and GitHub may process data in the USA; both are certified under the EU-U.S. Data Privacy Framework.</p>

      <h2>11. How we keep your data safe</h2>
      <p>Every connection between the game and our server is encrypted (HTTPS and secure WebSockets, TLS). Passwords, sign-in keys and the codes in our emails are stored only as hashes, never in readable form. Only we can reach the server and its database, through the hosting provider's protected access. Chat is never written to the database unless a message is reported.</p>

      <h2>12. Why we process your data</h2>
      <ul>
        <li>To give you the game you signed up for: your account, signing in, progress, matchmaking, friends, chat, the ladder and the emails it needs (Art. 6(1)(b) GDPR).</li>
        <li>To keep the game secure and fair: hashed passwords, limiting log-in attempts, masking rude words, reviewing reports, and keeping match records for balancing (our legitimate interest, Art. 6(1)(f) GDPR).</li>
      </ul>

      <h2>13. How long we keep it</h2>
      <p>Your account and profile are kept until you delete them. On the Profile page, <b>Delete my profile</b> removes your account, profile, friend list and sign-ins from our server immediately; you can also ask us by email. Reports are kept for up to 12 months. Match records are kept for match history and statistics; if you want your name removed from them as well, email us.</p>

      <h2>14. What Mini Rift does not do</h2>
      <p>Mini Rift shows no ads, contains no analytics or tracking tools and no social media plug-ins, and sells nothing: coins can only be earned by playing. It never asks for your location, contacts, photos, camera or microphone, and we never sell or share your data with anyone for their own purposes.</p>

      <h2>15. App stores</h2>
      <p>If you download Mini Rift from <b>Google Play</b> or the <b>Apple App Store</b>, the download and your store account are handled by Google or Apple under their own privacy policies (<a href="https://policies.google.com/privacy" rel="noopener">Google</a>, <a href="https://www.apple.com/legal/privacy/" rel="noopener">Apple</a>). The stores may give us anonymous, combined statistics such as the number of installs, or crash reports if you allowed that on your device. These don't tell us who you are.</p>

      <h2>16. Children</h2>
      <p>Mini Rift has chat with other players and is meant for players aged 13 and over. Children under 13 should not sign up. If a child under 13 has made an account, a parent can delete it on the Profile page or ask us by email, and we will delete it.</p>

      <h2>17. Your rights</h2>
      <p>Under the GDPR you have the right to access your personal data and to have it corrected or erased. You can also restrict or object to its processing, receive it in a portable form, and complain to a data protection supervisory authority. Your profile is shown on Mini Rift's Profile page, where you can also change your username and delete your account. For anything else, email us from the address on your account and include your username.</p>

      <h2>18. Changes to this policy</h2>
      <p>If Mini Rift starts handling data differently, we will update this policy before that change goes live, and change the date at the top.</p>

      <h2>19. Contact</h2>
      <p>If you have questions about privacy in Mini Rift, email <Email subject="Mini Rift privacy" />. Mini Rift in the browser: <a href={site.mobaUrl} rel="noopener">{site.mobaUrl.replace(/^https:\/\//, '')}</a>.</p>
    </>
  );
}
