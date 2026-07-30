// inf-marketing-floating-button-component.js
// 封裝浮動按鈕，點擊時開啟/關閉 inf-marketing-modal 彈窗

const FLOATING_TOOLTIP_TEXT = '來試試 infFITS 個人化推薦購物！';
const FLOATING_TOOLTIP_LOGO_SRC = 'data:image/png;base64,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';

const FLOATING_BTN_STYLE = `
.ai-pd-container {
  position: relative;
}
.ai-pd-container__anchor {
  z-index: 99999992;
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  width: 60px;
  height: 60px;
}
@media screen and (min-width: 480px) {
  .ai-pd-container__anchor {
    width: 70px;
    height: 70px;
  }
}

.ai-pd-container__tooltip-wrap {
  position: absolute;
  bottom: calc(100% + 16px);
  z-index: 2;
  width: max-content;
  max-width: min(300px, calc(100vw - 32px));
  min-width: 200px;
  padding-top: 15px;
  animation: ai-pd-tooltip-in 0.45s cubic-bezier(0.22, 1, 0.36, 1) both;
}
.ai-pd-container__tooltip-wrap--align-center {
  left: 50%;
  right: auto;
  transform: translateX(-50%);
  animation-name: ai-pd-tooltip-in-center;
}
.ai-pd-container__tooltip-wrap--align-start {
  left: 0;
  right: auto;
  transform: none;
}
.ai-pd-container__tooltip-wrap--align-end {
  left: auto;
  right: 0;
  transform: none;
}
.ai-pd-container__tooltip-wrap[hidden] {
  display: none !important;
  animation: none;
}
.ai-pd-container__tooltip {
  position: relative;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 48px;
  padding: 12px 36px 12px 20px;
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.92);
  border: 0.5px solid rgba(0, 0, 0, 0.06);
  box-shadow:
    0 0 0 0.5px rgba(0, 0, 0, 0.04),
    0 2px 8px rgba(0, 0, 0, 0.04),
    0 12px 28px rgba(0, 0, 0, 0.08);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  backdrop-filter: saturate(180%) blur(20px);
  cursor: pointer;
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}
.ai-pd-container__tooltip:hover {
  box-shadow:
    0 0 0 0.5px rgba(0, 0, 0, 0.06),
    0 4px 12px rgba(0, 0, 0, 0.06),
    0 14px 32px rgba(0, 0, 0, 0.1);
}
.ai-pd-container__tooltip-badge {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #ffffff;
  border: 0.5px solid rgba(0, 0, 0, 0.06);
  box-shadow:
    0 1px 2px rgba(0, 0, 0, 0.04),
    0 4px 12px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  pointer-events: none;
  z-index: 1;
}
.ai-pd-container__tooltip-badge-img {
  width: 16px;
  height: 16px;
  object-fit: contain;
  display: block;
}
.ai-pd-container__tooltip-close {
  position: absolute;
  top: 50%;
  right: 8px;
  transform: translateY(-50%);
  width: 22px;
  height: 22px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: transparent;
  color: rgba(60, 60, 67, 0.36);
  font-size: 17px;
  font-weight: 300;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease, color 0.2s ease;
}
.ai-pd-container__tooltip-close:hover,
.ai-pd-container__tooltip-close:focus-visible {
  color: rgba(60, 60, 67, 0.72);
  background: rgba(120, 120, 128, 0.12);
  outline: none;
}
.ai-pd-container__tooltip-typewriter {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  text-align: center;
}
.ai-pd-container__tooltip-text {
  color: #1d1d1f;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: -0.01em;
  line-height: 1.2;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Display', 'Helvetica Neue', 'PingFang TC', 'Noto Sans TC', sans-serif;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  display: block;
  transform: translateY(0.5px);
}
.ai-pd-container__tooltip-text::after {
  content: '';
  display: inline-block;
  width: 1.5px;
  height: 0.95em;
  margin-left: 2px;
  vertical-align: -0.08em;
  background: #1d1d1f;
  border-radius: 1px;
  animation: ai-pd-tooltip-caret 0.9s steps(1) infinite;
}
.ai-pd-container__tooltip-text--done {
  white-space: nowrap;
}
.ai-pd-container__tooltip-text--done::after {
  content: none;
  display: none;
  animation: none;
}
@media (prefers-reduced-motion: reduce) {
  .ai-pd-container__tooltip-wrap {
    animation: none;
  }
  .ai-pd-container__tooltip-text::after {
    animation: none;
    opacity: 0;
  }
}
@keyframes ai-pd-tooltip-caret {
  0%, 50% { opacity: 1; }
  50.01%, 100% { opacity: 0; }
}
@keyframes ai-pd-tooltip-in {
  from {
    opacity: 0;
    transform: translateY(6px) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
@keyframes ai-pd-tooltip-in-center {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(6px) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0) scale(1);
  }
}
.ai-pd-container__trigger {
  z-index: 1;
  position: relative;
  display: flex;
  box-sizing: border-box;
  padding: 14px;
  justify-content: center;
  margin: 0;
  align-items: center;
  flex-shrink: 0;
  border-radius: 21px;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0px 0.5px 5px 0px rgba(0, 0, 0, 0.14), 0px 0px 20px 0px rgba(0, 0, 0, 0.15);
  width: 60px;
  height: 60px;
  border: none;
  transition: box-shadow 0.3s;
}
.ai-pd-container__trigger:hover, .ai-pd-container__trigger:active {
  cursor: pointer;
  box-shadow: 0px 2px 12px 0px rgba(0,0,0,0.18);
}
@media screen and (min-width: 480px) {
  .ai-pd-container .ai-pd-container__trigger {
    width: 70px;
    height: 70px;
    padding: 15px;
    border-radius: 25px;
    -webkit-border-radius: 25px;
    -moz-border-radius: 25px;
    -ms-border-radius: 25px;
    -o-border-radius: 25px;
    box-shadow: 0px 0.5px 5px 0px rgba(0, 0, 0, 0.18), 0px 0px 20px 0px rgba(0, 0, 0, 0.15);
    -webkit-backdrop-filter: blur(40px);
    backdrop-filter: blur(40px);
    --webkit-backdrop-filter: blur(40px);
  }
}
.ai-pd-container .ai-pd-container__trigger .ai-pd-container__icon {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background-size: contain;
  background-repeat: no-repeat;
  transition: opacity 0.3s ease-out;
  -webkit-transition: opacity 0.3s ease-out;
  -moz-transition: opacity 0.3s ease-out;
  -ms-transition: opacity 0.3s ease-out;
  -o-transition: opacity 0.3s ease-out;
}
.ai-pd-container .ai-pd-container__trigger .ai-pd-container__icon--alert {
  display: none;
}

/* 搜尋狀態的 hover 效果 */
.ai-pd-container .ai-pd-container__trigger--search:not(.ai-pd-container__trigger--result):hover .ai-pd-container__icon, 
.ai-pd-container .ai-pd-container__trigger--search:not(.ai-pd-container__trigger--result):active .ai-pd-container__icon {
  background-image: url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20fill%3D%22none%22%3E%3Cg%20clip-path%3D%22url(%23clip0_3305_2871)%22%3E%3Cpath%20d%3D%22M5.24895%2019.1485C7.59554%2025.3933%2014.5602%2028.5533%2020.8049%2026.2067C27.0496%2023.8602%2030.2097%2016.8955%2027.8631%2010.6508C25.5165%204.40604%2018.5519%201.24597%2012.3072%203.59256C6.06243%205.93914%202.90236%2012.9038%205.24895%2019.1485Z%22%20fill%3D%22url(%23paint0_linear_3305_2871)%22%2F%3E%3Cpath%20d%3D%22M16.956%2030.812C25.285%2030.812%2032.037%2024.06%2032.037%2015.731C32.037%207.40202%2025.285%200.650024%2016.956%200.650024C8.627%200.650024%201.875%207.40202%201.875%2015.731C1.875%2024.06%208.627%2030.812%2016.956%2030.812ZM27.787%2015.731C27.787%2021.7128%2022.9378%2026.562%2016.956%2026.562C10.9742%2026.562%206.125%2021.7128%206.125%2015.731C6.125%209.74923%2010.9742%204.90002%2016.956%204.90002C22.9378%204.90002%2027.787%209.74923%2027.787%2015.731Z%22%20fill%3D%22%231E1E19%22%20stroke%3D%22%231E1E19%22%20stroke-width%3D%220.25%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M24.0633%2025.2728C24.8444%2024.4917%2026.1107%2024.4917%2026.8918%2025.2728L33.511%2031.8921C34.2921%2032.6731%2034.2921%2033.9394%2033.511%2034.7205C32.73%2035.5015%2031.4636%2035.5015%2030.6826%2034.7205L24.0633%2028.1012C23.2823%2027.3202%2023.2823%2026.0538%2024.0633%2025.2728Z%22%20fill%3D%22%231E1E19%22%2F%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M21.3034%2016.6005H22.0534C22.0534%2014.9978%2023.3527%2013.6985%2024.9554%2013.6985V12.9485V12.1985C23.3527%2012.1985%2022.0534%2010.8992%2022.0534%209.29651H21.3034H20.5534C20.5534%2010.8992%2019.2541%2012.1985%2017.6514%2012.1985V12.9485V13.6985C19.2541%2013.6985%2020.5534%2014.9978%2020.5534%2016.6005H21.3034Z%22%20fill%3D%22%231E1E19%22%2F%3E%3Crect%20x%3D%2225.978%22%20y%3D%2231.7047%22%20width%3D%226.33129%22%20height%3D%2210.7663%22%20rx%3D%223%22%20transform%3D%22rotate(-45%2025.978%2031.7047)%22%20fill%3D%22%231E1E19%22%2F%3E%3C%2Fg%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22paint0_linear_3305_2871%22%20x1%3D%2212.3072%22%20y1%3D%223.59256%22%20x2%3D%2220.1721%22%20y2%3D%2224.5227%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23F9FE9F%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23CBE2E2%22%2F%3E%3C%2FlinearGradient%3E%3CclipPath%20id%3D%22clip0_3305_2871%22%3E%3Crect%20width%3D%2240%22%20height%3D%2240%22%20fill%3D%22white%22%2F%3E%3C%2FclipPath%3E%3C%2Fdefs%3E%3C%2Fsvg%3E");
}

/* 結果狀態的 hover 效果 */
.ai-pd-container .ai-pd-container__trigger--result:not(.ai-pd-container__trigger--close):hover .ai-pd-container__icon, 
.ai-pd-container .ai-pd-container__trigger--result:not(.ai-pd-container__trigger--close):active .ai-pd-container__icon {
  background-image: url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20fill%3D%22none%22%3E%3Cg%20clip-path%3D%22url(%23clip0_3305_2871)%22%3E%3Cpath%20d%3D%22M5.24895%2019.1485C7.59554%2025.3933%2014.5602%2028.5533%2020.8049%2026.2067C27.0496%2023.8602%2030.2097%2016.8955%2027.8631%2010.6508C25.5165%204.40604%2018.5519%201.24597%2012.3072%203.59256C6.06243%205.93914%202.90236%2012.9038%205.24895%2019.1485Z%22%20fill%3D%22url(%23paint0_linear_3305_2871)%22%2F%3E%3Cpath%20d%3D%22M16.956%2030.812C25.285%2030.812%2032.037%2024.06%2032.037%2015.731C32.037%207.40202%2025.285%200.650024%2016.956%200.650024C8.627%200.650024%201.875%207.40202%201.875%2015.731C1.875%2024.06%208.627%2030.812%2016.956%2030.812ZM27.787%2015.731C27.787%2021.7128%2022.9378%2026.562%2016.956%2026.562C10.9742%2026.562%206.125%2021.7128%206.125%2015.731C6.125%209.74923%2010.9742%204.90002%2016.956%204.90002C22.9378%204.90002%2027.787%209.74923%2027.787%2015.731Z%22%20fill%3D%22%231E1E19%22%20stroke%3D%22%231E1E19%22%20stroke-width%3D%220.25%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M24.0633%2025.2728C24.8444%2024.4917%2026.1107%2024.4917%2026.8918%2025.2728L33.511%2031.8921C34.2921%2032.6731%2034.2921%2033.9394%2033.511%2034.7205C32.73%2035.5015%2031.4636%2035.5015%2030.6826%2034.7205L24.0633%2028.1012C23.2823%2027.3202%2023.2823%2026.0538%2024.0633%2025.2728Z%22%20fill%3D%22%231E1E19%22%2F%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M21.3034%2016.6005H22.0534C22.0534%2014.9978%2023.3527%2013.6985%2024.9554%2013.6985V12.9485V12.1985C23.3527%2012.1985%2022.0534%2010.8992%2022.0534%209.29651H21.3034H20.5534C20.5534%2010.8992%2019.2541%2012.1985%2017.6514%2012.1985V12.9485V13.6985C19.2541%2013.6985%2020.5534%2014.9978%2020.5534%2016.6005H21.3034Z%22%20fill%3D%22%231E1E19%22%2F%3E%3Crect%20x%3D%2225.978%22%20y%3D%2231.7047%22%20width%3D%226.33129%22%20height%3D%2210.7663%22%20rx%3D%223%22%20transform%3D%22rotate(-45%2025.978%2031.7047)%22%20fill%3D%22%231E1E19%22%2F%3E%3C%2Fg%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22paint0_linear_3305_2871%22%20x1%3D%2212.3072%22%20y1%3D%223.59256%22%20x2%3D%2220.1721%22%20y2%3D%2224.5227%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23F9FE9F%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23CBE2E2%22%2F%3E%3C%2FlinearGradient%3E%3CclipPath%20id%3D%22clip0_3305_2871%22%3E%3Crect%20width%3D%2240%22%20height%3D%2240%22%20fill%3D%22white%22%2F%3E%3C%2FclipPath%3E%3C%2Fdefs%3E%3C%2Fsvg%3E");
}

/* 搜尋狀態的預設圖標 */
.ai-pd-container .ai-pd-container__trigger--search:not(.ai-pd-container__trigger--result) .ai-pd-container__icon {
  background-image: url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20fill%3D%22none%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M24.0633%2025.2728C24.8444%2024.4917%2026.1107%2024.4917%2026.8918%2025.2728L33.511%2031.8921C34.2921%2032.6731%2034.2921%2033.9394%2033.511%2034.7205C32.73%2035.5015%2031.4636%2035.5015%2030.6826%2034.7205L24.0633%2028.1012C23.2823%2027.3202%2023.2823%2026.0538%2024.0633%2025.2728Z%22%20fill%3D%22%231E1E19%22%2F%3E%3Crect%20x%3D%2225.978%22%20y%3D%2231.7047%22%20width%3D%226.33129%22%20height%3D%2210.7663%22%20rx%3D%223%22%20transform%3D%22rotate(-45%2025.978%2031.7047)%22%20fill%3D%22%231E1E19%22%2F%3E%3Cg%20filter%3D%22url(%23filter0_b_3305_3475)%22%3E%3Cellipse%20cx%3D%2216.9998%22%20cy%3D%2215.8828%22%20rx%3D%2213.3714%22%20ry%3D%2213.3714%22%20fill%3D%22%23FCFCF8%22%20fill-opacity%3D%220.3%22%2F%3E%3C%2Fg%3E%3Cpath%20d%3D%22M16.956%2030.812C25.285%2030.812%2032.037%2024.06%2032.037%2015.731C32.037%207.40202%2025.285%200.650024%2016.956%200.650024C8.627%200.650024%201.875%207.40202%201.875%2015.731C1.875%2024.06%208.627%2030.812%2016.956%2030.812ZM27.787%2015.731C27.787%2021.7128%2022.9378%2026.562%2016.956%2026.562C10.9742%2026.562%206.125%2021.7128%206.125%2015.731C6.125%209.74923%2010.9742%204.90002%2016.956%204.90002C22.9378%204.90002%2027.787%209.74923%2027.787%2015.731Z%22%20fill%3D%22%233C3C39%22%20stroke%3D%22%233C3C39%22%20stroke-width%3D%220.25%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M21.3034%2016.6005H22.0534C22.0534%2014.9978%2023.3527%2013.6985%2024.9554%2013.6985V12.9485V12.1985C23.3527%2012.1985%2022.0534%2010.8992%2022.0534%209.29651H21.3034H20.5534C20.5534%2010.8992%2019.2541%2012.1985%2017.6514%2012.1985V12.9485V13.6985C19.2541%2013.6985%2020.5534%2014.9978%2020.5534%2016.6005H21.3034Z%22%20fill%3D%22%231E1E19%22%2F%3E%3Cdefs%3E%3Cfilter%20id%3D%22filter0_b_3305_3475%22%20x%3D%22-28.3716%22%20y%3D%22-29.4886%22%20width%3D%2290.7427%22%20height%3D%2290.7429%22%20filterUnits%3D%22userSpaceOnUse%22%20color-interpolation-filters%3D%22sRGB%22%3E%3CfeFlood%20flood-opacity%3D%220%22%20result%3D%22BackgroundImageFix%22%2F%3E%3CfeGaussianBlur%20in%3D%22BackgroundImageFix%22%20stdDeviation%3D%2216%22%2F%3E%3CfeComposite%20in2%3D%22SourceAlpha%22%20operator%3D%22in%22%20result%3D%22effect1_backgroundBlur_3305_3475%22%2F%3E%3CfeBlend%20mode%3D%22normal%22%20in%3D%22SourceGraphic%22%20in2%3D%22effect1_backgroundBlur_3305_3475%22%20result%3D%22shape%22%2F%3E%3C%2Ffilter%3E%3C%2Fdefs%3E%3C%2Fsvg%3E");
}

/* 結果狀態的圖標 */
.ai-pd-container .ai-pd-container__trigger--result:not(.ai-pd-container__trigger--search) .ai-pd-container__icon {
   background-image: url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20fill%3D%22none%22%3E%3Cg%20clip-path%3D%22url(%23clip0_3305_2871)%22%3E%3Cpath%20d%3D%22M5.24895%2019.1485C7.59554%2025.3933%2014.5602%2028.5533%2020.8049%2026.2067C27.0496%2023.8602%2030.2097%2016.8955%2027.8631%2010.6508C25.5165%204.40604%2018.5519%201.24597%2012.3072%203.59256C6.06243%205.93914%202.90236%2012.9038%205.24895%2019.1485Z%22%20fill%3D%22url(%23paint0_linear_3305_2871)%22%2F%3E%3Cpath%20d%3D%22M16.956%2030.812C25.285%2030.812%2032.037%2024.06%2032.037%2015.731C32.037%207.40202%2025.285%200.650024%2016.956%200.650024C8.627%200.650024%201.875%207.40202%201.875%2015.731C1.875%2024.06%208.627%2030.812%2016.956%2030.812ZM27.787%2015.731C27.787%2021.7128%2022.9378%2026.562%2016.956%2026.562C10.9742%2026.562%206.125%2021.7128%206.125%2015.731C6.125%209.74923%2010.9742%204.90002%2016.956%204.90002C22.9378%204.90002%2027.787%209.74923%2027.787%2015.731Z%22%20fill%3D%22%231E1E19%22%20stroke%3D%22%231E1E19%22%20stroke-width%3D%220.25%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M24.0633%2025.2728C24.8444%2024.4917%2026.1107%2024.4917%2026.8918%2025.2728L33.511%2031.8921C34.2921%2032.6731%2034.2921%2033.9394%2033.511%2034.7205C32.73%2035.5015%2031.4636%2035.5015%2030.6826%2034.7205L24.0633%2028.1012C23.2823%2027.3202%2023.2823%2026.0538%2024.0633%2025.2728Z%22%20fill%3D%22%231E1E19%22%2F%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M21.3034%2016.6005H22.0534C22.0534%2014.9978%2023.3527%2013.6985%2024.9554%2013.6985V12.9485V12.1985C23.3527%2012.1985%2022.0534%2010.8992%2022.0534%209.29651H21.3034H20.5534C20.5534%2010.8992%2019.2541%2012.1985%2017.6514%2012.1985V12.9485V13.6985C19.2541%2013.6985%2020.5534%2014.9978%2020.5534%2016.6005H21.3034Z%22%20fill%3D%22%231E1E19%22%2F%3E%3Crect%20x%3D%2225.978%22%20y%3D%2231.7047%22%20width%3D%226.33129%22%20height%3D%2210.7663%22%20rx%3D%223%22%20transform%3D%22rotate(-45%2025.978%2031.7047)%22%20fill%3D%22%231E1E19%22%2F%3E%3C%2Fg%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22paint0_linear_3305_2871%22%20x1%3D%2212.3072%22%20y1%3D%223.59256%22%20x2%3D%2220.1721%22%20y2%3D%2224.5227%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%23F9FE9F%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23CBE2E2%22%2F%3E%3C%2FlinearGradient%3E%3CclipPath%20id%3D%22clip0_3305_2871%22%3E%3Crect%20width%3D%2240%22%20height%3D%2240%22%20fill%3D%22white%22%2F%3E%3C%2FclipPath%3E%3C%2Fdefs%3E%3C%2Fsvg%3E");
}

/* 結果狀態且非關閉狀態的圖標 */
.ai-pd-container .ai-pd-container__trigger--result:not(.ai-pd-container__trigger--close) .ai-pd-container__icon {
  background-image: url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20fill%3D%22none%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M24.0633%2025.2728C24.8444%2024.4917%2026.1107%2024.4917%2026.8918%2025.2728L33.511%2031.8921C34.2921%2032.6731%2034.2921%2033.9394%2033.511%2034.7205C32.73%2035.5015%2031.4636%2035.5015%2030.6826%2034.7205L24.0633%2028.1012C23.2823%2027.3202%2023.2823%2026.0538%2024.0633%2025.2728Z%22%20fill%3D%22%231E1E19%22%2F%3E%3Crect%20x%3D%2225.978%22%20y%3D%2231.7047%22%20width%3D%226.33129%22%20height%3D%2210.7663%22%20rx%3D%223%22%20transform%3D%22rotate(-45%2025.978%2031.7047)%22%20fill%3D%22%231E1E19%22%2F%3E%3Cg%20filter%3D%22url(%23filter0_b_3305_3475)%22%3E%3Cellipse%20cx%3D%2216.9998%22%20cy%3D%2215.8828%22%20rx%3D%2213.3714%22%20ry%3D%2213.3714%22%20fill%3D%22%23FCFCF8%22%20fill-opacity%3D%220.3%22%2F%3E%3C%2Fg%3E%3Cpath%20d%3D%22M16.956%2030.812C25.285%2030.812%2032.037%2024.06%2032.037%2015.731C32.037%207.40202%2025.285%200.650024%2016.956%200.650024C8.627%200.650024%201.875%207.40202%201.875%2015.731C1.875%2024.06%208.627%2030.812%2016.956%2030.812ZM27.787%2015.731C27.787%2021.7128%2022.9378%2026.562%2016.956%2026.562C10.9742%2026.562%206.125%2021.7128%206.125%2015.731C6.125%209.74923%2010.9742%204.90002%2016.956%204.90002C22.9378%204.90002%2027.787%209.74923%2027.787%2015.731Z%22%20fill%3D%22%233C3C39%22%20stroke%3D%22%233C3C39%22%20stroke-width%3D%220.25%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M21.3034%2016.6005H22.0534C22.0534%2014.9978%2023.3527%2013.6985%2024.9554%2013.6985V12.9485V12.1985C23.3527%2012.1985%2022.0534%2010.8992%2022.0534%209.29651H21.3034H20.5534C20.5534%2010.8992%2019.2541%2012.1985%2017.6514%2012.1985V12.9485V13.6985C19.2541%2013.6985%2020.5534%2014.9978%2020.5534%2016.6005H21.3034Z%22%20fill%3D%22%231E1E19%22%2F%3E%3Cdefs%3E%3Cfilter%20id%3D%22filter0_b_3305_3475%22%20x%3D%22-28.3716%22%20y%3D%22-29.4886%22%20width%3D%2290.7427%22%20height%3D%2290.7429%22%20filterUnits%3D%22userSpaceOnUse%22%20color-interpolation-filters%3D%22sRGB%22%3E%3CfeFlood%20flood-opacity%3D%220%22%20result%3D%22BackgroundImageFix%22%2F%3E%3CfeGaussianBlur%20in%3D%22BackgroundImageFix%22%20stdDeviation%3D%2216%22%2F%3E%3CfeComposite%20in2%3D%22SourceAlpha%22%20operator%3D%22in%22%20result%3D%22effect1_backgroundBlur_3305_3475%22%2F%3E%3CfeBlend%20mode%3D%22normal%22%20in%3D%22SourceGraphic%22%20in2%3D%22effect1_backgroundBlur_3305_3475%22%20result%3D%22shape%22%2F%3E%3C%2Ffilter%3E%3C%2Fdefs%3E%3C%2Fsvg%3E");
}

.ai-pd-container .ai-pd-container__trigger--result .ai-pd-container__icon--alert {
  display: block;
  position: absolute;
  width: 16px;
  height: 16px;
  top: -2px;
  right: -2px;
}
@media screen and (min-width: 480px) {
  .ai-pd-container .ai-pd-container__trigger--result .ai-pd-container__icon--alert {
    width: 20px;
    height: 20px;
  }
}
.ai-pd-container .ai-pd-container__trigger--close:not(.ai-pd-container__trigger--result) {
  background: rgba(255, 255, 255, 0.85);
  padding: 16px;
}
@media screen and (min-width: 480px) {
  .ai-pd-container .ai-pd-container__trigger--close:not(.ai-pd-container__trigger--result) {
    padding: 21px;
  }
}
.ai-pd-container .ai-pd-container__trigger--close:not(.ai-pd-container__trigger--result):hover .ai-pd-container__icon, .ai-pd-container .ai-pd-container__trigger--close:not(.ai-pd-container__trigger--result):active .ai-pd-container__icon {
  opacity: 1;
}
.ai-pd-container .ai-pd-container__trigger--close:not(.ai-pd-container__trigger--result) .ai-pd-container__icon {
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cg opacity='0.5'%3e%3cpath d='M15 5L5 15' stroke='%233B3B32' stroke-width='4' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M5 5L15 15' stroke='%233B3B32' stroke-width='4' stroke-linecap='round' stroke-linejoin='round'/%3e%3c/g%3e%3c/svg%3e ");
  opacity: 0.5;
}
`;

class InfMarketingFloatButtonComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._modal = null;
    this._onButtonClick = this._onButtonClick.bind(this);
    this._onTooltipCloseClick = this._onTooltipCloseClick.bind(this);
    this._onTooltipClick = this._onTooltipClick.bind(this);
    this._onTooltipKeyDown = this._onTooltipKeyDown.bind(this);
    this._isModalOpen = false; // 追蹤彈窗狀態
    this._hasResult = false; // 追蹤是否有搜尋結果
    this._tooltipDismissed = false; // 本次瀏覽是否已關閉打字機對話框
    this._typewriterTimer = null; // 打字機計時器
    this._typewriterCompleted = false; // 打字機是否已跑完一次
  }

  static get observedAttributes() {
    return ['position', 'float-tooltip-text'];
  }

  // 未設屬性 → 預設文案；空字串 → 不顯示對話框；其餘 → 自訂文案
  _getTooltipText() {
    if (!this.hasAttribute('float-tooltip-text')) {
      return FLOATING_TOOLTIP_TEXT;
    }
    return this.getAttribute('float-tooltip-text') || '';
  }

  _isTooltipDisabledByText() {
    return this.hasAttribute('float-tooltip-text') && !this.getAttribute('float-tooltip-text');
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue && name === 'position') {
      this.updatePosition();
    } else if (oldValue !== newValue && name === 'float-tooltip-text') {
      this._typewriterCompleted = false;
      if (this.shadowRoot && this.shadowRoot.querySelector('.ai-pd-container__tooltip')) {
        const tooltip = this.shadowRoot.querySelector('.ai-pd-container__tooltip');
        const text = this._getTooltipText();
        if (tooltip) {
          tooltip.setAttribute('aria-label', text ? `開啟智慧選物：${text}` : '開啟智慧選物');
        }
        this._syncTooltipVisibility();
      }
    }
  }

  connectedCallback() {
    this._tooltipDismissed = false;
    this.render();
    this.setupEventListeners();
    
    // 自動插入 modal 組件（如不存在）
    if (!document.querySelector('inf-marketing-modal')) {
      const modal = document.createElement('inf-marketing-modal');
      modal.setAttribute('id', 'infMarketingModal');
      document.body.appendChild(modal);
    }
    this._modal = document.querySelector('inf-marketing-modal');
    
    // 監聽彈窗狀態變化
    this._setupModalListeners();
    
    // 監聽 iframe 消息
    this._setupIframeMessageListener();
    this._syncTooltipVisibility();
  }

  disconnectedCallback() {
    this._stopTypewriter();
    this.removeEventListeners();
    this._removeIframeMessageListener();
  }

  // 設置彈窗狀態監聽器
  _setupModalListeners() {
    if (!this._modal) return;
    
    // 監聽彈窗顯示事件
    this._modal.addEventListener('inf-marketing-modal:show', () => {
      this._isModalOpen = true;
      this._updateButtonState();
    });
    
    // 監聽彈窗隱藏事件
    this._modal.addEventListener('inf-marketing-modal:hide', () => {
      this._isModalOpen = false;
      this._updateButtonState();
    });
  }

  // 更新按鈕狀態
  _updateButtonState() {
    const trigger = this.shadowRoot.querySelector('.ai-pd-container__trigger');
    if (!trigger) return;
    
    if (this._isModalOpen) {
      // 彈窗開啟時，切換到關閉狀態
      trigger.classList.remove('ai-pd-container__trigger--search');
      trigger.classList.remove('ai-pd-container__trigger--result');
      trigger.classList.add('ai-pd-container__trigger--close');
      trigger.title = '關閉智慧選物';
    } else {
      // 彈窗關閉時，檢查是否有結果狀態需要恢復
      trigger.classList.remove('ai-pd-container__trigger--close');
      
      // 如果有結果狀態的記憶，恢復到結果狀態
      if (this._hasResult) {
        trigger.classList.remove('ai-pd-container__trigger--search');
        trigger.classList.add('ai-pd-container__trigger--result');
        trigger.title = '查看搜尋結果';
      } else {
        // 否則恢復到搜尋狀態
        trigger.classList.remove('ai-pd-container__trigger--result');
      trigger.classList.add('ai-pd-container__trigger--search');
      trigger.title = '開啟智慧選物';
      }
    }
    this._syncTooltipVisibility();
  }

  // 關閉打字機對話框（當前頁面實例不再顯示）
  _dismissTooltip() {
    this._tooltipDismissed = true;
    this._syncTooltipVisibility();
  }

  _onTooltipCloseClick(event) {
    event.preventDefault();
    event.stopPropagation();
    this._dismissTooltip();
  }

  // 點擊對話框：送出 GA4 並開啟智慧選物
  _onTooltipClick(event) {
    if (event.target.closest('.ai-pd-container__tooltip-close')) {
      return;
    }
    event.preventDefault();
    this._trackFloatTooltipGa4();
    this._openSmartSelectionFromTooltip();
  }

  _onTooltipKeyDown(event) {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    if (event.target.closest('.ai-pd-container__tooltip-close')) return;
    event.preventDefault();
    this._trackFloatTooltipGa4();
    this._openSmartSelectionFromTooltip();
  }

  _trackFloatTooltipGa4() {
    try {
      var brand = this.getAttribute('brand') || '';
      var route = this.getAttribute('iframe-id') || '';
      var measurementId = window.GA_MEASUREMENT_ID || '';

      if (typeof window.gtag !== 'function') return;

      var gaPayload = {
        event_category: 'inffits_route',
        event_label: 'float_tooltip_open',
        value: 1,
        action: 'tooltip_open',
        brand: brand,
        route: route
      };
      if (measurementId) {
        gaPayload.send_to = measurementId;
      }
      window.gtag('event', 'float_tooltip_click', gaPayload);
    } catch (e) {
      console.warn('float tooltip GA4 事件發送失敗:', e);
    }
  }

  // 由對話框開啟智慧選物（只開不關）
  _openSmartSelectionFromTooltip() {
    if (!this._modal) return;

    this._dismissTooltip();
    if (this._modal.visible) return;

    const isTabletOrLarger = window.innerWidth >= 768;

    if (isTabletOrLarger) {
      const position = this.getAttribute('position') || 'LeftDown';
      if (position === 'RightDown') {
        this._configureModalForRightDown();
      } else if (position === 'LeftDown') {
        this._configureModalForLeftDown();
      }
    } else {
      this._resetModalToCenter();
    }

    if (this.modalIframeUrl && this._modal.setIframeUrl && typeof this._modal.setIframeUrl === 'function') {
      this._modal.setIframeUrl(this.modalIframeUrl);
    } else if (this._modal.setIframeUrl && typeof this._modal.setIframeUrl === 'function') {
      this._modal.setIframeUrl('https://ts-iframe-no-media.vercel.app/iframe_container_module.html');
    }

    this._modal.show();
  }

  _stopTypewriter() {
    if (this._typewriterTimer) {
      clearTimeout(this._typewriterTimer);
      this._typewriterTimer = null;
    }
  }

  // 打字機效果：逐字顯示一次，完成後呈現一般文字
  _startTypewriter() {
    this._stopTypewriter();
    const textEl = this.shadowRoot.querySelector('.ai-pd-container__tooltip-text');
    if (!textEl) return;

    const tooltipText = this._getTooltipText();
    if (!tooltipText) return;

    if (this._typewriterCompleted) {
      textEl.textContent = tooltipText;
      textEl.classList.add('ai-pd-container__tooltip-text--done');
      return;
    }

    textEl.classList.remove('ai-pd-container__tooltip-text--done');

    const prefersReducedMotion = window.matchMedia
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      textEl.textContent = tooltipText;
      textEl.classList.add('ai-pd-container__tooltip-text--done');
      this._typewriterCompleted = true;
      return;
    }

    let index = 0;
    textEl.textContent = '';

    const typeNext = () => {
      if (this._tooltipDismissed) return;
      if (index < tooltipText.length) {
        textEl.textContent = tooltipText.slice(0, index + 1);
        index += 1;
        this._typewriterTimer = setTimeout(typeNext, 90);
        return;
      }
      this._typewriterTimer = null;
      this._typewriterCompleted = true;
      textEl.classList.add('ai-pd-container__tooltip-text--done');
    };

    typeNext();
  }

  // 僅在搜尋狀態且未關閉時顯示對話框
  _syncTooltipVisibility() {
    const tooltip = this.shadowRoot.querySelector('.ai-pd-container__tooltip-wrap');
    const trigger = this.shadowRoot.querySelector('.ai-pd-container__trigger');
    if (!tooltip || !trigger) return;

    const isSearchState = trigger.classList.contains('ai-pd-container__trigger--search')
      && !trigger.classList.contains('ai-pd-container__trigger--close')
      && !trigger.classList.contains('ai-pd-container__trigger--result');

    if (!this._tooltipDismissed && isSearchState && !this._isTooltipDisabledByText()) {
      const needsStart = tooltip.hidden || (!this._typewriterTimer && !this._typewriterCompleted);
      tooltip.hidden = false;
      if (needsStart) {
        this._startTypewriter();
      } else if (this._typewriterCompleted) {
        const textEl = this.shadowRoot.querySelector('.ai-pd-container__tooltip-text');
        const tooltipText = this._getTooltipText();
        if (textEl && tooltipText) {
          textEl.textContent = tooltipText;
          textEl.classList.add('ai-pd-container__tooltip-text--done');
        }
      }
    } else {
      tooltip.hidden = true;
      this._stopTypewriter();
    }
  }

  // 設置結果狀態（當有搜尋結果時調用）
  setResultState() {
    const trigger = this.shadowRoot.querySelector('.ai-pd-container__trigger');
    if (!trigger) return;
    
    trigger.classList.remove('ai-pd-container__trigger--search');
    trigger.classList.remove('ai-pd-container__trigger--close');
    trigger.classList.add('ai-pd-container__trigger--result');
    trigger.title = '查看搜尋結果';
    this._syncTooltipVisibility();
  }

  // 重置為搜尋狀態
  resetToSearchState() {
    const trigger = this.shadowRoot.querySelector('.ai-pd-container__trigger');
    if (!trigger) return;
    
    trigger.classList.remove('ai-pd-container__trigger--result');
    trigger.classList.remove('ai-pd-container__trigger--close');
    trigger.classList.add('ai-pd-container__trigger--search');
    trigger.title = '開啟智慧選物';
    this._syncTooltipVisibility();
  }

  // 設置 iframe 消息監聽器
  _setupIframeMessageListener() {
    // 綁定 this 上下文
    this._boundHandleIframeMessage = this._handleIframeMessage.bind(this);
    
    // 監聽來自 iframe 的 postMessage
    window.addEventListener('message', this._boundHandleIframeMessage);
  }

  // 處理 iframe 消息
  _handleIframeMessage(event) {
    try {
      // 檢查消息格式
      if (event.data && typeof event.data === 'object') {
        const { type, value } = event.data;
        
        // 監聽 iframe 回傳值 type === 'result'
        if (type === 'result') {
          if (value) {
            // 有搜尋結果時，記錄狀態並在彈窗關閉時顯示結果狀態
            this._hasResult = true;
            const trigger = this.shadowRoot.querySelector('.ai-pd-container__trigger');
            if (trigger && trigger.classList.contains('ai-pd-container__trigger--search')) {
              // 只有在搜尋狀態（彈窗關閉）時才切換到結果狀態
              this.setResultState();
            }
          } else {
            // 沒有搜尋結果時，清除結果狀態並重置為搜尋狀態
            this._hasResult = false;
            this.resetToSearchState();
          }
        }
      }
    } catch (error) {
      console.warn('處理 iframe 消息時發生錯誤:', error);
    }
  }

  // 移除 iframe 消息監聽器
  _removeIframeMessageListener() {
    if (this._boundHandleIframeMessage) {
      window.removeEventListener('message', this._boundHandleIframeMessage);
    }
  }

  // 獲取位置樣式
  getPositionStyles() {
    const position = this.getAttribute('position') || 'LeftDown';
    const positions = {
      'RightDown': {
        bottom: '16px',
        right: '16px',
        left: 'auto',
        top: 'auto',
        transform: 'none'
      },
      'LeftDown': {
        bottom: '16px',
        left: '16px',
        right: 'auto',
        top: 'auto',
        transform: 'none'
      },
      'CenterDown': {
        bottom: '16px',
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
    return positions[position] || positions['LeftDown'];
  }

  // 依按鈕位置決定對話框水平對齊，避免超出視窗
  getTooltipAlignClass() {
    const position = this.getAttribute('position') || 'LeftDown';
    if (position === 'RightDown') {
      return 'ai-pd-container__tooltip-wrap--align-end';
    }
    if (position === 'LeftDown') {
      return 'ai-pd-container__tooltip-wrap--align-start';
    }
    return 'ai-pd-container__tooltip-wrap--align-center';
  }

  // 更新位置
  updatePosition() {
    const anchor = this.shadowRoot.querySelector('.ai-pd-container__anchor');
    if (anchor) {
      const positionStyles = this.getPositionStyles();
      
      // 清除所有位置樣式
      anchor.style.bottom = '';
      anchor.style.right = '';
      anchor.style.left = '';
      anchor.style.top = '';
      anchor.style.transform = '';
      
      // 設置新的位置樣式
      if (positionStyles.bottom) anchor.style.bottom = positionStyles.bottom;
      if (positionStyles.right) anchor.style.right = positionStyles.right;
      if (positionStyles.left) anchor.style.left = positionStyles.left;
      if (positionStyles.top) anchor.style.top = positionStyles.top;
      if (positionStyles.transform) anchor.style.transform = positionStyles.transform;
    }

    const tooltip = this.shadowRoot.querySelector('.ai-pd-container__tooltip-wrap');
    if (tooltip) {
      tooltip.classList.remove(
        'ai-pd-container__tooltip-wrap--align-start',
        'ai-pd-container__tooltip-wrap--align-end',
        'ai-pd-container__tooltip-wrap--align-center'
      );
      tooltip.classList.add(this.getTooltipAlignClass());
    }
  }

  // 設置事件監聽器
  setupEventListeners() {
    const trigger = this.shadowRoot.querySelector('.ai-pd-container__trigger');
    if (trigger) {
      trigger.addEventListener('click', this._onButtonClick);
    }
    const tooltipClose = this.shadowRoot.querySelector('.ai-pd-container__tooltip-close');
    if (tooltipClose) {
      tooltipClose.addEventListener('click', this._onTooltipCloseClick);
    }
    const tooltip = this.shadowRoot.querySelector('.ai-pd-container__tooltip');
    if (tooltip) {
      tooltip.addEventListener('click', this._onTooltipClick);
      tooltip.addEventListener('keydown', this._onTooltipKeyDown);
    }
  }

  // 設置彈窗 iframe URL（統一接口）
  setModalIframeUrl(url) {
    this.modalIframeUrl = url;
    
    // 如果 modal 已存在，立即設置
    if (this._modal && this._modal.setIframeUrl && typeof this._modal.setIframeUrl === 'function') {
      this._modal.setIframeUrl(url);
    }
  }

  // 移除事件監聽器
  removeEventListeners() {
    const trigger = this.shadowRoot.querySelector('.ai-pd-container__trigger');
    if (trigger) {
      trigger.removeEventListener('click', this._onButtonClick);
    }
    const tooltipClose = this.shadowRoot.querySelector('.ai-pd-container__tooltip-close');
    if (tooltipClose) {
      tooltipClose.removeEventListener('click', this._onTooltipCloseClick);
    }
    const tooltip = this.shadowRoot.querySelector('.ai-pd-container__tooltip');
    if (tooltip) {
      tooltip.removeEventListener('click', this._onTooltipClick);
      tooltip.removeEventListener('keydown', this._onTooltipKeyDown);
    }
  }

  // 渲染組件
  render() {
    const positionStyles = this.getPositionStyles();
    const tooltipAlignClass = this.getTooltipAlignClass();
    const tooltipText = this._getTooltipText();
    const tooltipAriaLabel = tooltipText ? `開啟智慧選物：${tooltipText}` : '開啟智慧選物';
    const hideTooltip = this._tooltipDismissed || this._isTooltipDisabledByText();
    
    this.shadowRoot.innerHTML = `
      <style>${FLOATING_BTN_STYLE}</style>
      <div class="ai-pd-container">
        <div class="ai-pd-container__anchor" style="
          bottom: ${positionStyles.bottom};
          right: ${positionStyles.right};
          left: ${positionStyles.left};
          top: ${positionStyles.top};
          transform: ${positionStyles.transform};
        ">
          <div class="ai-pd-container__tooltip-wrap ${tooltipAlignClass}" ${hideTooltip ? 'hidden' : ''}>
            <span class="ai-pd-container__tooltip-badge" aria-hidden="true"><img class="ai-pd-container__tooltip-badge-img" src="${FLOATING_TOOLTIP_LOGO_SRC}" alt="" /></span>
            <div class="ai-pd-container__tooltip" role="button" tabindex="0">
              <button class="ai-pd-container__tooltip-close" type="button" aria-label="關閉提示">&times;</button>
              <div class="ai-pd-container__tooltip-typewriter">
                <span class="ai-pd-container__tooltip-text"></span>
              </div>
            </div>
          </div>
          <button class="ai-pd-container__trigger ai-pd-container__trigger--search" type="button" title="開啟智慧選物">
            <div class="ai-pd-container__icon"></div>
            <img class="ai-pd-container__icon--alert" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMjAgMTBDMTQuNDc3MiAxMCAxMCA1LjUyMjggMTAgLTQuMzcxMTRlLTA3QzEwIDUuNTIyOCA1LjUyMjggMTAgMy4zNzc1OGUtMDYgMTBDNS41MjI4IDEwIDEwIDE0LjQ3NzIgMTAgMjBDMTAgMTQuNDc3MiAxNC40NzcyIDEwIDIwIDEwWiIgZmlsbD0iI0Y5RkY5NCIgc3Ryb2tlPSJibGFjayIgc3Ryb2tlLXdpZHRoPSIyLjc1IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48L3N2Zz4K" alt="alert" />
          </button>
        </div>
      </div>
    `;
    const tooltipEl = this.shadowRoot.querySelector('.ai-pd-container__tooltip');
    if (tooltipEl) {
      tooltipEl.setAttribute('aria-label', tooltipAriaLabel);
    }
  }

  _onButtonClick() {
    if (!this._modal) return;

    // 點擊主按鈕後，本次瀏覽不再顯示打字機對話框
    this._dismissTooltip();
    
    if (this._modal.visible) {
      this._modal.hide();
    } else {
      // 檢查螢幕尺寸，只在平板以上才啟用對話框效果
      const isTabletOrLarger = window.innerWidth >= 768;
      
      if (isTabletOrLarger) {
        // 檢查當前位置，如果是 RightDown 或 LeftDown，則設置彈窗位置
        const position = this.getAttribute('position') || 'LeftDown';
        if (position === 'RightDown') {
          this._configureModalForRightDown();
        } else if (position === 'LeftDown') {
          this._configureModalForLeftDown();
        }
      } else {
        // 小螢幕保持原本的中央顯示效果
        this._resetModalToCenter();
      }
      
      // 使用統一的 iframe URL 設置
      if (this.modalIframeUrl && this._modal.setIframeUrl && typeof this._modal.setIframeUrl === 'function') {
        this._modal.setIframeUrl(this.modalIframeUrl);
      } else if (this._modal.setIframeUrl && typeof this._modal.setIframeUrl === 'function') {
        // 如果沒有設置 modalIframeUrl，使用預設 URL（保持向後兼容）
        this._modal.setIframeUrl('https://ts-iframe-no-media.vercel.app/iframe_container_module.html');
      }
      this._modal.show();
    }
  }

  // 重置彈窗為中央顯示
  _resetModalToCenter() {
    if (!this._modal) return;

    const modalContent = this._modal.shadowRoot?.querySelector('#modal-content');
    const modalOverlay = this._modal.shadowRoot?.querySelector('#modal-overlay');
    const closeBtn = this._modal.shadowRoot?.querySelector('#close-btn');
    
    if (modalContent) {
      // 清除所有自定義位置樣式，恢復預設的中央顯示
      modalContent.style.position = '';
      modalContent.style.left = '';
      modalContent.style.right = '';
      modalContent.style.top = '';
      modalContent.style.bottom = '';
      modalContent.style.transform = '';
      modalContent.style.transition = '';
    }
    
    // 恢復背景遮罩和關閉按鈕
    if (modalOverlay) {
      modalOverlay.style.display = 'block';
    }
    if (closeBtn) {
      closeBtn.style.setProperty('display', 'none', 'important');
    }
  }

  // 為 RightDown 位置配置彈窗
  _configureModalForRightDown() {
    if (!this._modal) return;

    // 獲取按鈕的位置
    const button = this.shadowRoot.querySelector('.ai-pd-container__trigger');
    if (!button) return;

    const buttonRect = button.getBoundingClientRect();
    const modalContent = this._modal.shadowRoot?.querySelector('#modal-content');
    const modalOverlay = this._modal.shadowRoot?.querySelector('#modal-overlay');
    const closeBtn = this._modal.shadowRoot?.querySelector('#close-btn');
    
    if (modalContent) {
      // 計算彈窗應該顯示的位置
      // 彈窗顯示在按鈕上方 20px，右側對齊按鈕右側
      const modalWidth = 480; // 彈窗寬度
      const modalHeight = 480; // 彈窗高度
      const buttonWidth = buttonRect.width;
      const buttonHeight = buttonRect.height;
      
      // 計算彈窗位置
      const modalRight = window.innerWidth - buttonRect.right; // 右側距離
      const modalBottom = window.innerHeight - buttonRect.top + 20; // 按鈕上方 20px
      
      // 確保彈窗不會超出視窗邊界
      const adjustedRight = Math.max(16, modalRight); // 最小右邊距 16px
      const adjustedBottom = Math.max(16, modalBottom); // 最小下邊距 16px
      
      // 如果彈窗會超出左邊界，調整位置
      const maxLeft = window.innerWidth - modalWidth - 16;
      const finalRight = Math.min(adjustedRight, window.innerWidth - 16);
      
      // 設置彈窗位置樣式
      modalContent.style.position = 'fixed';
      modalContent.style.right = `${finalRight}px`;
      modalContent.style.bottom = `${adjustedBottom}px`;
      modalContent.style.left = 'auto';
      modalContent.style.top = 'auto';
      modalContent.style.transform = 'none';
      
      // 添加對話框樣式的動畫
      modalContent.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      
      // 設置初始狀態（縮小並偏移）
      modalContent.style.transform = 'scale(0.7) translateY(20px)';
      
      // 延遲設置顯示狀態
      setTimeout(() => {
        modalContent.style.transform = 'scale(1) translateY(0)';
      }, 50);
    }
    
    // 隱藏背景遮罩和關閉按鈕（對話框模式）
    if (modalOverlay) {
      modalOverlay.style.display = 'none';
    }
    if (closeBtn) {
      closeBtn.style.setProperty('display', 'none', 'important');
    }
  }

  // 為 LeftDown 位置配置彈窗
  _configureModalForLeftDown() {
    if (!this._modal) return;

    // 獲取按鈕的位置
    const button = this.shadowRoot.querySelector('.ai-pd-container__trigger');
    if (!button) return;

    const buttonRect = button.getBoundingClientRect();
    const modalContent = this._modal.shadowRoot?.querySelector('#modal-content');
    const modalOverlay = this._modal.shadowRoot?.querySelector('#modal-overlay');
    const closeBtn = this._modal.shadowRoot?.querySelector('#close-btn');
    
    if (modalContent) {
      // 計算彈窗應該顯示的位置
      // 彈窗顯示在按鈕上方 20px，左側對齊按鈕左側
      const modalWidth = 480; // 彈窗寬度
      const modalHeight = 480; // 彈窗高度
      const buttonWidth = buttonRect.width;
      const buttonHeight = buttonRect.height;
      
      // 計算彈窗位置
      const modalLeft = buttonRect.left; // 左側對齊按鈕左側
      const modalBottom = window.innerHeight - buttonRect.top + 20; // 按鈕上方 20px
      
      // 確保彈窗不會超出視窗邊界
      const adjustedLeft = Math.max(16, modalLeft); // 最小左邊距 16px
      const adjustedBottom = Math.max(16, modalBottom); // 最小下邊距 16px
      
      // 如果彈窗會超出右邊界，調整位置
      const maxRight = window.innerWidth - modalWidth - 16;
      const finalLeft = Math.min(adjustedLeft, maxRight);
      
      // 設置彈窗位置樣式
      modalContent.style.position = 'fixed';
      modalContent.style.left = `${finalLeft}px`;
      modalContent.style.bottom = `${adjustedBottom}px`;
      modalContent.style.right = 'auto';
      modalContent.style.top = 'auto';
      modalContent.style.transform = 'none';
      
      // 添加對話框樣式的動畫
      modalContent.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      
      // 設置初始狀態（縮小並偏移）
      modalContent.style.transform = 'scale(0.7) translateY(20px)';
      
      // 延遲設置顯示狀態
      setTimeout(() => {
        modalContent.style.transform = 'scale(1) translateY(0)';
      }, 50);
    }
    
    // 隱藏背景遮罩和關閉按鈕（對話框模式）
    if (modalOverlay) {
      modalOverlay.style.display = 'none';
    }
    if (closeBtn) {
      closeBtn.style.setProperty('display', 'none', 'important');
    }
  }
}

if (!customElements.get('inf-marketing-floating-button')) {
  customElements.define('inf-marketing-floating-button', InfMarketingFloatButtonComponent);
}