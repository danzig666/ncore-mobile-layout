# nCore mobilnézet

Egy Tampermonkey-felhasználói parancsfájl, amely mobilon és keskeny böngészőablakban reszponzívabbá, érintésbarátabbá és könnyebben kezelhetővé teszi az nCore felületét. Az oldal eredeti torrent- és könyvjelzőfunkcióit nem helyettesíti, csak a megjelenést és a kezelhetőséget javítja.

## Telepítés

1. Telepíts egy felhasználói parancsfájlokat kezelő böngészőbővítményt, például a [Tampermonkeyt](https://www.tampermonkey.net/).
2. Nyisd meg az alábbi telepítési hivatkozást.
3. A Tampermonkey telepítési oldalán válaszd a **Telepítés** lehetőséget.

### [A nCore mobilnézet telepítése](https://raw.githubusercontent.com/danzig666/ncore-mobile-layout/main/ncore-mobile-layout.user.js)

Az újabb verziókat a felhasználói parancsfájl kezelője a fenti forrásból tudja ellenőrizni és telepíteni.

## Mit csinál?

A parancsfájl 760 képpont szélesség alatt aktiválja a mobilos elrendezést, és többek között:

- reszponzívvá teszi az oldal fő tartalmi elemeit;
- lenyitható, érintésbarát főmenüt hoz létre;
- egyszerűsíti a keresést, a további szűrőket pedig külön nyitható panelbe rendezi;
- kompakt, könnyebben áttekinthető torrentlistát jelenít meg;
- nagyobb érintési felületeket ad a gomboknak, lapozóknak és űrlapmezőknek;
- mobilra igazítja a torrent részleteit, a hozzászólásokat és a könyvjelzőkezelőt;
- billentyűzettel is használhatóvá tesz több vezérlőt, és kiegészítő akadálymentesítési címkéket ad hozzá;
- a fejléc logóját a torrentlistára mutató hivatkozássá alakítja.

Asztali, 760 képpontnál szélesebb nézetben a webhely eredeti elrendezése marad használatban.

## Használat

A telepítés után nyisd meg vagy töltsd újra az [nCore](https://ncore.pro/) oldalát. A parancsfájl automatikusan működésbe lép, külön beállítást nem igényel.

Ideiglenes kikapcsoláshoz vagy eltávolításhoz nyisd meg a Tampermonkey kezelőfelületét, és kapcsold ki vagy töröld az **nCore mobilnézet** parancsfájlt.

## Adatvédelem

A parancsfájl kizárólag a `https://ncore.pro/*` oldalakon fut. Nem továbbít adatot külső szolgáltatásnak, és nem végez külső hálózati kéréseket.

## Fontos

Ez egy nem hivatalos, közösségi kiegészítés; nem áll kapcsolatban az nCore üzemeltetőivel. Az nCore felületének későbbi módosításai befolyásolhatják a működését.
