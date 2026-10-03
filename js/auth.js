/* ==========================================================================
   GRAN GUITAR - Authentication Manager (Google, Email/PW, Secure DB, Find ID/PW)
   ========================================================================== */

import { 
    auth, 
    db,
    isAuthAvailable, 
    isFirestoreAvailable,
    signInWithPopup, 
    GoogleAuthProvider, 
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    updateProfile,
    signOut, 
    onAuthStateChanged,
    doc,
    setDoc,
    getDocs,
    collection,
    where,
    query,
    serverTimestamp,
    getCol,
    currentDbEnv
} from './firebase.js?v=62';

let currentUser = null;

// Load local fallback user cache if offline
try {
    const cached = localStorage.getItem('gg_auth_user');
    if (cached) {
        currentUser = JSON.parse(cached);
    }
} catch (e) {
    currentUser = null;
}

export function getCurrentUser() {
    return currentUser;
}

// 1. Google Social Login
export async function loginWithGoogle() {
    if (!isAuthAvailable || !auth) {
        throw new Error("Firebase Authentication이 초기화되지 않았습니다.");
    }

    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
        prompt: 'select_account'
    });

    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        currentUser = {
            uid: user.uid,
            displayName: user.displayName || user.email?.split('@')[0] || "회원",
            email: user.email,
            photoURL: user.photoURL || ""
        };

        // Also save profile to Firestore users collection
        if (isFirestoreAvailable && db) {
            try {
                await setDoc(doc(db, getCol('users'), user.uid), {
                    uid: user.uid,
                    name: currentUser.displayName,
                    email: user.email,
                    photoURL: currentUser.photoURL,
                    provider: 'google',
                    lastLoginAt: serverTimestamp()
                }, { merge: true });
            } catch (e) {
                console.warn("Firestore google user save:", e);
            }
        }

        localStorage.setItem('gg_auth_user', JSON.stringify(currentUser));
        updateAuthUI(currentUser);
        return { success: true, user: currentUser };
    } catch (err) {
        if (err.code === 'auth/popup-closed-by-user') {
            console.log("Google 로그인 팝업이 닫혔습니다.");
            return { cancelled: true };
        }
        console.error("Google sign-in error:", err);
        throw err;
    }
}

// 2. Email / Password Login (Google Firebase scrypt encrypted)
export async function loginWithEmail(email, password) {
    if (!email || !password) {
        throw new Error("아이디와 비밀번호를 모두 입력해주세요.");
    }

    if (!isAuthAvailable || !auth) {
        // Fallback for offline/demo
        const mockUser = {
            uid: 'demo_' + Date.now(),
            displayName: email.split('@')[0],
            email: email.trim(),
            photoURL: ''
        };
        currentUser = mockUser;
        localStorage.setItem('gg_auth_user', JSON.stringify(currentUser));
        updateAuthUI(currentUser);
        return { success: true, user: currentUser };
    }

    try {
        const res = await signInWithEmailAndPassword(auth, email.trim(), password);
        const u = res.user;
        currentUser = {
            uid: u.uid,
            displayName: u.displayName || u.email?.split('@')[0] || "회원",
            email: u.email,
            photoURL: u.photoURL || ""
        };
        localStorage.setItem('gg_auth_user', JSON.stringify(currentUser));
        updateAuthUI(currentUser);
        return { success: true, user: currentUser };
    } catch (err) {
        console.error("Email login error:", err);
        let msg = "로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.";
        if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
            msg = "아이디(이메일) 또는 비밀번호가 올바르지 않습니다.";
        } else if (err.code === 'auth/invalid-email') {
            msg = "올바른 이메일 형식이 아닙니다.";
        } else if (err.code === 'auth/too-many-requests') {
            msg = "로그인 시도가 너무 많아 일시적으로 차단되었습니다. 잠시 후 다시 시도해주세요.";
        }
        throw new Error(msg);
    }
}

