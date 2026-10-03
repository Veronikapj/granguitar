/* ==========================================================================
   GRAN GUITAR - Page Renderer (Original Assets & Full Detail Gallery Images)
   ========================================================================== */

import { productsData, newsArticles, mediaVideos, sheetMusicList, faqList, reviewsList, guitarKnowledgeList } from '../data.js?v=62';
import { addToCart, openModal } from './modals.js?v=62';
import { getReviews, getQnAPosts, getAsRequests, getArticles } from '../db.js?v=62';
import { getCurrentUser, getUserProfile, updateUserProfile, resetPassword } from '../auth.js?v=62';

export function renderHome() {
    return `
        <!-- Hero Carousel (Original Site Banners 100% 1:1) -->
        <section class="hero-carousel" id="hero-slider">
            <div class="hero-slide active" style="background-image: url('images/local_assets/banner_1.jpg');">
                <img src="images/local_assets/banner_1_2.jpg" alt="그랑기타 대표 메인 배너 1" class="hero-banner-img">
            </div>
            <div class="hero-slide" style="background-image: url('images/local_assets/banner_2.jpg');">
                <img src="images/local_assets/banner_2_2.jpg" alt="그랑기타 대표 메인 배너 2" class="hero-banner-img">
            </div>
            <div class="hero-slide" style="background-image: url('images/local_assets/banner_3.jpg');">
                <img src="images/local_assets/banner_3_2.jpg" alt="그랑기타 대표 메인 배너 3" class="hero-banner-img">
            </div>

            <!-- Slide Navigation Controls -->
            <button class="hero-nav-btn hero-prev-btn" id="hero-prev" aria-label="이전 배너">◀</button>
            <button class="hero-nav-btn hero-next-btn" id="hero-next" aria-label="다음 배너">▶</button>

            <!-- Indicators -->
            <div class="hero-dots">
                <span class="hero-dot active" data-slide="0"></span>
                <span class="hero-dot" data-slide="1"></span>
                <span class="hero-dot" data-slide="2"></span>
            </div>
        </section>

        <!-- Main Section 1: Original Main Banners & YouTube Video -->
        <section class="section">
            <div class="section-header">
                <span class="section-subtitle">GRAN GUITAR SHOWCASE</span>
                <h2 class="section-title">그랑기타 브랜드 파트너십 & 연주 시연</h2>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
                <a href="http://gran.mv-web.co.kr/shop" target="_blank" rel="noopener" style="display:block; height:320px; border-radius: var(--radius-md); overflow:hidden; border:1px solid var(--border-gold); box-shadow: 0 4px 15px rgba(0,0,0,0.04); transition: transform 0.3s ease;">
                    <img src="images/local_assets/mainBanner_1.jpg" alt="그랑기타 수제 쇼핑몰" style="width:100%; height:100%; object-fit:cover; object-position:center; display:block;">
                </a>
                <div style="height:320px; border-radius: var(--radius-md); overflow:hidden; border:1px solid var(--border-gold); box-shadow: 0 4px 15px rgba(0,0,0,0.04);">
                    <img src="images/local_assets/mainBanner_2.jpg" alt="그랑기타 제작 공방 스튜디오" style="width:100%; height:100%; object-fit:cover; object-position:center; display:block;">
                </div>
            </div>

            <div class="video-feature-box">
                <div class="video-frame-container">
                    <iframe src="https://www.youtube.com/embed/4dTEE070KKo" title="그랑기타 연주 시연" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                <div style="display: flex; flex-direction: column; gap: 1rem; height: 100%;">
                    <div style="border-radius: var(--radius-md); overflow:hidden; border:1px solid var(--border-gold); flex:1; min-height: 140px;">
                        <img src="images/local_assets/mainBanner_4.jpg" alt="그랑기타 제작 철학" style="width:100%; height:100%; object-fit:cover; object-position:center; display:block;">
                    </div>
                    <div style="border-radius: var(--radius-md); overflow:hidden; border:1px solid var(--border-gold); flex:1; min-height: 140px;">
                        <img src="images/local_assets/mainBanner_5.jpg" alt="그랑기타 시연 현장" style="width:100%; height:100%; object-fit:cover; object-position:center; display:block;">
                    </div>
                </div>
            </div>
        </section>

        <!-- Main Section 2: Recommended Products Grid -->
        <section class="section">
            <div class="section-header">
                <span class="section-subtitle">FEATURED INSTRUMENTS</span>
                <h2 class="section-title">그랑기타 대표 추천 라인업</h2>
            </div>
            <div class="product-grid">
                ${productsData.filter(p => p.isPopular).map(p => `
                    <div class="product-card">
                        <div class="product-img-wrap nav-link" data-route="item_${p.id}" style="cursor:pointer;">
                            <span class="badge-cat">${p.categoryName}</span>
                            <img src="${p.image}" alt="${p.name}">
                        </div>
                        <div class="product-info">
                            <h3 class="product-title nav-link" data-route="item_${p.id}" style="cursor:pointer;">${p.name}</h3>
                            <p class="product-specs-summary">${p.subtitle || p.topWood}</p>
                            <div class="product-bottom">
                                <span class="product-price">${p.priceFormatted}</span>
                                <button class="btn-detail nav-link" data-route="item_${p.id}">상세보기</button>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </section>

        <!-- Main Section 3: Partners Section (Original Site Partner Images 1:1) -->
        <section class="section">
            <div class="section-header">
                <span class="section-subtitle">PARTNERS & COMMUNITY</span>
                <h2 class="section-title">그랑기타 파트너</h2>
            </div>
            <div class="partners-grid">
                <a href="http://cafe.naver.com/fallinguitar" target="_blank" rel="noopener" class="partner-card" style="padding:0; overflow:hidden; border: 1px solid var(--border-gold);">
                    <img src="images/local_assets/mainBanner_6.jpg" alt="폴링기타 네이버 카페" style="width:100%; height:auto; display:block;">
                </a>
                <a href="http://www.facebook.com/GranGuitarEnsemble" target="_blank" rel="noopener" class="partner-card" style="padding:0; overflow:hidden; border: 1px solid var(--border-gold);">
                    <img src="images/local_assets/mainBanner_7.jpg" alt="그랑기타 앙상블 페이스북" style="width:100%; height:auto; display:block;">
                </a>
                <a href="http://www.gopherwood.co.kr/" target="_blank" rel="noopener" class="partner-card" style="padding:0; overflow:hidden; border: 1px solid var(--border-gold);">
                    <img src="images/local_assets/mainBanner_8.jpg" alt="고퍼우드 음향 파트너" style="width:100%; height:auto; display:block;">
                </a>
            </div>
        </section>
    `;
}

// 1. ABOUT US Submenu Views
// 1. ABOUT US Submenu Views
export function renderAboutCompany() {
    return `
        <div class="section">
            <div class="section-header">
                <span class="section-subtitle">ABOUT US</span>
                <h2 class="section-title">회사소개</h2>
            </div>
            <div style="background: var(--bg-surface); border: 1px solid var(--border-gold); padding: 2rem; border-radius: var(--radius-lg); text-align: center;">
                <div style="display: flex; flex-direction: column; gap: 1.5rem; align-items: center;">
                    <img src="images/local_assets/about_con01.jpg" alt="그랑기타 회사소개 1" style="max-width: 100%; height: auto; border-radius: var(--radius-md); border: 1px solid var(--border-light);">
                    <img src="images/local_assets/about_con02.jpg" alt="그랑기타 회사소개 2" style="max-width: 100%; height: auto; border-radius: var(--radius-md); border: 1px solid var(--border-light);">
                    <img src="images/local_assets/about_con03.jpg" alt="그랑기타 회사소개 3" style="max-width: 100%; height: auto; border-radius: var(--radius-md); border: 1px solid var(--border-light);">
                </div>
            </div>
        </div>
    `;
}

export function renderAboutLuthier() {
    return `
        <div class="section">
            <div class="section-header">
                <span class="section-subtitle">MASTER LUTHIER</span>
                <h2 class="section-title">제작자 소개</h2>
            </div>
            <div style="background: var(--bg-surface); border: 1px solid var(--border-gold); padding: 2rem; border-radius: var(--radius-lg); text-align: center;">
                <div style="display: flex; flex-direction: column; gap: 1.5rem; align-items: center;">
                    <img src="images/local_assets/luthier_con01.jpg" alt="제작자 소개 1" style="max-width: 100%; height: auto; border-radius: var(--radius-md); border: 1px solid var(--border-light);">
                    <img src="images/local_assets/luthier_con02.gif" alt="제작자 소개 2" style="max-width: 100%; height: auto; border-radius: var(--radius-md); border: 1px solid var(--border-light);">
                    <img src="images/local_assets/luthier_con03.jpg" alt="제작자 소개 3" style="max-width: 100%; height: auto; border-radius: var(--radius-md); border: 1px solid var(--border-light);">
                    <img src="images/local_assets/luthier_con04.jpg" alt="제작자 소개 4" style="max-width: 100%; height: auto; border-radius: var(--radius-md); border: 1px solid var(--border-light);">
                </div>
            </div>
        </div>
    `;
}

export function renderAboutLocation() {
    return `
        <div class="section">
            <div class="section-header">
                <span class="section-subtitle">LOCATION & SHOWROOM</span>
                <h2 class="section-title">오시는 길</h2>
            </div>
            <div style="background: var(--bg-surface); border: 1px solid var(--border-gold); border-radius: var(--radius-lg); padding: 2rem; text-align: center;">
                <div style="display: flex; flex-direction: column; gap: 1.5rem; align-items: center;">
                    <img src="images/local_assets/location_con01.gif" alt="오시는길 약도" style="max-width: 100%; height: auto; border-radius: var(--radius-md); border: 1px solid var(--border-light);">
                    <img src="images/local_assets/location_con02.gif" alt="오시는길 상세안내" style="max-width: 100%; height: auto; border-radius: var(--radius-md); border: 1px solid var(--border-light);">
                </div>
                <div style="margin-top: 2rem; background: rgba(0,0,0,0.4); padding: 1.5rem; border-radius: var(--radius-md); border: 1px solid var(--border-light); text-align: left; font-size: 0.95rem; color: var(--text-secondary); line-height: 1.8;">
                    <p style="color: var(--accent-gold); font-weight: 700; margin-bottom: 0.5rem;">📍 그랑기타 주소 및 대표 연락처</p>
                    <p>• 주소: 서울특별시 송파구 오금로46길 25 일정빌딩 2층 202호</p>
                    <p>• 대표: 황의선</p>
                    <p>• 전화: 02-3446-9286 (010-6214-4971)</p>
                    <p>• 이메일: granguitar@naver.com</p>
                </div>
            </div>
        </div>
    `;
}

// 2. PRODUCT Submenu Views
export function renderProductCategory(catId) {
    const categoryNames = {
        "10": "ETUDE (교육용)",
        "20": "SENIOR (중급용)",
        "30": "CONCERT (연주용)",
        "40": "MASTER (전문가용)",
        "50": "ACCESSORY (악세서리)"
    };

    const filtered = productsData.filter(p => p.category === catId);

    return `
        <div class="section">
            <div class="section-header">
                <span class="section-subtitle">GRAN GUITAR SHOP</span>
                <h2 class="section-title">${categoryNames[catId] || '제품 라인업'}</h2>
            </div>
            ${filtered.length === 0 ? `
                <div style="text-align: center; padding: 4rem; color: var(--text-muted);">
                    <p>해당 카테고리의 상품이 준비 중입니다.</p>
                </div>
            ` : `
                <div class="product-grid">
                    ${filtered.map(p => `
                        <div class="product-card">
                            <div class="product-img-wrap nav-link" data-route="item_${p.id}" style="cursor:pointer;">
                                <span class="badge-cat">${p.categoryName}</span>
                                <img src="${p.image}" alt="${p.name}">
                            </div>
                            <div class="product-info">
                                <h3 class="product-title nav-link" data-route="item_${p.id}" style="cursor:pointer;">${p.name}</h3>
                                <p class="product-specs-summary">${p.subtitle || p.topWood}</p>
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
}

// 2-B. Standalone Product Detail Page (item.php 1:1 Page Layout & All Detail Images)
export function renderItemDetail(productId) {
    const product = productsData.find(p => p.id === productId) || productsData[0];
    const galleryImages = (product.images && product.images.length > 0) ? product.images : [product.image];
    const relatedProducts = productsData.filter(p => p.category === product.category && p.id !== product.id);

    return `
        <div class="section">
            <!-- Breadcrumb Path (Original Site 1:1) -->
            <div style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.4rem;">
                <a href="#" data-route="home" class="nav-link" style="color: var(--accent-gold);">HOME</a> &gt; 
                <a href="#" data-route="product_${product.category}" class="nav-link" style="color: var(--accent-gold);">PRODUCT</a> &gt; 
                <span style="color: var(--text-primary); font-weight: 600;">${product.categoryName}</span> &gt;
                <span style="color: var(--accent-gold-light);">${product.name}</span>
            </div>

            <!-- Standalone Detail Top Container (item.php 1:1) -->
            <div class="item-detail-top-grid">
                <!-- Product Gallery Images & Thumbnails -->
                <div class="item-gallery-col">
                    <div class="item-main-img-box">
                        <img id="main-item-image" src="${galleryImages[0]}" alt="${product.name}">
                    </div>
                    
                    <!-- Original Multiple Thumbnails Gallery -->
                    <div class="item-gallery-thumb-container">
                        ${galleryImages.map((imgUrl, idx) => `
                            <div class="item-thumb-btn ${idx === 0 ? 'active' : ''}" data-img-src="${imgUrl}">
                                <img src="${imgUrl}" alt="thumb ${idx + 1}">
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Product Info & Purchasing Form -->
                <div class="item-info-col">
                    <span class="badge-cat" style="position:static; display:inline-block; margin-bottom: 0.8rem;">${product.categoryName}</span>
                    <h1 class="item-title">${product.name}</h1>
                    ${product.description ? `<p class="item-subtitle">${product.description}</p>` : ''}
                    
                    <!-- Info Table -->
                    <div class="item-info-table-container">
                        <table class="item-info-table">
                            <tr>
                                <th>판매가격</th>
                                <td class="item-price-val">${product.priceFormatted}</td>
                            </tr>
                            <tr>
                                <th>배송비결제</th>
                                <td>주문시 결제</td>
                            </tr>
                            <tr>
                                <th>상품상태</th>
                                <td>신상품</td>
                            </tr>
                            <tr>
                                <th>배송방법</th>
                                <td>택배</td>
                            </tr>
                            <tr>
                                <th>선택옵션</th>
                                <td>
                                    <div class="item-options-box">
                                        <div class="item-option-row">
                                            <label>현장:</label>
                                            <select class="item-option-select">
                                                <option>650mm</option>
                                                <option>640mm</option>
                                                <option>630mm</option>
                                            </select>
                                        </div>
                                        <div class="item-option-row">
                                            <label>전면자재:</label>
                                            <select class="item-option-select">
                                                <option>시더 (Cedar)</option>
                                                <option>스프루스 (Spruce)</option>
                                            </select>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>

                    ${product.audioSample ? `
                    <div class="item-audio-preview-box">
                        <div class="item-audio-header">
                            <span class="item-audio-title">🎧 시연 샘플 (Audio Preview)</span>
                            <span class="item-audio-track">Romance</span>
                        </div>
                        <audio controls style="width:100%; height: 38px;">
                            <source src="${product.audioSample}" type="audio/mp4">
                        </audio>
                    </div>
                    ` : ''}

                    <!-- Purchase & Cart Action Buttons -->
                    <div class="item-action-buttons">
                        <button class="btn-primary" id="btn-buy-now" data-id="${product.id}">🛒 바로구매</button>
                        <button class="btn-hero" id="btn-add-to-cart-page" data-id="${product.id}">장바구니 담기</button>
                    </div>
                </div>
            </div>

            <!-- Detail Tabs (상품정보 / 사용후기 / 상품문의 / 배송정보 / 교환정보) -->
            <div class="item-tab-bar-container">
                <button type="button" class="item-tab-btn active" data-target="tab-info">상품정보</button>
                <button type="button" class="item-tab-btn" data-target="tab-review">사용후기 (${reviewsList.length})</button>
                <button type="button" class="item-tab-btn" data-target="tab-qa">상품문의 (3)</button>
                <button type="button" class="item-tab-btn" data-target="tab-delivery">배송정보</button>
                <button type="button" class="item-tab-btn" data-target="tab-exchange">교환정보</button>
            </div>

            <!-- Tab Content 1: Product Specifications & Original Detail Images -->
            <div id="tab-info" class="item-tab-section item-tab-content-box">
                <h3 class="item-section-heading">상품 상세 정보 (Product Details)</h3>
                
                ${product.youtubeEmbed ? `
                <div class="video-feature-box" style="margin-bottom: 2rem;">
                    <div class="video-frame-container">
                        <iframe src="${product.youtubeEmbed}" title="시연 영상" frameborder="0" allowfullscreen></iframe>
                    </div>
                </div>
                ` : ''}

                <!-- Original Product Detail Body Editor Image -->
                ${product.detailBodyImage ? `
                <div class="item-detail-body-img-box">
                    <img src="${product.detailBodyImage}" alt="${product.name} 상세 설명 이미지">
                </div>
                ` : ''}

                <!-- Product All Detail Angles Showcase (전체 상세 컷 갤러리) -->
                ${galleryImages && galleryImages.length > 0 ? `
                <div style="margin: 2.5rem 0;">
                    <h4 style="font-family: var(--font-heading); color: var(--accent-gold); font-size: 1.3rem; margin-bottom: 1.2rem; text-align: center;">📷 ${product.name} 각도별 상세 이미지 (Full Detail Photos)</h4>
                    <div class="item-full-detail-grid">
                        ${galleryImages.map((img, i) => `
                            <div class="item-full-detail-card">
                                <img src="${img}" alt="${product.name} detail ${i+1}">
                                <span class="item-full-detail-label">[상세 컷 0${i+1}] ${i===0 ? '전면' : i===1 ? '후면' : i===2 ? '헤드스톡' : '로제트 인레이'}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                ` : ''}

                <!-- Original Product Spec Map & Structure Images -->
                <div class="item-spec-maps-box">
                    <h4 style="font-family: var(--font-heading); color: var(--accent-gold); font-size: 1.4rem; margin-bottom: 1.5rem;">그랑기타 정밀 스펙 구조도 (Master Craft Spec & Construction)</h4>
                    <div style="display: flex; flex-direction: column; gap: 1.5rem; align-items: center;">
                        <img src="images/local_assets/spec_con01.gif" alt="그랑기타 전체스펙 1">
                        <img src="images/local_assets/spec_con02.gif" alt="그랑기타 전체스펙 2">
                        <img src="images/local_assets/spec_con03.gif" alt="그랑기타 전체스펙 3">
                    </div>
                </div>

                <div style="background: rgba(0,0,0,0.4); padding: 1.8rem; border-radius: var(--radius-md); border: 1px solid var(--border-light); margin-top: 2rem;">
                    <table style="width:100%; border-collapse: collapse; color: var(--text-secondary); line-height: 2;">
                        <tr style="border-bottom: 1px solid var(--border-light);">
                            <th style="width: 160px; text-align: left; padding: 0.6rem; color: var(--accent-gold);">전판 (Top Wood)</th>
                            <td style="padding: 0.6rem;">${product.topWood}</td>
                        </tr>
                        <tr style="border-bottom: 1px solid var(--border-light);">
                            <th style="text-align: left; padding: 0.6rem; color: var(--accent-gold);">측후판 (Back & Sides)</th>
                            <td style="padding: 0.6rem;">${product.backSides}</td>
                        </tr>
                        <tr style="border-bottom: 1px solid var(--border-light);">
                            <th style="text-align: left; padding: 0.6rem; color: var(--accent-gold);">현장 (Scale Length)</th>
                            <td style="padding: 0.6rem;">${product.scale}</td>
                        </tr>
                        <tr style="border-bottom: 1px solid var(--border-light);">
                            <th style="text-align: left; padding: 0.6rem; color: var(--accent-gold);">상현주 폭 (Nut Width)</th>
                            <td style="padding: 0.6rem;">${product.nutWidth}</td>
                        </tr>
                        <tr>
                            <th style="text-align: left; padding: 0.6rem; color: var(--accent-gold);">도장 마감 (Finish)</th>
                            <td style="padding: 0.6rem;">${product.finish}</td>
                        </tr>
                    </table>
                </div>
            </div>

            <!-- Tab Content 2: Delivery & Return Policy -->
            <div id="tab-delivery" class="item-tab-section" style="background: var(--bg-surface); border: 1px solid var(--border-gold); border-radius: var(--radius-lg); padding: 2.5rem; margin-bottom: 3rem;">
                <h3 style="color: var(--accent-gold-light); font-size: 1.4rem; margin-bottom: 1rem;">📦 배송 및 교환/반품 안내</h3>
                <ul style="color: var(--text-secondary); line-height: 1.9; font-size: 0.95rem; padding-left: 1.2rem;">
                    <li><b>배송 방법:</b> 안전 우체국/로젠 택배 (기타 전용 하드박스 2중 완충 포장)</li>
                    <li><b>배송 지역:</b> 전국 전 지역 (도서 산간 지역 포함)</li>
                    <li><b>배송 기일:</b> 결제 완료 후 1~3일 이내 안전 발송 (토/일/공휴일 제외)</li>
                    <li><b>교환/반품:</b> 상품 수령 후 7일 이내 소비자 보호 규정에 따라 교환 및 반품이 가능합니다. (단, 고객 과실로 인한 제품 훼손 시 제외)</li>
                </ul>
            </div>

            <!-- Related Products (Original Site 1:1) -->
            ${relatedProducts.length > 0 ? `
            <div style="margin-top: 3rem;">
                <div class="section-header" style="margin-bottom: 1.5rem; text-align: left;">
                    <h3 style="font-family: var(--font-heading); color: var(--accent-gold-light); font-size: 1.5rem;">관련 상품 (Related Instruments)</h3>
                </div>
                <div class="product-grid">
                    ${relatedProducts.map(rel => `
                        <div class="product-card">
                            <div class="product-img-wrap nav-link" data-route="item_${rel.id}" style="cursor:pointer;">
                                <span class="badge-cat">${rel.categoryName}</span>
                                <img src="${rel.image}" alt="${rel.name}">
                            </div>
                            <div class="product-info">
                                <h3 class="product-title nav-link" data-route="item_${rel.id}" style="cursor:pointer;">${rel.name}</h3>
                                <p class="product-specs-summary">${rel.topWood.split('(')[0]}</p>
                                <div class="product-bottom">
                                    <span class="product-price">${rel.priceFormatted}</span>
                                    <button class="btn-detail nav-link" data-route="item_${rel.id}">상세보기</button>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            ` : ''}
        </div>
    `;
}

// 3. NEWS Submenu Views
export async function renderNewsPage(type) {
    const titles = {
        news: "뉴스 (News)",
        notice: "공지사항 (Notice)",
        concert: "연주회 소식 (Concerts)"
    };

    const list = await getArticles(type);

    return `
        <div class="board-container">
            <!-- Breadcrumbs -->
            <div class="board-breadcrumb">
                <a href="#" data-route="home">홈</a> &gt; <span>NEWS &amp; NOTICE</span> &gt; <strong>${titles[type] || '소식 및 공지'}</strong>
            </div>

            <!-- Main Tabs -->
            <div class="board-main-tabs">
                <a href="#news_news" data-route="news_news" class="board-tab-link ${type === 'news' ? 'active' : ''}">📰 뉴스 (News)</a>
                <a href="#news_notice" data-route="news_notice" class="board-tab-link ${type === 'notice' ? 'active' : ''}">📢 공지사항 (Notice)</a>
                <a href="#news_concert" data-route="news_concert" class="board-tab-link ${type === 'concert' ? 'active' : ''}">🎻 연주회 소식 (Concerts)</a>
            </div>

            <div class="board-action-bar">
                <div class="board-stat-info">등록된 게시물 <strong>${list.length}</strong>건</div>
                <button class="btn-board-primary" onclick="window.openWriteArticle('${type}')">📢 새 소식 등록</button>
            </div>

            <div class="board-table-wrap">
                <table class="board-table">
                    <thead>
                        <tr>
                            <th style="width: 70px;">번호</th>
                            <th style="width: 110px;">구분</th>
                            <th>제목</th>
                            <th style="width: 120px;">작성자</th>
                            <th style="width: 110px;">작성일</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${list.length === 0 ? `
                            <tr>
                                <td colspan="5" style="padding: 3rem 1rem; color: var(--text-muted);">
                                    등록된 게시물이 없습니다.
                                </td>
                            </tr>
                        ` : list.map((article, idx) => `
                            <tr>
                                <td>${idx === 0 ? '<span class="badge-notice">공지</span>' : (list.length - idx)}</td>
                                <td><span class="badge-category-mini">${(article.type || type).toUpperCase()}</span></td>
                                <td class="subject">
                                    <details style="cursor: pointer;">
                                        <summary style="outline: none; list-style: none; font-weight: 600; color: #1e1711;">
                                            ${article.title} <span style="font-size:0.75rem; color:#888; font-weight:normal; margin-left:0.4rem;">[내용보기 ▼]</span>
                                        </summary>
                                        <div style="margin-top: 0.8rem; padding: 1.2rem; background: #faf8f5; border-radius: 8px; font-weight: 400; color: #382a20; line-height: 1.8; white-space: pre-line; border: 1px solid #eee7dc; text-align: left;">
                                            ${article.content || article.summary}
                                        </div>
                                    </details>
                                </td>
                                <td>${article.author || '그랑기타'}</td>
                                <td style="color: #8c7a6b; font-size: 0.85rem;">${article.date || '최신'}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

// 4. COMMUNITY Submenu Views
export async function renderCommunityReview() {
    const reviews = await getReviews();

    return `
        <div class="board-container">
            <!-- Breadcrumbs -->
            <div class="board-breadcrumb">
                <a href="#" data-route="home">홈</a> &gt; <span>커뮤니티</span> &gt; <strong>체험단 및 이용후기</strong>
            </div>

            <!-- Main Tabs -->
            <div class="board-main-tabs">
                <a href="#community_review" data-route="community_review" class="board-tab-link active">⭐ 체험단 및 연주자 리뷰</a>
                <a href="#community_qna" data-route="community_qna" class="board-tab-link">💬 1:1 질문과 답변</a>
                <a href="#community_faq" data-route="community_faq" class="board-tab-link">❓ 자주하시는 질문</a>
            </div>

            <div class="board-action-bar">
                <div class="board-stat-info">전체 리뷰 <strong>${reviews.length}</strong>건 (평균 평점: ★ 4.9)</div>
                <button class="btn-board-primary" onclick="document.getElementById('write-review-modal').showModal()">✍️ 이용후기 작성하기</button>
            </div>

            <div class="board-gallery-wrap">
                ${reviews.length === 0 ? `
                    <div style="text-align:center; padding:3rem; color:var(--text-muted); background:#ffffff; border-radius:10px; border:1px solid rgba(184, 134, 11, 0.2);">
                        등록된 리뷰가 없습니다. 첫 연주 후기를 남겨보세요!
                    </div>
                ` : reviews.map(r => `
                    <div class="board-gallery-item">
                        <div class="gallery-thumb-box">
                            <img src="${r.imageUrl || 'images/luthier_workshop.jpg'}" alt="그랑기타 리뷰 사진" onerror="this.src='images/luthier_workshop.jpg'">
                        </div>
                        <div class="gallery-details-box">
                            <div>
                                <div class="gallery-item-header">
                                    <div style="display:flex; align-items:center;">
                                        <span class="gallery-star-rating">${'★'.repeat(r.rating || 5)}${'☆'.repeat(5 - (r.rating || 5))}</span>
                                        <span class="gallery-model-pill">${r.model || '그랑기타 수제기타'}</span>
                                    </div>
                                    <span style="font-size:0.82rem; color:#8c7a6b;">${r.date || '최근'}</span>
                                </div>
                                <h3 class="gallery-item-title">${r.title}</h3>
                                <p class="gallery-item-text">${r.content}</p>
                            </div>
                            <div class="gallery-item-footer">
                                <span>작성자: <strong>${r.author}</strong></span>
                                <button class="btn-del-action" onclick="window.handleDeleteReview('${r.id}')">삭제</button>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

export async function renderCommunityQnA() {
    const qnaList = await getQnAPosts();

    return `
        <div class="board-container">
            <!-- Breadcrumbs -->
            <div class="board-breadcrumb">
                <a href="#" data-route="home">홈</a> &gt; <span>커뮤니티</span> &gt; <strong>1:1 질문과 답변</strong>
            </div>

            <!-- Main Tabs -->
            <div class="board-main-tabs">
                <a href="#community_faq" data-route="community_faq" class="board-tab-link">❓ 자주하시는 질문 (FAQ)</a>
                <a href="#community_qna" data-route="community_qna" class="board-tab-link active">💬 1:1 질문과 답변 (Q&A)</a>
                <a href="#community_review" data-route="community_review" class="board-tab-link">⭐ 체험단/후기</a>
            </div>

            <div class="board-action-bar">
                <div class="board-stat-info">전체 질문 <strong>${qnaList.length}</strong>건 (마스터 루티어가 직접 답변을 등록합니다)</div>
                <button class="btn-board-primary" onclick="document.getElementById('write-qna-modal').showModal()">💬 1:1 질문 작성하기</button>
            </div>

            <div class="qna-list-wrap">
                ${qnaList.length === 0 ? `
                    <div style="text-align:center; padding:3rem; color:var(--text-muted); background:#ffffff; border-radius:10px; border:1px solid rgba(184, 134, 11, 0.2);">
                        등록된 문의글이 없습니다. 첫 질문을 남겨보세요!
                    </div>
                ` : qnaList.map(item => `
                    <details class="qna-item">
                        <summary class="qna-summary">
                            <div class="qna-meta-left">
                                <span class="qna-status ${item.status === '답변완료' ? 'done' : 'wait'}">${item.status || '답변대기'}</span>
                                <span class="qna-cat-pill">${item.category || '일반문의'}</span>
                                <span class="qna-title-text">
                                    ${item.isSecret ? '🔒 ' : ''}${item.title}
                                </span>
                            </div>
                            <div class="qna-meta-right">
                                <span>${item.author}</span>
                                <span>${item.date}</span>
                                <span style="font-size:0.75rem; color:#888;">▼</span>
                            </div>
                        </summary>
                        <div class="qna-body-panel">
                            <div class="qna-question-box">
                                <strong>[질문 내용]</strong><br>
                                ${item.content}
                            </div>
                            <div class="qna-answer-box">
                                <div class="qna-answer-header">
                                    <span>👑</span> 그랑기타 마스터 루티어 답변
                                </div>
                                <div class="qna-answer-content">
                                    ${item.answer ? item.answer : '<span class="qna-no-answer">현재 담당 루티어가 질문을 검토하고 있습니다. 신속하게 답변을 등록해 드리겠습니다.</span>'}
                                </div>
                            </div>
                            <div style="margin-top:0.8rem; text-align:right;">
                                <button class="btn-post-del" onclick="window.handleDeleteQnA('${item.id}')">질문 삭제</button>
                            </div>
                        </div>
                    </details>
                `).join('')}
            </div>
        </div>
    `;
}

export function renderCommunityFaq() {
    // Expose tab filter globally if not already defined
    if (typeof window !== 'undefined' && !window.filterFaqTab) {
        window.filterFaqTab = function(category, btn) {
            document.querySelectorAll('.faq-tab-btn').forEach(b => b.classList.remove('active'));
            if (btn) btn.classList.add('active');
            
            const items = document.querySelectorAll('.faq-item');
            items.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        };
    }

    const categories = [
        { id: 'all', label: '전체', count: faqList.length },
        { id: '배송관련', label: '배송관련', count: faqList.filter(f => f.category === '배송관련').length },
        { id: '기타관리', label: '기타관리', count: faqList.filter(f => f.category === '기타관리').length },
        { id: '악기상식', label: '악기상식', count: faqList.filter(f => f.category === '악기상식').length },
        { id: '교환/환불', label: '교환/환불', count: faqList.filter(f => f.category === '교환/환불').length }
    ];

    return `
        <div class="board-container">
            <!-- Breadcrumbs -->
            <div class="board-breadcrumb">
                <a href="#" data-route="home">홈</a> &gt; <span>커뮤니티</span> &gt; <strong>자주하시는 질문 (FAQ)</strong>
            </div>

            <!-- Main Tabs -->
            <div class="board-main-tabs">
                <a href="#community_faq" data-route="community_faq" class="board-tab-link active">❓ 자주하시는 질문 (FAQ)</a>
                <a href="#community_qna" data-route="community_qna" class="board-tab-link">💬 1:1 질문과 답변 (Q&A)</a>
                <a href="#community_review" data-route="community_review" class="board-tab-link">⭐ 체험단/후기</a>
            </div>

            <div class="faq-wrap">
                <!-- Category Tabs -->
                <div class="faq-tab-list">
                    ${categories.map((c, i) => `
                        <button class="faq-tab-btn ${i === 0 ? 'active' : ''}" onclick="window.filterFaqTab('${c.id}', this)">
                            ${c.label} <span class="faq-tab-count">${c.count}</span>
                        </button>
                    `).join('')}
                </div>

                <!-- FAQ Accordion List -->
                <div class="faq-list">
                    ${faqList.map((item, index) => `
                        <details class="faq-item" data-category="${item.category || '기타관리'}" ${index === 0 ? 'open' : ''}>
                            <summary class="faq-summary">
                                <div class="faq-header-content">
                                    <span class="faq-category-tag">${item.category || '기타관리'}</span>
                                    <span class="faq-q-title"><span class="q-mark">Q.</span> ${item.q}</span>
                                </div>
                                <span class="faq-arrow">▼</span>
                            </summary>
                            <div class="faq-answer-wrap">
                                <div class="faq-a-badge">A</div>
                                <div class="faq-answer-body">
                                    ${item.a}
                                </div>
                            </div>
                        </details>
                    `).join('')}
                </div>

                <!-- Contact & Help Card -->
                <div class="faq-contact-card">
                    <h3>찾으시는 질문이 없으신가요?</h3>
                    <p>기타 셋업, 주문 제작, 수리 관련 궁금하신 사항은 언제든 편하게 문의해 주십시오.<br>마스터 루티어가 직접 친절하고 상세하게 안내해 드리겠습니다.</p>
                    <div class="faq-contact-buttons">
                        <a href="tel:02-3446-9286" class="btn-faq-phone">📞 02-3446-9286 (공방)</a>
                        <a href="tel:010-6214-4971" class="btn-faq-phone" style="background:#5a3825;">📱 010-6214-4971 (루티어)</a>
                        <button class="btn-faq-inquiry nav-link" data-route="about_location">📍 공방 위치 안내</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

export function renderCommunityMovie() {
    return `
        <div class="section">
            <div class="section-header">
                <span class="section-subtitle">PERFORMANCE VIDEOS</span>
                <h2 class="section-title">연주 동영상</h2>
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 2rem;">
                ${mediaVideos.map(v => `
                    <div style="background: var(--bg-surface); border: 1px solid var(--border-gold); border-radius: var(--radius-md); overflow: hidden;">
                        <div class="video-frame-container">
                            <iframe src="https://www.youtube.com/embed/${v.embedId}" title="${v.title}" frameborder="0" allowfullscreen></iframe>
                        </div>
                        <div style="padding: 1.2rem;">
                            <h4 style="color: var(--text-primary); font-size: 1.05rem; margin-bottom: 0.4rem;">${v.title}</h4>
                            <p style="font-size: 0.85rem; color: var(--accent-gold); margin-bottom: 0.5rem;">${v.player}</p>
                            <p style="font-size: 0.85rem; color: var(--text-muted);">${v.desc}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

export function renderCommunityMusic() {
    return `
        <div class="section">
            <div class="section-header">
                <span class="section-subtitle">SHEET MUSIC LIBRARY</span>
                <h2 class="section-title">클래식 기타 악보 보관소</h2>
            </div>
            <div style="background: var(--bg-surface); border: 1px solid var(--border-gold); border-radius: var(--radius-md); padding: 1.5rem; overflow-x: auto;">
                <table style="width: 100%; text-align: left; border-collapse: collapse; color: var(--text-secondary);">
                    <thead>
                        <tr style="border-bottom: 1px solid var(--border-gold); color: var(--accent-gold-light);">
                            <th style="padding: 0.8rem;">곡명</th>
                            <th style="padding: 0.8rem;">작곡가</th>
                            <th style="padding: 0.8rem;">난이도</th>
                            <th style="padding: 0.8rem;">다운로드</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${sheetMusicList.map(m => `
                            <tr style="border-bottom: 1px solid var(--border-light);">
                                <td style="padding: 1rem; color: var(--text-primary); font-weight: 600;">${m.title}</td>
                                <td style="padding: 1rem;">${m.composer}</td>
                                <td style="padding: 1rem;"><span class="badge-cat" style="position:static;">${m.difficulty}</span></td>
                                <td style="padding: 1rem;">
                                    <button class="btn-detail" onclick="alert('${m.title} 악보 PDF 다운로드가 시작되었습니다.')">📥 PDF 받기 (${m.downloadCount})</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

// 5. SUPPORT Submenu Views
export async function renderSupportAs() {
    const list = await getAsRequests();

    return `
        <div class="section">
            <div class="section-header">
                <span class="section-subtitle">A/S & REPAIR</span>
                <h2 class="section-title">A/S 수리 및 리페어 안내</h2>
            </div>
            <div style="background: var(--bg-surface); border: 1px solid var(--border-gold); border-radius: var(--radius-lg); padding: 2.5rem; text-align: center; margin-bottom: 2.5rem;">
                <h3 style="font-family: var(--font-heading); color: var(--accent-gold-light); font-size: 1.8rem; margin-bottom: 1rem;">마스터 루티어 직접 점검 및 리페어</h3>
                <p style="color: var(--text-secondary); max-width: 700px; margin: 0 auto 2rem auto; line-height: 1.7;">
                    그랑기타는 구입하신 모든 클래식 기타에 대해 무상/유상 수리 보증을 실시합니다. 넥 버징 세팅부터 쉘락 칠 보수, 크랙 수리까지 전문 루티어가 최상의 상태로 복원해 드립니다.
                </p>
                <button class="btn-hero" id="btn-open-as-form">🔧 온라인 A/S 수리 접수하기</button>
            </div>

            <!-- Recent AS Requests Table -->
            <div style="background: var(--bg-surface); border: 1px solid var(--border-gold); border-radius: var(--radius-md); padding: 1.8rem;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; flex-wrap:wrap; gap:0.5rem;">
                    <h3 style="font-size: 1.25rem; font-weight: 700; color: #1e1711;">📋 온라인 A/S 접수 현황 (${list.length}건)</h3>
                    <span style="font-size:0.85rem; color:var(--text-muted);">개인정보 보호를 위해 고객명 일부가 마스킹 처리됩니다.</span>
                </div>
                ${list.length === 0 ? `
                    <p style="color: var(--text-muted); font-size: 0.92rem; text-align: center; padding: 2.5rem 0;">현재 접수 대기 중인 수리 요청이 없습니다. 상단 '온라인 A/S 수리 접수하기'를 통해 간편하게 접수하실 수 있습니다.</p>
                ` : `
                    <div style="overflow-x: auto;">
                        <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.92rem;">
                            <thead>
                                <tr style="border-bottom: 2px solid var(--border-gold); color: #8b6508;">
                                    <th style="padding: 0.7rem;">접수번호</th>
                                    <th style="padding: 0.7rem;">신청자</th>
                                    <th style="padding: 0.7rem;">소장 모델</th>
                                    <th style="padding: 0.7rem;">수리 증상</th>
                                    <th style="padding: 0.7rem;">접수일</th>
                                    <th style="padding: 0.7rem;">진행상태</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${list.map(as => `
                                    <tr style="border-bottom: 1px solid rgba(0,0,0,0.06);">
                                        <td style="padding: 0.8rem; font-weight: 700; color: var(--accent-burgundy);">${as.ticketId || as.id}</td>
                                        <td style="padding: 0.8rem;">${(as.name || '고객').length > 2 ? as.name[0] + '*' + as.name.slice(2) : (as.name || '고객')[0] + '*'}</td>
                                        <td style="padding: 0.8rem;">${as.model || '그랑기타'}</td>
                                        <td style="padding: 0.8rem;">${as.type || '기타 점검'}</td>
                                        <td style="padding: 0.8rem; color: var(--text-muted);">${as.date || '최신'}</td>
                                        <td style="padding: 0.8rem;"><span class="qna-status done">${as.status || '접수완료'}</span></td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                `}
            </div>
        </div>
    `;
}

export function renderSupportGuitar() {
    return `
        <div class="section">
            <div class="section-header">
                <span class="section-subtitle">GUITAR CARE KNOWLEDGE</span>
                <h2 class="section-title">기타관련 상식 & 관리 노하우</h2>
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.5rem;">
                ${guitarKnowledgeList.map(item => `
                    <div style="background: var(--bg-surface); border: 1px solid var(--border-gold); padding: 1.8rem; border-radius: var(--radius-md);">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 0.6rem; font-size: 0.82rem; color: var(--text-muted);">
                            <span>✍️ ${item.author}</span>
                            <span>${item.date}</span>
                        </div>
                        <h3 style="color: var(--accent-gold-light); font-size: 1.15rem; margin-bottom: 0.8rem; font-family: var(--font-heading);">${item.title}</h3>
                        <p style="color: var(--text-secondary); font-size: 0.92rem; line-height: 1.7;">
                            ${item.content}
                        </p>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// --------------------------------------------------------------------------
// 7. MYPAGE (YoungCart & Gnuboard Standard Membership Page)
// --------------------------------------------------------------------------
export async function renderMyPage() {
    const user = getCurrentUser();

    if (!user) {
        return `
            <div class="page-header">
                <div class="breadcrumb">
                    <a href="#" data-route="home">HOME</a> &gt; <span>MEMBERSHIP</span> &gt; <strong>마이페이지 (MY PAGE)</strong>
                </div>
                <h1 class="page-title">마이페이지</h1>
                <p class="page-description">회원님의 주문 내역, 1:1 질문, A/S 접수 현황 및 회원 정보를 확인하실 수 있습니다.</p>
            </div>
            <div class="section" style="text-align: center; padding: 4.5rem 1rem;">
                <div style="font-size: 3.5rem; margin-bottom: 1rem;">🔒</div>
                <h3 style="font-size: 1.45rem; color: var(--text-primary); margin-bottom: 0.6rem; font-weight: 700;">로그인이 필요한 서비스입니다</h3>
                <p style="color: var(--text-muted); margin-bottom: 1.8rem; font-size: 0.95rem; line-height: 1.6;">
                    마이페이지는 그랑기타 회원 전용 공간입니다.<br>
                    로그인하시면 주문 내역 및 다양한 회원 전용 혜택을 이용하실 수 있습니다.
                </p>
                <div style="display: flex; gap: 0.8rem; justify-content: center;">
                    <button class="btn-primary" id="btn-mypage-open-login" style="padding: 0.75rem 2rem; font-size: 0.95rem;">로그인하기</button>
                    <button class="btn-secondary" id="btn-mypage-open-join" style="padding: 0.75rem 2rem; font-size: 0.95rem;">회원가입</button>
                </div>
            </div>
        `;
    }

    const userProfile = await getUserProfile(user.uid);
    const phone = userProfile?.phone || user.phone || '010-1234-5678';
    const email = user.email || '';
    const displayName = user.displayName || '회원';

    // Fetch user-specific records
    let userQnA = [];
    try {
        const allQnA = await getQnAPosts();
        userQnA = allQnA.filter(q => q.author === displayName || (userProfile && q.author === userProfile.name));
    } catch(e) {}

    let userAS = [];
    try {
        const allAS = await getAsRequests();
        userAS = allAS.filter(a => a.name === displayName || a.phone === phone);
    } catch(e) {}

    let userReviews = [];
    try {
        const allReviews = await getReviews();
        userReviews = allReviews.filter(r => r.author === displayName);
    } catch(e) {}

    let cartItems = [];
    try {
        cartItems = JSON.parse(localStorage.getItem('gg_cart') || '[]');
    } catch(e) {}

    return `
        <div class="page-header">
            <div class="breadcrumb">
                <a href="#" data-route="home">HOME</a> &gt; <span>MEMBERSHIP</span> &gt; <strong>마이페이지 (MY PAGE)</strong>
            </div>
            <h1 class="page-title">마이페이지</h1>
            <p class="page-description">그랑기타 회원 전용 마이페이지입니다. 고객님의 주문 내역 및 활동 현황을 관리하실 수 있습니다.</p>
        </div>

        <div class="section mypage-container">
            <!-- 1. Top Member Profile & Summary Card -->
            <div class="mypage-user-card">
                <div class="mypage-user-profile">
                    <div class="mypage-avatar-wrap">
                        ${user.photoURL ? `<img src="${user.photoURL}" alt="${displayName}" class="mypage-avatar-img">` : `<span class="mypage-avatar-placeholder">👤</span>`}
                    </div>
                    <div class="mypage-user-meta">
                        <div class="mypage-user-name-row">
                            <h2 class="mypage-user-name">${displayName} 님</h2>
                            <span class="mypage-badge-tier">정회원 (Standard)</span>
                        </div>
                        <p class="mypage-user-info-text">아이디(이메일): <strong>${email}</strong></p>
                        <p class="mypage-user-info-text">연락처: <strong>${phone}</strong></p>
                    </div>
                </div>
                <div class="mypage-stats-grid">
                    <div class="mypage-stat-box">
                        <span class="stat-label">보유 적립금</span>
                        <strong class="stat-value gold">1,000 P</strong>
                    </div>
                    <div class="mypage-stat-box">
                        <span class="stat-label">보유 할인쿠폰</span>
                        <strong class="stat-value">1 장</strong>
                    </div>
                    <div class="mypage-stat-box">
                        <span class="stat-label">1:1 질문 내역</span>
                        <strong class="stat-value">${userQnA.length} 건</strong>
                    </div>
                    <div class="mypage-stat-box">
                        <span class="stat-label">A/S 수리 접수</span>
                        <strong class="stat-value">${userAS.length} 건</strong>
                    </div>
                </div>
            </div>

            <!-- 2. Sub-tab Navigation (YoungCart / Gnuboard Standard Mypage) -->
            <div class="mypage-tabs-bar">
                <button class="mypage-tab-btn active" data-target="tab-orders">📦 최근 주문 / 시연 내역</button>
                <button class="mypage-tab-btn" data-target="tab-qna">💬 나의 1:1 질문 (${userQnA.length})</button>
                <button class="mypage-tab-btn" data-target="tab-as">🔧 A/S 수리 현황 (${userAS.length})</button>
                <button class="mypage-tab-btn" data-target="tab-reviews">⭐ 작성한 이용후기 (${userReviews.length})</button>
                <button class="mypage-tab-btn" data-target="tab-profile">⚙️ 회원정보 수정</button>
            </div>

            <!-- 3. Tab Contents -->
            <!-- Tab 1: Orders -->
            <div class="mypage-tab-content" id="tab-orders">
                <div class="mypage-section-head">
                    <h3 class="mypage-content-title">최근 주문 및 방문 시연 내역</h3>
                    <span class="mypage-note">최근 접수하신 상품 주문 및 수제 기타 방문 시연 신청 내역입니다.</span>
                </div>
                ${cartItems.length > 0 ? `
                    <div class="mypage-alert-box info">
                        🛒 현재 장바구니에 <strong>${cartItems.length}개</strong>의 상품/기타가 담겨 있습니다.
                        <button class="btn-text" id="btn-mypage-view-cart" style="margin-left: 0.8rem; font-weight:700; text-decoration:underline; cursor:pointer;">장바구니 확인하기 &gt;</button>
                    </div>
                ` : ''}
                <div class="table-responsive">
                    <table class="mypage-table">
                        <thead>
                            <tr>
                                <th style="width: 15%;">주문번호</th>
                                <th style="width: 45%;">상품명 / 내역</th>
                                <th style="width: 15%;">주문일자</th>
                                <th style="width: 15%;">결제금액</th>
                                <th style="width: 10%;">진행상태</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colspan="5" class="empty-table-cell">
                                    <p>최근 접수된 주문 및 시연 내역이 없습니다.</p>
                                    <button class="btn-primary" data-route="product_10" style="margin-top: 0.8rem; padding: 0.5rem 1.2rem; font-size: 0.85rem;">그랑기타 명기 라인업 둘러보기</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Tab 2: QnA -->
            <div class="mypage-tab-content" id="tab-qna" style="display:none;">
                <div class="mypage-section-head">
                    <h3 class="mypage-content-title">나의 1:1 질문과 답변</h3>
                    <button class="btn-primary" id="btn-mypage-write-qna" style="padding: 0.45rem 1rem; font-size: 0.82rem;">+ 새 질문 작성</button>
                </div>
                <div class="table-responsive">
                    <table class="mypage-table">
                        <thead>
                            <tr>
                                <th style="width: 15%;">구분</th>
                                <th style="width: 50%;">질문 제목</th>
                                <th style="width: 18%;">작성일자</th>
                                <th style="width: 17%;">상태</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${userQnA.length === 0 ? `
                                <tr>
                                    <td colspan="4" class="empty-table-cell">
                                        <p>작성하신 1:1 질문 내역이 없습니다.</p>
                                        <button class="btn-secondary" id="btn-mypage-empty-qna" style="margin-top: 0.8rem; padding: 0.5rem 1.2rem; font-size: 0.85rem;">마스터 루티어에게 1:1 질문하기</button>
                                    </td>
                                </tr>
                            ` : userQnA.map(q => `
                                <tr>
                                    <td><span class="category-badge">${q.category}</span></td>
                                    <td style="text-align: left; font-weight: 600;">
                                        ${q.isSecret ? '🔒 ' : ''}${q.title}
                                        ${q.answer ? `<div style="font-size:0.8rem; color:var(--accent-gold); font-weight:normal; margin-top:0.3rem;">↳ [답변완료] ${q.answer.slice(0, 45)}...</div>` : ''}
                                    </td>
                                    <td>${q.date}</td>
                                    <td><span class="status-pill ${q.status === '답변완료' ? 'complete' : 'pending'}">${q.status}</span></td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Tab 3: A/S -->
            <div class="mypage-tab-content" id="tab-as" style="display:none;">
                <div class="mypage-section-head">
                    <h3 class="mypage-content-title">A/S 및 리페어 수리 신청 현황</h3>
                    <button class="btn-primary" id="btn-mypage-write-as" style="padding: 0.45rem 1rem; font-size: 0.82rem;">+ A/S 온라인 접수</button>
                </div>
                <div class="table-responsive">
                    <table class="mypage-table">
                        <thead>
                            <tr>
                                <th style="width: 18%;">접수번호</th>
                                <th style="width: 25%;">악기 모델명</th>
                                <th style="width: 25%;">수리/점검 증상</th>
                                <th style="width: 17%;">접수일자</th>
                                <th style="width: 15%;">진행현황</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${userAS.length === 0 ? `
                                <tr>
                                    <td colspan="5" class="empty-table-cell">
                                        <p>접수된 A/S 및 수리 신청 내역이 없습니다.</p>
                                        <button class="btn-secondary" id="btn-mypage-empty-as" style="margin-top: 0.8rem; padding: 0.5rem 1.2rem; font-size: 0.85rem;">온라인 A/S 수리 신청하기</button>
                                    </td>
                                </tr>
                            ` : userAS.map(a => `
                                <tr>
                                    <td><strong>${a.ticketId || a.id}</strong></td>
                                    <td>${a.model || '그랑기타'}</td>
                                    <td style="text-align: left;">${a.type}</td>
                                    <td>${a.date}</td>
                                    <td><span class="status-pill ${a.status === '완료' ? 'complete' : 'progress'}">${a.status || '접수완료'}</span></td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Tab 4: Reviews -->
            <div class="mypage-tab-content" id="tab-reviews" style="display:none;">
                <div class="mypage-section-head">
                    <h3 class="mypage-content-title">내가 작성한 이용후기</h3>
                    <button class="btn-primary" id="btn-mypage-write-review" style="padding: 0.45rem 1rem; font-size: 0.82rem;">+ 후기 작성하기</button>
                </div>
                <div class="table-responsive">
                    <table class="mypage-table">
                        <thead>
                            <tr>
                                <th style="width: 15%;">평점</th>
                                <th style="width: 20%;">기타 모델</th>
                                <th style="width: 50%;">후기 제목 / 내용</th>
                                <th style="width: 15%;">작성일자</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${userReviews.length === 0 ? `
                                <tr>
                                    <td colspan="4" class="empty-table-cell">
                                        <p>작성하신 악기 및 체험단 후기가 없습니다.</p>
                                        <button class="btn-secondary" id="btn-mypage-empty-rev" style="margin-top: 0.8rem; padding: 0.5rem 1.2rem; font-size: 0.85rem;">첫 번째 이용후기 작성하기</button>
                                    </td>
                                </tr>
                            ` : userReviews.map(r => `
                                <tr>
                                    <td style="color:var(--accent-gold);">★ ${r.rating || 5}.0</td>
                                    <td>${r.model || '그랑기타'}</td>
                                    <td style="text-align:left;"><strong>${r.title}</strong><div style="font-size:0.8rem; color:var(--text-muted); margin-top:0.2rem;">${(r.content || '').slice(0, 40)}...</div></td>
                                    <td>${r.date}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Tab 5: Edit Profile -->
            <div class="mypage-tab-content" id="tab-profile" style="display:none;">
                <div class="mypage-section-head">
                    <h3 class="mypage-content-title">회원정보 수정 및 보안 설정</h3>
                    <span class="mypage-note">회원님의 닉네임과 연락처를 최신 정보로 변경할 수 있습니다.</span>
                </div>
                <div class="mypage-form-card">
                    <form id="form-mypage-profile" class="modal-form" style="max-width: 600px; margin: 0 auto;">
                        <div class="form-group">
                            <label for="mypage-email">가입 아이디 (E-mail)</label>
                            <input type="email" id="mypage-email" value="${email}" disabled style="background: rgba(0,0,0,0.06); cursor: not-allowed;">
                            <span class="auth-helper-note" style="margin-top:0.2rem;">* 아이디(이메일)는 변경할 수 없습니다.</span>
                        </div>
                        <div class="form-group">
                            <label for="mypage-name">이름 / 닉네임 *</label>
                            <input type="text" id="mypage-name" value="${displayName}" required>
                        </div>
                        <div class="form-group">
                            <label for="mypage-phone">휴대폰 번호 *</label>
                            <input type="tel" id="mypage-phone" value="${phone}" required placeholder="010-0000-0000">
                        </div>
                        <div class="form-group" style="padding-top: 0.8rem; border-top: 1px dashed var(--border-gold);">
                            <label>비밀번호 변경</label>
                            <div style="display: flex; gap: 0.6rem; align-items: center;">
                                <input type="text" value="••••••••" disabled style="background: rgba(0,0,0,0.06); cursor: not-allowed; flex: 1;">
                                <button type="button" id="btn-mypage-reset-pw" class="btn-secondary" style="padding: 0.65rem 1rem; white-space: nowrap; font-size: 0.82rem;">재설정 메일 발송</button>
                            </div>
                            <span class="auth-helper-note" style="margin-top:0.3rem;">가입하신 이메일(${email})로 안전한 비밀번호 재설정 링크가 발송됩니다.</span>
                        </div>
                        <div id="mypage-profile-result" style="display:none; margin: 1rem 0;"></div>
                        <button type="submit" id="btn-submit-mypage-profile" class="btn-primary full-width" style="margin-top: 1.5rem; padding: 0.8rem;">회원정보 수정 완료</button>
                    </form>
                </div>
            </div>
        </div>
    `;
}

export function attachPageEvents() {
    // Hero Slider Carousel
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-dot');
    const prevBtn = document.getElementById('hero-prev');
    const nextBtn = document.getElementById('hero-next');

    if (slides.length > 0) {
        let currentSlide = 0;
        let slideInterval = null;

        const goToSlide = (index) => {
            slides.forEach((s, idx) => {
                s.classList.toggle('active', idx === index);
            });
            dots.forEach((d, idx) => {
                d.classList.toggle('active', idx === index);
            });
            currentSlide = index;
        };

        const nextSlide = () => {
            const nextIdx = (currentSlide + 1) % slides.length;
            goToSlide(nextIdx);
        };

        const prevSlide = () => {
            const prevIdx = (currentSlide - 1 + slides.length) % slides.length;
            goToSlide(prevIdx);
        };

        nextBtn?.addEventListener('click', (e) => {
            e.preventDefault();
            nextSlide();
            resetTimer();
        });

        prevBtn?.addEventListener('click', (e) => {
            e.preventDefault();
            prevSlide();
            resetTimer();
        });

        dots.forEach((dot, idx) => {
            dot.addEventListener('click', () => {
                goToSlide(idx);
                resetTimer();
            });
        });

        const resetTimer = () => {
            if (slideInterval) clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, 4500);
        };

        resetTimer();
    }
    // Gallery thumbnail switcher
    document.querySelectorAll('.item-thumb-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const thumb = e.currentTarget;
            const imgSrc = thumb.getAttribute('data-img-src');
            const mainImg = document.getElementById('main-item-image');
            if (mainImg && imgSrc) {
                mainImg.src = imgSrc;
                document.querySelectorAll('.item-thumb-btn').forEach(t => {
                    t.style.border = '1px solid var(--border-light)';
                    t.style.opacity = '0.65';
                });
                thumb.style.border = '2px solid var(--accent-gold)';
                thumb.style.opacity = '1';
            }
        });
    });

    // Detail page tab switching
    document.querySelectorAll('.item-tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const targetId = e.currentTarget.getAttribute('data-target');
            document.querySelectorAll('.item-tab-btn').forEach(b => {
                b.classList.remove('active');
                b.style.color = 'var(--text-secondary)';
                b.style.fontWeight = '400';
                b.style.borderBottom = 'none';
            });
            e.currentTarget.classList.add('active');
            e.currentTarget.style.color = 'var(--accent-gold)';
            e.currentTarget.style.fontWeight = '700';
            e.currentTarget.style.borderBottom = '3px solid var(--accent-gold)';

            if (targetId) {
                const targetElem = document.getElementById(targetId);
                if (targetElem) {
                    targetElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    // Add to cart on item detail page
    document.getElementById('btn-add-to-cart-page')?.addEventListener('click', (e) => {
        const id = e.target.getAttribute('data-id');
        if (id) addToCart(id, 1);
    });

    // Buy now on item detail page
    document.getElementById('btn-buy-now')?.addEventListener('click', (e) => {
        const id = e.target.getAttribute('data-id');
        if (id) {
            addToCart(id, 1);
            openModal('cart-modal');
        }
    });

    // A/S Form trigger
    document.getElementById('btn-open-as-form')?.addEventListener('click', () => {
        openModal('as-request-modal');
    });

    // ----------------------------------------------------------------------
    // MyPage Interaction Handlers
    // ----------------------------------------------------------------------
    // Unauthenticated login/join buttons in mypage
    document.getElementById('btn-mypage-open-login')?.addEventListener('click', () => {
        openModal('auth-modal');
        document.getElementById('tab-login-btn')?.click();
    });

    document.getElementById('btn-mypage-open-join')?.addEventListener('click', () => {
        openModal('auth-modal');
        document.getElementById('tab-join-btn')?.click();
    });

    // MyPage Tabs switching
    document.querySelectorAll('.mypage-tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const targetTabId = e.currentTarget.getAttribute('data-target');
            document.querySelectorAll('.mypage-tab-btn').forEach(b => b.classList.remove('active'));
            e.currentTarget.classList.add('active');

            document.querySelectorAll('.mypage-tab-content').forEach(tab => {
                tab.style.display = 'none';
                tab.classList.remove('active');
            });

            const activeContent = document.getElementById(targetTabId);
            if (activeContent) {
                activeContent.style.display = 'block';
                activeContent.classList.add('active');
            }
        });
    });

    // MyPage quick action buttons
    document.getElementById('btn-mypage-view-cart')?.addEventListener('click', () => {
        openModal('cart-modal');
    });

    document.getElementById('btn-mypage-write-qna')?.addEventListener('click', () => {
        openModal('write-qna-modal');
    });
    document.getElementById('btn-mypage-empty-qna')?.addEventListener('click', () => {
        openModal('write-qna-modal');
    });

    document.getElementById('btn-mypage-write-as')?.addEventListener('click', () => {
        openModal('as-request-modal');
    });
    document.getElementById('btn-mypage-empty-as')?.addEventListener('click', () => {
        openModal('as-request-modal');
    });

    document.getElementById('btn-mypage-write-review')?.addEventListener('click', () => {
        openModal('write-review-modal');
    });
    document.getElementById('btn-mypage-empty-rev')?.addEventListener('click', () => {
        openModal('write-review-modal');
    });

    // Password Reset Email Trigger in MyPage
    document.getElementById('btn-mypage-reset-pw')?.addEventListener('click', async (e) => {
        const user = getCurrentUser();
        if (!user?.email) return;
        const btn = e.target;
        try {
            btn.disabled = true;
            btn.textContent = '발송 중...';
            const res = await resetPassword(user.email);
            alert(res.message);
        } catch (err) {
            alert(err.message);
        } finally {
            btn.disabled = false;
            btn.textContent = '재설정 메일 발송';
        }
    });

    // Profile Update Form Submit in MyPage
    document.getElementById('form-mypage-profile')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('mypage-name')?.value;
        const phone = document.getElementById('mypage-phone')?.value;
        const submitBtn = document.getElementById('btn-submit-mypage-profile');
        const resBox = document.getElementById('mypage-profile-result');

        try {
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = '수정 저장 중...';
            }
            await updateUserProfile({ displayName: name, phone });
            if (resBox) {
                resBox.style.display = 'block';
                resBox.className = 'auth-result-box success';
                resBox.innerHTML = '✓ 회원정보가 성공적으로 수정되었습니다.';
                setTimeout(() => { resBox.style.display = 'none'; }, 3000);
            }
            alert('회원정보가 성공적으로 수정되었습니다.');
        } catch (err) {
            if (resBox) {
                resBox.style.display = 'block';
                resBox.className = 'auth-result-box error';
                resBox.innerHTML = `✕ ${err.message}`;
            }
        } finally {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = '회원정보 수정 완료';
            }
        }
    });
}
