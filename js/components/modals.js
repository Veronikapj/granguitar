/* ==========================================================================
   GRAN GUITAR - Modals & Dialog Manager
   ========================================================================== */

import { productsData } from '../data.js';
import { 
    addReview, 
    addQnAPost, 
    addAsRequest, 
    addArticle, 
    deleteReview, 
    deleteQnAPost 
} from '../db.js';

// Local Storage & Cart State
export const cartState = JSON.parse(localStorage.getItem('granguitar_cart') || '[]');

export function saveCart() {
    localStorage.setItem('granguitar_cart', JSON.stringify(cartState));
    updateCartBadge();
}

export function updateCartBadge() {
    const badge = document.getElementById('cart-count');
    if (badge) {
        const totalItems = cartState.reduce((sum, item) => sum + item.qty, 0);
        badge.textContent = totalItems;
    }
}

export function addToCart(productId, qty = 1) {
    const product = productsData.find(p => p.id === productId);
    if (!product) return;

    const existing = cartState.find(item => item.id === productId);
    if (existing) {
        existing.qty += qty;
    } else {
        cartState.push({ ...product, qty });
    }
    saveCart();
    renderCartModal();
    openModal('cart-modal');
}

export function removeFromCart(productId) {
    const idx = cartState.findIndex(item => item.id === productId);
    if (idx > -1) {
        cartState.splice(idx, 1);
        saveCart();
        renderCartModal();
    }
}

export function openModal(modalId) {
    const dialog = document.getElementById(modalId);
    if (!dialog) return;

    if (typeof dialog.showModal === 'function') {
        dialog.showModal();
    } else {
        dialog.setAttribute('open', '');
    }

    // Light-dismiss polyfill fallback for older browsers
    if (!('closedBy' in HTMLDialogElement.prototype)) {
        dialog.addEventListener('click', (e) => {
            if (e.target !== dialog) return;
            const rect = dialog.getBoundingClientRect();
            const isInContent = (
                rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
                rect.left <= e.clientX && e.clientX <= rect.left + rect.width
            );
            if (!isInContent) dialog.close();
        }, { once: true });
    }
}

export function initPopups() {
    // Popup 5 & Popup 9 display check
    const dismiss5 = localStorage.getItem('dismiss_popup_5');
    const dismiss9 = localStorage.getItem('dismiss_popup_9');

    const p5 = document.getElementById('popup-notice-5');
    const p9 = document.getElementById('popup-notice-9');

    if (p5 && !dismiss5) {
        setTimeout(() => openModal('popup-notice-5'), 800);
    }
    if (p9 && !dismiss9) {
        setTimeout(() => openModal('popup-notice-9'), 1200);
    }

    window.dismissPopup = function(popupId) {
        localStorage.setItem(`dismiss_${popupId.replace('-', '_')}`, 'true');
        const d = document.getElementById(popupId);
        if (d) d.close();
    };
}

