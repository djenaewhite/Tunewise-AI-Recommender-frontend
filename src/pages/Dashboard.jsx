import { useState, useEffect, useRef } from "react";

const GOOGLE_FONTS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');
`;

const styles = `
  ${GOOGLE_FONTS}

  * { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #080808;
    --surface: #111111;
    --surface2: #1a1a1a;
    --surface3: #222222;
    --border: rgba(255,255,255,0.07);
    --border2: rgba(255,255,255,0.12);
    --accent: #C8F56B;
    --accent-dim: rgba(200,245,107,0.12);
    --accent-dim2: rgba(200,245,107,0.06);
    --text: #f0f0f0;
    --text-muted: #888;
    --text-faint: #444;
    --red: #ff4d4d;
    --red-dim: rgba(255,77,77,0.12);
  }

  .app {
    min-height: 100vh;
    background: var(--bg);
    color: var(--text);
    font-family: 'DM Sans', sans-serif;
    display: grid;
    grid-template-columns: 360px 1fr;
    grid-template-rows: auto 1fr;
  }

  /* ─── HEADER ─── */
  .header {
    grid-column: 1 / -1;
    padding: 28px 40px 24px;
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .logo-mark {
    width: 36px; height: 36px;
    border-radius: 10px;
    background: var(--accent);
    display: flex; align-items: center; justify-content: center;
  }

  .logo-mark svg { width: 20px; height: 20px; }

  .logo-text {
    font-family: 'Syne', sans-serif;
    font-size: 17px;
    font-weight: 700;
    letter-spacing: -0.3px;
    color: var(--text);
  }

  .logo-sub {
    font-size: 12px;
    color: var(--text-muted);
    letter-spacing: 0.05em;
    text-transform: uppercase;
    font-weight: 300;
  }

  .header-badge {
    display: flex; align-items: center; gap: 6px;
    padding: 6px 14px;
    border-radius: 100px;
    border: 1px solid var(--border2);
    font-size: 12px;
    color: var(--text-muted);
    letter-spacing: 0.04em;
  }

  .header-badge span {
    width: 7px; height: 7px;
    border-radius: 50%;
    background: var(--accent);
    box-shadow: 0 0 8px var(--accent);
    animation: pulse 2s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }

  /* ─── LEFT PANEL ─── */
  .left-panel {
    border-right: 1px solid var(--border);
    padding: 32px 28px;
    display: flex;
    flex-direction: column;
    gap: 32px;
    overflow-y: auto;
  }

  .section-label {
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--text-faint);
    margin-bottom: 12px;
  }

  /* ─── SEARCH ─── */
  .search-wrap {
    position: relative;
  }

  .search-icon {
    position: absolute;
    left: 14px; top: 50%; transform: translateY(-50%);
    color: var(--text-muted);
    pointer-events: none;
    display: flex;
  }

  .search-input {
    width: 100%;
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 12px 16px 12px 42px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    color: var(--text);
    outline: none;
    transition: border-color 0.2s, background 0.2s;
  }

  .search-input:focus {
    border-color: var(--accent);
    background: var(--surface3);
  }

  .search-input::placeholder { color: var(--text-faint); }

  .dropdown {
    position: absolute;
    top: calc(100% + 6px);
    left: 0; right: 0;
    background: var(--surface2);
    border: 1px solid var(--border2);
    border-radius: 14px;
    overflow: hidden;
    z-index: 100;
    box-shadow: 0 20px 60px rgba(0,0,0,0.6);
  }

  .dropdown-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 14px;
    cursor: pointer;
    transition: background 0.15s;
  }

  .dropdown-item:hover { background: var(--surface3); }

  .dropdown-item img {
    width: 38px; height: 38px;
    border-radius: 8px;
    object-fit: cover;
    flex-shrink: 0;
    background: var(--surface3);
  }

  .dropdown-name {
    font-size: 13px;
    font-weight: 500;
    color: var(--text);
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }

  .dropdown-artist {
    font-size: 12px;
    color: var(--text-muted);
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }

  /* ─── QUEUE ─── */
  .queue {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .queue-item {
    display: flex; align-items: center; gap: 12px;
    padding: 10px 12px;
    border-radius: 10px;
    background: var(--surface2);
    border: 1px solid var(--border);
    transition: border-color 0.2s;
    animation: slideIn 0.25s ease;
  }

  @keyframes slideIn {
    from { opacity: 0; transform: translateY(-8px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .queue-item:hover { border-color: var(--border2); }

  .queue-img {
    width: 34px; height: 34px;
    border-radius: 7px;
    object-fit: cover;
    background: var(--surface3);
    flex-shrink: 0;
  }

  .queue-info { flex: 1; min-width: 0; }

  .queue-name {
    font-size: 13px;
    font-weight: 500;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }

  .queue-artist {
    font-size: 11px;
    color: var(--text-muted);
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }

  .queue-remove {
    background: none; border: none; cursor: pointer;
    color: var(--text-faint);
    width: 24px; height: 24px;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    transition: color 0.15s, background 0.15s;
    flex-shrink: 0;
    font-size: 14px;
  }

  .queue-remove:hover { color: var(--red); background: var(--red-dim); }

  .queue-empty {
    padding: 20px 0;
    text-align: center;
    color: var(--text-faint);
    font-size: 13px;
    border: 1px dashed var(--border);
    border-radius: 10px;
  }

  /* SLOTS */
  .slots {
    display: flex; gap: 4px; margin-top: 6px;
  }

  .slot {
    height: 3px; flex: 1; border-radius: 100px;
    background: var(--surface3);
    transition: background 0.3s;
  }

  .slot.filled { background: var(--accent); }

  /* ─── CTA ─── */
  .cta-btn {
    width: 100%;
    padding: 14px;
    border-radius: 12px;
    font-family: 'Syne', sans-serif;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.02em;
    cursor: pointer;
    border: none;
    transition: all 0.2s;
    position: relative;
    overflow: hidden;
  }

  .cta-btn:not(:disabled) {
    background: var(--accent);
    color: #080808;
  }

  .cta-btn:not(:disabled):hover {
    transform: translateY(-1px);
    box-shadow: 0 8px 24px rgba(200,245,107,0.3);
  }

  .cta-btn:not(:disabled):active { transform: translateY(0); }

  .cta-btn:disabled {
    background: var(--surface2);
    color: var(--text-faint);
    cursor: not-allowed;
  }

  .loading-dots { display: inline-flex; gap: 4px; }

  .loading-dots span {
    width: 5px; height: 5px; border-radius: 50%;
    background: currentColor;
    animation: dot 1.2s ease-in-out infinite;
  }

  .loading-dots span:nth-child(2) { animation-delay: 0.2s; }
  .loading-dots span:nth-child(3) { animation-delay: 0.4s; }

  @keyframes dot {
    0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
    40% { transform: scale(1); opacity: 1; }
  }

  .error-msg {
    font-size: 12px;
    color: var(--red);
    padding: 10px 14px;
    background: var(--red-dim);
    border-radius: 8px;
    border: 1px solid rgba(255,77,77,0.2);
  }

  /* ─── RIGHT PANEL ─── */
  .right-panel {
    padding: 32px 40px;
    overflow-y: auto;
  }

  .results-header {
    display: flex; align-items: baseline; gap: 12px;
    margin-bottom: 24px;
  }

  .results-title {
    font-family: 'Syne', sans-serif;
    font-size: 22px;
    font-weight: 700;
    letter-spacing: -0.5px;
  }

  .results-count {
    font-size: 13px;
    color: var(--text-muted);
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 12px;
  }

  .rec-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 14px;
    transition: border-color 0.2s, transform 0.2s;
    animation: fadeUp 0.35s ease both;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .rec-card:nth-child(2) { animation-delay: 0.05s; }
  .rec-card:nth-child(3) { animation-delay: 0.1s; }
  .rec-card:nth-child(4) { animation-delay: 0.15s; }
  .rec-card:nth-child(5) { animation-delay: 0.2s; }
  .rec-card:nth-child(6) { animation-delay: 0.25s; }

  .rec-card:hover {
    border-color: var(--border2);
    transform: translateY(-2px);
  }

  .rec-top {
    display: flex; gap: 12px; align-items: flex-start;
  }

  .rec-img {
    width: 56px; height: 56px;
    border-radius: 10px;
    object-fit: cover;
    background: var(--surface3);
    flex-shrink: 0;
  }

  .rec-info { flex: 1; min-width: 0; padding-top: 2px; }

  .rec-name {
    font-size: 14px;
    font-weight: 500;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    margin-bottom: 3px;
  }

  .rec-artist {
    font-size: 12px;
    color: var(--text-muted);
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    margin-bottom: 2px;
  }

  .rec-album {
    font-size: 11px;
    color: var(--text-faint);
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }

  .rec-actions {
    display: flex; gap: 8px;
  }

  .action-btn {
    flex: 1;
    padding: 8px 12px;
    border-radius: 8px;
    font-size: 12px;
    font-weight: 500;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
    border: 1px solid var(--border);
    background: transparent;
    color: var(--text-muted);
    display: flex; align-items: center; justify-content: center; gap: 5px;
    transition: all 0.15s;
  }

  .action-btn.like:hover {
    background: var(--accent-dim);
    border-color: var(--accent);
    color: var(--accent);
  }

  .action-btn.dislike:hover {
    background: var(--red-dim);
    border-color: var(--red);
    color: var(--red);
  }

  /* ─── EMPTY STATE ─── */
  .empty {
    grid-column: 1 / -1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    padding: 80px 40px;
    text-align: center;
  }

  .empty-icon {
    width: 64px; height: 64px;
    border-radius: 18px;
    background: var(--surface2);
    border: 1px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 4px;
  }

  .empty-title {
    font-family: 'Syne', sans-serif;
    font-size: 18px;
    font-weight: 700;
    color: var(--text);
  }

  .empty-sub {
    font-size: 13px;
    color: var(--text-muted);
    max-width: 280px;
    line-height: 1.6;
  }

  /* ─── RESPONSIVE ─── */
  @media (max-width: 768px) {
    .app {
      grid-template-columns: 1fr;
      grid-template-rows: auto auto 1fr;
    }
    .left-panel { border-right: none; border-bottom: 1px solid var(--border); }
    .header { padding: 20px 20px 16px; }
    .left-panel, .right-panel { padding: 24px 20px; }
  }
`;

const MAX_SONGS = 5;

function LoadingDots() {
  return (
    <div className="loading-dots" aria-label="Loading">
      <span /><span /><span />
    </div>
  );
}

function SearchIcon() {
  return (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
    </svg>
  );
}

function MusicNote() {
  return (
    <svg width="28" height="28" fill="none" stroke="#080808" strokeWidth="2.5" viewBox="0 0 24 24">
      <path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>
    </svg>
  );
}

function WaveIcon() {
  return (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M2 12h2M6 8v8M10 5v14M14 9v6M18 7v10M22 12h-2"/>
    </svg>
  );
}

export default function Dashboard() {
  const [songs, setSongs] = useState([]);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (!search.trim()) { setResults([]); return; }
    const timeout = setTimeout(async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/search?q=${encodeURIComponent(search)}`
        );
        const data = await res.json();
        setResults(data || []);
      } catch (err) { console.error(err); }
    }, 200);
    return () => clearTimeout(timeout);
  }, [search]);

  const addSong = (song) => {
    if (!song) return;
    if (songs.length >= MAX_SONGS) { setError(`Maximum ${MAX_SONGS} songs`); return; }
    if (!songs.find((s) => s.name === song.name && s.artist === song.artist)) {
      setSongs([...songs, song]);
      setError("");
    }
    setSearch(""); setResults([]);
  };

  const removeSong = (name, artist) => {
    setSongs(songs.filter((s) => !(s.name === name && s.artist === artist)));
    if (error) setError("");
  };

  const recommend = async () => {
    if (songs.length === 0) return;
    setLoading(true); setError("");
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/recommend`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ songs: songs.map((s) => `${s.name} ${s.artist}`) }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setRecommendations(data.recommendations || []);
    } catch (err) { setError(err.message || "Something went wrong"); }
    setLoading(false);
  };

  const sendFeedback = async (track, liked) => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: track.name, artist: track.artist, liked }),
      });
      if (!liked) setRecommendations(recommendations.filter((r) => r.name !== track.name));
    } catch (err) { console.error("Feedback error:", err); }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="app">

        {/* HEADER */}
        <header className="header">
          <div className="logo">
            <div className="logo-mark"><MusicNote /></div>
            <div>
              <div className="logo-text">Tunewise</div>
              <div className="logo-sub">AI Recommender</div>
            </div>
          </div>
          <div className="header-badge">
            <span />
            ML model active
          </div>
        </header>

        {/* LEFT PANEL */}
        <aside className="left-panel">

          {/* SEARCH */}
          <div>
            <div className="section-label">Add seeds</div>
            <div className="search-wrap">
              <span className="search-icon"><SearchIcon /></span>
              <input
                ref={inputRef}
                className="search-input"
                value={search}
                placeholder="Search songs or artists…"
                onChange={(e) => setSearch(e.target.value)}
              />
              {results.length > 0 && (
                <div className="dropdown">
                  {results.map((song, i) => (
                    <div key={i} className="dropdown-item" onClick={() => addSong(song)}>
                      <img
                        src={song.image || "https://via.placeholder.com/64"}
                        alt={song.name}
                      />
                      <div style={{ minWidth: 0 }}>
                        <div className="dropdown-name">{song.name}</div>
                        <div className="dropdown-artist">{song.artist}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* QUEUE */}
          <div>
            <div className="section-label" style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Your seeds</span>
              <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>
                {songs.length}/{MAX_SONGS}
              </span>
            </div>

            {/* SLOT INDICATORS */}
            <div className="slots" style={{ marginBottom: 10 }}>
              {Array.from({ length: MAX_SONGS }).map((_, i) => (
                <div key={i} className={`slot ${i < songs.length ? "filled" : ""}`} />
              ))}
            </div>

            <div className="queue">
              {songs.length === 0 ? (
                <div className="queue-empty">
                  Search for songs to get started
                </div>
              ) : (
                songs.map((s) => (
                  <div key={`${s.name}-${s.artist}`} className="queue-item">
                    <img
                      className="queue-img"
                      src={s.image || "https://via.placeholder.com/64"}
                      alt={s.name}
                    />
                    <div className="queue-info">
                      <div className="queue-name">{s.name}</div>
                      <div className="queue-artist">{s.artist}</div>
                    </div>
                    <button
                      className="queue-remove"
                      onClick={() => removeSong(s.name, s.artist)}
                      aria-label="Remove"
                    >
                      ✕
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* ERROR */}
          {error && <div className="error-msg">{error}</div>}

          {/* CTA */}
          <button
            className="cta-btn"
            onClick={recommend}
            disabled={songs.length === 0 || loading}
          >
            {loading ? (
              <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                <LoadingDots />
                <span>Analysing…</span>
              </span>
            ) : "Generate Recommendations →"}
          </button>

        </aside>

        {/* RIGHT PANEL */}
        <main className="right-panel">
          <div className="results-header">
            <div className="results-title">
              {recommendations.length > 0 ? "Your recommendations" : "Discover"}
            </div>
            {recommendations.length > 0 && (
              <div className="results-count">{recommendations.length} tracks</div>
            )}
          </div>

          <div className="grid">
            {recommendations.length === 0 ? (
              <div className="empty">
                <div className="empty-icon">
                  <WaveIcon />
                </div>
                <div className="empty-title">No recommendations yet</div>
                <div className="empty-sub">
                  Add up to {MAX_SONGS} songs you love and let the model find what to listen to next.
                </div>
              </div>
            ) : (
              recommendations.map((r, i) => (
                <div key={i} className="rec-card">
                  <div className="rec-top">
                    <img
                      className="rec-img"
                      src={r.image || "https://via.placeholder.com/64"}
                      alt={r.name}
                    />
                    <div className="rec-info">
                      <div className="rec-name">{r.name}</div>
                      <div className="rec-artist">{r.artist}</div>
                      <div className="rec-album">{r.album}</div>
                    </div>
                  </div>

                  <div className="rec-actions">
                    <button
                      className="action-btn like"
                      onClick={() => sendFeedback(r, true)}
                    >
                      ♥ Like
                    </button>
                    <button
                      className="action-btn dislike"
                      onClick={() => sendFeedback(r, false)}
                    >
                      ✕ Not for me
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </main>

      </div>
    </>
  );
}