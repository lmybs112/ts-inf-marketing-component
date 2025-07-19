# INF Marketing Components - Detailed Reference Guide

## Component Architecture

The INF Marketing Component Library follows a modular architecture with the following components:

```
InfMarketingComponentManager (Main Controller)
├── InfMarketingModalComponent (Modal Dialog)
├── InfMarketingPopupBannerComponent (Popup Banner)
├── InfMarketingSquareCardBannerComponent (Image Carousel Banner)
└── InfMarketingFloatButtonComponent (Floating Action Button)
```

---

## InfMarketingModalComponent

### CSS Custom Properties

The modal component supports CSS custom properties for styling:

```css
inf-marketing-modal {
    --modal-width: 480px;
    --modal-height: 480px;
    --modal-background: transparent;
    --modal-border-radius: 28px;
    --modal-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    --overlay-background: rgba(0, 0, 0, 0.7);
    --close-button-size: 36px;
    --close-button-background: rgba(0, 0, 0, 0.6);
    --close-button-hover-background: rgba(255, 255, 255, 0.9);
}
```

### Complete Method Reference

#### `setIframeConfig(config)`

**Configuration Object Properties:**
- `id` (string) - Route identifier for the marketing campaign
- `brand` (string) - Brand identifier
- `header` (string) - Header type, typically "from_preview"

```javascript
modal.setIframeConfig({
    id: '1746771238560',
    brand: 'ALMI',
    header: 'from_preview'
});
```

#### `sendIframeMessage(iframeElement)`

Sends configuration data to the iframe via postMessage.

**Internal method** - Called automatically when iframe loads.

#### `$(selector)`

Internal utility method for Shadow DOM element selection.

### iframe Communication

The modal communicates with embedded iframes using the postMessage API:

```javascript
// Message sent to iframe
{
    type: 'INIT_CONFIG',
    data: {
        id: 'route-id',
        brand: 'brand-name',
        header: 'from_preview'
    }
}
```

---

## InfMarketingPopupBannerComponent

### Position Configurations

The banner supports different positioning options:

| Position | Description | CSS Properties |
|----------|-------------|----------------|
| `LeftDown` | Bottom left corner | `bottom: 16px; left: 16px;` |
| `RightDown` | Bottom right corner | `bottom: 16px; right: 16px;` |
| `CenterDown` | Bottom center | `bottom: 16px; left: 50%; transform: translateX(-50%);` |
| `Center` | Screen center | `top: 50%; left: 50%; transform: translate(-50%, -50%);` |

### Animation Classes

The banner uses CSS animations for smooth transitions:

```css
/* Slide animations based on position */
@keyframes slideInFromRight { /* ... */ }
@keyframes slideInFromLeft { /* ... */ }
@keyframes slideInFromBottom { /* ... */ }
@keyframes bounceIn { /* ... */ }
```

### Complete Style Template

```css
:host {
    --banner-width: auto;
    --banner-min-width: 280px;
    --banner-max-width: 90vw;
    --banner-background: #FFFFFF;
    --banner-border-radius: 24px;
    --banner-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
    --banner-border: 1px solid rgba(0, 0, 0, 0.08);
    --button-border-radius: 16px;
    --close-button-size: 24px;
    --animation-duration: 0.6s;
    --animation-timing: cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

---

## InfMarketingSquareCardBannerComponent

### Image Data Structure

The component accepts image data in the following format:

```javascript
[
    {
        src: 'https://example.com/image1.jpg',
        alt: 'Product 1 Description',
        title: 'Optional Title',
        link: 'https://example.com/product1' // Optional click destination
    },
    // ... more images
]
```

### Autoplay Configuration

```javascript
// Set autoplay speed (in milliseconds)
banner.setAttribute('autoplay-speed', '5000'); // 5 seconds

// Enable/disable autoplay
banner.startAutoplay();
banner.stopAutoplay();
```

### Touch/Drag Support

The component includes touch gesture support:

```javascript
// Touch threshold for swipe detection
this.threshold = 50; // pixels

// Swipe directions
// Left swipe: next slide
// Right swipe: previous slide
```

### Responsive Breakpoints

```css
/* Mobile styles */
@media (max-width: 480px) {
    .inf-marketing-square-card-banner {
        width: 250px;
        height: 250px;
    }
}

/* Tablet and up */
@media (min-width: 481px) {
    .inf-marketing-square-card-banner {
        width: 300px;
        height: 300px;
    }
}
```

### Navigation Methods

#### `goToSlide(index, skipAnimation = false)`

Navigate to a specific slide with optional animation control.

**Parameters:**
- `index` (number) - Target slide index (0-based)
- `skipAnimation` (boolean) - Skip transition animation if true

#### `updateCounter()`

Updates the slide counter display (e.g., "1 / 5").

#### `createSlides()`

Regenerates slide elements from current image data.

---

## InfMarketingFloatButtonComponent

### Position Styling

The floating button adapts its position based on screen size:

```css
/* Mobile positioning */
@media (max-width: 479px) {
    .ai-pd-container__trigger {
        width: 60px;
        height: 60px;
        padding: 14px;
        border-radius: 21px;
    }
}

