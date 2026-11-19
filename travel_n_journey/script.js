// ---- Collection data: edit these with your own trips ----
const trips = [
  {name:"Langkawi, Malaysia", cat:"Beach", img:"langkawi.jpg", c:["#a8d5d1","#e9f2ef"], text:"Island days, clear water and a cable car above the rainforest."},
  {name:"Bali, Indonesia", cat:"Beach", img:"bali.jpg", c:["#c9dccb","#eef3ea"], text:"Rice terraces in the morning, sunset at the shore."},
  {name:"Cameron Highlands", cat:"Mountain", img:"cameron.jpg", c:["#b7cfb0","#e8efe3"], text:"Cool air, tea hills and strawberry farms."},
  {name:"Mount Fuji, Japan", cat:"Mountain", img:"fuji.jpg", c:["#bccbe0","#eef2f8"], text:"A quiet lakeside view of Japan's most famous peak."},
  {name:"Tokyo, Japan", cat:"City", img:"tokyo.jpg", c:["#cfc8dc","#f1eef6"], text:"Neon crossings, tiny cafes and very good trains."},
  {name:"Singapore", cat:"City", img:"singapore.jpg", c:["#b9d4dc","#edf5f7"], text:"Gardens, hawker food and a skyline worth a slow walk."},
  {name:"Dubai, UAE", cat:"City", img:"dubai.jpg", c:["#b9d4dc","#edf5f7"], text:"Skyline views and luxury shopping."},
  {name:"Kyoto, Japan", cat:"Culture", img:"kyoto.jpg", c:["#dccdb9","#f6f0e8"], text:"Temples, lantern-lit lanes and tea served slowly."},
  {name:"Melaka, Malaysia", cat:"Culture", img:"melaka.jpg", c:["#dcc3bb","#f6ece8"], text:"A river walk through centuries of trading history."},
  {name:"Fushimi Inari Shrine, Kyoto", cat:"Culture", img:"fushimi.jpg", c:["#dcbfb0","#f6ebe4"], text:"Thousands of red torii gates winding up the hillside."},
  {name:"George Town, Penang", cat:"Culture", img:"georgetown.jpg", c:["#d9c7b0","#f5eee3"], text:"Street art, clan houses and heritage shophouses on foot."},
  {name:"Petronas Twin Towers, KL", cat:"Attractions", img:"petronas.jpg", c:["#c4cfe6","#eef1f9"], text:"Malaysia's icon, best seen from the park at dusk."},
  {name:"Gardens by the Bay, Singapore", cat:"Attractions", img:"gardens.jpg", c:["#b6d8c4","#eaf5ee"], text:"Giant supertrees that light up after dark."},
  {name:"Ubud Monkey Forest, Bali", cat:"Attractions", img:"ubud.jpg", c:["#b9d0b2","#e9f1e4"], text:"A shaded temple forest with hundreds of macaques."},
  {name:"Nasi Lemak, Malaysia", cat:"Food", img:"nasi-lemak.jpg", c:["#e6c9a8","#f7eee2"], text:"Coconut rice, sambal and crispy anchovies, the national breakfast."},
  {name:"Penang, Malaysia", cat:"Food", img:"jalan-alor.jpg", c:["#e8c0a8","#f8ece4"], text:"Famous for its street food and colonial architecture."},
  {name:"Tsukiji Outer Market, Tokyo", cat:"Food", img:"tsukiji.jpg", c:["#e6c4c0","#f8ecea"], text:"Fresh sushi and tamagoyaki eaten standing at the counter."}
];
// ---- Group members: edit names, IDs and add photos to /images ----
const team = [
  {name:"Aqeef", id:"AT1085926", img:"member1.jpg"},
  {name:"Nazri", id:"AT1085921", img:"member2.jpg"},
  {name:"Ayish", id:"AT1085977", img:"member3.jpg"},
  {name:"Muhaimin", id:"AK1086098", img:"member4.jpg"},
  {name:"Shar", id:"AT1085664", img:"member5.jpg"}
];

document.documentElement.classList.add("js");

// Scroll reveal: elements fade up as they enter the screen (staggered in rows)
const io = new IntersectionObserver(entries => entries.forEach(e => {
  if(!e.isIntersecting) return;
  const el = e.target;
  setTimeout(() => el.classList.add("in"), (+el.dataset.i || 0) * 90);
  io.unobserve(el);
}), {threshold:.12});
const reveal = (els, step = 1) => els.forEach((el, i) => {
  el.classList.add("reveal");
  el.dataset.i = (i * step) % 4;
  io.observe(el);
});