// 3. Email / Password Register with Password Confirmation & Secure Profile in DB
export async function registerWithEmail(email, password, name, phone) {
    if (!email || !password || !name) {
        throw new Error("필수 정보를 모두 입력해주세요.");
    }

    const cleanEmail = email.trim();
    const cleanName = name.trim();
    const cleanPhone = (phone || '').trim();

    if (!isAuthAvailable || !auth) {
        const mockUser = {
            uid: 'local_' + Date.now(),
            displayName: cleanName,
            email: cleanEmail,
            phone: cleanPhone,
            photoURL: ''
        };
        currentUser = mockUser;
        localStorage.setItem('gg_auth_user', JSON.stringify(currentUser));
        try {
            const list = JSON.parse(localStorage.getItem('gg_registered_users') || '[]');
            list.push(mockUser);
            localStorage.setItem('gg_registered_users', JSON.stringify(list));
        } catch(e) {}
        updateAuthUI(currentUser);
        return { success: true, user: currentUser };
    }

    try {
        // 1. Firebase Auth creates account with robust scrypt password hashing
        const res = await createUserWithEmailAndPassword(auth, cleanEmail, password);
        const u = res.user;

        // 2. Update display name in Firebase Auth
        await updateProfile(u, {
            displayName: cleanName
        });

        // 3. Save profile metadata in Firestore DB (Passwords are NEVER stored in Firestore)
        if (isFirestoreAvailable && db) {
            try {
                await setDoc(doc(db, getCol('users'), u.uid), {
                    uid: u.uid,
                    name: cleanName,
                    email: cleanEmail,
                    phone: cleanPhone,
                    createdAt: serverTimestamp()
                });
            } catch (dbErr) {
                console.warn("Firestore user profile save notice:", dbErr);
            }
        }

        // Also save to local registry cache for fast lookup
        try {
            const regKey = currentDbEnv === 'dev' ? 'gg_dev_registered_users' : 'gg_registered_users';
            const list = JSON.parse(localStorage.getItem(regKey) || '[]');
            list.push({ uid: u.uid, name: cleanName, email: cleanEmail, phone: cleanPhone });
            localStorage.setItem(regKey, JSON.stringify(list));
        } catch(e) {}

        currentUser = {
            uid: u.uid,
            displayName: cleanName,
            email: cleanEmail,
            photoURL: u.photoURL || ""
        };
        localStorage.setItem('gg_auth_user', JSON.stringify(currentUser));
        updateAuthUI(currentUser);
        return { success: true, user: currentUser };
    } catch (err) {
        console.error("Register error:", err);
        let msg = "회원가입에 실패했습니다.";
        if (err.code === 'auth/email-already-in-use') {
            msg = "이미 등록된 이메일(아이디)입니다. 로그인하거나 비밀번호 찾기를 이용해주세요.";
        } else if (err.code === 'auth/weak-password') {
            msg = "비밀번호는 최소 6자리 이상이어야 합니다.";
        } else if (err.code === 'auth/invalid-email') {
            msg = "올바른 이메일 주소 형식을 입력해주세요.";
        }
        throw new Error(msg);
    }
}

// 4. Find ID (Email) by Name and Phone
export async function findId(name, phone) {
    const cleanName = (name || '').trim();
    const cleanPhoneDigits = (phone || '').replace(/[^0-9]/g, '');

    if (!cleanName || !cleanPhoneDigits) {
        throw new Error("성함과 연락처를 모두 입력해주세요.");
    }

    // A. Query Firestore 'users' collection
    if (isFirestoreAvailable && db) {
        try {
            const usersRef = collection(db, getCol('users'));
            const q = query(usersRef, where('name', '==', cleanName));
            const snapshot = await getDocs(q);
            const matches = [];
            snapshot.forEach(docSnap => {
                const data = docSnap.data();
                const docPhoneDigits = (data.phone || '').replace(/[^0-9]/g, '');
                if (docPhoneDigits === cleanPhoneDigits) {
                    matches.push(data.email);
                }
            });

            if (matches.length > 0) {
                return { success: true, emails: matches };
            }
        } catch (e) {
            console.warn("Firestore findId notice:", e);
        }
    }

    // B. Local fallback search
    try {
        const regKey = currentDbEnv === 'dev' ? 'gg_dev_registered_users' : 'gg_registered_users';
        const list = JSON.parse(localStorage.getItem(regKey) || '[]');
        const found = list.filter(u => 
            u.name === cleanName && 
            (u.phone || '').replace(/[^0-9]/g, '') === cleanPhoneDigits
        );
        if (found.length > 0) {
            return { success: true, emails: found.map(u => u.email) };
        }
    } catch (e) {}

    return { success: false, message: "입력하신 정보와 일치하는 회원 아이디를 찾을 수 없습니다." };
}

// 5. Password Reset (Official Firebase Password Reset Email)
export async function resetPassword(email) {
    const cleanEmail = (email || '').trim();
    if (!cleanEmail || !cleanEmail.includes('@')) {
        throw new Error("올바른 이메일 주소를 입력해주세요.");
    }

    if (!isAuthAvailable || !auth) {
        return { 
            success: true, 
            message: `가상 모드: [${cleanEmail}] 주소로 비밀번호 재설정 메일이 전송되었습니다.` 
        };
    }

    try {
        await sendPasswordResetEmail(auth, cleanEmail);
        return { 
            success: true, 
            message: `[${cleanEmail}] 메일함으로 비밀번호 재설정 링크를 전송했습니다. 이메일 링크를 클릭하여 새 비밀번호를 설정해주세요.` 
        };
    } catch (err) {
        console.error("Password reset error:", err);
        let msg = "비밀번호 재설정 메일 전송 중 오류가 발생했습니다.";
        if (err.code === 'auth/user-not-found') {
            msg = "가입되어 있지 않은 이메일(아이디)입니다.";
        } else if (err.code === 'auth/invalid-email') {
            msg = "올바른 이메일 형식을 입력해주세요.";
        }
        throw new Error(msg);
    }
}

