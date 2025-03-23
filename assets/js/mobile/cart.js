function saveAddress(a){localStorage.setItem("address",JSON.stringify(a))}function getAddress(){const a=getVersion();let e=JSON.parse(localStorage.getItem("address"))||{version:a,latitude:null,longitude:null};return e.version&&e.version==a||(localStorage.removeItem("address"),e={version:a,latitude:null,longitude:null}),e}function showAddress(){const a=getAddress();a&&null!=a.latitude&&null!=a.longitude&&$("#cart_container").prepend('<div id="address_container">        <div id="left">Silakan masukan alamat pengiriman</div>        <div id="right"><div class="button"><i class="fas fa-chevron-right"></i></div>      </div>')}function mapAddress(){var a=L.map("map").setView([-6.2,106.816666],18);L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:"&copy; OpenStreetMap contributors"}).addTo(a);var e=L.icon({iconUrl:"https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",shadowUrl:"https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",iconSize:[25,41],iconAnchor:[12,41],popupAnchor:[1,-34],shadowSize:[41,41]}),n=L.marker([-6.2,106.816666],{icon:e,draggable:!0}).addTo(a);function t(a,e){$("#gmaps","#sheet_address").html(`<a target="_blink" class="primary_link" href="https://maps.google.com?q=${a},${e}">Lokasi pengiriman pada google map:<br/>https://maps.google.com?q=${a},${e}.</a>`),$("#next_container").show()}function s(a,e){var t=`https://nominatim.openstreetmap.org/reverse?format=json&lat=${a}&lon=${e}&zoom=18&addressdetails=1`;$.getJSON(t,(function(a){a.address&&a.address.road?n.bindPopup(`Nama Jalan: ${a.address.road}`).openPopup():n.bindPopup("Nama jalan tidak ditemukan").openPopup()}))}let i;a.on("click",(function(a){n.setLatLng(a.latlng),t(a.latlng.lat,a.latlng.lng)})),n.on("dragend",(function(){let a=n.getLatLng();s(a.lat,a.lng),t(a.lat,a.lng)})),$("#use_location").on("click",(function(){"geolocation"in navigator?navigator.geolocation.getCurrentPosition((function(e){let i=e.coords.latitude,c=e.coords.longitude,o=[i,c];a.setView(o,18),n.setLatLng(o),s(i,c),t(i,c)}),(function(a){switch(a.code){case a.PERMISSION_DENIED:alert("Izin lokasi ditolak. Silakan aktifkan lokasi di pengaturan perangkat Anda."),window.location.href="chrome://settings/content/location";break;case a.POSITION_UNAVAILABLE:alert("Informasi lokasi tidak tersedia.");break;case a.TIMEOUT:alert("Permintaan lokasi timeout. Coba lagi.");break;default:alert("Gagal mendapatkan lokasi. Periksa pengaturan GPS.")}}),{enableHighAccuracy:!0,timeout:1e4,maximumAge:0}):alert("Geolocation tidak didukung oleh browser Anda.")})),$("#address-input").on("input",(function(){clearTimeout(i);let a=$(this).val();a.length<3?$("#suggestions").empty():i=setTimeout((()=>{$.getJSON(`https://nominatim.openstreetmap.org/search?format=json&q=${a}&countrycodes=ID`,(function(a){$("#suggestions").empty(),a.forEach((function(a){$("#suggestions").append(`<div class="suggestion" data-lat="${a.lat}" data-lon="${a.lon}">${a.display_name}</div>`)}))}))}),500)})),$(document).on("click",".suggestion",(function(){let e=$(this).data("lat"),i=$(this).data("lon"),c=$(this).text();$("#address-input").val(c),$("#selected-address").text(c),$("#suggestions").empty();let o=[e,i];n.setLatLng(o),a.setView(o,18),s(e,i),t(e,i)}))}function showListCard(){$("#list_card").empty();(JSON.parse(localStorage.getItem("cart"))||{langgananku:[]}).langgananku.forEach((a=>{Object.keys(a).forEach((e=>{const n=a[e],t=n.items||[];let s=t.filter((a=>a.checked)).reduce(((a,e)=>a+e.price*e.quantity),0),i=`\n        <div class="company_section">\n          <div class="company_header">\n            <div class="card checkbox-container">\n             \n               <label class="langgananku-checkbox" for="check_all_${e}">\n                  <input type="checkbox" class="check_all_company" id="check_all_${e}">\n                  <span class="checkmark"></span>Pilih Semua\n              </label>\n\n            </div>\n            <div class="card company_name">\n              <h3><i class="fas fa-store"></i>&nbsp;<a class="secondary_link" href="/langganan/${e}">${n.companyName}</a></h3>\n            </div>\n          </div>\n          <div class="company_items">\n      `;t.forEach(((a,n)=>{const t=`${e}-${n}`;i+=`\n          <div class="card" data-index="${t}">\n            <div class="checkbox-container">\n\n               <label class="langgananku-checkbox" for="check_${t}">\n                  <input type="checkbox" class="item_checkbox" id="check_${t}" ${a.checked?"checked":""}>\n                  <span class="checkmark"></span>\n              </label>\n              \n            </div>\n            <div class="image_container">\n              <a class="secondary_link" href="/detail/${e}/${a.productCode}"><img src="${a.imgUrl}" alt="product-thumbs" /></a>\n            </div>\n            <div class="detail_container">\n              <div class="title"><h5><a class="secondary_link" href="/detail/${e}/${a.productCode}">${a.name}</a></h5></div>\n              <div class="price"><h4>${rupiah(a.price)}</h4></div>\n              <div class="choose_list">\n                ${a.activeValues.map((a=>`<div class="product_choose"><h6>${a}</h6></div>`)).join("")}\n              </div>\n              <div class="stepper_container">\n                <div class="stepper">\n                  <div class="decrement">${1===a.quantity?'<i class="fas fa-trash-alt"></i>':"-"}</div>\n                  <input type="text" class="quantity" id="${t}" value="${a.quantity}" readonly>\n                  <div class="increment">+</div>\n                </div>\n              </div>\n\n               <div class="langgananku-select">\n      <select>\n        <option value="">Pilih Pengiriman</option>\n        <option value="1">COD</option>\n        <option value="2">Shipping</option>\n        <option value="3">Shipper</option>\n      </select>\n    </div>\n\n     <label class="langgananku-checkbox" for="schedule_${t}">\n                  <input type="checkbox" class="schedule_checbox" id="schedule_${t}" ${a.checked?"checked":""}>\n                  <span class="checkmark"></span>Jadwalkan\n              </label>\n\n            </div>\n          </div>\n        `})),i+=`\n          </div>\n          <div class="card company_total">\n            <h4>Total Harga Barang: <span>${rupiah(s)}</span></h4>\n          </div>\n        </div>\n      `,$("#list_card").append(i)}))})),updateCheckAllStatus()}function updateCheckAllStatus(){$(".company_section").each((function(){const a=$(this),e=a.find(".item_checkbox"),n=e.filter(":checked");a.find(".check_all_company").prop("checked",e.length>0&&e.length===n.length)}))}showAddress(),$(".sheet").sheet({openSheetButton:".button_sheet_address",sheet:"#sheet_address",toPageTwoButton:".btn_next_input_address",pageOne:"#map_container",pageTwo:"#address_detail_container",fullscreen:!0}),mapAddress(),$("#list_card").on("click",".increment",(function(){const a=$(this).closest(".card").data("index"),e=getCart(),n=a.lastIndexOf("-"),t=a.substring(0,n),s=parseInt(a.substring(n+1));let i=e.langgananku.find((a=>a[t]));i&&i[t].items[s]&&(i[t].items[s].quantity+=1),saveCart(e),showListCard()})),$("#list_card").on("click",".decrement",(function(){const a=$(this).closest(".card").data("index"),e=getCart(),n=a.lastIndexOf("-"),t=a.substring(0,n),s=parseInt(a.substring(n+1));let i=e.langgananku.find((a=>a[t]));i&&i[t].items[s]&&(i[t].items[s].quantity>1?i[t].items[s].quantity-=1:(i[t].items.splice(s,1),0===i[t].items.length&&(e.langgananku=e.langgananku.filter((a=>!a[t]))))),saveCart(e),showListCard()})),$("#list_card").on("change",".item_checkbox",(function(){const a=$(this).closest(".card").data("index"),e=getCart(),n=a.lastIndexOf("-"),t=a.substring(0,n),s=parseInt(a.substring(n+1)),i=e.langgananku.find((a=>a[t]));if(i&&i[t]?.items[s]){i[t].items[s].checked=$(this).is(":checked"),saveCart(e);let a=i[t].items.filter((a=>a.checked)).reduce(((a,e)=>a+e.price*e.quantity),0);$(this).closest(".company_section").find(".company_total span").text(rupiah(a)),updateCheckAllStatus()}})),$("#list_card").on("change",".check_all_company",(function(){const a=$(this).is(":checked"),e=$(this).attr("id").replace("check_all_",""),n=getCart(),t=$(this).closest(".company_section");t.find(".item_checkbox").prop("checked",a);const s=n.langgananku.find((a=>a[e]));s&&s[e]?.items&&(s[e].items.forEach((e=>{e.checked=a})),saveCart(n));let i=s[e].items.filter((a=>a.checked)).reduce(((a,e)=>a+e.price*e.quantity),0);t.find(".company_total span").text(rupiah(i)),updateCheckAllStatus()})),showListCard();