// Pravne stranice i stranice pomoći na bosanskom.
import site from '../../../site.json';
import { Address, Email, Publisher, route, updated } from '../Layout';

// The country's name in the locative ("u Njemačkoj") and in the genitive ("pravo Njemačke").
const COUNTRY: Record<string, { name: string; of: string }> = {
  Germany: { name: 'Njemačka', of: 'Savezne Republike Njemačke' },
  'Bosnia and Herzegovina': { name: 'Bosna i Hercegovina', of: 'Bosne i Hercegovine' },
};
const country = COUNTRY[site.country] ?? { name: site.country, of: site.country };

function Privacy() {
  return (
    <>
      <p className="updated">Posljednja izmjena: {updated()}</p>

      <div className="summary">
        <p><strong>Ukratko:</strong> Starfall Grove ne prikuplja nikakve lične podatke. Nema računa, reklama, analitike ni praćenja. Vaš napredak se čuva samo na vašem uređaju i mi ga nikada ne dobijamo.</p>
      </div>

      <p>Ova politika objašnjava šta se dešava s vašim podacima kada igrate Starfall Grove, bilo u web pretraživaču, kao Android aplikaciju sa Google Playa ili kao iOS aplikaciju sa App Storea, i kada posjetite ovu web stranicu. U nastavku se sve to zajedno naziva „igra“.</p>

      <h2>1. Ko je odgovoran</h2>
      <p>Igru razvija i objavljuje:</p>
      <Publisher />
      <p>Više podataka nalazi se u <a href={route('imprint')}>impresumu</a>.</p>

      <h2>2. Šta igra čuva na vašem uređaju</h2>
      <p>Da bi zapamtila vašu avanturu, igra koristi lokalnu pohranu vašeg pretraživača ili aplikacije na vašem uređaju. Ti podaci nikada ne napuštaju vaš uređaj i niko drugi ih ne može vidjeti, pa ni mi. Sadrže:</p>
      <ul>
        <li><b>Vaš napredak</b> za svakog junaka: nivo, iskustvo, zlato, torbu i opremu, zadatke, dostignuća, jahaće životinje i zvjezdice poglavlja.</li>
        <li><b>Vaše postavke</b>: jačinu zvuka, kvalitet grafike, raspored tipki i posljednjeg izabranog junaka.</li>
        <li><b>Datoteke igre</b>, kako bi se mogla pokrenuti i igrati bez veze (offline keš pretraživača ili aplikacije).</li>
      </ul>
      <p>Ništa od toga ne sadrži vaše ime, e-mail, kontakte, lokaciju ili bilo koje druge lične podatke. Možete ih izbrisati u bilo kojem trenutku tako što ćete obrisati podatke stranice igre u pretraživaču ili deinstalirati aplikaciju.</p>

      <h2>3. Šta ne prikupljamo</h2>
      <p>Igra nema korisničke račune ni prijavu. Ne sadrži reklame, alate za analitiku ili statistiku, dodatke društvenih mreža niti bilo kakvo praćenje. Ne traži pristup vašoj lokaciji, kontaktima, fotografijama, kameri ili mikrofonu. Igra ne šalje nikakve vlastite mrežne zahtjeve osim za učitavanje vlastitih datoteka, na primjer uvodnih filmova junaka.</p>

      <h2>4. Rezervne kopije koje sami pravite</h2>
      <p>U postavkama (Settings) možete <b>izvesti</b> datoteku s rezervnom kopijom svojih snimljenih igara ili je <b>uvesti</b>. Datoteka se pravi i čita na vašem uređaju. Ide tamo gdje je vi spremite i nikada nam se ne šalje.</p>

      <h2>5. Hosting web stranice i verzije za pretraživač</h2>
      <p>Ova web stranica i verzija igre za pretraživač hostuju se na usluzi <b>GitHub Pages</b> kompanije GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, SAD. Kada otvorite stranicu, vaš pretraživač se povezuje sa serverima GitHuba. Da bi to radilo, i iz sigurnosnih razloga, GitHub obrađuje tehničke podatke o vezi, kao što su vaša IP adresa, datum i vrijeme, tražena datoteka i vrsta pretraživača, i može ih čuvati u serverskim zapisima. Mi nemamo pristup tim zapisima. GitHub ove podatke može obrađivati u SAD-u. Detalji su u <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" rel="noopener">GitHub Privacy Statementu</a>.</p>
      <p>Pravni osnov je naš legitimni interes da igru i ovu web stranicu isporučimo pouzdano i sigurno (član 6. stav 1. tačka f) GDPR-a). Fontovi se isporučuju zajedno s igrom sa istog mjesta, pa nikakav zahtjev ne ide prema Google Fontsu ili nekoj drugoj trećoj strani.</p>

      <h2>6. Prodavnice aplikacija</h2>
      <p>Ako igru preuzmete sa <b>Google Playa</b> ili <b>Apple App Storea</b>, preuzimanje, eventualnu kupovinu i vaš račun u prodavnici obrađuju Google ili Apple prema vlastitim pravilima privatnosti. Prodavnice programerima mogu davati anonimne, zbirne statistike, kao što je broj instalacija, ili izvještaje o padovima ako ste to dozvolili u postavkama uređaja. Iz njih ne možemo saznati ko ste.</p>
      <ul>
        <li>Google: <a href="https://policies.google.com/privacy" rel="noopener">policies.google.com/privacy</a></li>
        <li>Apple: <a href="https://www.apple.com/legal/privacy/" rel="noopener">apple.com/legal/privacy</a></li>
      </ul>

      <h2>7. Djeca</h2>
      <p>Starfall Grove je avantura iz slikovnice koju mogu igrati ljudi svih uzrasta. Budući da igra ni od koga ne prikuplja lične podatke, ne prikuplja ih ni od djece.</p>

      <h2>8. Vaša prava</h2>
      <p>Prema GDPR-u i sličnim zakonima imate pravo na pristup svojim ličnim podacima te na njihovu ispravku i brisanje. Možete i tražiti ograničenje obrade, uložiti prigovor na nju, dobiti podatke u prenosivom obliku i podnijeti pritužbu nadzornom tijelu za zaštitu podataka. Budući da o igračima nemamo nikakve lične podatke, zahtjev upućen nama obično neće ništa pronaći. Ipak nam se uvijek možete obratiti.</p>

      <h2>9. Izmjene ove politike</h2>
      <p>Ako igra ikada počne drugačije postupati s podacima, na primjer uvođenjem online funkcija, ažuriraćemo ovu politiku prije nego što ta promjena stupi na snagu i promijeniti datum na vrhu.</p>

      <h2>10. Kontakt</h2>
      <p>Ako imate pitanja o privatnosti, pišite na <Email />.</p>
    </>
  );
}

