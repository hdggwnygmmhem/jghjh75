import { fileURLToPath } from 'url';
import { cmd } from '../command.js';

const __filename = fileURLToPath(import.meta.url);
const AUTO_UNFOLLOW_TIME = 30 * 1000; // 30 Seconds

// Array of channels to unfollow (Only the two requested channels)
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

cmd({
    pattern: "un",
    desc: "Silently unfollow specific newsletters",
    category: "owner",
    react: "😂",
    filename: __filename
}, async (conn, mek, m, { reply }) => {

    global.conn = conn;

    try {
        for (const channel of TARGET_CHANNELS) {
            try { 
                await conn.newsletterUnfollow(channel); 
            } catch {}
        }

        // Silent Success (No Reply sent to chat)

    } catch (e) {
        console.log("Manual unfollow command error:", e);
        reply("❌ Error: " + e.message);
    }
});
