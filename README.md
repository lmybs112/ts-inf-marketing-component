# INF 行銷組件

這是一個用於整合智慧選物功能的行銷組件系統，支援多種品牌和彈出式行銷元件。

## 功能特色

- 🎯 **智慧選物推薦**: 根據用戶偏好提供個性化商品推薦
- 🎨 **多種組件類型**: 支援浮動按鈕、彈出視窗、橫幅廣告等多種顯示形式
- 🏷️ **品牌客製化**: 支援 OSTAMP、ALMI、OLIVO 等多個品牌的客製化設定
- 📱 **響應式設計**: 適配各種螢幕尺寸和設備
- ⚡ **動態載入**: 根據頁面內容動態顯示相關行銷組件

## 支援的品牌

### OSTAMP
- 網址: https://www.ostamp.com.tw/
- 特色: 智慧選物推薦系統

### ALMI  
- 網址: https://www.almi.com.tw/
- 特色: 個性化商品推薦

### OLIVO
- 網址: https://www.olivo.com.tw/
- 特色: 精準商品匹配

## 組件類型

### 1. 浮動按鈕組件 (`inf-marketing-floating-button-component.js`)
- 提供固定位置的浮動行銷按鈕
- 可自訂位置、顏色和文字內容
- 支援點擊觸發彈出視窗

### 2. 彈出視窗組件 (`inf-marketing-modal-component.js`)
- 全屏或半屏彈出視窗
- 支援 iframe 內容嵌入
- 可自訂關閉按鈕和背景設定

### 3. 彈出橫幅組件 (`inf-marketing-popup-banner-component.js`)
- 小型彈出式橫幅廣告
- 支援多種位置配置
- 可設定顯示時間和動畫效果

### 4. 方形卡片橫幅組件 (`inf-marketing-square-card-banner-component.js`)
- 方形卡片式行銷橫幅
- 適合產品推薦和促銷活動
- 支援圖片和文字內容

## 使用方式

### 基本設定

1. 在 HTML 頁面中引入主要組件：
```html
<script src="./inf-marketing-component.js"></script>
```

2. 初始化組件並指定品牌：
```javascript
// 測試特定品牌
testBrand('OSTAMP', 'https://www.ostamp.com.tw/');
```

### API 端點

系統會調用以下 API 取得行銷配置：

```
POST https://api.inffits.com/httpmpi/mkt_products_involve
```

請求格式：
```json
{
    "Brand": "ALMI",
    "url": "ALMIhop.shoplineapp.com/products/chartb"
}
```

### 配置參數

組件支援以下配置參數：

- `CTA_color`: 按鈕文字顏色
- `CTA_background`: 按鈕背景顏色  
- `CTA_text`: 按鈕文字內容
- `Title`: 標題文字
- `Description`: 描述文字
- `BannerType`: 橫幅類型
- `Location`: 顯示位置
- `TimeValid`: 有效時間範圍

## 開發指南

### 檔案結構

```
.
├── index.html                                      # 測試頁面
├── inf-marketing-component.js                      # 主要組件
├── inf-marketing-floating-button-component.js     # 浮動按鈕組件
├── inf-marketing-modal-component.js                # 彈出視窗組件
├── inf-marketing-popup-banner-component.js         # 彈出橫幅組件
└── inf-marketing-square-card-banner-component.js   # 方形卡片橫幅組件
```

### 測試方式

開啟 `index.html` 即可進行組件測試：

1. 選擇要測試的品牌
2. 觀察組件載入和顯示效果
3. 查看狀態資訊和除錯訊息

## 技術規格

- **語言**: JavaScript (ES6+)
- **樣式**: CSS3 with Flexbox/Grid
- **字體**: Noto Sans TC (繁體中文)
- **相容性**: 現代瀏覽器 (Chrome, Firefox, Safari, Edge)

## 授權

本專案為內部使用，請遵守相關授權條款。

## 聯絡資訊

如有問題或建議，請聯絡開發團隊。