function Terms() {
  return (
    <>
      <p className="updated">Posljednja izmjena: {updated()}</p>

      <p>Ovi uslovi važe kada igrate Starfall Grove u web pretraživaču, kao Android aplikaciju ili kao iOS aplikaciju („igra“). Igru pravi {site.developer} („mi“, „nas“). Igranjem prihvatate ove uslove.</p>

      <h2>1. Igranje</h2>
      <p>Dajemo vam lično, neisključivo i neprenosivo pravo da igrate igru za vlastite, nekomercijalne potrebe. Ne smijete kopirati, prodavati, iznajmljivati niti dalje distribuirati igru ili njene dijelove, predstavljati je kao svoju niti uklanjati oznake o vlasništvu.</p>

      <h2>2. Vlasništvo</h2>
      <p>Igra pripada autoru {site.developer}. To obuhvata njenu priču, likove, grafiku, muziku, zvuk, filmove, kod i ime. Slobodno dijelite snimke ekrana i videa svog igranja, uključujući prenose uživo i društvene mreže, sve dok ne stvarate utisak da dolaze od nas.</p>

      <h2>3. Vaše snimljene igre</h2>
      <p>Vaš napredak se čuva samo na vašem uređaju. Ako obrišete podatke pretraživača, resetujete ili izgubite uređaj ili deinstalirate aplikaciju, napredak se može izgubiti. Ne možemo ga vratiti jer nikada ne dobijamo kopiju. Koristite Settings → <b>Back up your saves</b> da napravite vlastitu rezervnu kopiju.</p>

      <h2>4. Prodavnice aplikacija</h2>
      <p>Ako igru nabavite preko Google Playa ili Apple App Storea, za preuzimanje i eventualnu kupovinu, uključujući povrat novca, važe i uslovi te prodavnice. Za iOS aplikaciju važi i Appleov <a href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/" rel="noopener">standardni licencni ugovor s krajnjim korisnikom (EULA)</a>. Apple nije odgovoran za igru niti za njenu podršku.</p>

      <h2>5. Fer igra</h2>
      <p>Molimo vas da ne napadate, ne preopterećujete i ne ometate servere na kojima je igra. Molimo vas i da igru ne koristite za kršenje zakona.</p>

      <h2>6. Izmjene i dostupnost</h2>
      <p>Igru stalno poboljšavamo, a ažuriranja mogu promijeniti ili ukloniti sadržaj. Trudimo se da igra bude dostupna, ali ne možemo obećati da će uvijek biti dostupna, bez grešaka ili kompatibilna sa svakim uređajem.</p>

      <h2>7. Odgovornost</h2>
      <p>Igra se pruža takva kakva jeste. U potpunosti odgovaramo za štetu prouzrokovanu namjerno ili krajnjom nepažnjom te za povrede života, tijela ili zdravlja. Za laku nepažnju odgovaramo samo za kršenje bitnih obaveza i samo za tipičnu, predvidivu štetu. U ostalim slučajevima ne odgovaramo. Obavezni propisi o zaštiti potrošača i odgovornost prema zakonu o odgovornosti za proizvode ostaju netaknuti.</p>

      <h2>8. Mjerodavno pravo</h2>
      <p>Na ove uslove primjenjuje se pravo {country.of}. Ako ste potrošač i živite u drugoj zemlji, zadržavate zaštitu obaveznih propisa te zemlje.</p>

      <h2>9. Izmjene ovih uslova</h2>
      <p>Možemo ažurirati ove uslove, na primjer kada igra dobije nove funkcije. Datum na vrhu pokazuje najnoviju verziju.</p>

      <h2>10. Kontakt</h2>
      <p>Ako imate pitanja o ovim uslovima, pišite na <Email />.</p>
    </>
  );
}

