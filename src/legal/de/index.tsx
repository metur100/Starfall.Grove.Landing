// Die Rechts- und Hilfeseiten auf Deutsch.
import site from '../../../site.json';
import { Address, Email, Publisher, route, updated } from '../Layout';

const COUNTRY: Record<string, string> = { Germany: 'Deutschland', 'Bosnia and Herzegovina': 'Bosnien und Herzegowina' };
const country = COUNTRY[site.country] ?? site.country;

function Privacy() {
  return (
    <>
      <p className="updated">Stand: {updated()}</p>

      <div className="summary">
        <p><strong>Kurz gesagt:</strong> Starfall Grove, das Story-Spiel, erhebt keine personenbezogenen Daten. Ihr Spielstand wird nur auf Ihrem eigenen Gerät gespeichert, und wir erhalten ihn nie. <b>Mini Rift</b>, unser Online-Kampfspiel, hat Konten: Wir speichern Ihren Benutzernamen, Ihre E-Mail-Adresse, einen Hash Ihres Passworts, Ihren Spielfortschritt, Ihre Freunde und Match-Ergebnisse auf unserem Server. Chat wird weitergegeben, nicht gespeichert. Keines der Spiele hat Werbung, Analyse oder Tracking, und Sie können Ihr Mini-Rift-Konto jederzeit löschen.</p>
      </div>

      <p>Diese Erklärung beschreibt, was mit Ihren Daten geschieht, wenn Sie <b>Starfall Grove</b> oder <b>Mini Rift</b> spielen, ob im Webbrowser, als Android-App von Google Play oder als iOS-App aus dem App Store, und wenn Sie diese Website besuchen. Zusammen heißt das im Folgenden „die Spiele“.</p>

      <h2>1. Verantwortlicher</h2>
      <p>Die Spiele werden entwickelt und herausgegeben von:</p>
      <Publisher />
      <p>Weitere Angaben finden Sie im <a href={route('imprint')}>Impressum</a>.</p>

      <h2>2. Was Starfall Grove auf Ihrem Gerät speichert</h2>
      <p>Damit Ihr Abenteuer erhalten bleibt, nutzt Starfall Grove den lokalen Speicher Ihres Browsers oder der App auf Ihrem eigenen Gerät. Diese Daten verlassen Ihr Gerät nie, und niemand sonst kann sie sehen, auch wir nicht. Gespeichert werden:</p>
      <ul>
        <li><b>Ihr Spielstand</b> für jeden Helden: Stufe, Erfahrung, Gold, Tasche und Ausrüstung, Aufträge, Erfolge, Reittiere und Kapitelsterne.</li>
        <li><b>Ihre Einstellungen</b>: Lautstärken, Grafikqualität, Tastenbelegung und der zuletzt gewählte Held.</li>
        <li><b>Die Spieldateien</b>, damit das Spiel auch ohne Verbindung starten und laufen kann (ein Offline-Speicher des Browsers oder der App).</li>
      </ul>
      <p>Nichts davon enthält Ihren Namen, Ihre E-Mail-Adresse, Kontakte, Ihren Standort oder andere personenbezogene Daten. Sie können die Daten jederzeit löschen, indem Sie die Websitedaten des Spiels in Ihrem Browser löschen oder die App deinstallieren. Diese Speicherung ist für das Spiel, das Sie ausdrücklich nutzen möchten, unbedingt erforderlich (§ 25 Abs. 2 Nr. 2 TDDDG).</p>

      <h2>3. Was Starfall Grove nicht erhebt</h2>
      <p>Starfall Grove hat keine Benutzerkonten und keine Anmeldung. Es enthält keine Werbung, keine Analyse- oder Statistikwerkzeuge, keine Social-Media-Plugins und kein Tracking jeglicher Art. Es fragt nicht nach Zugriff auf Ihren Standort, Ihre Kontakte, Fotos, Kamera oder Ihr Mikrofon. Es stellt keine eigenen Netzwerkanfragen außer zum Laden seiner eigenen Dateien, zum Beispiel der Intro-Filme der Helden.</p>

      <h2>4. Sicherungen, die Sie selbst anlegen</h2>
      <p>In den Einstellungen von Starfall Grove können Sie eine Sicherungsdatei Ihrer Spielstände <b>exportieren</b> oder <b>importieren</b>. Die Datei wird auf Ihrem Gerät erstellt und auf Ihrem Gerät gelesen. Sie landet dort, wo Sie sie ablegen, und wird nie an uns gesendet.</p>

      <h2>5. Mini Rift (Online-Kämpfe)</h2>
      <p>Mini Rift wird über das Internet mit anderen Menschen gespielt und braucht deshalb, anders als Starfall Grove, Konten und einen Server. Dort wird Folgendes gespeichert:</p>
      <ul>
        <li><b>Ihr Konto</b>: der Benutzername und die E-Mail-Adresse, mit denen Sie sich registrieren, und Ihr Passwort, nur als gesalzener Hash gespeichert (wir können es nicht lesen). Die E-Mail-Adresse nutzen wir für Links zum Zurücksetzen des Passworts und um Ihnen zu antworten, wenn Sie uns schreiben. Wir versenden keine Newsletter.</li>
        <li><b>Ihre Anmeldungen</b>: Jedes Gerät, auf dem Sie sich anmelden, erhält einen zufälligen Anmeldeschlüssel; unser Server speichert nur eine verschlüsselte (gehashte) Form davon, damit Sie angemeldet bleiben. Abmelden vergisst ihn; das Zurücksetzen des Passworts meldet alle anderen Geräte ab.</li>
        <li><b>Ihr Spielprofil</b>: Ihre Münzen, Spielerstufe und Erfahrung, die Helden und Skins, die Sie besitzen und tragen, Ihr Talisman, Ihre Wertungen und Ränge, Ihre Summen an Spielen, Siegen, Kills, Toden und Assists und Ihre letzten zwölf Matches.</li>
        <li><b>Freunde</b>: Ihre Freundesliste, Freundschaftsanfragen und die Spieler, die Sie blockiert haben.</li>
        <li><b>Chat</b>: Nachrichten, die Sie in Räumen, Matches oder an einen Freund schreiben, werden in Echtzeit an die anderen Spieler weitergegeben und <b>nicht gespeichert</b>. Nur wenn ein Spieler eine Nachricht meldet, bewahren wir diese Nachricht mit der Meldung auf (meldender und gemeldeter Spieler, Grund und Zeitpunkt), um sie zu prüfen.</li>
        <li><b>Match-Aufzeichnungen</b>: für jedes beendete Match Raumcode, Modus, Karte, Gewinner und Dauer, und für jeden Spieler darin Name, Held, Team und Match-Statistik.</li>
        <li><b>Verbindungsdaten</b>: Solange Sie verbunden sind, verarbeitet der Server Ihre IP-Adresse und was Sie in einem Match tun. Wir nutzen das nur, um das Spiel zu betreiben, und speichern es nicht. Der Hosting-Anbieter kann aus Sicherheitsgründen technische Protokolle führen.</li>
      </ul>
      <p>Andere Spieler sehen Ihren Benutzernamen, Helden, Skin, Ihre Stufe, Ihren Rang, Ihre Match-Statistik, Ihren Online-Status (nur Freunde) und was Sie im Chat schreiben. Bitte verwenden Sie nicht Ihren echten Namen oder etwas Persönliches als Benutzernamen. Benutzernamen mit Beleidigungen werden abgelehnt, grobe Wörter im Chat werden ausgeblendet. Sie können jeden Spieler blockieren und melden.</p>
      <p><b>Wozu:</b> um Ihnen das Spiel bereitzustellen, für das Sie sich registriert haben, einschließlich Konto, Matchmaking, Freunden, Chat, Ihrem Fortschritt und der Rangliste (Art. 6 Abs. 1 lit. b DSGVO), und um das Spiel sicher und fair zu halten, einschließlich der Prüfung von Meldungen (Art. 6 Abs. 1 lit. f DSGVO).</p>
      <p><b>Wie lange:</b> Ihr Konto bleibt bestehen, bis Sie es löschen. Auf der Profilseite von Mini Rift entfernt <b>Delete my profile</b> Ihr Konto, Profil und Ihre Freundesliste sofort von unserem Server; Sie können uns auch per E-Mail darum bitten. Meldungen bewahren wir bis zu 12 Monate auf. Match-Aufzeichnungen bleiben für Spielverlauf und Statistik erhalten; wenn Ihr Name auch daraus entfernt werden soll, schreiben Sie uns.</p>
      <p><b>Wo:</b> Der Mini-Rift-Server und seine Datenbank werden für uns vom Hosting-Anbieter <b>MonsterASP.NET</b> betrieben, und E-Mails zum Zurücksetzen des Passworts werden über <b>Googles Gmail</b> versendet, das sie nur zur Zustellung verarbeitet. Die Browser-Version von Mini Rift wird über GitHub Pages ausgeliefert (Abschnitt 6).</p>
      <p>Mini Rift hat keine Werbung, keine Analyse und keine Käufe: Münzen gibt es nur durchs Spielen.</p>

      <h2>6. Hosting der Website und der Browser-Versionen</h2>
      <p>Diese Website und die Browser-Versionen der Spiele werden bei <b>GitHub Pages</b> gehostet, einem Dienst der GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA. Wenn Sie eine Seite aufrufen, verbindet sich Ihr Browser mit den Servern von GitHub. Damit das funktioniert, und aus Sicherheitsgründen, verarbeitet GitHub technische Verbindungsdaten wie Ihre IP-Adresse, Datum und Uhrzeit, die angefragte Datei und Ihren Browsertyp und speichert diese gegebenenfalls in Server-Logs. Wir haben keinen Zugriff auf diese Logs. GitHub kann diese Daten in den USA verarbeiten. Einzelheiten finden Sie im <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" rel="noopener">GitHub Privacy Statement</a>.</p>
      <p>Rechtsgrundlage ist unser berechtigtes Interesse, die Spiele und diese Website zuverlässig und sicher bereitzustellen (Art. 6 Abs. 1 lit. f DSGVO). Die Schriftarten werden zusammen mit den Spielen vom selben Ort ausgeliefert, es geht also keine Anfrage an Google Fonts oder andere Dritte.</p>

      <h2>7. App-Stores</h2>
      <p>Wenn Sie ein Spiel bei <b>Google Play</b> oder im <b>Apple App Store</b> herunterladen, werden der Download und Ihr Store-Konto von Google bzw. Apple nach deren eigenen Datenschutzbestimmungen abgewickelt. Die Stores können Entwicklern anonyme, zusammengefasste Statistiken wie die Zahl der Installationen zur Verfügung stellen, oder Absturzberichte, wenn Sie dies in Ihren Geräteeinstellungen erlaubt haben. Daraus können wir nicht erkennen, wer Sie sind.</p>
      <ul>
        <li>Google: <a href="https://policies.google.com/privacy" rel="noopener">policies.google.com/privacy</a></li>
        <li>Apple: <a href="https://www.apple.com/legal/privacy/" rel="noopener">apple.com/legal/privacy</a></li>
      </ul>

      <h2>8. Kinder</h2>
      <p>Starfall Grove erhebt von niemandem personenbezogene Daten, also auch nicht von Kindern. Mini Rift hat einen Chat mit anderen Spielern und ist für Spieler ab 13 Jahren gedacht. Kinder sollten sich nicht registrieren; hat ein Kind unter 13 ein Konto angelegt, können Eltern es auf der Profilseite löschen oder uns per E-Mail darum bitten, und wir löschen es.</p>

      <h2>9. Ihre Rechte</h2>
      <p>Nach der DSGVO haben Sie das Recht auf Auskunft über Ihre personenbezogenen Daten sowie auf Berichtigung und Löschung. Sie können außerdem die Einschränkung der Verarbeitung verlangen, ihr widersprechen, Ihre Daten in einem übertragbaren Format erhalten und sich bei einer Datenschutz-Aufsichtsbehörde beschweren. Für Starfall Grove haben wir keine Daten über Sie. Ihr Mini-Rift-Profil sehen Sie auf dessen Profilseite und können es dort löschen; für alles Weitere schreiben Sie uns von der E-Mail-Adresse Ihres Kontos und nennen Ihren Benutzernamen.</p>

      <h2>10. Änderungen dieser Erklärung</h2>
      <p>Falls die Spiele anders mit Daten umgehen, passen wir diese Erklärung an, bevor die Änderung in Kraft tritt, und aktualisieren das Datum oben.</p>

      <h2>11. Kontakt</h2>
      <p>Bei Fragen zum Datenschutz schreiben Sie an <Email />.</p>
    </>
  );
}

