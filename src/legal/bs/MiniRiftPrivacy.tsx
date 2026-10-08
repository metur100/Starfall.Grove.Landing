import site from '../../../site.json';
import { Email, Publisher, route, updated } from '../Layout';

/** Politika privatnosti igre Mini Rift: online igra s računima, prijateljima, chatom i serverom. */
export default function MiniRiftPrivacy() {
  return (
    <>
      <p className="updated">Posljednja izmjena: {updated()}</p>

      <div className="summary">
        <p><strong>Ukratko:</strong> Mini Rift je online igra, pa joj trebaju račun i server. Čuvamo vaše korisničko ime, e-mail adresu, hash vaše lozinke, napredak u igri, prijatelje i rezultate mečeva. Chat se prosljeđuje drugim igračima i ne čuva se, osim ako neko prijavi poruku. Šaljemo vam samo e-mailove koji su igri potrebni (dobrodošlica i potvrda, poništavanje lozinke). Nema reklama, analitike, praćenja ni kupovina, a svoj račun možete izbrisati bilo kada na stranici Profil.</p>
      </div>

      <p>Ova politika važi za <b>Mini Rift</b>, našu online borbenu igru 3 na 3, bilo da je igrate u pretraživaču, kao Android aplikaciju s Google Playa ili kao iOS aplikaciju iz App Storea. Naša igra s pričom Starfall Grove uopće ne prikuplja lične podatke i ima <a href={route('privacy')}>vlastitu politiku privatnosti</a>.</p>

      <h2>1. Ko je odgovoran</h2>
      <p>Mini Rift razvija i objavljuje:</p>
      <Publisher />
      <p>Više podataka nalazi se u <a href={route('imprint')}>impresumu</a>.</p>

      <h2>2. Vaš račun</h2>
      <p>Da biste igrali, pravite račun. Čuvamo:</p>
      <ul>
        <li><b>Vaše korisničko ime</b>, koje vide drugi igrači. Možete ga promijeniti na stranici Profil; čuvamo samo trenutno.</li>
        <li><b>Vašu e-mail adresu</b>, koju vidimo samo mi. Koristimo je da potvrdimo vašu registraciju, da pošaljemo linkove za poništavanje lozinke i da vam odgovorimo kada nam pišete.</li>
        <li><b>Vašu lozinku</b>, sačuvanu samo kao posoljeni hash (PBKDF2). Ne možemo je pročitati i nikada je nikome ne šaljemo.</li>
        <li><b>Da li ste potvrdili e-mail</b>, a dok potvrda ili poništavanje lozinke čeka, hash jednokratnog koda i vrijeme kada ističe (7 dana za potvrdu, 1 sat za poništavanje).</li>
        <li><b>Kada je račun napravljen.</b></li>
      </ul>

      <h2>3. Ostanak prijavljen</h2>
      <p>Svaki uređaj na kojem se prijavite čuva nasumični ključ za prijavu u svojoj lokalnoj memoriji. Naš server čuva samo njegov hashirani oblik, kako biste ostali prijavljeni. Odjava briše ključ; poništavanje lozinke odjavljuje sve ostale uređaje. Da bi zaštitio račune od pogađanja lozinki, server kratko pamti neuspjele prijave za korisničko ime (5 minuta, samo u radnoj memoriji).</p>

      <h2>4. Vaš profil u igri</h2>
      <p>Da bi se vaš napredak sačuvao, server čuva vaš profil u igri:</p>
      <ul>
        <li>vaše novčiće, nivo igrača i iskustvo;</li>
        <li>heroje i skinove koje posjedujete, skin koji svaki heroj nosi, vaš talisman i vašu <b>profilnu sliku</b> (amblem, stvorenje ili portret heroja koji ste odabrali u igri);</li>
        <li>vaše rejtinge i rangove za bitke i duele;</li>
        <li>vaše ukupne igre, pobjede, ubistva, smrti i asistencije, igre i pobjede po heroju i vaših zadnjih dvanaest mečeva;</li>
        <li>vaše dnevne zadatke i koliko ste daleko stigli danas, te dan vašeg zadnjeg bonusa za prvu pobjedu.</li>
      </ul>

      <h2>5. Prijatelji, chat i prijave</h2>
      <ul>
        <li><b>Prijatelji</b>: vaša lista prijatelja, zahtjevi za prijateljstvo koji čekaju vaš odgovor i igrači koje ste blokirali.</li>
        <li><b>Chat</b>: poruke koje pišete u sobama, mečevima ili prijatelju, kao i signali na mapi u meču, prosljeđuju se drugim igračima u stvarnom vremenu i <b>ne čuvaju se</b>.</li>
        <li><b>Prijave</b>: ako prijavite igrača ili neko prijavi vas, čuvamo prijavu: ko je koga prijavio, razlog, prijavljenu poruku (ako postoji) i vrijeme. Prijave nam se šalju i e-mailom kako bismo ih pregledali.</li>
      </ul>

      <h2>6. Zapisi mečeva</h2>
      <p>Za svaki završeni meč server čuva kod sobe, način igre, mapu, pobjednika i trajanje, a za svakog igrača u njemu ime, heroja, tim i statistiku meča (npr. ubistva, smrti, asistencije i štetu). Koriste se za historiju mečeva, rang listu i balansiranje heroja.</p>

      <h2>7. Šta vide drugi igrači</h2>
      <p>Drugi igrači vide vaše korisničko ime, profilnu sliku, nivo, rang, heroja i skin, statistiku mečeva, vaše mjesto na rang listi, ono što pišete u chatu i, samo vaši prijatelji, da li ste online. Molimo vas da kao korisničko ime ne koristite svoje pravo ime ili nešto lično. Korisnička imena s uvredama se odbijaju, a grube riječi u chatu se prikrivaju. Svakog igrača možete blokirati i prijaviti.</p>

      <h2>8. Šta ostaje na vašem uređaju</h2>
      <p>Igra koristi lokalnu memoriju vašeg pretraživača ili aplikacije za vaš ključ za prijavu, ime koje ste zadnje koristili, zadnju odabranu vrstu i veličinu meča te postavke zvuka i grafike. To je neophodno za igru koju želite igrati i briše se kada obrišete podatke stranice ili deinstalirate aplikaciju. Aplikacija je okvir oko igre u pretraživaču: ne traži nikakve dozvole osim vibracije (za podrhtavanje kada vas pogode) i sve ostale linkove otvara u vašem pretraživaču.</p>

      <h2>9. E-mailovi</h2>
      <p>Šaljemo samo e-mailove koji su igri potrebni: <b>e-mail dobrodošlice</b> s linkom za potvrdu registracije kada se registrujete (i ponovo, ako to zatražite na stranici Profil), te link za <b>poništavanje lozinke</b> kada ga zatražite. Ne šaljemo newslettere ni reklame. E-mailovi se šalju preko usluge <b>Gmail kompanije Google</b>, koja ih obrađuje samo da bi ih dostavila.</p>

      <h2>10. Podaci o vezi i gdje se čuvaju vaši podaci</h2>
      <p>Dok ste povezani, server obrađuje vašu IP adresu i ono što radite u meču, samo da bi igra radila; ne čuva ih. Mini Rift server i njegovu bazu podataka za nas vodi hosting provajder <b>MonsterASP.NET</b>, koji iz sigurnosnih razloga može voditi tehničke zapise. Datoteke igre (verzija za pretraživač) isporučuje <b>GitHub Pages</b>, usluga kompanije GitHub, Inc., SAD, koja za to obrađuje podatke o vezi poput vaše IP adrese (vidi <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" rel="noopener">GitHub Privacy Statement</a>). Google i GitHub mogu obrađivati podatke u SAD-u; obje kompanije su certificirane prema okviru EU-U.S. Data Privacy Framework.</p>

      <h2>11. Zašto obrađujemo vaše podatke</h2>
      <ul>
        <li>Da bismo vam pružili igru za koju ste se registrovali: vaš račun, prijavu, napredak, matchmaking, prijatelje, chat, rang listu i potrebne e-mailove (čl. 6(1)(b) GDPR).</li>
        <li>Da bi igra bila sigurna i fer: hashirane lozinke, ograničeni pokušaji prijave, prikrivene grube riječi, pregled prijava i zapisi mečeva za balansiranje (naš legitimni interes, čl. 6(1)(f) GDPR).</li>
      </ul>

      <h2>12. Koliko dugo ih čuvamo</h2>
      <p>Vaš račun i profil čuvaju se dok ih ne izbrišete. Na stranici Profil, <b>Delete my profile</b> odmah uklanja vaš račun, profil, listu prijatelja i prijave s našeg servera; možete nas zamoliti i e-mailom. Prijave čuvamo do 12 mjeseci. Zapisi mečeva čuvaju se za historiju mečeva i statistiku; ako želite da se i odatle ukloni vaše ime, pišite nam.</p>

      <h2>13. Šta Mini Rift ne radi</h2>
      <p>Mini Rift ne prikazuje reklame, nema alate za analitiku ni praćenje, nema dodatke društvenih mreža i ništa ne prodaje: novčići se mogu zaraditi samo igranjem. Nikada ne traži vašu lokaciju, kontakte, fotografije, kameru ili mikrofon, a vaše podatke ne prodajemo niti ih dajemo bilo kome za njegove vlastite svrhe.</p>

      <h2>14. Prodavnice aplikacija</h2>
      <p>Ako Mini Rift preuzmete s <b>Google Playa</b> ili iz <b>Apple App Storea</b>, preuzimanje i vaš račun u prodavnici obrađuju Google ili Apple prema vlastitim pravilima privatnosti (<a href="https://policies.google.com/privacy" rel="noopener">Google</a>, <a href="https://www.apple.com/legal/privacy/" rel="noopener">Apple</a>). Prodavnice nam mogu dati anonimne, zbirne statistike poput broja instalacija, ili izvještaje o padovima ako ste to dozvolili na uređaju. Iz njih ne možemo saznati ko ste.</p>

      <h2>15. Djeca</h2>
      <p>Mini Rift ima chat s drugim igračima i namijenjen je igračima od 13 godina naviše. Djeca mlađa od 13 godina ne bi se trebala registrovati. Ako je dijete mlađe od 13 godina napravilo račun, roditelj ga može izbrisati na stranici Profil ili nas zamoliti e-mailom, i mi ćemo ga izbrisati.</p>

      <h2>16. Vaša prava</h2>
      <p>Prema GDPR-u imate pravo na pristup svojim ličnim podacima, njihovu ispravku i brisanje. Možete i ograničiti njihovu obradu ili joj se usprotiviti, dobiti ih u prenosivom obliku i podnijeti pritužbu nadzornom tijelu za zaštitu podataka. Vaš profil prikazan je na stranici Profil u igri Mini Rift, gdje možete i promijeniti korisničko ime i izbrisati račun. Za sve ostalo pišite nam s e-mail adrese vašeg računa i navedite svoje korisničko ime.</p>

      <h2>17. Izmjene ove politike</h2>
      <p>Ako Mini Rift počne drugačije postupati s podacima, ažurirat ćemo ovu politiku prije nego što izmjena stupi na snagu i promijeniti datum na vrhu.</p>

      <h2>18. Kontakt</h2>
      <p>Ako imate pitanja o privatnosti u igri Mini Rift, pišite na <Email subject="Mini Rift privatnost" />. Mini Rift u pretraživaču: <a href={site.mobaUrl} rel="noopener">{site.mobaUrl.replace(/^https:\/\//, '')}</a>.</p>
    </>
  );
}
