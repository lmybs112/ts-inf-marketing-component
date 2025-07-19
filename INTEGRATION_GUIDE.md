# INF Marketing Components - Integration Guide

## Quick Start

### Step 1: Include the Main Script

Add the main component script to your HTML page:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Website</title>
</head>
<body>
    <!-- Your website content -->
    
    <!-- Include INF Marketing Components -->
    <script src="./inf-marketing-component.js"></script>
    
    <script>
        // Initialize for your brand
        window.initInfMarketing('YOUR_BRAND_NAME');
    </script>
</body>
</html>
```

### Step 2: Brand Configuration

The component system will automatically:
1. Fetch marketing configuration from the API
2. Load appropriate banner components
3. Display marketing elements based on the configuration

---

## Integration Scenarios

### Scenario 1: E-commerce Product Pages

For product pages where you want to show personalized product recommendations:

```html
<script src="./inf-marketing-component.js"></script>
<script>
    // Initialize when page loads
    document.addEventListener('DOMContentLoaded', function() {
        // Use specific product URL for targeted recommendations
        const productUrl = window.location.href;
        window.initInfMarketing('YOUR_BRAND', productUrl);
    });
</script>
```

### Scenario 2: Category Pages with Custom Configuration

For category pages with custom marketing messages:

```html
<script src="./inf-marketing-component.js"></script>
<script>
    window.initInfMarketing('YOUR_BRAND', null, {
        BannerType: 'SquareCardBanner',
        Title: 'Discover Your Style',
        Description: 'Find products perfect for you',
        CTA_text: 'Shop Now',
        CTA_color: '#FFFFFF',
        CTA_background: '#007bff',
        Location: 'RightDown',
        status: true
    });
</script>
```

### Scenario 3: Homepage with Conditional Display

For homepage with responsive banner types:

```html
<script src="./inf-marketing-component.js"></script>
<script>
    function initResponsiveMarketing() {
        const isMobile = window.innerWidth <= 768;
        const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;
        
        let config = {
            BannerType: isMobile ? 'TinyPopupBanner' : 'SquareCardBanner',
            Location: isMobile ? 'CenterDown' : 'RightDown',
            Title: 'Welcome to Our Store',
            Description: 'Discover amazing products',
            CTA_text: 'Start Shopping',
            status: true
        };
        
        window.initInfMarketing('YOUR_BRAND', null, config);
    }
    
    // Initialize on load
    document.addEventListener('DOMContentLoaded', initResponsiveMarketing);
    
    // Re-initialize on resize (with debouncing)
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            window.infMarketingManager.destroy();
            initResponsiveMarketing();
        }, 500);
    });
</script>
```

---

## Advanced Integration

### Custom Event Handling

```html
<script src="./inf-marketing-component.js"></script>
<script>
    // Track marketing interactions
    function setupMarketingTracking() {
        // Track banner displays
        document.addEventListener('inf-marketing-popup-banner-show', function() {
            // Analytics tracking
            gtag('event', 'marketing_banner_shown', {
                'event_category': 'marketing',
                'event_label': 'popup_banner'
            });
        });
        
        // Track modal opens
        document.addEventListener('inf-marketing-modal:show', function(event) {
            console.log('Smart selection modal opened');
            // Track in analytics
            gtag('event', 'smart_selection_opened', {
                'event_category': 'engagement',
                'iframe_url': event.detail.iframeUrl
            });
        });
        
        // Track errors
        window.addEventListener('infMarketingConfigError', function(event) {
            console.error('Marketing configuration error:', event.detail);
            // Send error to monitoring service
            if (typeof Sentry !== 'undefined') {
                Sentry.captureException(new Error(event.detail.error));
            }
        });
    }
    
    // Initialize tracking
    setupMarketingTracking();
    
    // Initialize marketing
    window.initInfMarketing('YOUR_BRAND');
