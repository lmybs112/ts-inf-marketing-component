# INF Marketing Component Library

> Intelligent marketing banners and modals for enhanced user engagement and smart product recommendations.

## Overview

The INF Marketing Component Library is a comprehensive web component system designed for e-commerce and marketing websites. It provides intelligent banners, modals, and interactive elements that help boost user engagement and drive conversions through personalized product recommendations.

## ✨ Features

- **🎯 Smart Product Recommendations** - AI-powered product suggestions based on user behavior
- **📱 Responsive Design** - Mobile-first components that work across all devices
- **🔧 Easy Integration** - Simple JavaScript API with framework support
- **🎨 Customizable** - Flexible styling and configuration options
- **⚡ Performance Optimized** - Lazy loading and efficient resource management
- **🌐 Cross-browser Compatible** - Works on all modern browsers
- **📊 Analytics Ready** - Built-in event tracking for marketing insights

## 🚀 Quick Start

### 1. Include the Script

```html
<script src="./inf-marketing-component.js"></script>
```

### 2. Initialize

```javascript
// Basic initialization
window.initInfMarketing('YOUR_BRAND_NAME');

// With custom configuration
window.initInfMarketing('YOUR_BRAND_NAME', null, {
    BannerType: 'TinyPopupBanner',
    Title: 'Discover Your Style',
    Description: 'Find products perfect for you',
    CTA_text: 'Shop Now',
    Location: 'RightDown',
    status: true
});
```

### 3. That's it! 🎉

The system will automatically:
- Fetch your marketing configuration from the API
- Load the appropriate components
- Display personalized marketing elements
- Handle user interactions and analytics

## 🧩 Components

| Component | Description | Use Case |
|-----------|-------------|----------|
| **InfMarketingModalComponent** | Customizable modal for product selection | Smart product recommendations |
| **InfMarketingPopupBannerComponent** | Popup banner for marketing campaigns | Promotions, announcements |
| **InfMarketingSquareCardBannerComponent** | Image carousel banner | Product showcases, galleries |
| **InfMarketingFloatButtonComponent** | Floating action button | Quick access to shopping tools |

## 📖 Documentation

### 📋 API Reference
- **[API Documentation](./API_DOCUMENTATION.md)** - Complete API reference with all methods, properties, and examples
- **[Component Reference](./COMPONENT_REFERENCE.md)** - Detailed component specifications and configurations

### 🛠️ Integration Guides
- **[Integration Guide](./INTEGRATION_GUIDE.md)** - Step-by-step integration instructions for various platforms
- Framework support for React, Vue.js, Angular
- CMS integration for WordPress, Shopify
- Performance optimization techniques

## 💡 Usage Examples

### E-commerce Product Page

```javascript
// Show personalized recommendations on product pages
document.addEventListener('DOMContentLoaded', function() {
    window.initInfMarketing('YOUR_BRAND', window.location.href, {
        BannerType: 'SquareCardBanner',
        Title: 'You Might Also Like',
        Description: 'Discover related products',
        Location: 'RightDown'
    });
});
```

### Marketing Campaign Banner

```javascript
// Display promotional banner
window.initInfMarketing('YOUR_BRAND', null, {
    BannerType: 'TinyPopupBanner',
    Title: 'Summer Sale! 🌞',
    Description: 'Up to 50% off selected items',
    CTA_text: 'Shop Sale',
    CTA_background: '#ff6b6b',
    CTA_color: '#ffffff',
    Location: 'Center'
});
```

### Responsive Configuration

```javascript
// Adapt to screen size
const isMobile = window.innerWidth <= 768;
window.initInfMarketing('YOUR_BRAND', null, {
    BannerType: isMobile ? 'TinyPopupBanner' : 'SquareCardBanner',
    Location: isMobile ? 'CenterDown' : 'RightDown',
    Title: 'Welcome to Our Store',
    Description: 'Discover amazing products',
    status: true
});
```

## 🎛️ Configuration Options

### Banner Types
- `TinyPopupBanner` - Compact popup banner with CTA button
- `SquareCardBanner` - Image carousel with product showcase

### Positions
- `LeftDown` - Bottom left corner
- `RightDown` - Bottom right corner  
- `CenterDown` - Bottom center
- `Center` - Screen center

### Styling
- Custom colors, fonts, and animations
- CSS custom properties support
- Responsive breakpoints

## 🔧 API Reference

### Global Methods

