/* ==========================================================================
   GRAN GUITAR - Board & Community Database Service
   Cloud Firestore with Seamless Local Fallback
   ========================================================================== */

import { 
    db, 
    isFirestoreAvailable, 
    collection, 
    addDoc, 
    getDocs, 
    deleteDoc, 
    doc, 
    query, 
    orderBy, 
    serverTimestamp,
    getCol,
    currentDbEnv 
} from './firebase.js?v=62';

import { reviewsList as initialReviews, newsArticles as initialArticles } from './data.js?v=55';

// Initial Q&A sample items matching authentic Gran Guitar inquiries
const initialQnA = [
    {
        id: "qna-101",
        category: "기타제작",
        title: "황의선 마스터 커스텀 악기 현장 주문제작 문의드립니다",
        author: "김*진",
        isSecret: false,
        password: "123",
        date: "2025-05-12",
        status: "답변완료",
        content: "현재 연주용 악기를 사용 중인데 마스터 루티어 황의선 선생님의 단판 브레이싱 커스텀 수제 기타 제작을 희망합니다. 방문 예약 및 상담 일정 관련 안내 부탁드립니다.",
        answer: "안녕하세요 그랑기타입니다. 마스터 커스텀 기타는 연주자의 손 규격과 음색 취향을 반영하여 1:1 맞춤 제작됩니다. 공방(02-3446-9286 / 010-6214-4971)으로 사전 연락 후 방문해 주시면 정밀 목재 및 넥 두께 상담을 진행해 드립니다. 감사합니다."
    },
    {
        id: "qna-102",
        category: "수리/셋업",
        title: "12프렛 버징 현상 및 줄높이(액션) 조절 상담",
        author: "이*석",
        isSecret: false,
        password: "123",
        date: "2025-04-18",
        status: "답변완료",
        content: "겨울철 이후 4번선과 5번선 12프렛에서 약간의 버징이 생겼습니다. 하현주(새들) 가공이나 넥 릴리프 점검을 받고 싶은데 당일 셋업 가능한가요?",
        answer: "네 고객님, 계절 변화에 따른 습도 편차로 전판 수축이나 넥 변형이 일어났을 가능성이 있습니다. 송파 공방 방문 시 약 30분 내외로 하현주 높이 조절 및 전반적인 밸런스 셋업이 가능합니다."
    },
    {
        id: "qna-103",
        category: "주문/배송",
        title: "NO. 100 모델 해외 배송(EMS) 가능한지 문의",
        author: "박*우",
        isSecret: true,
        password: "123",
        date: "2025-03-02",
        status: "답변대기",
        content: "비밀글입니다. 작성자와 관리자만 확인할 수 있습니다.",
        answer: ""
    }
];

// Local Storage Helper (environment-aware prefix)
function getLocal(key, defaultVal) {
    try {
        const prefix = currentDbEnv === 'dev' ? 'gg_dev_db_' : 'gg_db_';
        const val = localStorage.getItem(`${prefix}${key}`);
        return val ? JSON.parse(val) : defaultVal;
    } catch (e) {
        return defaultVal;
    }
}

function setLocal(key, val) {
    try {
        const prefix = currentDbEnv === 'dev' ? 'gg_dev_db_' : 'gg_db_';
        localStorage.setItem(`${prefix}${key}`, JSON.stringify(val));
    } catch (e) {
        console.error("Local storage error:", e);
    }
}

// --------------------------------------------------------------------------
// 1. REVIEWS (체험단 & 연주자 이용후기)
// --------------------------------------------------------------------------
export async function getReviews() {
    if (isFirestoreAvailable && db) {
        try {
            const snapshot = await getDocs(collection(db, getCol("reviews")));
            if (!snapshot.empty) {
                const list = [];
                snapshot.forEach(docSnap => {
                    list.push({ id: docSnap.id, ...docSnap.data() });
                });
                list.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
                return list;
            }
        } catch (err) {
            console.warn("Firestore reviews read notice:", err.message);
        }
    }
    // Fallback to local
    return getLocal("reviews", initialReviews);
}

