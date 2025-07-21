class InfMarketingSquareCardBannerComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: 'open'
        });
        this.imageData = [];
        this.currentIndex = 0;
        this.isVisible = false;
        this.isInitialized = false;
        this.autoplayTimer = null;
        this.modalIframeUrl = null; // 智慧選物彈窗的 iframe URL

        // 拖拽相關變數
        this.isDragging = false;
        this.startX = 0;
        this.currentX = 0;
        this.threshold = 50; // 拖拽觸發閾值
        this.dragStartTime = 0; // 觸摸開始時間
    }

    static get observedAttributes() {
        return ['position', 'images', 'width', 'height', 'auto-show', 'show-arrows', 'autoplay-speed'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue && this.isInitialized) {
            if (name === 'position' || name === 'width' || name === 'height') {
                this.updateStyles();
            } else if (name === 'images') {
                this.updateImages();
            } else if (name === 'show-arrows') {
                this.updateArrowsVisibility();
            } else if (name === 'autoplay-speed') {
                this.stopAutoplay();
                if (this.isVisible) {
                    this.startAutoplay();
                }
            }
        }
    }

    connectedCallback() {
        this.render();
        this.initializeComponent();
        this.adjustModalHeightForMobile(); // 新增：初始化時調整
        window.addEventListener('resize', this.adjustModalHeightForMobile.bind(this));
    }

    disconnectedCallback() {
        this.stopAutoplay();
        window.removeEventListener('resize', this.adjustModalHeightForMobile.bind(this)); // 清理事件
    }

    // 更新樣式
    updateStyles() {
        const infCard = this.shadowRoot.querySelector('#inf-marketing-square-card-banner');
        if (infCard) {
            const width = this.getAttribute('width') || '300px';
            const height = this.getAttribute('height') || '300px';
            const positionStyle = this.getPositionStyle();
            const positionTransform = this.getPositionTransform();
            const showTransform = this.getShowTransform();

            infCard.style.width = width;
            infCard.style.height = height;

            // 重新設置位置
            infCard.style.top = '';
            infCard.style.bottom = '';
            infCard.style.left = '';
            infCard.style.right = '';
            infCard.style.transform = '';

            const styleRules = positionStyle.split(';').filter(rule => rule.trim());
            styleRules.forEach(rule => {
                const [property, value] = rule.split(':').map(s => s.trim());
                if (property && value) {
                    infCard.style[property] = value;
                }
            });

            // 根據當前顯示狀態設置正確的 transform
            if (this.isVisible) {
                infCard.style.transform = showTransform;
            } else {
                infCard.style.transform = positionTransform;
            }
        }
    }

    // 更新圖片
    updateImages() {
        const imagesAttr = this.getAttribute('images');
        if (imagesAttr) {
            try {
                this.imageData = JSON.parse(imagesAttr);
                this.currentIndex = 0;
                this.createSlides();
                this.updateCounter();
            } catch (e) {
                console.error('圖片數據解析失敗:', e);
            }
        }
    }

    // 更新箭頭顯示狀態
    updateArrowsVisibility() {
        const showArrows = this.getAttribute('show-arrows') !== 'false';
        const navButtons = this.shadowRoot.querySelectorAll('.nav-button');

        navButtons.forEach(button => {
            button.style.display = showArrows ? 'flex' : 'none';
        });
    }

    // 設置圖片數據
    setImages(imageData) {
        if (!Array.isArray(imageData) || imageData.length === 0) {
            console.error('圖片數據格式錯誤');
            return;
        }

        this.imageData = imageData;
        this.currentIndex = 0;

        if (this.isInitialized) {
            this.createSlides();
            this.updateCounter();
            this.startAutoplay();
        }
    }

    // 顯示卡片
    show() {
        if (this.imageData.length === 0) {
            console.warn('沒有圖片數據');
            return;
        }

        const infCard = this.shadowRoot.querySelector('#inf-marketing-square-card-banner');
        if (!infCard) return;

        setTimeout(() => {
            infCard.classList.add('show');
            this.isVisible = true;
            this.startAutoplay();
            this.dispatchEvent(new CustomEvent('inf-marketing-square-card-banner-show'));
        }, 100);
    }

    // 隱藏卡片
    hide() {
        const infCard = this.shadowRoot.querySelector('#inf-marketing-square-card-banner');
        if (infCard) {
            infCard.classList.remove('show');
            this.isVisible = false;
            this.stopAutoplay();

            setTimeout(() => {
                this.dispatchEvent(new CustomEvent('inf-marketing-square-card-banner-hide'));
            }, 600);
        }
    }

    // 創建圖片slides
    createSlides() {
        const slideContainer = this.shadowRoot.querySelector('.slide-container');
        if (!slideContainer) return;

        slideContainer.innerHTML = '';

        this.imageData.forEach((item, index) => {
            const slide = document.createElement('div');
            slide.className = `slide ${index === 0 ? 'active' : ''}`;

            const img = document.createElement('img');
            img.src = item.image;
            img.loading = 'lazy';
            img.style.cssText = `
                width: 100%;
                height: 100%;
                object-fit: cover;
                display: block;
                cursor: pointer;
            `;

            // 處理圖片點擊事件的函數
            const handleImageClick = (e) => {
                e.stopPropagation();

                // 防止拖拽後的點擊事件
                if (this.isDragging || Math.abs(this.currentX - this.startX) > 5) {
                    return;
                }

                // 獲取當前顯示的圖片數據（而不是被點擊的圖片元素的索引）
                const currentItem = this.imageData[this.currentIndex];
                if (!currentItem) return;

                // 根據當前顯示圖片的 Title 判斷是否為智慧選物
                if (currentItem.Title === '智慧選物') {
                    // 使用預設的智慧選物 URL 或現有的 iframe URL
                    const defaultUrl = 'https://ts-iframe-no-media.vercel.app/iframe_container_module.html';
                    this.showSmartSelectionModal(this.modalIframeUrl || defaultUrl);
                    this.dispatchEvent(new CustomEvent('inf-marketing-square-card-banner-click', {
                        detail: {
                            image: currentItem.image,
                            title: currentItem.Title,
                            index: this.currentIndex,
                            action: 'modal'
                        }
                    }));
                } else if (currentItem.url) {
                    window.open(currentItem.url, '_blank');
                    this.dispatchEvent(new CustomEvent('inf-marketing-square-card-banner-click', {
                        detail: {
                            image: currentItem.image,
                            url: currentItem.url,
                            title: currentItem.Title,
                            index: this.currentIndex,
                            action: 'navigate'
                        }
                    }));
                } else {
                    // 如果沒有 URL，也觸發一個一般性的點擊事件
                    this.dispatchEvent(new CustomEvent('inf-marketing-square-card-banner-click', {
                        detail: {
                            image: currentItem.image,
                            title: currentItem.Title,
                            index: this.currentIndex,
                            action: 'click'
                        }
                    }));
                }
            };

            // 桌面版點擊事件
            img.addEventListener('click', handleImageClick);
            
            // 移動版觸摸點擊事件
            img.addEventListener('touchend', (e) => {
                // 只在短暫觸摸（非拖拽）時觸發點擊
                if (!this.isDragging && Math.abs(this.currentX - this.startX) <= 5) {
                    e.preventDefault(); // 防止觸發額外的點擊事件
                    handleImageClick(e);
                }
            }, { passive: false });

            slide.appendChild(img);
            slideContainer.appendChild(slide);
        });

    }

    // 切換到下一張
    nextSlide() {
        if (this.imageData.length <= 1) return;

        const currentSlide = this.shadowRoot.querySelector('.slide.active');
        if (currentSlide) {
            currentSlide.classList.remove('active');
        }

        this.currentIndex = (this.currentIndex + 1) % this.imageData.length;

        const nextSlide = this.shadowRoot.querySelectorAll('.slide')[this.currentIndex];
        if (nextSlide) {
            nextSlide.classList.add('active');
        }

        this.updateCounter();
    }

    // 切換到上一張
    prevSlide() {
        if (this.imageData.length <= 1) return;

        const currentSlide = this.shadowRoot.querySelector('.slide.active');
        if (currentSlide) {
            currentSlide.classList.remove('active');
        }

        this.currentIndex = this.currentIndex === 0 ? this.imageData.length - 1 : this.currentIndex - 1;

        const prevSlide = this.shadowRoot.querySelectorAll('.slide')[this.currentIndex];
        if (prevSlide) {
            prevSlide.classList.add('active');
        }

        this.updateCounter();
    }

    // 更新計數器
    updateCounter() {
        const counter = this.shadowRoot.querySelector('.image-counter');
        if (counter && this.imageData.length > 0) {
            counter.textContent = `${this.currentIndex + 1}/${this.imageData.length}`;
        }
    }

    // 開始自動播放
    startAutoplay() {
        if (this.imageData.length <= 1) return;

        this.stopAutoplay();
        const speed = parseInt(this.getAttribute('autoplay-speed')) || 3000;
        this.autoplayTimer = setInterval(() => {
            if (this.isVisible) {
                this.nextSlide();
            }
        }, speed);
    }

    // 停止自動播放
    stopAutoplay() {
        if (this.autoplayTimer) {
            clearInterval(this.autoplayTimer);
            this.autoplayTimer = null;
        }
    }

    // 顯示智慧選物彈窗
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

    // 拖拽開始
    handleDragStart(e) {
        this.isDragging = false; // 初始設為 false，等移動後再設為 true
        this.startX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        this.currentX = this.startX;
        this.dragStartTime = Date.now(); // 記錄觸摸開始時間
        this.stopAutoplay(); // 拖拽時暫停自動播放

        // 防止圖片被選中或拖拽
        e.preventDefault();
    }

    // 拖拽中
    handleDragMove(e) {
        this.currentX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        const deltaX = this.currentX - this.startX;

        // 只有移動距離超過 10px 時才認為是拖拽
        if (!this.isDragging && Math.abs(deltaX) > 10) {
            this.isDragging = true;
            
            // 添加拖拽樣式
            const slideContainer = this.shadowRoot.querySelector('.slide-container');
            if (slideContainer) {
                slideContainer.classList.add('dragging');
                slideContainer.style.transition = '';
            }
        }

        if (this.isDragging) {
            // 輕微的視覺反饋，不影響切換動畫
            const slideContainer = this.shadowRoot.querySelector('.slide-container');
            if (slideContainer) {
                // 只添加很輕微的縮放效果作為拖拽反饋
                const scale = 1 - Math.abs(deltaX) * 0.0001;
                // slideContainer.style.transform = `scale(${Math.max(0.98, scale)})`;
            }
            
            e.preventDefault();
        }
    }

    // 拖拽結束
    handleDragEnd(e) {
        const deltaX = this.currentX - this.startX;
        const touchTime = Date.now() - this.dragStartTime;
        const wasDragging = this.isDragging;
        
        this.isDragging = false;

        // 重置視覺效果和樣式
        const slideContainer = this.shadowRoot.querySelector('.slide-container');
        if (slideContainer) {
            // 平滑地重置縮放效果
            slideContainer.style.transition = 'transform 0.3s ease';
            slideContainer.style.transform = 'scale(1)';
            slideContainer.classList.remove('dragging');

            // 清除過渡效果，避免干擾opacity動畫
            setTimeout(() => {
                slideContainer.style.transition = '';
            }, 300);
        }

        // 只有真正拖拽時才處理滑動切換
        if (wasDragging && Math.abs(deltaX) > this.threshold) {
            if (deltaX > 0) {
                // 向右拖拽，顯示上一張
                this.prevSlide();
            } else {
                // 向左拖拽，顯示下一張
                this.nextSlide();
            }
        } else {
            // 拖拽距離不足時，平滑重置
            setTimeout(() => {
                if (slideContainer) {
                    slideContainer.style.transform = '';
                }
            }, 300);
        }

        // 5秒後重新開始自動播放
        setTimeout(() => {
            if (this.isVisible) {
                this.startAutoplay();
            }
        }, 5000);

        if (wasDragging) {
            e.preventDefault();
        }
    }

    // 初始化組件
    initializeComponent() {
        if (this.isInitialized) return;

        const imagesAttr = this.getAttribute('images');
        if (imagesAttr) {
            try {
                this.imageData = JSON.parse(imagesAttr);
            } catch (e) {
                console.error('圖片數據解析失敗:', e);
                this.imageData = [];
            }
        }

        if (this.imageData.length > 0) {
            this.createSlides();
            this.updateCounter();

            if (this.getAttribute('auto-show') !== 'false') {
                setTimeout(() => {
                    this.show();
                }, 300);
            }
        }

        this.bindEvents();
        this.updateArrowsVisibility(); // 初始化箭頭顯示狀態
        this.isInitialized = true;
    }

    // 綁定事件
    bindEvents() {
        const closeButton = this.shadowRoot.querySelector('.close-button');
        if (closeButton) {
            const handleClose = (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.hide();
            };
            
            closeButton.addEventListener('click', handleClose);
            closeButton.addEventListener('touchend', handleClose, { passive: false });
        }

        // 左右箭頭按鈕
        const prevButton = this.shadowRoot.querySelector('.nav-button.prev');
        const nextButton = this.shadowRoot.querySelector('.nav-button.next');

        if (prevButton) {
            const handlePrev = (e) => {
                e.stopPropagation();
                this.prevSlide();
                this.stopAutoplay();
                setTimeout(() => this.startAutoplay(), 5000); // 5秒後重新開始自動播放
            };
            
            prevButton.addEventListener('click', handlePrev);
            prevButton.addEventListener('touchend', handlePrev, { passive: false });
        }

        if (nextButton) {
            const handleNext = (e) => {
                e.stopPropagation();
                this.nextSlide();
                this.stopAutoplay();
                setTimeout(() => this.startAutoplay(), 5000); // 5秒後重新開始自動播放
            };
            
            nextButton.addEventListener('click', handleNext);
            nextButton.addEventListener('touchend', handleNext, { passive: false });
        }

        // 彈窗相關事件已移至獨立的 inf-marketing-modal 組件中處理

        // 鍵盤事件
        document.addEventListener('keydown', (e) => {
            if (this.isVisible) {
                if (e.key === 'Escape') {
                    // 如果彈窗開啟，先關閉彈窗
                    const modal = document.querySelector('#inf-smart-selection-modal');
                    if (modal && modal.visible === true) {
                        this.hideSmartSelectionModal();
                    } else {
                        this.hide();
                    }
                } else if (e.key === 'ArrowLeft') {
                    this.prevSlide();
                } else if (e.key === 'ArrowRight') {
                    this.nextSlide();
                }
            }
        });

        // 鼠標懸停時暫停自動播放
        const infCard = this.shadowRoot.querySelector('#inf-marketing-square-card-banner');
        if (infCard) {
            infCard.addEventListener('mouseenter', () => {
                this.stopAutoplay();
            });

            infCard.addEventListener('mouseleave', () => {
                if (this.isVisible && !this.isDragging) {
                    this.startAutoplay();
                }
            });

            // 綁定拖拽事件 - 觸摸設備
            infCard.addEventListener('touchstart', (e) => this.handleDragStart(e), {
                passive: false
            });
            infCard.addEventListener('touchmove', (e) => this.handleDragMove(e), {
                passive: false
            });
            infCard.addEventListener('touchend', (e) => this.handleDragEnd(e), {
                passive: false
            });

            // 綁定拖拽事件 - 鼠標
            infCard.addEventListener('mousedown', (e) => this.handleDragStart(e));

            // 鼠標事件需要綁定到 document，防止拖拽超出範圍
            document.addEventListener('mousemove', (e) => this.handleDragMove(e));
            document.addEventListener('mouseup', (e) => this.handleDragEnd(e));
        }
    }

    // 獲取位置樣式
    getPositionStyle() {
        const position = this.getAttribute('position') || 'RightDown';
        const positions = {
            'RightDown': 'bottom: 20px; right: 20px;',
            'LeftDown': 'bottom: 20px; left: 20px;',
            'CenterDown': 'bottom: 20px; left: 50%;',
            'Center': 'top: 50%; left: 50%;'
        };

        return positions[position] || positions['RightDown'];
    }

    // 獲取位置特定的 transform 樣式
    getPositionTransform() {
        const position = this.getAttribute('position') || 'RightDown';
        const transforms = {
            'RightDown': 'translateY(40px) scale(0.85)',
            'LeftDown': 'translateY(40px) scale(0.85)',
            'CenterDown': 'translateX(-50%) translateY(40px) scale(0.85)',
            'Center': 'translate(-50%, -50%) translateY(40px) scale(0.85)'
        };

        return transforms[position] || transforms['RightDown'];
    }

    // 獲取顯示時的 transform 樣式
    getShowTransform() {
        const position = this.getAttribute('position') || 'RightDown';
        const transforms = {
            'RightDown': 'translateY(0) scale(1)',
            'LeftDown': 'translateY(0) scale(1)',
            'CenterDown': 'translateX(-50%) translateY(0) scale(1)',
            'Center': 'translate(-50%, -50%) translateY(0) scale(1)'
        };

        return transforms[position] || transforms['RightDown'];
    }

    // 渲染組件
    render() {
        const width = this.getAttribute('width') || '300px';
        const height = this.getAttribute('height') || '300px';
        const positionStyle = this.getPositionStyle();
        const positionTransform = this.getPositionTransform();
        const showTransform = this.getShowTransform();

        this.shadowRoot.innerHTML = `
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                #inf-marketing-square-card-banner {
                    position: fixed;
                    ${positionStyle}
                    width: ${width};
                    height: ${height};
                    border-radius: 8px;
                    overflow: hidden;
                    opacity: 0;
                    transform: ${positionTransform};
                    transition: all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                    z-index: 10000;
                    user-select: none;
                    touch-action: pan-y pinch-zoom;
                }

                #inf-marketing-square-card-banner.show {
                    opacity: 1;
                    transform: ${showTransform};
                }

                .slide-container {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    cursor: grab;
                }

                .slide-container:active {
                    cursor: grabbing;
                }

                .slide-container.dragging {
                    transition: none;
                }

                .slide {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    opacity: 0;
                    transition: opacity 0.5s ease-in-out;
                }

                .slide.active {
                    opacity: 1;
                }

                .slide img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    display: block;
                }

                .image-counter {
                    position: absolute;
                    top: 16px;
                    left: 16px;
                    color: #fff;
                    height: 28px;
                    width: 28px;

                    border-radius: 50%;
                    font-size: 12px;
                    font-weight: 500;
                    z-index: 10;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .close-button {
                    position: absolute;
                    top: 16px;
                    right: 16px;
                    background-color: rgba(0,0,0,0.6);
                    border: none;
                    border-radius: 50%;
                    width: 28px;
                    height: 28px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #fff;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    z-index: 10;
                }

                .close-button:hover {
                    background-color: rgba(255, 255, 255, 0.9);
                    color: #333;
                    transform: scale(1.1);
                }

                .nav-button {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    background-color: rgba(0,0,0,0.6);
                    border: none;
                    border-radius: 50%;
                    width: 36px;
                    height: 36px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #fff;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    z-index: 10;
                    opacity: 0;
                }

                #inf-marketing-square-card-banner:hover .nav-button {
                    opacity: 1;
                }

                .nav-button:hover {
                    background-color: rgba(255, 255, 255, 0.9);
                    color: #333;
                    transform: translateY(-50%) scale(1.1);
                }

                .nav-button.prev {
                    left: 10px;
                }

                .nav-button.next {
                    right: 10px;
                }

                /* 智慧選物彈窗樣式已移至獨立的 inf-marketing-modal 組件 */
            </style>
            
            <div id="inf-marketing-square-card-banner">
                <div class="image-counter">1/1</div>
                <button class="close-button" title="關閉">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </button>
                
                <button class="nav-button prev" title="上一張">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </button>
                
                <button class="nav-button next" title="下一張">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </button>
                
                <div class="slide-container"></div>
            </div>

            <!-- 智慧選物彈窗已移至獨立的 inf-marketing-modal 組件 -->
        `;
    }

    /**
     * 手機版動態調整 modal 高度，確保真正置中
     */
    adjustModalHeightForMobile() {
        const isMobile = /iPhone|iPad|iPod|Android|Mobile/i.test(navigator.userAgent);
        if (!isMobile) return;

        // 取得可視高度（不含網址列）
        const vh = window.innerHeight;
        const modalContent = this.shadowRoot?.querySelector('.modal-content');
        if (modalContent) {
            // 設定最大高度為可視高度的 90%，避免貼邊
            modalContent.style.maxHeight = Math.floor(vh * 0.9) + 'px';
            modalContent.style.height = 'auto';
            modalContent.style.top = '50%';
            modalContent.style.left = '50%';
            modalContent.style.transform = 'translate(-50%, -50%)';
            modalContent.style.position = 'relative';
        }
    }
}

// 註冊Web Component
customElements.define('inf-marketing-square-card-banner', InfMarketingSquareCardBannerComponent);