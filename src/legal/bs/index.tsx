// Pravne stranice i stranice pomoći na bosanskom.
import site from '../../../site.json';
import MiniRiftPrivacy from './MiniRiftPrivacy';
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
        <p><strong>Ukratko:</strong> Starfall Grove ne prikuplja lične podatke. Vaš napredak se čuva samo na vašem uređaju i mi ga nikada ne dobijamo. Nema računa, reklama, analitike ni praćenja. Naša online borbena igra <b>Mini Rift</b> radi drugačije i ima <a href={route('minirift/privacy')}>vlastitu politiku privatnosti</a>.</p>
      </div>

      <p>Ova politika objašnjava šta se dešava s vašim podacima kada igrate <b>Starfall Grove</b>, slikovničku avanturu, bilo u web pretraživaču, kao Android aplikaciju s Google Playa ili kao iOS aplikaciju iz App Storea, i kada posjetite ovu web stranicu. Za <b>Mini Rift</b>, našu online borbenu igru s računima, važi <a href={route('minirift/privacy')}>politika privatnosti igre Mini Rift</a>.</p>

      <h2>1. Ko je odgovoran</h2>
      <p>Igre pravi i objavljuje:</p>
      <Publisher />
      <p>Više podataka nalazi se u <a href={route('imprint')}>impresumu</a>.</p>

      <h2>2. Šta Starfall Grove čuva na vašem uređaju</h2>
      <p>Da bi zapamtio vašu avanturu, Starfall Grove koristi lokalnu pohranu vašeg pretraživača ili aplikacije na vašem uređaju. Ti podaci nikada ne napuštaju vaš uređaj i niko drugi ih ne može vidjeti, pa ni mi. Sadrže:</p>
      <ul>
        <li><b>Vaš napredak</b> za svakog junaka: nivo, iskustvo, zlato, torbu i opremu, zadatke, postignuća, jahaće životinje i zvijezde poglavlja.</li>
        <li><b>Vaše postavke</b>: jačinu zvuka, kvalitet grafike, raspored tipki i posljednjeg izabranog junaka.</li>
        <li><b>Datoteke igre</b>, da bi se igra mogla pokrenuti i igrati bez veze (offline keš pretraživača ili aplikacije).</li>
      </ul>
      <p>Ništa od toga ne sadrži vaše ime, e-mail, kontakte, lokaciju ni druge lične podatke. Podatke možete izbrisati bilo kada brisanjem podataka stranice igre u pretraživaču ili deinstalacijom aplikacije.</p>

      <h2>3. Šta Starfall Grove ne prikuplja</h2>
      <p>Starfall Grove nema korisničke račune ni prijavu. Ne sadrži reklame, alate za analitiku ili statistiku, dodatke društvenih mreža niti bilo kakvo praćenje. Ne traži pristup vašoj lokaciji, kontaktima, fotografijama, kameri ni mikrofonu. Ne šalje vlastite mrežne zahtjeve osim za učitavanje vlastitih datoteka, na primjer uvodnih filmova junaka.</p>

      <h2>4. Rezervne kopije koje sami pravite</h2>
      <p>U postavkama igre Starfall Grove možete <b>izvesti</b> datoteku s rezervnom kopijom ili je <b>uvesti</b>. Datoteka se pravi i čita na vašem uređaju. Ide tamo gdje je vi stavite i nikada nam se ne šalje.</p>

      <h2>5. Hosting web stranice i verzija za pretraživač</h2>
      <p>Ova web stranica i verzije igara za pretraživač hostuju se na usluzi <b>GitHub Pages</b> kompanije GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, SAD. Kada otvorite stranicu, vaš pretraživač se povezuje sa serverima GitHuba. Da bi to radilo, i radi sigurnosti, GitHub obrađuje tehničke podatke o vezi kao što su vaša IP adresa, datum i vrijeme, tražena datoteka i vrsta pretraživača, i može ih čuvati u zapisima servera. Mi nemamo pristup tim zapisima. GitHub ove podatke može obrađivati u SAD-u. Detalje pogledajte u <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" rel="noopener">GitHub Privacy Statement</a>.</p>
      <p>Pravni osnov je naš legitimni interes da igre i ovu web stranicu isporučimo pouzdano i sigurno (član 6. stav 1. tačka f) GDPR-a). Fontovi se isporučuju zajedno s igrama s istog mjesta, pa se ne šalje nikakav zahtjev Google Fontsu ni drugim trećim stranama.</p>

      <h2>6. Prodavnice aplikacija</h2>
      <p>Ako igru preuzmete s <b>Google Playa</b> ili iz <b>Apple App Storea</b>, preuzimanjem i vašim računom u prodavnici upravljaju Google ili Apple prema vlastitim pravilima privatnosti. Prodavnice programerima mogu davati anonimnu, zbirnu statistiku, poput broja instalacija, ili izvještaje o padovima ako ste to dozvolili u postavkama uređaja. Iz toga ne možemo saznati ko ste.</p>
      <ul>
        <li>Google: <a href="https://policies.google.com/privacy" rel="noopener">policies.google.com/privacy</a></li>
        <li>Apple: <a href="https://www.apple.com/legal/privacy/" rel="noopener">apple.com/legal/privacy</a></li>
      </ul>

      <h2>7. Djeca</h2>
      <p>Starfall Grove ni od koga ne prikuplja lične podatke, pa ni od djece. Nema chat ni kontakt s drugim igračima.</p>

      <h2>8. Vaša prava</h2>
      <p>Prema GDPR-u i sličnim zakonima imate pravo na pristup svojim ličnim podacima, njihov ispravak i brisanje. Možete tražiti i ograničenje obrade, uložiti prigovor, dobiti podatke u prenosivom obliku i podnijeti pritužbu nadzornom tijelu za zaštitu podataka. Za Starfall Grove nemamo nikakve podatke o vama; vaše snimljene igre su na vašem uređaju i tamo ih možete izbrisati.</p>

      <h2>9. Izmjene ove politike</h2>
      <p>Ako igre počnu drugačije postupati s podacima, ažurirat ćemo ovu politiku prije nego što izmjena stupi na snagu i promijeniti datum na vrhu.</p>

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
      <p><b>Mini Rift</b>, naša online borbena igra, vaš profil umjesto toga čuva na našem serveru (pogledajte politiku privatnosti). Novčići, junaci, skinovi i rangovi u igri Mini Rift su virtuelni predmeti koje zarađujete igranjem. Ne mogu se kupiti, prodati ni zamijeniti za novac i nemaju vrijednost izvan igre. Možemo mijenjati cijene, nagrade i balans igre te resetovati ili izbrisati profile koji varaju ili zloupotrebljavaju igru. Svoj profil možete izbrisati bilo kada na stranici profila.</p>

      <h2>4. Prodavnice aplikacija</h2>
      <p>Ako igru nabavite preko Google Playa ili Apple App Storea, za preuzimanje i eventualnu kupovinu, uključujući povrat novca, važe i uslovi te prodavnice. Za iOS aplikaciju važi i Appleov <a href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/" rel="noopener">standardni licencni ugovor s krajnjim korisnikom (EULA)</a>. Apple nije odgovoran za igru niti za njenu podršku.</p>

      <h2>5. Fer igra</h2>
      <p>Molimo vas da ne napadate, ne preopterećujete i ne ometate servere na kojima je igra. Molimo vas i da igru ne koristite za kršenje zakona.</p>
      <p>U igri Mini Rift igrajte fer: bez varanja, skripti, zloupotrebe grešaka ili namjernog napuštanja mečeva, i bez korisničkih imena ili poruka u chatu koji vrijeđaju, lažno predstavljaju ili uznemiravaju druge. Takve račune možemo blokirati ili izbrisati.</p>

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
      <p>Za Starfall Grove o vama nemamo nikakve podatke, pa kod nas nema šta da se briše. Detalji su u našoj <a href={route('privacy')}>politici privatnosti</a>.</p>

      <h2 id="mini-rift">Mini Rift</h2>
      <h3 id="delete-profile">Kako da izbrišem svoj Mini Rift profil?</h3>
      <p>U igri Mini Rift otvorite <b>Profile</b> i dodirnite <b>Delete my profile</b>, a zatim još jednom za potvrdu. Vaš račun s korisničkim imenom, e-mailom, novčićima, junacima, skinovima, rangovima, prijateljima i historijom mečeva odmah se uklanja s našeg servera. Ako se više ne možete prijaviti, pišite nam s e-mail adrese računa i navedite korisničko ime; brišemo ga u roku od 30 dana. Deinstaliranje aplikacije ili brisanje podataka pretraživača <b>ne</b> briše račun, samo odjavljuje taj uređaj.</p>
      <h3>Kako da igram sa svojim profilom na drugom uređaju?</h3>
      <p>Na drugom uređaju se prijavite korisničkim imenom i lozinkom (<b>Log in</b>). Sav vaš napredak je tamo. Zaboravili ste lozinku? Dodirnite <b>Forgot password?</b>, unesite e-mail i otvorite link iz e-maila; vrijedi jedan sat.</p>
      <h3>Kako da prijavim igrača?</h3>
      <p>U chatu dodirnite ime igrača (ili „…“ kod prijatelja) i izaberite <b>Report</b> s razlogom. Uz <b>Block</b> vam njegove poruke i zahtjevi više ne stižu. Svaku prijavu provjeravamo i po potrebi uklanjamo imena ili brišemo račune. Možete nam i pisati.</p>
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

export const pages = { privacy: Privacy, 'minirift/privacy': MiniRiftPrivacy, terms: Terms, support: Support, imprint: Imprint };
