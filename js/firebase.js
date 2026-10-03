/* ==========================================================================
   GRAN GUITAR - Firebase & Cloud Firestore Client SDK
   ========================================================================== */

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js';
import { 
    getFirestore, 
    collection, 
    addDoc, 
    getDocs, 
    deleteDoc, 
    doc, 
    setDoc,
    getDoc,
    where,
    updateDoc, 
    query, 
    orderBy, 
    limit, 
    serverTimestamp,
    onSnapshot 
} from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js';

import { 
    getAuth, 
    signInWithPopup, 
    GoogleAuthProvider, 
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    updateProfile,
    signOut, 
    onAuthStateChanged 
} from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js';

export const firebaseConfig = {
    projectId: "granguitar-web-app",
    appId: "1:153904868122:web:7b0d743750c7a4735d1aa3",
    storageBucket: "granguitar-web-app.firebasestorage.app",
    apiKey: "AIzaSyD0rfdiWmUFKqBb6yYGykbsLLrghwQeVXY",
    authDomain: "granguitar-web-app.firebaseapp.com",
    messagingSenderId: "153904868122"
};

let app = null;
let db = null;
let auth = null;
let isFirestoreAvailable = false;
let isAuthAvailable = false;

// --------------------------------------------------------------------------
// Database Environment Management (DEV vs PROD)
// 1) URL Query Parameter: ?env=dev or ?env=prod
// 2) localStorage: 'gg_db_env'
// 3) Default: 'localhost' / '127.0.0.1' -> 'dev', Otherwise -> 'prod'
// --------------------------------------------------------------------------
function detectDbEnv() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const queryEnv = urlParams.get('env')?.toLowerCase();
        if (queryEnv === 'dev' || queryEnv === 'prod') {
            localStorage.setItem('gg_db_env', queryEnv);
            return queryEnv;
        }

        const storedEnv = localStorage.getItem('gg_db_env')?.toLowerCase();
        if (storedEnv === 'dev' || storedEnv === 'prod') {
            return storedEnv;
        }

        const host = window.location.hostname;
        if (host === 'localhost' || host === '127.0.0.1' || host === '0.0.0.0' || host === '') {
            return 'dev';
        }
    } catch (e) {
        console.warn("detectDbEnv notice:", e);
    }
    return 'prod';
}

export const currentDbEnv = detectDbEnv();

export function getCol(baseName) {
    return currentDbEnv === 'dev' ? `dev_${baseName}` : baseName;
}

export function setDbEnv(newEnv) {
    if (newEnv === 'auto') {
        localStorage.removeItem('gg_db_env');
        const url = new URL(window.location.href);
        url.searchParams.delete('env');
        window.location.href = url.toString();
        return;
    }
    if (newEnv === 'dev' || newEnv === 'prod') {
        localStorage.setItem('gg_db_env', newEnv);
        const url = new URL(window.location.href);
        url.searchParams.set('env', newEnv);
        window.location.href = url.toString();
    } else {
        console.warn("Invalid env. Use 'dev', 'prod', or 'auto'.");
    }
}

// Global console utilities
window.setDbEnv = setDbEnv;
window.getDbEnv = () => currentDbEnv;

// Floating Environment Badge for visual identification
function initDbEnvBadge() {
    if (typeof document === 'undefined') return;
    const isDev = currentDbEnv === 'dev';
    const urlParams = new URLSearchParams(window.location.search);
    const showAlways = urlParams.has('debug') || isDev;

    if (!showAlways) return;

    function attachBadge() {
        if (!document.body || document.getElementById('db-env-badge')) return;
        const badge = document.createElement('div');
        badge.id = 'db-env-badge';
        badge.style.cssText = `
            position: fixed;
            bottom: 16px;
            left: 16px;
            z-index: 99999;
            background: ${isDev ? 'rgba(230, 81, 0, 0.92)' : 'rgba(46, 125, 50, 0.92)'};
            color: #fff;
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 11px;
            font-weight: 600;
            letter-spacing: 0.5px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.35);
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 6px;
            border: 1px solid rgba(255,255,255,0.3);
            backdrop-filter: blur(4px);
            transition: transform 0.2s, opacity 0.2s;
            user-select: none;
        `;
        badge.title = `현재 [${isDev ? 'DEV 개발용 DB' : 'PROD 운영용 DB'}] 연결 상태입니다. 클릭 시 전환할 수 있습니다.`;
        badge.innerHTML = `
            <span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:#fff;"></span>
            <span>${isDev ? '🛠️ DEV DB' : '🌐 PROD DB'}</span>
            <span style="opacity:0.75; font-size:9px;">(전환클릭)</span>
        `;
        badge.addEventListener('mouseenter', () => { badge.style.transform = 'scale(1.05)'; });
        badge.addEventListener('mouseleave', () => { badge.style.transform = 'scale(1)'; });
        badge.addEventListener('click', () => {
            const next = isDev ? 'prod' : 'dev';
            const nextName = isDev ? '운영(PROD) DB' : '개발(DEV) DB';
            if (confirm(`현재 [${isDev ? 'DEV 개발용' : 'PROD 운영용'}] DB에 연결되어 있습니다.\n\n${nextName}로 전환하시겠습니까?`)) {
                setDbEnv(next);
            }
        });
        document.body.appendChild(badge);
    }

    if (document.readyState === 'loading') {
        window.addEventListener('DOMContentLoaded', attachBadge);
    } else {
        attachBadge();
    }
}
initDbEnvBadge();

try {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    isFirestoreAvailable = true;
    auth = getAuth(app);
    isAuthAvailable = true;
    console.log(`[GranGuitar DB] 🟢 Mode: ${currentDbEnv.toUpperCase()} (Collection prefix: ${currentDbEnv === 'dev' ? 'dev_' : 'none'})`);
} catch (err) {
    console.warn("⚠️ Firebase initialization error:", err);
}

export { 
    app, 
    db, 
    auth,
    isFirestoreAvailable,
    isAuthAvailable,
    collection, 
    addDoc, 
    getDocs, 
    deleteDoc, 
    doc, 
    setDoc,
    getDoc,
    where,
    updateDoc, 
    query, 
    orderBy, 
    limit, 
    serverTimestamp,
    onSnapshot,
    signInWithPopup,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    updateProfile,
    signOut, 
    onAuthStateChanged
};
