# Zoom Clone — Video Conferencing Platform

A full-stack video conferencing application inspired by Zoom's dashboard and meeting-room experience. The project combines a **Next.js frontend**, **FastAPI backend**, **SQLite persistence**, **WebSockets**, and **WebRTC peer-to-peer media** to support meeting scheduling, live calls, chat, reactions, screen sharing, and host moderation.

## Features

### Dashboard and Meeting Management
- Zoom-inspired dashboard with quick actions for starting and joining meetings.
- Create instant meetings with unique 11-digit meeting codes.
- Generate shareable invitation links.
- Join a meeting using its meeting code or invitation link, with a display-name pre-join flow.
- Schedule meetings with a title, description, date, time, duration, time zone, and meeting preferences.
- View upcoming meetings and recent meeting activity.
- Edit or cancel scheduled meetings.
- Seeded demo data is created automatically when the database is empty.

### Live Meeting Room
- Real-time participant presence and meeting state updates over WebSockets.
- Peer-to-peer audio and video using browser media APIs and WebRTC.
- Camera and microphone controls, including device selection where supported by the browser.
- Speaker and Gallery views.
- Active-speaker indication, participant pinning, and screen-sharing display.
- Share your screen with other connected participants.
- In-meeting chat with unread-message indication.
- Emoji reactions and raised-hand support.
- Participant panel with host indicators and participant status.
- Leave a meeting or end the meeting for everyone, depending on the user's role.

### Host Controls
- Mute an individual participant or request that they unmute.
- Mute all participants, including participants who join later while the setting is active.
- Configure whether participants can unmute themselves or turn on their cameras.
- Ask a participant to start their video or stop a participant's video.
- Remove participants from the meeting.
- Host actions are validated by the backend and restricted to the host of the active meeting.

### Persistence and Validation
- SQLite database managed with SQLAlchemy.
- Meeting, meeting-session, participant, user, and chat-message models.
- Pydantic request/response validation.
- Server-side meeting-code validation and meeting lifecycle rules.
- Host keys protect host-only operations for meetings created in a browser.
- Automated backend tests using pytest.

## Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | Next.js 16, React 19, TypeScript |
| Styling and UI | Tailwind CSS 4, Lucide React, Radix UI |
| Backend | Python 3.11, FastAPI, Uvicorn |
| Validation and configuration | Pydantic v2, pydantic-settings |
| Database and ORM | SQLite, SQLAlchemy |
| Real-time communication | WebSockets |
| Audio/video | WebRTC, `getUserMedia`, `getDisplayMedia`, STUN/TURN ICE servers |
| Testing | pytest, HTTPX |

## Architecture

```text
┌──────────────────────────────┐
│     Next.js Frontend         │
│       localhost:3000         │
│                              │
│ Dashboard • Schedule • Join  │
│ Meeting Room • Chat • Host   │
└──────────────┬───────────────┘
               │ REST API
               │ WebSocket signalling/presence
               ▼
┌──────────────────────────────┐
│       FastAPI Backend        │
│       localhost:8000         │
│                              │
│ Routers • Services • Models  │
│ WebSocket • Host Controls    │
└──────────────┬───────────────┘
               │ SQLAlchemy
               ▼
┌──────────────────────────────┐
│          SQLite              │
│        zoom_clone.db         │
└──────────────────────────────┘

       WebRTC peer-to-peer media
     between participants' browsers
```

The backend handles meeting creation and lifecycle, participant admission, persistence, host permissions, WebSocket signalling, and chat storage. Audio/video media is exchanged peer-to-peer between browsers rather than being forwarded through a media server.

## Project Structure