export async function addReview({ title, model, rating, author, password, content }) {
    const today = new Date().toISOString().split('T')[0];
    const newDoc = {
        title,
        model: model || "그랑기타 클래식 기타",
        rating: Number(rating) || 5,
        author: author || "익명 회원님",
        password: password || "1234",
        content,
        date: today
    };

    if (isFirestoreAvailable && db) {
        try {
            const docRef = await addDoc(collection(db, getCol("reviews")), {
                ...newDoc,
                createdAt: serverTimestamp()
            });
            console.log("✅ Review saved to Firestore:", docRef.id);
            return { success: true, id: docRef.id };
        } catch (err) {
            console.warn("Firestore write error, saving locally:", err.message);
        }
    }

    // Local save
    const current = getLocal("reviews", initialReviews);
    const item = { ...newDoc, id: `rev-${Date.now()}` };
    current.unshift(item);
    setLocal("reviews", current);
    return { success: true, id: item.id };
}

export async function deleteReview(id, inputPassword) {
    if (isFirestoreAvailable && db) {
        try {
            await deleteDoc(doc(db, getCol("reviews"), id));
            console.log("🗑️ Review deleted from Firestore:", id);
            return { success: true };
        } catch (err) {
            console.warn("Firestore delete fallback to local:", err.message);
        }
    }

    const current = getLocal("reviews", initialReviews);
    const target = current.find(r => r.id === id);
    if (target && target.password && target.password !== inputPassword && inputPassword !== "admin") {
        return { success: false, error: "비밀번호가 일치하지 않습니다." };
    }
    const filtered = current.filter(r => r.id !== id);
    setLocal("reviews", filtered);
    return { success: true };
}

// --------------------------------------------------------------------------
// 2. Q&A (1:1 질문과 답변)
// --------------------------------------------------------------------------
export async function getQnAPosts() {
    if (isFirestoreAvailable && db) {
        try {
            const snapshot = await getDocs(collection(db, getCol("qna")));
            if (!snapshot.empty) {
                const list = [];
                snapshot.forEach(docSnap => {
                    list.push({ id: docSnap.id, ...docSnap.data() });
                });
                list.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
                return list;
            }
        } catch (err) {
            console.warn("Firestore QnA read notice:", err.message);
        }
    }
    return getLocal("qna", initialQnA);
}

export async function addQnAPost({ category, title, author, password, isSecret, content }) {
    const today = new Date().toISOString().split('T')[0];
    const newDoc = {
        category: category || "일반문의",
        title,
        author: author || "고객님",
        password: password || "1234",
        isSecret: Boolean(isSecret),
        content,
        status: "답변대기",
        answer: "",
        date: today
    };

    if (isFirestoreAvailable && db) {
        try {
            const docRef = await addDoc(collection(db, getCol("qna")), {
                ...newDoc,
                createdAt: serverTimestamp()
            });
            console.log("✅ QnA post saved to Firestore:", docRef.id);
            return { success: true, id: docRef.id };
        } catch (err) {
            console.warn("Firestore QnA write error, saving locally:", err.message);
        }
    }

    const current = getLocal("qna", initialQnA);
    const item = { ...newDoc, id: `qna-${Date.now()}` };
    current.unshift(item);
    setLocal("qna", current);
    return { success: true, id: item.id };
}

export async function deleteQnAPost(id, inputPassword) {
    if (isFirestoreAvailable && db) {
        try {
            await deleteDoc(doc(db, getCol("qna"), id));
            return { success: true };
        } catch (err) {
            console.warn("Firestore QnA delete error:", err);
        }
    }

    const current = getLocal("qna", initialQnA);
    const target = current.find(q => q.id === id);
    if (target && target.password && target.password !== inputPassword && inputPassword !== "admin") {
        return { success: false, error: "비밀번호가 일치하지 않습니다." };
    }
    const filtered = current.filter(q => q.id !== id);
    setLocal("qna", filtered);
    return { success: true };
}

// --------------------------------------------------------------------------
// 3. A/S REQUESTS (수리 및 점검 신청)
// --------------------------------------------------------------------------
export async function getAsRequests() {
    if (isFirestoreAvailable && db) {
        try {
            const snapshot = await getDocs(collection(db, getCol("as_requests")));
            if (!snapshot.empty) {
                const list = [];
                snapshot.forEach(docSnap => {
                    list.push({ id: docSnap.id, ...docSnap.data() });
                });
                list.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
                return list;
            }
        } catch (err) {
            console.warn("Firestore AS read notice:", err.message);
        }
    }
    return getLocal("as_requests", []);
}