export function openProductDetailModal(productId) {
    const product = productsData.find(p => p.id === productId);
    if (!product) return;

    const container = document.getElementById('modal-product-body');
    if (!container) return;

    container.innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1.1fr; gap: 2rem; align-items: start; margin-top: 1rem;">
            <div style="background: #150e09; border-radius: 12px; overflow: hidden; border: 1px solid var(--border-gold);">
                <img src="${product.image}" alt="${product.name}" style="width:100%; height: auto; display: block;">
            </div>
            <div>
                <span class="badge-cat" style="position:static; display:inline-block; margin-bottom: 0.5rem;">${product.categoryName} 카테고리</span>
                <h2 style="font-family: var(--font-heading); color: var(--text-primary); font-size: 1.8rem; margin-bottom: 0.5rem;">${product.name}</h2>
                <div style="font-size: 1.5rem; font-weight: 700; color: var(--accent-gold-light); margin-bottom: 1.2rem;">${product.priceFormatted}</div>
                
                <p style="color: var(--text-secondary); font-size: 0.95rem; margin-bottom: 1.5rem; line-height: 1.6;">${product.description}</p>

                <div style="background: rgba(0,0,0,0.3); padding: 1rem; border-radius: 8px; border: 1px solid var(--border-light); margin-bottom: 1.5rem;">
                    <h4 style="font-size: 0.9rem; color: var(--accent-gold); margin-bottom: 0.5rem;">📐 명품 기타 악기 스펙 (Specifications)</h4>
                    <ul style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.8;">
                        <li>• <b>전판 (Top):</b> ${product.topWood}</li>
                        <li>• <b>측후판 (Back & Sides):</b> ${product.backSides}</li>
                        <li>• <b>현장 (Scale Length):</b> ${product.scale}</li>
                        <li>• <b>상현주 폭 (Nut Width):</b> ${product.nutWidth}</li>
                        <li>• <b>도장 마감 (Finish):</b> ${product.finish}</li>
                    </ul>
                </div>

                ${product.audioSample ? `
                <div style="margin-bottom: 1.5rem; background: rgba(212, 175, 55, 0.08); padding: 0.8rem 1rem; border-radius: 8px; border: 1px solid var(--border-gold);">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 0.4rem;">
                        <span style="font-size: 0.85rem; font-weight: 600; color: var(--accent-gold-light);">🎧 수제 음율 시연 샘플</span>
                        <span style="font-size: 0.75rem; color: var(--text-muted);">Master Luthier Recorded</span>
                    </div>
                    <audio controls style="width: 100%; height: 36px;">
                        <source src="${product.audioSample}" type="audio/mp3">
                    </audio>
                </div>
                ` : ''}

                <div style="display:flex; gap: 1rem;">
                    <button class="btn-primary" style="flex:1;" id="btn-modal-add-cart" data-id="${product.id}">🛒 장바구니 담기</button>
                    <button class="btn-secondary" style="padding: 0.8rem 1.2rem; border: 1px solid var(--border-gold); color: var(--text-primary); border-radius: var(--radius-sm);" id="btn-modal-inquire" data-id="${product.id}">📞 시연 예약</button>
                </div>
            </div>
        </div>
    `;

    openModal('product-detail-modal');

    document.getElementById('btn-modal-add-cart')?.addEventListener('click', () => {
        addToCart(product.id, 1);
        document.getElementById('product-detail-modal').close();
    });

    document.getElementById('btn-modal-inquire')?.addEventListener('click', () => {
        alert(`${product.name} 모델의 시연 및 구입 상담 문의가 접수되었습니다. (TEL: 02-3446-9286)`);
        document.getElementById('product-detail-modal').close();
    });
}

export function renderCartModal() {
    const container = document.getElementById('cart-items-container');
    const totalPriceEl = document.getElementById('cart-total-price');
    if (!container) return;

    if (cartState.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
                <div style="font-size: 3rem; margin-bottom: 1rem;">🛒</div>
                <p>장바구니가 비어 있습니다.</p>
                <p style="font-size: 0.85rem; margin-top: 0.5rem;">그랑기타의 프리미엄 기타 및 악세서리를 둘러보세요.</p>
            </div>
        `;
        if (totalPriceEl) totalPriceEl.textContent = '0원';
        return;
    }

    let total = 0;
    let html = '<div style="display: flex; flex-direction: column; gap: 1rem;">';
    cartState.forEach(item => {
        const itemTotal = item.price * item.qty;
        total += itemTotal;
        html += `
            <div style="display: flex; align-items: center; justify-content: space-between; background: rgba(255,255,255,0.03); border: 1px solid var(--border-light); padding: 0.8rem 1rem; border-radius: 8px;">
                <div style="flex: 1;">
                    <h4 style="font-size: 0.95rem; color: var(--text-primary);">${item.name}</h4>
                    <span style="font-size: 0.85rem; color: var(--accent-gold-light);">${item.price.toLocaleString()}원</span>
                </div>
                <div style="display: flex; align-items: center; gap: 0.8rem;">
                    <span style="font-size: 0.85rem; color: var(--text-secondary);">수량: <b>${item.qty}</b></span>
                    <button class="btn-remove-cart" data-id="${item.id}" style="color: #e74c3c; font-size: 0.9rem;">✕ 삭제</button>
                </div>
            </div>
        `;
    });
    html += '</div>';
    container.innerHTML = html;
    if (totalPriceEl) totalPriceEl.textContent = `${total.toLocaleString()}원`;

    container.querySelectorAll('.btn-remove-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            removeFromCart(id);
        });
    });
}

