const dinners = [
  { name: "拉麵", image: "images/ramen.jpg" },
  { name: "牛肉麵", image: "images/beef_noodle.jpg" },
  { name: "壽司", image: "images/sushi.jpg" },
  { name: "火鍋", image: "images/hotpod.jpg" },
  { name: "炒飯", image: "images/firerice.jpg" },
  { name: "燒烤", image: "images/bbq.jpg" },
  { name: "義大利麵", image: "images/pasta.jpg" },
  { name: "水餃", image: "images/dumpling.jpg" },
  { name: "炸雞", image: "images/fireg.jpg" },
  { name: "咖哩", image: "images/curry.jpg" },
  { name: "鐵板燒", image: "images/dapu.jpg" },
  { name: "滷味", image: "images/abai.jpg" },
  { name: "披薩", image: "images/pizza.jpg" },
  { name: "鐵板麵", image: "images/noodle.jpg" },
  { name: "漢堡", image: "images/hamberger.jpg" },
  { name: "麻辣燙", image: "images/spicy.jpg" },
  { name: "鍋燒", image: "images/gosaw.jpg" },
  { name: "焗烤飯(麵)", image: "images/cheese.jpg" },
  { name: "韓式料理", image: "images/korea.jpg" },
  { name: "夜市", image: "images/nightmarket.jpg" },
  { name: "日式料理", image: "images/japan.jpg" },
  { name: "麥當勞", image: "images/mdd.jpg" },
  { name: "粥", image: "images/go.jpg" },
  { name: "7-11全家", image: "images/711.jpg" },
  { name: "鹹酥雞", image: "images/no1.jpg" },
  // ...其餘項目
];

let pool = [...dinners].sort(() => Math.random() - 0.5);


function renderChoices() {
  const choiceDiv = document.getElementById("choice");
  choiceDiv.innerHTML = "";

  if (pool.length === 1) {
    choiceDiv.innerHTML = `
      <h2 class="text-xl font-semibold">今晚就吃：<span class="text-red-500">${pool[0].name}</span>！</h2>
      <img src="${pool[0].image}" alt="${pool[0].name}" class="mx-auto my-4 rounded-xl shadow-lg max-h-60 object-cover">
      <button onclick="showNearbyStores('${pool[0].name}')" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded">推薦附近餐廳</button>
      <button onclick="location.reload()" class="mt-2 px-4 py-2 bg-gray-300 text-black rounded">重新開始</button>

    `;
    return;
  }

  const [a, b] = pool.splice(0, 2);

  const createOption = (item) => {
    const wrapper = document.createElement("div");
    wrapper.className = "cursor-pointer border rounded-xl overflow-hidden shadow hover:shadow-lg transition";

    const img = document.createElement("img");
    img.src = item.image;
    img.alt = item.name;
    img.className = "w-full h-48 object-cover";

    const label = document.createElement("div");
    label.textContent = item.name;
    label.className = "py-2 font-bold text-lg bg-white text-gray-800";

    wrapper.appendChild(img);
    wrapper.appendChild(label);
    wrapper.onclick = () => {
      pool.push(item);
      pool = pool.sort(() => Math.random() - 0.5);
      renderChoices();
    };

    return wrapper;
  };

  const grid = document.createElement("div");
  grid.className = "grid grid-cols-1 sm:grid-cols-2 gap-4";
  grid.appendChild(createOption(a));
  grid.appendChild(createOption(b));

  choiceDiv.appendChild(grid);
}
function showNearbyStores(query) {
  const url = `https://www.google.com/maps/search/${encodeURIComponent(query)}`;
  window.open(url, '_blank');
}
function showNearbyStores(query) {
  if (!navigator.geolocation) {
    alert("無法取得您的位置");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      const url = `https://www.google.com/maps/search/${encodeURIComponent(query)}/@${latitude},${longitude},15z`;
      window.open(url, '_blank');
    },
    (error) => {
      alert("取得位置失敗，請允許位置存取。");
    }
  );
}
renderChoices();