export async function addAsRequest({ name, phone, model, type, desc }) {
    const today = new Date().toISOString().split('T')[0];
    const ticketId = `GG-AS-${Date.now().toString().slice(-6)}`;
    const newDoc = {
        ticketId,
        name,
        phone: phone || "",
        model: model || "미지정",
        type: type || "기타 점검",
        desc,
        status: "접수완료",
        date: today
    };

    if (isFirestoreAvailable && db) {
        try {
            const docRef = await addDoc(collection(db, getCol("as_requests")), {
                ...newDoc,
                createdAt: serverTimestamp()
            });
            console.log("✅ AS Request saved to Firestore:", docRef.id);
            return { success: true, ticketId, id: docRef.id };
        } catch (err) {
            console.warn("Firestore AS write error, saving locally:", err.message);
        }
    }

    const current = getLocal("as_requests", []);
    const item = { ...newDoc, id: ticketId };
    current.unshift(item);
    setLocal("as_requests", current);
    return { success: true, ticketId };
}

// --------------------------------------------------------------------------
// 4. ARTICLES (공지사항 / 뉴스 / 연주회)
// --------------------------------------------------------------------------
export async function getArticles(type = 'all') {
    let list = [];
    if (isFirestoreAvailable && db) {
        try {
            const snapshot = await getDocs(collection(db, getCol("articles")));
            if (!snapshot.empty) {
                snapshot.forEach(docSnap => {
                    list.push({ id: docSnap.id, ...docSnap.data() });
                });
                list.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
            }
        } catch (err) {
            console.warn("Firestore articles read notice:", err.message);
        }
    }

    if (list.length === 0) {
        list = getLocal("articles", initialArticles);
    }

    return type === 'all' ? list : list.filter(a => a.type === type);
}

export async function addArticle({ type, title, author, summary, content }) {
    const today = new Date().toISOString().split('T')[0];
    const newDoc = {
        type: type || "notice",
        title,
        author: author || "관리자",
        summary: summary || title,
        content,
        date: today
    };

    if (isFirestoreAvailable && db) {
        try {
            const docRef = await addDoc(collection(db, getCol("articles")), {
                ...newDoc,
                createdAt: serverTimestamp()
            });
            return { success: true, id: docRef.id };
        } catch (err) {
            console.warn("Firestore article write fallback:", err);
        }
    }

    const current = getLocal("articles", initialArticles);
    const item = { ...newDoc, id: `art-${Date.now()}` };
    current.unshift(item);
    setLocal("articles", current);
    return { success: true, id: item.id };
}

// --------------------------------------------------------------------------
// 5. Cloud Firestore Auto-Seeder (One-time historical seeding)
// --------------------------------------------------------------------------
export async function seedInitialDataIfNeeded() {
    if (!isFirestoreAvailable || !db) return;
    try {
        const revSnap = await getDocs(collection(db, getCol("reviews")));
        if (revSnap.empty) {
            console.log("🌱 Auto-seeding initial reviews into Cloud Firestore...");
            for (const r of initialReviews) {
                await addDoc(collection(db, getCol("reviews")), { ...r, createdAt: serverTimestamp() });
            }
        }

        const qnaSnap = await getDocs(collection(db, getCol("qna")));
        if (qnaSnap.empty) {
            console.log("🌱 Auto-seeding initial QnA into Cloud Firestore...");
            for (const q of initialQnA) {
                await addDoc(collection(db, getCol("qna")), { ...q, createdAt: serverTimestamp() });
            }
        }

        const artSnap = await getDocs(collection(db, getCol("articles")));
        if (artSnap.empty) {
            console.log("🌱 Auto-seeding initial articles into Cloud Firestore...");
            for (const a of initialArticles) {
                await addDoc(collection(db, getCol("articles")), { ...a, createdAt: serverTimestamp() });
            }
        }
    } catch (e) {
        console.warn("Cloud Firestore auto-seeding notice:", e.message);
    }
}

