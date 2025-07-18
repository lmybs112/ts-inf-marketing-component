// 我要把功能整合在這一隻 js 檔案中
// 首先等待頁面加載完成後，先取得當前 url 動線資訊
//POST https://api.inffits.com/httpmpi/mkt_products_involve
// {
//     "Brand": "ALMI",
//     "url": "ALMIhop.shoplineapp.com/products/chartb"
// }
// 取得當前 url 動線資訊回傳
// 回傳格式如下
//  {
//     config: {
//             "CTA_color": "#FFFFFFFF",
//             "Description": "找到您的個人化專屬商品",
//             "BannerType": "TinyPopupBanner",
//             "TimeValid": [
//                 "2025-06-04",
//                 "2025-06-12"
//             ],
//             "CTA_background": "#000000FF",
//             "Title": "精選購物之旅",
//             "CTA_text": "立即開始",
//             "Location": "RightDown",
//             "status": true
//         },
//         route:[
//     {
//         "SpecifyTags": {
//             "商品類別": []
//         },
//         "ClothID": "ALMI_All9",
//         "Route": "1746771238560",
//         "mktOnline": true,
//         "TagGroups_order": [
//             "穿著場合"
//         ],
//         "DisplayList": [
//             "inffits_landing_page_cond",
//             "inffits_category_page_cond",
//             "inffits_product_page_cond"
//         ],
//         "SpecifyKeywords": [],
//         "Description": "這是一句描述或註記導購計劃的句子",
//         "Name": "t4w"
//     }
// ]
// }
// 取得回傳，再依照route[0].Route call 取得動線詳細資訊再
//  設置 iframe
//  modal.setIframeConfig({
//    id: route[0].Route,
//    brand: 'ALMI'
//  });

// modal.setIframeUrl(route[0]?.RouteDisplayMode === 'media'? 'https://ts-iframe-no-media.vercel.app/iframe_container_module.html' : 'https://ts-iframe-v2.vercel.app/iframe_container_module.html');
// 依照 config BannerType 判斷要載入 inf-marketing-square-card-banner-component.js 還是 inf-marketing-popup-banner-component.js
// TinyPopupBanner 載入 inf-marketing-popup-banner-component.js
// SquareCardBanner 載入 inf-marketing-square-card-banner-component.js

/**
 * INF marketing component管理器
 * 負責整合所有營銷組件的載入和管理功能
 */
class InfMarketingComponentManager {
    constructor() {
        this.config = null;
        this.route = null;
        this.currentComponent = null;
        this.modal = null;
        this.isInitialized = false;
        this.brand = null; // 新增：保存品牌參數

        // 綁定方法到實例
        this.init = this.init.bind(this);
        this.fetchMarketingData = this.fetchMarketingData.bind(this);
        this.loadComponent = this.loadComponent.bind(this);
        this.handleComponentClose = this.handleComponentClose.bind(this);
    }

    /**
     * 初始化組件管理器
     * @param {string} brand 品牌名稱（必填）
     * @param {string} [url] 網址（非必填，預設 currentUrl）
     * @param {Object} [config] 自定義配置（非必填，當 API 回傳的 config 為空時使用）
     */
    async init(brand, url, config) {
        if (this.isInitialized) {
            return;
        }
        if (!brand || typeof brand !== 'string' || !brand.trim()) {
            console.error('初始化失敗：brand 參數為必填且不可為空');
            return;
        }
        try {
            // 保存品牌參數
            this.brand = brand;

            // 確保模態框組件已載入
            await this.ensureModalComponentLoaded();

            // 取得營銷資料
            const data = await this.fetchMarketingData(brand, url);

            if (!data || !data.route || data.route.length === 0) {
                console.warn('未取得有效的營銷資料');
                return;
            }

            // 如果 API 回傳的 config 為空，使用傳入的 config 參數
            if (!data.config?.Banner_Info?.[0] && config) {
                this.config = config;
            } else if (data.config?.Banner_Info?.[0]) {
                this.config = data.config.Banner_Info[0];
            } else {
                console.warn('未取得有效的配置資料');
                return;
            }

            this.route = data.route[0]; // 使用第一個路由

            // 檢查時間有效性
            // if (!this.isValidTimeRange()) {
            //     console.log('當前時間不在有效範圍內，不顯示組件');
            //     return;
            // }

            // 檢查狀態
            if (!this.config.status) {
                console.log('組件狀態為關閉，不顯示', this.config);
                return;
            }

            // 載入相應的組件
            await this.loadComponent();

            this.isInitialized = true;
            console.log('InfMarketingComponentManager 初始化完成');

        } catch (error) {
            console.error('InfMarketingComponentManager 初始化失敗:', error);
        }
    }

