/* ==========================================================================
   GRAN GUITAR - Page Renderer (Original Assets & Full Detail Gallery Images)
   ========================================================================== */

import { productsData, newsArticles, mediaVideos, sheetMusicList, faqList, reviewsList, guitarKnowledgeList } from '../data.js';
import { addToCart, openModal } from './modals.js';

export function renderHome() {
    return `
        <!-- Hero Carousel (Original Site Banners 100% 1:1) -->
        <section class="hero-carousel" id="hero-slider">
            <div class="hero-slide active" style="background-image: url('http://granguitar.co.kr/shop/data/banner/1');">
                <img src="http://granguitar.co.kr/shop/data/banner/1_2" alt="그랑기타 대표 메인 배너 1" class="hero-banner-img">
            </div>
            <div class="hero-slide" style="background-image: url('http://granguitar.co.kr/shop/data/banner/2');">
                <img src="http://granguitar.co.kr/shop/data/banner/2_2" alt="그랑기타 대표 메인 배너 2" class="hero-banner-img">
            </div>
            <div class="hero-slide" style="background-image: url('http://granguitar.co.kr/shop/data/banner/3');">
                <img src="http://granguitar.co.kr/shop/data/banner/3_2" alt="그랑기타 대표 메인 배너 3" class="hero-banner-img">
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
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
                <a href="http://gran.mv-web.co.kr/shop" target="_blank" rel="noopener" style="display:block; border-radius: var(--radius-md); overflow:hidden; border:1px solid var(--border-gold);">
                    <img src="http://granguitar.co.kr/shop/data/mainBanner/1" alt="메인 배너 1" style="width:100%; height:auto; display:block;">
                </a>
                <div style="border-radius: var(--radius-md); overflow:hidden; border:1px solid var(--border-gold);">
                    <img src="http://granguitar.co.kr/shop/data/mainBanner/2" alt="메인 배너 2" style="width:100%; height:auto; display:block;">
                </div>
            </div>

            <div class="video-feature-box">
                <div class="video-frame-container">
                    <iframe src="https://www.youtube.com/embed/4dTEE070KKo" title="그랑기타 연주 시연" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                <div style="display: flex; flex-direction: column; gap: 1rem;">
                    <div style="border-radius: var(--radius-md); overflow:hidden; border:1px solid var(--border-gold);">
                        <img src="http://granguitar.co.kr/shop/data/mainBanner/4" alt="메인 배너 4" style="width:100%; height:auto; display:block;">
                    </div>
                    <div style="border-radius: var(--radius-md); overflow:hidden; border:1px solid var(--border-gold);">
                        <img src="http://granguitar.co.kr/shop/data/mainBanner/5" alt="메인 배너 5" style="width:100%; height:auto; display:block;">
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
                    <img src="http://granguitar.co.kr/shop/data/mainBanner/6" alt="폴링기타 네이버 카페" style="width:100%; height:auto; display:block;">
                </a>
                <a href="http://www.facebook.com/GranGuitarEnsemble" target="_blank" rel="noopener" class="partner-card" style="padding:0; overflow:hidden; border: 1px solid var(--border-gold);">
                    <img src="http://granguitar.co.kr/shop/data/mainBanner/7" alt="그랑기타 앙상블 페이스북" style="width:100%; height:auto; display:block;">
                </a>
                <a href="http://www.gopherwood.co.kr/" target="_blank" rel="noopener" class="partner-card" style="padding:0; overflow:hidden; border: 1px solid var(--border-gold);">
                    <img src="http://granguitar.co.kr/shop/data/mainBanner/8" alt="고퍼우드 음향 파트너" style="width:100%; height:auto; display:block;">
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
                    <img src="http://granguitar.co.kr/images/about/about_con01.jpg" alt="그랑기타 회사소개 1" style="max-width: 100%; height: auto; border-radius: var(--radius-md); border: 1px solid var(--border-light);">
                    <img src="http://granguitar.co.kr/images/about/about_con02.jpg" alt="그랑기타 회사소개 2" style="max-width: 100%; height: auto; border-radius: var(--radius-md); border: 1px solid var(--border-light);">
                    <img src="http://granguitar.co.kr/images/about/about_con03.jpg" alt="그랑기타 회사소개 3" style="max-width: 100%; height: auto; border-radius: var(--radius-md); border: 1px solid var(--border-light);">
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
                    <img src="http://granguitar.co.kr/images/about/luthier_con01.jpg" alt="제작자 소개 1" style="max-width: 100%; height: auto; border-radius: var(--radius-md); border: 1px solid var(--border-light);">
                    <img src="http://granguitar.co.kr/images/about/luthier_con02.gif" alt="제작자 소개 2" style="max-width: 100%; height: auto; border-radius: var(--radius-md); border: 1px solid var(--border-light);">
                    <img src="http://granguitar.co.kr/images/about/luthier_con03.jpg" alt="제작자 소개 3" style="max-width: 100%; height: auto; border-radius: var(--radius-md); border: 1px solid var(--border-light);">
                    <img src="http://granguitar.co.kr/images/about/luthier_con04.jpg" alt="제작자 소개 4" style="max-width: 100%; height: auto; border-radius: var(--radius-md); border: 1px solid var(--border-light);">
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
                    <img src="http://granguitar.co.kr/images/about/location_con01.gif" alt="오시는길 약도" style="max-width: 100%; height: auto; border-radius: var(--radius-md); border: 1px solid var(--border-light);">
                    <img src="http://granguitar.co.kr/images/about/location_con02.gif" alt="오시는길 상세안내" style="max-width: 100%; height: auto; border-radius: var(--radius-md); border: 1px solid var(--border-light);">
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
                        <img src="http://granguitar.co.kr/images/product/spec_con01.gif" alt="그랑기타 전체스펙 1">
                        <img src="http://granguitar.co.kr/images/product/spec_con02.gif" alt="그랑기타 전체스펙 2">
                        <img src="http://granguitar.co.kr/images/product/spec_con03.gif" alt="그랑기타 전체스펙 3">
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
export function renderNewsPage(type) {
    const titles = {
        news: "뉴스 (News)",
        notice: "공지사항 (Notice)",
        concert: "연주회 소식 (Concerts)"
    };

    const list = newsArticles.filter(a => type === 'all' || a.type === type);

    return `
        <div class="section">
            <div class="section-header">
                <span class="section-subtitle">NEWS & ANNOUNCEMENT</span>
                <h2 class="section-title">${titles[type] || '소식 및 공지'}</h2>
            </div>
            <div style="display: flex; flex-direction: column; gap: 1.5rem;">
                ${list.map(article => `
                    <div style="background: var(--bg-surface); border: 1px solid var(--border-gold); padding: 1.8rem; border-radius: var(--radius-md);">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                            <span class="badge-cat" style="position:static;">${article.type.toUpperCase()}</span>
                            <span style="font-size: 0.85rem; color: var(--text-muted);">${article.date}</span>
                        </div>
                        <h3 style="font-size: 1.3rem; color: var(--text-primary); margin-bottom: 0.8rem;">${article.title}</h3>
                        <p style="color: var(--text-secondary); font-size: 0.95rem; line-height: 1.6;">${article.content}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// 4. COMMUNITY Submenu Views
export function renderCommunityReview() {
    return `
        <div class="section">
            <div class="section-header">
                <span class="section-subtitle">USER REVIEWS</span>
                <h2 class="section-title">체험단 및 연주자 리뷰</h2>
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.5rem;">
                ${reviewsList.map(r => `
                    <div style="background: var(--bg-surface); border: 1px solid var(--border-gold); padding: 1.5rem; border-radius: var(--radius-md);">
                        <div style="display:flex; justify-content:space-between; margin-bottom: 0.5rem; align-items:center;">
                            <span style="color: var(--accent-gold);">★★★★★</span>
                            <span style="font-size: 0.8rem; color: var(--text-muted);">${r.date}</span>
                        </div>
                        <h4 style="font-size: 1.1rem; color: var(--text-primary); margin-bottom: 0.3rem;">${r.title}</h4>
                        <span style="font-size: 0.8rem; color: var(--accent-gold-light); display:block; margin-bottom: 0.8rem;">구매 모델: ${r.model}</span>
                        <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">${r.content}</p>
                        <div style="margin-top: 1rem; font-size: 0.8rem; color: var(--text-muted); text-align:right;">작성자: ${r.author}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

export function renderCommunityFaq() {
    return `
        <div class="section">
            <div class="section-header">
                <span class="section-subtitle">Q & A</span>
                <h2 class="section-title">자주 묻는 질문과 답변</h2>
            </div>
            <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 800px; margin: 0 auto;">
                ${faqList.map(item => `
                    <details style="background: var(--bg-surface); border: 1px solid var(--border-gold); border-radius: var(--radius-md); padding: 1.2rem; cursor: pointer;">
                        <summary style="font-weight: 700; color: var(--accent-gold-light); font-size: 1.05rem;">Q. ${item.q}</summary>
                        <p style="margin-top: 1rem; color: var(--text-secondary); font-size: 0.95rem; line-height: 1.7; border-top: 1px solid var(--border-light); padding-top: 0.8rem;">
                            A. ${item.a}
                        </p>
                    </details>
                `).join('')}
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
export function renderSupportAs() {
    return `
        <div class="section">
            <div class="section-header">
                <span class="section-subtitle">A/S & REPAIR</span>
                <h2 class="section-title">A/S 수리 및 리페어 안내</h2>
            </div>
            <div style="background: var(--bg-surface); border: 1px solid var(--border-gold); border-radius: var(--radius-lg); padding: 2.5rem; text-align: center;">
                <h3 style="font-family: var(--font-heading); color: var(--accent-gold-light); font-size: 1.8rem; margin-bottom: 1rem;">마스터 루티어 직접 점검 및 리페어</h3>
                <p style="color: var(--text-secondary); max-width: 700px; margin: 0 auto 2rem auto; line-height: 1.7;">
                    그랑기타는 구입하신 모든 클래식 기타에 대해 무상/유상 수리 보증을 실시합니다. 넥 버징 세팅부터 쉘락 칠 보수, 크랙 수리까지 전문 루티어가 최상의 상태로 복원해 드립니다.
                </p>
                <button class="btn-hero" id="btn-open-as-form">🔧 온라인 A/S 수리 접수하기</button>
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
}