</script>
```

### Manual Component Control

```html
<script src="./inf-marketing-component.js"></script>
<script>
    let marketingInitialized = false;
    
    // Manual control functions
    function showMarketingBanner() {
        if (!marketingInitialized) {
            window.initInfMarketing('YOUR_BRAND').then(() => {
                marketingInitialized = true;
                window.showInfMarketing();
            });
        } else {
            window.showInfMarketing();
        }
    }
    
    function hideMarketingBanner() {
        if (marketingInitialized) {
            window.hideInfMarketing();
        }
    }
    
    // Example: Show banner when user scrolls 50% down the page
    let bannerShown = false;
    window.addEventListener('scroll', function() {
        if (!bannerShown) {
            const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
            if (scrollPercent > 50) {
                showMarketingBanner();
                bannerShown = true;
            }
        }
    });
</script>
```

---

## Framework Integration

### React Integration

```jsx
import React, { useEffect, useState } from 'react';

function MarketingComponent({ brand, customConfig }) {
    const [isLoaded, setIsLoaded] = useState(false);
    
    useEffect(() => {
        // Load script dynamically
        const script = document.createElement('script');
        script.src = './inf-marketing-component.js';
        script.onload = () => {
            setIsLoaded(true);
        };
        document.head.appendChild(script);
        
        return () => {
            // Cleanup on unmount
            if (window.infMarketingManager) {
                window.infMarketingManager.destroy();
            }
        };
    }, []);
    
    useEffect(() => {
        if (isLoaded && brand) {
            window.initInfMarketing(brand, null, customConfig);
        }
    }, [isLoaded, brand, customConfig]);
    
    return null; // This component doesn't render anything
}

// Usage
function App() {
    const marketingConfig = {
        BannerType: 'TinyPopupBanner',
        Title: 'Special Offer',
        Description: 'Limited time deal',
        CTA_text: 'Shop Now',
        status: true
    };
    
    return (
        <div>
            <MarketingComponent brand="YOUR_BRAND" customConfig={marketingConfig} />
            {/* Your app content */}
        </div>
    );
}
```

### Vue.js Integration

```vue
<template>
  <div>
    <!-- Your app content -->
  </div>
</template>

<script>
export default {
  name: 'MarketingWrapper',
  props: {
    brand: {
      type: String,
      required: true
    },
    config: {
      type: Object,
      default: () => ({})
    }
  },
  
  async mounted() {
    await this.loadMarketingScript();
    this.initializeMarketing();
  },
  
  beforeDestroy() {
    if (window.infMarketingManager) {
      window.infMarketingManager.destroy();
    }
  },
  
  methods: {
    loadMarketingScript() {
      return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = './inf-marketing-component.js';
        script.onload = resolve;
        document.head.appendChild(script);
      });
    },
    
    initializeMarketing() {
      if (window.initInfMarketing) {
        window.initInfMarketing(this.brand, null, this.config);
      }
    }
  },
  
  watch: {
    config: {
      handler() {
        // Reinitialize when config changes
        if (window.infMarketingManager) {
          window.infMarketingManager.destroy();
          this.$nextTick(() => {
            this.initializeMarketing();
          });
        }
      },
      deep: true
    }
  }
}
</script>
```

### Angular Integration

```typescript
import { Component, Input, OnInit, OnDestroy } from '@angular/core';

declare global {
  interface Window {
    initInfMarketing: (brand: string, url?: string, config?: any) => void;
    infMarketingManager: any;
  }
}

@Component({
  selector: 'app-marketing',
  template: ''
})
export class MarketingComponent implements OnInit, OnDestroy {
  @Input() brand!: string;
  @Input() config: any = {};
  
  private scriptLoaded = false;
  
  async ngOnInit() {
    await this.loadScript();
    this.initializeMarketing();
  }
  
  ngOnDestroy() {
    if (window.infMarketingManager) {
      window.infMarketingManager.destroy();
    }
  }
  