```text
zoom-clone/
├── backend/
│   ├── app/
│   │   ├── models/       # SQLAlchemy models
│   │   ├── realtime/     # WebSocket messages, relays, reactions and host actions
│   │   ├── routers/      # REST API routes
│   │   ├── schemas/      # Pydantic schemas
│   │   ├── services/     # Meeting, dashboard, lifecycle and ICE logic
│   │   ├── utils/
│   │   ├── config.py
│   │   ├── db.py
│   │   ├── main.py
│   │   └── seed.py
│   ├── tests/            # Backend automated tests
│   ├── requirements.txt
│   └── .env.example
└── frontend/
    ├── src/
    │   ├── app/          # Dashboard and page routes
    │   ├── components/   # Dashboard, meeting room, join and schedule UI
    │   ├── hooks/        # Media, WebSocket, peer connection and meeting hooks
    │   ├── lib/          # API client, WebRTC and meeting utilities
    │   └── types/
    ├── package.json
    └── .env.example
```

## Prerequisites

- **Node.js** compatible with the installed Next.js version (Node.js 20.9 or later is recommended).
- npm.
- **Python 3.11**.
- A modern browser with camera/microphone support for live calls.

Camera, microphone, and screen-sharing access generally require `localhost` or a secure HTTPS origin. Participants on different networks may also need a working TURN relay.

## Local Setup

Run the backend and frontend in separate terminals.

### 1. Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd <YOUR_REPOSITORY_DIRECTORY>
```

### 2. Configure and run the backend

```bash
cd backend

# Create and activate a virtual environment (Windows)
python -m venv .venv
.venv\Scripts\activate

# macOS/Linux activation:
# source .venv/bin/activate

python -m pip install -r requirements.txt
```

Create `backend/.env` from `backend/.env.example` and adjust the values if needed:

```env
DATABASE_URL=sqlite:///./zoom_clone.db
FRONTEND_BASE_URL=http://localhost:3000
CORS_ORIGINS=http://localhost:3000
TURN_HOST=staticauth.openrelay.metered.ca
TURN_SECRET=openrelayprojectsecret
```

Start the API from the `backend` directory:

```bash
python -m uvicorn app.main:app --reload --port 8000
```

At startup, the application creates the database tables, closes stale sessions left by a previous process, and inserts demo data if the database is empty.

- API base URL: `http://localhost:8000/api`
- Interactive API documentation: `http://localhost:8000/docs`
- Health check: `http://localhost:8000/api/health`

### 3. Configure and run the frontend

Open a second terminal from the repository root:

```bash
cd frontend
npm install
```

Create `frontend/.env.local` from `frontend/.env.example`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_WS_URL=ws://localhost:8000
```

Start the development server:

```bash
npm run dev
```

Open **http://localhost:3000** in your browser.

## Environment Variables

### Backend

| Variable | Default | Description |
|---|---|---|
| `DATABASE_URL` | `sqlite:///./zoom_clone.db` | SQLAlchemy database connection URL. |
| `FRONTEND_BASE_URL` | `http://localhost:3000` | Base URL used to build meeting invitation links. |
| `CORS_ORIGINS` | `http://localhost:3000` | Comma-separated frontend origins allowed by CORS. |
| `TURN_HOST` | `staticauth.openrelay.metered.ca` | TURN relay hostname used to generate ICE server configuration. |
| `TURN_SECRET` | `openrelayprojectsecret` | Secret used by the backend to generate time-limited TURN credentials. |

### Frontend

| Variable | Default | Description |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | `http://localhost:8000` | Base URL for the FastAPI HTTP API. |
| `NEXT_PUBLIC_WS_URL` | `ws://localhost:8000` | Base URL for the WebSocket connection. |
| `NEXT_PUBLIC_TURN_URL` | Optional | Optional client-side TURN URL override. |
| `NEXT_PUBLIC_TURN_USERNAME` | Optional | Optional TURN username override. |
| `NEXT_PUBLIC_TURN_CREDENTIAL` | Optional | Optional TURN credential override. |

For deployment, set the frontend variables to the deployed backend's HTTPS/WSS origins as appropriate, and set `CORS_ORIGINS` and `FRONTEND_BASE_URL` to the deployed frontend origin. Do not commit real environment files or private credentials.

