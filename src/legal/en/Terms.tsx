import site from '../../../site.json';
import { Email, updated } from '../Layout';

export default function Terms() {
  return (
    <>
      <p className="updated">Last updated: {updated()}</p>

      <p>These terms apply when you play Starfall Grove in a web browser, as the Android app or as the iOS app ("the game"). The game is made by {site.developer} ("we", "us"). By playing, you agree to these terms.</p>

      <h2>1. Playing the game</h2>
      <p>We give you a personal, non-exclusive and non-transferable right to play the game for your own, non-commercial use. You may not copy, sell, rent or redistribute the game or its parts, pass it off as your own, or remove notices of ownership.</p>

      <h2>2. Ownership</h2>
      <p>The game belongs to {site.developer}. This covers its story, characters, artwork, music, sound, films, code and name. You are welcome to share screenshots and videos of your own play, including on streams and social media, as long as you don't give the impression that they come from us.</p>

      <h2>3. Your saves</h2>
      <p>Your progress is saved only on your own device. If you clear your browser's data, reset or lose your device, or uninstall the app, your progress can be lost. We cannot restore it, because we never receive a copy. Use Settings → <b>Back up your saves</b> to keep your own backup.</p>
      <p><b>Mini Rift</b>, our online battle game, keeps your profile on our server instead (see the privacy policy). Its coins, heroes, skins and ranks are virtual items you earn by playing. They can't be bought, sold or exchanged for money and have no value outside the game. We may change prices, rewards and game balance, and we may reset or delete profiles that cheat or abuse the game. You can delete your own profile at any time from its Profile page.</p>

      <h2>4. App stores</h2>
      <p>If you get the game from Google Play or the Apple App Store, the store's own terms also apply to the download and to any purchase, including refunds. For the iOS app, Apple's <a href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/" rel="noopener">Standard Licensed Application End User License Agreement</a> applies as well. Apple is not responsible for the game or for support of it.</p>

      <h2>5. Fair play</h2>
      <p>Please don't attack, overload or try to disrupt the servers that host the game. Please don't use the game to break any law either.</p>
      <p>In Mini Rift, please play fair: no cheats, scripts, exploits or deliberately leaving matches, and no usernames or chat messages that insult, impersonate or harass others. We may suspend or delete accounts that do.</p>

      <h2>6. Changes and availability</h2>
      <p>We keep improving the game, and updates can change or remove content. We try to keep the game available, but we can't promise that it will always be reachable, free of errors or compatible with every device.</p>

      <h2>7. Liability</h2>
      <p>The game is provided as it is. We are fully liable for damage caused intentionally or through gross negligence, and for injury to life, body or health. For slight negligence, we are liable only for breaches of essential obligations, and only for damage that is typical and foreseeable. Otherwise we are not liable. Mandatory consumer protection laws, and liability under product liability law, are not affected.</p>

      <h2>8. Law</h2>
      <p>These terms are governed by the law of {site.country}. If you are a consumer living in another country, you still keep the protection of the mandatory laws of that country.</p>

      <h2>9. Changes to these terms</h2>
      <p>We may update these terms, for example when the game gains new features. The date at the top shows the latest version.</p>

      <h2>10. Contact</h2>
      <p>If you have questions about these terms, email <Email />.</p>
    </>
  );
}