function Support() {
  return (
    <>
      <p className="updated">Zaglavili ste u dolini? Ovdje su odgovori na najčešća pitanja. Sama igra je na engleskom, pa su stavke menija ovdje napisane onako kako ih nalazite u igri.</p>

      <div className="contact-card">
        <p><strong>Kontakt:</strong> <Email subject="Starfall Grove podrška" /></p>
        <p>Navedite svoj uređaj, pretraživač ili verziju aplikacije i šta se desilo. Snimak ekrana mnogo pomaže. Možete nam pisati na bosanskom, njemačkom ili engleskom.</p>
      </div>

      <h2>Snimljene igre i rezervne kopije</h2>
      <h3>Gdje se čuva moj napredak?</h3>
      <p>Na vašem uređaju, u pretraživaču ili aplikaciji. Svaki junak ima svoju snimljenu igru. Ništa se ne čuva online, pa nema ni računa za prijavu.</p>
      <h3>Kako da napravim rezervnu kopiju junaka ili ih prenesem na drugi uređaj?</h3>
      <p>Otvorite Settings → <b>Back up your saves</b> → <b>Export</b>. Time se sačuva jedna datoteka (<code>starfall-grove-backup-&lt;datum&gt;.json</code>) sa svim vašim junacima, dostignućima, rasporedom tipki i postavkama. Na drugom uređaju otvorite isto mjesto i izaberite <b>Import</b>. Nakon potvrde, snimljene igre na tom uređaju zamjenjuju se onima iz datoteke.</p>
      <h3>Moj napredak je nestao. Možete li ga vratiti?</h3>
      <p>Vaše snimljene igre nikada ne dobijamo, pa ih ne možemo vratiti. Brisanje podataka pretraživača, privatni prozor ili deinstaliranje aplikacije ih uklanjaju. Ako imate datoteku s rezervnom kopijom, uvezite je. Preporučujemo da s vremena na vrijeme izvezete rezervnu kopiju.</p>

      <h2>Igranje</h2>
      <h3>Igra je spora na mom mobitelu</h3>
      <p>Otvorite Settings i smanjite <b>Graphics quality</b> (Auto je podešava umjesto vas). Možete isključiti i vremenske efekte ili ograničiti igru na <b>30 fps</b>, što mobitel drži hladnijim. Pomaže i zatvaranje drugih aplikacija.</p>
      <h3>Nema zvuka</h3>
      <p>Pretraživači dozvoljavaju zvuk tek nakon što dodirnete ekran ili pritisnete tipku, pa jednom dodirnite ekran. Provjerite klizače za jačinu u Settings i da uređaj nije na nečujnom načinu. Ako se uvodni film pušta bez zvuka, dodirnite <b>Tap for sound</b>.</p>
      <h3>Kako se igra?</h3>
      <p>Na ekranu osjetljivom na dodir krećete se palicom za palac i borite se dugmadima za čini. Na tastaturi se krećete tipkama WASD ili strelicama i napadate tipkom L. Čini su na E, K, J i H. Svaku tipku možete promijeniti u Settings.</p>
      <h3>Da li radi bez interneta?</h3>
      <p>Da. Nakon prve posjete igra ostaje na vašem uređaju i pokreće se bez veze. Uvodni filmovi trebaju vezu. Bez nje igra umjesto toga prikazuje uvodnu scenu u igri.</p>
      <h3>Kako dobijam ažuriranja?</h3>
      <p>U pretraživaču igra tiho preuzima nove verzije u pozadini. Kada je nova spremna, naslovni ekran prikazuje <b>A new version is ready</b> s dugmetom <b>Restart</b>, a meni pauze nudi <b>Restart now</b>. Vaša avantura se prije toga sačuva. Aplikacije se ažuriraju preko Google Playa i App Storea.</p>

      <h2>Brisanje vaših podataka</h2>
      <p>Svi podaci igre su na vašem uređaju, pa ih brišete sami:</p>
      <ul>
        <li><b>Pretraživač:</b> u postavkama pretraživača obrišite podatke stranice (kolačiće i podatke stranice, ili pohranu) za adresu igre.</li>
        <li><b>Android i iOS:</b> deinstalirajte aplikaciju. Time se uklanjaju svi njeni podaci.</li>
      </ul>
      <p>O vama nemamo nikakve podatke, pa kod nas nema šta da se briše. Detalji su u našoj <a href={route('privacy')}>politici privatnosti</a>.</p>
    </>
  );
}

function Imprint() {
  return (
    <>
      <p className="updated">Pravne informacije (Impressum) prema § 5 njemačkog DDG-a</p>

      <h2>Izdavač</h2>
      <Address country={country.name} />

      <h2>Kontakt</h2>
      <p>E-mail: <Email /></p>

      <h2>Odgovoran za sadržaj</h2>
      <p>Prema § 18 st. 2 MStV: {site.developer}, adresa kao gore.</p>

      <h2>Rješavanje potrošačkih sporova</h2>
      <p>Nismo obavezni niti spremni učestvovati u postupcima rješavanja sporova pred tijelom za potrošačku arbitražu.</p>

      <h2>Odgovornost za linkove</h2>
      <p>Ova web stranica sadrži linkove na vanjske stranice, kao što su prodavnice aplikacija. Na njihov sadržaj nemamo uticaja i za njega su odgovorni njihovi pružaoci. U trenutku postavljanja linkova nismo uočili nikakva očigledna kršenja zakona. Ako za neka saznamo, uklonićemo link.</p>
    </>
  );
}

export const pages = { privacy: Privacy, terms: Terms, support: Support, imprint: Imprint };