```javascript
// Initialize the marketing system
window.initInfMarketing(brand, url?, config?)

// Manual control
window.showInfMarketing()
window.hideInfMarketing()

// Access manager instance
window.infMarketingManager
```

### Component Methods

```javascript
// Modal component
const modal = document.querySelector('inf-marketing-modal');
modal.show(iframeUrl?)
modal.hide()
modal.setIframeConfig({id, brand, header})

// Banner components
const banner = document.querySelector('inf-marketing-popup-banner');
banner.updateConfig(newConfig)
banner.showSmartSelectionModal(iframeUrl?)
```

## 📊 Events & Analytics

The components fire custom events for tracking user interactions:

```javascript
// Track banner displays
document.addEventListener('inf-marketing-popup-banner-show', function() {
    console.log('Banner displayed');
});

// Track modal interactions  
document.addEventListener('inf-marketing-modal:show', function(event) {
    console.log('Modal opened:', event.detail.iframeUrl);
});

// Track errors
window.addEventListener('infMarketingConfigError', function(event) {
    console.error('Configuration error:', event.detail);
});
```

## 🌐 Browser Support

- **Chrome** 61+
- **Firefox** 63+
- **Safari** 10.1+
- **Edge** 79+

## 📦 Dependencies

- **Zero external dependencies**
- Uses modern Web Components APIs
- Requires ES6+ support

## ⚡ Performance

- **Lazy loading** - Components loaded only when needed
- **Script caching** - Prevents duplicate downloads
- **Memory management** - Proper cleanup and resource management
- **iframe optimization** - Reuses existing frames when possible

## 🔒 Security

- **Content Security Policy** compatible
- **Cross-origin** iframe support with secure messaging
- **Input sanitization** for user-provided content

## 🛠️ Development

### File Structure

```
├── inf-marketing-component.js              # Main manager
├── inf-marketing-modal-component.js        # Modal component
├── inf-marketing-popup-banner-component.js # Popup banner
├── inf-marketing-square-card-banner-component.js # Card banner
├── inf-marketing-floating-button-component.js # Floating button
├── index.html                              # Demo page
└── docs/
    ├── API_DOCUMENTATION.md               # Complete API docs
    ├── COMPONENT_REFERENCE.md             # Component details
    └── INTEGRATION_GUIDE.md               # Integration examples
```

### Testing

```javascript
// Component testing
const component = document.createElement('inf-marketing-popup-banner');
document.body.appendChild(component);
await customElements.whenDefined('inf-marketing-popup-banner');

// Manager testing
const manager = new InfMarketingComponentManager();
await manager.init('TEST_BRAND');
```

## 🤝 Framework Integration

### React

```jsx
import { useEffect } from 'react';

function MarketingComponents({ brand, config }) {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = './inf-marketing-component.js';
        script.onload = () => window.initInfMarketing(brand, null, config);
        document.head.appendChild(script);
        
        return () => window.infMarketingManager?.destroy();
    }, [brand, config]);
    
    return null;
}
```

### Vue.js

```vue
<template><div></div></template>
<script>
export default {
    props: ['brand', 'config'],
    async mounted() {
        await this.loadScript();
        window.initInfMarketing(this.brand, null, this.config);
    },
    beforeDestroy() {
        window.infMarketingManager?.destroy();
    }
}
</script>
```

## 📞 Support

- **📖 Documentation**: Complete guides and API reference
- **💬 Issues**: Report bugs and request features via GitHub Issues
- **📧 Contact**: Reach out for enterprise support and custom integrations

## 📈 Analytics Integration

Works seamlessly with:
- **Google Analytics** 4
- **Google Tag Manager**
- **Facebook Pixel**
- **Custom analytics** platforms

```javascript
// Example: Google Analytics tracking
document.addEventListener('inf-marketing-modal:show', function() {
    gtag('event', 'smart_selection_opened', {
        'event_category': 'engagement',
        'event_label': 'product_recommendation'
    });
});
```

## 🔄 Version History

- **v1.0** - Initial release with core components
- **Current**: Full-featured marketing component system

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## Getting Started Checklist

- [ ] Include the main script in your HTML
- [ ] Replace `'YOUR_BRAND_NAME'` with your actual brand identifier
- [ ] Test on different screen sizes and devices
- [ ] Set up analytics tracking for marketing insights
- [ ] Customize colors and styling to match your brand
- [ ] Configure API endpoints for your environment

**Ready to boost your conversions?** Start with the [Integration Guide](./INTEGRATION_GUIDE.md) for detailed setup instructions.

---

*Built with ❤️ for better user experiences and smarter marketing.*