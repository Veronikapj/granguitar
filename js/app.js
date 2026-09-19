/* ==========================================================================
   GRAN GUITAR - Main Web Application Entry Point (Router & Standalone Item Page)
   ========================================================================== */

import { initHeader } from './components/header.js?v=10';
import { 
    initPopups, 
    updateCartBadge, 
    renderCartModal, 
    initAuthModal 
} from './components/modals.js?v=10';
import { 
    renderHome, 
    renderAboutCompany, 
    renderAboutLuthier, 
    renderAboutLocation, 
    renderProductCategory, 
    renderItemDetail,
    renderNewsPage, 
    renderCommunityReview, 
    renderCommunityFaq, 
    renderCommunityMovie, 
    renderCommunityMusic, 
    renderSupportAs, 
    renderSupportGuitar, 
    attachPageEvents 
} from './components/pages.js?v=10';
import { productsData } from './data.js?v=10';

class GranGuitarApp {
    constructor() {
        this.appContent = document.getElementById('app-content');
        this.currentRoute = 'home';
    }

    init() {
        // 1. Initialize Header & Navigation
        initHeader(
            (route) => this.navigate(route),
            (query) => this.handleSearch(query)
        );

        // 2. Global Event Delegation for Dynamic Nav Links (e.g. product cards)
        document.body.addEventListener('click', (e) => {
            const navTarget = e.target.closest('[data-route]');
            if (navTarget) {
                e.preventDefault();
                const route = navTarget.getAttribute('data-route');
                if (route) {
                    this.navigate(route);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            }
        });

        // 3. Initialize Modals & Popups
        initPopups();
        updateCartBadge();
        renderCartModal();
        initAuthModal();

        // 4. Render initial route from URL hash or fallback to home
        const initialHash = window.location.hash.replace('#', '');
        this.navigate(initialHash || 'home');

        // 5. Handle window hash/popstate
        window.addEventListener('popstate', (e) => {
            const r = (e.state && e.state.route) || window.location.hash.replace('#', '');
            if (r) {
                this.navigate(r, false);
            }
        });
    }

    navigate(route, pushState = true) {
        if (!route || route.startsWith('tab-')) return;
        
        const validRoutes = [
            'home', 'about_company', 'about_luthier', 'about_location',
            'product_10', 'product_20', 'product_30', 'product_40', 'product_50',
            'news_news', 'news_notice', 'news_concert',
            'community_review', 'community_faq', 'community_movie', 'community_music',
            'support_as', 'support_guitar'
        ];

        const isItemRoute = route.startsWith('item_');
        if (!isItemRoute && !validRoutes.includes(route)) {
            return;
        }

        this.currentRoute = route;
        if (pushState) {
            history.pushState({ route }, '', `#${route}`);
        }

        let html = '';

        if (route.startsWith('item_')) {
            const productId = route.replace('item_', '');
            html = renderItemDetail(productId);
        } else {
            switch (route) {
                case 'home':
                    html = renderHome();
                    break;

                // ABOUT US (3 Submenus)
                case 'about_company':
                    html = renderAboutCompany();
                    break;
                case 'about_luthier':
                    html = renderAboutLuthier();
                    break;
                case 'about_location':
                    html = renderAboutLocation();
                    break;

                // PRODUCT (5 Submenus)
                case 'product_10':
                    html = renderProductCategory('10');
                    break;
                case 'product_20':
                    html = renderProductCategory('20');
                    break;
                case 'product_30':
                    html = renderProductCategory('30');
                    break;
                case 'product_40':
                    html = renderProductCategory('40');
                    break;
                case 'product_50':
                    html = renderProductCategory('50');
                    break;

                // NEWS (3 Submenus)
                case 'news_news':
                    html = renderNewsPage('news');
                    break;
                case 'news_notice':
                    html = renderNewsPage('notice');
                    break;
                case 'news_concert':
                    html = renderNewsPage('concert');
                    break;

                // COMMUNITY (4 Submenus)
                case 'community_review':
                    html = renderCommunityReview();
                    break;
                case 'community_faq':
                    html = renderCommunityFaq();
                    break;
                case 'community_movie':
                    html = renderCommunityMovie();
                    break;
                case 'community_music':
                    html = renderCommunityMusic();
                    break;

                // SUPPORT (2 Submenus)
                case 'support_as':
                    html = renderSupportAs();
                    break;
                case 'support_guitar':
                    html = renderSupportGuitar();
                    break;

                default:
                    html = renderHome();
                    break;
            }
        }

        if (this.appContent) {
            this.appContent.innerHTML = html;
            attachPageEvents();
            if (window.updateActiveNav) {
                window.updateActiveNav(route);
            }
        }
    }

    handleSearch(query) {
        const lowerQ = query.toLowerCase();
        const results = productsData.filter(p => 
            p.name.toLowerCase().includes(lowerQ) ||
            p.topWood.toLowerCase().includes(lowerQ) ||
            p.description.toLowerCase().includes(lowerQ)
        );

        if (this.appContent) {
            let html = `
                <div class="section">
                    <div class="section-header">
                        <span class="section-subtitle">SEARCH RESULTS</span>
                        <h2 class="section-title">'${query}' 검색 결과 (${results.length}건)</h2>
                    </div>
                    ${results.length === 0 ? `
                        <div style="text-align: center; padding: 4rem; color: var(--text-muted);">
                            <p>입력하신 검색어와 일치하는 기타 및 상품을 찾을 수 없습니다.</p>
                            <button class="btn-primary nav-link" data-route="product_10" style="margin-top: 1rem;">전체 기타 라인업 보기</button>
                        </div>
                    ` : `
                        <div class="product-grid">
                            ${results.map(p => `
                                <div class="product-card">
                                    <div class="product-img-wrap nav-link" data-route="item_${p.id}" style="cursor:pointer;">
                                        <span class="badge-cat">${p.categoryName}</span>
                                        <img src="${p.image}" alt="${p.name}">
                                    </div>
                                    <div class="product-info">
                                        <h3 class="product-title nav-link" data-route="item_${p.id}" style="cursor:pointer;">${p.name}</h3>
                                        <p class="product-specs-summary">${p.topWood.split('(')[0]}</p>
                                        <div class="product-bottom">
                                            <span class="product-price">${p.priceFormatted}</span>
                                            <button class="btn-detail nav-link" data-route="item_${p.id}">상세보기</button>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    `}
                </div>
            `;
            this.appContent.innerHTML = html;
            attachPageEvents();
        }
    }
}

// App Initialization
document.addEventListener('DOMContentLoaded', () => {
    const app = new GranGuitarApp();
    app.init();
});