  private loadScript(): Promise<void> {
    return new Promise((resolve) => {
      if (this.scriptLoaded) {
        resolve();
        return;
      }
      
      const script = document.createElement('script');
      script.src = './inf-marketing-component.js';
      script.onload = () => {
        this.scriptLoaded = true;
        resolve();
      };
      document.head.appendChild(script);
    });
  }
  
  private initializeMarketing() {
    if (window.initInfMarketing && this.brand) {
      window.initInfMarketing(this.brand, undefined, this.config);
    }
  }
}
```

---

## CDN Integration

For easier deployment, you can serve the components from a CDN:

```html
<!-- Load from CDN -->
<script src="https://your-cdn.com/inf-marketing-component.js"></script>
<script>
    window.initInfMarketing('YOUR_BRAND');
</script>
```

---

## WordPress Integration

### As a Plugin

Create a WordPress plugin that includes the marketing components:

```php
<?php
/**
 * Plugin Name: INF Marketing Components
 * Description: Intelligent marketing banners and modals
 * Version: 1.0
 */

function inf_marketing_enqueue_scripts() {
    wp_enqueue_script(
        'inf-marketing', 
        plugin_dir_url(__FILE__) . 'inf-marketing-component.js', 
        array(), 
        '1.0', 
        true
    );
}
add_action('wp_enqueue_scripts', 'inf_marketing_enqueue_scripts');

function inf_marketing_init_script() {
    $brand = get_option('inf_marketing_brand', 'DEFAULT_BRAND');
    ?>
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            if (window.initInfMarketing) {
                window.initInfMarketing('<?php echo esc_js($brand); ?>');
            }
        });
    </script>
    <?php
}
add_action('wp_footer', 'inf_marketing_init_script');
?>
```

### As Theme Integration

Add to your theme's `functions.php`:

```php
function theme_add_marketing_components() {
    if (!is_admin()) {
        wp_enqueue_script(
            'inf-marketing', 
            get_template_directory_uri() . '/js/inf-marketing-component.js', 
            array(), 
            wp_get_theme()->get('Version'), 
            true
        );
        
        wp_add_inline_script('inf-marketing', '
            document.addEventListener("DOMContentLoaded", function() {
                window.initInfMarketing("' . get_bloginfo('name') . '");
            });
        ');
    }
}
add_action('wp_enqueue_scripts', 'theme_add_marketing_components');
```

---

## Shopify Integration

### Theme Integration

Add to your Shopify theme's `theme.liquid` file:

```liquid
<!-- Before closing </body> tag -->
<script src="{{ 'inf-marketing-component.js' | asset_url }}"></script>
<script>
  document.addEventListener('DOMContentLoaded', function() {
    // Get shop name as brand identifier
    const brand = '{{ shop.name | escape }}';
    
    // Product-specific configuration
    {% if template contains 'product' %}
      window.initInfMarketing(brand, window.location.href, {
        BannerType: 'SquareCardBanner',
        Title: 'Related Products',
        Description: 'Discover items that go with {{ product.title | escape }}',
        status: true
      });
    {% else %}
      window.initInfMarketing(brand);
    {% endif %}
  });
</script>
```

---

## A/B Testing Integration

### With Google Optimize

```html
<script src="./inf-marketing-component.js"></script>
<script>
    // Wait for Google Optimize to load
    function initMarketingWithOptimize() {
        // Get experiment variant
        const variant = gtag('config', 'GA_MEASUREMENT_ID', {
            'optimize_id': 'YOUR_OPTIMIZE_ID'
        });
        
        let config = {
            status: true
        };
        
        // Configure based on variant
        if (variant === '1') {
            config.BannerType = 'TinyPopupBanner';
            config.Title = 'Variant A Title';
        } else {
            config.BannerType = 'SquareCardBanner';
            config.Title = 'Variant B Title';
        }
        
        window.initInfMarketing('YOUR_BRAND', null, config);
    }
    
    // Initialize after Optimize loads
    setTimeout(initMarketingWithOptimize, 1000);
</script>
```

### With Custom A/B Testing

```html
<script src="./inf-marketing-component.js"></script>
<script>
    function getABTestVariant() {
        // Simple hash-based variant assignment
        const userId = localStorage.getItem('userId') || Math.random().toString(36);
        const hash = userId.split('').reduce((a, b) => {
            a = ((a << 5) - a) + b.charCodeAt(0);
            return a & a;
        }, 0);
        
        return Math.abs(hash) % 2; // 0 or 1
    }
    
    const variant = getABTestVariant();
    const config = variant === 0 ? {
        BannerType: 'TinyPopupBanner',
        Location: 'RightDown',
        Title: 'Control: Shop Now'
    } : {
        BannerType: 'SquareCardBanner',
        Location: 'Center',
        Title: 'Test: Discover Products'
    };
    
    // Track variant in analytics
    gtag('event', 'ab_test_assignment', {
        'variant': variant === 0 ? 'control' : 'test',
        'experiment': 'banner_type_test'
    });
    
    window.initInfMarketing('YOUR_BRAND', null, config);
</script>
```

---

## Performance Optimization

### Lazy Loading

```html
<script>
    // Only load marketing components when needed
    function loadMarketingComponents() {
        if (window.marketingLoaded) return;
        
        const script = document.createElement('script');
        script.src = './inf-marketing-component.js';
        script.onload = () => {
            window.marketingLoaded = true;
            window.initInfMarketing('YOUR_BRAND');
        };
        document.head.appendChild(script);
    }
    
    // Load when user shows intent to interact
    let interactionTimer;
    
    // Load on scroll
    window.addEventListener('scroll', function() {
        clearTimeout(interactionTimer);
        interactionTimer = setTimeout(loadMarketingComponents, 2000);
    }, { once: true });
    
    // Load on mouse movement
    document.addEventListener('mousemove', function() {
        clearTimeout(interactionTimer);
        interactionTimer = setTimeout(loadMarketingComponents, 3000);
    }, { once: true });
    
    // Load after 10 seconds regardless
    setTimeout(loadMarketingComponents, 10000);
</script>
```

### Preloading

```html
<!-- Preload the script -->
<link rel="preload" href="./inf-marketing-component.js" as="script">

<script>
    // Load immediately when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        window.initInfMarketing('YOUR_BRAND');
    });