// Apple-style pinned hero: scales down and fades as the page scrolls past it
const heroPin = document.getElementById("heroPin");
const heroInner = document.getElementById("heroInner");
const heroArt = document.getElementById("heroArt");
function parallaxHero(){
  const total = heroPin.offsetHeight - innerHeight;
  const progress = Math.min(Math.max(-heroPin.getBoundingClientRect().top / total, 0), 1);
  heroInner.style.transform = `scale(${1 - progress * .22}) translateY(${progress * 30}px)`;
  heroInner.style.opacity = Math.max(1 - progress * 1.6, 0);
  heroArt.style.opacity = Math.max(1 - progress * 1.1, 0);
  heroArt.style.transform = `scale(${1 + progress * .18})`;
}
addEventListener("scroll", parallaxHero, {passive:true});
parallaxHero();

const grid = document.getElementById("grid");
const esc = s => s.replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));

let cat = "All", q = "";
function render(){
  const list = trips.map((t, n) => ({t, n})).filter(({t}) =>
    (cat === "All" || t.cat === cat) && (t.name + " " + t.text + " " + t.cat).toLowerCase().includes(q));
  grid.innerHTML = list.length ? list.map(({t, n}) => `
    <article class="card" data-n="${n}" tabindex="0" role="button" aria-label="View details: ${esc(t.name)}">
      <div class="pic" style="--c1:${t.c[0]};--c2:${t.c[1]}">
        <img src="images/${t.img}" alt="${esc(t.name)}" loading="lazy" onerror="this.remove()">
        <span class="tag">${t.cat}</span>
      </div>
      <div class="body"><h3>${esc(t.name)}</h3><p>${esc(t.text)}</p><button type="button" class="more">View details</button></div>
    </article>`).join("") : '<p class="empty">No destinations match. Try another word or category.</p>';
  reveal(grid.querySelectorAll(".card"));
}
document.querySelectorAll(".filters button").forEach(b => b.addEventListener("click", () => {
  document.querySelector(".filters .active").classList.remove("active");
  b.classList.add("active");
  cat = b.dataset.cat;
  render();
}));
document.getElementById("search").addEventListener("input", e => { q = e.target.value.trim().toLowerCase(); render(); });
render();

document.getElementById("team-grid").innerHTML = team.map(m => `
  <div class="member">
    <div class="avatar">${m.name.charAt(0)}<img src="images/${m.img}" alt="${esc(m.name)}" onerror="this.remove()"></div>
    <h3>${esc(m.name)}</h3><p>${esc(m.id)}</p>
  </div>`).join("");

// ---- Feedback form -> Google Sheet ----
// Paste your Google Apps Script Web app URL here (see SETUP-GUIDE.md, step 2)
const FEEDBACK_URL = "https://script.google.com/macros/s/AKfycbyzJLOhOEt42Mb-YTCmSqjhGMOA7F1AifEvlrS8wQ_x8RiM-Qv1RlmboERwuJWazMvR/exec";

// Date & time is filled automatically and refreshed when the form is sent
const dt = document.getElementById("datetime");
const stamp = () => new Date().toLocaleString("en-MY", {dateStyle:"medium", timeStyle:"medium"});
dt.value = stamp();

const form = document.getElementById("fbForm");
const notice = document.getElementById("notice");
const showNotice = (msg, bad) => {
  notice.hidden = false;
  notice.textContent = msg;
  notice.classList.toggle("err", !!bad);
  notice.scrollIntoView({block:"center", behavior:"smooth"});
};

form.addEventListener("submit", async e => {
  e.preventDefault();
  dt.value = stamp();
  if(FEEDBACK_URL.startsWith("PASTE")) return showNotice("The feedback form is not connected to the Google Sheet yet.", true);
  const btn = form.querySelector("button[type=submit]");
  btn.disabled = true; btn.textContent = "Sending...";
  try{
    // no-cors: the browser sends the data but cannot read Google's reply, so success = no network error
    await fetch(FEEDBACK_URL, {method:"POST", mode:"no-cors", body:new URLSearchParams(new FormData(form))});
    form.reset(); dt.value = stamp();
    showNotice("Thank you! Your feedback has been sent.");
  }catch(err){
    showNotice("Something went wrong. Please check your connection and try again.", true);
  }finally{
    btn.disabled = false; btn.textContent = "Send feedback";
  }
});

