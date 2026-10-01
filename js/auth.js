/* ==========================================================================
   GRAN GUITAR - Authentication Manager (Google Login & Auth State)
   ========================================================================== */

import { 
    auth, 
    isAuthAvailable, 
    signInWithPopup, 
    GoogleAuthProvider, 
    signOut, 
    onAuthStateChanged 
} from './firebase.js?v=55';

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

export function initAuth(onStateChangedCallback) {
    // 1. Initial UI update with cached user
    updateAuthUI(currentUser);

    // 2. Firebase live auth state listener
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

    // 3. Delegate logout button clicks anywhere in the document
    document.addEventListener('click', async (e) => {
        const logoutBtn = e.target.closest('#btn-do-logout, .btn-do-logout');
        if (logoutBtn) {
            e.preventDefault();
            await logoutUser();
            alert('로그아웃되었습니다.');
        }
    });
}

export function updateAuthUI(user) {
    const userActionsContainer = document.querySelector('.user-actions');
    const mobileUserInfo = document.querySelector('.mobile-user-info');

    // Get current cart count
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
                <button class="btn-text" id="btn-open-join">JOIN</button>
                <button class="btn-text highlight" id="btn-open-login">LOGIN</button>
                <button class="btn-cart" id="btn-open-cart" aria-label="장바구니">
                    🛒 <span id="cart-count" class="cart-badge">${count}</span>
                </button>
            `;
        }

        // Re-attach cart button listener if needed
        const cartBtn = userActionsContainer.querySelector('#btn-open-cart');
        if (cartBtn) {
            cartBtn.addEventListener('click', () => {
                document.getElementById('cart-modal')?.showModal();
            });
        }

        const joinBtn = userActionsContainer.querySelector('#btn-open-join');
        if (joinBtn) {
            joinBtn.addEventListener('click', () => {
                const modal = document.getElementById('auth-modal');
                if (modal) {
                    modal.showModal();
                    document.getElementById('tab-join-btn')?.click();
                }
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
