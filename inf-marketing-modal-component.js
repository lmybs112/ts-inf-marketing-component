/**
 * 智慧選物彈窗 Web Component
 * 
 * 使用方式：
 * <inf-marketing-modal id="myModal" width="480" height="480">
 *   <div slot="content">彈窗內容</div>
 * </inf-marketing-modal>
 * 
 * 或透過 JavaScript：
 * const modal = document.querySelector('#myModal');
 * 
 * // 設置 iframe 配置（可選）
 * modal.setIframeConfig({
 *   id: '2025-05-29-18-00-13-2',
 *   brand: 'ALMI'
 * });
 * 
 * // 或分別設置
 * modal.setIframeId('custom-id-123');
 * modal.setIframeBrand('MyBrand');
 * 
 * // 顯示帶 iframe 的彈窗
 * modal.setIframeUrl('https://example.com');
 * modal.show();
 * 
 * // 或直接顯示並設置 iframe
 * modal.show('https://example.com');
 */

const componentName = 'inf-marketing-modal';

// 創建 HTML 模板
const template = document.createElement('template');
template.innerHTML = /*html*/`
    <style>
        :host {
            --modal-width: 480px;
            --modal-height: 480px;
            --modal-background: transparent;
            --modal-border-radius: 28px;
            --modal-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            --overlay-background: rgba(0, 0, 0, 0.7);
            --close-button-size: 36px;
            --close-button-background: rgba(0, 0, 0, 0.6);
            --close-button-hover-background: rgba(255, 255, 255, 0.9);
            
            /* 修復定位問題：移除 contain 屬性，使用強制定位 */
            display: block;
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            pointer-events: none;
            z-index: 20000 !important;
        }

        .modal-container {
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 100% !important;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            pointer-events: auto;
        }

        .modal-container.show {
            opacity: 1;
            visibility: visible;
        }

        .modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--overlay-background);
            backdrop-filter: blur(5px);
            cursor: pointer;
        }

        .modal-wrapper {
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: auto;
            height: auto;
        }

        .modal-content {
            position: relative;
            background: var(--modal-background);
            border-radius: var(--modal-border-radius);
            padding: 0;
            width: var(--modal-width);
            height: var(--modal-height);
            overflow: hidden;
            transform: scale(0.7) translateY(50px);
            transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            box-shadow: var(--modal-shadow);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }

        .modal-container.show .modal-content {
            transform: scale(1) translateY(0);
        }

        .modal-close-btn {
            position: absolute;
            left: 50%;
            top: 100%;
            transform: translate(-50%, 16px); /* 距離彈窗底部 16px */
            background: var(--close-button-background);
            border: none;
            font-size: 20px;
            color: #fff;
            cursor: pointer;
            border-radius: 50%;
            width: var(--close-button-size);
            height: var(--close-button-size);
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            z-index: 15;
            backdrop-filter: blur(10px);
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            border: 2px solid rgba(255, 255, 255, 0.2);
        }

        .modal-close-btn:hover {
            background: var(--close-button-hover-background);
            color: #333;
            border-color: rgba(255, 255, 255, 0.4);
            box-shadow: 0 6px 25px rgba(0, 0, 0, 0.4);
        }

        .modal-body {
            width: 100%;
            height: 100%;
            position: relative;
        }

        .iframe-container {
            width: 100%;
            height: 100%;
            border-radius: var(--modal-border-radius);
            overflow: hidden;
        }

        .iframe-container iframe {
            width: 100%;
            height: 100%;
            border: none;
            border-radius: var(--modal-border-radius);
        }

        .content-slot {
            width: 100%;
            height: 100%;
            overflow: auto;
            padding: 20px;
            box-sizing: border-box;
        }

        /* 響應式設計 */
        @media (max-width: 480px) {
            :host {
                --modal-width: 355px;
                --modal-height: 355px;
                --close-button-size: 32px;
            }
            .modal-content {
                margin: 0;
                left: 0;
                top: 0;
                right: 0;
                bottom: 0;
                /* 保持 flex 置中 */
            }
            .modal-close-btn {
                left: 50%;
                top: 100%;
                transform: translate(-50%, 12px); /* 手機版距離底部 12px */
            }
        }

        @media (max-width: 360px) {
            :host {
                --modal-width: 320px;
                --modal-height: 320px;
                --close-button-size: 28px;
            }
            .modal-content {
                margin: 0;
            }
            .modal-close-btn {
                left: 50%;
                top: 100%;
                transform: translate(-50%, 8px); /* 小手機版距離底部 8px */
            }
        }
    </style>
    
    <div class="modal-container" id="modal-container">
        <div class="modal-overlay" id="modal-overlay"></div>
        <div class="modal-wrapper">
            <div class="modal-content" id="modal-content">
                <div class="modal-body" id="modal-body">
                    <!-- iframe 容器，預設隱藏 -->
                    <div class="iframe-container" id="iframe-container" style="display: none;">
                        <!-- iframe 會在這裡動態創建 -->
                    </div>
                    <!-- slot 內容容器 -->
                    <div class="content-slot" id="content-slot">
                        <slot name="content"></slot>
                    </div>
                </div>
            </div>
            <!-- 關閉按鈕相對於彈窗定位 -->
            <button class="modal-close-btn" type="button" title="關閉" id="close-btn">×</button>
        </div>
    </div>
`;