// Headline: words rise in one after another
const h1 = document.querySelector(".hero-inner h1");
let wi = 0;
(function wrap(node){
  if(!node) return;
  [...node.childNodes].forEach(c => {
    if(c.nodeType !== 3) return wrap(c);
    const f = document.createDocumentFragment();
    c.textContent.split(/(\s+)/).forEach(w => {
      if(!w.trim()) return f.append(w);
      const span = document.createElement("span");
      span.className = "w";
      span.style.setProperty("--i", wi++);
      span.textContent = w;
      f.append(span);
    });
    c.replaceWith(f);
  });
})(h1);

// Reveal the other sections and team members
document.querySelectorAll("h2").forEach(el => el.classList.add("scale-reveal"));
reveal(document.querySelectorAll("h2, .sub, #fbForm"));
reveal(document.querySelectorAll(".member"));

// Thin reading-progress line at the top of the page
const bar = document.createElement("div");
bar.className = "progress";
document.body.prepend(bar);
addEventListener("scroll", () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  bar.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
}, {passive:true});

// ---- Destination details (opens when a card is clicked) ----
// Photos:  images/<name>-1.jpg, -2.jpg, -3.jpg   Video: media/<name>.mp4
// To use a YouTube video instead, add  yt:"VIDEO_ID"  to that destination.
const info = {
  langkawi:{b:"November to March (dry season)", t:"3 to 4 days", h:"Rent a car or scooter", a:"Langkawi is an island group off Malaysia's northwest coast, known for calm beaches, mangrove forests and duty-free shopping.", l:["Sky Cab and SkyBridge above the rainforest","Pantai Cenang beach at sunset","Kilim Karst Geoforest mangrove tour","Island-hopping by boat"]},
  bali:{b:"April to October", t:"5 to 7 days", h:"Scooter or private driver", a:"Bali mixes surf beaches, rice terraces and temple ceremonies, with a different mood in every area of the island.", l:["Tegallalang rice terraces","Uluwatu Temple at sunset","Ubud art markets","Snorkelling around Nusa Penida"]},
  cameron:{b:"Any time, drier in June to August", t:"2 to 3 days", h:"Drive from Kuala Lumpur (about 3.5 hours)", a:"Malaysia's most popular hill station, where the air is cool and the hillsides are covered in tea plantations and farms.", l:["BOH Sungei Palas Tea Centre","Strawberry and flower farms","Mossy Forest boardwalk","Steamboat dinner in the evening chill"]},
  fuji:{b:"July to September to climb; October to November for autumn views", t:"2 days", h:"Highway bus from Tokyo to Kawaguchiko (about 2 hours)", a:"Japan's highest mountain is best enjoyed from the Fuji Five Lakes area, where the peak reflects on calm water.", l:["Lake Kawaguchi at sunrise","Chureito Pagoda viewpoint","Onsen bath with a view of the mountain","Fuji-Q Highland for thrill seekers"]},
  tokyo:{b:"March to May and October to November", t:"5 to 7 days", h:"JR lines and metro with a Suica card", a:"Tokyo blends quiet shrines, giant crossings and some of the best food in the world, often on the same street.", l:["Shibuya Crossing","Senso-ji Temple in Asakusa","Meiji Shrine forest walk","Akihabara for games and anime"]},
  singapore:{b:"February to April (drier months)", t:"3 to 4 days", h:"MRT trains and buses", a:"A compact, clean city-state where hawker food, colonial streets and futuristic architecture sit side by side.", l:["Marina Bay Sands skyline","Hawker centres such as Maxwell Food Centre","Chinatown and Little India","Sentosa island"]},
  kyoto:{b:"Late March to April (cherry blossom) and November (autumn leaves)", t:"3 to 4 days", h:"City bus, subway or bicycle", a:"Japan's old capital keeps over a thousand temples, wooden townhouses and traditional tea houses.", l:["Kiyomizu-dera Temple","Arashiyama Bamboo Grove","Gion district in the evening","Kinkaku-ji, the Golden Pavilion"]},
  melaka:{b:"January to February and June to July (drier)", t:"1 to 2 days", h:"Walk the old town or take a trishaw", a:"A UNESCO World Heritage city shaped by Malay, Chinese, Portuguese, Dutch and British history.", l:["Jonker Street night market","A Famosa fortress and St. Paul's Hill","Melaka River cruise","Christ Church and the Stadthuys"]},
  fushimi:{b:"Early morning or evening to avoid crowds", t:"2 to 3 hours", h:"JR Nara Line to Inari Station", a:"A Shinto shrine famous for thousands of vermilion torii gates that form tunnels up the slopes of Mount Inari.", l:["Senbon Torii, the dense gate tunnels","Hike to the Mount Inari summit","Fox statues that guard the shrine","Street snacks at the entrance"]},
  georgetown:{b:"December to February (dry season)", t:"2 to 3 days", h:"Walk, trishaw or free CAT bus", a:"George Town is a UNESCO-listed old port city with murals, clan houses and one of Malaysia's best street food scenes.", l:["Street art around Armenian Street","Khoo Kongsi clan house","Clan Jetties by the sea","Char kuey teow and cendol from hawker stalls"]},
  petronas:{b:"Year-round; evenings for the lights", t:"Half a day", h:"LRT to KLCC Station", a:"The 88-storey twin towers are Kuala Lumpur's symbol, with a sky bridge and a park at their base.", l:["Sky Bridge and observation deck","KLCC Park fountain and light show","Suria KLCC shopping mall","Photos from the park at dusk"]},
  gardens:{b:"Evenings for the light show", t:"3 to 4 hours", h:"MRT to Bayfront Station", a:"A nature park beside Marina Bay with giant Supertrees, indoor gardens and a walkway in the canopy.", l:["Supertree Grove light show","Flower Dome","Cloud Forest and its waterfall","OCBC Skyway walk"]},
  ubud:{b:"April to October", t:"1 to 2 hours", h:"Walk from central Ubud", a:"A sacred forest sanctuary with ancient temples, huge banyan trees and hundreds of long-tailed macaques.", l:["Holy Spring Bathing Temple","Banyan tree paths","Watching the macaques (keep food and bags closed)","Ubud Palace nearby"]},
  "nasi-lemak":{b:"Breakfast, any day of the year", t:"30 to 45 minutes", h:"Found at almost every kopitiam and roadside stall", a:"Malaysia's national dish is rice cooked in coconut milk, served with sambal, anchovies, peanuts, cucumber and egg.", l:["Classic set with fried chicken or rendang","Sambal that ranges from sweet to fiery","Pair with teh tarik","Wrapped nasi lemak bungkus for the road"]},
  "jalan-alor":{b:"Evenings after 6 pm", t:"2 to 3 hours", h:"Monorail or MRT to Bukit Bintang, then walk", a:"Kuala Lumpur's busiest food street, lined with open-air stalls serving grilled, fried and steamed dishes.", l:["Grilled chicken wings","Satay with peanut sauce","Fresh fruit and durian stalls","Coconut shake to finish"]},
  tsukiji:{b:"Early morning, most stalls close by early afternoon", t:"About 2 hours", h:"Tsukiji or Tsukijishijo Station", a:"The outer market keeps its narrow lanes of seafood shops and small eateries, right next to the old wholesale site.", l:["Fresh sushi and sashimi bowls","Sweet tamagoyaki on a stick","Grilled scallops and oysters","Matcha desserts"]}
};