export function initAuthModal() {
    const authContent = document.getElementById('auth-tab-content');
    const tabLogin = document.getElementById('tab-login-btn');
    const tabJoin = document.getElementById('tab-join-btn');

    function renderLogin() {
        if (!authContent) return;
        tabLogin?.classList.add('active');
        tabJoin?.classList.remove('active');
        authContent.innerHTML = `
            <form id="login-form" class="modal-form">
                <div class="form-group">
                    <label>아이디 (E-mail)</label>
                    <input type="text" required placeholder="user@example.com">
                </div>
                <div class="form-group">
                    <label>비밀번호</label>
                    <input type="password" required placeholder="••••••••">
                </div>
                <button type="submit" class="btn-primary full-width">로그인</button>
            </form>
        `;
        document.getElementById('login-form')?.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('로그인되었습니다. 그랑기타 회원으로 환영합니다!');
            document.getElementById('auth-modal').close();
        });
    }

    function renderJoin() {
        if (!authContent) return;
        tabJoin?.classList.add('active');
        tabLogin?.classList.remove('active');
        authContent.innerHTML = `
            <form id="join-form" class="modal-form">
                <div class="form-group">
                    <label>성함 *</label>
                    <input type="text" required placeholder="홍길동">
                </div>
                <div class="form-group">
                    <label>아이디 (E-mail) *</label>
                    <input type="email" required placeholder="user@example.com">
                </div>
                <div class="form-group">
                    <label>비밀번호 *</label>
                    <input type="password" required placeholder="비밀번호 8자리 이상">
                </div>
                <div class="form-group">
                    <label>연락처 *</label>
                    <input type="tel" required placeholder="010-0000-0000">
                </div>
                <button type="submit" class="btn-primary full-width">그랑기타 회원가입 완료</button>
            </form>
        `;
        document.getElementById('join-form')?.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('그랑기타 회원가입이 성공적으로 완료되었습니다!');
            document.getElementById('auth-modal').close();
        });
    }

    tabLogin?.addEventListener('click', renderLogin);
    tabJoin?.addEventListener('click', renderJoin);

    renderLogin();
}

