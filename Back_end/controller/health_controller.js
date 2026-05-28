const health_controller = (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title>Server Health</title>
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }

                body {
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #0f0f1a;
                    font-family: 'Segoe UI', sans-serif;
                    overflow: hidden;
                }

                /* ── Floating particles ── */
                .particles {
                    position: fixed;
                    inset: 0;
                    pointer-events: none;
                    z-index: 0;
                }
                .particle {
                    position: absolute;
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    animation: float linear infinite;
                    opacity: 0;
                }
                @keyframes float {
                    0%   { transform: translateY(100vh) scale(0); opacity: 0; }
                    10%  { opacity: 1; }
                    90%  { opacity: 1; }
                    100% { transform: translateY(-10vh) scale(1.5); opacity: 0; }
                }

                /* ── Card ── */
                .card {
                    position: relative;
                    z-index: 10;
                    background: rgba(255,255,255,0.04);
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 32px;
                    padding: 60px 80px;
                    text-align: center;
                    backdrop-filter: blur(20px);
                    box-shadow: 0 0 80px rgba(99,102,241,0.15);
                    animation: cardIn 0.8s cubic-bezier(0.34,1.56,0.64,1) forwards;
                }
                @keyframes cardIn {
                    from { opacity: 0; transform: scale(0.7) translateY(40px); }
                    to   { opacity: 1; transform: scale(1) translateY(0); }
                }

                /* ── Pulse ring ── */
                .pulse-wrapper {
                    position: relative;
                    width: 100px;
                    height: 100px;
                    margin: 0 auto 30px;
                }
                .pulse-ring {
                    position: absolute;
                    inset: 0;
                    border-radius: 50%;
                    border: 3px solid #10b981;
                    animation: pulse-ring 1.5s ease-out infinite;
                }
                .pulse-ring:nth-child(2) { animation-delay: 0.5s; }
                .pulse-ring:nth-child(3) { animation-delay: 1s;   }
                @keyframes pulse-ring {
                    0%   { transform: scale(1);   opacity: 0.8; }
                    100% { transform: scale(2.5); opacity: 0;   }
                }
                .pulse-dot {
                    position: absolute;
                    inset: 20px;
                    background: linear-gradient(135deg, #10b981, #06b6d4);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 28px;
                    animation: spin-once 1s cubic-bezier(0.34,1.56,0.64,1) forwards;
                }
                @keyframes spin-once {
                    from { transform: rotate(-180deg) scale(0); }
                    to   { transform: rotate(0deg)   scale(1); }
                }

                /* ── Text ── */
                .status {
                    font-size: 13px;
                    font-weight: 700;
                    letter-spacing: 4px;
                    text-transform: uppercase;
                    color: #10b981;
                    margin-bottom: 12px;
                    animation: fadeUp 0.6s 0.4s both;
                }
                .title {
                    font-size: 42px;
                    font-weight: 900;
                    color: #fff;
                    margin-bottom: 10px;
                    animation: fadeUp 0.6s 0.5s both;
                }
                .title span {
                    background: linear-gradient(90deg, #10b981, #06b6d4, #6366f1);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                .subtitle {
                    font-size: 15px;
                    color: rgba(255,255,255,0.4);
                    margin-bottom: 40px;
                    animation: fadeUp 0.6s 0.6s both;
                }

                /* ── Stats row ── */
                .stats {
                    display: flex;
                    gap: 20px;
                    justify-content: center;
                    margin-bottom: 40px;
                    animation: fadeUp 0.6s 0.7s both;
                }
                .stat {
                    background: rgba(255,255,255,0.05);
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 16px;
                    padding: 16px 24px;
                    min-width: 110px;
                }
                .stat-value {
                    font-size: 22px;
                    font-weight: 900;
                    color: #fff;
                }
                .stat-label {
                    font-size: 11px;
                    color: rgba(255,255,255,0.3);
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    margin-top: 4px;
                }

                /* ── Badge ── */
                .badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    background: rgba(16,185,129,0.1);
                    border: 1px solid rgba(16,185,129,0.3);
                    border-radius: 999px;
                    padding: 10px 24px;
                    color: #10b981;
                    font-size: 13px;
                    font-weight: 700;
                    animation: fadeUp 0.6s 0.8s both;
                }
                .badge-dot {
                    width: 8px;
                    height: 8px;
                    background: #10b981;
                    border-radius: 50%;
                    animation: blink 1s ease-in-out infinite;
                }
                @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50%      { opacity: 0.2; }
                }

                /* ── Confetti burst ── */
                .confetti {
                    position: fixed;
                    inset: 0;
                    pointer-events: none;
                    z-index: 5;
                }
                .confetti-piece {
                    position: absolute;
                    width: 10px;
                    height: 10px;
                    top: -10px;
                    animation: confetti-fall linear forwards;
                    border-radius: 2px;
                }
                @keyframes confetti-fall {
                    0%   { transform: translateY(0) rotate(0deg);    opacity: 1; }
                    100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
                }

                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
            </style>
        </head>
        <body>

            <!-- Particles -->
            <div class="particles" id="particles"></div>

            <!-- Confetti -->
            <div class="confetti" id="confetti"></div>

            <!-- Card -->
            <div class="card">
                <div class="pulse-wrapper">
                    <div class="pulse-ring"></div>
                    <div class="pulse-ring"></div>
                    <div class="pulse-ring"></div>
                    <div class="pulse-dot">✦</div>
                </div>

                <div class="status">● All Systems Operational</div>
                <div class="title">Server is <span>Running!</span></div>
                <div class="subtitle">Investment Hub API • http://localhost:5000</div>

                <div class="stats">
                    <div class="stat">
                        <div class="stat-value" id="uptime">0s</div>
                        <div class="stat-label">Uptime</div>
                    </div>
                    <div class="stat">
                        <div class="stat-value">5000</div>
                        <div class="stat-label">Port</div>
                    </div>
                    <div class="stat">
                        <div class="stat-value">200</div>
                        <div class="stat-label">Status</div>
                    </div>
                </div>

                <div class="badge">
                    <div class="badge-dot"></div>
                    Live & Healthy
                </div>
            </div>

            <script>
                // ── Particles ──────────────────────────────────
                const colors = ['#10b981','#06b6d4','#6366f1','#f59e0b','#ec4899'];
                const container = document.getElementById('particles');
                for (let i = 0; i < 40; i++) {
                    const p = document.createElement('div');
                    p.className = 'particle';
                    p.style.cssText = \`
                        left: \${Math.random() * 100}%;
                        background: \${colors[Math.floor(Math.random() * colors.length)]};
                        animation-duration: \${4 + Math.random() * 6}s;
                        animation-delay: \${Math.random() * 5}s;
                        width: \${4 + Math.random() * 6}px;
                        height: \${4 + Math.random() * 6}px;
                    \`;
                    container.appendChild(p);
                }

                // ── Confetti burst ─────────────────────────────
                const confettiEl = document.getElementById('confetti');
                for (let i = 0; i < 80; i++) {
                    const c = document.createElement('div');
                    c.className = 'confetti-piece';
                    c.style.cssText = \`
                        left: \${Math.random() * 100}%;
                        background: \${colors[Math.floor(Math.random() * colors.length)]};
                        animation-duration: \${2 + Math.random() * 3}s;
                        animation-delay: \${Math.random() * 2}s;
                        width: \${6 + Math.random() * 10}px;
                        height: \${6 + Math.random() * 10}px;
                        border-radius: \${Math.random() > 0.5 ? '50%' : '2px'};
                    \`;
                    confettiEl.appendChild(c);
                }

                // ── Uptime counter ─────────────────────────────
                let seconds = 0;
                setInterval(() => {
                    seconds++;
                    const h = Math.floor(seconds / 3600);
                    const m = Math.floor((seconds % 3600) / 60);
                    const s = seconds % 60;
                    document.getElementById('uptime').textContent =
                        h > 0 ? \`\${h}h \${m}m\` : m > 0 ? \`\${m}m \${s}s\` : \`\${s}s\`;
                }, 1000);
            </script>
        </body>
        </html>
    `);
};

module.exports = health_controller;