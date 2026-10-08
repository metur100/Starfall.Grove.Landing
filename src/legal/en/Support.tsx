import { Email, route } from '../Layout';

export default function Support() {
  return (
    <>
      <p className="updated">Stuck in the valley? Here are the answers to the most common questions.</p>

      <div className="contact-card">
        <p><strong>Contact us:</strong> <Email subject="Starfall Grove support" /></p>
        <p>Please tell us your device, your browser or app version, and what happened. A screenshot helps a lot.</p>
      </div>

      <h2>Saves and backups</h2>
      <h3>Where is my progress saved?</h3>
      <p>On your own device, in the browser or the app. Every hero has their own save. Nothing is kept online, so there is no account to sign in to.</p>
      <h3>How do I back up my heroes or move them to another device?</h3>
      <p>Open Settings → <b>Back up your saves</b> → <b>Export</b>. This saves one file (<code>starfall-grove-backup-&lt;date&gt;.json</code>) with all your heroes, achievements, key bindings and settings. On the other device, open the same place and choose <b>Import</b>. After you confirm, it replaces the saves on that device with the ones in the file.</p>
      <h3>My progress is gone. Can you restore it?</h3>
      <p>We never receive your saves, so we can't restore them. Clearing your browser data, using a private window or uninstalling the app removes them. If you have a backup file, import it. We recommend exporting a backup now and then.</p>

      <h2>Playing</h2>
      <h3>The game runs slowly on my phone</h3>
      <p>Open Settings and lower <b>Graphics quality</b> (Auto adjusts it for you). You can also turn off weather effects or cap the game at <b>30 fps</b>, which keeps the phone cooler. Closing other apps helps too.</p>
      <h3>There is no sound</h3>
      <p>Browsers only allow sound after you tap or press a key, so tap the screen once. Check the volume sliders in Settings and make sure your device isn't on silent. If an intro film plays without sound, tap <b>Tap for sound</b>.</p>
      <h3>How do I play?</h3>
      <p>On a touch screen, you move with the thumb stick and fight with the spell buttons. On a keyboard, you move with WASD or the arrow keys and attack with L. The spells are on E, K, J and H. You can change any key in Settings.</p>
      <h3>Does it work offline?</h3>
      <p>Yes. After your first visit the game is kept on your device and starts without a connection. The intro films need a connection. Without one, the game shows the in-game intro scene instead.</p>
      <h3>How do I get updates?</h3>
      <p>In the browser, the game downloads new versions quietly in the background. When one is ready, the title screen shows <b>A new version is ready</b> with a <b>Restart</b> button, and the pause menu offers <b>Restart now</b>. It saves your adventure first. The apps update through Google Play and the App Store.</p>

      <h2>Deleting your data</h2>
      <p>All game data is on your device, so you delete it yourself:</p>
      <ul>
        <li><b>Browser:</b> clear the site data (cookies and site data, or storage) for the game's address in your browser settings.</li>
        <li><b>Android and iOS:</b> uninstall the app. This removes all of its data.</li>
      </ul>
      <p>For Starfall Grove we hold no data about you, so there is nothing to delete on our side. You can read the details in our <a href={route('privacy')}>privacy policy</a>.</p>

      <h2 id="mini-rift">Mini Rift</h2>
      <h3 id="delete-profile">How do I delete my Mini Rift profile?</h3>
      <p>In Mini Rift, open <b>Profile</b> and tap <b>Delete my profile</b>, then tap again to confirm. Your account, with its username, email, coins, heroes, skins, ranks, friends and match history, is removed from our server at once. If you can't log in any more, email us from your account's address with your username; we delete it within 30 days. Uninstalling the app or clearing the browser data does <b>not</b> delete the account, it only signs that device out.</p>
      <h3>How do I play with my profile on another device?</h3>
      <p>Log in on the other device with your username and password (<b>Log in</b>). All your progress is there. Forgot your password? Tap <b>Forgot password?</b>, enter your email and open the link in the email; it works for one hour.</p>
      <h3>How do I report a player?</h3>
      <p>Tap the player's name in a chat (or the "…" next to a friend) and choose <b>Report</b> with a reason. <b>Block</b> stops their messages and requests reaching you. We review every report and remove names or delete accounts when needed. You can also email us.</p>
    </>
  );
}