    /**
     * 取得營銷資料
     * @param {string} brand 品牌名稱（必填）
     * @param {string} [url] 網址（非必填，預設 currentUrl）
     * @returns {Promise<Object>} 回傳營銷配置和路由資料
     */
    async fetchMarketingData(brand, url) {
        try {
            const currentUrl = decodeURI(document.location.href.split('//')[1].toLowerCase())

            const requestData = {
                Brand: brand,
                url: url && typeof url === 'string' && url.trim() ? url : currentUrl
            };

            const response = await fetch('https://api.inffits.com/httpmpi/mkt_products_involve', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(requestData)
            });

            if (!response.ok) {
                throw new Error(`API 請求失敗: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            return data;

        } catch (error) {
            console.error('取得資料失敗:', error);
            throw error;
        }
    }

    /**
     * 檢查時間有效性
     * @returns {boolean} 是否在有效時間範圍內
     */
    isValidTimeRange() {
        if (!this.config.TimeValid || this.config.TimeValid.length < 2) {
            return true; // 如果沒有設定時間限制，則視為有效
        }

        const now = new Date();
        const startDate = new Date(this.config.TimeValid[0]);
        const endDate = new Date(this.config.TimeValid[1]);

        return now >= startDate && now <= endDate;
    }

    /**
     * 確保模態框組件已載入
     * @returns {Promise<void>}
     */
    async ensureModalComponentLoaded() {
        return new Promise((resolve, reject) => {
            // 檢查是否已經載入模態框組件
            if (typeof window.InfMarketingModalComponent !== 'undefined') {
                resolve();
                return;
            }

            // 嘗試動態載入模態框組件
            const script = document.createElement('script');
            script.src = './inf-marketing-modal-component.js';
            script.onload = () => {
                resolve();
            };
            script.onerror = () => {
                console.error('模態框組件載入失敗');
                reject(new Error('無法載入模態框組件'));
            };

            document.head.appendChild(script);
        });
    }

    /**
     * 載入相應的組件
     * @returns {Promise<void>}
     */
    async loadComponent() {
        const bannerType = this.config.BannerType;
        let componentScript = '';
        let componentTagName = '';

        // 根據 BannerType 決定載入哪個組件
        switch (bannerType) {
            case 'TinyPopupBanner':
                componentScript = './inf-marketing-popup-banner-component.js';
                componentTagName = 'inf-marketing-popup-banner';
                break;
            case 'SquareCardBanner':
                componentScript = './inf-marketing-square-card-banner-component.js';
                componentTagName = 'inf-marketing-square-card-banner';
                break;
            case 'FloatButton':
                componentScript = './inf-marketing-floating-button-component.js';
                componentTagName = 'inf-marketing-floating-button';
                break;
            default:
                console.warn(`未知的 BannerType: ${bannerType}`);
                return;
        }

        try {
            // 載入組件腳本
            await this.loadScript(componentScript);

            // 等待組件註冊完成
            await this.waitForCustomElement(componentTagName);

            // 創建並配置組件
            await this.createAndConfigureComponent(componentTagName);

        } catch (error) {
            console.error('載入組件失敗:', error);
        }
    }

    /**
     * 載入腳本
     * @param {string} src 腳本路徑
     * @returns {Promise<void>}
     */
    loadScript(src) {
        return new Promise((resolve, reject) => {
            // 檢查是否已經載入
            const existingScript = document.querySelector(`script[src="${src}"]`);
            if (existingScript) {
                resolve();
                return;
            }

            const script = document.createElement('script');
            script.src = src;
            script.onload = () => {
                resolve();
            };
            script.onerror = () => {
                console.error(`腳本載入失敗: ${src}`);
                reject(new Error(`無法載入腳本: ${src}`));
            };

            document.head.appendChild(script);
        });
    }

    /**
     * 等待自定義元素註冊完成
     * @param {string} tagName 元素標籤名
     * @returns {Promise<void>}
     */
    waitForCustomElement(tagName) {
        return new Promise((resolve) => {
            if (customElements.get(tagName)) {
                resolve();
                return;
            }

            const checkInterval = setInterval(() => {
                if (customElements.get(tagName)) {
                    clearInterval(checkInterval);
                    resolve();
                }
            }, 100);
        });
    }

    /**
     * 創建並配置組件
     * @param {string} componentTagName 組件標籤名
     * @returns {Promise<void>}
     */
    async createAndConfigureComponent(componentTagName) {
        // 移除現有組件
        if (this.currentComponent) {
            this.currentComponent.remove();
        }

        // 創建新組件
        this.currentComponent = document.createElement(componentTagName);

        // 根據組件類型進行不同的配置
        if (componentTagName === 'inf-marketing-popup-banner') {
            this.configurePopupBanner();
        } else if (componentTagName === 'inf-marketing-square-card-banner') {
            await this.configureSquareCardBanner();
        } else if (componentTagName === 'inf-marketing-floating-button') {
            this.configureFloatingButton();
        }

        // 設置模態框 iframe 配置
        await this.setupModalIframe();

        // 綁定事件
        this.bindComponentEvents();

        // 添加到頁面
        document.body.appendChild(this.currentComponent);

    }

    /**
     * 配置彈窗橫幅組件
     */
    configurePopupBanner() {
        // 設置屬性
        this.currentComponent.setAttribute('position', this.config.Location || 'RightDown');
        this.currentComponent.setAttribute('title', this.config.Title || '精選購物之旅');
        this.currentComponent.setAttribute('description', this.config.Description || '找到您的個人化專屬商品');
        this.currentComponent.setAttribute('button-text', this.config.CTA_text || '立即開始');
        this.currentComponent.setAttribute('button-color', this.config.CTA_background || '#000000FF');
        this.currentComponent.setAttribute('button-text-color', this.config.CTA_color || '#FFFFFFFF');
        
        // 設置 iframe 相關屬性
        if (this.route) {
            this.currentComponent.setAttribute('iframe-id', this.route.Route);
        }
        if (this.brand) {
            this.currentComponent.setAttribute('brand', this.brand);
        }
    }

    /**
     * 配置方形卡片橫幅組件
     */
    async configureSquareCardBanner() {
        this.currentComponent.setAttribute('position', this.config.Location || 'RightDown');
        this.currentComponent.setAttribute('width', '300px');
        this.currentComponent.setAttribute('height', '300px');
        this.currentComponent.setAttribute('auto-show', 'true');
        this.currentComponent.setAttribute('show-arrows', 'false');
        this.currentComponent.setAttribute('autoplay-speed', '3000');
        
        // 設置 iframe 相關屬性
        if (this.route) {
            this.currentComponent.setAttribute('iframe-id', this.route.Route);
        }
        if (this.brand) {
            this.currentComponent.setAttribute('brand', this.brand);
        }

        // 等待 custom element 註冊完成再設置圖片
        await customElements.whenDefined('inf-marketing-square-card-banner');
        if (Array.isArray(this.config.CardOptions) && this.config.CardOptions.length > 0) {
            if (this.currentComponent.setImages) {
                this.currentComponent.setImages(this.config.CardOptions);
            }
        } else {
            const imageData = [
                {
                    image: 'https://via.placeholder.com/300x300/667eea/ffffff?text=智慧選物',
                    Title: '智慧選物',
                    url: null
                },
                {
                    image: 'https://via.placeholder.com/300x300/764ba2/ffffff?text=官網特惠',
                    Title: '官網特惠',
                    url: ''
                }
            ];
            if (this.currentComponent.setImages) {
                this.currentComponent.setImages(imageData);
            }
        }
    }

    /**
     * 配置浮動按鈕組件
     */
    configureFloatingButton() {
        // 設置位置屬性
        this.currentComponent.setAttribute('position', this.config.Location || 'LeftDown');
        
        // 設置 iframe 相關屬性
        if (this.route) {
            this.currentComponent.setAttribute('iframe-id', this.route.Route);
        }
        if (this.brand) {
            this.currentComponent.setAttribute('brand', this.brand);
        }
    }

    /**
     * 設置模態框 iframe 配置
     */
    async setupModalIframe() {
        if (!this.route) return;

        // 確定 iframe URL
        const iframeUrl = this.route.RouteDisplayMode === 'media' ?
            'https://ts-iframe-v2.vercel.app/iframe_container_module.html':
            'https://ts-iframe-no-media.vercel.app/iframe_container_module.html'
            ;
        
        // 設置組件的 iframe URL
        if (this.currentComponent.setModalIframeUrl) {
            this.currentComponent.setModalIframeUrl(iframeUrl);
        }

        // 等待模態框組件註冊完成
        await this.waitForCustomElement('inf-marketing-modal');

        // 尋找或創建模態框組件並配置
        let modal = document.querySelector('#inf-smart-selection-modal');
        if (!modal) {
            modal = document.createElement('inf-marketing-modal');
            modal.id = 'inf-smart-selection-modal';
            document.body.appendChild(modal);
            
            // 等待元素完全添加到 DOM
            await this.waitForElementInDOM(modal);
        }

        if (modal.setIframeConfig) {
            modal.setIframeConfig({
                id: this.route.Route,
                brand: this.brand, // 修改：使用保存的品牌參數
                header: 'from_preview'
            });
        }

        if (modal.setIframeUrl) {
            modal.setIframeUrl(iframeUrl);
        }

        this.modal = modal;
    }

    /**
     * 等待元素完全添加到 DOM
     * @param {HTMLElement} element 要等待的元素
     * @returns {Promise<void>}
     */
    waitForElementInDOM(element) {
        return new Promise((resolve) => {
            // 使用 MutationObserver 監聽 DOM 變化
            const observer = new MutationObserver((mutations) => {
                for (const mutation of mutations) {
                    if (mutation.type === 'childList') {
                        for (const node of mutation.addedNodes) {
                            if (node === element || (node.contains && node.contains(element))) {
                                observer.disconnect();
                                resolve();
                                return;
                            }
                        }
                    }
                }
            });

            // 開始監聽
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });

            // 如果元素已經在 DOM 中，立即解析
            if (document.body.contains(element)) {
                observer.disconnect();
                resolve();
            }
        });
    }

    /**
     * 綁定組件事件
     */
    bindComponentEvents() {
        if (!this.currentComponent) return;

        // 綁定關閉事件
        this.currentComponent.addEventListener('inf-marketing-popup-banner-close', this.handleComponentClose);
        this.currentComponent.addEventListener('inf-marketing-square-card-banner-hide', this.handleComponentClose);

        // 綁定點擊事件（方形卡片橫幅）
        this.currentComponent.addEventListener('inf-marketing-square-card-banner-click', (event) => {
        });

        // 綁定顯示事件
        this.currentComponent.addEventListener('inf-marketing-popup-banner-show', () => {
        });

        this.currentComponent.addEventListener('inf-marketing-square-card-banner-show', () => {
        });
    }

    /**
     * 處理組件關閉事件
     */
    handleComponentClose() {
        if (this.currentComponent) {
            this.currentComponent.remove();
            this.currentComponent = null;
        }
    }

    /**
     * 手動顯示組件（用於測試或特殊需求）
     */
    showComponent() {
        if (this.currentComponent && this.currentComponent.show) {
            this.currentComponent.show();
        }
    }

    /**
     * 手動隱藏組件
     */
    hideComponent() {
        if (this.currentComponent && this.currentComponent.hide) {
            this.currentComponent.hide();
        }
    }

    /**
     * 銷毀管理器
     */
    destroy() {
        if (this.currentComponent) {
            this.currentComponent.remove();
        }
        if (this.modal) {
            this.modal.remove();
        }
        this.isInitialized = false;
    }
}

// 創建全域實例
window.infMarketingManager = new InfMarketingComponentManager();

// 提供手動初始化方法（用於測試或特殊需求）
window.initInfMarketing = (brand, url, config) => {
    if (window.infMarketingManager) {
        window.infMarketingManager.init(brand, url, config);
    } else {
        console.error('infMarketingManager 尚未載入');
    }
};

// 提供手動控制方法
window.showInfMarketing = () => {
    if (window.infMarketingManager) {
        window.infMarketingManager.showComponent();
    }
};

window.hideInfMarketing = () => {
    if (window.infMarketingManager) {
        window.infMarketingManager.hideComponent();
    }
};