const dlg = document.getElementById("detail");
function openTrip(n){
  const t = trips[n], base = t.img.replace(/\.\w+$/, ""), d = info[base] || {b:"-", t:"-", h:"-", a:t.text, l:[]};
  const pics = [1, 2, 3].map(i => `images/${base}-${i}.jpg`);
  // Up to 3 video clips per destination: media/<name>-1.mp4, -2.mp4, -3.mp4
  // or set  yt:["ID1","ID2"]  on a destination in the trips list to embed YouTube instead
  const clips = Array.isArray(t.yt) ? t.yt : [1, 2, 3].map(i => `media/${base}-${i}.mp4`);
  const isYt = Array.isArray(t.yt);
  const playClip = isYt
    ? `<iframe id="mainClip" src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(clips[0])}" title="${esc(t.name)} video" allowfullscreen loading="lazy"></iframe>`
    : `<video id="mainClip" controls preload="metadata" poster="${pics[0]}"><source src="${clips[0]}" type="video/mp4"></video>`;
  dlg.innerHTML = `
    <button class="close" aria-label="Close details">&times;</button>
    <div class="dbody">
      <span class="tag">${t.cat}</span>
      <h2>${esc(t.name)}</h2>
      <div class="gallery" style="--c1:${t.c[0]};--c2:${t.c[1]}">
        <div class="main"><img id="mainPic" src="${pics[0]}" alt="${esc(t.name)}" onerror="this.style.opacity=0"></div>
        <div class="thumbs">${pics.map((p, i) => `<button class="th${i ? "" : " on"}" data-src="${p}" aria-label="Photo ${i + 1}"><img src="${p}" alt="" onerror="this.remove()"></button>`).join("")}</div>
      </div>
      <p class="about">${esc(d.a)}</p>
      <dl class="facts">
        <div><dt>Best time</dt><dd>${esc(d.b)}</dd></div>
        <div><dt>Time needed</dt><dd>${esc(d.t)}</dd></div>
        <div><dt>Getting there</dt><dd>${esc(d.h)}</dd></div>
      </dl>
      <h3>Highlights</h3>
      <ul>${d.l.map(x => `<li>${esc(x)}</li>`).join("")}</ul>
      <h3>Videos</h3>
      <div class="video-wrap" data-yt="${isYt}">${playClip}</div>
      <div class="clip-tabs">${clips.map((c, i) => `<button class="clip${i ? "" : " on"}" data-clip="${esc(String(c))}" data-i="${i}">Clip ${i + 1}</button>`).join("")}</div>
    </div>`;
  dlg.scrollTop = 0;
  document.body.style.overflow = "hidden";
  dlg.showModal();
}

