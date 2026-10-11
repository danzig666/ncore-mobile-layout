# Mobile layout regression checks

Run `node tests/preview-server.js` from the repository root, then open `http://127.0.0.1:8765/torrents.php` in a browser. This dependency-free fixture reproduces native and aNi torrent wrappers, site event handlers, filters, AJAX panels, and a bookmark dialog using synthetic data. It loads the actual userscript. Toolbar controls mock Tampermonkey preferences and pointer detection; they are not production UI.

Check both the native page and the aNi page (`Toggle aNi`):

1. At 320px and 390px CSS viewport width, `Auto` plus `Mouse pointer` must leave the original page untouched. `Touch pointer` must activate mobile controls. `Mobile` should also activate with a mouse, and `Desktop` must restore the original page.
2. At 761px and wider, mobile controls must be absent even in `Mobile` mode. Resize from mobile to desktop and back: original controls and event handlers must survive, without duplicated controls. Compare the container DOM before activation and after deactivation; it must be identical when no site state has changed.
3. Check that titles, translated titles, metadata, badges, and actions do not overlap, and that the mobile document has no horizontal overflow. Size and seed/leech counts must be readable, including zero seeds. Expanded cards must retain full-width titles and all native actions.
4. Open filters. Select a category by its label, a type, and a tag. The summary must update, the checkbox's native change handler must still run, and all original named inputs must remain in the original form. Hide filters and verify the search field remains visible. Deactivate and verify values are preserved.
5. Select a sort field and direction, then apply. Verify the URL retains `tags=drama`, sets `miszerint` and `hogyan`, and clears `oldal`. Check previous/next pagination, the last-page boundary, and the additional page links. Existing links provide query context.
6. Expand and collapse a row via both its title and `Kibontás`/`Bezárás`. The button's expanded state must track the native panel. Use `Add row` and verify one action bar and metadata row are added to the new torrent.
7. With aNi present, verify highlighter and hide targets still fire their existing handlers. Their wrappers must remain intact. Bookmarks must work in both variants.
8. Open a bookmark dialog. Focus must enter the name field, Tab/Shift+Tab must remain inside the dialog, and Escape or `Bezárás` must use the native cancel action, unlock page scrolling, and return focus to the opener. No save action should fire during dismissal.

The fixture is a regression aid, not a replacement for testing the live nCore page: themes, other extensions, and future site markup can differ.