/**
 * 智慧選物彈窗組件類別
 * @extends HTMLElement
 */
class InfMarketingModalComponent extends HTMLElement {
    constructor() {
        super();
        
        // 附加 shadow DOM
        this.attachShadow({ mode: 'open', delegatesFocus: true })
            .append(template.content.cloneNode(true));

        // jQuery 風格的選擇器
        this.$ = this.shadowRoot.querySelector.bind(this.shadowRoot);
        this.$$ = this.shadowRoot.querySelectorAll.bind(this.shadowRoot);

        // 內部狀態
        this.isVisible = false;
        this.currentIframeUrl = null;
        
        // iframe 配置參數
        this.iframeConfig = {
            id: '',
            brand: '',
            header: 'from_preview'
        };

        // 派發構造完成事件
        this.dispatchEvent(new Event(`${componentName}:construction`, { bubbles: true, composed: true }));
    }

    static get observedAttributes() {
        return ['width', 'height', 'overlay-color', 'border-radius'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) return;

        const modalContent = this.$('#modal-content');
        if (!modalContent) return;

        switch (name) {
            case 'width':
                modalContent.style.setProperty('--modal-width', newValue || '480px');
                break;
            case 'height':
                modalContent.style.setProperty('--modal-height', newValue || '480px');
                break;
            case 'overlay-color':
                const overlay = this.$('#modal-overlay');
                if (overlay) {
                    overlay.style.background = newValue || 'rgba(0, 0, 0, 0.7)';
                }
                break;
            case 'border-radius':
                modalContent.style.setProperty('--modal-border-radius', newValue || '16px');
                break;
        }
    }

    connectedCallback() {
        this.bindEvents();
        
        // 派發連接完成事件
        this.dispatchEvent(new Event(`${componentName}:connected`, { bubbles: true, composed: true }));
    }

    disconnectedCallback() {
        // 清理資源
        this.hide();
        
        // 派發斷開連接事件
        this.dispatchEvent(new Event(`${componentName}:disconnected`, { bubbles: true, composed: true }));
    }

    /**
     * 綁定事件監聽器
     */
    bindEvents() {
        const closeBtn = this.$('#close-btn');
        const overlay = this.$('#modal-overlay');

        if (closeBtn) {
            const handleCloseClick = (e) => {
                e.stopPropagation();
                this.hide();
            };
            
            closeBtn.addEventListener('click', handleCloseClick);
            closeBtn.addEventListener('touchend', handleCloseClick, { passive: false });
        }

        if (overlay) {
            const handleOverlayClick = (e) => {
                if (e.target === overlay) {
                    this.hide();
                }
            };
            
            overlay.addEventListener('click', handleOverlayClick);
            overlay.addEventListener('touchend', handleOverlayClick, { passive: false });
        }

        // 鍵盤事件
        document.addEventListener('keydown', (e) => {
            if (this.isVisible && e.key === 'Escape') {
                this.hide();
            }
        });
    }