// 6. Mask Email utility (e.g., gran***@naver.com)
export function maskEmail(email) {
    if (!email || !email.includes('@')) return email;
    const [user, domain] = email.split('@');
    if (user.length <= 2) {
        return user[0] + '*@' + domain;
    }
    const visibleLen = Math.min(3, Math.max(2, Math.floor(user.length / 2)));
    const masked = user.slice(0, visibleLen) + '*'.repeat(user.length - visibleLen);
    return `${masked}@${domain}`;
}

// 7. Logout User
export async function logoutUser() {
    if (isAuthAvailable && auth) {
        try {
            await signOut(auth);
        } catch (e) {
            console.warn("Sign out notice:", e);
        }
    }
    currentUser = null;
    localStorage.removeItem('gg_auth_user');
    updateAuthUI(null);
    return { success: true };
}

// 8. Auth State Initialization
export function initAuth(onStateChangedCallback) {
    updateAuthUI(currentUser);

    if (isAuthAvailable && auth) {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                currentUser = {
                    uid: user.uid,
                    displayName: user.displayName || user.email?.split('@')[0] || "회원",
                    email: user.email,
                    photoURL: user.photoURL || ""
                };
                localStorage.setItem('gg_auth_user', JSON.stringify(currentUser));
            } else {
                currentUser = null;
                localStorage.removeItem('gg_auth_user');
            }

            updateAuthUI(currentUser);
            if (onStateChangedCallback) {
                onStateChangedCallback(currentUser);
            }
        });
    }

    document.addEventListener('click', async (e) => {
        const logoutBtn = e.target.closest('#btn-do-logout, .btn-do-logout');
        if (logoutBtn) {
            e.preventDefault();
            await logoutUser();
            alert('로그아웃되었습니다.');
        }
    });
}

// 9. Update Auth UI in Header & Mobile Nav
export function updateAuthUI(user) {
    const userActionsContainer = document.querySelector('.user-actions');
    const mobileUserInfo = document.querySelector('.mobile-user-info');

    const cartCountEl = document.getElementById('cart-count');
    const count = cartCountEl ? cartCountEl.textContent : '0';

    if (userActionsContainer) {
        if (user) {
            userActionsContainer.innerHTML = `
                <div class="user-logged-badge" title="${user.email || ''}">
                    ${user.photoURL ? `<img src="${user.photoURL}" alt="${user.displayName}" class="user-avatar-circle" onerror="this.style.display='none'">` : '<span class="user-avatar-placeholder">👤</span>'}
                    <span class="user-display-name"><strong>${user.displayName}</strong>님</span>
                </div>
                <button class="btn-text btn-logout" id="btn-do-logout">LOGOUT</button>
                <button class="btn-cart" id="btn-open-cart" aria-label="장바구니">
                    🛒 <span id="cart-count" class="cart-badge">${count}</span>
                </button>
            `;
        } else {
            userActionsContainer.innerHTML = `
                <button class="btn-text highlight" id="btn-open-login">LOGIN</button>
                <button class="btn-cart" id="btn-open-cart" aria-label="장바구니">
                    🛒 <span id="cart-count" class="cart-badge">${count}</span>
                </button>
            `;
        }

        const cartBtn = userActionsContainer.querySelector('#btn-open-cart');
        if (cartBtn) {
            cartBtn.addEventListener('click', () => {
                document.getElementById('cart-modal')?.showModal();
            });
        }

        const loginBtn = userActionsContainer.querySelector('#btn-open-login');
        if (loginBtn) {
            loginBtn.addEventListener('click', () => {
                const modal = document.getElementById('auth-modal');
                if (modal) {
                    modal.showModal();
                    document.getElementById('tab-login-btn')?.click();
                }
            });
        }
    }

    if (mobileUserInfo) {
        if (user) {
            mobileUserInfo.innerHTML = `
                <span class="m-user-icon">${user.photoURL ? `<img src="${user.photoURL}" class="user-avatar-circle mini">` : '👤'}</span>
                <span class="m-user-title"><strong>${user.displayName}</strong>님 환영합니다!</span>
            `;
        } else {
            mobileUserInfo.innerHTML = `
                <span class="m-user-icon">🎸</span>
                <span class="m-user-title"><strong>그랑기타</strong> Navigation</span>
            `;
        }
    }
}
