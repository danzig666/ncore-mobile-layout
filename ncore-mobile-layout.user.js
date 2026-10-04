// ==UserScript==
// @name         nCore mobilnézet
// @namespace    local.ncore.mobile
// @version      1.2.1
// @description  Reszponzív, érintésbarát nCore-felület, amely megőrzi az oldal eredeti torrent- és könyvjelzőfunkcióit.
// @homepageURL  https://github.com/danzig666/ncore-mobile-layout
// @supportURL   https://github.com/danzig666/ncore-mobile-layout/issues
// @downloadURL  https://raw.githubusercontent.com/danzig666/ncore-mobile-layout/main/ncore-mobile-layout.user.js
// @updateURL    https://raw.githubusercontent.com/danzig666/ncore-mobile-layout/main/ncore-mobile-layout.user.js
// @match        https://ncore.pro/*
// @run-at       document-start
// @grant        GM_addStyle
// ==/UserScript==

(function () {
    'use strict';

    const MOBILE_BREAKPOINT = 760;
    const MOBILE_MEDIA = `(max-width: ${MOBILE_BREAKPOINT}px)`;

    document.documentElement.classList.add('ncm-enabled');

    function installViewport() {
        let viewport = document.querySelector('meta[name="viewport"]');
        if (!viewport) {
            if (!document.head) return false;
            viewport = document.createElement('meta');
            viewport.name = 'viewport';
            document.head.appendChild(viewport);
        }
        viewport.content = 'width=device-width, initial-scale=1, viewport-fit=cover';
        return true;
    }

    if (!installViewport()) {
        const headObserver = new MutationObserver(() => {
            if (installViewport()) headObserver.disconnect();
        });
        headObserver.observe(document.documentElement, { childList: true, subtree: true });
    }

    const css = String.raw`
/* nCore mobilnézet -------------------------------------------------------- */
.ncm-menu-toggle,
.ncm-filter-toggle {
    display: none;
}

#fej_fejlec .ncm-logo-link {
    display: block;
    width: 100%;
    height: 100%;
}

@media ${MOBILE_MEDIA} {
    :root {
        --ncm-bg: #37536a;
        --ncm-panel: #476176;
        --ncm-panel-alt: #536c80;
        --ncm-dark: #364b5c;
        --ncm-border: #668299;
        --ncm-accent: #3cb8e6;
        --ncm-text: #ffffff;
        --ncm-muted: #d7edff;
        --ncm-radius: 8px;
        --ncm-touch: 44px;
    }

    html.ncm-enabled {
        min-width: 0 !important;
        overflow-x: hidden;
        -webkit-text-size-adjust: 100%;
        text-size-adjust: 100%;
    }

    html.ncm-enabled body {
        min-width: 0 !important;
        overflow-x: hidden;
        font-size: 14px !important;
        line-height: 1.35;
    }

    html.ncm-enabled *,
    html.ncm-enabled *::before,
    html.ncm-enabled *::after {
        box-sizing: border-box;
    }

    html.ncm-enabled img {
        max-width: 100%;
    }

    #container,
    #container_in,
    #div_body,
    #main,
    #main_all,
    #main_tartalom,
    .fobox_all,
    .fobox_all_alone,
    .lista_all,
    .commentbox_all,
    #infosav,
    #footer_bg {
        width: 100% !important;
        max-width: 100% !important;
        min-width: 0 !important;
    }

    #main_all {
        padding: 0 8px;
    }

    #main_tartalom {
        margin-top: 12px !important;
    }

    .fobox_all,
    .fobox_all_alone,
    .lista_all,
    .commentbox_all {
        margin-bottom: 10px !important;
    }

    .fobox_fej,
    .fobox_fej_alone,
    .lista_fej,
    .userbox_fej,
    .userbox_fej2,
    .userbox_fej_mini,
    .userbox_fej_mini2 {
        height: auto !important;
        min-height: 34px;
        padding: 8px 10px !important;
        font-size: 14px;
    }

    .fobox_tartalom,
    .fobox_tartalom_alone,
    .userbox_tartalom,
    .userbox_tartalom2,
    .userbox_tartalom_mini,
    .userbox_tartalom_mini2 {
        min-width: 0 !important;
        max-width: 100% !important;
    }

    #div_body_space {
        height: 24px !important;
    }

    #fej_fejlec_bg {
        min-height: 55px;
    }

    #fej_fejlec {
        margin: 12px auto !important;
    }

    /* Fő navigáció */
    #menu_bg {
        position: sticky;
        top: 0;
        z-index: 2500;
        background: var(--ncm-bg);
        border-bottom: 1px solid var(--ncm-border);
    }

    #menu_all {
        width: 100% !important;
        height: auto !important;
        min-height: var(--ncm-touch);
        padding: 4px 8px;
    }

    #menu_left,
    #menu_right,
    #menu_all .menu_arrow {
        display: none !important;
    }

    .ncm-menu-toggle {
        display: flex;
        width: 100%;
        min-height: var(--ncm-touch);
        align-items: center;
        justify-content: space-between;
        padding: 8px 12px;
        border: 1px solid var(--ncm-border);
        border-radius: var(--ncm-radius);
        background: var(--ncm-dark);
        color: var(--ncm-text);
        font: 700 15px Verdana, Geneva, Arial, sans-serif;
        cursor: pointer;
    }

    .ncm-menu-toggle::after {
        content: '☰';
        font-size: 22px;
        line-height: 1;
    }

    .ncm-menu-toggle[aria-expanded="true"]::after {
        content: '×';
    }

    #menu_center {
        display: none !important;
        width: 100% !important;
        padding: 6px 0 2px;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 5px;
    }

    html.ncm-nav-open #menu_center {
        display: grid !important;
    }

    #menu_center .menu_text,
    .menu_center_staff .menu_text {
        float: none !important;
        margin: 0 !important;
        min-width: 0;
    }

    #menu_center .menu_link {
        display: flex;
        min-height: var(--ncm-touch);
        align-items: center;
        justify-content: center;
        padding: 7px;
        border-radius: 6px;
        background: var(--ncm-panel);
        text-align: center;
    }

    /* Fiók- és állapotsáv */
    #infosav {
        display: flex;
        height: auto !important;
        min-height: 54px;
        flex-wrap: wrap;
        align-items: center;
        padding: 6px 8px;
    }

    #infosav .infosav_l,
    #infosav .infosav_r {
        display: none !important;
    }

    #infosav .infosav_c {
        display: flex;
        width: 100% !important;
        min-width: 0;
        flex-wrap: wrap;
        align-items: center;
        gap: 6px;
    }

    #infosav_adatok {
        float: none !important;
        width: 100% !important;
        padding: 2px !important;
        overflow-wrap: anywhere;
        line-height: 1.55;
    }

    #infosav_extra {
        display: flex;
        float: none !important;
        width: 100%;
        padding: 2px 0 !important;
        flex-wrap: wrap;
        gap: 5px;
    }

    #infosav_extra .i_e_vonal {
        display: none !important;
    }

    #infosav_extra > div:not(.i_e_vonal) {
        width: var(--ncm-touch) !important;
        height: var(--ncm-touch) !important;
        background-position: center !important;
        background-repeat: no-repeat !important;
        border: 1px solid var(--ncm-border);
        border-radius: 6px;
    }

    #infosav_extra a,
    #infosav_extra .i_e_link {
        display: block;
        width: 100% !important;
        height: 100% !important;
    }

    /* Általános, érintésbarát vezérlők */
    input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="image"]),
    select,
    textarea,
    .beviteliMezo,
    .valasztasMezo,
    .valasztasMezo2,
    .keresesMezo {
        max-width: 100% !important;
        min-height: 42px;
        padding: 8px !important;
        font-size: 16px !important;
    }

    input[type="checkbox"],
    input[type="radio"] {
        width: 22px;
        height: 22px;
        margin: 7px;
    }

    input[type="image"].g_mehet,
    input[type="image"].g_elonezet {
        width: 108px !important;
        height: var(--ncm-touch) !important;
        border: 1px solid var(--ncm-border) !important;
        border-radius: 6px;
        background-position: center !important;
        background-repeat: no-repeat !important;
    }

    /* Keresés és szűrők */
    .ncm-filter-toggle {
        display: flex;
        width: 100%;
        min-height: var(--ncm-touch);
        align-items: center;
        justify-content: space-between;
        margin-bottom: 8px;
        padding: 8px 12px;
        border: 1px solid var(--ncm-border);
        border-radius: 6px;
        background: var(--ncm-dark);
        color: var(--ncm-text);
        font: 700 14px Verdana, Geneva, Arial, sans-serif;
    }

    .ncm-filter-toggle::after {
        content: '＋';
        font-size: 18px;
    }

    .ncm-filter-toggle[aria-expanded="true"]::after {
        content: '−';
    }

    #kategoriak,
    #kategoriak.ncm-open {
        display: block !important;
    }

    #kategoriak:not(.ncm-open) #table_torrcat,
    #kategoriak:not(.ncm-open) > form > div[id$="_resz"],
    #kategoriak:not(.ncm-open) > form > .hr_stuff,
    #kategoriak:not(.ncm-open) #cimkek_lista,
    #kategoriak:not(.ncm-open) #keresoresz tr:not(:first-child) {
        display: none !important;
    }

    #kategoriak:not(.ncm-open) #keresoresz tr:first-child {
        display: grid !important;
        width: 100%;
        grid-template-columns: minmax(0, 1fr) 96px;
        gap: 7px;
        align-items: center;
    }

    #kategoriak:not(.ncm-open) #keresoresz tr:first-child > td {
        display: none !important;
        width: auto !important;
        padding: 0 !important;
    }

    #kategoriak:not(.ncm-open) #keresoresz tr:first-child > td:nth-child(2),
    #kategoriak:not(.ncm-open) #keresoresz tr:first-child > td:nth-child(8) {
        display: block !important;
    }

    #kategoriak:not(.ncm-open) #keresoresz #mire {
        width: 100% !important;
        min-height: var(--ncm-touch);
    }

    #kategoriak:not(.ncm-open) #keresoresz input.g_mehet {
        width: 96px !important;
        min-width: 96px;
        height: var(--ncm-touch) !important;
        margin: 0;
        background-size: 82px 21px !important;
    }

    #kategoriak,
    #kereses_mezo,
    #keresoresz,
    #kategoriak table,
    #kategoriak tbody {
        width: 100% !important;
        max-width: 100% !important;
    }

    #kereses_mezo {
        display: flex;
        flex-direction: column;
    }

    #kereses_mezo > .ncm-search-container {
        order: -2;
        width: 100%;
    }

    #kereses_mezo > .ncm-filter-toggle {
        order: -1;
        margin-top: 8px;
    }

    #keresoresz,
    #keresoresz tbody,
    #keresoresz tr,
    #keresoresz td {
        display: block;
        width: 100% !important;
        height: auto !important;
        text-align: left !important;
    }

    #keresoresz td {
        padding: 5px 0 !important;
    }

    #keresoresz input[type="text"],
    #keresoresz select {
        width: 100% !important;
    }

    #table_torrcat,
    #table_torrcat tbody {
        display: block;
    }

    #table_torrcat tr {
        display: grid;
        grid-template-columns: 34px minmax(0, 1fr) 34px minmax(0, 1fr);
        align-items: center;
        gap: 2px;
    }

    #table_torrcat td {
        width: auto !important;
        min-height: 38px;
        padding: 2px !important;
    }

    #kategoriak > form > div[id$="_resz"] {
        width: 100% !important;
        overflow: hidden;
    }

    #kategoriak > form > div[id$="_resz"] table,
    #kategoriak > form > div[id$="_resz"] tbody {
        display: block;
    }

    #kategoriak > form > div[id$="_resz"] tr {
        display: grid;
        grid-template-columns: 34px minmax(0, 1fr) 34px minmax(0, 1fr);
        align-items: center;
        gap: 2px;
    }

    #kategoriak > form > div[id$="_resz"] td {
        width: auto !important;
        min-width: 0;
        min-height: 38px;
        padding: 3px !important;
        overflow-wrap: anywhere;
    }

    #kategoriak > form > div[id$="_resz"] td:first-child {
        grid-column: 1 / -1;
        min-height: var(--ncm-touch);
        padding-top: 10px !important;
        font-size: 14px;
    }

    #cimkek_lista table {
        display: grid;
        width: 100% !important;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 2px 6px;
    }

    #cimkek_lista tbody,
    #cimkek_lista tr {
        display: contents;
    }

    #cimkek_lista td {
        width: auto !important;
        min-height: 36px;
        padding: 5px !important;
        overflow-wrap: anywhere;
    }

    #letoltes_hr.hr_stuff,
    .hr_stuff {
        display: block !important;
        width: 100% !important;
        max-width: 100%;
    }

    #panel_stuff {
        display: none !important;
    }

    #pager_top,
    #pager_bottom {
        margin: 8px 0 !important;
        line-height: 2.8;
        overflow-wrap: anywhere;
    }

    #pager_top {
        display: none !important;
    }

    #pager_top a,
    #pager_top .active_link,
    #pager_bottom a,
    #pager_bottom .active_link {
        display: inline-flex;
        min-width: var(--ncm-touch);
        min-height: var(--ncm-touch);
        align-items: center;
        justify-content: center;
        margin: 2px;
        padding: 5px 8px;
        border: 1px solid var(--ncm-border);
        border-radius: 5px;
        background: var(--ncm-dark);
    }

    /* Torrentlista-kártyák */
    .box_alcimek_all,
    .box_alcimek_all_mini {
        display: none !important;
    }

    .box_torrent_all {
        width: 100%;
    }

    .box_torrent {
        display: grid !important;
        width: 100% !important;
        height: auto !important;
        min-height: 58px;
        grid-template-columns: minmax(0, 1fr);
        border-bottom: 3px solid var(--ncm-bg) !important;
    }

    .box_alap_img {
        display: none !important;
        float: none !important;
        width: 52px !important;
        height: 100% !important;
        min-height: 58px;
        grid-column: 1;
        border-right: 1px solid var(--ncm-border);
        background: var(--ncm-dark);
    }

    .box_alap_img > a {
        display: flex;
        width: 52px;
        min-height: var(--ncm-touch);
        align-items: flex-start;
        justify-content: center;
    }

    .categ_link {
        width: 51px !important;
        height: 32px !important;
    }

    .box_nagy,
    .box_nagy2 {
        display: grid !important;
        position: relative;
        float: none !important;
        width: auto !important;
        height: auto !important;
        min-width: 0;
        grid-column: 1;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        align-content: start;
    }

    .box_nev2 {
        position: relative;
        float: none !important;
        width: auto !important;
        min-width: 0;
        min-height: 58px;
        grid-column: 1 / -1;
        padding: 8px 52px 7px 8px;
        border-bottom: 1px solid var(--ncm-border);
    }

    .tabla_szoveg {
        min-width: 0;
        padding-left: 0 !important;
    }

    .torrent_txt,
    .torrent_txt2 {
        display: block;
        float: none !important;
        width: auto !important;
        min-width: 0;
        min-height: 0;
        margin: 0 !important;
    }

    .torrent_txt > a,
    .torrent_txt2 > a {
        display: inline;
        min-width: 0;
        padding: 2px 0;
        font-size: 14px;
        line-height: 1.35;
        overflow: visible;
        overflow-wrap: anywhere;
        text-overflow: clip;
        white-space: normal;
    }

    .torrent_txt nobr,
    .torrent_txt2 nobr {
        white-space: normal !important;
    }

    .torrent_txt_also {
        min-width: 0;
        min-height: 18px;
        margin-top: 2px !important;
        padding-right: 178px;
        overflow: hidden;
        line-height: 1.35;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .torrent_txt_also .infobar {
        display: none;
    }

    .torrent_txt_also .siterank {
        display: flex;
        float: none !important;
        max-width: 100%;
        min-width: 0;
        align-items: center;
        gap: 4px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .torrent_txt_also .siterank > span {
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .torrent_txt_also .siterank > .infolink {
        flex: 0 0 auto;
    }

    .torrent_konyvjelzo,
    .torrent_konyvjelzo2 {
        position: absolute !important;
        top: 8px;
        right: 7px;
        z-index: 2;
        display: flex !important;
        float: none !important;
        width: var(--ncm-touch) !important;
        height: var(--ncm-touch) !important;
        align-items: center;
        justify-content: center;
        margin: 0 !important;
        border: 1px solid var(--ncm-border);
        border-radius: 7px;
        background: var(--ncm-dark) !important;
        cursor: pointer;
        touch-action: manipulation;
    }

    .torrent_konyvjelzo::before,
    .torrent_konyvjelzo2::before {
        content: '＋';
        color: var(--ncm-text);
        font-size: 25px;
        font-weight: 400;
        line-height: 1;
    }

    .torrent_konyvjelzo:focus-visible,
    .torrent_konyvjelzo2:focus-visible,
    .bookmark_szerk:focus-visible,
    .ncm-menu-toggle:focus-visible,
    .ncm-filter-toggle:focus-visible {
        outline: 3px solid var(--ncm-accent);
        outline-offset: 2px;
    }

    .torrent_new,
    .torrent_gold,
    .torrent_hidden,
    .torrent_ok,
    .torrent_unchecked,
    .torrent_err {
        position: absolute !important;
        right: 10px;
        bottom: 6px;
        float: none !important;
        margin: 0 !important;
    }

    .box_feltoltve2,
    .box_meret2,
    .box_d2,
    .box_s2,
    .box_l2,
    .box_feltolto2 {
        float: none !important;
        width: auto !important;
        min-width: 0;
        min-height: 42px;
        margin: 0 !important;
        padding: 5px 7px !important;
        border-right: 1px solid var(--ncm-border);
        border-bottom: 1px solid var(--ncm-border);
        text-align: left !important;
        font-size: 11px;
        line-height: 1.3 !important;
        overflow-wrap: anywhere;
    }

    .box_torrent:not(.ncm-expanded) .box_d2,
    .box_torrent:not(.ncm-expanded) .box_s2,
    .box_torrent:not(.ncm-expanded) .box_l2,
    .box_torrent:not(.ncm-expanded) .box_feltolto2 {
        display: none !important;
    }

    .box_torrent:not(.ncm-expanded) .box_feltoltve2,
    .box_torrent:not(.ncm-expanded) .box_meret2 {
        display: block !important;
        position: absolute;
        bottom: 5px;
        z-index: 2;
        min-height: 0 !important;
        margin: 0 !important;
        padding: 0 !important;
        border: 0 !important;
        color: var(--ncm-muted);
        font-size: 8px;
        font-weight: 400;
        line-height: 9px !important;
        overflow: hidden;
        text-align: right !important;
        white-space: nowrap;
        pointer-events: none;
    }

    .box_torrent:not(.ncm-expanded) .box_feltoltve2 {
        right: 90px;
        width: 84px !important;
        height: 18px;
        white-space: normal;
    }

    .box_torrent:not(.ncm-expanded) .box_meret2 {
        right: 28px;
        width: 58px !important;
        height: 10px;
        text-overflow: ellipsis;
    }

    .box_torrent:not(.ncm-expanded) .box_feltoltve2::before,
    .box_torrent:not(.ncm-expanded) .box_meret2::before {
        display: none !important;
    }

    .ncm-category-label {
        display: inline;
        margin-right: 5px;
        color: var(--ncm-muted);
        font-size: 8px;
        font-weight: 400;
        line-height: 1;
        white-space: nowrap;
    }

    .box_torrent.ncm-expanded {
        grid-template-columns: 52px minmax(0, 1fr);
    }

    .box_torrent.ncm-expanded .box_alap_img {
        display: block !important;
        min-height: 184px;
    }

    .box_torrent.ncm-expanded .box_nagy,
    .box_torrent.ncm-expanded .box_nagy2 {
        grid-column: 2;
    }

    .box_torrent.ncm-expanded .ncm-category-label {
        display: none !important;
    }

    .box_torrent.ncm-expanded .box_feltoltve2,
    .box_torrent.ncm-expanded .box_meret2,
    .box_torrent.ncm-expanded .box_d2,
    .box_torrent.ncm-expanded .box_s2,
    .box_torrent.ncm-expanded .box_l2,
    .box_torrent.ncm-expanded .box_feltolto2 {
        display: block !important;
    }

    .box_feltoltve2::before,
    .box_meret2::before,
    .box_d2::before,
    .box_s2::before,
    .box_l2::before,
    .box_feltolto2::before {
        display: block;
        margin-bottom: 2px;
        color: var(--ncm-muted);
        font-size: 9px;
        font-weight: 400;
        text-transform: uppercase;
    }

    .box_feltoltve2::before { content: 'Feltöltve'; }
    .box_meret2::before { content: 'Méret'; }
    .box_d2::before { content: 'Letöltve'; }
    .box_s2::before { content: 'Seed'; }
    .box_l2::before { content: 'Leech'; }
    .box_feltolto2::before { content: 'Feltöltő'; }

    .box_feltolto2 {
        grid-column: auto;
    }

    .users_box_sepa {
        display: none !important;
    }

    /* Kibontott torrentadatok */
    .torrent_lenyilo,
    .torrent_lenyilo2 {
        width: 100% !important;
        max-width: 100% !important;
        min-width: 0;
        overflow: hidden;
    }

    .torrent_lenyilo_lehetoseg {
        display: grid !important;
        width: 100%;
        height: auto !important;
        min-height: 0;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 5px;
        padding: 8px;
    }

    .torrent_lenyilo_lehetoseg .lehetosegek {
        grid-column: 1 / -1;
        padding: 2px 0 4px !important;
        font-size: 13px;
    }

    .torrent_lenyilo_lehetoseg .letoltve,
    .torrent_lenyilo_lehetoseg .nfo,
    .torrent_lenyilo_lehetoseg .t_details,
    .torrent_lenyilo_lehetoseg .t_comments,
    .torrent_lenyilo_lehetoseg .fajlok,
    .torrent_lenyilo_lehetoseg .download_separ {
        display: none !important;
    }

    .torrent_lenyilo_lehetoseg .letoltve_txt,
    .torrent_lenyilo_lehetoseg .nfo_txt,
    .torrent_lenyilo_lehetoseg .t_details_txt,
    .torrent_lenyilo_lehetoseg .t_comments_txt,
    .torrent_lenyilo_lehetoseg .fajlok_txt {
        display: flex !important;
        float: none !important;
        min-width: 0;
        min-height: var(--ncm-touch);
        align-items: stretch;
        margin: 0 !important;
        border: 1px solid var(--ncm-border);
        border-radius: 6px;
        background: var(--ncm-dark);
        text-align: center;
    }

    .torrent_lenyilo_lehetoseg .letoltve_txt {
        grid-column: 1 / -1;
        align-items: center;
        justify-content: center;
        gap: 5px;
    }

    .torrent_lenyilo_lehetoseg .letoltve_txt a,
    .torrent_lenyilo_lehetoseg .nfo_txt a,
    .torrent_lenyilo_lehetoseg .t_details_txt a,
    .torrent_lenyilo_lehetoseg .t_comments_txt a,
    .torrent_lenyilo_lehetoseg .fajlok_txt a {
        display: flex;
        min-width: 0;
        min-height: var(--ncm-touch);
        flex: 1 1 auto;
        align-items: center;
        justify-content: center;
        padding: 7px;
        overflow-wrap: anywhere;
    }

    .torrent_lenyilo_tartalom,
    .torrent_lenyilo2 .torrent_lenyilo_tartalom {
        width: 100% !important;
        max-width: 100% !important;
        min-width: 0;
        padding: 12px !important;
        overflow: hidden;
        font-size: 13px;
        font-weight: 400 !important;
        line-height: 1.55;
        overflow-wrap: anywhere;
    }

    .torrent_lenyilo_tartalom > table,
    .torrent_lenyilo_tartalom .torrent_kep_ico {
        width: 100% !important;
        max-width: 100%;
        table-layout: fixed;
    }

    .torrent_lenyilo_tartalom .kepmeret_ico,
    .torrent_lenyilo_tartalom .kepmeret_txt {
        width: auto !important;
        padding: 4px !important;
        text-align: center;
        overflow-wrap: anywhere;
    }

    .torrent_kep_ico2,
    .torrent_kep_ico2 .fancy_groups,
    .torrent_kep_ico2 .attached_link {
        width: var(--ncm-touch) !important;
        height: var(--ncm-touch) !important;
    }

    .torrent_kep_ico2 {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
        background-position: center !important;
        background-repeat: no-repeat !important;
        border: 1px solid var(--ncm-border);
        border-radius: 6px;
    }

    [id^="ncoreajax"] {
        width: 100% !important;
        max-width: 100% !important;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
    }

    [id^="ncoreajax"] table,
    [id^="ncoreajax"] pre,
    [id^="ncoreajax"] code {
        max-width: 100% !important;
    }

    [id^="ncoreajax"] pre {
        overflow-x: auto;
        white-space: pre;
    }

    .torrent_lenyilo_lab {
        width: 100% !important;
        max-width: 100%;
    }

    /* Általános AJAX-párbeszédablakok, köztük a könyvjelző hozzáadása */
    .generic_dialog {
        position: fixed !important;
        inset: 0 !important;
        z-index: 3100 !important;
        width: 100% !important;
        height: 100dvh !important;
        overflow: auto !important;
        padding: 12px;
        background: rgba(26, 39, 50, 0.72);
    }

    .generic_dialog .generic_dialog_popup {
        position: static !important;
        width: 100% !important;
        height: auto !important;
        min-height: calc(100dvh - 24px);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    table.pop_dialog_table,
    #pop_dialog_table {
        width: min(100%, 380px) !important;
        max-width: 100% !important;
        margin: auto !important;
        table-layout: auto !important;
    }

    td.pop_content,
    #pop_content,
    #pop_contentdiv {
        width: 100% !important;
        max-width: 100% !important;
        min-width: 0;
        overflow-wrap: anywhere;
    }

    #bookmark_popup input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="image"]),
    #bookmark_popup select,
    #bookmark_groupsel {
        width: 100% !important;
        min-height: var(--ncm-touch);
        font-size: 16px !important;
    }

    #bookmark_popup a,
    #bookmark_popup button,
    #bookmark_popup input[type="button"],
    #bookmark_popup input[type="submit"] {
        min-height: var(--ncm-touch);
    }

    /* Torrentadatok és hozzászólások oldala */
    body.ncm-details-page #details1 .fobox_tartalom,
    body.ncm-details-page #details2 .fobox_tartalom,
    body.ncm-details-page .commentbox_tartalom {
        min-width: 0;
        overflow: hidden;
    }

    body.ncm-details-page .torrent_reszletek_cim {
        padding: 5px 0;
        font-size: 17px !important;
        line-height: 1.4;
        overflow-wrap: anywhere;
    }

    body.ncm-details-page .torrent_reszletek_konyvjelzo {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 5px;
        margin: 8px 0 12px !important;
    }

    body.ncm-details-page .torrent_reszletek_konyvjelzo a {
        display: flex;
        min-width: 0;
        min-height: var(--ncm-touch);
        align-items: center;
        justify-content: center;
        padding: 7px 5px;
        border: 1px solid var(--ncm-border);
        border-radius: 6px;
        background: var(--ncm-dark);
        text-align: center;
        overflow-wrap: anywhere;
    }

    body.ncm-details-page #details1 .fobox_tartalom > center {
        display: block;
        width: 100%;
        max-width: 100%;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
    }

    body.ncm-details-page #details1 .fobox_tartalom > center > table {
        min-width: 560px;
        margin: 0 auto;
    }

    body.ncm-details-page #details1 .fobox_tartalom > center > table td {
        min-width: 180px;
    }

    body.ncm-details-page #details1 .fobox_tartalom > center > table img {
        width: auto;
        max-width: 180px;
        height: auto;
    }

    body.ncm-details-page .torrent_reszletek {
        display: grid;
        width: 100% !important;
        max-width: 100%;
        grid-template-columns: 1fr;
        gap: 0;
        margin: 10px 0 !important;
    }

    body.ncm-details-page .torrent_col1,
    body.ncm-details-page .torrent_col2 {
        display: grid;
        float: none !important;
        clear: none !important;
        width: 100% !important;
        grid-template-columns: 105px minmax(0, 1fr);
        margin: 0 !important;
        text-align: left;
    }

    body.ncm-details-page .torrent_reszletek .dt,
    body.ncm-details-page .torrent_reszletek .dd {
        float: none !important;
        width: auto !important;
        min-width: 0;
        min-height: 36px;
        margin: 0 !important;
        padding: 8px 6px !important;
        border-bottom: 1px dashed var(--ncm-border);
        font-size: 12px !important;
        line-height: 1.45;
        overflow-wrap: anywhere;
    }

    body.ncm-details-page .torrent_reszletek .dt {
        background: rgba(54, 75, 92, 0.45);
    }

    body.ncm-details-page .download {
        margin: 12px 0 !important;
        text-decoration: none !important;
    }

    body.ncm-details-page .download a {
        display: flex;
        width: 100%;
        min-height: 50px;
        align-items: center;
        justify-content: center;
        padding: 10px;
        border: 1px solid var(--ncm-border);
        border-radius: 7px;
        background: var(--ncm-dark);
        font-size: 14px !important;
        text-decoration: none !important;
    }

    body.ncm-details-page #filelist,
    body.ncm-details-page #otherlist,
    body.ncm-details-page #nfocontent,
    body.ncm-details-page #peers,
    body.ncm-details-page #subtitles {
        width: 100% !important;
        max-width: 100%;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
    }

    body.ncm-details-page #filelist table,
    body.ncm-details-page #otherlist table,
    body.ncm-details-page #nfocontent pre,
    body.ncm-details-page #peers table,
    body.ncm-details-page #subtitles table {
        max-width: 100%;
    }

    body.ncm-details-page #nfocontent pre {
        overflow-x: auto;
        white-space: pre;
    }

    body.ncm-details-page .torrent_leiras {
        width: 100% !important;
        max-width: 100%;
        margin: 12px 0 !important;
        padding: 10px !important;
        overflow-wrap: anywhere;
        word-break: break-word;
        font-size: 13px;
        line-height: 1.55;
    }

    body.ncm-details-page .torrent_leiras > table,
    body.ncm-details-page .torrent_leiras > table > tbody,
    body.ncm-details-page .torrent_leiras > table > tbody > tr {
        display: block;
        width: 100% !important;
    }

    body.ncm-details-page .torrent_leiras > table > tbody > tr > td {
        display: block;
        width: 100% !important;
        padding: 4px !important;
    }

    body.ncm-details-page .inforbar_img img {
        display: block;
        width: auto;
        max-width: min(220px, 70vw);
        height: auto;
        margin: 0 auto 8px;
    }

    body.ncm-details-page .inforbar_txt,
    body.ncm-details-page .inforbar_txt table {
        width: 100% !important;
        max-width: 100%;
    }

    body.ncm-details-page .inforbar_txt table {
        table-layout: fixed;
    }

    body.ncm-details-page .inforbar_txt table td:first-child {
        width: 112px !important;
    }

    body.ncm-details-page .inforbar_txt table td {
        padding: 5px 3px !important;
        vertical-align: top;
        overflow-wrap: anywhere;
    }

    body.ncm-details-page .infobar_title {
        margin: 2px 0 10px !important;
        font-size: 18px !important;
        line-height: 1.4;
        overflow-wrap: anywhere;
    }

    body.ncm-details-page .g_koszi {
        width: 108px !important;
        height: var(--ncm-touch) !important;
        border: 1px solid var(--ncm-border);
        border-radius: 6px;
        background-position: center !important;
        background-repeat: no-repeat !important;
    }

    body.ncm-details-page #hozzaszolasok {
        width: 100%;
        min-width: 0;
    }

    body.ncm-details-page .hsz_block {
        display: grid;
        width: 100%;
        min-width: 0;
        grid-template-columns: 50px minmax(0, 1fr);
        margin: 8px 0;
        padding: 8px 0;
        border-bottom: 1px solid var(--ncm-border);
    }

    body.ncm-details-page .hsz_block > div[style*="clear"] {
        display: none !important;
    }

    body.ncm-details-page .hsz_bal {
        float: none !important;
        width: 50px !important;
        margin: 0 !important;
        padding: 0 4px;
        grid-column: 1;
    }

    body.ncm-details-page .hsz_avatar,
    body.ncm-details-page .hsz_avatar img {
        width: 42px !important;
        max-width: 42px !important;
        height: 42px !important;
        object-fit: cover;
        border-radius: 5px;
    }

    body.ncm-details-page .hsz_avatar_also {
        display: none !important;
    }

    body.ncm-details-page .hsz_jobb_all,
    body.ncm-details-page .hsz_jobb {
        float: none !important;
        width: 100% !important;
        min-width: 0;
        grid-column: 2;
    }

    body.ncm-details-page .hsz_jobb_felso {
        display: flex;
        width: 100% !important;
        height: auto !important;
        min-height: var(--ncm-touch);
        flex-wrap: wrap;
        align-items: center;
        gap: 4px 8px;
        margin: 0 !important;
        padding: 3px 0 6px;
    }

    body.ncm-details-page .hsz_jobb_felso_txt,
    body.ncm-details-page .hsz_jobb_felso_date,
    body.ncm-details-page .hsz_jobb_felso_thumbs {
        float: none !important;
        width: auto !important;
        max-width: 100%;
        margin: 0 !important;
        text-align: left !important;
        overflow-wrap: anywhere;
    }

    body.ncm-details-page .hsz_jobb_felso_txt {
        flex: 1 1 100%;
    }

    body.ncm-details-page .hsz_jobb_felso_date {
        flex: 1 1 auto;
        line-height: 2.2;
    }

    body.ncm-details-page .hsz_jobb_felso_date a,
    body.ncm-details-page .hsz_jobb_felso_thumbs a {
        display: inline-flex;
        min-width: 36px;
        min-height: 36px;
        align-items: center;
        justify-content: center;
        margin: 2px;
        border: 1px solid var(--ncm-border);
        border-radius: 5px;
    }

    body.ncm-details-page .hsz_jobb_felso_thumbs img {
        width: 24px !important;
        height: 24px !important;
        object-fit: contain;
    }

    body.ncm-details-page .hsz_jobb_comment,
    body.ncm-details-page .hsz_jobb_edit_last,
    body.ncm-details-page .hsz_jobb_edit {
        width: 100%;
        min-width: 0;
        min-height: 0 !important;
        margin: 8px 0 0 !important;
        padding: 0 0 8px !important;
        overflow-wrap: anywhere;
        word-break: break-word;
    }

    body.ncm-details-page .hsz_jobb_comment img,
    body.ncm-details-page .bb-quote img {
        max-width: 100%;
        height: auto;
    }

    body.ncm-details-page .bb-quote {
        max-width: 100%;
        padding: 8px !important;
        overflow-wrap: anywhere;
    }

    body.ncm-details-page .hozzaszolasok_pager {
        line-height: 2.8;
    }

    body.ncm-details-page .hozzaszolasok_pager a,
    body.ncm-details-page .hozzaszolasok_pager .active_link {
        display: inline-flex;
        min-width: var(--ncm-touch);
        min-height: var(--ncm-touch);
        align-items: center;
        justify-content: center;
        margin: 2px;
        padding: 5px 8px;
        border: 1px solid var(--ncm-border);
        border-radius: 5px;
        background: var(--ncm-dark);
    }

    body.ncm-details-page .hsz_iconok,
    body.ncm-details-page .hsz_textarea {
        width: 100% !important;
        max-width: 100%;
        margin: 0 !important;
    }

    body.ncm-details-page .hsz_iconok {
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
    }

    body.ncm-details-page .hsz_iconok_table {
        min-width: 520px;
    }

    body.ncm-details-page .hsz_textarea,
    body.ncm-details-page .textarea_fancy {
        height: 190px !important;
    }

    body.ncm-details-page .textarea_fancy {
        width: 100% !important;
        max-width: 100%;
        padding: 8px !important;
        font-size: 16px !important;
    }

    body.ncm-details-page #main_tartalom > div[align="center"] > div[style*="width:917px"] {
        width: 100% !important;
        max-width: 100%;
    }

    /* Könyvjelzőkezelő oldal */
    body.ncm-bookmarks-page .fobox_tartalom {
        display: flex;
        min-width: 0;
        flex-direction: column;
    }

    body.ncm-bookmarks-page #profil_left4,
    body.ncm-bookmarks-page #profil_right3 {
        float: none !important;
        width: 100% !important;
        max-width: 100% !important;
        min-width: 0;
        margin: 0 !important;
    }

    body.ncm-bookmarks-page #profil_right3 {
        order: -1;
    }

    body.ncm-bookmarks-page .wiki_ul {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        margin: 0;
        padding: 4px !important;
    }

    body.ncm-bookmarks-page .wiki_ul li {
        margin: 0;
        padding: 0;
        list-style: none;
        line-height: 1;
    }

    body.ncm-bookmarks-page .wiki_ul li a {
        display: inline-flex;
        min-height: var(--ncm-touch);
        align-items: center;
        padding: 7px 10px;
        border: 1px solid var(--ncm-border);
        border-radius: 6px;
        background: var(--ncm-panel);
    }

    body.ncm-bookmarks-page #group_name {
        width: 100% !important;
    }

    body.ncm-bookmarks-page .konyvjelzok_center {
        max-width: 100%;
        padding: 10px 4px !important;
        overflow-wrap: anywhere;
        word-break: break-word;
    }

    body.ncm-bookmarks-page .ncm-bookmark-table,
    body.ncm-bookmarks-page .ncm-bookmark-table > tbody {
        display: block;
        width: 100% !important;
        max-width: 100%;
    }

    body.ncm-bookmarks-page .ncm-bookmark-header,
    body.ncm-bookmarks-page .ncm-bookmark-separator {
        display: none !important;
    }

    body.ncm-bookmarks-page .ncm-bookmark-row {
        display: grid !important;
        width: 100%;
        min-height: 112px;
        grid-template-columns: 36px 48px minmax(0, 1fr);
        align-items: stretch;
        margin-top: 8px;
        border: 1px solid var(--ncm-border);
        border-radius: 7px 7px 0 0;
        background: var(--ncm-panel);
        overflow: hidden;
    }

    body.ncm-bookmarks-page .ncm-bookmark-row > td {
        display: flex;
        width: auto !important;
        min-width: 0;
        height: auto !important;
        align-items: center;
        padding: 6px !important;
    }

    body.ncm-bookmarks-page .ncm-bookmark-row > td:nth-child(1) {
        grid-column: 1;
        grid-row: 1;
        justify-content: center;
        color: var(--ncm-muted);
    }

    body.ncm-bookmarks-page .ncm-bookmark-row > td:nth-child(2) {
        grid-column: 2;
        grid-row: 1;
        justify-content: center;
    }

    body.ncm-bookmarks-page .ncm-bookmark-row > .bookmark_1 {
        display: flex !important;
        width: auto !important;
        grid-column: 3;
        grid-row: 1;
        border: 0 !important;
        padding: 6px !important;
        text-align: left;
    }

    body.ncm-bookmarks-page .ncm-bookmark-row > .bookmark_2 {
        display: grid !important;
        width: auto !important;
        min-height: 52px;
        grid-column: 1 / -1;
        grid-row: 2;
        grid-template-columns: 92px minmax(0, 1fr);
        gap: 8px;
        border: 0 !important;
        border-top: 1px solid var(--ncm-border) !important;
        padding: 5px 8px !important;
        text-align: left;
    }

    body.ncm-bookmarks-page .ncm-bookmark-row > .bookmark_2::before {
        content: 'Áthelyezés';
        align-self: center;
        color: var(--ncm-muted);
        font-size: 11px;
        text-transform: uppercase;
    }

    body.ncm-bookmarks-page .bookmark_2 select {
        width: 100% !important;
    }

    body.ncm-bookmarks-page .bookmark_name {
        display: flex;
        float: none !important;
        min-width: 0;
        flex: 1 1 auto;
        align-items: center;
        margin: 0 !important;
    }

    body.ncm-bookmarks-page .bookmark_name_txt {
        min-width: 0;
        margin: 0 !important;
        overflow-wrap: anywhere;
    }

    body.ncm-bookmarks-page .bookmark_name_txt a {
        display: flex;
        min-height: var(--ncm-touch);
        align-items: center;
        padding: 5px;
        overflow-wrap: anywhere;
    }

    body.ncm-bookmarks-page .bookmark_name input {
        width: 100% !important;
    }

    body.ncm-bookmarks-page .bookmark_szerk {
        display: block;
        float: none !important;
        width: var(--ncm-touch) !important;
        min-width: var(--ncm-touch);
        height: var(--ncm-touch) !important;
        margin: 0 0 0 5px !important;
        border: 1px solid var(--ncm-border);
        border-radius: 6px;
        background-color: var(--ncm-dark) !important;
        background-position: center !important;
        cursor: pointer;
    }

    body.ncm-bookmarks-page .ncm-bookmark-detail-row:not([style*="display:none"]):not([style*="display: none"]) {
        display: block !important;
        width: 100%;
    }

    body.ncm-bookmarks-page .ncm-bookmark-detail-row > td {
        display: block;
        width: 100% !important;
        padding: 0 !important;
    }

    body.ncm-bookmarks-page .bookmark_lenyilo,
    body.ncm-bookmarks-page .bookmark_lenyilo_middle,
    body.ncm-bookmarks-page .bookmark_lenyilo_middle table {
        width: 100% !important;
        max-width: 100%;
    }

    body.ncm-bookmarks-page .bookmark_lenyilo_middle a {
        display: inline-flex;
        min-height: var(--ncm-touch);
        align-items: center;
        padding: 7px;
    }

    body.ncm-bookmarks-page .ncm-bookmark-select-all {
        display: grid !important;
        width: 100%;
        min-height: 54px;
        grid-template-columns: 84px 56px minmax(0, 1fr);
        align-items: center;
        margin-top: 8px;
        border: 1px solid var(--ncm-border);
        border-radius: 7px;
        background: var(--ncm-dark);
    }

    body.ncm-bookmarks-page .ncm-bookmark-select-all td {
        display: flex;
        width: auto !important;
        align-items: center;
        justify-content: center;
        padding: 5px !important;
    }

    body.ncm-bookmarks-page #bookmark_nevszerk {
        display: none;
    }

    /* Lábléc */
    #footer_bg,
    #footer {
        height: auto !important;
        min-height: 44px;
    }

    #footer_left,
    #footer_right {
        display: none !important;
    }

    #footer_center {
        float: none !important;
        width: 100% !important;
        height: auto !important;
        min-height: 44px;
        padding: 12px 8px !important;
        overflow-wrap: anywhere;
    }
}
`;

    if (typeof GM_addStyle === 'function') {
        GM_addStyle(css);
    } else {
        const style = document.createElement('style');
        style.textContent = css;
        (document.head || document.documentElement).appendChild(style);
    }

    function addKeyboardActivation(element) {
        if (!element || element.dataset.ncmKeyboard === 'true') return;
        element.dataset.ncmKeyboard = 'true';
        if (!element.hasAttribute('tabindex')) element.tabIndex = 0;
        if (!element.hasAttribute('role')) element.setAttribute('role', 'button');
        element.addEventListener('keydown', (event) => {
            if (event.key !== 'Enter' && event.key !== ' ') return;
            event.preventDefault();
            element.click();
        });
    }

    function elementsIn(root, selector) {
        const result = [];
        if (root instanceof Element && root.matches(selector)) result.push(root);
        if (root.querySelectorAll) result.push(...root.querySelectorAll(selector));
        return result;
    }

    function enhanceTorrentRows(root) {
        for (const row of elementsIn(root, '.box_torrent')) {
            row.querySelector('.ncm-compact-meta')?.remove();
            if (row.dataset.ncmCategoryLabel === 'true') continue;

            const torrentText = row.querySelector('.torrent_txt, .torrent_txt2');
            const categoryImage = row.querySelector('.categ_link');
            const category = categoryImage?.getAttribute('alt')?.trim();
            if (!torrentText || !category) continue;

            const categoryLabel = document.createElement('span');
            categoryLabel.className = 'ncm-category-label';
            categoryLabel.textContent = category;
            categoryLabel.setAttribute('aria-label', `Kategória: ${category}`);
            torrentText.insertBefore(categoryLabel, torrentText.firstChild);
            row.dataset.ncmCategoryLabel = 'true';
        }
    }

    function enhanceDynamicContent(root) {
        enhanceTorrentRows(root);

        for (const button of elementsIn(root, '.torrent_konyvjelzo, .torrent_konyvjelzo2')) {
            if (!button.hasAttribute('aria-label')) {
                button.setAttribute('aria-label', 'Könyvjelző hozzáadása');
                button.setAttribute('title', 'Könyvjelző hozzáadása');
            }
            addKeyboardActivation(button);
        }

        for (const editButton of elementsIn(root, '.bookmark_szerk')) {
            if (!editButton.hasAttribute('aria-label')) {
                editButton.setAttribute('aria-label', 'Könyvjelző nevének szerkesztése');
                editButton.setAttribute('title', 'Könyvjelző nevének szerkesztése');
            }
            addKeyboardActivation(editButton);
        }

        for (const popup of elementsIn(root, '.generic_dialog')) {
            popup.setAttribute('role', 'dialog');
            popup.setAttribute('aria-modal', 'true');
        }

        for (const select of elementsIn(root, '#bookmark_groupsel')) {
            if (!select.hasAttribute('aria-label')) select.setAttribute('aria-label', 'Könyvjelző csoport');
        }

        for (const submit of elementsIn(root, 'input[type="image"].g_mehet')) {
            if (!submit.hasAttribute('aria-label')) submit.setAttribute('aria-label', 'Mentés');
            if (!submit.hasAttribute('title')) submit.setAttribute('title', 'Mentés');
        }

        for (const attachment of elementsIn(root, '.torrent_kep_ico2 .fancy_groups')) {
            if (!attachment.hasAttribute('aria-label')) attachment.setAttribute('aria-label', 'Mellékelt kép megnyitása');
        }
    }

    function initLogoLink() {
        const logo = document.getElementById('fej_fejlec');
        if (!logo) return;

        let link = logo.querySelector('a');
        if (!link) {
            link = document.createElement('a');
            logo.appendChild(link);
        }
        link.classList.add('ncm-logo-link');
        link.href = '/torrents.php';
        link.setAttribute('aria-label', 'Letöltés');
        link.setAttribute('title', 'Letöltés');
    }

    function initNavigation() {
        const menu = document.getElementById('menu_all');
        const menuCenter = document.getElementById('menu_center');
        if (!menu || !menuCenter || document.getElementById('ncm-menu-toggle')) return;

        const toggle = document.createElement('button');
        toggle.id = 'ncm-menu-toggle';
        toggle.className = 'ncm-menu-toggle';
        toggle.type = 'button';
        toggle.setAttribute('aria-controls', 'menu_center');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.textContent = 'Menü';
        menu.insertBefore(toggle, menuCenter);

        toggle.addEventListener('click', () => {
            const isOpen = document.documentElement.classList.toggle('ncm-nav-open');
            toggle.setAttribute('aria-expanded', String(isOpen));
        });

        menuCenter.addEventListener('click', (event) => {
            if (!event.target.closest('a')) return;
            document.documentElement.classList.remove('ncm-nav-open');
            toggle.setAttribute('aria-expanded', 'false');
        });

        const media = window.matchMedia(MOBILE_MEDIA);
        const closeWhenDesktop = (event) => {
            if (event.matches) return;
            document.documentElement.classList.remove('ncm-nav-open');
            toggle.setAttribute('aria-expanded', 'false');
        };
        if (typeof media.addEventListener === 'function') media.addEventListener('change', closeWhenDesktop);
        else if (typeof media.addListener === 'function') media.addListener(closeWhenDesktop);
    }

    function initTorrentFilters() {
        const filters = document.getElementById('kategoriak');
        if (!filters || document.getElementById('ncm-filter-toggle')) return;

        const searchTable = filters.querySelector('#keresoresz');
        if (searchTable?.parentElement) searchTable.parentElement.classList.add('ncm-search-container');

        const toggle = document.createElement('button');
        toggle.id = 'ncm-filter-toggle';
        toggle.className = 'ncm-filter-toggle';
        toggle.type = 'button';
        toggle.setAttribute('aria-controls', 'kategoriak');

        const hasSelectedFilter = Boolean(filters.querySelector('input[type="checkbox"]:checked'));
        filters.classList.toggle('ncm-open', hasSelectedFilter);
        toggle.setAttribute('aria-expanded', String(hasSelectedFilter));
        toggle.textContent = hasSelectedFilter ? 'Szűrők elrejtése' : 'További szűrők';

        const form = filters.querySelector('#kereses_mezo');
        if (form) form.appendChild(toggle);
        else filters.parentNode.insertBefore(toggle, filters);
        toggle.addEventListener('click', () => {
            const isOpen = filters.classList.toggle('ncm-open');
            toggle.setAttribute('aria-expanded', String(isOpen));
            toggle.textContent = isOpen ? 'Szűrők elrejtése' : 'További szűrők';
        });
    }

    function enhanceBookmarksPage() {
        const form = document.querySelector('form[name="konyvjelzo_szerkesztes"]');
        if (!form) return;

        document.body.classList.add('ncm-bookmarks-page');
        const table = form.querySelector('table[width="100%"], table');
        if (!table || table.dataset.ncmEnhanced === 'true') return;
        table.dataset.ncmEnhanced = 'true';
        table.classList.add('ncm-bookmark-table');

        for (const row of table.querySelectorAll('tr')) {
            const deleteCheckbox = row.querySelector('input[name="torlendo_konyvjelzok[]"]');
            const detail = row.querySelector('.bookmark_lenyilo');
            const selectAll = row.querySelector('#osszes');

            if (deleteCheckbox) {
                row.classList.add('ncm-bookmark-row');
                const title = row.querySelector('.bookmark_name_txt a')?.getAttribute('title') || 'könyvjelző';
                deleteCheckbox.setAttribute('aria-label', `Törlés kijelölése: ${title}`);

                const move = row.querySelector('select[name^="athelyez["]');
                if (move) move.setAttribute('aria-label', `Áthelyezés: ${title}`);

                const rename = row.querySelector('input[name^="konyvjelzo_nev["]');
                if (rename) rename.setAttribute('aria-label', `Új név: ${title}`);
            } else if (detail) {
                row.classList.add('ncm-bookmark-detail-row');
            } else if (selectAll) {
                row.classList.add('ncm-bookmark-select-all');
                selectAll.setAttribute('aria-label', 'Összes könyvjelző kijelölése törléshez');
            } else if (row.querySelector('#bookmark_nevszerk')) {
                row.classList.add('ncm-bookmark-header');
            } else {
                row.classList.add('ncm-bookmark-separator');
            }
        }
    }

    function markPageType() {
        const path = window.location.pathname.toLowerCase();
        const action = new URLSearchParams(window.location.search).get('action');
        if (path.endsWith('/bookmarks.php') || path.startsWith('/bookmarks/')) {
            document.body.classList.add('ncm-bookmarks-page');
        }
        if (path.endsWith('/torrents.php')) {
            document.body.classList.add('ncm-torrents-page');
        }
        if ((path.endsWith('/torrents.php') && action === 'details') || document.getElementById('details1')) {
            document.body.classList.add('ncm-details-page');
        }
    }

    function torrentRowForPanel(panel) {
        let sibling = panel.previousElementSibling;
        let remaining = 3;
        while (sibling && remaining > 0) {
            if (sibling.classList.contains('box_torrent')) return sibling;
            sibling = sibling.previousElementSibling;
            remaining -= 1;
        }
        return null;
    }

    function syncTorrentPanel(panel) {
        if (!(panel instanceof Element) || !panel.matches('.torrent_lenyilo, .torrent_lenyilo2')) return;
        const row = torrentRowForPanel(panel);
        if (!row) return;
        row.classList.toggle('ncm-expanded', panel.style.display !== 'none');
    }

    function syncAllTorrentPanels(root) {
        for (const panel of elementsIn(root, '.torrent_lenyilo, .torrent_lenyilo2')) {
            syncTorrentPanel(panel);
        }
    }

    function startDynamicObserver() {
        if (!document.body) return;
        const observer = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                if (mutation.type === 'attributes') {
                    syncTorrentPanel(mutation.target);
                    continue;
                }
                for (const node of mutation.addedNodes) {
                    if (node.nodeType !== Node.ELEMENT_NODE) continue;
                    enhanceDynamicContent(node);
                    syncAllTorrentPanels(node);
                }
            }
        });
        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['style']
        });
    }

    function init() {
        markPageType();
        initLogoLink();
        initNavigation();
        initTorrentFilters();
        enhanceBookmarksPage();
        enhanceDynamicContent(document);
        syncAllTorrentPanels(document);
        startDynamicObserver();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init, { once: true });
    } else {
        init();
    }
})();