</script>
```

---

## Troubleshooting

### Common Issues

1. **Script not loading**
   ```javascript
   // Check if script loaded
   if (typeof window.initInfMarketing === 'undefined') {
       console.error('INF Marketing script not loaded');
   }
   ```

2. **API errors**
   ```javascript
   window.addEventListener('infMarketingConfigError', function(event) {
       console.error('API Error:', event.detail);
       // Fallback to default configuration
       window.initInfMarketing('YOUR_BRAND', null, {
           BannerType: 'TinyPopupBanner',
           Title: 'Welcome',
           Description: 'Discover our products',
           status: true
       });
   });
   ```

3. **Mobile display issues**
   ```javascript
   // Ensure proper viewport meta tag
   if (!document.querySelector('meta[name="viewport"]')) {
       const viewport = document.createElement('meta');
       viewport.name = 'viewport';
       viewport.content = 'width=device-width, initial-scale=1.0';
       document.head.appendChild(viewport);
   }
   ```

### Debug Mode

```html
<script src="./inf-marketing-component.js"></script>
<script>
    // Enable debug logging
    window.infMarketingDebug = true;
    
    // Enhanced error handling
    window.addEventListener('infMarketingConfigError', function(event) {
        console.group('INF Marketing Error');
        console.error('Error:', event.detail.error);
        console.log('Brand:', event.detail.brand);
        console.log('Config:', event.detail.config);
        console.groupEnd();
    });
    
    window.initInfMarketing('YOUR_BRAND');
</script>
```