## API Overview

The REST API is mounted under `/api`.

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/api/health` | Health check. |
| `GET` | `/api/me` | Retrieve the demo user's profile. |
| `GET` | `/api/meetings/upcoming` | List upcoming and in-progress meetings. |
| `GET` | `/api/meetings/recent` | List recent meeting activity. |
| `POST` | `/api/meetings/instant` | Create an instant meeting. |
| `POST` | `/api/meetings` | Schedule a meeting. |
| `GET` | `/api/meetings/{code}` | Retrieve meeting details and status. |
| `PUT` | `/api/meetings/{code}` | Edit a scheduled meeting. |
| `DELETE` | `/api/meetings/{code}` | Cancel a meeting. |
| `POST` | `/api/meetings/{code}/start` | Start or resume hosting a meeting. |
| `POST` | `/api/meetings/{code}/join` | Join a meeting as a participant. |
| `GET` | `/api/ice-servers` | Retrieve ICE server configuration for WebRTC. |
| `WS` | `/ws/meetings/{code}` | Real-time room presence, signalling, media state, chat, reactions and host actions. |

For request and response schemas, use the interactive documentation at `http://localhost:8000/docs`.

## Database

By default, SQLite stores data in `backend/zoom_clone.db` when the backend is launched from the `backend` directory.

The main models are:

- **User** — demo user details and avatar colour.
- **Meeting** — meeting code, title, description, schedule, duration, time zone, preferences and host information.
- **MeetingSession** — an individual live or completed session for a meeting.
- **Participant** — participant identity, role, join token, status and media-related state.
- **ChatMessage** — persisted messages sent in a meeting.

The application seeds demo users, upcoming meetings, and recent meeting sessions when it starts with an empty database. Seed data is not inserted again when users already exist.

## Running Tests

From the backend directory, install the dependencies and run:

```bash
python -m pytest
```

The test suite covers areas including meeting creation and scheduling, joining, dashboard data, WebSocket behaviour, chat, reactions, host controls, permissions, ICE configuration, and seed data.

## Demo Behaviour and Limitations

- **Authentication:** This is a demo without a full sign-in system. The backend uses a seeded default user for dashboard and host identity; guests can join with a display name.
- **Host ownership:** Meetings created by a browser receive a host key. The browser stores it locally and sends it for host-only operations. Seeded demo meetings do not have a host key.
- **Peer-to-peer media:** Audio/video is exchanged directly between participant browsers. The backend handles signalling and state but is not a media server; connectivity can vary by network and firewall.
- **TURN configuration:** The default TURN settings are configurable and intended as a demo default. A reliable deployment should configure and test a suitable TURN provider.
- **Persistence on free hosting:** SQLite is local-file persistence. Some hosting platforms use ephemeral filesystems or recreate instances, so data may not survive restarts or redeployments unless persistent storage is configured.
- **No full Zoom service parity:** This is an educational/demo clone, not an official Zoom product. Features such as cloud recording, automated meeting summaries, and other non-core pages may be placeholders rather than implemented services.

## Verification Checklist

- [ ] Dashboard loads and displays upcoming and recent meetings.
- [ ] Create an instant meeting and copy its invitation link.
- [ ] Schedule a meeting and verify it appears in Upcoming Meetings.
- [ ] Edit or cancel a scheduled meeting.
- [ ] Join from a meeting code or invitation link with a display name.
- [ ] Allow camera and microphone access and verify peer media in a second browser/device.
- [ ] Test Speaker and Gallery views, device selection, and screen sharing.
- [ ] Send chat messages, reactions, and raised-hand events.
- [ ] Test host mute, permission requests, video controls, participant removal, and ending the meeting.
- [ ] Run the backend test suite with `python -m pytest`.

## License

No license is specified in the repository. Add a `LICENSE` file if you intend to distribute the project under a particular open-source license.
