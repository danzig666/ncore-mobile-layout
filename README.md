# nCore mobilnézet

Egy Tampermonkey-felhasználói parancsfájl, amely mobilon reszponzívabbá, érintésbarátabbá és könnyebben kezelhetővé teszi az nCore felületét. Az oldal eredeti torrent- és könyvjelzőfunkcióit nem helyettesíti, csak a megjelenést és a kezelhetőséget javítja. Az alap nCore-felülettel és az nCore aNi által módosított torrentlistával is használható.

## Telepítés

1. Telepíts egy felhasználói parancsfájlokat kezelő böngészőbővítményt, például a [Tampermonkeyt](https://www.tampermonkey.net/).
2. Nyisd meg az alábbi telepítési hivatkozást.
3. A Tampermonkey telepítési oldalán válaszd a **Telepítés** lehetőséget.

### [A nCore mobilnézet telepítése](https://raw.githubusercontent.com/danzig666/ncore-mobile-layout/main/ncore-mobile-layout.user.js)

Az újabb verziókat a felhasználói parancsfájl kezelője a fenti forrásból tudja ellenőrizni és telepíteni.

## Mit csinál?

A parancsfájl automatikus módban legfeljebb 760 CSS-képpont szélességű, elsődlegesen érintéssel vezérelt nézetben aktiválja a mobilos elrendezést, és többek között:

- reszponzívvá teszi az oldal fő tartalmi elemeit;
- lenyitható, érintésbarát főmenüt hoz létre;
- változatlanul elérhető keresést és külön nyitható szűrőpanelt hoz létre, a kiválasztott feltételek összefoglalásával;
- a kereső kategória- és típusnevei közvetlenül kattintható szűrőlinkek; a mellettük lévő jelölőnégyzetek megtartják az eredeti kiválasztási vagy altípusnyitó működésüket;
- olvasható torrentkártyákat jelenít meg, mindig látható mérettel, seed/leech számmal, kategóriával és feltöltési dátummal/idővel; az időbélyeg a meglévő gombsorba kerül, további sor nélkül;
- kibontáskor sem ismétli meg a dátumot és a méretet külön nagy blokkokban, és elrejti a külön letöltésszám- és feltöltőnév-mezőt;
- külön kibontás- és részletekgombot, valamint szöveges állapotjelzéseket ad a torrentekhez;
- mobilon elrejti az aNi kiemelőt, és nem írja ki az „Új”, „Ellenőrzött” és „Ellenőrizetlen” feliratokat; asztalon az aNi megjelenése változatlan;
- az aNi torrentelrejtő ikon helyén mobilon kattintható IMDb-pontszámot jelenít meg, ha van értékelés;
- mobilos rendezést és egyszerű előző/következő lapozót biztosít a lista felett és alatt;
- nagyobb érintési felületeket ad a gomboknak, lapozóknak és űrlapmezőknek;
- mobilra igazítja a torrent részleteit, a hozzászólásokat és a könyvjelzőkezelőt;
- mobilon elrejti a hozzászólások avatárjait, így a szöveg teljes szélességben olvasható;
- billentyűzettel is használhatóvá tesz több vezérlőt, és kiegészítő akadálymentesítési címkéket ad hozzá;
- összecsukható fióksávot és közvetlen könyvjelző-elérést biztosít;
- kezeli a párbeszédablakok fókuszát, a Tab billentyűt, az Escape bezárást és a háttér görgetésének zárolását;
- mobilon a fejléc üres logóját a torrentlistára mutató hivatkozássá alakítja.

Asztali, egérrel vezérelt nézetben automatikus módban nem módosítja az oldal stílusát vagy DOM-ját, akkor sem, ha az oldalsáv vagy a nagyítás miatt keskeny az ablak. 760 CSS-képpontnál szélesebb nézetben a mobilmód mindig kikapcsol. Mobilból asztali nézetre váltáskor eltávolítja a hozzáadott elemeket, és visszaállítja az eredeti vezérlők helyét és attribútumait, a beírt értékek megtartásával.

## Használat

A telepítés után nyisd meg vagy töltsd újra az [nCore](https://ncore.pro/) oldalát. A parancsfájl automatikusan működésbe lép, külön beállítást nem igényel.

A Tampermonkey menüjében három nézet választható; a választást a bővítmény megjegyzi:

- **Nézet: automatikus (érintőképernyő)**: mobilnézet keskeny, érintéssel vezérelt ablakban; ez az alapbeállítás.
- **Nézet: mobil (keskeny ablakban)**: mobilnézet egér mellett is, legfeljebb 760 CSS-képpont szélességig; asztali előnézethez is használható.
- **Nézet: eredeti asztali**: az eredeti oldal minden képernyőméreten.

A fizikai monitor felbontása és a böngésző CSS-képpontban mért tartalmi szélessége eltérhet. A nagyítás és a böngésző oldalsávja csökkentheti az utóbbit; automatikus módban az érintéses vezérlés feltétele védi az asztali nézetet.

Ideiglenes kikapcsoláshoz vagy eltávolításhoz nyisd meg a Tampermonkey kezelőfelületét, és kapcsold ki vagy töröld az **nCore mobilnézet** parancsfájlt.

## Adatvédelem

A parancsfájl kizárólag a `https://ncore.pro/*` oldalakon fut. Nem továbbít adatot külső szolgáltatásnak, és nem végez külső hálózati kéréseket. Csak a választott nézetbeállítást tárolja a Tampermonkey helyi tárhelyén. A keresés, rendezés, lapozás, letöltés és könyvjelzőkezelés az oldal meglévő vezérlőit és hivatkozásait használja.

## Fejlesztői ellenőrzés

A külső függőség nélküli, mesterséges tesztoldal indítása: `node tests/preview-server.js`. Nyisd meg a kiírt helyi címet. A tesztoldal nem tartalmaz felhasználói adatot, és nem kapcsolódik az nCore-hoz. Az ellenőrzési lépések a [tests/README.md](tests/README.md) fájlban találhatók.

## Fontos

Ez egy nem hivatalos, közösségi kiegészítés; nem áll kapcsolatban az nCore üzemeltetőivel. Az nCore felületének későbbi módosításai befolyásolhatják a működését.
