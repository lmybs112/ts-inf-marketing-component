// inf-marketing-floating-button-component.js
// 封裝浮動按鈕，點擊時開啟/關閉 inf-marketing-modal 彈窗

const FLOATING_BTN_STYLE = `
.ai-pd-container {
  position: relative;
}
.ai-pd-container__trigger {
  z-index: 99999992;
  position: fixed;
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
    this._isModalOpen = false; // 追蹤彈窗狀態
    this._hasResult = false; // 追蹤是否有搜尋結果
  }

  static get observedAttributes() {
    return ['position'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue && name === 'position') {
      this.updatePosition();
    }
  }

  connectedCallback() {
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
  }

  disconnectedCallback() {
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
  }

  // 設置結果狀態（當有搜尋結果時調用）
  setResultState() {
    const trigger = this.shadowRoot.querySelector('.ai-pd-container__trigger');
    if (!trigger) return;
    
    trigger.classList.remove('ai-pd-container__trigger--search');
    trigger.classList.remove('ai-pd-container__trigger--close');
    trigger.classList.add('ai-pd-container__trigger--result');
    trigger.title = '查看搜尋結果';
  }

  // 重置為搜尋狀態
  resetToSearchState() {
    const trigger = this.shadowRoot.querySelector('.ai-pd-container__trigger');
    if (!trigger) return;
    
    trigger.classList.remove('ai-pd-container__trigger--result');
    trigger.classList.remove('ai-pd-container__trigger--close');
    trigger.classList.add('ai-pd-container__trigger--search');
    trigger.title = '開啟智慧選物';
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

  // 更新位置
  updatePosition() {
    const trigger = this.shadowRoot.querySelector('.ai-pd-container__trigger');
    if (trigger) {
      const positionStyles = this.getPositionStyles();
      
      // 清除所有位置樣式
      trigger.style.bottom = '';
      trigger.style.right = '';
      trigger.style.left = '';
      trigger.style.top = '';
      trigger.style.transform = '';
      
      // 設置新的位置樣式
      if (positionStyles.bottom) trigger.style.bottom = positionStyles.bottom;
      if (positionStyles.right) trigger.style.right = positionStyles.right;
      if (positionStyles.left) trigger.style.left = positionStyles.left;
      if (positionStyles.top) trigger.style.top = positionStyles.top;
      if (positionStyles.transform) trigger.style.transform = positionStyles.transform;
    }
  }

  // 設置事件監聽器
  setupEventListeners() {
    const trigger = this.shadowRoot.querySelector('.ai-pd-container__trigger');
    if (trigger) {
      trigger.addEventListener('click', this._onButtonClick);
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
  }

  // 渲染組件
  render() {
    const positionStyles = this.getPositionStyles();
    
    this.shadowRoot.innerHTML = `
      <style>${FLOATING_BTN_STYLE}</style>
      <div class="ai-pd-container">
        <button class="ai-pd-container__trigger ai-pd-container__trigger--search" type="button" title="開啟智慧選物" style="
          bottom: ${positionStyles.bottom};
          right: ${positionStyles.right};
          left: ${positionStyles.left};
          top: ${positionStyles.top};
          transform: ${positionStyles.transform};
        ">
          <div class="ai-pd-container__icon"></div>
          <img class="ai-pd-container__icon--alert" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMjAgMTBDMTQuNDc3MiAxMCAxMCA1LjUyMjggMTAgLTQuMzcxMTRlLTA3QzEwIDUuNTIyOCA1LjUyMjggMTAgMy4zNzc1OGUtMDYgMTBDNS41MjI4IDEwIDEwIDE0LjQ3NzIgMTAgMjBDMTAgMTQuNDc3MiAxNC40NzcyIDEwIDIwIDEwWiIgZmlsbD0iI0Y5RkY5NCIgc3Ryb2tlPSJibGFjayIgc3Ryb2tlLXdpZHRoPSIyLjc1IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48L3N2Zz4K" alt="alert" />
        </button>
      </div>
    `;
  }

  _onButtonClick() {
    if (!this._modal) return;
    
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