class InfMarketingPopupBannerComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.config = {
            position: 'RightDown', // 'LeftDown', 'RightDown', 'CenterDown', 'Center'
            title: '精選購物之旅',
            description: '找到您的個人化專屬商品',
            buttonText: '立即開始',
            buttonColor: '#ddd',
            buttonTextColor: '#1E1E19'
        };
        this.modalIframeUrl = null; // 智慧選物彈窗的 iframe URL
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    static get observedAttributes() {
        return ['position', 'title', 'description', 'button-text', 'button-color', 'button-text-color'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            switch (name) {
                case 'position':
                    this.config.position = newValue;
                    break;
                case 'title':
                    this.config.title = newValue;
                    break;
                case 'description':
                    this.config.description = newValue;
                    break;
                case 'button-text':
                    this.config.buttonText = newValue;
                    break;
                case 'button-color':
                    this.config.buttonColor = newValue;
                    break;
                case 'button-text-color':
                    this.config.buttonTextColor = newValue;
                    break;
            }
            this.render();
            this.setupEventListeners(); // 重新渲染後重新綁定事件監聽器
        }
    }

    getPositionStyles() {
        const positions = {
            'RightDown': {
                bottom: '20px',
                right: '20px',
                left: 'auto',
                top: 'auto',
                transform: 'none'
            },
            'LeftDown': {
                bottom: '20px',
                left: '20px',
                right: 'auto',
                top: 'auto',
                transform: 'none'
            },
            'CenterDown': {
                bottom: '20px',
                left: '50%',
                right: 'auto',
                top: 'auto',
                transform: 'translateX(-50%)'
            },
            'Center': {
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                transform: 'translate(-50%, -50%)'
            }
        };
        return positions[this.config.position] || positions['RightDown'];
    }

    getAnimationName() {
        const animations = {
            'RightDown': 'popupEnterBottomRight',
            'LeftDown': 'popupEnterBottomLeft',
            'CenterDown': 'popupEnterBottomCenter',
            'Center': 'popupEnterCenter'
        };
        return animations[this.config.position] || 'popupEnterBottomRight';
    }

    render() {
        const positionStyles = this.getPositionStyles();
        const animationName = this.getAnimationName();
        
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                }

                .popup-container {
                    border-radius: 12px;
                    background: #FCFCF8;
                    box-shadow: 0px 0px 18px 0px rgba(0, 0, 0, 0.15), 0px 0px 2px 0px rgba(0, 0, 0, 0.08), 0px 0px 1px 0px rgba(0, 0, 0, 0.15);
                    width: 368px;
                    max-width: calc(100vw - 40px); /* 確保兩側各有 20px 邊距 */
                    position: fixed;
                    bottom: ${positionStyles.bottom};
                    right: ${positionStyles.right};
                    left: ${positionStyles.left};
                    top: ${positionStyles.top};
                    transform: ${positionStyles.transform};
                    z-index: 9999;
                    display: flex;
                    justify-content: space-between;
                    padding: 10px;
                    
                    /* 添加動畫效果 */
                    animation: ${animationName} 2.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards, 
                               continuousFloat 8s ease-in-out infinite 3s;
                    opacity: 0;
                }

                /* 手機版響應式設計 */
                @media (max-width: 480px) {
                    .popup-container {
                        width: 300px;
                        max-width: calc(100vw - 20px); /* 手機版兩側各 10px 邊距 */
                        padding: 8px;
                        border-radius: 10px;
                    }
                    
                    .popup-content {
                        padding: 6px;
                        gap: 3px;
                    }
                    
                    .popup-content h1 {
                        font-size: 14px;
                        line-height: 18px;
                        letter-spacing: 0.6px;
                    }
                    
                    .popup-content p {
                        font-size: 11px;
                        line-height: 14px;
                    }
                    
                    .inf-marketing-popup-banner {
                        font-size: 14px;
                        line-height: 18px;
                        letter-spacing: 0.6px;
                        padding: 8px 12px;
                        min-width: 55px;
                    }
                    
                    .close-button {
                        width: 22px;
                        height: 22px;
                        top: -26px;
                    }
                    
                    .close-button svg {
                        width: 16px;
                        height: 16px;
                    }
                }

                @media (max-width: 360px) {
                    .popup-container {
                        width: 280px;
                        max-width: calc(100vw - 16px); /* 小手機版兩側各 8px 邊距 */
                        padding: 6px;
                        border-radius: 8px;
                    }
                    
                    .popup-content {
                        padding: 4px;
                        gap: 2px;
                    }
                    
                    .popup-content h1 {
                        font-size: 13px;
                        line-height: 16px;
                        letter-spacing: 0.5px;
                    }
                    
                    .popup-content p {
                        font-size: 10px;
                        line-height: 12px;
                    }
                    
                    .inf-marketing-popup-banner {
                        font-size: 13px;
                        line-height: 16px;
                        letter-spacing: 0.5px;
                        padding: 6px 10px;
                        min-width: 50px;
                    }
                    
                    .close-button {
                        width: 20px;
                        height: 20px;
                        top: -24px;
                    }
                    
                    .close-button svg {
                        width: 14px;
                        height: 14px;
                    }
                }

                /* 手機版定位調整 */
                @media (max-width: 480px) {
                    .popup-container {
                        /* 右下角定位調整 */
                        right: 10px !important;
                        bottom: 10px !important;
                    }
                    
                    /* 當定位為左下時 */
                    .popup-container[data-position="LeftDown"] {
                        left: 10px !important;
                        right: auto !important;
                        bottom: 10px !important;
                    }
                    
                    /* 當定位為正下方時 */
                    .popup-container[data-position="CenterDown"] {
                        left: 50% !important;
                        right: auto !important;
                        bottom: 10px !important;
                        transform: translateX(-50%) !important;
                    }
                    
                    /* 當定位為正中間時 */
                    .popup-container[data-position="Center"] {
                        top: 50% !important;
                        left: 50% !important;
                        right: auto !important;
                        bottom: auto !important;
                        transform: translate(-50%, -50%) !important;
                    }
                }

                @media (max-width: 360px) {
                    .popup-container {
                        /* 小手機版進一步調整邊距 */
                        right: 8px !important;
                        bottom: 8px !important;
                    }
                    
                    .popup-container[data-position="LeftDown"] {
                        left: 8px !important;
                        bottom: 8px !important;
                    }
                    
                    .popup-container[data-position="CenterDown"] {
                        bottom: 8px !important;
                    }
                }

                .popup-content {
                    padding: 8px;
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                }

                .popup-content h1 {
                    color: #1E1E19;
                    font-family: "Noto Sans TC";
                    font-size: 15px;
                    font-style: normal;
                    font-weight: 700;
                    line-height: 20px;
                    letter-spacing: 0.9px;
                    margin: 0;
                }

                .popup-content p {
                    color: #1E1E19;
                    font-family: "Noto Sans TC";
                    font-size: 12px;
                    font-style: normal;
                    font-weight: 400;
                    margin: 0;
                }

                .inf-marketing-popup-banner {
                    min-width: 60px;
                    width: fit-content;
                    border-radius: 8px;
                    border: none;
                    background-color: ${this.config.buttonColor};
                    color: ${this.config.buttonTextColor};
                    font-family: "Noto Sans TC";
                    font-size: 15px;
                    font-style: normal;
                    font-weight: 700;
                    line-height: 20px;
                    letter-spacing: 0.9px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .inf-marketing-popup-banner:hover {
                    opacity: 0.8;
                    transform: translateY(-1px);
                }

                .close-button {
                    position: absolute;
                    top: -30px;
                    right: 0px;
                    background-color: #d3d3d3;
                    border: none;
                    border-radius: 50%;
                    width: 24px;
                    height: 24px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 24px;
                    color: #fff;
                    cursor: pointer;
                    transition: background-color 0.3s ease;
                    z-index: 10;
                }

                .close-button:hover {
                    background-color:rgb(178, 178, 178);
                }

                /* 添加懸浮動畫效果 */
                .popup-container::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    border-radius: 12px;
                    background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
                    pointer-events: none;
                    animation: popupGlow 6s ease-in-out infinite;
                }

                /* 輕微發光效果 */
                @keyframes popupGlow {
                    0%, 100% {
                        box-shadow: 0 0 15px rgba(252, 252, 248, 0.2);
                    }
                    50% {
                        box-shadow: 0 0 25px rgba(252, 252, 248, 0.4);
                    }
                }

                /* 添加連續的輕微浮動效果 */
                @keyframes continuousFloat {
                    0%, 100% {
                        transform: ${positionStyles.transform === 'none' ? 'translateY(0)' : positionStyles.transform + ' translateY(0)'};
                    }
                    50% {
                        transform: ${positionStyles.transform === 'none' ? 'translateY(-2px)' : positionStyles.transform + ' translateY(-2px)'};
                    }
                }

                /* 從右下角進入動畫 */
                @keyframes popupEnterBottomRight {
                    0% {
                        transform: translateY(120px);
                        opacity: 0;
                    }
                    30% {
                        transform: translateY(80px);
                        opacity: 0.3;
                    }
                    60% {
                        transform: translateY(-8px);
                        opacity: 0.8;
                    }
                    80% {
                        transform: translateY(4px);
                        opacity: 0.95;
                    }
                    100% {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }

                /* 從左下角進入動畫 */
                @keyframes popupEnterBottomLeft {
                    0% {
                        transform: translateY(120px);
                        opacity: 0;
                    }
                    30% {
                        transform: translateY(80px);
                        opacity: 0.3;
                    }
                    60% {
                        transform: translateY(-8px);
                        opacity: 0.8;
                    }
                    80% {
                        transform: translateY(4px);
                        opacity: 0.95;
                    }
                    100% {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }

                /* 從正下方進入動畫 */
                @keyframes popupEnterBottomCenter {
                    0% {
                        transform: translateX(-50%) translateY(120px);
                        opacity: 0;
                    }
                    30% {
                        transform: translateX(-50%) translateY(80px);
                        opacity: 0.3;
                    }
                    60% {
                        transform: translateX(-50%) translateY(-8px);
                        opacity: 0.8;
                    }
                    80% {
                        transform: translateX(-50%) translateY(4px);
                        opacity: 0.95;
                    }
                    100% {
                        transform: translateX(-50%) translateY(0);
                        opacity: 1;
                    }
                }

                /* 從正中間進入動畫 */
                @keyframes popupEnterCenter {
                    0% {
                        transform: translate(-50%, -50%) scale(0.8);
                        opacity: 0;
                    }
                    30% {
                        transform: translate(-50%, -50%) scale(0.9);
                        opacity: 0.3;
                    }
                    60% {
                        transform: translate(-50%, -50%) scale(1.05);
                        opacity: 0.8;
                    }
                    80% {
                        transform: translate(-50%, -50%) scale(0.98);
                        opacity: 0.95;
                    }
                    100% {
                        transform: translate(-50%, -50%) scale(1);
                        opacity: 1;
                    }
                }
            </style>
            <div class="popup-container" data-position="${this.config.position}">
                <button class="close-button" title="關閉">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
                <div class="popup-content">
                    <h1>${this.config.title}</h1>
                    <p>${this.config.description}</p>
                </div>
                <button class="inf-marketing-popup-banner">
                    ${this.config.buttonText}
                </button>
            </div>
        `;
    }

    setupEventListeners() {
        const button = this.shadowRoot.querySelector('.inf-marketing-popup-banner');
        button.addEventListener('click', () => {
            // 使用預設的智慧選物 URL
            const defaultUrl = 'https://ts-iframe-no-media.vercel.app/iframe_container_module.html';
            this.showSmartSelectionModal(this.modalIframeUrl || defaultUrl);
        });

        // 支援移動設備觸摸事件
        button.addEventListener('touchend', (e) => {
            e.preventDefault();
            const defaultUrl = 'https://ts-iframe-no-media.vercel.app/iframe_container_module.html';
            this.showSmartSelectionModal(this.modalIframeUrl || defaultUrl);
        }, { passive: false });

        const closeButton = this.shadowRoot.querySelector('.close-button');
        closeButton.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('inf-marketing-popup-banner-close'));
        });

        // 支援移動設備觸摸事件
        closeButton.addEventListener('touchend', (e) => {
            e.preventDefault();
            this.dispatchEvent(new CustomEvent('inf-marketing-popup-banner-close'));
        }, { passive: false });
    }

    // 顯示智慧選物彈窗（與 square card banner 組件完全相同）
    showSmartSelectionModal(iframeUrl = null) {
        // 尋找或創建獨立的彈窗組件
        let modal = document.querySelector('#inf-smart-selection-modal');
        
        if (!modal) {
            // 檢查是否已載入彈窗組件
            if (typeof window.InfMarketingModalComponent === 'undefined') {
                console.error('inf-marketing-modal-component.js 尚未載入，請確保已引入該檔案');
                return;
            }
            
            // 動態創建彈窗組件
            modal = document.createElement('inf-marketing-modal');
            modal.id = 'inf-smart-selection-modal';
            
            // 添加默認內容
            modal.innerHTML = `
                <div slot="content">
                    <div style="padding: 40px; text-align: center; color: #333;">
                        <h2 style="margin: 0 0 20px 0; color: #667eea;">🎯 智慧選物</h2>
                        <p style="margin: 0 0 15px 0; line-height: 1.6;">正在載入智慧選物介面...</p>
                        <div style="background: #f8f9fa; border-radius: 8px; padding: 20px; margin: 20px 0;">
                            <p style="margin: 0; font-size: 14px; color: #6c757d;">
                                💡 提示：如果看到此訊息，表示彈窗功能正常，但尚未設置 iframe URL。
                            </p>
                        </div>
                        <p style="margin: 15px 0 0 0; font-size: 12px; color: #aaa;">
                            請聯繫管理員設置智慧選物頁面 URL
                        </p>
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
        }
        
        // 設置 iframe 配置參數（如果組件支援）
        if (modal.setIframeConfig && typeof modal.setIframeConfig === 'function') {
            modal.setIframeConfig({
                id: this.getAttribute('iframe-id') || '',
                brand: this.getAttribute('brand') || '',
                header: 'from_preview'
            });
        }
        
        // 確保組件已完全初始化後再調用方法
        if (modal.show && typeof modal.show === 'function') {
            // 統一透過 setIframeUrl 方法設置 iframe，然後顯示彈窗
            if (iframeUrl && modal.setIframeUrl && typeof modal.setIframeUrl === 'function') {
                modal.setIframeUrl(iframeUrl);
            }
            modal.show();
        } else {
            // 如果組件還沒完全載入，等待一段時間後重試
            setTimeout(() => {
                // 設置 iframe 配置參數（重試時）
                if (modal.setIframeConfig && typeof modal.setIframeConfig === 'function') {
                    modal.setIframeConfig({
                        id: this.getAttribute('iframe-id') || '',
                        brand: this.getAttribute('brand') || '',
                        header: 'from_preview'
                    });
                }
                
                if (modal.show && typeof modal.show === 'function') {
                    if (iframeUrl && modal.setIframeUrl && typeof modal.setIframeUrl === 'function') {
                        modal.setIframeUrl(iframeUrl);
                    }
                    modal.show();
                } else {
                    console.error('彈窗組件初始化失敗，請檢查 inf-marketing-modal-component.js 是否正確載入');
                }
            }, 100);
        }
    }

    // 設置彈窗 iframe URL
    setModalIframeUrl(url) {
        // 儲存 URL 供後續使用
        this.modalIframeUrl = url;
        
        const modal = document.querySelector('#inf-smart-selection-modal');
        if (modal && modal.setIframeUrl && typeof modal.setIframeUrl === 'function') {
            modal.setIframeUrl(url);
        } else if (modal) {
            // 如果方法還沒載入，稍後重試
            setTimeout(() => {
                if (modal.setIframeUrl && typeof modal.setIframeUrl === 'function') {
                    modal.setIframeUrl(url);
                }
            }, 100);
        }
    }

    // 隱藏智慧選物彈窗
    hideSmartSelectionModal() {
        const modal = document.querySelector('#inf-smart-selection-modal');
        if (modal && modal.hide && typeof modal.hide === 'function') {
            modal.hide();
        } else if (modal) {
            // 如果方法還沒載入，稍後重試
            setTimeout(() => {
                if (modal.hide && typeof modal.hide === 'function') {
                    modal.hide();
                }
            }, 100);
        }
    }

    // 公開方法來更新配置
    updateConfig(newConfig) {
        this.config = { ...this.config, ...newConfig };
        this.render();
        this.setupEventListeners(); // 重新渲染後重新綁定事件監聽器
    }
}

customElements.define('inf-marketing-popup-banner', InfMarketingPopupBannerComponent);