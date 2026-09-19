/* ==========================================================================
   GRAN GUITAR - Header & Navigation Controller
   ========================================================================== */

import { openModal } from './modals.js';

export function initHeader(onNavigate, onSearch) {
    // Navigation routing listeners
    document.querySelectorAll('[data-route]').forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            const route = el.getAttribute('data-route');
            if (route) {
                onNavigate(route);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });

    // Active tab highlighter
    window.updateActiveNav = function(currentRoute) {
        document.querySelectorAll('.lnb-item').forEach(item => item.classList.remove('active'));

        const currentLink = document.querySelector(`[data-route="${currentRoute}"]`);
        if (currentLink) {
            const parentItem = currentLink.closest('.lnb-item');
            if (parentItem) parentItem.classList.add('active');
        }
    };

    // BGM Audio Controller
    const bgmPlayer = document.getElementById('bgm-player');
    const bgmBtn = document.getElementById('bgm-toggle-btn');
    let isPlaying = false;

    if (bgmBtn && bgmPlayer) {
        bgmBtn.addEventListener('click', () => {
            if (!isPlaying) {
                bgmPlayer.play().then(() => {
                    isPlaying = true;
                    bgmBtn.classList.add('playing');
                    bgmBtn.querySelector('.sound-text').textContent = 'BGM ON';
                }).catch(err => {
                    console.log('Audio autoplay prevented:', err);
                });
            } else {
                bgmPlayer.pause();
                isPlaying = false;
                bgmBtn.classList.remove('playing');
                bgmBtn.querySelector('.sound-text').textContent = 'BGM OFF';
            }
        });
    }

    // Search Form listener
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    if (searchForm && searchInput) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const query = searchInput.value.trim();
            if (query.length < 2) {
                alert('검색어는 두 글자 이상 입력해 주세요.');
                return;
            }
            onSearch(query);
        });
    }

    // Mobile Hamburger Navigation Drawer Toggle
    const mobileNavBtn = document.getElementById('btn-mobile-nav');
    const navMenu = document.getElementById('navigation');

    if (mobileNavBtn && navMenu) {
        mobileNavBtn.addEventListener('click', () => {
            navMenu.classList.toggle('mobile-open');
            mobileNavBtn.textContent = navMenu.classList.contains('mobile-open') ? '✕' : '☰';
        });

        // Close mobile drawer when clicking a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('mobile-open');
                if (mobileNavBtn) mobileNavBtn.textContent = '☰';
            });
        });
    }

    // Auth Buttons
    document.getElementById('btn-open-login')?.addEventListener('click', () => {
        openModal('auth-modal');
    });

    document.getElementById('btn-open-join')?.addEventListener('click', () => {
        openModal('auth-modal');
    });

    document.getElementById('btn-mobile-login-nav')?.addEventListener('click', () => {
        if (navMenu) navMenu.classList.remove('mobile-open');
        if (mobileNavBtn) mobileNavBtn.textContent = '☰';
        openModal('auth-modal');
    });

    document.getElementById('btn-mobile-join-nav')?.addEventListener('click', () => {
        if (navMenu) navMenu.classList.remove('mobile-open');
        if (mobileNavBtn) mobileNavBtn.textContent = '☰';
        openModal('auth-modal');
    });

    document.getElementById('btn-open-cart')?.addEventListener('click', () => {
        openModal('cart-modal');
    });

    document.getElementById('mob-btn-cart')?.addEventListener('click', () => {
        openModal('cart-modal');
    });
}