// Board Modals & Form Submission Manager
export function initBoardModals() {
    // 1. Review Form Submission
    const reviewForm = document.getElementById('review-form');
    if (reviewForm) {
        reviewForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const title = document.getElementById('rev-title')?.value.trim();
            const author = document.getElementById('rev-author')?.value.trim();
            const password = document.getElementById('rev-password')?.value.trim();
            const model = document.getElementById('rev-model')?.value.trim();
            const rating = document.getElementById('rev-rating')?.value;
            const content = document.getElementById('rev-content')?.value.trim();

            if (!title || !author || !password || !content) {
                alert('필수 입력 항목을 모두 작성해 주세요.');
                return;
            }

            const res = await addReview({ title, model, rating, author, password, content });
            if (res.success) {
                alert('이용후기가 성공적으로 등록되었습니다!');
                document.getElementById('write-review-modal')?.close();
                reviewForm.reset();
                if (window.app) {
                    window.app.navigate('community_review', false);
                }
            } else {
                alert('등록 중 오류가 발생했습니다. 다시 시도해 주세요.');
            }
        });
    }

    // 2. Q&A Form Submission
    const qnaForm = document.getElementById('qna-form');
    if (qnaForm) {
        qnaForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const title = document.getElementById('qna-title')?.value.trim();
            const category = document.getElementById('qna-category')?.value;
            const author = document.getElementById('qna-author')?.value.trim();
            const password = document.getElementById('qna-password')?.value.trim();
            const isSecret = document.getElementById('qna-secret')?.checked;
            const content = document.getElementById('qna-content')?.value.trim();

            if (!title || !author || !password || !content) {
                alert('필수 입력 항목을 모두 작성해 주세요.');
                return;
            }

            const res = await addQnAPost({ category, title, author, password, isSecret, content });
            if (res.success) {
                alert('1:1 질문이 성공적으로 접수되었습니다. 마스터 루티어가 직접 확인 후 정성껏 답변을 남겨드리겠습니다.');
                document.getElementById('write-qna-modal')?.close();
                qnaForm.reset();
                if (window.app) {
                    window.app.navigate('community_qna', false);
                }
            } else {
                alert('접수 중 오류가 발생했습니다. 다시 시도해 주세요.');
            }
        });
    }

    // 3. A/S Request Form Submission
    const asForm = document.getElementById('as-form');
    if (asForm) {
        asForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById('as-name')?.value.trim();
            const model = document.getElementById('as-model')?.value.trim();
            const type = document.getElementById('as-type')?.value;
            const desc = document.getElementById('as-desc')?.value.trim();

            if (!name) {
                alert('성함 및 연락처를 입력해 주세요.');
                return;
            }

            const res = await addAsRequest({ name, model, type, desc });
            if (res.success) {
                alert(`A/S 수리 및 세팅 신청이 정상 접수되었습니다!\n\n접수번호: ${res.ticketId}\n공방 루티어가 접수 내용을 확인 후 연락드리겠습니다.`);
                document.getElementById('as-request-modal')?.close();
                asForm.reset();
                if (window.app) {
                    window.app.navigate('support_as', false);
                }
            } else {
                alert('접수 중 오류가 발생했습니다. 다시 시도해 주세요.');
            }
        });
    }

    // 4. News / Article Form Submission
    const articleForm = document.getElementById('article-form');
    if (articleForm) {
        articleForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const type = document.getElementById('art-type')?.value;
            const author = document.getElementById('art-author')?.value.trim();
            const title = document.getElementById('art-title')?.value.trim();
            const summary = document.getElementById('art-summary')?.value.trim();
            const content = document.getElementById('art-content')?.value.trim();

            if (!title || !content) {
                alert('제목과 내용을 입력해 주세요.');
                return;
            }

            const res = await addArticle({ type, author, title, summary, content });
            if (res.success) {
                alert('새 소식이 성공적으로 등록되었습니다.');
                document.getElementById('write-article-modal')?.close();
                articleForm.reset();
                if (window.app) {
                    window.app.navigate(`news_${type}`, false);
                }
            } else {
                alert('소식 등록 중 오류가 발생했습니다.');
            }
        });
    }

    // Global Action Helpers
    window.handleDeleteReview = async function(id) {
        const pw = prompt('리뷰 작성 시 설정하신 비밀번호를 입력해 주세요.');
        if (!pw) return;
        const res = await deleteReview(id, pw);
        if (res.success) {
            alert('리뷰가 삭제되었습니다.');
            if (window.app) window.app.navigate('community_review', false);
        } else {
            alert(res.error || '비밀번호가 일치하지 않습니다.');
        }
    };

    window.handleDeleteQnA = async function(id) {
        const pw = prompt('질문 등록 시 설정하신 비밀번호를 입력해 주세요.');
        if (!pw) return;
        const res = await deleteQnAPost(id, pw);
        if (res.success) {
            alert('질문이 삭제되었습니다.');
            if (window.app) window.app.navigate('community_qna', false);
        } else {
            alert(res.error || '비밀번호가 일치하지 않습니다.');
        }
    };

    window.openWriteArticle = function(defaultType = 'news') {
        const select = document.getElementById('art-type');
        if (select) select.value = defaultType;
        const modal = document.getElementById('write-article-modal');
        if (modal) {
            if (typeof modal.showModal === 'function') modal.showModal();
            else modal.setAttribute('open', '');
        }
    };
}

