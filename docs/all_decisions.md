# Decisions

A record of design choices, kept to 1–2 lines per item and organized by development phase.

## Phase 1: initial setup and basic deployment

- **Use Python 3.11 throughout.** This is the installed interpreter, and Render is configured with `PYTHON_VERSION=3.11.5` to match it. The code does not use syntax exclusive to Python 3.12.
- **Keep a single `.gitignore` at the root.** The patterns `.env*` and `!.env.example` exclude real environment files while retaining the examples. Since a nested `frontend/.gitignore` would override this exception, its rules were combined with the root file.
- **Validate frontend configuration immediately.** `lib/config.ts` throws an error when a `NEXT_PUBLIC_*` value is absent, causing a misconfigured Vercel build to fail rather than deploying a site that cannot contact the API.
- **Set `CORS_ORIGINS` as a comma-separated string.** `config.py` converts it into a list, so the Render environment variable does not need to contain JSON.
- **Keep testing packages in `requirements.txt`.** Having one dependency file ensures the documented setup (`pip install -r requirements.txt`, followed by `pytest`) works as described.
- **Place the temporary `/ws/ping` echo in its own module** (`app/realtime/ping.py`), allowing Phase 5 to remove it by deleting just that file and one include line.
- **Use `/api/health` as Render's health check.** Render waits until this check succeeds before directing traffic to a new deployment.
- **Disable `cacheComponents` and `partialPrefetching`.** create-next-app 16.4 enables them by default, but they cache server-rendered content that this app does not use. When enabled, a page you leave remains mounted but hidden, retains state, and runs its effects again when revisited. The room and pre-join pages are easier to manage when navigation away unmounts them.
- **Set `agentRules: false` in `next.config.ts`.** Otherwise, `next dev` may generate an `AGENTS.md` file inside `frontend/`. Disabling this keeps the directory limited to files we intentionally added.
- **Retain `httpx` despite the known warning.** Starlette 1.7 recommends `httpx2` for `TestClient`, which causes pytest to display a deprecation notice. Because `httpx` is only used in tests and is approved, it remains in place and the warning is accepted.

## Phase 2: core backend

- **Services raise focused domain exceptions** (`NotFound`, `Gone`, `Conflict`, …). A single handler in `main.py` converts them into `{"detail": ...}` responses with the appropriate status code, keeping FastAPI imports out of the service layer.
- **Add CHECK constraints** beyond those in the documented schema, including 11-digit meeting codes, text lengths aligned with request validation, and end times later than start times. This prevents invalid data from entering through any route.
- **Meeting codes:** an initial lookup detects collisions, while the UNIQUE constraint provides the final safeguard, with up to five retries. `add_with_unique_code` must be the transaction's first write because a collision causes the transaction to roll back.
- **Upcoming meetings:** first filter in SQL using an index (meetings do not run longer than 24 hours), then verify the exact end time in Python.
- **Check for past start times in the service layer**, rather than in Pydantic, so the 422 response includes a message the UI can display directly.
- **Pin all packages in `requirements.txt`, including transitive dependencies**, so Render installs the versions that were tested. `colorama` (Windows-only) and `uvloop` (Linux-only) are the exceptions.
- **Each test gets its own temporary SQLite database file** and each request gets a fresh session, ensuring that a missing commit causes the test to fail.
- **Seeded meetings use Indian office hours** (10:00–18:00, Asia/Kolkata) relative to the current date, including one meeting later today if office hours have not ended. `seed_if_empty` accepts an optional `now` value, allowing tests to control the clock.
- **Divide seeding across three modules:** `seed.py` defines what is seeded, `seed_time.py` handles when, and `seed_rows.py` builds the rows. This keeps each file concise.
- **Concurrent first-time joins:** if two people enter a meeting that has not started at exactly the same time, both may attempt to create a session. The one-live-session index rejects the second INSERT; that request rolls back and joins the session that succeeded through `live_or_new_session`, avoiding a user-facing error.

## Phase 3: dashboard interface

