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
        <p><strong>Kurz gesagt:</strong> Starfall Grove erhebt keine personenbezogenen Daten. Es gibt keine Konten, keine Werbung, keine Analyse und kein Tracking. Ihr Spielstand wird nur auf Ihrem eigenen Gerät gespeichert, und wir erhalten ihn nie.</p>
      </div>

      <p>Diese Erklärung beschreibt, was mit Ihren Daten geschieht, wenn Sie Starfall Grove spielen, ob im Webbrowser, als Android-App von Google Play oder als iOS-App aus dem App Store, und wenn Sie diese Website besuchen. Zusammen heißt das im Folgenden „das Spiel“.</p>

      <h2>1. Verantwortlicher</h2>
      <p>Das Spiel wird entwickelt und herausgegeben von:</p>
      <Publisher />
      <p>Weitere Angaben finden Sie im <a href={route('imprint')}>Impressum</a>.</p>

      <h2>2. Was das Spiel auf Ihrem Gerät speichert</h2>
      <p>Damit Ihr Abenteuer erhalten bleibt, nutzt das Spiel den lokalen Speicher Ihres Browsers oder der App auf Ihrem eigenen Gerät. Diese Daten verlassen Ihr Gerät nie, und niemand sonst kann sie sehen, auch wir nicht. Gespeichert werden:</p>
      <ul>
        <li><b>Ihr Spielstand</b> für jeden Helden: Stufe, Erfahrung, Gold, Tasche und Ausrüstung, Aufträge, Erfolge, Reittiere und Kapitelsterne.</li>
        <li><b>Ihre Einstellungen</b>: Lautstärken, Grafikqualität, Tastenbelegung und der zuletzt gewählte Held.</li>
        <li><b>Die Spieldateien</b>, damit das Spiel auch ohne Verbindung starten und laufen kann (ein Offline-Speicher des Browsers oder der App).</li>
      </ul>
      <p>Nichts davon enthält Ihren Namen, Ihre E-Mail-Adresse, Kontakte, Ihren Standort oder andere personenbezogene Daten. Sie können die Daten jederzeit löschen, indem Sie die Websitedaten des Spiels in Ihrem Browser löschen oder die App deinstallieren. Diese Speicherung ist für das Spiel, das Sie ausdrücklich nutzen möchten, unbedingt erforderlich (§ 25 Abs. 2 Nr. 2 TDDDG).</p>

      <h2>3. Was wir nicht erheben</h2>
      <p>Das Spiel hat keine Benutzerkonten und keine Anmeldung. Es enthält keine Werbung, keine Analyse- oder Statistikwerkzeuge, keine Social-Media-Plugins und kein Tracking jeglicher Art. Es fragt nicht nach Zugriff auf Ihren Standort, Ihre Kontakte, Fotos, Kamera oder Ihr Mikrofon. Das Spiel stellt keine eigenen Netzwerkanfragen außer zum Laden seiner eigenen Dateien, zum Beispiel der Intro-Filme der Helden.</p>

      <h2>4. Sicherungen, die Sie selbst anlegen</h2>
      <p>In den Einstellungen können Sie eine Sicherungsdatei Ihrer Spielstände <b>exportieren</b> oder <b>importieren</b>. Die Datei wird auf Ihrem Gerät erstellt und auf Ihrem Gerät gelesen. Sie landet dort, wo Sie sie ablegen, und wird nie an uns gesendet.</p>

      <h2>5. Hosting der Website und der Browser-Version</h2>
      <p>Diese Website und die Browser-Version des Spiels werden bei <b>GitHub Pages</b> gehostet, einem Dienst der GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA. Wenn Sie eine Seite aufrufen, verbindet sich Ihr Browser mit den Servern von GitHub. Damit das funktioniert, und aus Sicherheitsgründen, verarbeitet GitHub technische Verbindungsdaten wie Ihre IP-Adresse, Datum und Uhrzeit, die angefragte Datei und Ihren Browsertyp und speichert diese gegebenenfalls in Server-Logs. Wir haben keinen Zugriff auf diese Logs. GitHub kann diese Daten in den USA verarbeiten. Einzelheiten finden Sie im <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" rel="noopener">GitHub Privacy Statement</a>.</p>
      <p>Rechtsgrundlage ist unser berechtigtes Interesse, das Spiel und diese Website zuverlässig und sicher bereitzustellen (Art. 6 Abs. 1 lit. f DSGVO). Die Schriftarten werden zusammen mit dem Spiel vom selben Ort ausgeliefert, es geht also keine Anfrage an Google Fonts oder andere Dritte.</p>

      <h2>6. App-Stores</h2>
      <p>Wenn Sie das Spiel bei <b>Google Play</b> oder im <b>Apple App Store</b> herunterladen, werden der Download, etwaige Käufe und Ihr Store-Konto von Google bzw. Apple nach deren eigenen Datenschutzbestimmungen abgewickelt. Die Stores können Entwicklern anonyme, zusammengefasste Statistiken wie die Zahl der Installationen zur Verfügung stellen, oder Absturzberichte, wenn Sie dies in Ihren Geräteeinstellungen erlaubt haben. Daraus können wir nicht erkennen, wer Sie sind.</p>
      <ul>
        <li>Google: <a href="https://policies.google.com/privacy" rel="noopener">policies.google.com/privacy</a></li>
        <li>Apple: <a href="https://www.apple.com/legal/privacy/" rel="noopener">apple.com/legal/privacy</a></li>
      </ul>

      <h2>7. Kinder</h2>
      <p>Starfall Grove ist ein Bilderbuch-Abenteuer, das Menschen jeden Alters spielen können. Da das Spiel von niemandem personenbezogene Daten erhebt, erhebt es auch keine von Kindern.</p>

      <h2>8. Ihre Rechte</h2>
      <p>Nach der DSGVO haben Sie das Recht auf Auskunft über Ihre personenbezogenen Daten sowie auf Berichtigung und Löschung. Sie können außerdem die Einschränkung der Verarbeitung verlangen, ihr widersprechen, Ihre Daten in einem übertragbaren Format erhalten und sich bei einer Datenschutz-Aufsichtsbehörde beschweren. Da wir über Spieler keine personenbezogenen Daten haben, wird eine Anfrage bei uns in der Regel nichts finden. Sie können sich trotzdem jederzeit an uns wenden.</p>

      <h2>9. Änderungen dieser Erklärung</h2>
      <p>Falls das Spiel jemals anders mit Daten umgeht, zum Beispiel durch Online-Funktionen, passen wir diese Erklärung an, bevor die Änderung in Kraft tritt, und aktualisieren das Datum oben.</p>

      <h2>10. Kontakt</h2>
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

      <h2>4. App-Stores</h2>
      <p>Wenn Sie das Spiel über Google Play oder den Apple App Store beziehen, gelten für den Download und etwaige Käufe, einschließlich Erstattungen, zusätzlich die Bedingungen des jeweiligen Stores. Für die iOS-App gilt außerdem Apples <a href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/" rel="noopener">Standard-Endbenutzer-Lizenzvertrag (EULA)</a>. Apple ist für das Spiel und dessen Support nicht verantwortlich.</p>

      <h2>5. Fairness</h2>
      <p>Bitte greifen Sie die Server, auf denen das Spiel liegt, nicht an, überlasten oder stören Sie sie nicht. Nutzen Sie das Spiel bitte auch nicht für Rechtsverstöße.</p>

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
      <p>Wir haben keine Daten über Sie, auf unserer Seite gibt es also nichts zu löschen. Einzelheiten finden Sie in unserer <a href={route('privacy')}>Datenschutzerklärung</a>.</p>
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