grid.addEventListener("click", e => { const c = e.target.closest(".card"); if(c) openTrip(+c.dataset.n); });
grid.addEventListener("keydown", e => {
  const c = e.target.closest(".card");
  if(c && (e.key === "Enter" || e.key === " ")){ e.preventDefault(); openTrip(+c.dataset.n); }
});
dlg.addEventListener("click", e => {
  if(e.target === dlg || e.target.closest(".close")) return dlg.close();

  const th = e.target.closest(".th");
  if(th){
    dlg.querySelectorAll(".th").forEach(b => b.classList.toggle("on", b === th));
    const main = document.getElementById("mainPic");
    main.style.opacity = "";
    main.src = th.dataset.src;
    return;
  }

  const clipBtn = e.target.closest(".clip");
  if(clipBtn){
    dlg.querySelectorAll(".clip").forEach(b => b.classList.toggle("on", b === clipBtn));
    const wrap = dlg.querySelector(".video-wrap");
    wrap.dataset.yt === "true"
      ? (wrap.querySelector("iframe").src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(clipBtn.dataset.clip)}`)
      : (wrap.innerHTML = `<video id="mainClip" controls preload="metadata"><source src="${clipBtn.dataset.clip}" type="video/mp4"></video>`);
  }
});
dlg.addEventListener("error", e => {
  if(e.target.tagName === "VIDEO") e.target.closest(".video-wrap").innerHTML = '<p class="hint">Video coming soon.</p>';
}, true);
dlg.addEventListener("close", () => { dlg.innerHTML = ""; document.body.style.overflow = ""; });

// ---- Hero: dotted globe with glowing flight routes ----
const cv = document.getElementById("globe"), g = cv.getContext("2d");
const still = matchMedia("(prefers-reduced-motion:reduce)").matches;
const dots = [];
for(let i = 0, N = 1100; i < N; i++){
  const y = 1 - 2 * (i + .5) / N, r = Math.sqrt(1 - y * y), a = i * 2.39996;
  dots.push([Math.cos(a) * r, y, Math.sin(a) * r]);
}
const ll = (la, lo) => { la *= Math.PI / 180; lo *= Math.PI / 180; return [Math.cos(la) * Math.sin(lo), Math.sin(la), Math.cos(la) * Math.cos(lo)]; };
// KL, Tokyo, Singapore, Bali, Dubai, Kyoto, Penang
const hubs = [ll(3.1,101.7), ll(35.7,139.7), ll(1.35,103.8), ll(-8.4,115.2), ll(25.2,55.3), ll(35,135.8), ll(5.4,100.3)];
const routes = [[0,1],[0,4],[2,5],[3,1],[6,4],[0,3],[5,4]];
let W, H, R, cx, cy, dpr;
function size(){
  dpr = Math.min(devicePixelRatio || 1, 2);
  W = cv.clientWidth; H = cv.clientHeight;
  cv.width = W * dpr; cv.height = H * dpr;
  g.setTransform(dpr, 0, 0, dpr, 0, 0);
  R = Math.min(W, H) * .44; cx = W / 2; cy = H / 2;
}
addEventListener("resize", size); size();
const tilt = .42, ct = Math.cos(tilt), st = Math.sin(tilt);
const xf = (p, a) => {
  const c = Math.cos(a), s = Math.sin(a), x = p[0] * c + p[2] * s, z = -p[0] * s + p[2] * c;
  return [x, p[1] * ct - z * st, p[1] * st + z * ct];
};
function arcPoint(a, b, t){
  const om = Math.acos(Math.min(1, a[0]*b[0] + a[1]*b[1] + a[2]*b[2])), k = 1 + .25 * Math.sin(Math.PI * t);
  const s1 = Math.sin((1 - t) * om) / Math.sin(om), s2 = Math.sin(t * om) / Math.sin(om);
  return [(a[0]*s1 + b[0]*s2) * k, (a[1]*s1 + b[1]*s2) * k, (a[2]*s1 + b[2]*s2) * k];
}
function draw(t){
  const ang = -1.75 - t * .00005;
  g.clearRect(0, 0, W, H);
  const halo = g.createRadialGradient(cx, cy, R * .9, cx, cy, R * 1.25);
  halo.addColorStop(0, "rgba(214,243,63,.10)"); halo.addColorStop(1, "rgba(214,243,63,0)");
  g.fillStyle = halo; g.fillRect(0, 0, W, H);
  g.fillStyle = "#e9f2dc";
  for(const d of dots){
    const p = xf(d, ang);
    g.globalAlpha = p[2] > 0 ? .12 + .5 * p[2] : .05;
    const sz = p[2] > 0 ? 1.7 : 1.1;
    g.fillRect(cx + p[0] * R, cy - p[1] * R, sz, sz);
  }
  g.lineWidth = 1.6; g.lineCap = "round";
  routes.forEach(([i, j], n) => {
    const ph = ((t * .00022 + n * .23) % 1.5), head = Math.min(ph, 1), fade = ph > 1 ? (1.5 - ph) / .5 : 1;
    g.strokeStyle = "#d6f33f"; g.globalAlpha = .85 * fade;
    g.beginPath();
    let pen = false;
    for(let k = 0; k <= 40 * head; k++){
      const p = xf(arcPoint(hubs[i], hubs[j], k / 40), ang);
      if(p[2] < -.05){ pen = false; continue; }
      const X = cx + p[0] * R, Y = cy - p[1] * R;
      pen ? g.lineTo(X, Y) : g.moveTo(X, Y); pen = true;
    }
    g.stroke();
  });
  hubs.forEach((h, n) => {
    const p = xf(h, ang);
    if(p[2] < 0) return;
    const X = cx + p[0] * R, Y = cy - p[1] * R, pulse = (t * .0012 + n) % 3 / 3;
    g.fillStyle = "#d6f33f"; g.globalAlpha = 1;
    g.beginPath(); g.arc(X, Y, 3, 0, 7); g.fill();
    g.strokeStyle = "#d6f33f"; g.globalAlpha = 1 - pulse; g.lineWidth = 1;
    g.beginPath(); g.arc(X, Y, 3 + pulse * 14, 0, 7); g.stroke();
  });
  g.globalAlpha = 1;
}
(function loop(t){
  if(heroPin.getBoundingClientRect().bottom > 0) draw(t);
  if(!still) requestAnimationFrame(loop);
})(0);

// Floating destination bubbles drift slightly with the pointer
const orbs = [...document.querySelectorAll(".orb")];
if(!still) addEventListener("pointermove", e => {
  const x = e.clientX / innerWidth - .5, y = e.clientY / innerHeight - .5;
  orbs.forEach((o, i) => {
    const k = (i % 3 + 1) * 16;
    o.style.setProperty("--px", -x * k + "px");
    o.style.setProperty("--py", -y * k + "px");
  });
}, {passive:true});