/* Desktop positioning */
@media (min-width: 480px) {
    .ai-pd-container__trigger {
        width: 70px;
        height: 70px;
        padding: 15px;
        border-radius: 25px;
        backdrop-filter: blur(40px);
    }
}
```

### Button States

The button has two visual states:

1. **Search State** (default) - Shows magnifying glass icon
2. **Close State** (when modal is open) - Shows close icon

### Event Handling

```javascript
// Button click handler
_onButtonClick() {
    if (this._isModalOpen) {
        this.closeModal();
    } else {
        this.openModal();
    }
}
```

---

## InfMarketingComponentManager

### Configuration Object Structure

The manager accepts configuration objects with the following structure:

```javascript
{
    // Banner display configuration
    BannerType: 'TinyPopupBanner' | 'SquareCardBanner',
    Title: 'Banner Title',
    Description: 'Banner Description',
    CTA_text: 'Button Text',
    CTA_color: '#FFFFFF',
    CTA_background: '#000000',
    Location: 'RightDown' | 'LeftDown' | 'CenterDown' | 'Center',
    
    // Time-based display control
    TimeValid: ['2025-01-01', '2025-12-31'],
    
    // Feature flags
    status: true,
    
    // Banner-specific settings
    Banner_Info: [{
        // Nested banner configuration
        images: [/* image array */],
        autoplay_speed: 3000
    }]
}
```

### API Response Structure

The `fetchMarketingData` method expects the following API response:

```javascript
{
    config: {
        Banner_Info: [{
            BannerType: 'TinyPopupBanner',
            Title: '精選購物之旅',
            Description: '找到您的個人化專屬商品',
            CTA_text: '立即開始',
            CTA_color: '#FFFFFFFF',
            CTA_background: '#000000FF',
            Location: 'RightDown',
            TimeValid: ['2025-06-04', '2025-06-12'],
            status: true
        }]
    },
    route: [{
        ClothID: 'ALMI_All9',
        Route: '1746771238560',
        mktOnline: true,
        TagGroups_order: ['穿著場合'],
        DisplayList: [
            'inffits_landing_page_cond',
            'inffits_category_page_cond',
            'inffits_product_page_cond'
        ],
        SpecifyKeywords: [],
        SpecifyTags: { '商品類別': [] },
        Description: '這是一句描述或註記導購計劃的句子',
        Name: 't4w',
        RouteDisplayMode: 'media' | 'standard'
    }]
}
```

### Component Loading Logic

The manager determines which component to load based on `BannerType`:

```javascript
switch (bannerType) {
    case 'TinyPopupBanner':
        await this.loadScript('./inf-marketing-popup-banner-component.js');
        await this.loadScript('./inf-marketing-floating-button-component.js');
        componentTagName = 'inf-marketing-popup-banner';
        break;
        
    case 'SquareCardBanner':
        await this.loadScript('./inf-marketing-square-card-banner-component.js');
        await this.loadScript('./inf-marketing-floating-button-component.js');
        componentTagName = 'inf-marketing-square-card-banner';
        break;
        
    default:
        console.warn(`未知的 Banner 類型: ${bannerType}`);
        return;
}
```

### iframe URL Determination

The iframe URL is determined by the route's `RouteDisplayMode`:

```javascript
const iframeUrl = this.route?.RouteDisplayMode === 'media' 
    ? 'https://ts-iframe-no-media.vercel.app/iframe_container_module.html'
    : 'https://ts-iframe-v2.vercel.app/iframe_container_module.html';
```

---

## Error Handling

### Component Error Events

All components dispatch error events for debugging:

```javascript
// Listen for component errors
window.addEventListener('infMarketingConfigError', (event) => {
    console.error('Config Error:', event.detail);
    // Handle error appropriately
});

// Modal-specific errors
document.addEventListener('inf-marketing-modal:iframe-error', (event) => {
    console.error('iframe load error:', event.detail);
});
```

### Common Error Scenarios

1. **Missing Brand Parameter**
   ```javascript
   // Error: 初始化失敗：brand 參數為必填且不可為空
   ```

2. **API Request Failure**
   ```javascript
   // Error: API 請求失敗: 404 Not Found
   ```

3. **Component Script Loading Failure**
   ```javascript
   // Error: Failed to load script: ./component.js
   ```

4. **Invalid Configuration Data**
   ```javascript
   // Warning: 未取得有效的營銷資料
   ```

---

## Performance Considerations

### Script Loading Optimization

Components are loaded dynamically to improve initial page load:

```javascript
// Scripts are loaded only when needed
loadScript(src) {
    return new Promise((resolve, reject) => {
        // Check if script already exists
        const existingScript = document.querySelector(`script[src="${src}"]`);
        if (existingScript) {
            resolve();
            return;
        }
        
        // Create and load new script
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}
```

### Memory Management

Components properly clean up resources:

```javascript
// Cleanup autoplay timers
disconnectedCallback() {
    this.stopAutoplay();
}

// Remove event listeners
destroy() {
    if (this.currentComponent) {
        this.currentComponent.remove();
    }
    if (this.modal) {
        this.modal.remove();
    }
}
```

### iframe Optimization

Modal reuses existing iframes when possible:

```javascript
// Check for existing iframe with same URL
const existingIframe = iframeContainer.querySelector('iframe');
if (existingIframe && existingIframe.src === url && this.currentIframeUrl === url) {
    // Reuse existing iframe
    iframeContainer.style.display = 'block';
    return;
}
```

---

## Testing Guidelines

### Component Testing

```javascript
// Test component initialization
const component = document.createElement('inf-marketing-popup-banner');
document.body.appendChild(component);

// Wait for component to be ready
await customElements.whenDefined('inf-marketing-popup-banner');

// Test configuration
component.updateConfig({
    title: 'Test Title',
    description: 'Test Description'
});

// Test events
component.addEventListener('inf-marketing-popup-banner-close', () => {
    console.log('Banner closed');
});
```

### Manager Testing

```javascript
// Test manager initialization
const manager = new InfMarketingComponentManager();
await manager.init('TEST_BRAND', 'https://test.com', {
    BannerType: 'TinyPopupBanner',
    status: true
});

// Test component visibility
manager.showComponent();
manager.hideComponent();

// Cleanup
manager.destroy();
```