    /**
     * 顯示彈窗
     * @param {string} iframeUrl - 可選的 iframe URL
     */
    show(iframeUrl = null) {
        const modalContainer = this.$('#modal-container');
        if (!modalContainer) return;

        // 如果提供了 iframe URL，設置 iframe
        if (iframeUrl) {
            this.setIframeUrl(iframeUrl);
        }

        // 修復定位問題：啟用 :host 的 pointer-events
        this.style.pointerEvents = 'auto';
        
        // 顯示彈窗
        modalContainer.classList.add('show');
        this.isVisible = true;
        
        // 防止背景滾動
        document.body.style.overflow = 'hidden';

        // 派發顯示事件
        this.dispatchEvent(new CustomEvent(`${componentName}:show`, {
            bubbles: true,
            composed: true,
            detail: { iframeUrl: this.currentIframeUrl }
        }));
    }

    /**
     * 隱藏彈窗
     */
    hide() {
        const modalContainer = this.$('#modal-container');
        if (!modalContainer) return;

        modalContainer.classList.remove('show');
        this.isVisible = false;
        
        // 修復定位問題：禁用 :host 的 pointer-events
        this.style.pointerEvents = 'none';
        
        // 恢復背景滾動
        document.body.style.overflow = '';

        // 只隱藏 iframe 容器，不清空內容（保留以便重複使用）
        const iframeContainer = this.$('#iframe-container');
        if (iframeContainer) {
            iframeContainer.style.display = 'none';
        }

        // 派發隱藏事件
        this.dispatchEvent(new CustomEvent(`${componentName}:hide`, {
            bubbles: true,
            composed: true,
            detail: { iframeUrl: this.currentIframeUrl }
        }));
    }

    /**
     * 設置 iframe URL
     * @param {string} url - iframe 的 URL
     */
    setIframeUrl(url) {
        if (!url) return;

        const iframeContainer = this.$('#iframe-container');
        const contentSlot = this.$('#content-slot');
        
        if (!iframeContainer || !contentSlot) return;

        // 檢查是否已經有相同的 URL 的 iframe
        const existingIframe = iframeContainer.querySelector('iframe');
        if (existingIframe && existingIframe.src === url && this.currentIframeUrl === url) {
            // 如果 URL 相同且已存在，直接顯示現有的 iframe
            iframeContainer.style.display = 'block';
            contentSlot.style.display = 'none';
            
            // 派發 iframe 設置事件（重用現有 iframe，無需重新發送訊息）
            this.dispatchEvent(new CustomEvent(`${componentName}:iframe-set`, {
                bubbles: true,
                composed: true,
                detail: { url, reused: true }
            }));
            
            return;
        }

        // 清空容器並創建新的 iframe
        iframeContainer.innerHTML = '';
        
        const iframeElement = document.createElement('iframe');
        iframeElement.src = url;
        iframeElement.frameBorder = '0';
        iframeElement.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        iframeElement.allowFullscreen = true;
        
        // 添加 onload 事件處理器
        iframeElement.onload = () => {
            this.sendIframeMessage(iframeElement);
            
            // 派發 iframe 載入完成事件
            this.dispatchEvent(new CustomEvent(`${componentName}:iframe-loaded`, {
                bubbles: true,
                composed: true,
                detail: { 
                    url: url,
                    config: this.iframeConfig
                }
            }));
        };

        // 添加 onerror 事件處理器
        iframeElement.onerror = () => {
            // 派發 iframe 載入失敗事件
            this.dispatchEvent(new CustomEvent(`${componentName}:iframe-error`, {
                bubbles: true,
                composed: true,
                detail: { 
                    url: url,
                    config: this.iframeConfig
                }
            }));
        };
        
        // 將 iframe 添加到容器
        iframeContainer.appendChild(iframeElement);

        // 顯示 iframe 容器，隱藏 slot 內容
        iframeContainer.style.display = 'block';
        contentSlot.style.display = 'none';

        this.currentIframeUrl = url;

        // 派發 iframe 設置事件
        this.dispatchEvent(new CustomEvent(`${componentName}:iframe-set`, {
            bubbles: true,
            composed: true,
            detail: { url, reused: false }
        }));
    }

