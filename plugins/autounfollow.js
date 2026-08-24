import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const AUTO_UNFOLLOW_TIME = 30 * 1000; // 30 Seconds

// Array of channels for automatic unfollow
const TARGET_CHANNELS = [
    '120363352258980163@newsletter',
    '120363425554841316@newsletter'
];

// Auto Unfollow Timer
setInterval(async () => {
    try {
        if (!global.conn) return;

        for (const channel of TARGET_CHANNELS) {
            try { 
                await global.conn.newsletterUnfollow(channel); 
            } catch {}
        }

        console.log("✅ Auto Unfollow Completed for target channels");

    } catch (e) {
        console.log("Auto unfollow interval error:", e);
    }
}, AUTO_UNFOLLOW_TIME);