- **Load the Inter font** with `next/font/google`. It is the closest free alternative to Zoom's typeface and supports variable weights; the system UI font stack is the fallback.
- **Use a text-based wordmark rather than Zoom's logo file.** Writing “zoom” in Zoom blue gives a similar appearance without bundling the official logo.
- **Derive dimensions by dividing screenshot measurements by 1.25.** The reference images use 125% display scaling, meaning 1920 screenshot pixels correspond to 1536 CSS pixels.
- **Use `useResource(load)` as the shared data-loading pattern.** It updates state only inside promise callbacks, as React lint rules prohibit synchronous `setState` calls in effects. It ignores results from discarded runs and leaves existing data visible while `reload()` fetches fresh data.
- **Load `/me` once through `CurrentUserProvider`** in the root layout. The navigation avatar, profile card, and pre-join page reuse that result instead of making separate requests.
- **Show live meetings under an “In progress” heading** at the top of Upcoming. Instant meetings that are already live have no scheduled start time, so they cannot be grouped by date.
- **Display one toast at a time using context.** Since it persists across navigation, a “Meeting scheduled” notification remains visible when Save redirects back to Home.
- **Placeholder features display “Not available in this demo.”** Navigation and sidebar entries use tooltips, while Profile and Settings in the avatar menu show the message as a toast because clicking a menu item closes the menu.
- **Render the new-meeting Schedule form only on the client** using `next/dynamic` with `ssr: false`. Its default values depend on the browser clock and time zone, which could differ during server rendering and trigger a React hydration mismatch.
- **Share one form between creation and editing.** `ScheduleForm` accepts an optional meeting, while conversions such as 12-hour/24-hour time, duration splitting, and validation are handled by plain functions in `scheduleFormValues.ts`.
- **Set the default meeting duration to one hour.** The screenshot's 40-minute duration reflects Zoom's Basic-plan restriction, which is not part of this project's scope.
- **Preserve non-standard saved values in select controls.** An API-created meeting may last 40 minutes; `withValue` adds that duration as an option so Edit can display it and Save will not silently alter it.
- **Display modern time-zone names.** Chrome may return legacy names such as `Asia/Calcutta`, so a small mapping displays `Asia/Kolkata` instead. Both names are accepted by Chrome and the server.
- **Include the description in the copied invitation text**, ensuring the field is both stored and used.
- **Use native date inputs and select elements.** They provide keyboard and screen-reader accessibility, and the date field opens the browser's built-in calendar picker, similar to Zoom.
- **Make the meeting-card menu non-modal** with `modal={false}`. Otherwise, closing a modal menu as the delete dialog opens may leave the page unable to receive clicks.
- **Use optimistic deletion.** `useDeleteMeeting` tracks deleted meeting codes and immediately hides their cards. If the request fails, the code is removed from that set and the card reappears in its original position because the loaded list itself was never modified.
- **Highlight Meetings in the sidebar on Schedule pages**, matching Zoom. In this demo, it links to Home, which contains the meetings list.
- **Validate the meeting from the Join box before navigating away.** `parseMeetingInput` accepts IDs containing spaces or hyphens, as well as URLs with `/j/<11 digits>`. It then calls `GET /meetings/{code}` so unknown, cancelled, or ended meetings produce an inline error instead of failing on the next page.
- **Keep join error wording consistent with the backend** through `lib/meetingStatus.ts`, so “has ended” appears identically whether the browser or server detects the condition.
- **Reuse `useStartMeeting` for Host, New meeting, and Start.** It calls the API, stores the join session (microphone enabled and camera based on the meeting's host-video setting), and opens the room. The button remains disabled until loading completes to prevent double-clicks from starting duplicate meetings.
- **Validate the join session when retrieving it.** Since sessionStorage can contain arbitrary data, `loadJoinSession` checks its structure and treats corrupted values as “not joined.”
- **Position Start beside the meeting-card title**, because the narrow bottom row cannot fit three controls. For an active meeting, label the button “Join,” since `/start` reconnects the host.
- **Use a temporary room page until Phase 5.** `/meeting/{code}` displays the meeting and the user's role, redirecting tabs without a saved session to `/j/{code}`. Phase 5 replaces this placeholder with the functional room.

## Phase 4: pre-join screen

- **Only activate the camera in the preview.** The microphone setting (Mute/Unmute) is selected on this page and stored in the join session; the room activates it in Phase 6.
- **Camera errors must not prevent joining.** `useCameraPreview` disables the camera and shows the cause (permission blocked, device missing, or busy). Joining then stores `video_on: false`.
- **Open the camera separately on the preview page and in the room.** This may make the indicator blink once during entry, but it is simpler than transferring a live stream between pages.
- **Do not request camera access for meetings that cannot be joined.** Invalid, cancelled, and ended meetings display the relevant message and a “Back to home” option without showing the preview.
- **Validate the code before making any request.** Otherwise, `/j/upcoming` could call the valid endpoint `GET /api/meetings/upcoming`. `isMeetingCode` therefore rejects anything other than 11 digits first, and the Edit page (`/schedule/{code}`) applies the same check.
- **Send Back to Home.** An invitation opened in a new tab may not have a previous page in its history.
- **Make the Remember checkbox reflect whether a name is saved.** It is checked when a saved name exists; selecting it stores the name on Join, while clearing it removes the saved name.
- **Populate the name from `/me` until the user edits it.** The field prioritizes the remembered name, then the signed-in user's name, and thereafter uses the typed value. This allows a slow `/me` request to fill the field initially.
- **Show join errors beneath the button instead of in a toast**, such as when a meeting is cancelled after the page has loaded.
- **Do not show dropdown arrows on the preview pill.** Zoom uses these menus for device selection, which this demo does not provide; the room toolbar will initially use placeholders.

## Phase 5: meeting room framework and presence

- **Accept the socket first, then validate it.** The socket accepts the connection and closes with 4001 (bad token), 4003 (removed) or 4010 (ended) after a failed check, because the browser cannot read the close code when a handshake is refused. `close_code_for` maps each admission error to its code.
- **Use a separate lock for each meeting code.** Joins, leaves, the grace timer and "End meeting for all" take it, so a reconnect can't race a leave or an ending. This ensures each meeting's operations run sequentially.
- **Keep database sessions short-lived.** The socket gets a session factory (`get_session_factory`) and opens a session for each step inside `run_in_threadpool`, rather than keeping one session open for the entire call. Services return plain data (`RoomMember`), never ORM objects from a closed session.
- **Reconnects silently replace the previous socket.** The manager keys sockets by participant. A newer socket for the same participant replaces the old one (closed with 4001) and only a `media_state` is broadcast, not a second `participant_joined`. The old socket's cleanup has no effect because it is no longer registered.
- **Implement the grace period as a background task.** When the last connection drops, a task waits 30 s and ends the session if the room is still empty. Reconnecting cancels this task. Clicking Leave as the last person ends the session at once.
- **Run WebSocket tests on a shared event loop.** `live_client` runs the app inside `with TestClient(...)`, as the real server shares one loop and one connection manager across sockets. A new connection manager is still created for every test.
- **Until Phase 6, media controls only update flags.** Mute and Video flip a flag, broadcast `media_state` and save it in the join session, so their values persist after a refresh. No camera or mic opens in the room yet, so every tile shows its camera-off look.
- **Chat and host features are deferred until Phase 7.** Chat and Host tools show "Not available in this demo". The panel frame (`RoomPanel`) is built so Chat is a second panel later.
- **When the End menu is open, Cancel takes the toolbar's place**, matching the reference screenshot. Pressing Escape also dismisses the menu.
- **Rejoin refreshes the page.** After a lost connection the room shows "Rejoin", which reloads. The page loads the saved join session again and reconnects using the current microphone and camera settings.
- **`/ws/ping` is gone**, together with its test.
- **Forward signalling payloads as opaque JSON.** The server checks only `type` and `to`, and passes `data` (offer, answer or ICE candidate) to that participant in the same session. Parsing SDP on the server would provide no benefit.
- **Use a single `replaceTrack` effect for all track changes.** `usePeerConnections` swaps the current mic and camera tracks into every peer whenever they change. This handles camera toggling and devices opened after the offer was sent without requiring renegotiation.
- **Create a new `MediaStream` whenever a track arrives.** `ontrack` builds a new stream holding the tracks so far, so React sees a new value and the tile's effect re-sets `srcObject`.
- **No special logic is needed for reconnecting after a refresh.** The refreshed tab is a newcomer: `welcome` lists the others and it offers to each. An existing peer that gets an offer from an id it already knows closes the old connection and answers on a new one.

## Phase 7: additional features

- **Keep host operations in `realtime/host_actions.py`**, moving “End meeting for all” there from `actions.py`. `ws.py` refuses them from anyone whose role isn't host, so each command can assume a host sent it.
- **Muting is handled as a request.** The server sends `force_mute`; the client mutes its own mic and reports `media_state` like any mute, so the person can unmute again, as in Zoom. People already muted, and other hosts, are skipped, so nobody sees the toast for nothing.
- **Host actions are limited to participants in the host's own session.** A host can't touch another meeting's participant by guessing an id, and can't mute or remove themselves this way.
- **Perform participant removal while holding the meeting lock.** The row becomes `removed` before the socket closes with 4003, so a refresh can't slip back in; `admit` already refuses removed tokens. With no accounts, the person can still join again from the pre-join page as a new guest.
- **Ask for confirmation before removing someone** using the existing `ConfirmDialog`. Mute and Mute All don't, because people can unmute themselves.
- **Use a dark `RoomMenu`** around the room's Radix dropdown: the row "…" menu and Host tools. The portal's white `Menu` is unchanged.
- **Host tools displays a compact menu**: Mute All, and Manage Participants (opens the panel). Zoom's other host tools (locking, waiting room) are out of scope.
- **Shared WebSocket test utilities live in `tests/ws_helpers.py`**, used by presence, host-control, and chat tests.
- **`devIndicators: false` in `next.config.ts`.** Next's dev-only badge sits at the bottom left, on top of the room's Mute button.
- **Persist each chat message before broadcasting it to all participants, including its sender.** The sender's own copy comes back from the server, so every message on screen has the id and time the database saved. Messages are not replayed to people who join or refresh later, matching Zoom's default behavior.
- **Validate chat message bodies using the socket message model**: trimmed, 1–2000 characters, the same as the table's CHECK. A bad one gets an `error` and nothing is saved.
- **Support only “Everyone.”** The "to:" pill is a label, not a menu, since private messages are out of scope. "Who can see your messages?" answers itself in a tooltip.
- **Show the unread message count on the Chat button.** The room remembers how many messages there were when the chat was last closed; newer ones show as a red badge.
- **Enter sends a message, while Shift+Enter inserts a newline.** Enter is left alone while an input method (Chinese, Japanese, …) is still composing.
- **For attendees, label the red button “Leave,” as Zoom does, because only the host can end the meeting.** Its menu then offers only Leave Meeting.
- **Make the toolbar responsive to its own width rather than the viewport width.** The footer is a CSS container (Tailwind's `@container`), and each button shows "always", "wide" or "narrow". A side panel open at 1024px used to push End off the toolbar; now the toolbar switches to the short set (Mute, Video, Participants, More, End or Leave), the same one a phone gets.
- **On narrow layouts, More becomes a functional menu**: Chat (with the unread count), React, Share, and Mute All for the host. When wide, More stays a placeholder.
- **Use 64px-wide buttons on the compact toolbar instead of 72px**, so the five fit on a 360px phone as well as 390px.
- **Set a minimum grid-row height of 8rem.** A crowded one-column grid on a phone scrolls instead of squeezing tiles into strips.
- **The dashboard stacks vertically below the `lg` breakpoint.** A page-by-page check found no sideways scrolling at 390px or 360px.
- **Screen sharing replaces only the outgoing video track.** The screen reaches every peer through the same `replaceTrack` effect as the camera, so nothing is renegotiated; stopping puts the camera track (or nothing) back. The camera keeps running meanwhile, so switching back is instant.
- **Include a `screen` flag in `media_state`**, and send it in `welcome` and `participant_joined` too. Other people's tiles need it: a screen is shown whole (`object-contain`), never mirrored, and even when that person's camera is off. A client that leaves the flag out counts as not sharing.
- **Open the screen-sharing picker directly from the click handler.** `getDisplayMedia` only works during a user gesture (Safari is strict about this), so unlike the camera it isn't opened from an effect. Closing the picker is silent; phones, which can't share, get a notice.
- **The browser's built-in “Stop sharing” button** ends the track; the hook listens for `ended` and switches back to the camera.
- **Use `meeting_ended` and `removed` messages to end the room, rather than relying on the close code.** On the live site the server's 4010/4003 close didn't reach the browser in time, so End seemed to do nothing. The tab now switches screens and closes its own socket when the message arrives; the close code is kept as a fallback.
- **Close all sockets concurrently after releasing the lock when ending a meeting.** A close waits for the browser to answer. Done one by one inside the meeting lock, one slow browser held up everyone after it and blocked the meeting. Remove also closes its socket after releasing the lock.
- **Set Speaker view as the default, with Gallery available in one click.** The grid icon in the room header switches them. The main tile goes to someone else sharing their screen, then the active speaker, then the first other person, then you when alone. Your own shared screen is never put there, because it would show the room inside itself.
- **Detect the active speaker with Web Audio.** One AnalyserNode per remote mic, read every 100 ms. The loudest above a small RMS threshold takes over once the current speaker has been quiet for 1.5 s, so the main tile doesn't flicker. The green border shows only while they are still talking. Meters are rebuilt whenever the set of remote mics changes, which is simpler than patching them.
- **Calculate tile dimensions in code instead of stretching them with CSS.** A ResizeObserver measures the stage. Speaker view's main video is the largest 16:9 box that fits under the strip. Gallery view tries every column count and keeps the one with the biggest 16:9 tiles. The math lives in `lib/tileLayout.ts`. Main and gallery videos show the whole picture (object-contain); strip tiles fill theirs (object-cover).
- **Generate TURN credentials on the backend.** `GET /api/ice-servers` returns STUN plus a TURN relay, with a password of base64(HMAC-SHA1(secret, "<expiry>:zoomclone")), valid for 24 hours, so the secret never reaches the browser. The room loads this list with the meeting, before the socket opens, so no peer connection is made without it. If the request fails, it falls back to STUN. `?relay=1` forces `iceTransportPolicy: "relay"` for testing.
- **Metered's Open Relay did not provide working relay connections during testing.** `staticauth.openrelay.metered.ca` refused TCP connections and `openrelay.metered.ca` answered allocations with a 400 error. The host and secret are settings, so a working TURN server can be swapped in without code changes.

## Additional Zoom room capabilities

- **Reuse the camera-switching flow for device menus.** Picking a mic or camera reopens it with an `exact` deviceId, and the existing `replaceTrack` effect in `usePeerConnections` swaps it into every peer, so there is no renegotiation. This replaces the Phase 4 plan of placeholder ^ menus.
- **Preserve mute and camera-off states when switching devices.** The mute effect re-applies `enabled` to the new mic track. With the camera off, a picked camera is only remembered and is used when Video starts.
- **Refresh the device list on `devicechange` and whenever the microphone or camera is opened.** Browsers hide device names and ids until a device has been allowed. Entries without an id are dropped.
- **The selected device is:** the one picked, else the one the open track reports, else the first listed (the browser's default). Choices aren't saved, so a refresh goes back to the defaults.
- **Choose the speaker with `setSinkId` on each remote tile's `<video>`**, passing it through the playback settings. The section is shown only where `HTMLMediaElement.setSinkId` exists. Our own tile is muted, so it's left alone.
- **Show the device dropdowns only on the wide toolbar**, like the other dropdown controls; a phone keeps the five-button toolbar.
- **Store pinning as local state in `useMeetingRoom`.** It is cleared on `participant_left` rather than hidden while that person is away, so someone who reconnects with the same id isn't pinned again. Only other people can be pinned.
- **Priority for the main tile:** someone else's shared screen, then the pinned person, then the active speaker. A shared screen still wins over a pin, as in Zoom. Pinning from Gallery switches to Speaker view.
- **The tile's ellipsis button appears through CSS on hover** (`group-hover`), and also shows on keyboard focus and while its menu is open.
- **Render “(Host)” in a separate span on the tile**, outside the truncated name, so a long name never hides it.
- **Separate WebSocket messages according to direction:** `messages.py` (client to server, close codes) and `server_messages.py` (server to client). One file was heading past 200 lines.
- **Define reactions as a Pydantic `Literal` containing the six allowed emoji.** Anything else gets the usual "not understood" error. The heart is two code points (U+2764 U+FE0F), so both sides use the same literal.
- **Broadcast reactions and raised-hand events to everyone, including the sender, just like chat.** So the sender's own tile shows exactly what the others see, and the host lowering your hand reaches you the same way.
- **Display each reaction for 10 seconds.** A newer one from the same person replaces it, and each timer only removes its own reaction. Nothing is saved.
- **Track raised hands as part of live connection state, alongside microphone and camera flags.** `PersonOut` carries `hand_raised`, so `welcome` and `participant_joined` include it. Raising twice or lowering a lowered hand sends nothing.
- **Clear a participant's raised hand when they reconnect**, matching Zoom's behavior. A refresh that replaces a live socket tells the others the hand went down; a refresh after the old socket closed is a fresh join anyway.
- **Do not restrict `lower_hand` to hosts**, since participants must be able to lower their own hands. With someone else's `participant_id`, the server checks that the sender is the host and looks the person up in the host's own session.
- **Track the local participant's hand in `useReactions`**, updating it from `hand` messages addressed to them; other people's hands are updated in `lib/roomState.ts` with their media state.
- **List participants with raised hands first**, using a stable sort. Zoom orders them by when they were raised; that would need a timestamp per hand.
- **Implement the reactions palette as a Radix menu** (`ToolbarMenuButton`), so picking a reaction closes it, as in Zoom, and arrow keys work. The same items sit at the top of More on a narrow toolbar.
- **“Ask to Unmute” sends a request rather than enabling the mic directly.** The server sends `ask_unmute` to that one person, and only if they are muted. Their own Unmute click turns the mic on, and the usual `media_state` tells everyone. The host's row menu shows Mute or Ask to Unmute depending on the person's mic.
- **Reuse `ConfirmDialog` for the unmute prompt**, which now takes a cancel label and a primary button style. Escape and the backdrop count as Stay Muted.

## Host permissions and mobile layout

- **Store permissions alongside connections for each live session.** `SessionPermissions` sits in the connection manager: the two settings (on by default, as in Zoom), the people the host asked to unmute or start video, and whether Mute All muted newcomers. It is forgotten when the session ends (`finish_session`), so the next run of a scheduled meeting starts with everything allowed.
- **A host's request also grants permission.** Ask to Unmute (or Ask to Start Video) lets that one person turn it on while the setting is off. Mute (or Stop Video) takes it back, and Mute All takes back every unmute ask. The asks are kept by participant id, so a refresh keeps them.
- **Send a personalized permissions view to each participant.** The `permissions` message carries the host's two settings plus `can_unmute` and `can_start_video` for that person. After a change the server compares everyone's view before and after, and sends only to people whose view changed. A toggle reaches everyone; an ask or a mute reaches one person.
- **Enforce permissions at two points on the server.** On entry, `admit` turns off a mic or camera the newcomer may not have, and `welcome.self` tells the app how it was let in. In `media_state`, turning on without permission is refused for that part only: it stays off, and the sender gets `force_mute` or `force_video_off` (so the existing code path turns the device off) and then an `error` with the reason, whose toast is the one left on screen. Turning off is always allowed, and someone who was already unmuted when the host turned unmuting off stays unmuted, as in Zoom.
- **This enforces the state communicated through signalling.** Media goes peer to peer, so a modified browser could still send audio. Real enforcement would need a media server.
- **Mute All applies to participants who join later as well.** The dialog says "All current and new participants will be muted", so a session flag mutes later joiners (but not hosts), as Zoom's Mute All does. Its checkbox starts from the current setting, which is on by default, so it doesn't silently turn unmuting back on.
- **The “Start video” permission does not control screen sharing.** Zoom has a separate sharing permission, which is out of scope.
- **Use `aria-disabled` rather than `disabled` for unavailable toolbar controls.** A disabled button gets no hover or focus, so its tooltip couldn't explain why. The click is ignored, the button is dimmed, and it loses its hover background.
- **Centralize host actions in `lib/hostCommands.ts`.** The room returns them as `room.host`. The Participants panel and its rows take that object instead of a callback per command. `useHostRequests` handles permissions, the force messages and the two ask dialogs, which keeps `useMeetingRoom` under 200 lines.
- **Have `mute`, `unmute`, `stopVideo`, and `startVideo` assign explicit states** rather than toggling them. A `welcome` and a `force_video_off` in the same render can't flip the camera back on.
- **Keep toolbar menus non-modal.** Mute All opens a dialog from the Host tools menu, and a modal menu closing as a dialog opens can leave the page unclickable (the same reason as the participant row menu).
- **Move participant-relay behavior into `relays.py`** (signals, mic and camera state, chat), split out of `actions.py`, which keeps joining and leaving.
- **Use `h-dvh` rather than `h-screen` for the room height.** On a phone, `100vh` is the height with the address bar hidden, so with the bar showing, the toolbar sat below the screen. `100dvh` is what is visible now. The room also has `overflow-hidden`, so the page never scrolls and only the panels' own lists do.
- **Use `viewport-fit=cover` along with safe-area padding.** The toolbar is `box-content` with `pb-[env(safe-area-inset-bottom)]`, so the home bar's space is added below the 72px buttons instead of squeezing them. The room pads its top and sides for a notch, and the full-screen phone panels pad top and bottom. Checked with Chrome's safe-area emulation (34px home bar, 47px notch) at 390×844.

## Host ownership in a no-account setup

- **Allow only one host in each active session.** `/start` answers 409 "This meeting is already being hosted on another device." while the live session has a host whose status is `in_meeting`. Status follows the WebSocket (closing it marks the host left), so Start works again once the host has gone.
- **Use a partial unique index as the final safeguard**, following the same pattern as the single-live-session-per-meeting rule: `participants(session_id) WHERE role = 'host' AND status = 'in_meeting'`. Two Starts at the same moment both pass the check; the index rejects the second INSERT, which rolls back and becomes the same 409.
- **A page refresh preserves the host role** because the tab reconnects with its saved join token and never calls `/start`. If another device took over while the old tab was away, `admit` refuses that token (4001), which already sends the tab to the pre-join page to join as a participant. Without this check the reconnect would also break the index.
- **Reuse `ConfirmDialog` for the 409 response**: "Join as Participant" opens `/j/{code}`, Cancel closes it. `useStartMeeting` keeps the server's message and the card shows it, so only Start's 409 opens a dialog; other errors stay toasts.
- **Use host keys to identify the browser that created a meeting.** Everyone is the same demo user, so creating a meeting returns a `secrets.token_urlsafe(32)` key once. Only its SHA-256 hash is stored (`meetings.host_key_hash`), so a copy of the database can't be used to act as host. A plain hash is enough because the key is random, not a password; `secrets.compare_digest` keeps the comparison constant-time.
- **Validate the key after checking the account and before checking the meeting state**: not your meeting → 403, wrong key → 403, then 410 or 409. A wrong-key browser learns nothing from Start that `GET /meetings/{code}` doesn't already show.
- **Use subclasses for creation responses** (`MeetingWithKeyOut`, `JoinWithKeyOut`) that add `host_key`, so it appears in exactly those two responses. Every meeting carries `has_host_key`, which tells the dashboard whether ownership matters.
- **Seed-generated meetings do not have a key** (NULL), so any browser can start, edit or delete them, and the one-host rule still applies. The CHECK on the column is a length check that NULL passes.
- **Keep host-key handling inside `lib/api.ts`**: it saves the key from a create response in `localStorage` (`zc:hostkey:{code}`), adds `X-Host-Key` on Start, Edit and Delete, and forgets the key after a successful Delete. No caller handles the key, so none can forget to send it. localStorage, not sessionStorage, because ownership should survive closing the tab and be shared by the browser's tabs.
- **If the browser does not own the meeting, show Join**: the card's Start becomes Join (the pre-join page) and the "…" menu is hidden. The edit page says "Only the host can edit this meeting." instead of showing a form whose Save would get 403.
- **A fresh local database is required for the schema change.** `create_all` doesn't add columns or indexes to existing tables, and there are no migrations, so the local `zoom_clone.db` must be deleted once. Render starts each deploy with a fresh database.