function Terms() {
  return (
    <>
      <p className="updated">Stand: {updated()}</p>

      <p>Diese Bedingungen gelten, wenn Sie Starfall Grove im Webbrowser, als Android-App oder als iOS-App spielen („das Spiel“). Das Spiel wird von {site.developer} entwickelt („wir“, „uns“). Mit dem Spielen stimmen Sie diesen Bedingungen zu.</p>

      <h2>1. Spielen</h2>
      <p>Wir räumen Ihnen ein persönliches, nicht ausschließliches und nicht übertragbares Recht ein, das Spiel für Ihre eigenen, nicht kommerziellen Zwecke zu spielen. Sie dürfen das Spiel oder Teile davon nicht kopieren, verkaufen, vermieten oder weiterverbreiten, es als Ihr eigenes ausgeben oder Hinweise auf Rechte daran entfernen.</p>

      <h2>2. Rechte am Spiel</h2>
      <p>Das Spiel gehört {site.developer}. Das umfasst Geschichte, Figuren, Grafik, Musik, Ton, Filme, Code und Namen. Sie dürfen gern Screenshots und Videos Ihres eigenen Spiels teilen, auch in Streams und sozialen Medien, solange nicht der Eindruck entsteht, sie kämen von uns.</p>

      <h2>3. Ihre Spielstände</h2>
      <p>Ihr Spielstand wird nur auf Ihrem eigenen Gerät gespeichert. Wenn Sie Ihre Browserdaten löschen, Ihr Gerät zurücksetzen oder verlieren oder die App deinstallieren, kann Ihr Spielstand verloren gehen. Wir können ihn nicht wiederherstellen, weil wir nie eine Kopie erhalten. Legen Sie unter Settings → <b>Back up your saves</b> eine eigene Sicherung an.</p>
      <p><b>Mini Rift</b>, unser Online-Kampfspiel, speichert Ihr Profil dagegen auf unserem Server (siehe Datenschutzerklärung). Münzen, Helden, Skins und Ränge in Mini Rift sind virtuelle Gegenstände, die Sie durchs Spielen verdienen. Sie können nicht gekauft, verkauft oder in Geld getauscht werden und haben außerhalb des Spiels keinen Wert. Wir können Preise, Belohnungen und die Spielbalance ändern und Profile zurücksetzen oder löschen, die betrügen oder das Spiel missbrauchen. Ihr eigenes Profil können Sie jederzeit auf der Profilseite löschen.</p>

      <h2>4. App-Stores</h2>
      <p>Wenn Sie das Spiel über Google Play oder den Apple App Store beziehen, gelten für den Download und etwaige Käufe, einschließlich Erstattungen, zusätzlich die Bedingungen des jeweiligen Stores. Für die iOS-App gilt außerdem Apples <a href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/" rel="noopener">Standard-Endbenutzer-Lizenzvertrag (EULA)</a>. Apple ist für das Spiel und dessen Support nicht verantwortlich.</p>

      <h2>5. Fairness</h2>
      <p>Bitte greifen Sie die Server, auf denen das Spiel liegt, nicht an, überlasten oder stören Sie sie nicht. Nutzen Sie das Spiel bitte auch nicht für Rechtsverstöße.</p>
      <p>Spielen Sie in Mini Rift bitte fair: keine Cheats, Skripte, Ausnutzung von Fehlern oder absichtliches Verlassen von Matches, und keine Benutzernamen oder Chat-Nachrichten, die andere beleidigen, sich als jemand anderes ausgeben oder belästigen. Konten, die das tun, können wir sperren oder löschen.</p>

      <h2>6. Änderungen und Verfügbarkeit</h2>
      <p>Wir entwickeln das Spiel ständig weiter, und Updates können Inhalte ändern oder entfernen. Wir bemühen uns, das Spiel verfügbar zu halten, können aber nicht zusagen, dass es immer erreichbar, fehlerfrei oder mit jedem Gerät kompatibel ist.</p>

      <h2>7. Haftung</h2>
      <p>Das Spiel wird so bereitgestellt, wie es ist. Wir haften unbeschränkt für Schäden, die vorsätzlich oder grob fahrlässig verursacht wurden, sowie für Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit. Bei leichter Fahrlässigkeit haften wir nur für die Verletzung wesentlicher Pflichten und nur für den typischen, vorhersehbaren Schaden. Im Übrigen ist die Haftung ausgeschlossen. Zwingende Verbraucherschutzvorschriften und die Haftung nach dem Produkthaftungsgesetz bleiben unberührt.</p>

      <h2>8. Anwendbares Recht</h2>
      <p>{country === 'Deutschland' ? 'Es gilt deutsches Recht.' : `Es gilt das Recht von ${country}.`} Wenn Sie als Verbraucher in einem anderen Land leben, bleibt Ihnen der Schutz durch die zwingenden Vorschriften dieses Landes erhalten.</p>

      <h2>9. Änderungen dieser Bedingungen</h2>
      <p>Wir können diese Bedingungen anpassen, zum Beispiel wenn das Spiel neue Funktionen erhält. Das Datum oben zeigt die aktuelle Fassung.</p>

      <h2>10. Kontakt</h2>
      <p>Bei Fragen zu diesen Bedingungen schreiben Sie an <Email />.</p>
    </>
  );
}

