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
                        min-width:55px;
                        width: fit-content;
                        max-width: 120px;
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
                        min-width:50px;
                        width: fit-content;
                        max-width: 120px;
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
                .popup-content-container{
                    display: flex;
                    align-items: center;
                    padding: 8px;
                    padding-left: 0px;
                    gap: 4px;
                }
                .popup-content-image{
                display: flex;
                align-items: center;
                justify-content: center;
                height: 40px;
                width: 40px;
                }

                .popup-content {
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
                   min-width:60px;
                    width: fit-content;
                    max-width: 120px;
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
                    top: -32px;
                    right: 0px;
                    background-color: #d3d3d3;
                    border: none;
                    border-radius: 50%;
                    width: 28px;
                    height: 28px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #fff;
                    cursor: pointer;
                    transition: background-color 0.3s ease;
                    z-index: 10;
                    padding: 8px;
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
                     <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18M6 6L18 18" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </button>
        <div class="popup-content-container">
        <div class="popup-content-image">
<svg width="100%" height="100%" viewBox="0 0 37 32" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<rect width="37" height="32" fill="url(#pattern0_4706_65413)"/>
<defs>
<pattern id="pattern0_4706_65413" patternContentUnits="objectBoundingBox" width="1" height="1">
<use xlink:href="#image0_4706_65413" transform="matrix(0.00732936 0 0 0.00847458 -0.00572607 0)"/>
</pattern>
<image id="image0_4706_65413" width="138" height="118" preserveAspectRatio="none" xlink:href="data:image/png;base64,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"/>
</defs>
</svg>
        </div>
                <div class="popup-content">
                    <h1>${this.config.title}</h1>
                    <p>${this.config.description}</p>
                </div>
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
            const defaultUrl = 'https://ts-iframe-no-media-git-feature-ve-1140cc-meis-projects-cf7f7626.vercel.app/iframe_container_module.html?v=v1';
            this.showSmartSelectionModal(this.modalIframeUrl || defaultUrl);
        });

        // 支援移動設備觸摸事件
        button.addEventListener('touchend', (e) => {
            e.preventDefault();
            const defaultUrl = 'https://ts-iframe-no-media-git-feature-ve-1140cc-meis-projects-cf7f7626.vercel.app/iframe_container_module.html?v=v1';
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