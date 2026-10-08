import site from '../../../site.json';
import { Email, Publisher, route, updated } from '../Layout';

/** Die eigene Datenschutzerklärung von Mini Rift: das Online-Spiel mit Konten, Freunden, Chat und Server. */
export default function MiniRiftPrivacy() {
  return (
    <>
      <p className="updated">Stand: {updated()}</p>

      <div className="summary">
        <p><strong>Kurz gesagt:</strong> Mini Rift ist ein Online-Spiel und braucht deshalb ein Konto und einen Server. Wir speichern Ihren Benutzernamen, Ihre E-Mail-Adresse, einen Hash Ihres Passworts, Ihren Spielfortschritt, Ihre Freunde und Ihre Match-Ergebnisse. Chat wird an andere Spieler weitergegeben und nicht gespeichert, außer jemand meldet eine Nachricht. Wir senden Ihnen nur die E-Mails, die das Spiel braucht (Willkommen und Bestätigung, Passwort zurücksetzen). Es gibt keine Werbung, keine Analyse, kein Tracking und keine Käufe, und Sie können Ihr Konto jederzeit auf der Profilseite löschen.</p>
      </div>

      <p>Diese Erklärung gilt für <b>Mini Rift</b>, das 3-gegen-3-Online-Kampfspiel von <b>{site.studio}</b>, ob Sie es im Webbrowser, als Android-App von Google Play oder als iOS-App aus dem App Store spielen. Unser Story-Spiel Starfall Grove erhebt überhaupt keine personenbezogenen Daten und hat <a href={route('privacy')}>eine eigene Datenschutzerklärung</a>.</p>

      <h2>1. Verantwortlicher</h2>
      <p>Mini Rift wird entwickelt und herausgegeben von:</p>
      <Publisher />
      <p>Weitere Angaben finden Sie im <a href={route('imprint')}>Impressum</a>.</p>

      <h2>2. Ihr Konto</h2>
      <p>Zum Spielen legen Sie ein Konto an. Wir speichern:</p>
      <ul>
        <li><b>Ihren Benutzernamen</b>, den andere Spieler sehen. Sie können ihn auf der Profilseite ändern; wir behalten nur den aktuellen.</li>
        <li><b>Ihre E-Mail-Adresse</b>, die nur wir sehen. Wir nutzen sie, um Ihre Registrierung zu bestätigen, Links zum Zurücksetzen des Passworts zu senden und Ihnen zu antworten, wenn Sie uns schreiben.</li>
        <li><b>Ihr Passwort</b>, nur als gesalzener Hash (PBKDF2) gespeichert. Wir können es nicht lesen und senden es nirgendwohin.</li>
        <li><b>Ob Sie Ihre E-Mail-Adresse bestätigt haben</b>, und solange eine Bestätigung oder ein Zurücksetzen offen ist, einen Hash des einmaligen Codes und wann er abläuft (7 Tage für die Bestätigung, 1 Stunde für das Zurücksetzen).</li>
        <li><b>Wann das Konto angelegt wurde.</b></li>
      </ul>

      <h2>3. Angemeldet bleiben</h2>
      <p>Jedes Gerät, auf dem Sie sich anmelden, bewahrt einen zufälligen Anmeldeschlüssel in seinem lokalen Speicher auf. Unser Server speichert nur eine gehashte Form davon, damit Sie angemeldet bleiben. Abmelden vergisst den Schlüssel; das Zurücksetzen des Passworts meldet alle anderen Geräte ab. Zum Schutz vor dem Erraten von Passwörtern merkt sich der Server fehlgeschlagene Anmeldungen zu einem Benutzernamen kurzzeitig (5 Minuten, nur im Arbeitsspeicher).</p>

      <h2>4. Ihr Spielprofil</h2>
      <p>Damit Ihr Fortschritt erhalten bleibt, speichert der Server Ihr Spielprofil:</p>
      <ul>
        <li>Ihre Münzen, Spielerstufe und Erfahrung;</li>
        <li>die Helden und Skins, die Sie besitzen, den Skin, den jeder Held trägt, Ihren Talisman und Ihr <b>Profilbild</b> (ein Emblem, eine Kreatur oder ein Heldenporträt, das Sie im Spiel gewählt haben);</li>
        <li>Ihre Wertungen und Ränge für Kämpfe und Duelle;</li>
        <li>Ihre Summen an Spielen, Siegen, Kills, Toden und Assists, Spiele und Siege je Held und Ihre letzten zwölf Matches;</li>
        <li>Ihre täglichen Aufträge und Ihren heutigen Fortschritt darin sowie den Tag Ihres letzten Bonus für den ersten Sieg.</li>
      </ul>

      <h2>5. Freunde, Chat und Meldungen</h2>
      <ul>
        <li><b>Freunde</b>: Ihre Freundesliste, Freundschaftsanfragen, die auf Ihre Antwort warten, und die Spieler, die Sie blockiert haben.</li>
        <li><b>Chat</b>: Nachrichten, die Sie in Räumen, in Matches oder an einen Freund schreiben, und Karten-Pings in einem Match werden in Echtzeit an die anderen Spieler weitergegeben und <b>nicht gespeichert</b>.</li>
        <li><b>Meldungen</b>: Wenn Sie einen Spieler melden oder jemand Sie meldet, bewahren wir die Meldung auf: wer wen gemeldet hat, den Grund, die gemeldete Nachricht (falls vorhanden) und den Zeitpunkt. Meldungen werden uns außerdem per E-Mail zugeschickt, damit wir sie prüfen können.</li>
      </ul>

      <h2>6. Match-Aufzeichnungen</h2>
      <p>Für jedes beendete Match speichert der Server Raumcode, Modus, Karte, Gewinner und Dauer, und für jeden Spieler darin Name, Held, Team und Match-Statistik (etwa Kills, Tode, Assists und Schaden). Sie dienen dem Spielverlauf, der Rangliste und dem Ausbalancieren der Helden.</p>

      <h2>7. Was andere Spieler sehen</h2>
      <p>Andere Spieler sehen Ihren Benutzernamen, Ihr Profilbild, Ihre Stufe, Ihren Rang, Helden und Skin, Ihre Match-Statistik, Ihren Platz in der Rangliste, was Sie im Chat schreiben und, nur für Ihre Freunde, ob Sie online sind. Bitte verwenden Sie nicht Ihren echten Namen oder etwas Persönliches als Benutzernamen. Benutzernamen mit Beleidigungen werden abgelehnt, grobe Wörter im Chat werden ausgeblendet. Sie können jeden Spieler blockieren und melden.</p>

      <h2>8. Was auf Ihrem Gerät bleibt</h2>
      <p>Das Spiel nutzt den lokalen Speicher Ihres Browsers oder der App für Ihren Anmeldeschlüssel, den zuletzt verwendeten Namen, die zuletzt gewählte Match-Art und -Größe sowie Ihre Ton- und Grafikeinstellungen. Das ist für das Spiel, das Sie nutzen möchten, unbedingt erforderlich (§ 25 Abs. 2 Nr. 2 TDDDG) und wird gelöscht, wenn Sie die Websitedaten löschen oder die App deinstallieren. Die App ist ein Rahmen um das Browserspiel: Sie fragt nach keiner Berechtigung außer Vibration (für das Rütteln bei Treffern) und öffnet alle anderen Links in Ihrem Browser.</p>

      <h2>9. E-Mails</h2>
      <p>Wir senden nur die E-Mails, die das Spiel braucht: eine <b>Willkommens-E-Mail</b> mit einem Link zur Bestätigung Ihrer Registrierung, wenn Sie sich anmelden (und erneut, wenn Sie das auf der Profilseite anfordern), und einen Link zum <b>Zurücksetzen des Passworts</b>, wenn Sie danach fragen. Wir versenden keine Newsletter und keine Werbung. Die E-Mails werden über den Dienst <b>Gmail von Google</b> versendet, der sie nur zur Zustellung verarbeitet.</p>

      <h2>10. Verbindungsdaten und wo Ihre Daten liegen</h2>
      <p>Solange Sie verbunden sind, verarbeitet der Server Ihre IP-Adresse und was Sie in einem Match tun, nur um das Spiel zu betreiben; er speichert sie nicht. Der Mini-Rift-Server und seine Datenbank werden für uns vom Hosting-Anbieter <b>MonsterASP.NET</b> betrieben, der aus Sicherheitsgründen technische Protokolle führen kann. Die Dateien des Spiels (die Browser-Version) werden über <b>GitHub Pages</b> ausgeliefert, einen Dienst der GitHub, Inc., USA, der dafür Verbindungsdaten wie Ihre IP-Adresse verarbeitet (siehe <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" rel="noopener">GitHub Privacy Statement</a>). Google und GitHub können Daten in den USA verarbeiten; beide sind nach dem EU-U.S. Data Privacy Framework zertifiziert.</p>

      <h2>11. Wie wir Ihre Daten schützen</h2>
      <p>Jede Verbindung zwischen dem Spiel und unserem Server ist verschlüsselt (HTTPS und sichere WebSockets, TLS). Passwörter, Anmeldeschlüssel und die Codes in unseren E-Mails werden nur als Hashes gespeichert, nie lesbar. Nur wir haben Zugriff auf den Server und seine Datenbank, über den geschützten Zugang des Hosting-Anbieters. Chat wird nie in die Datenbank geschrieben, außer eine Nachricht wird gemeldet.</p>

      <h2>12. Wozu wir Ihre Daten verarbeiten</h2>
      <ul>
        <li>Um Ihnen das Spiel bereitzustellen, für das Sie sich registriert haben: Ihr Konto, die Anmeldung, Ihren Fortschritt, Matchmaking, Freunde, Chat, die Rangliste und die dafür nötigen E-Mails (Art. 6 Abs. 1 lit. b DSGVO).</li>
        <li>Um das Spiel sicher und fair zu halten: gehashte Passwörter, begrenzte Anmeldeversuche, ausgeblendete grobe Wörter, die Prüfung von Meldungen und Match-Aufzeichnungen zum Ausbalancieren (unser berechtigtes Interesse, Art. 6 Abs. 1 lit. f DSGVO).</li>
      </ul>

      <h2>13. Wie lange wir sie speichern</h2>
      <p>Ihr Konto und Profil bleiben bestehen, bis Sie sie löschen. Auf der Profilseite entfernt <b>Delete my profile</b> Ihr Konto, Profil, Ihre Freundesliste und Anmeldungen sofort von unserem Server; Sie können uns auch per E-Mail darum bitten. Meldungen bewahren wir bis zu 12 Monate auf. Match-Aufzeichnungen bleiben für Spielverlauf und Statistik erhalten; wenn Ihr Name auch daraus entfernt werden soll, schreiben Sie uns.</p>

      <h2>14. Was Mini Rift nicht tut</h2>
      <p>Mini Rift zeigt keine Werbung, enthält keine Analyse- oder Tracking-Werkzeuge und keine Social-Media-Plugins und verkauft nichts: Münzen gibt es nur durchs Spielen. Es fragt nie nach Ihrem Standort, Ihren Kontakten, Fotos, Ihrer Kamera oder Ihrem Mikrofon, und wir verkaufen Ihre Daten nicht und geben sie niemandem für dessen eigene Zwecke weiter.</p>

      <h2>15. App-Stores</h2>
      <p>Wenn Sie Mini Rift bei <b>Google Play</b> oder im <b>Apple App Store</b> herunterladen, werden der Download und Ihr Store-Konto von Google bzw. Apple nach deren eigenen Datenschutzbestimmungen abgewickelt (<a href="https://policies.google.com/privacy" rel="noopener">Google</a>, <a href="https://www.apple.com/legal/privacy/" rel="noopener">Apple</a>). Die Stores können uns anonyme, zusammengefasste Statistiken wie die Zahl der Installationen geben, oder Absturzberichte, wenn Sie das auf Ihrem Gerät erlaubt haben. Daraus können wir nicht erkennen, wer Sie sind.</p>

      <h2>16. Kinder</h2>
      <p>Mini Rift hat einen Chat mit anderen Spielern und ist für Spieler ab 13 Jahren gedacht. Kinder unter 13 sollten sich nicht registrieren. Hat ein Kind unter 13 ein Konto angelegt, können Eltern es auf der Profilseite löschen oder uns per E-Mail darum bitten, und wir löschen es.</p>

      <h2>17. Ihre Rechte</h2>
      <p>Nach der DSGVO haben Sie das Recht auf Auskunft über Ihre personenbezogenen Daten sowie auf Berichtigung und Löschung. Sie können außerdem die Einschränkung der Verarbeitung verlangen, ihr widersprechen, Ihre Daten in einem übertragbaren Format erhalten und sich bei einer Datenschutz-Aufsichtsbehörde beschweren. Ihr Profil sehen Sie auf der Profilseite von Mini Rift, wo Sie auch Ihren Benutzernamen ändern und Ihr Konto löschen können. Für alles Weitere schreiben Sie uns von der E-Mail-Adresse Ihres Kontos und nennen Ihren Benutzernamen.</p>

      <h2>18. Änderungen dieser Erklärung</h2>
      <p>Falls Mini Rift anders mit Daten umgeht, passen wir diese Erklärung an, bevor die Änderung in Kraft tritt, und aktualisieren das Datum oben.</p>

      <h2>19. Kontakt</h2>
      <p>Bei Fragen zum Datenschutz in Mini Rift schreiben Sie an <Email subject="Mini Rift Datenschutz" />. Mini Rift im Browser: <a href={site.mobaUrl} rel="noopener">{site.mobaUrl.replace(/^https:\/\//, '')}</a>.</p>
    </>
  );
}