function Support() {
  return (
    <>
      <p className="updated">Im Tal festgesteckt? Hier sind die Antworten auf die häufigsten Fragen. Das Spiel selbst ist auf Englisch, darum stehen Menüpunkte hier so, wie Sie sie im Spiel finden.</p>

      <div className="contact-card">
        <p><strong>Kontakt:</strong> <Email subject="Starfall Grove Support" /></p>
        <p>Bitte nennen Sie Ihr Gerät, Ihren Browser oder Ihre App-Version und was passiert ist. Ein Screenshot hilft sehr. Sie können uns auf Deutsch, Englisch oder Bosnisch schreiben.</p>
      </div>

      <h2>Spielstände und Sicherungen</h2>
      <h3>Wo wird mein Fortschritt gespeichert?</h3>
      <p>Auf Ihrem eigenen Gerät, im Browser oder in der App. Jeder Held hat einen eigenen Spielstand. Nichts wird online gespeichert, darum gibt es auch kein Konto zum Anmelden.</p>
      <h3>Wie sichere ich meine Helden oder übertrage sie auf ein anderes Gerät?</h3>
      <p>Öffnen Sie Settings → <b>Back up your saves</b> → <b>Export</b>. Das speichert eine Datei (<code>starfall-grove-backup-&lt;Datum&gt;.json</code>) mit all Ihren Helden, Erfolgen, Tastenbelegungen und Einstellungen. Öffnen Sie auf dem anderen Gerät dieselbe Stelle und wählen Sie <b>Import</b>. Nach Ihrer Bestätigung ersetzt sie die Spielstände auf diesem Gerät durch die aus der Datei.</p>
      <h3>Mein Fortschritt ist weg. Können Sie ihn wiederherstellen?</h3>
      <p>Wir erhalten Ihre Spielstände nie, darum können wir sie nicht wiederherstellen. Das Löschen der Browserdaten, ein privates Fenster oder das Deinstallieren der App entfernt sie. Wenn Sie eine Sicherungsdatei haben, importieren Sie sie. Wir empfehlen, ab und zu eine Sicherung zu exportieren.</p>

      <h2>Spielen</h2>
      <h3>Das Spiel läuft auf meinem Handy langsam</h3>
      <p>Öffnen Sie Settings und senken Sie <b>Graphics quality</b> (Auto passt sie für Sie an). Sie können auch Wettereffekte ausschalten oder das Spiel auf <b>30 fps</b> begrenzen, das hält das Handy kühler. Auch das Schließen anderer Apps hilft.</p>
      <h3>Es gibt keinen Ton</h3>
      <p>Browser erlauben Ton erst, nachdem Sie getippt oder eine Taste gedrückt haben. Tippen Sie also einmal auf den Bildschirm. Prüfen Sie die Lautstärkeregler in Settings und ob Ihr Gerät stummgeschaltet ist. Wenn ein Intro-Film ohne Ton läuft, tippen Sie auf <b>Tap for sound</b>.</p>
      <h3>Wie spiele ich?</h3>
      <p>Auf einem Touchscreen bewegen Sie sich mit dem Daumenstick und kämpfen mit den Zauber-Buttons. Mit der Tastatur bewegen Sie sich mit WASD oder den Pfeiltasten und greifen mit L an. Die Zauber liegen auf E, K, J und H. Jede Taste können Sie in Settings ändern.</p>
      <h3>Funktioniert es ohne Internet?</h3>
      <p>Ja. Nach dem ersten Besuch bleibt das Spiel auf Ihrem Gerät und startet ohne Verbindung. Die Intro-Filme brauchen eine Verbindung. Ohne Verbindung zeigt das Spiel stattdessen die Intro-Szene im Spiel.</p>
      <h3>Wie bekomme ich Updates?</h3>
      <p>Im Browser lädt das Spiel neue Versionen still im Hintergrund. Sobald eine bereit ist, zeigt der Titelbildschirm <b>A new version is ready</b> mit einem <b>Restart</b>-Button, und das Pausenmenü bietet <b>Restart now</b>. Ihr Abenteuer wird vorher gespeichert. Die Apps werden über Google Play und den App Store aktualisiert.</p>

      <h2>Ihre Daten löschen</h2>
      <p>Alle Spieldaten liegen auf Ihrem Gerät, darum löschen Sie sie selbst:</p>
      <ul>
        <li><b>Browser:</b> Löschen Sie in den Browsereinstellungen die Websitedaten (Cookies und Websitedaten bzw. Speicher) für die Adresse des Spiels.</li>
        <li><b>Android und iOS:</b> Deinstallieren Sie die App. Damit werden alle ihre Daten entfernt.</li>
      </ul>
      <p>Für Starfall Grove haben wir keine Daten über Sie, auf unserer Seite gibt es also nichts zu löschen. Einzelheiten finden Sie in unserer <a href={route('privacy')}>Datenschutzerklärung</a>.</p>

      <h2 id="mini-rift">Mini Rift</h2>
      <h3 id="delete-profile">Wie lösche ich mein Mini-Rift-Profil?</h3>
      <p>Öffnen Sie in Mini Rift das <b>Profile</b> und tippen Sie auf <b>Delete my profile</b>, dann zur Bestätigung noch einmal. Ihr Konto mit Benutzername, E-Mail-Adresse, Münzen, Helden, Skins, Rängen, Freunden und Matchverlauf wird sofort von unserem Server entfernt. Wenn Sie sich nicht mehr anmelden können, schreiben Sie uns von der E-Mail-Adresse Ihres Kontos mit Ihrem Benutzernamen; wir löschen es innerhalb von 30 Tagen. Die App zu deinstallieren oder die Browserdaten zu löschen löscht das Konto <b>nicht</b>, es meldet nur dieses Gerät ab.</p>
      <h3>Wie spiele ich mit meinem Profil auf einem anderen Gerät?</h3>
      <p>Melden Sie sich auf dem anderen Gerät mit Ihrem Benutzernamen und Passwort an (<b>Log in</b>). Ihr ganzer Fortschritt ist dort. Passwort vergessen? Tippen Sie auf <b>Forgot password?</b>, geben Sie Ihre E-Mail-Adresse ein und öffnen Sie den Link aus der E-Mail; er gilt eine Stunde.</p>
      <h3>Wie melde ich einen Spieler?</h3>
      <p>Tippen Sie im Chat auf den Namen des Spielers (oder bei einem Freund auf „…“) und wählen Sie <b>Report</b> mit einem Grund. Mit <b>Block</b> erreichen Sie seine Nachrichten und Anfragen nicht mehr. Wir prüfen jede Meldung und entfernen Namen oder löschen Konten, wenn nötig. Sie können uns auch schreiben.</p>
    </>
  );
}

function Imprint() {
  return (
    <>
      <p className="updated">Angaben gemäß § 5 DDG</p>

      <h2>Anbieter</h2>
      <Address country={country} />

      <h2>Kontakt</h2>
      <p>E-Mail: <Email /></p>

      <h2>Verantwortlich für den Inhalt</h2>
      <p>Nach § 18 Abs. 2 MStV: {site.developer}, Anschrift wie oben.</p>

      <h2>Verbraucherstreitbeilegung</h2>
      <p>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>

      <h2>Haftung für Links</h2>
      <p>Diese Website enthält Links zu externen Websites, etwa zu den App-Stores. Auf deren Inhalte haben wir keinen Einfluss, verantwortlich sind deren Anbieter. Zum Zeitpunkt der Verlinkung waren keine Rechtsverstöße erkennbar. Werden uns solche bekannt, entfernen wir den Link.</p>
    </>
  );
}

export const pages = { privacy: Privacy, terms: Terms, support: Support, imprint: Imprint };
