# INF Marketing Component Library - API Documentation

## Overview

The INF Marketing Component Library is a comprehensive web component system for creating intelligent marketing banners and modals. It consists of four main web components and a central management system for handling marketing campaigns and smart product recommendations.

## Table of Contents

1. [InfMarketingComponentManager](#infmarketingcomponentmanager)
2. [InfMarketingModalComponent](#infmarketingmodalcomponent)
3. [InfMarketingPopupBannerComponent](#infmarketingpopupbannercomponent)
4. [InfMarketingSquareCardBannerComponent](#infmarketingsquarecardbbannercomponent)
5. [InfMarketingFloatButtonComponent](#infmarketingfloatbuttoncomponent)
6. [Global Functions](#global-functions)
7. [Events](#events)
8. [Usage Examples](#usage-examples)

---

## InfMarketingComponentManager

The central management class that handles the initialization and coordination of all marketing components.

### Constructor

```javascript
new InfMarketingComponentManager()
```

Creates a new instance of the marketing component manager.

### Methods

#### `init(brand, url, config)`

Initializes the marketing component system with the specified configuration.

**Parameters:**
- `brand` (string, required) - Brand name for API identification
- `url` (string, optional) - Target URL, defaults to current page URL
- `config` (object, optional) - Custom configuration object to use when API returns empty config

**Returns:** `Promise<void>`

**Example:**
```javascript
await window.infMarketingManager.init('ALMI', 'https://example.com', {
    BannerType: 'TinyPopupBanner',
    Title: 'Custom Title',
    Description: 'Custom Description',
    CTA_text: 'Click Here',
    Location: 'RightDown',
    status: true
});
```

#### `fetchMarketingData(brand, url)`

Fetches marketing configuration data from the API.

**Parameters:**
- `brand` (string, required) - Brand identifier
- `url` (string, optional) - Target URL

**Returns:** `Promise<Object>` - Marketing data including config and route information

#### `showComponent()`

Manually shows the current marketing component.

**Example:**
```javascript
window.infMarketingManager.showComponent();
```

#### `hideComponent()`

Manually hides the current marketing component.

**Example:**
```javascript
window.infMarketingManager.hideComponent();
```

#### `destroy()`

Destroys the manager and removes all components.

**Example:**
```javascript
window.infMarketingManager.destroy();
```

### Properties

- `config` - Current marketing configuration
- `route` - Current route information
- `currentComponent` - Reference to the active component
- `modal` - Reference to the modal component
- `isInitialized` - Initialization status
- `brand` - Current brand identifier

---

## InfMarketingModalComponent

A customizable modal component for displaying smart product selection interfaces.

### HTML Tag

```html
<inf-marketing-modal id="myModal" width="480" height="480">
    <div slot="content">Modal content here</div>
</inf-marketing-modal>
```

### Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `width` | string | "480px" | Modal width |
| `height` | string | "480px" | Modal height |
| `overlay-color` | string | "rgba(0, 0, 0, 0.7)" | Background overlay color |
| `border-radius` | string | "28px" | Modal border radius |

### Methods

#### `show(iframeUrl)`

Shows the modal with optional iframe URL.

**Parameters:**
- `iframeUrl` (string, optional) - URL to display in iframe

**Example:**
```javascript
const modal = document.querySelector('#myModal');
modal.show('https://example.com/product-selector');
```

#### `hide()`

Hides the modal.

**Example:**
```javascript
modal.hide();
```

#### `setIframeUrl(url)`

Sets the iframe URL for smart product selection.

**Parameters:**
- `url` (string, required) - iframe URL

**Example:**
```javascript
modal.setIframeUrl('https://ts-iframe-v2.vercel.app/iframe_container_module.html');
```

#### `setIframeConfig(config)`

Sets the iframe configuration parameters.

**Parameters:**
- `config` (object, required) - Configuration object

**Example:**
```javascript
modal.setIframeConfig({
    id: '1746771238560',
    brand: 'ALMI',
    header: 'from_preview'
});
```

#### `setIframeId(id)`

Sets the iframe ID parameter.

**Parameters:**
- `id` (string, required) - Route identifier

#### `setIframeBrand(brand)`

Sets the iframe brand parameter.

**Parameters:**
- `brand` (string, required) - Brand identifier

### Events

- `inf-marketing-modal:show` - Fired when modal is shown
- `inf-marketing-modal:hide` - Fired when modal is hidden
- `inf-marketing-modal:iframe-set` - Fired when iframe URL is set
- `inf-marketing-modal:iframe-loaded` - Fired when iframe finishes loading
- `inf-marketing-modal:iframe-error` - Fired when iframe fails to load

---

## InfMarketingPopupBannerComponent

A popup banner component for marketing campaigns.

### HTML Tag

```html
<inf-marketing-popup-banner 
    position="RightDown" 
    title="Smart Shopping Journey"
    description="Find your personalized products"
    button-text="Start Now"
    button-color="#000000FF"
    button-text-color="#FFFFFFFF">
</inf-marketing-popup-banner>
```

### Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `position` | string | "RightDown" | Banner position (LeftDown, RightDown, CenterDown, Center) |
| `title` | string | "精選購物之旅" | Banner title |
| `description` | string | "找到您的個人化專屬商品" | Banner description |
| `button-text` | string | "立即開始" | Button text |
| `button-color` | string | "#ddd" | Button background color |
| `button-text-color` | string | "#1E1E19" | Button text color |

### Methods

#### `updateConfig(newConfig)`

Updates the banner configuration.

**Parameters:**
- `newConfig` (object, required) - New configuration object

**Example:**
```javascript
const banner = document.querySelector('inf-marketing-popup-banner');
banner.updateConfig({
    position: 'Center',
    title: 'New Title',
    description: 'New Description',
    buttonText: 'Click Me',
    buttonColor: '#ff6b6b',
    buttonTextColor: '#ffffff'
});
```

#### `setModalIframeUrl(url)`

Sets the iframe URL for the associated modal.

**Parameters:**
- `url` (string, required) - iframe URL

#### `showSmartSelectionModal(iframeUrl)`

Shows the smart selection modal.

**Parameters:**
- `iframeUrl` (string, optional) - iframe URL to display

#### `hideSmartSelectionModal()`

Hides the smart selection modal.

### Events

- `inf-marketing-popup-banner-close` - Fired when close button is clicked

---

## InfMarketingSquareCardBannerComponent

A square card banner component with image carousel functionality.

### HTML Tag

```html
<inf-marketing-square-card-banner 
    position="RightDown"
    width="300px"
    height="300px"
    auto-show="true"
    show-arrows="true"
    autoplay-speed="3000"
    images='[{"src": "image1.jpg", "alt": "Image 1"}]'>
</inf-marketing-square-card-banner>
```

### Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `position` | string | "RightDown" | Banner position |
| `width` | string | "300px" | Banner width |
| `height` | string | "300px" | Banner height |
| `auto-show` | string | "false" | Auto-show on load |
| `show-arrows` | string | "true" | Show navigation arrows |
| `autoplay-speed` | string | "3000" | Autoplay interval in milliseconds |
| `images` | string | "[]" | JSON string of image data |

### Methods

#### `setImages(imageData)`

Sets the image data for the carousel.

**Parameters:**
- `imageData` (array, required) - Array of image objects

**Example:**
```javascript
const banner = document.querySelector('inf-marketing-square-card-banner');
banner.setImages([
    { src: 'image1.jpg', alt: 'Product 1' },
    { src: 'image2.jpg', alt: 'Product 2' }
]);
```

#### `show()`

Shows the banner component.

#### `hide()`

Hides the banner component.

#### `nextSlide()`

Navigates to the next slide.

#### `prevSlide()`

Navigates to the previous slide.

#### `goToSlide(index)`

Navigates to a specific slide.

**Parameters:**
- `index` (number, required) - Slide index

#### `startAutoplay()`

Starts automatic slide progression.

#### `stopAutoplay()`

Stops automatic slide progression.

### Events

- `inf-marketing-square-card-banner-show` - Fired when banner is shown
- `inf-marketing-square-card-banner-hide` - Fired when banner is hidden
- `inf-marketing-square-card-banner-slide-change` - Fired when slide changes

---

## InfMarketingFloatButtonComponent

A floating action button component that opens marketing modals.

### HTML Tag

```html
<inf-marketing-floating-button position="RightDown">
</inf-marketing-floating-button>
```

### Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `position` | string | "LeftDown" | Button position (LeftDown, RightDown, CenterDown) |

### Methods

#### `setModalIframeUrl(url)`

Sets the iframe URL for the associated modal.

**Parameters:**
- `url` (string, required) - iframe URL

#### `openModal()`

Opens the associated modal.

#### `closeModal()`

Closes the associated modal.

### Properties

- `modalIframeUrl` - Current iframe URL for the modal

---

## Global Functions

### `window.initInfMarketing(brand, url, config)`

Manually initializes the marketing system.

**Parameters:**
- `brand` (string, required) - Brand identifier
- `url` (string, optional) - Target URL
- `config` (object, optional) - Custom configuration

**Example:**
```javascript
window.initInfMarketing('ALMI', 'https://example.com');
```

### `window.showInfMarketing()`

Shows the current marketing component.

**Example:**
```javascript
window.showInfMarketing();
```

### `window.hideInfMarketing()`

Hides the current marketing component.

**Example:**
```javascript
window.hideInfMarketing();
```

---

## Events

### Global Events

- `infMarketingConfigError` - Fired when configuration errors occur
- `infMarketingInitialized` - Fired when system initialization completes

### Component-Specific Events

Each component fires custom events for user interactions and state changes. See individual component documentation for specific events.

---

## Usage Examples

### Basic Setup

```html
<!DOCTYPE html>
<html>
<head>
    <title>Marketing Components Demo</title>
</head>
<body>
    <!-- Load the main component script -->
    <script src="./inf-marketing-component.js"></script>
    
    <script>
        // Initialize for ALMI brand
        window.initInfMarketing('ALMI');
        
        // Or with custom configuration
        window.initInfMarketing('ALMI', 'https://example.com', {
            BannerType: 'TinyPopupBanner',
            Title: 'Custom Campaign',
            Description: 'Find your perfect products',
            CTA_text: 'Shop Now',
            Location: 'Center',
            status: true
        });
    </script>
</body>
</html>
```

### Manual Component Usage

```html
<!-- Manual popup banner -->
<inf-marketing-popup-banner 
    position="RightDown" 
    title="Summer Sale"
    description="Up to 50% off selected items"
    button-text="Shop Now"
    button-color="#ff6b6b"
    button-text-color="#ffffff">
</inf-marketing-popup-banner>

<!-- Manual modal -->
<inf-marketing-modal id="productModal" width="600" height="500">
    <div slot="content">
        <h2>Product Selector</h2>
        <p>Choose your preferred products...</p>
    </div>
</inf-marketing-modal>

<!-- Manual floating button -->
<inf-marketing-floating-button position="RightDown">
</inf-marketing-floating-button>

<script>
    // Configure modal with iframe
    const modal = document.querySelector('#productModal');
    modal.setIframeConfig({
        id: 'route123',
        brand: 'ALMI'
    });
    modal.setIframeUrl('https://ts-iframe-v2.vercel.app/iframe_container_module.html');
    
    // Show modal
    modal.show();
</script>
```

### Advanced Event Handling

```javascript
// Listen for marketing events
window.addEventListener('infMarketingConfigError', (event) => {
    console.error('Marketing config error:', event.detail);
});

// Listen for modal events
document.addEventListener('inf-marketing-modal:show', (event) => {
    console.log('Modal shown with URL:', event.detail.iframeUrl);
});

// Listen for banner events
document.addEventListener('inf-marketing-popup-banner-close', () => {
    console.log('Banner closed by user');
});
```

### Responsive Configuration

```javascript
// Different configurations for different screen sizes
const isMobile = window.innerWidth < 768;

window.initInfMarketing('ALMI', null, {
    BannerType: isMobile ? 'TinyPopupBanner' : 'SquareCardBanner',
    Title: 'Smart Shopping',
    Description: 'Discover products tailored for you',
    CTA_text: 'Explore',
    Location: isMobile ? 'CenterDown' : 'RightDown',
    status: true
});
```

---

## Browser Support

- Chrome 61+
- Firefox 63+
- Safari 10.1+
- Edge 79+

## Dependencies

- No external dependencies required
- Uses modern Web Components APIs (Custom Elements, Shadow DOM)
- Requires ES6+ support for modern JavaScript features

## Notes

- All components use Shadow DOM for style encapsulation
- Components are responsive and touch-friendly
- iframe integration supports cross-origin communication
- API endpoints require CORS configuration for cross-domain requests