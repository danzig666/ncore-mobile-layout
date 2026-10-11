// ==UserScript==
// @name         nCore mobilnézet
// @namespace    local.ncore.mobile
// @version      1.3.3
// @description  Érintésbarát mobilfelület, változatlan asztali nézettel; nCore aNi mellett is használható.
// @homepageURL  https://github.com/danzig666/ncore-mobile-layout
// @supportURL   https://github.com/danzig666/ncore-mobile-layout/issues
// @downloadURL  https://raw.githubusercontent.com/danzig666/ncore-mobile-layout/main/ncore-mobile-layout.user.js
// @updateURL    https://raw.githubusercontent.com/danzig666/ncore-mobile-layout/main/ncore-mobile-layout.user.js
// @match        https://ncore.pro/*
// @run-at       document-start
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_registerMenuCommand
// ==/UserScript==

(function () {
    'use strict';
    const MOBILE_BREAKPOINT = 760;
    const MOBILE_MEDIA = `(max-width: ${MOBILE_BREAKPOINT}px)`;
    const narrow = window.matchMedia(MOBILE_MEDIA);
    const touch = window.matchMedia('(pointer: coarse)');
    let mode = typeof GM_getValue === 'function' ? GM_getValue('layoutMode', 'auto') : 'auto';
    if (!['auto', 'mobile', 'desktop'].includes(mode)) mode = 'auto';
    let session = null;

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

    const improvements = String.raw`
@media ${MOBILE_MEDIA} {
    html.ncm-enabled { --ncm-touch: 44px; }
    html.ncm-enabled body { padding-bottom: env(safe-area-inset-bottom); }
    #main_all { padding-left: max(8px, env(safe-area-inset-left)); padding-right: max(8px, env(safe-area-inset-right)); }
    #fej_fejlec_bg { min-height: 34px; }
    #fej_fejlec { margin: 5px auto !important; transform: scale(.8); transform-origin: center; }
    #menu_bg { top: env(safe-area-inset-top); }
    #infosav { min-height: 44px; padding: 4px 8px; gap: 6px; }
    #infosav .infosav_c { width: auto !important; flex: 1; }
    #infosav_adatok { display: none; }
    #infosav_extra { width: auto; padding: 0 !important; }
    #infosav_extra > div:not(.i_e_vonal):not(.ncm-primary-shortcut) { display: none !important; }
    #infosav.ncm-account-open #infosav_adatok { display: block; }
    #infosav.ncm-account-open #infosav_extra > div:not(.i_e_vonal) { display: block !important; }
    .ncm-account-toggle, .ncm-row-toggle, .ncm-details-link, .ncm-dialog-close, .ncm-reset {
        display: inline-flex; align-items: center; justify-content: center; min-height: 44px;
        padding: 8px 12px; border: 1px solid var(--ncm-border); border-radius: 6px;
        background: var(--ncm-dark); color: var(--ncm-text); font: inherit; cursor: pointer;
    }
    .ncm-owned :focus-visible, .ncm-account-toggle:focus-visible, .ncm-row-toggle:focus-visible {
        outline: 3px solid var(--ncm-accent); outline-offset: 2px;
    }
    #kereses_mezo { display: block; }
    .ncm-search-row { display: grid; grid-template-columns: minmax(0,1fr) 96px; gap: 8px; align-items: end; }
    .ncm-search-row label { display: block; margin-bottom: 4px; }
    .ncm-search-row #mire { width: 100% !important; min-height: 44px; }
    .ncm-search-row .g_mehet { width: 96px !important; margin: 0 !important; }
    .ncm-filter-summary { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; margin: 8px 0; font-size: 12px; }
    .ncm-filter-summary span { overflow-wrap: anywhere; }
    .ncm-filter-summary .ncm-reset { margin-left: auto; }
    #kereses_mezo > .ncm-filter-toggle { margin: 8px 0; }
    .ncm-filter-panel[hidden], .ncm-original-search, .ncm-original-pager { display: none !important; }
    .ncm-filter-panel { padding: 8px; border: 1px solid var(--ncm-border); border-radius: 6px; }
    .ncm-field { display: block; margin: 6px 0 12px; }
    .ncm-field > span { display: block; margin-bottom: 5px; }
    .ncm-field select, .ncm-field input { width: 100% !important; }
    #kategoriak #table_torrcat, #kategoriak [id$="_resz"] table, #kategoriak [id$="_resz"] tbody { display: block !important; width: 100% !important; }
    #kategoriak #table_torrcat tr, #kategoriak [id$="_resz"] tr { display: grid !important; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 4px; }
    #kategoriak td[hidden] { display: none !important; }
    #kategoriak .ncm-check-cell { width: auto !important; padding: 0 !important; min-width: 0; }
    .ncm-check-label { display: flex; min-height: 44px; align-items: center; gap: 3px; padding: 4px; overflow-wrap: anywhere; cursor: pointer; }
    #kategoriak .ncm-link-cell { display: flex; align-items: stretch; gap: 4px; }
    #kategoriak .ncm-checkbox-only { flex: 0 0 44px; width: 44px; justify-content: center; padding: 0; border: 1px solid var(--ncm-border); border-radius: 6px; }
    #kategoriak .ncm-checkbox-only input { margin: 0; }
    #kategoriak .ncm-category-link { display: flex; flex: 1; align-items: center; justify-content: center; min-width: 0; min-height: 44px; padding: 6px; border: 1px solid var(--ncm-border); border-radius: 6px; background: var(--ncm-dark); overflow-wrap: anywhere; }
    .ncm-check-text { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
    #kategoriak #cimkek_lista { max-width: 100%; }
    .ncm-browse-controls { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; padding: 8px 0; }
    .ncm-browse-controls label { flex: 1; min-width: 100px; }
    .ncm-browse-controls select { width: 100%; }
    .ncm-pager { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 6px; margin: 8px 0; }
    .ncm-pager a, .ncm-pager > span { display: inline-flex; min-height: 44px; align-items: center; padding: 8px; }
    .ncm-pager a { border: 1px solid var(--ncm-border); border-radius: 6px; background: var(--ncm-dark); }
    .ncm-pager details { flex-basis: 100%; }
    .ncm-pager summary { min-height: 44px; padding: 10px; cursor: pointer; text-align: center; }
    .ncm-pager details a { margin: 3px; }
    .box_torrent, .box_torrent.ncm-expanded { display: block !important; margin-bottom: 8px; border: 1px solid var(--ncm-border) !important; border-radius: 8px; }
    .box_torrent .box_alap_img, .box_torrent.ncm-expanded .box_alap_img { display: none !important; }
    .box_torrent .box_nagy, .box_torrent .box_nagy2 { display: block !important; width: 100% !important; }
    .box_torrent .box_nev2 { padding: 10px !important; height: auto !important; min-height: 0; border: 0; }
    .box_torrent .torrent_txt, .box_torrent .torrent_txt2 { display: block !important; width: 100% !important; }
    .box_torrent .torrent_txt > a, .box_torrent .torrent_txt2 > a { font-size: 14px; line-height: 1.45; overflow-wrap: anywhere; }
    .torrent_txt_also { padding: 0 !important; margin-top: 5px !important; height: auto !important; overflow: visible; white-space: normal; }
    .torrent_txt_also .siterank, .torrent_txt_also .siterank > span { display: flex; flex-wrap: wrap; gap: 4px; overflow: visible; white-space: normal; font-size: 12px; }
    .box_torrent .ncm-category-label { display: none !important; }
    .ncm-compact-meta { display: flex; flex-wrap: wrap; align-items: center; gap: 6px 10px; padding: 0 10px 8px; font-size: 12px; line-height: 1.5; }
    .ncm-compact-meta span { overflow-wrap: anywhere; }
    .ncm-compact-meta .ncm-zero-seed { color: #ffe09d; }
    .ncm-status-badges { display: flex; flex-wrap: wrap; gap: 5px; padding: 0 10px 8px; }
    .ncm-status-badges span { padding: 3px 6px; background: var(--ncm-dark); border-radius: 4px; font-size: 12px; }
    .box_torrent .torrent_new, .box_torrent .torrent_gold, .box_torrent .torrent_hidden,
    .box_torrent .torrent_ok, .box_torrent .torrent_unchecked, .box_torrent .torrent_err { display: none !important; }
    .ncm-row-actions { display: grid; grid-template-columns: minmax(0,1fr) minmax(0,1fr) 74px auto; align-items: center; gap: 4px; padding: 0 10px 10px; }
    .ncm-row-actions .ncm-row-toggle, .ncm-row-actions .ncm-details-link { min-width: 0; padding: 8px 4px; font-size: 12px; }
    .ncm-uploaded { display: block; font-size: 11px; line-height: 1.4; text-align: center; white-space: nowrap; color: var(--ncm-muted); font-variant-numeric: tabular-nums; }
    .ncm-uploaded > span { display: block; }
    .box_torrent .torrent_konyvjelzo, .box_torrent .torrent_konyvjelzo2 {
        position: static !important; min-width: 44px; margin-left: auto !important; flex: 0 0 44px;
    }
    .box_torrent .box_feltoltve2, .box_torrent .box_meret2, .box_torrent .box_d2,
    .box_torrent .box_feltolto2, .box_torrent.ncm-expanded .box_feltolto2,
    .box_torrent:not(.ncm-expanded) .box_feltoltve2, .box_torrent:not(.ncm-expanded) .box_meret2,
    .box_torrent.ncm-expanded .box_feltoltve2, .box_torrent.ncm-expanded .box_meret2, .box_torrent.ncm-expanded .box_d2,
    .box_torrent .users_box_sepa, .box_torrent .users_box_sepa2,
    .box_torrent .box_s2, .box_torrent .box_l2,
    .box_torrent.ncm-expanded .box_s2, .box_torrent.ncm-expanded .box_l2 { display: none !important; }
    .box_torrent .box_feltoltve2::before, .box_torrent .box_meret2::before,
    .box_torrent .box_d2::before, .box_torrent .box_feltolto2::before { font-size: 11px; }
    /* Optional aNi wrappers; native rows do not depend on these selectors. */
    .box_torrent .ani-box-name { display: grid !important; grid-template-columns: minmax(0,1fr) 44px; gap: 6px; width: 100% !important; height: auto !important; }
    .box_torrent .ani-box-name.ncm-no-imdb { grid-template-columns: minmax(0,1fr); }
    .box_torrent .ani-box-name.ncm-no-imdb .ani-torrent-icons { display: none !important; }
    .box_torrent .ani-torrent-name { grid-column: 1; grid-row: 1; width: 100% !important; min-width: 0 !important; white-space: normal !important; overflow: visible !important; }
    .box_torrent .ani-torrent-icons { grid-column: 2; grid-row: 1; display: flex; flex-wrap: wrap; align-items: center; gap: 6px; width: auto !important; height: auto !important; }
    .box_torrent .ani-box-bookmark:empty, .box_torrent .ani-torrent-icons:empty { display: none; }
    .box_torrent .ani-torrent-hide {
        display: inline-flex; position: static !important; align-items: center; justify-content: center;
        min-width: 44px; min-height: 44px; margin: 0 !important; cursor: pointer;
    }
    .box_torrent .ani-torrent-highlighter, .box_torrent .ani-torrent-hide, .box_torrent .ncm-original-imdb { display: none !important; }
    .ncm-imdb-score { display: inline-flex; flex-direction: column; align-items: center; justify-content: center; min-width: 44px; min-height: 44px; border: 1px solid var(--ncm-border); border-radius: 6px; color: #ffe09d; }
    .ncm-imdb-score > span { font-size: 9px; line-height: 1.3; }
    .ncm-imdb-score > strong { font-size: 14px; line-height: 1.3; }
    .box_torrent .ani-torrent-hide .torrent-hide { padding: 12px; }
    body.ncm-details-page .hsz_block { grid-template-columns: minmax(0,1fr); }
    body.ncm-details-page .hsz_bal { display: none !important; }
    body.ncm-details-page .hsz_jobb_all, body.ncm-details-page .hsz_jobb { grid-column: 1; }
    .generic_dialog { padding: max(12px,env(safe-area-inset-top)) max(12px,env(safe-area-inset-right)) max(12px,env(safe-area-inset-bottom)) max(12px,env(safe-area-inset-left)); }
    .generic_dialog .generic_dialog_popup { min-height: 0; align-items: flex-start; padding-top: 20px; }
    .ncm-dialog-close { display: flex; margin: 0 0 8px auto; }
    .ncm-dialog-locked { overflow: hidden !important; }
}
`;

    function element(tag, className, text) {
        const node = document.createElement(tag);
        if (className) node.className = className;
        if (text !== undefined) node.textContent = text;
        return node;
    }

    // Every modification to an existing node has an inverse. Never clone site controls.
    function setAttribute(node, name, value) {
        if (!node) return;
        let attributes = session.attributes.get(node);
        if (!attributes) session.attributes.set(node, attributes = new Map());
        if (!attributes.has(name)) attributes.set(name, { before: node.getAttribute(name), after: null });
        const record = attributes.get(name);
        record.after = value === null ? null : String(value);
        if (node.getAttribute(name) === record.after) return;
        if (record.after === null) node.removeAttribute(name);
        else node.setAttribute(name, record.after);
    }

    function classToggle(node, name, enabled = true) {
        if (!node) return;
        let classes = session.classes.get(node);
        if (!classes) {
            session.classes.set(node, classes = new Map());
            if (!node.hasAttribute('class')) session.classless.add(node);
        }
        if (!classes.has(name)) classes.set(name, node.classList.contains(name));
        node.classList.toggle(name, enabled);
    }

    function own(node) { session.owned.add(node); return node; }
    function listen(node, event, callback) {
        node.addEventListener(event, callback, { signal: session.controller.signal });
    }
    function move(node, destination) {
        if (!node || !node.parentNode) return;
        if (!session.moved.has(node)) {
            const marker = document.createComment('ncm original position');
            node.before(marker);
            session.moved.set(node, marker);
        }
        destination.appendChild(node);
    }
    function button(text, className) {
        const node = own(element('button', className, text));
        node.type = 'button';
        return node;
    }
    function keyboard(node, label) {
        if (!node || session.keyboard.has(node)) return;
        session.keyboard.add(node);
        if (label) setAttribute(node, 'aria-label', label);
        if (!node.hasAttribute('tabindex')) setAttribute(node, 'tabindex', '0');
        if (!node.hasAttribute('role')) setAttribute(node, 'role', 'button');
        listen(node, 'keydown', event => {
            if (event.key !== 'Enter' && event.key !== ' ') return;
            event.preventDefault(); node.click();
        });
    }

    function initHeader() {
        const menu = document.getElementById('menu_all');
        const center = document.getElementById('menu_center');
        if (menu && center) {
            const toggle = button('Menü', 'ncm-menu-toggle');
            toggle.id = 'ncm-menu-toggle';
            toggle.setAttribute('aria-controls', 'menu_center');
            toggle.setAttribute('aria-expanded', 'false');
            menu.insertBefore(toggle, center);
            const close = () => {
                classToggle(document.documentElement, 'ncm-nav-open', false);
                toggle.setAttribute('aria-expanded', 'false');
            };
            listen(toggle, 'click', () => {
                const open = !document.documentElement.classList.contains('ncm-nav-open');
                classToggle(document.documentElement, 'ncm-nav-open', open);
                toggle.setAttribute('aria-expanded', String(open));
            });
            listen(center, 'click', event => { if (event.target.closest('a')) close(); });
            listen(document, 'keydown', event => { if (event.key === 'Escape') close(); });
        }
        const logo = document.getElementById('fej_fejlec');
        if (logo && !logo.querySelector('a')) {
            const link = own(element('a', 'ncm-logo-link'));
            link.href = '/torrents.php'; link.setAttribute('aria-label', 'Letöltés');
            logo.appendChild(link);
        }
        const info = document.getElementById('infosav');
        if (info) {
            const toggle = button('Fiók', 'ncm-account-toggle');
            toggle.setAttribute('aria-expanded', 'false');
            const data = document.getElementById('infosav_adatok');
            if (data) toggle.setAttribute('aria-controls', data.id);
            info.prepend(toggle);
            const shortcut = document.getElementById('konyvjelzo')?.parentElement;
            classToggle(shortcut, 'ncm-primary-shortcut');
            listen(toggle, 'click', () => {
                const open = !info.classList.contains('ncm-account-open');
                classToggle(info, 'ncm-account-open', open);
                toggle.setAttribute('aria-expanded', String(open));
            });
        }
    }

    function field(control, label, panel) {
        if (!control) return;
        const wrapper = own(element('label', 'ncm-field'));
        wrapper.appendChild(element('span', '', label));
        move(control, wrapper); panel.appendChild(wrapper);
        setAttribute(control, 'aria-label', label);
    }

    function initFilters() {
        const form = document.getElementById('kereses_mezo');
        const filters = document.getElementById('kategoriak');
        const input = document.getElementById('mire');
        const submit = form?.querySelector('input.g_mehet, button[type="submit"]');
        if (!form || !filters || !input || !submit) return;
        const originalChildren = [...form.children];
        const row = own(element('div', 'ncm-search-row'));
        const search = own(element('label'));
        search.appendChild(element('span', '', 'Keresés'));
        move(input, search); row.appendChild(search); move(submit, row);
        setAttribute(input, 'aria-label', 'Keresés');
        setAttribute(input, 'enterkeyhint', 'search');
        setAttribute(submit, 'aria-label', 'Keresés');
        setAttribute(submit, 'title', 'Keresés');
        const panel = own(element('div', 'ncm-filter-panel'));
        panel.id = 'ncm-filter-panel'; panel.hidden = true;
        const toggle = button('Szűrők', 'ncm-filter-toggle');
        toggle.id = 'ncm-filter-toggle';
        toggle.setAttribute('aria-controls', panel.id); toggle.setAttribute('aria-expanded', 'false');
        const summary = own(element('div', 'ncm-filter-summary'));
        summary.setAttribute('aria-live', 'polite');
        const summaryText = element('span'); summary.appendChild(summaryText);
        const resetSource = [...form.querySelectorAll('a')].find(a => /feltételek törlése/i.test(a.textContent));
        if (resetSource) {
            const reset = element('a', 'ncm-reset', 'Törlés');
            reset.href = resetSource.href; reset.setAttribute('aria-label', 'Keresési feltételek törlése');
            summary.appendChild(reset);
        }
        field(form.querySelector('select[name="miben"]'), 'Keresés helye', panel);
        field(form.querySelector('select[name="tipus"]'), 'Típus', panel);
        field(form.querySelector('input[name="tags"]'), 'Címkék', panel);
        const tagLink = form.querySelector('#cimke_text')?.closest('a');
        if (tagLink) move(tagLink, panel);
        classToggle(form.querySelector('#keresoresz'), 'ncm-original-search');
        for (const child of originalChildren) move(child, panel);
        form.append(row, summary, toggle, panel);
        // The panel itself controls visibility, independent of the native category toggles.
        classToggle(filters, 'ncm-open');
        let checkIndex = 0;
        for (const checkbox of panel.querySelectorAll('input[type="checkbox"]')) {
            const cell = checkbox.closest('td');
            const labelCell = cell?.nextElementSibling;
            const text = labelCell?.textContent.trim();
            if (!cell || !labelCell || !text) continue;
            const categoryLink = labelCell.querySelector('a[href]');
            const label = own(element('label', 'ncm-check-label'));
            if (!checkbox.id) setAttribute(checkbox, 'id', `ncm-category-${++checkIndex}`);
            setAttribute(checkbox, 'aria-label', text);
            label.htmlFor = checkbox.id;
            // Retain the original category nodes for exact desktop restoration.
            move(checkbox, label);
            label.appendChild(element('span', categoryLink ? 'ncm-check-text' : '', text));
            if (categoryLink) {
                label.classList.add('ncm-checkbox-only');
                label.title = /^nyit_/.test(checkbox.name) ? `${text}: altípusok megnyitása` : `${text}: kiválasztás`;
                classToggle(categoryLink, 'ncm-category-link');
                classToggle(labelCell, 'ncm-link-cell');
            }
            for (const original of [...labelCell.childNodes]) {
                if (original === categoryLink) continue;
                if (original.nodeType === Node.ELEMENT_NODE) setAttribute(original, 'hidden', '');
                else if (original.nodeType === Node.TEXT_NODE && original.textContent.trim()) {
                    const span = own(element('span')); original.before(span); move(original, span); span.hidden = true;
                }
            }
            labelCell.prepend(label);
            classToggle(labelCell, 'ncm-check-cell'); setAttribute(cell, 'hidden', '');
        }
        const update = () => {
            const parts = [];
            const scope = form.querySelector('select[name="miben"]');
            const type = form.querySelector('select[name="tipus"]');
            if (input.value.trim()) parts.push(`„${input.value.trim()}”`);
            if (scope) parts.push(scope.selectedOptions[0]?.textContent.trim());
            if (type) parts.push(type.selectedOptions[0]?.textContent.trim());
            const tags = form.querySelector('input[name="tags"]')?.value.trim();
            if (tags) parts.push(`Címkék: ${tags}`);
            const checked = [...panel.querySelectorAll('input[type="checkbox"]:checked')];
            if (checked.length) parts.push(checked.map(e => e.getAttribute('aria-label') || e.value).join(', '));
            const text = parts.filter(Boolean).join(' · ');
            if (summaryText.textContent !== text) summaryText.textContent = text;
            toggle.textContent = panel.hidden ? `Szűrők${checked.length ? ` (${checked.length})` : ''}` : 'Szűrők elrejtése';
        };
        listen(toggle, 'click', () => { panel.hidden = !panel.hidden; toggle.setAttribute('aria-expanded', String(!panel.hidden)); update(); });
        listen(form, 'input', update); listen(form, 'change', update); listen(form, 'reset', () => queueMicrotask(update));
        session.updateFilters = update; update();
    }

    function initSorting() {
        const headings = document.querySelector('.box_alcimek_all, .box_alcimek_all_mini');
        if (!headings) return;
        const links = [...headings.querySelectorAll('a[href]')].filter(a => new URL(a.href).searchParams.has('miszerint'));
        if (!links.length) return;
        const controls = own(element('div', 'ncm-browse-controls'));
        const sort = element('select'); sort.setAttribute('aria-label', 'Rendezés');
        const names = {name: 'Név', ctime: 'Feltöltés ideje', size: 'Méret', times_completed: 'Letöltések', seeders: 'Seedelők', leechers: 'Letöltők'};
        const current = new URL(location.href);
        for (const link of links) {
            const key = new URL(link.href).searchParams.get('miszerint');
            if ([...sort.options].some(o => o.value === key)) continue;
            sort.add(new Option(names[key] || link.textContent.trim(), key));
        }
        sort.value = current.searchParams.get('miszerint') || 'ctime';
        const direction = element('select'); direction.setAttribute('aria-label', 'Rendezés iránya');
        direction.add(new Option('Csökkenő', 'DESC')); direction.add(new Option('Növekvő', 'ASC'));
        direction.value = (current.searchParams.get('hogyan') || 'DESC').toUpperCase();
        for (const [control, text] of [[sort, 'Rendezés'], [direction, 'Sorrend']]) {
            const label = element('label', '', text); label.appendChild(control); controls.appendChild(label);
        }
        const apply = button('Rendezés', 'ncm-row-toggle'); controls.appendChild(apply);
        listen(apply, 'click', () => {
            const source = links.find(a => new URL(a.href).searchParams.get('miszerint') === sort.value);
            const url = new URL(source.href);
            url.searchParams.set('hogyan', direction.value); url.searchParams.delete('oldal');
            location.assign(url.href);
        });
        headings.before(controls);
    }

    function initPagination() {
        for (const original of document.querySelectorAll('#pager_top, #pager_bottom')) {
            const links = [...original.querySelectorAll('a[href]')];
            if (!links.length) continue;
            const current = Math.max(1, Number(new URL(location.href).searchParams.get('oldal')) || 1);
            const numbered = links.map(a => ({a, page: Number(new URL(a.href).searchParams.get('oldal'))})).filter(e => e.page > 0);
            const last = numbered.find(e => /Utolsó/i.test(e.a.textContent))?.page;
            const pager = own(element('nav', 'ncm-pager'));
            pager.setAttribute('aria-label', original.id === 'pager_top' ? 'Felső lapozó' : 'Alsó lapozó');
            const linkTo = (page, text) => {
                const source = numbered.find(e => e.page === page)?.a || numbered[0]?.a;
                if (!source) return;
                const url = new URL(source.href); url.searchParams.set('oldal', String(page));
                const link = element('a', '', text); link.href = url.href; pager.appendChild(link);
            };
            if (current > 1) linkTo(current - 1, '‹ Előző');
            const number = element('span', '', `${current}. oldal`); number.setAttribute('aria-current', 'page'); pager.appendChild(number);
            if ((last && current < last) || numbered.some(e => e.page > current)) linkTo(current + 1, 'Következő ›');
            const more = element('details'); more.appendChild(element('summary', '', 'Oldalak'));
            const seen = new Set();
            for (const {a, page} of numbered) {
                if (seen.has(page)) continue; seen.add(page);
                const link = element('a', '', /Utolsó/i.test(a.textContent) ? `Utolsó (${page})` : `${page}`);
                link.href = a.href; more.appendChild(link);
            }
            pager.appendChild(more); original.before(pager); classToggle(original, 'ncm-original-pager');
        }
    }

    function panelForRow(row) {
        let next = row.nextElementSibling;
        for (let count = 0; next && count < 4; count++, next = next.nextElementSibling) {
            if (next.matches('.box_torrent')) break;
            if (next.matches('.torrent_lenyilo, .torrent_lenyilo2')) return next;
        }
        return null;
    }
    function isPanelOpen(panel) { return Boolean(panel && !panel.hidden && getComputedStyle(panel).display !== 'none'); }
    function setText(node, text) { if (node.textContent !== text) node.textContent = text; }

    function enhanceRow(row) {
        const title = row.querySelector('.torrent_txt > a, .torrent_txt2 > a');
        const main = row.querySelector('.box_nagy, .box_nagy2');
        const name = row.querySelector('.box_nev2');
        if (!title || !main || !name) return;
        let state = session.rows.get(row);
        if (!state || !state.meta.isConnected || state.title !== title) {
            const meta = own(element('div', 'ncm-compact-meta'));
            const badges = own(element('div', 'ncm-status-badges'));
            const actions = own(element('div', 'ncm-row-actions'));
            const toggle = button('Kibontás', 'ncm-row-toggle');
            toggle.setAttribute('aria-expanded', 'false');
            const details = element('a', 'ncm-details-link', 'Részletek'); details.href = title.href;
            const uploaded = element('time', 'ncm-uploaded');
            actions.append(toggle, details, uploaded); name.after(meta, badges, actions);
            state = {meta, badges, actions, toggle, title, uploaded, uploadedKey: '', metaKey: '', statusKey: ''}; session.rows.set(row, state);
            listen(toggle, 'click', () => title.click());
            // Retain the site's title expansion handler and all original aNi controls.
        }
        const bookmark = row.querySelector('.torrent_konyvjelzo, .torrent_konyvjelzo2');
        if (bookmark && bookmark.parentElement !== state.actions) move(bookmark, state.actions);
        keyboard(bookmark, 'Könyvjelző hozzáadása');
        const uploadedNode = row.querySelector('.box_feltoltve2');
        const uploadedText = [...(uploadedNode?.childNodes || [])].map(node => node.nodeName === 'BR' ? ' ' : node.textContent).join('').trim().replace(/\s+/g, ' ');
        if (state.uploadedKey !== uploadedText) {
            state.uploadedKey = uploadedText; state.uploaded.replaceChildren();
            const match = uploadedText.match(/(\d{4}-\d{2}-\d{2})\s*(\d{2}:\d{2}(?::\d{2})?)/);
            if (match) {
                state.uploaded.dateTime = `${match[1]}T${match[2]}`;
                state.uploaded.append(element('span', '', match[1]), element('span', '', match[2]));
            } else {
                state.uploaded.removeAttribute('datetime'); state.uploaded.textContent = uploadedText;
            }
            state.uploaded.title = `Feltöltve: ${uploadedText}`;
            state.uploaded.setAttribute('aria-label', `Feltöltve: ${uploadedText}`);
        }
        const category = row.querySelector('.categ_link')?.getAttribute('alt') || '';
        const release = title.getAttribute('title') || title.textContent;
        const resolution = release.match(/(?:^|[._\s-])(2160p|1080[pi]|720p|480p)(?:[._\s-]|$)/i)?.[1] || '';
        const size = row.querySelector('.box_meret2')?.textContent.trim() || '';
        const seeds = row.querySelector('.box_s2')?.textContent.trim();
        const leech = row.querySelector('.box_l2')?.textContent.trim();
        const pieces = [category, resolution, size, seeds !== undefined ? `${seeds} seed` : '', leech !== undefined ? `${leech} leech` : ''].filter(Boolean);
        const metaKey = pieces.join('|');
        if (state.metaKey !== metaKey) {
            state.metaKey = metaKey; state.meta.replaceChildren();
            for (const text of pieces) state.meta.appendChild(element('span', text === '0 seed' ? 'ncm-zero-seed' : '', text));
        }
        const statusNames = {torrent_gold:'Arany', torrent_hidden:'Rejtett', torrent_err:'Hibás'};
        const status = Object.entries(statusNames).filter(([cls]) => row.querySelector(`.${cls}`));
        const statusKey = status.map(([cls]) => cls).join('|');
        if (state.statusKey !== statusKey) {
            state.statusKey = statusKey; state.badges.replaceChildren();
            for (const [cls, text] of status) {
                const badge = element('span', '', text); badge.title = row.querySelector(`.${cls}`)?.title || text;
                state.badges.appendChild(badge);
            }
        }
        state.badges.hidden = !status.length;
        const aniName = row.querySelector('.ani-box-name');
        const aniIcons = row.querySelector('.ani-torrent-icons');
        if (aniName && aniIcons) {
            const imdb = [...row.querySelectorAll('.siterank a')].find(a => /imdb\s*:/i.test(a.textContent));
            const rating = imdb?.textContent.match(/imdb\s*:\s*(\d+(?:[.,]\d+)?)/i)?.[1];
            classToggle(aniName, 'ncm-no-imdb', !rating);
            if (rating) {
                if (!state.imdb) {
                    state.imdb = own(element('a', 'ncm-imdb-score'));
                    state.imdb.append(element('span', '', 'IMDb'), element('strong'));
                    aniIcons.appendChild(state.imdb);
                }
                state.imdb.href = imdb.href; state.imdb.target = imdb.target;
                state.imdb.rel = 'noopener noreferrer';
                state.imdb.setAttribute('aria-label', `IMDb értékelés: ${rating}`);
                setText(state.imdb.querySelector('strong'), rating);
                classToggle(imdb, 'ncm-original-imdb');
            } else if (state.imdb) { state.imdb.remove(); state.imdb = null; }
        }
        const panel = panelForRow(row); const open = isPanelOpen(panel);
        classToggle(row, 'ncm-expanded', open);
        state.toggle.setAttribute('aria-expanded', String(open));
        setText(state.toggle, open ? 'Bezárás' : 'Kibontás');
        if (panel) {
            if (!panel.id) setAttribute(panel, 'id', `ncm-panel-${++session.panelIndex}`);
            state.toggle.setAttribute('aria-controls', panel.id);
        }
    }

    function enhanceBookmarksPage() {
        const form = document.querySelector('form[name="konyvjelzo_szerkesztes"]');
        if (!form) return;
        classToggle(document.body, 'ncm-bookmarks-page');
        const table = form.querySelector('table[width="100%"], table');
        if (!table) return;
        classToggle(table, 'ncm-bookmark-table');
        for (const row of table.querySelectorAll('tr')) {
            const deletion = row.querySelector('input[name="torlendo_konyvjelzok[]"]');
            if (deletion) {
                classToggle(row, 'ncm-bookmark-row');
                const title = row.querySelector('.bookmark_name_txt a')?.title || 'könyvjelző';
                setAttribute(deletion, 'aria-label', `Törlés kijelölése: ${title}`);
                setAttribute(row.querySelector('select[name^="athelyez["]'), 'aria-label', `Áthelyezés: ${title}`);
                setAttribute(row.querySelector('input[name^="konyvjelzo_nev["]'), 'aria-label', `Új név: ${title}`);
            } else if (row.querySelector('.bookmark_lenyilo')) classToggle(row, 'ncm-bookmark-detail-row');
            else if (row.querySelector('#osszes')) {
                classToggle(row, 'ncm-bookmark-select-all');
                setAttribute(row.querySelector('#osszes'), 'aria-label', 'Összes könyvjelző kijelölése törléshez');
            } else if (row.querySelector('#bookmark_nevszerk')) classToggle(row, 'ncm-bookmark-header');
            else classToggle(row, 'ncm-bookmark-separator');
        }
    }

    function dismissDialog(dialog) {
        const close = [...dialog.querySelectorAll('a,button,input[type="button"]')].find(e =>
            !e.classList.contains('ncm-dialog-close') && /mégse|bezár|cancel|close/i.test(`${e.textContent} ${e.value || ''} ${e.title || ''} ${e.getAttribute('aria-label') || ''}`));
        // Use the site's own dismissal handler, never a save/submit control.
        if (close) close.click();
    }
    function focusables(dialog) {
        return [...dialog.querySelectorAll('a[href],button,input:not([type="hidden"]),select,textarea,[tabindex]')]
            .filter(e => !e.disabled && e.tabIndex >= 0 && e.getClientRects().length);
    }
    function updateDialogs() {
        const visible = [...document.querySelectorAll('.generic_dialog')].filter(e => e.isConnected && !e.hidden && getComputedStyle(e).display !== 'none');
        for (const [dialog, state] of session.dialogs) {
            if (!visible.includes(dialog) && state.open) {
                state.open = false;
                if (state.returnFocus?.isConnected) state.returnFocus.focus({preventScroll:true});
            }
        }
        for (const dialog of visible) {
            let state = session.dialogs.get(dialog);
            if (!state) {
                state = {open:false, returnFocus:null}; session.dialogs.set(dialog, state);
                setAttribute(dialog, 'role', 'dialog'); setAttribute(dialog, 'aria-modal', 'true');
                if (!dialog.hasAttribute('aria-label') && !dialog.hasAttribute('aria-labelledby')) setAttribute(dialog, 'aria-label', 'nCore párbeszédablak');
                setAttribute(dialog, 'tabindex', '-1');
                const close = button('Bezárás', 'ncm-dialog-close');
                const content = dialog.querySelector('#pop_contentdiv,td.pop_content,#pop_content,.generic_dialog_popup') || dialog;
                content.prepend(close); listen(close, 'click', () => dismissDialog(dialog));
                listen(dialog, 'keydown', event => {
                    if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); dismissDialog(dialog); }
                    if (event.key !== 'Tab') return;
                    const nodes = focusables(dialog); const first = nodes[0]; const last = nodes[nodes.length-1];
                    if (!first) { event.preventDefault(); dialog.focus(); }
                    else if (event.shiftKey && (document.activeElement === first || document.activeElement === dialog)) { event.preventDefault(); last.focus(); }
                    else if (!event.shiftKey && (document.activeElement === last || !dialog.contains(document.activeElement))) { event.preventDefault(); first.focus(); }
                });
            }
            if (!state.open) {
                state.open = true; state.returnFocus = document.activeElement;
                const target = dialog.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]),select,textarea') || focusables(dialog)[0] || dialog;
                target.focus({preventScroll:true}); target.scrollIntoView({block:'nearest'});
            }
        }
        classToggle(document.body, 'ncm-dialog-locked', visible.length > 0);
    }

    function enhance(root) {
        const rows = new Set();
        if (root instanceof Element) {
            const row = root.closest('.box_torrent'); if (row) rows.add(row);
            if (root.matches('.torrent_lenyilo,.torrent_lenyilo2')) {
                let previous = root.previousElementSibling;
                for (let i = 0; previous && i < 4; i++, previous = previous.previousElementSibling) {
                    if (previous.matches('.box_torrent')) { rows.add(previous); break; }
                }
            }
        }
        for (const row of root.querySelectorAll?.('.box_torrent') || []) rows.add(row);
        for (const row of rows) enhanceRow(row);
        for (const node of root.querySelectorAll?.('.bookmark_szerk') || []) keyboard(node, 'Könyvjelző nevének szerkesztése');
        for (const node of root.querySelectorAll?.('#bookmark_groupsel') || []) setAttribute(node, 'aria-label', 'Könyvjelző csoport');
        for (const node of root.querySelectorAll?.('.torrent_kep_ico2 .fancy_groups') || []) setAttribute(node, 'aria-label', 'Mellékelt kép megnyitása');
    }

    function activate() {
        if (session || !document.body) return;
        session = { controller:new AbortController(), owned:new Set(), attributes:new Map(), classes:new Map(), classless:new Set(), moved:new Map(),
            rows:new WeakMap(), keyboard:new WeakSet(), dialogs:new Map(), panelIndex:0, pending:new Set(), frame:0 };
        classToggle(document.documentElement, 'ncm-enabled');
        const style = own(element('style')); style.textContent = css + improvements;
        (document.head || document.documentElement).appendChild(style);
        let viewport = document.querySelector('meta[name="viewport"]');
        if (!viewport) { viewport = own(element('meta')); viewport.name = 'viewport'; document.head.appendChild(viewport); }
        setAttribute(viewport, 'content', 'width=device-width, initial-scale=1, viewport-fit=cover');
        const action = new URLSearchParams(location.search).get('action');
        if (/\/torrents.php$/i.test(location.pathname)) classToggle(document.body, 'ncm-torrents-page');
        if (action === 'details' || document.getElementById('details1')) classToggle(document.body, 'ncm-details-page');
        if (/\/bookmarks(?:\.php|\/)/i.test(location.pathname)) classToggle(document.body, 'ncm-bookmarks-page');
        initHeader(); initFilters(); initSorting(); initPagination(); enhanceBookmarksPage(); enhance(document); updateDialogs();
        session.observer = new MutationObserver(mutations => {
            if (!session) return;
            for (const mutation of mutations) {
                if (mutation.type === 'attributes' && !mutation.target.matches('.torrent_lenyilo,.torrent_lenyilo2,.generic_dialog')) continue;
                session.pending.add(mutation.target instanceof Element ? mutation.target : mutation.target.parentElement);
                for (const node of mutation.addedNodes || []) if (node instanceof Element) session.pending.add(node);
            }
            if (!session.frame && session.pending.size) session.frame = requestAnimationFrame(() => {
                if (!session) return;
                session.frame = 0; const roots = [...session.pending]; session.pending.clear();
                for (const root of roots) if (root?.isConnected) enhance(root);
                updateDialogs(); session.updateFilters?.();
            });
        });
        session.observer.observe(document.body, {childList:true,subtree:true,attributes:true,attributeFilter:['style','hidden']});
    }

    function deactivate() {
        if (!session) return;
        const old = session;
        old.observer?.disconnect(); old.controller.abort(); cancelAnimationFrame(old.frame);
        // Restore moved originals before removing the containers that temporarily held them.
        for (const [node, marker] of [...old.moved].reverse()) {
            if (marker.parentNode && node.isConnected) marker.replaceWith(node);
            else marker.remove();
        }
        for (const node of old.owned) node.remove();
        for (const [node, attributes] of old.attributes) for (const [name, record] of attributes) {
            // Do not overwrite a subsequent change made by the site or another extension.
            if (node.getAttribute(name) !== record.after) continue;
            if (record.before === null) node.removeAttribute(name); else node.setAttribute(name, record.before);
        }
        for (const [node, classes] of old.classes) for (const [name, before] of classes) node.classList.toggle(name, before);
        for (const node of old.classless) if (node.getAttribute('class') === '') node.removeAttribute('class');
        session = null;
    }

    function updateMode() {
        // Before a mobile viewport exists, use the device width rather than its legacy 980px layout viewport.
        const hasViewport = !!document.querySelector('meta[name="viewport"]');
        const small = narrow.matches || (!hasViewport && touch.matches && window.screen.width <= MOBILE_BREAKPOINT);
        const enabled = mode !== 'desktop' && small && (mode === 'mobile' || touch.matches);
        if (enabled) activate(); else deactivate();
    }
    function chooseMode(next) {
        mode = next;
        if (typeof GM_setValue === 'function') GM_setValue('layoutMode', next);
        updateMode();
    }
    if (typeof GM_registerMenuCommand === 'function') {
        GM_registerMenuCommand('Nézet: automatikus (érintőképernyő)', () => chooseMode('auto'));
        GM_registerMenuCommand('Nézet: mobil (keskeny ablakban)', () => chooseMode('mobile'));
        GM_registerMenuCommand('Nézet: eredeti asztali', () => chooseMode('desktop'));
    }
    for (const media of [narrow, touch]) {
        if (media.addEventListener) media.addEventListener('change', updateMode);
        else media.addListener(updateMode);
    }
    window.addEventListener('resize', updateMode);
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', updateMode, {once:true});
    else updateMode();
})();