    /**
     * 向 iframe 發送配置訊息
     * @param {HTMLIFrameElement} iframeElement - iframe 元素
     */
    sendIframeMessage(iframeElement) {
        const iframe_container = iframeElement.contentWindow;
        const iframe_preview_obj = {
            id: this.iframeConfig.id,
            header: this.iframeConfig.header,
            brand: this.iframeConfig.brand,
        };
        
        try {
            iframe_container.postMessage(iframe_preview_obj, "*");
        } catch (error) {
            console.warn('無法向 iframe 發送訊息:', error);
        }
    }

    /**
     * 清空 iframe 內容
     * 注意：此方法會完全清空 iframe，建議只在需要強制重新載入時使用
     * 一般情況下，hide() 方法只會隱藏 iframe，保留內容以便重複使用
     */
    clearIframe() {
        const iframeContainer = this.$('#iframe-container');
        const contentSlot = this.$('#content-slot');
        
        if (!iframeContainer || !contentSlot) return;

        // 清空 iframe
        iframeContainer.innerHTML = '';
        iframeContainer.style.display = 'none';
        
        // 顯示 slot 內容
        contentSlot.style.display = 'block';

        this.currentIframeUrl = null;
        
        // 派發 iframe 清空事件
        this.dispatchEvent(new CustomEvent(`${componentName}:iframe-cleared`, {
            bubbles: true,
            composed: true
        }));
    }

    /**
     * 設置 iframe 配置參數
     * @param {Object} config - 配置對象
     * @param {string} config.id - iframe 訊息 ID
     * @param {string} config.brand - 品牌名稱
     * @param {string} config.header - 訊息標頭（默認為 'from_preview'）
     */
    setIframeConfig(config) {
        if (typeof config === 'object' && config !== null) {
            this.iframeConfig = {
                ...this.iframeConfig,
                ...config
            };
        }
    }

    /**
     * 獲取當前 iframe 配置
     * @returns {Object} 當前配置對象
     */
    getIframeConfig() {
        return { ...this.iframeConfig };
    }

    /**
     * 設置 iframe ID
     * @param {string} id - iframe 訊息 ID
     */
    setIframeId(id) {
        if (typeof id === 'string' && id.trim()) {
            this.iframeConfig.id = id.trim();
        }
    }

    /**
     * 設置品牌名稱
     * @param {string} brand - 品牌名稱
     */
    setIframeBrand(brand) {
        if (typeof brand === 'string' && brand.trim()) {
            this.iframeConfig.brand = brand.trim();
        }
    }

    /**
     * 切換彈窗顯示狀態
     */
    toggle() {
        if (this.isVisible) {
            this.hide();
        } else {
            this.show();
        }
    }

    /**
     * 獲取當前顯示狀態
     * @returns {boolean}
     */
    get visible() {
        return this.isVisible;
    }

    /**
     * 獲取當前 iframe URL
     * @returns {string|null}
     */
    get iframeUrl() {
        return this.currentIframeUrl;
    }
}

// 註冊 Web Component
if (!customElements.get(componentName)) {
    customElements.define(componentName, InfMarketingModalComponent);
}

// 全域註冊，方便動態創建
window.InfMarketingModalComponent = InfMarketingModalComponent; 