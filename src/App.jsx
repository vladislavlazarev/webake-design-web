import { useState, useEffect, useRef } from "react";

// ==========================================
// WE BAKE — Client Web v5
// Warm Organic | Fully Responsive | Video Hero
// ==========================================

// ---- ASSETS (Unsplash photos) ----
// Product images (unique per bread type)
const IMG_BAGUETTE = "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=800&auto=format&fit=crop&q=80";
const IMG_SOURDOUGH = "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=800&auto=format&fit=crop&q=80";
const IMG_FLATBREAD = "https://images.unsplash.com/photo-1568254183919-78a4f43a2877?w=800&auto=format&fit=crop&q=80";
const IMG_CIABATTA = "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop&q=80";
const IMG_WHOLEWHEAT = "https://images.unsplash.com/photo-1598373182133-52452f7691ef?w=800&auto=format&fit=crop&q=80";
const IMG_RYE = "https://images.unsplash.com/photo-1600398142498-ef5ef0a46c1e?w=800&auto=format&fit=crop&q=80";
const IMG_FOCACCIA = "https://images.unsplash.com/photo-1619535860434-ba1d8fa12536?w=800&auto=format&fit=crop&q=80";
const IMG_CROISSANT = "https://images.unsplash.com/photo-1530610476181-d83430b64dcd?w=800&auto=format&fit=crop&q=80";
const IMG_MULTIGRAIN = "https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?w=800&auto=format&fit=crop&q=80";
const IMG_CHALLAH = "https://images.unsplash.com/photo-1574085733277-851d9d856a3a?w=800&auto=format&fit=crop&q=80";

// How It Works thematic photos
const IMG_HIW_CHOOSE = "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=800&auto=format&fit=crop&q=80";
const IMG_HIW_SCHEDULE = "https://images.unsplash.com/photo-1495364141860-b0d03eccd065?w=800&auto=format&fit=crop&q=80";
const IMG_HIW_DELIVER = "https://images.unsplash.com/photo-1526367790999-0150786686a2?w=800&auto=format&fit=crop&q=80";
const IMG_HIW_PAY = "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&auto=format&fit=crop&q=80";

// Hero floating card / general bread box
const IMG_BREADBOX = "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&auto=format&fit=crop&q=80";


const YOUTUBE_ID = "CE68eR7MAw8";

// ---- COLORS ----
const C = {
  bg:"#FBF6EF", dark:"#2D1810", card:"#FFF",
  accent:"#C75B2B", accentL:"#E07040", glow:"rgba(199,91,43,0.25)",
  txt:"#2D1810", muted:"#8B7355", light:"#A08F7F",
  border:"rgba(45,24,16,0.08)", bAccent:"rgba(199,91,43,0.15)",
  cream:"#FFF8F0", ok:"#3D8B5E", warn:"#D4860A", err:"#C23B3B",
};

const PRODUCTS = [
  {id:1,name:"Classic Baguette",desc:"Crispy golden crust, soft airy interior.",allergens:"Wheat, Gluten",price:3.50,img:IMG_BAGUETTE,rating:4.8,reviews:124},
  {id:2,name:"Sourdough Loaf",desc:"72-hour fermented, tangy complex flavor.",allergens:"Wheat, Gluten",price:5.00,img:IMG_SOURDOUGH,rating:4.9,reviews:98},
  {id:3,name:"Uzbek Flatbread",desc:"Tandoor-baked, pillowy soft golden crust.",allergens:"Wheat, Gluten, Sesame",price:4.00,img:IMG_FLATBREAD,rating:4.7,reviews:67},
  {id:4,name:"Ciabatta",desc:"Italian classic — open crumb, olive oil.",allergens:"Wheat, Gluten",price:4.50,img:IMG_CIABATTA,rating:4.6,reviews:83},
  {id:5,name:"Whole Wheat",desc:"Hearty nutty flavor, wholesome grain.",allergens:"Wheat, Gluten",price:4.50,img:IMG_WHOLEWHEAT,rating:4.5,reviews:56},
  {id:6,name:"Rye Bread",desc:"Dense, dark, earthy. Northern European.",allergens:"Wheat, Rye, Gluten",price:5.50,img:IMG_RYE,rating:4.7,reviews:41},
  {id:7,name:"Focaccia",desc:"Rosemary & sea salt Italian flatbread.",allergens:"Wheat, Gluten",price:5.00,img:IMG_FOCACCIA,rating:4.8,reviews:72},
  {id:8,name:"Croissant",desc:"Buttery flaky layers of morning joy.",allergens:"Wheat, Gluten, Milk, Eggs",price:3.00,img:IMG_CROISSANT,rating:4.9,reviews:156},
  {id:9,name:"Multigrain Roll",desc:"Seeds, grains, wholesome every bite.",allergens:"Wheat, Gluten, Sesame, Nuts",price:2.50,img:IMG_MULTIGRAIN,rating:4.4,reviews:38},
  {id:10,name:"Challah",desc:"Braided egg bread — soft, sweet, beautiful.",allergens:"Wheat, Gluten, Eggs",price:6.00,img:IMG_CHALLAH,rating:4.8,reviews:89},
];
const pImg = (p) => p.img;
const DAYS = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
const SLOTS = ["6:00–6:30 AM","6:30–7:00 AM","7:00–7:30 AM","7:30–8:00 AM","8:00–8:30 AM","8:30–9:00 AM"];
const DFEE = 2;

// Responsive hook
function useW() {
  const [w, setW] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  useEffect(() => { const h = () => setW(window.innerWidth); window.addEventListener("resize", h); return () => window.removeEventListener("resize", h); }, []);
  return w;
}

// SVG Icons
const Ic = {
  Down:()=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>,
  Right:()=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>,
  Star:({on})=><svg width="16" height="16" viewBox="0 0 24 24" fill={on?"#E8A33A":"none"} stroke={on?"#E8A33A":"#ccc"} strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  Chk:()=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>,
  Plus:()=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  Min:()=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  X:()=><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  User:()=><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Clock:()=><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  Card:()=><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>,
  Pause:()=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>,
  Play:()=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>,
  Edit:()=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  Lock:()=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  Menu:()=><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
};


// ==========================================
// APP ROOT
// ==========================================
export default function App() {
  const w = useW(); const mob = w < 768; const tab = w < 1024 && w >= 768;
  const pad = mob ? "16px" : "48px";
  const [pg, setPg] = useState("home");
  const [logged, setLogged] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [ddOpen, setDdOpen] = useState(false);
  const [dist, setDist] = useState({ name:"Georgetown", city:"Washington, DC", active:true });
  const [profMenu, setProfMenu] = useState(false);
  const [items, setItems] = useState([]);
  const [slot, setSlot] = useState(SLOTS[1]);
  const [coStep, setCoStep] = useState(1);
  const [subSt, setSubSt] = useState("active");
  const [showPause, setShowPause] = useState(false);
  const [showRate, setShowRate] = useState(false);
  const [banner, setBanner] = useState(true);
  const [preSel, setPreSel] = useState(null);
  const [mobNav, setMobNav] = useState(false);

  const dists = [
    { name:"Georgetown", city:"Washington, DC", active:true },
    { name:"Dupont Circle", city:"Washington, DC", active:false },
    { name:"Capitol Hill", city:"Washington, DC", active:false },
    { name:"Adams Morgan", city:"Washington, DC", active:false },
  ];
  const nav = (p) => { setPg(p); window.scrollTo(0,0); setMobNav(false); setProfMenu(false); };
  const goSched = (p) => { setPreSel(p); nav("schedule"); };
  const topOff = banner && dist.active ? (mob ? 64 : 44) : 0;

  const ctx = { w, mob, tab, pad, nav, goSched, logged };

  return (
    <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", background:C.bg, minHeight:"100vh", color:C.txt }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,300;1,9..144,400&display=swap');
        *{margin:0;padding:0;box-sizing:border-box}a{text-decoration:none;color:inherit}button{font-family:inherit}input,textarea,select{font-family:inherit}
        ::-webkit-scrollbar{width:6px}::-webkit-scrollbar-thumb{background:rgba(45,24,16,0.15);border-radius:3px}
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes scaleIn{from{opacity:0;transform:scale(0.95)}to{opacity:1;transform:scale(1)}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}
        @keyframes float1{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        @keyframes float2{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
        @keyframes slideDown{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}
        @keyframes blobMove{from{transform:translate(0,0)}to{transform:translate(20px,-20px)}}
        @keyframes modalIn{from{opacity:0;transform:scale(0.96) translateY(8px)}to{opacity:1;transform:scale(1) translateY(0)}}
        @keyframes bannerSlide{from{transform:translateY(-100%);opacity:0}to{transform:translateY(0);opacity:1}}
      `}</style>

      {/* ---- BANNER ---- */}
      {banner && dist.active && (
        <div style={{ position:"fixed",top:0,left:0,right:0,zIndex:150,background:`linear-gradient(135deg,${C.accent},${C.accentL})`,padding:mob?"8px 12px":"10px 48px",display:"flex",alignItems:"center",justifyContent:"center",gap:mob?6:16,animation:"bannerSlide 0.5s ease",flexWrap:"wrap" }}>
          <span style={{ fontSize:mob?11:14,color:"#FFF",fontWeight:500,textAlign:"center" }}>📍 Browsing <strong>{dist.name}</strong> — your neighborhood?</span>
          <div style={{ display:"flex",gap:6 }}>
            <button onClick={() => setBanner(false)} style={{ fontSize:11,fontWeight:700,color:C.accent,background:"#FFF",border:"none",padding:"4px 12px",borderRadius:100,cursor:"pointer" }}>Yes!</button>
            <button onClick={() => { setDdOpen(true); setBanner(false); }} style={{ fontSize:11,fontWeight:600,color:"rgba(255,255,255,0.9)",background:"rgba(255,255,255,0.15)",border:"1px solid rgba(255,255,255,0.3)",padding:"4px 12px",borderRadius:100,cursor:"pointer" }}>Change</button>
          </div>
          <button onClick={() => setBanner(false)} style={{ background:"none",border:"none",color:"rgba(255,255,255,0.5)",cursor:"pointer",position:"absolute",right:mob?4:12,top:"50%",transform:"translateY(-50%)" }}><Ic.X /></button>
        </div>
      )}

      {/* ---- HEADER ---- */}
      <header style={{ position:"fixed",top:topOff,left:0,right:0,zIndex:100,padding:mob?"10px 12px":"14px 48px",display:"flex",alignItems:"center",justifyContent:"space-between",background:"rgba(251,246,239,0.92)",backdropFilter:"blur(16px)",borderBottom:`1px solid ${C.border}`,transition:"top 0.3s" }}>
        {/* Left: Logo + Catalog */}
        <div style={{ display:"flex",alignItems:"center",gap:mob?8:20 }}>
          <div style={{ display:"flex",alignItems:"center",gap:8,cursor:"pointer" }} onClick={() => nav("home")}>
            <div style={{ width:mob?30:38,height:mob?30:38,background:`linear-gradient(135deg,${C.accent},${C.accentL})`,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontSize:mob?14:18 }}>🍞</div>
            {!mob && <span style={{ fontFamily:"'Fraunces',serif",fontSize:21,fontWeight:700 }}>We Bake</span>}
          </div>
          {!mob && <button onClick={() => nav("catalog")} style={{ fontSize:14,fontWeight:500,color:pg==="catalog"?C.accent:C.muted,cursor:"pointer",padding:"8px 16px",borderRadius:100,background:pg==="catalog"?"rgba(199,91,43,0.08)":"transparent",border:"none" }}>Catalog</button>}
        </div>

        {/* Right: District + Auth */}
        <div style={{ display:"flex",alignItems:"center",gap:mob?6:12 }}>
          {/* District */}
          <div style={{ position:"relative" }}>
            <button onClick={() => setDdOpen(!ddOpen)} style={{ display:"flex",alignItems:"center",gap:4,fontSize:mob?10:13,fontWeight:500,color:C.accent,background:"rgba(199,91,43,0.08)",padding:mob?"5px 10px":"8px 16px",borderRadius:100,cursor:"pointer",border:"none" }}>
              <div style={{ width:5,height:5,background:C.accent,borderRadius:"50%",animation:"pulse 2s ease infinite" }} />
              {mob ? dist.name : `${dist.name}, ${dist.city}`}
              <Ic.Down />
            </button>
            {ddOpen && (
              <div style={{ position:"absolute",top:"calc(100% + 8px)",right:0,background:"#FFF",borderRadius:16,padding:8,minWidth:mob?240:280,boxShadow:"0 12px 40px rgba(0,0,0,0.12)",animation:"slideDown 0.2s ease",zIndex:110 }}>
                <div style={{ padding:"8px 16px 4px",fontSize:11,fontWeight:600,color:C.light,letterSpacing:1,textTransform:"uppercase" }}>Neighborhood</div>
                {dists.map((d, i) => (
                  <div key={i} onClick={() => { setDist(d); setDdOpen(false); setBanner(true); nav("home"); }} style={{ padding:"10px 16px",borderRadius:10,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"space-between",transition:"background 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.background = "rgba(199,91,43,0.06)"} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                    <div><div style={{ fontSize:14,fontWeight:500 }}>{d.name}</div><div style={{ fontSize:11,color:C.light }}>{d.city}</div></div>
                    <span style={{ fontSize:11,fontWeight:600,color:d.active?C.ok:C.light,background:d.active?"rgba(61,139,94,0.08)":"rgba(0,0,0,0.04)",padding:"3px 10px",borderRadius:100 }}>{d.active?"Active":"Waitlist"}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Auth / Profile */}
          {logged ? (
            <div style={{ position:"relative" }}>
              <div onClick={() => setProfMenu(!profMenu)} style={{ width:mob?32:40,height:mob?32:40,borderRadius:"50%",background:`linear-gradient(135deg,${C.accent},${C.accentL})`,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:"#FFF" }}><Ic.User /></div>
              {profMenu && (
                <div style={{ position:"absolute",top:"calc(100% + 8px)",right:0,background:"#FFF",borderRadius:16,padding:8,minWidth:200,boxShadow:"0 12px 40px rgba(0,0,0,0.12)",animation:"slideDown 0.2s ease",zIndex:110 }}>
                  {mob && <div onClick={() => nav("catalog")} style={{ padding:"10px 16px",borderRadius:10,cursor:"pointer",fontSize:14,fontWeight:500 }}>Catalog</div>}
                  {[{l:"My Subscription",p:"subscription"},{l:"Delivery History",p:"history"},{l:"Billing",p:"billing"}].map((it,i) => (
                    <div key={i} onClick={() => nav(it.p)} style={{ padding:"10px 16px",borderRadius:10,cursor:"pointer",fontSize:14,fontWeight:500,transition:"background 0.2s" }}
                      onMouseEnter={e => e.currentTarget.style.background = "rgba(199,91,43,0.06)"} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>{it.l}</div>
                  ))}
                  <div style={{ borderTop:`1px solid ${C.border}`,margin:"4px 0" }} />
                  <div onClick={() => { setLogged(false); setProfMenu(false); nav("home"); }} style={{ padding:"10px 16px",borderRadius:10,cursor:"pointer",fontSize:14,fontWeight:500,color:C.err }}>Sign Out</div>
                </div>
              )}
            </div>
          ) : (
            <>
              {mob && <button onClick={() => nav("catalog")} style={{ fontSize:11,fontWeight:600,color:C.muted,background:"none",border:"none",cursor:"pointer",padding:"6px 8px" }}>Catalog</button>}
              <button onClick={() => setShowAuth(true)} style={{ fontSize:mob?12:14,fontWeight:600,color:C.bg,background:C.txt,border:"none",padding:mob?"8px 16px":"10px 28px",borderRadius:100,cursor:"pointer" }}>Sign In</button>
            </>
          )}
        </div>
      </header>

      {/* ---- MODALS ---- */}
      {showAuth && <AuthModal mob={mob} onClose={() => setShowAuth(false)} onLogin={() => { setLogged(true); setShowAuth(false); }} />}
      {showPause && <PauseModal mob={mob} onClose={() => setShowPause(false)} onPause={() => { setSubSt("paused"); setShowPause(false); }} onCancel={() => { setSubSt("none"); setShowPause(false); }} />}
      {showRate && <RatingModal mob={mob} onClose={() => setShowRate(false)} />}

      {/* ---- PAGES ---- */}
      <div style={{ paddingTop: topOff + (mob ? 52 : 60) }}>
        {!dist.active ? <WaitlistPage dist={dist} {...ctx} /> :
         pg === "home" ? <HomePage dist={dist} {...ctx} /> :
         pg === "catalog" ? <CatalogPage {...ctx} /> :
         pg === "schedule" ? <SchedulePage items={items} setItems={setItems} slot={slot} setSlot={setSlot} preSel={preSel} clearPre={() => setPreSel(null)} onCheckout={() => { if (!logged) setShowAuth(true); else nav("checkout"); }} {...ctx} /> :
         pg === "checkout" ? <CheckoutPage items={items} slot={slot} step={coStep} setStep={setCoStep} onComplete={() => { setSubSt("active"); nav("subscription"); setCoStep(1); }} {...ctx} /> :
         pg === "subscription" ? <SubPage status={subSt} items={items} slot={slot} onEdit={() => nav("schedule")} onPause={() => setShowPause(true)} onResume={() => setSubSt("active")} {...ctx} /> :
         pg === "history" ? <HistoryPage onRate={() => setShowRate(true)} {...ctx} /> :
         pg === "billing" ? <BillingPage {...ctx} /> : null}
      </div>

      <FooterSection {...ctx} />
    </div>
  );
}


// ==========================================
// HOME PAGE
// ==========================================
function HomePage({ dist, mob, tab, pad, nav, goSched }) {
  return (
    <div>
      {/* HERO */}
      <section style={{ padding:mob?"40px 16px 60px":"100px 48px 80px",display:"flex",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden" }}>
        {!mob && <>
          <div style={{ position:"absolute",top:-200,right:-100,width:600,height:600,background:"radial-gradient(circle,rgba(232,141,90,0.1) 0%,transparent 70%)",borderRadius:"50%",animation:"blobMove 8s ease infinite alternate" }} />
          <div style={{ position:"absolute",bottom:-100,left:-200,width:500,height:500,background:"radial-gradient(circle,rgba(199,91,43,0.05) 0%,transparent 70%)",borderRadius:"50%",animation:"blobMove 10s ease infinite alternate-reverse" }} />
        </>}

        <div style={{ display:"grid",gridTemplateColumns:mob?"1fr":"1fr 1fr",gap:mob?32:80,maxWidth:1200,width:"100%",alignItems:"center",position:"relative",zIndex:1 }}>
          <div>
            <div style={{ display:"inline-flex",alignItems:"center",gap:8,background:"rgba(199,91,43,0.08)",padding:"8px 16px",borderRadius:100,marginBottom:mob?16:28,animation:"fadeUp 0.6s ease 0.2s both" }}>
              <div style={{ width:6,height:6,background:C.accent,borderRadius:"50%",animation:"pulse 2s ease infinite" }} />
              <span style={{ fontSize:mob?11:12,fontWeight:600,color:C.accent }}>Now delivering in {dist.name}</span>
            </div>

            <h1 style={{ fontFamily:"'Fraunces',serif",fontSize:mob?36:58,fontWeight:700,lineHeight:1.08,marginBottom:mob?16:24,animation:"fadeUp 0.6s ease 0.4s both" }}>
              Fresh bread,<br /><span style={{ color:C.accent }}>hot from</span><br /><span style={{ fontWeight:300,fontStyle:"italic",color:"#8B6842" }}>the oven.</span>
            </h1>

            <p style={{ fontSize:mob?15:17,lineHeight:1.7,color:C.muted,maxWidth:460,marginBottom:mob?24:40,animation:"fadeUp 0.6s ease 0.6s both" }}>
              Set your weekly bread schedule. We bake it fresh and deliver it hot — right to your doorstep.
            </p>

            <div style={{ display:"flex",flexDirection:mob?"column":"row",alignItems:mob?"stretch":"center",gap:mob?10:16,animation:"fadeUp 0.6s ease 0.8s both" }}>
              <BtnPrimary onClick={() => nav("schedule")}>Build Your Schedule →</BtnPrimary>
              <BtnOutline onClick={() => nav("catalog")}>View Catalog</BtnOutline>
            </div>

            <div style={{ display:"flex",gap:8,flexWrap:"wrap",marginTop:mob?16:28,animation:"fadeUp 0.6s ease 1s both" }}>
              {["✓ Cancel anytime","🎉 50% off first week","🔒 Stripe secure"].map((t,i) => (
                <div key={i} style={{ fontSize:10,fontWeight:600,color:C.light,background:"rgba(139,115,85,0.06)",padding:"5px 12px",borderRadius:100 }}>{t}</div>
              ))}
            </div>
          </div>

          {/* Video Hero */}
          <div style={{ position:"relative",animation:"scaleIn 0.8s ease 0.4s both" }}>
            <div style={{ width:"100%",aspectRatio:mob?"16/9":"4/5",borderRadius:mob?20:32,overflow:"hidden",boxShadow:"0 24px 60px rgba(45,24,16,0.12)",background:"#000" }}>
              <iframe
                src={`https://www.youtube.com/embed/${YOUTUBE_ID}?autoplay=1&mute=1&loop=1&playlist=${YOUTUBE_ID}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1`}
                style={{ width:"100%",height:"100%",border:"none",pointerEvents:"none" }}
                allow="autoplay; encrypted-media"
                loading="lazy"
                title="WE BAKE bakery"
              />
            </div>

            {!mob && <>
              <div style={{ position:"absolute",bottom:-20,left:-32,background:"#FFF",padding:"14px 18px",borderRadius:18,boxShadow:"0 8px 32px rgba(0,0,0,0.08)",display:"flex",alignItems:"center",gap:10,animation:"float1 3s ease infinite" }}>
                <div style={{ width:40,height:40,background:"linear-gradient(135deg,#FFF0E5,#FFE0C8)",borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18 }}>🕐</div>
                <div><div style={{ fontSize:13,fontWeight:600 }}>Tomorrow, 6:30 AM</div><div style={{ fontSize:11,color:C.light,marginTop:1 }}>Next delivery</div></div>
              </div>
              <div style={{ position:"absolute",top:24,right:-28,background:"#FFF",padding:"10px 10px 14px",borderRadius:16,boxShadow:"0 8px 32px rgba(0,0,0,0.08)",animation:"float2 4s ease 1s infinite",width:150 }}>
                <img src={IMG_BREADBOX} alt="Fresh bread" style={{ width:"100%",height:90,objectFit:"cover",borderRadius:10,marginBottom:6 }} />
                <div style={{ fontSize:11,letterSpacing:1 }}>⭐⭐⭐⭐⭐</div>
                <div style={{ fontSize:10,fontWeight:600,marginTop:2 }}>"Best bread ever!"</div>
                <div style={{ fontSize:9,color:C.light,marginTop:1 }}>— Sarah M.</div>
              </div>
            </>}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS — redesigned */}
      <section style={{ padding:mob?"60px 16px 80px":"100px 48px 100px",background:C.dark,borderRadius:mob?"32px 32px 0 0":"48px 48px 0 0",position:"relative",overflow:"hidden" }}>
        {!mob && <div style={{ position:"absolute",inset:0,pointerEvents:"none",opacity:0.03,backgroundImage:"radial-gradient(circle,#FBF6EF 1px,transparent 1px)",backgroundSize:"32px 32px" }} />}

        <div style={{ textAlign:"center",marginBottom:mob?36:56,position:"relative",zIndex:1 }}>
          <div style={{ fontSize:12,fontWeight:600,letterSpacing:3,textTransform:"uppercase",color:"#E88D5A",marginBottom:12 }}>How It Works</div>
          <h2 style={{ fontFamily:"'Fraunces',serif",fontSize:mob?28:44,fontWeight:600,color:C.bg,marginBottom:12 }}>Bread on autopilot</h2>
          <p style={{ fontSize:mob?14:16,color:"rgba(251,246,239,0.5)",maxWidth:480,margin:"0 auto" }}>Four steps to fresh bread at your door every morning.</p>
        </div>

        <div style={{ maxWidth:1000,margin:"0 auto",display:"grid",gridTemplateColumns:mob?"1fr":(tab?"1fr 1fr":"1fr 1fr"),gap:mob?16:20,position:"relative",zIndex:1 }}>
          {[
            { icon:"🍞",num:"01",title:"Choose Your Bread",desc:"Browse our daily selection — 10+ varieties baked from scratch with the finest ingredients.",photo:IMG_HIW_CHOOSE },
            { icon:"📅",num:"02",title:"Set Your Schedule",desc:"Pick your delivery days and customize quantities. Fully flexible — change anytime.",photo:IMG_HIW_SCHEDULE },
            { icon:"🔥",num:"03",title:"We Bake & Deliver",desc:"Every morning we bake your order fresh and deliver it hot to your door before 9 AM.",photo:IMG_HIW_DELIVER },
            { icon:"💳",num:"04",title:"Pay Weekly",desc:"Charged only for what we delivered. No commitments, cancel anytime with one tap.",photo:IMG_HIW_PAY },
          ].map((step, i) => (
            <div key={i} style={{
              background:"rgba(251,246,239,0.04)",borderRadius:mob?18:24,overflow:"hidden",
              border:"1px solid rgba(251,246,239,0.07)",transition:"all 0.4s",
              display:"flex",flexDirection:"column",
            }}
              onMouseEnter={e => { if(!mob){ e.currentTarget.style.background="rgba(251,246,239,0.08)"; e.currentTarget.style.transform="translateY(-4px)"; }}}
              onMouseLeave={e => { e.currentTarget.style.background="rgba(251,246,239,0.04)"; e.currentTarget.style.transform=""; }}
            >
              {/* Compact photo strip with gradient overlay for visual unity */}
              <div style={{ position:"relative",height:mob?120:140,overflow:"hidden" }}>
                <img src={step.photo} alt={step.title} style={{ width:"100%",height:"100%",objectFit:"cover",display:"block",filter:"brightness(0.7) saturate(0.8)" }} />
                <div style={{ position:"absolute",inset:0,background:"linear-gradient(180deg,rgba(45,24,16,0.15) 0%,rgba(45,24,16,0.7) 100%)" }} />
                <div style={{ position:"absolute",top:mob?12:16,left:mob?12:16,display:"flex",alignItems:"center",gap:8 }}>
                  <div style={{ width:mob?36:42,height:mob?36:42,background:"rgba(199,91,43,0.85)",backdropFilter:"blur(8px)",borderRadius:mob?10:12,display:"flex",alignItems:"center",justifyContent:"center",fontSize:mob?18:20 }}>{step.icon}</div>
                  <span style={{ fontFamily:"'Fraunces',serif",fontSize:mob?11:13,fontWeight:600,color:"rgba(251,246,239,0.4)",letterSpacing:1 }}>{step.num}</span>
                </div>
              </div>
              {/* Text content */}
              <div style={{ padding:mob?"16px 16px 20px":"20px 24px 24px",flex:1,display:"flex",flexDirection:"column" }}>
                <h3 style={{ fontFamily:"'Fraunces',serif",fontSize:mob?18:21,fontWeight:600,color:C.bg,marginBottom:mob?6:8,lineHeight:1.2 }}>{step.title}</h3>
                <p style={{ fontSize:mob?13:14,lineHeight:1.65,color:"rgba(251,246,239,0.55)",flex:1 }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CATALOG PREVIEW */}
      <section style={{ padding:mob?"60px 16px":"100px 48px" }}>
        <div style={{ textAlign:"center",marginBottom:mob?32:56 }}>
          <div style={{ fontSize:12,fontWeight:600,letterSpacing:3,textTransform:"uppercase",color:C.accent,marginBottom:12 }}>Our Selection</div>
          <h2 style={{ fontFamily:"'Fraunces',serif",fontSize:mob?28:40,fontWeight:600 }}>Freshly baked, daily</h2>
        </div>
        <div style={{ display:"grid",gridTemplateColumns:mob?"1fr 1fr":(tab?"repeat(3,1fr)":"repeat(4,1fr)"),gap:mob?12:24,maxWidth:1100,margin:"0 auto" }}>
          {PRODUCTS.slice(0, mob?4:4).map(p => <ProdCard key={p.id} p={p} mob={mob} onClick={() => goSched(p)} />)}
        </div>
        <div style={{ textAlign:"center",marginTop:mob?28:48 }}>
          <BtnAccent onClick={() => nav("catalog")}>View Full Catalog →</BtnAccent>
        </div>
      </section>
    </div>
  );
}


// ==========================================
// PRODUCT CARD
// ==========================================
// Rating badge component
function RatingBadge({ rating, reviews, size="sm" }) {
  const sm = size === "sm";
  return (
    <div style={{ display:"inline-flex",alignItems:"center",gap:sm?3:5 }}>
      <div style={{ display:"flex",alignItems:"center",gap:1 }}>
        {[1,2,3,4,5].map(s => {
          const fill = s <= Math.floor(rating) ? 1 : (s - rating < 1 ? rating - Math.floor(rating) : 0);
          return <svg key={s} width={sm?10:13} height={sm?10:13} viewBox="0 0 24 24"><defs><linearGradient id={`sf${s}${rating}`}><stop offset={`${fill*100}%`} stopColor="#E8A33A"/><stop offset={`${fill*100}%`} stopColor={sm?"#ddd":"rgba(255,255,255,0.2)"}/></linearGradient></defs><polygon fill={`url(#sf${s}${rating})`} points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
        })}
      </div>
      <span style={{ fontSize:sm?10:12,fontWeight:600,color:sm?C.muted:"rgba(251,246,239,0.7)" }}>{rating}</span>
      {reviews && <span style={{ fontSize:sm?9:11,color:sm?C.light:"rgba(251,246,239,0.4)" }}>({reviews})</span>}
    </div>
  );
}

function ProdCard({ p, mob, onClick }) {
  return (
    <div onClick={onClick} style={{ background:"#FFF",borderRadius:mob?14:20,overflow:"hidden",border:`1px solid ${C.border}`,transition:"all 0.3s",cursor:"pointer" }}
      onMouseEnter={e => { if(!mob){ e.currentTarget.style.transform="translateY(-4px)"; e.currentTarget.style.boxShadow="0 12px 32px rgba(0,0,0,0.06)"; }}}
      onMouseLeave={e => { e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow=""; }}>
      <div style={{ width:"100%",aspectRatio:"4/3",overflow:"hidden" }}>
        <img src={pImg(p)} alt={p.name} style={{ width:"100%",height:"100%",objectFit:"cover" }} />
      </div>
      <div style={{ padding:mob?"12px":"20px 20px 24px" }}>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:mob?2:4 }}>
          <h3 style={{ fontFamily:"'Fraunces',serif",fontSize:mob?14:18,fontWeight:600 }}>{p.name}</h3>
          <span style={{ fontSize:mob?16:20,fontWeight:700,color:C.accent }}>${p.price.toFixed(2)}</span>
        </div>
        <div style={{ marginBottom:mob?4:8 }}><RatingBadge rating={p.rating} reviews={p.reviews} /></div>
        {!mob && <p style={{ fontSize:13,lineHeight:1.5,color:C.muted,marginBottom:10 }}>{p.desc}</p>}
        {!mob && <p style={{ fontSize:11,color:C.light }}>Allergens: {p.allergens}</p>}
        <div style={{ marginTop:mob?6:12,fontSize:mob?11:12,fontWeight:600,color:C.accent,display:"flex",alignItems:"center",gap:4 }}>
          Add to schedule <Ic.Right />
        </div>
      </div>
    </div>
  );
}


// ==========================================
// CATALOG PAGE
// ==========================================
function CatalogPage({ mob, tab, pad, goSched }) {
  return (
    <div style={{ maxWidth:1200,margin:"0 auto",padding:`40px ${mob?"16px":"48px"}` }}>
      <div style={{ marginBottom:mob?24:48 }}>
        <div style={{ fontSize:12,fontWeight:600,letterSpacing:3,textTransform:"uppercase",color:C.accent,marginBottom:8 }}>Our Bread</div>
        <h1 style={{ fontFamily:"'Fraunces',serif",fontSize:mob?28:40,fontWeight:600,marginBottom:8 }}>Fresh Selection</h1>
        <p style={{ fontSize:mob?14:16,color:C.muted }}>Click any bread to add it to your schedule.</p>
      </div>
      <div style={{ display:"grid",gridTemplateColumns:mob?"1fr 1fr":(tab?"repeat(3,1fr)":"repeat(3,1fr)"),gap:mob?12:28 }}>
        {PRODUCTS.map(p => <ProdCard key={p.id} p={p} mob={mob} onClick={() => goSched(p)} />)}
      </div>
    </div>
  );
}


// ==========================================
// SCHEDULE BUILDER — fully responsive
// ==========================================
function SchedulePage({ items, setItems, slot, setSlot, preSel, clearPre, onCheckout, mob, tab, pad }) {
  const [addProd, setAddProd] = useState(preSel || null);
  const [addQty, setAddQty] = useState(1);
  const [addDays, setAddDays] = useState([]);
  const [showPicker, setShowPicker] = useState(!!preSel);
  const [showSummary, setShowSummary] = useState(false);

  useEffect(() => { if (preSel) { setAddProd(preSel); setShowPicker(true); clearPre(); } }, [preSel]);

  const addItem = () => {
    if (!addProd || addDays.length === 0) return;
    setItems([...items, { product: addProd, qty: addQty, days: addDays }]);
    setAddProd(null); setAddQty(1); setAddDays([]); setShowPicker(false);
  };
  const removeItem = (idx) => setItems(items.filter((_, i) => i !== idx));

  const weeklyTotal = items.reduce((s, it) => s + it.product.price * it.qty * it.days.length, 0);
  const deliveryDays = [...new Set(items.flatMap(i => i.days))].length;
  const deliveryFees = deliveryDays * DFEE;
  const grandTotal = weeklyTotal + deliveryFees;

  return (
    <div style={{ maxWidth:1200,margin:"0 auto",padding:`${mob?20:40}px ${mob?"16px":"48px"} ${mob?"120px":"40px"}` }}>
      <div style={{ marginBottom:mob?20:40 }}>
        <div style={{ fontSize:12,fontWeight:600,letterSpacing:3,textTransform:"uppercase",color:C.accent,marginBottom:8 }}>Core Feature</div>
        <h1 style={{ fontFamily:"'Fraunces',serif",fontSize:mob?24:36,fontWeight:600 }}>Build Your Schedule</h1>
      </div>

      <div style={{ display:"grid",gridTemplateColumns:mob?"1fr":"1fr 340px",gap:mob?16:40,alignItems:"flex-start" }}>
        <div>
          {/* Add bread button / picker */}
          {!showPicker ? (
            <button onClick={() => setShowPicker(true)} style={{ display:"flex",alignItems:"center",gap:8,fontSize:14,fontWeight:600,color:C.accent,background:"rgba(199,91,43,0.08)",border:`1.5px dashed ${C.bAccent}`,padding:mob?"12px":"14px 24px",borderRadius:16,cursor:"pointer",marginBottom:mob?12:24,width:"100%",justifyContent:"center" }}>
              <Ic.Plus /> Add Bread to Schedule
            </button>
          ) : (
            <div style={{ background:"#FFF",borderRadius:mob?16:20,padding:mob?12:20,marginBottom:mob?12:24,border:`1px solid ${C.border}`,animation:"slideDown 0.3s ease" }}>
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10 }}>
                <h3 style={{ fontFamily:"'Fraunces',serif",fontSize:mob?15:18,fontWeight:600 }}>Pick a bread</h3>
                <button onClick={() => { setShowPicker(false); setAddProd(null); }} style={{ background:"none",border:"none",cursor:"pointer",color:C.muted }}><Ic.X /></button>
              </div>

              {/* Product grid — builder inserts inline after selected card's row */}
              <div style={{ display:"grid",gridTemplateColumns:mob?"repeat(3, 1fr)":"repeat(5, 1fr)",gap:mob?6:8 }}>
                {PRODUCTS.map((p, idx) => {
                  const cols = mob ? 3 : 5;
                  const sel = addProd?.id === p.id;
                  // Show builder after the last card in the selected card's row
                  const selIdx = PRODUCTS.findIndex(x => x.id === addProd?.id);
                  const selRowEnd = selIdx >= 0 ? (Math.floor(selIdx / cols) + 1) * cols - 1 : -1;
                  const showBuilderHere = addProd && idx === Math.min(selRowEnd, PRODUCTS.length - 1);
                  return (<React.Fragment key={p.id}>
                    <div onClick={() => { setAddProd(p); setAddQty(1); setAddDays([]); }} style={{
                      cursor:"pointer",textAlign:"center",
                      border:sel?`2px solid ${C.accent}`:`1px solid ${C.border}`,
                      borderRadius:mob?10:14,padding:mob?5:6,
                      background:sel?"rgba(199,91,43,0.05)":"#FFF",
                      transition:"all 0.2s",
                    }}
                      onMouseEnter={e => { if(!sel){e.currentTarget.style.borderColor=C.accent;e.currentTarget.style.background="rgba(199,91,43,0.02)";}}}
                      onMouseLeave={e => { if(!sel){e.currentTarget.style.borderColor=C.border;e.currentTarget.style.background="#FFF";}}}
                    >
                      <img src={pImg(p)} alt={p.name} style={{ width:"100%",aspectRatio:"1",objectFit:"cover",borderRadius:mob?6:8,marginBottom:3 }} />
                      <div style={{ fontSize:mob?8:10,fontWeight:600,lineHeight:1.2,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>{p.name}</div>
                      <div style={{ fontSize:mob?13:17,color:C.accent,fontWeight:700,marginTop:2 }}>${p.price.toFixed(2)}</div>
                      <div style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:1,marginTop:2 }}>
                        {[1,2,3,4,5].map(s=><svg key={s} width={mob?7:9} height={mob?7:9} viewBox="0 0 24 24"><polygon fill={s<=Math.floor(p.rating)?"#E8A33A":(s-p.rating<1?"#E8A33A":"#ddd")} opacity={s<=Math.floor(p.rating)?1:(s-p.rating<1?0.5:1)} points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>)}
                        <span style={{ fontSize:mob?7:8,color:C.light,marginLeft:2 }}>{p.rating}</span>
                      </div>
                    </div>
                    {showBuilderHere && (
                      <div style={{ gridColumn:`1 / -1`,background:"rgba(199,91,43,0.03)",border:`2px solid ${C.accent}`,borderRadius:mob?12:16,padding:mob?10:14,animation:"slideDown 0.25s ease" }}>
                        <div style={{ display:"flex",gap:mob?10:14,alignItems:"center",marginBottom:mob?10:12 }}>
                          <img src={pImg(addProd)} alt={addProd.name} style={{ width:mob?44:50,height:mob?44:50,borderRadius:mob?10:12,objectFit:"cover",flexShrink:0 }} />
                          <div style={{ flex:1,minWidth:0 }}>
                            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center" }}>
                              <h4 style={{ fontFamily:"'Fraunces',serif",fontSize:mob?14:16,fontWeight:600 }}>{addProd.name}</h4>
                              <span style={{ fontSize:mob?17:22,fontWeight:700,color:C.accent }}>${addProd.price.toFixed(2)}</span>
                            </div>
                            <RatingBadge rating={addProd.rating} reviews={addProd.reviews} />
                          </div>
                          <button onClick={(e) => { e.stopPropagation(); setAddProd(null); }} style={{ background:"none",border:"none",cursor:"pointer",color:C.light,padding:4 }}><Ic.X /></button>
                        </div>
                        <div style={{ display:"flex",flexDirection:mob?"column":"row",alignItems:mob?"stretch":"center",gap:mob?8:12 }}>
                          <div style={{ display:"flex",alignItems:"center",gap:5 }}>
                            <span style={{ fontSize:12,fontWeight:500,color:C.muted }}>Qty:</span>
                            <button onClick={() => setAddQty(Math.max(1,addQty-1))} style={{ width:30,height:30,borderRadius:8,border:`1px solid ${C.border}`,background:"#FFF",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center" }}><Ic.Min /></button>
                            <span style={{ fontSize:14,fontWeight:700,width:20,textAlign:"center" }}>{addQty}</span>
                            <button onClick={() => setAddQty(addQty+1)} style={{ width:30,height:30,borderRadius:8,border:`1px solid ${C.border}`,background:"#FFF",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center" }}><Ic.Plus /></button>
                          </div>
                          <div style={{ display:"flex",alignItems:"center",gap:mob?4:5,flexWrap:"wrap" }}>
                            <span style={{ fontSize:12,fontWeight:500,color:C.muted }}>Days:</span>
                            {DAYS.map(d => (
                              <button key={d} onClick={() => setAddDays(addDays.includes(d)?addDays.filter(x=>x!==d):[...addDays,d])} style={{
                                width:mob?34:36,height:mob?34:36,borderRadius:8,fontSize:10,fontWeight:600,
                                border:addDays.includes(d)?`2px solid ${C.accent}`:`1px solid ${C.border}`,
                                background:addDays.includes(d)?C.accent:"#FFF",color:addDays.includes(d)?"#FFF":C.muted,
                                cursor:"pointer",transition:"all 0.2s",
                              }}>{d}</button>
                            ))}
                          </div>
                          <button onClick={addItem} disabled={addDays.length===0} style={{
                            fontSize:12,fontWeight:700,color:"#FFF",marginLeft:mob?0:"auto",
                            background:addDays.length===0?"#ccc":C.accent,
                            border:"none",padding:mob?"10px":"8px 20px",borderRadius:8,cursor:addDays.length===0?"not-allowed":"pointer",width:mob?"100%":"auto",
                          }}>Add ✓</button>
                        </div>
                      </div>
                    )}
                  </React.Fragment>);
                })}
              </div>
            </div>
          )}

          {/* Schedule items */}
          {items.length > 0 ? (
            mob ? (
              // Mobile: card list instead of table
              <div style={{ display:"flex",flexDirection:"column",gap:8 }}>
                {items.map((item, idx) => (
                  <div key={idx} style={{ background:"#FFF",borderRadius:14,padding:14,border:`1px solid ${C.border}`,display:"flex",alignItems:"center",gap:10 }}>
                    <img src={pImg(item.product)} alt="" style={{ width:44,height:44,borderRadius:10,objectFit:"cover",flexShrink:0 }} />
                    <div style={{ flex:1,minWidth:0 }}>
                      <div style={{ fontSize:14,fontWeight:600 }}>{item.product.name} <span style={{ fontWeight:400,color:C.muted }}>×{item.qty}</span></div>
                      <div style={{ fontSize:12,color:C.light,marginTop:2 }}>{item.days.join(", ")}</div>
                    </div>
                    <div style={{ fontSize:14,fontWeight:700,color:C.accent,marginRight:4 }}>${(item.product.price * item.qty * item.days.length).toFixed(2)}</div>
                    <button onClick={() => removeItem(idx)} style={{ background:"none",border:"none",cursor:"pointer",color:C.light,fontSize:18 }}>×</button>
                  </div>
                ))}
              </div>
            ) : (
              // Desktop: table
              <div style={{ background:"#FFF",borderRadius:20,overflow:"hidden",border:`1px solid ${C.border}` }}>
                <table style={{ width:"100%",borderCollapse:"collapse" }}>
                  <thead><tr style={{ borderBottom:`1px solid ${C.border}` }}>
                    <th style={{ padding:"16px 20px",textAlign:"left",fontSize:13,fontWeight:600,color:C.muted }}>Item</th>
                    {DAYS.map(d => <th key={d} style={{ padding:"16px 6px",textAlign:"center",fontSize:12,fontWeight:600,color:C.muted,width:44 }}>{d}</th>)}
                    <th style={{ width:36 }} />
                  </tr></thead>
                  <tbody>{items.map((item, idx) => (
                    <tr key={idx} style={{ borderBottom:`1px solid ${C.border}` }}>
                      <td style={{ padding:"12px 20px" }}>
                        <div style={{ display:"flex",alignItems:"center",gap:10 }}>
                          <img src={pImg(item.product)} alt="" style={{ width:36,height:36,borderRadius:8,objectFit:"cover" }} />
                          <div><div style={{ fontSize:14,fontWeight:600 }}>{item.product.name}</div><div style={{ fontSize:12,color:C.light }}>×{item.qty} · ${item.product.price.toFixed(2)} ea</div></div>
                        </div>
                      </td>
                      {DAYS.map(d => <td key={d} style={{ textAlign:"center",padding:"12px 6px" }}>{item.days.includes(d)?<div style={{ width:24,height:24,borderRadius:6,background:"rgba(199,91,43,0.1)",display:"inline-flex",alignItems:"center",justifyContent:"center",color:C.accent }}><Ic.Chk /></div>:<div style={{ width:24,height:24,borderRadius:6,background:"rgba(0,0,0,0.02)",display:"inline-flex" }} />}</td>)}
                      <td><button onClick={() => removeItem(idx)} style={{ background:"none",border:"none",cursor:"pointer",color:C.light,fontSize:16 }}>×</button></td>
                    </tr>
                  ))}</tbody>
                </table>
              </div>
            )
          ) : (
            <div style={{ background:"#FFF",borderRadius:mob?16:20,padding:mob?40:60,textAlign:"center",border:`1px solid ${C.border}` }}>
              <div style={{ fontSize:40,marginBottom:12 }}>🍞</div>
              <p style={{ fontSize:15,color:C.muted }}>Your schedule is empty</p>
              <p style={{ fontSize:13,color:C.light }}>Add bread to get started</p>
            </div>
          )}
        </div>

        {/* SIDEBAR — desktop: sticky, mobile: bottom sheet */}
        {mob ? (
          <>
            {/* Floating bottom bar */}
            <div style={{ position:"fixed",bottom:0,left:0,right:0,background:"#FFF",borderTop:`1px solid ${C.border}`,padding:"12px 16px",zIndex:90,display:"flex",alignItems:"center",justifyContent:"space-between",boxShadow:"0 -4px 20px rgba(0,0,0,0.06)" }}>
              <div>
                <div style={{ fontSize:11,color:C.muted }}>Weekly Total</div>
                <div style={{ fontSize:20,fontWeight:700,color:C.accent }}>${grandTotal.toFixed(2)}</div>
              </div>
              <div style={{ display:"flex",gap:8,alignItems:"center" }}>
                <button onClick={() => setShowSummary(true)} style={{ fontSize:12,fontWeight:600,color:C.accent,background:"rgba(199,91,43,0.08)",border:"none",padding:"10px 16px",borderRadius:100,cursor:"pointer" }}>Details</button>
                <button onClick={onCheckout} disabled={items.length===0} style={{ fontSize:14,fontWeight:700,color:"#FFF",background:items.length===0?"#ccc":`linear-gradient(135deg,${C.accent},${C.accentL})`,border:"none",padding:"12px 24px",borderRadius:100,cursor:items.length===0?"not-allowed":"pointer" }}>Checkout</button>
              </div>
            </div>

            {/* Summary sheet */}
            {showSummary && (
              <div style={{ position:"fixed",inset:0,zIndex:200,background:"rgba(45,24,16,0.4)",display:"flex",alignItems:"flex-end" }} onClick={() => setShowSummary(false)}>
                <div style={{ background:"#FFF",borderRadius:"24px 24px 0 0",padding:"24px 20px 32px",width:"100%",animation:"slideDown 0.3s ease" }} onClick={e => e.stopPropagation()}>
                  <div style={{ width:40,height:4,background:C.border,borderRadius:2,margin:"0 auto 20px" }} />
                  <SummaryContent items={items} slot={slot} setSlot={setSlot} weeklyTotal={weeklyTotal} deliveryDays={deliveryDays} deliveryFees={deliveryFees} grandTotal={grandTotal} onCheckout={onCheckout} mob={true} />
                </div>
              </div>
            )}
          </>
        ) : (
          <div style={{ background:"#FFF",borderRadius:24,padding:32,position:"sticky",top:120,border:`1px solid ${C.border}` }}>
            <SummaryContent items={items} slot={slot} setSlot={setSlot} weeklyTotal={weeklyTotal} deliveryDays={deliveryDays} deliveryFees={deliveryFees} grandTotal={grandTotal} onCheckout={onCheckout} mob={false} />
          </div>
        )}
      </div>
    </div>
  );
}

function SummaryContent({ items, slot, setSlot, weeklyTotal, deliveryDays, deliveryFees, grandTotal, onCheckout, mob }) {
  return (
    <>
      <h3 style={{ fontFamily:"'Fraunces',serif",fontSize:mob?18:22,fontWeight:600,marginBottom:20 }}>Weekly Summary</h3>

      {/* Time slot */}
      <div style={{ display:"flex",alignItems:"center",gap:10,padding:"12px 14px",borderRadius:14,background:"rgba(199,91,43,0.04)",border:`1.5px solid ${C.bAccent}`,marginBottom:20 }}>
        <div style={{ width:34,height:34,borderRadius:10,background:`linear-gradient(135deg,${C.accent},${C.accentL})`,display:"flex",alignItems:"center",justifyContent:"center",color:"#FFF",flexShrink:0 }}><Ic.Clock /></div>
        <div style={{ flex:1 }}>
          <label style={{ fontSize:11,fontWeight:600,color:C.accent,display:"block",marginBottom:3 }}>Choose your delivery time</label>
          <select value={slot} onChange={e => setSlot(e.target.value)} style={{ width:"100%",padding:0,border:"none",fontSize:14,fontWeight:600,background:"transparent",cursor:"pointer",outline:"none",color:C.txt }}>
            {SLOTS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {/* Items */}
      <div style={{ borderTop:`1px solid ${C.border}`,paddingTop:16,marginBottom:16 }}>
        {items.map((item, i) => (
          <div key={i} style={{ display:"flex",justifyContent:"space-between",marginBottom:8,fontSize:14 }}>
            <span style={{ color:C.muted }}>{item.product.name} ×{item.qty} · {item.days.length}d</span>
            <span style={{ fontWeight:600 }}>${(item.product.price*item.qty*item.days.length).toFixed(2)}</span>
          </div>
        ))}
        {deliveryDays > 0 && (
          <div style={{ display:"flex",justifyContent:"space-between",marginBottom:8,fontSize:14 }}>
            <span style={{ color:C.muted }}>Delivery · {deliveryDays}d × ${DFEE.toFixed(2)}</span>
            <span style={{ fontWeight:600 }}>${deliveryFees.toFixed(2)}</span>
          </div>
        )}
      </div>

      <div style={{ display:"flex",justifyContent:"space-between",paddingTop:14,borderTop:`2px solid ${C.txt}`,marginBottom:8 }}>
        <span style={{ fontSize:16,fontWeight:700 }}>Weekly Total</span>
        <span style={{ fontSize:20,fontWeight:700,color:C.accent }}>${grandTotal.toFixed(2)}</span>
      </div>
      <div style={{ background:"rgba(199,91,43,0.06)",borderRadius:10,padding:"8px 12px",fontSize:12,fontWeight:600,color:C.accent,textAlign:"center",marginBottom:20 }}>🎉 50% off your first week!</div>

      {!mob && (
        <button onClick={onCheckout} disabled={items.length===0} style={{
          width:"100%",fontSize:15,fontWeight:700,color:"#FFF",
          background:items.length===0?"#ccc":`linear-gradient(135deg,${C.accent},${C.accentL})`,
          border:"none",padding:"16px",borderRadius:100,cursor:items.length===0?"not-allowed":"pointer",
          boxShadow:items.length>0?`0 4px 20px ${C.glow}`:"none",
        }}>Continue to Checkout</button>
      )}
    </>
  );
}


// ==========================================
// BUTTONS
// ==========================================
function BtnPrimary({ onClick, children }) {
  return <button onClick={onClick} style={{ fontSize:15,fontWeight:700,color:C.bg,background:`linear-gradient(135deg,${C.accent},${C.accentL})`,border:"2px solid transparent",padding:"16px 36px",borderRadius:100,cursor:"pointer",boxShadow:`0 4px 20px ${C.glow}`,transition:"all 0.4s",textAlign:"center" }}
    onMouseEnter={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color=C.accent;e.currentTarget.style.borderColor=C.accent;e.currentTarget.style.boxShadow="none";e.currentTarget.style.transform="translateY(-2px)"}}
    onMouseLeave={e=>{e.currentTarget.style.background=`linear-gradient(135deg,${C.accent},${C.accentL})`;e.currentTarget.style.color=C.bg;e.currentTarget.style.borderColor="transparent";e.currentTarget.style.boxShadow=`0 4px 20px ${C.glow}`;e.currentTarget.style.transform=""}}
  >{children}</button>;
}
function BtnOutline({ onClick, children }) {
  return <button onClick={onClick} style={{ fontSize:14,fontWeight:600,color:C.txt,background:"none",border:`2px solid ${C.border}`,padding:"14px 32px",borderRadius:100,cursor:"pointer",transition:"all 0.4s",textAlign:"center" }}
    onMouseEnter={e=>{e.currentTarget.style.borderColor=C.accent;e.currentTarget.style.color=C.accent;e.currentTarget.style.background="rgba(199,91,43,0.04)";e.currentTarget.style.transform="translateY(-2px)"}}
    onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.color=C.txt;e.currentTarget.style.background="none";e.currentTarget.style.transform=""}}
  >{children}</button>;
}
function BtnAccent({ onClick, children }) {
  return <button onClick={onClick} style={{ fontSize:14,fontWeight:600,color:C.accent,background:"rgba(199,91,43,0.08)",border:"2px solid transparent",padding:"12px 32px",borderRadius:100,cursor:"pointer",transition:"all 0.3s" }}
    onMouseEnter={e=>{e.currentTarget.style.borderColor=C.accent;e.currentTarget.style.transform="translateY(-2px)"}}
    onMouseLeave={e=>{e.currentTarget.style.borderColor="transparent";e.currentTarget.style.transform=""}}
  >{children}</button>;
}


// ==========================================
// FORM FIELD
// ==========================================
function Field({ label, placeholder, textarea, mob }) {
  const Tag = textarea ? "textarea" : "input";
  return (
    <div style={{ marginBottom:14 }}>
      <label style={{ fontSize:13,fontWeight:600,color:C.muted,display:"block",marginBottom:5 }}>{label}</label>
      <Tag placeholder={placeholder} style={{ width:"100%",padding:"11px 14px",borderRadius:12,border:`1px solid ${C.border}`,fontSize:14,color:C.txt,background:"#FFF",outline:"none",resize:textarea?"vertical":"none",minHeight:textarea?70:"auto" }}
        onFocus={e=>e.target.style.borderColor=C.accent} onBlur={e=>e.target.style.borderColor=C.border} />
    </div>
  );
}


// ==========================================
// CHECKOUT
// ==========================================
function CheckoutPage({ items, slot, step, setStep, onComplete, mob, pad }) {
  const steps = ["Delivery","Payment","Done"];
  return (
    <div style={{ maxWidth:680,margin:"0 auto",padding:`40px ${mob?"16px":"48px"}` }}>
      <h1 style={{ fontFamily:"'Fraunces',serif",fontSize:mob?24:32,fontWeight:600,marginBottom:24 }}>Checkout</h1>
      <div style={{ display:"flex",gap:8,marginBottom:mob?28:48 }}>
        {steps.map((s,i) => (
          <div key={i} style={{ flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:6 }}>
            <div style={{ width:mob?28:36,height:mob?28:36,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:mob?12:14,fontWeight:700,background:i+1<=step?C.accent:"rgba(0,0,0,0.05)",color:i+1<=step?"#FFF":C.light }}>{i+1<step?"✓":i+1}</div>
            <span style={{ fontSize:mob?10:12,fontWeight:500,color:i+1<=step?C.txt:C.light }}>{s}</span>
          </div>
        ))}
      </div>
      {step===1 && (
        <div style={{ background:"#FFF",borderRadius:mob?16:20,padding:mob?20:32,border:`1px solid ${C.border}`,animation:"fadeUp 0.4s ease" }}>
          <h2 style={{ fontFamily:"'Fraunces',serif",fontSize:mob?18:22,fontWeight:600,marginBottom:20 }}>Delivery Details</h2>
          <Field label="Delivery Address" placeholder="Start typing your address..." mob={mob} />
          <Field label="Phone Number" placeholder="+1 (555) 000-0000" mob={mob} />
          <Field label="Instructions" placeholder="e.g., Leave at the door" textarea mob={mob} />
          <button onClick={() => setStep(2)} style={{ width:"100%",fontSize:15,fontWeight:700,color:"#FFF",background:`linear-gradient(135deg,${C.accent},${C.accentL})`,border:"none",padding:"14px",borderRadius:100,cursor:"pointer",marginTop:4 }}>Continue to Payment</button>
        </div>
      )}
      {step===2 && (
        <div style={{ background:"#FFF",borderRadius:mob?16:20,padding:mob?20:32,border:`1px solid ${C.border}`,animation:"fadeUp 0.4s ease" }}>
          <h2 style={{ fontFamily:"'Fraunces',serif",fontSize:mob?18:22,fontWeight:600,marginBottom:20 }}>Payment</h2>
          <div style={{ background:C.cream,borderRadius:14,padding:mob?16:24,marginBottom:20,border:`1px solid ${C.border}` }}>
            <div style={{ display:"flex",alignItems:"center",gap:6,marginBottom:12 }}><Ic.Lock /><span style={{ fontSize:13,fontWeight:600,color:C.muted }}>Secure via Stripe</span></div>
            <Field label="Card Number" placeholder="1234 5678 9012 3456" mob={mob} />
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12 }}><Field label="Expiry" placeholder="MM/YY" mob={mob} /><Field label="CVC" placeholder="123" mob={mob} /></div>
          </div>
          <p style={{ fontSize:13,color:C.muted,lineHeight:1.6,marginBottom:16 }}>Charged weekly for delivered items. Cancel anytime. 50% off first week!</p>
          <div style={{ display:"flex",gap:10 }}>
            <button onClick={() => setStep(1)} style={{ flex:1,fontSize:14,fontWeight:600,color:C.muted,background:"none",border:`1px solid ${C.border}`,padding:"13px",borderRadius:100,cursor:"pointer" }}>Back</button>
            <button onClick={() => setStep(3)} style={{ flex:2,fontSize:15,fontWeight:700,color:"#FFF",background:`linear-gradient(135deg,${C.accent},${C.accentL})`,border:"none",padding:"14px",borderRadius:100,cursor:"pointer" }}>Confirm</button>
          </div>
        </div>
      )}
      {step===3 && (
        <div style={{ background:"#FFF",borderRadius:mob?16:24,padding:mob?32:48,border:`1px solid ${C.border}`,textAlign:"center",animation:"scaleIn 0.5s ease" }}>
          <div style={{ fontSize:56,marginBottom:16 }}>🎉</div>
          <h2 style={{ fontFamily:"'Fraunces',serif",fontSize:mob?22:28,fontWeight:600,marginBottom:10 }}>Subscription Active!</h2>
          <p style={{ fontSize:15,color:C.muted,marginBottom:6 }}>Welcome to We Bake.</p>
          <p style={{ fontSize:13,color:C.light,marginBottom:28 }}>First delivery: {slot}</p>
          <button onClick={onComplete} style={{ fontSize:15,fontWeight:700,color:"#FFF",background:`linear-gradient(135deg,${C.accent},${C.accentL})`,border:"none",padding:"14px 36px",borderRadius:100,cursor:"pointer" }}>Go to Subscription</button>
        </div>
      )}
    </div>
  );
}


// ==========================================
// SUBSCRIPTION PAGE
// ==========================================
function SubPage({ status, items, slot, onEdit, onPause, onResume, mob, nav }) {
  return (
    <div style={{ maxWidth:900,margin:"0 auto",padding:`40px ${mob?"16px":"48px"}` }}>
      <h1 style={{ fontFamily:"'Fraunces',serif",fontSize:mob?24:32,fontWeight:600,marginBottom:24 }}>My Subscription</h1>
      <div style={{ display:"flex",flexDirection:mob?"column":"row",justifyContent:"space-between",alignItems:mob?"flex-start":"center",gap:12,padding:mob?"16px":"20px 28px",borderRadius:mob?14:20,marginBottom:24,background:status==="active"?"rgba(61,139,94,0.06)":status==="paused"?"rgba(212,134,10,0.06)":"rgba(0,0,0,0.03)",border:`1px solid ${status==="active"?"rgba(61,139,94,0.15)":status==="paused"?"rgba(212,134,10,0.15)":C.border}` }}>
        <div style={{ display:"flex",alignItems:"center",gap:10 }}>
          <div style={{ width:10,height:10,borderRadius:"50%",background:status==="active"?C.ok:status==="paused"?C.warn:"#ccc" }} />
          <span style={{ fontSize:mob?14:16,fontWeight:600,textTransform:"capitalize" }}>{status==="none"?"No Subscription":`Subscription ${status}`}</span>
        </div>
        {status==="active" && <button onClick={onPause} style={{ fontSize:13,fontWeight:600,color:C.warn,background:"rgba(212,134,10,0.08)",border:"none",padding:"8px 18px",borderRadius:100,cursor:"pointer",display:"flex",alignItems:"center",gap:6 }}><Ic.Pause /> Pause</button>}
        {status==="paused" && <button onClick={onResume} style={{ fontSize:13,fontWeight:600,color:C.ok,background:"rgba(61,139,94,0.08)",border:"none",padding:"8px 18px",borderRadius:100,cursor:"pointer",display:"flex",alignItems:"center",gap:6 }}><Ic.Play /> Resume</button>}
      </div>

      <SecCard title="Weekly Schedule" action="Edit" onAction={onEdit} mob={mob}>
        {items.length>0?(
          <div style={{ overflowX:"auto" }}>
            <table style={{ width:"100%",borderCollapse:"collapse",minWidth:500 }}>
              <thead><tr>{["Item",...DAYS].map((h,i)=><th key={i} style={{ padding:"8px 6px",textAlign:i===0?"left":"center",fontSize:12,fontWeight:600,color:C.light }}>{h}</th>)}</tr></thead>
              <tbody>{items.map((item,i)=>(
                <tr key={i} style={{ borderTop:`1px solid ${C.border}` }}>
                  <td style={{ padding:"10px 6px",fontSize:14,fontWeight:500 }}>{item.product.name} ×{item.qty}</td>
                  {DAYS.map(d=><td key={d} style={{ textAlign:"center",padding:"10px 4px" }}>{item.days.includes(d)?<span style={{ color:C.accent,fontWeight:700 }}>✓</span>:<span style={{ color:"#ddd" }}>—</span>}</td>)}
                </tr>
              ))}</tbody>
            </table>
          </div>
        ):<p style={{ fontSize:14,color:C.light,padding:16,textAlign:"center" }}>No schedule yet.</p>}
      </SecCard>
      <div style={{ display:"grid",gridTemplateColumns:mob?"1fr":"1fr 1fr",gap:mob?12:20 }}>
        <SecCard title="Address" mob={mob}><p style={{ fontSize:14,color:C.muted }}>1234 P St NW, Georgetown, DC</p></SecCard>
        <SecCard title="Delivery Time" mob={mob}><p style={{ fontSize:14,color:C.muted }}>{slot}</p></SecCard>
      </div>
      <SecCard title="Billing" action="History" onAction={() => nav("billing")} mob={mob}>
        <div style={{ display:"flex",alignItems:"center",gap:8 }}><div style={{ width:8,height:8,borderRadius:"50%",background:C.ok }} /><span style={{ fontSize:14,color:C.muted }}>All payments up to date</span></div>
      </SecCard>
    </div>
  );
}

function SecCard({ title, action, onAction, children, mob }) {
  return (
    <div style={{ background:"#FFF",borderRadius:mob?14:20,padding:mob?16:28,marginBottom:mob?12:20,border:`1px solid ${C.border}` }}>
      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12 }}>
        <h3 style={{ fontFamily:"'Fraunces',serif",fontSize:mob?16:18,fontWeight:600 }}>{title}</h3>
        {action && <button onClick={onAction} style={{ fontSize:12,fontWeight:600,color:C.accent,background:"none",border:"none",cursor:"pointer",display:"flex",alignItems:"center",gap:4 }}><Ic.Edit />{action}</button>}
      </div>
      {children}
    </div>
  );
}


// ==========================================
// DELIVERY HISTORY
// ==========================================
function HistoryPage({ onRate, mob }) {
  const dels = [
    {date:"Feb 24",items:"2× Baguette, 1× Ciabatta",total:11.50,rating:5,img:IMG_BAGUETTE},
    {date:"Feb 23",items:"2× Baguette",total:9.00,rating:4,img:IMG_SOURDOUGH},
    {date:"Feb 22",items:"2× Baguette, 1× Flatbread",total:13.00,rating:null,img:IMG_FLATBREAD},
    {date:"Feb 21",items:"2× Baguette",total:9.00,rating:5,img:IMG_BAGUETTE},
    {date:"Feb 20",items:"2× Baguette, 1× Ciabatta",total:11.50,rating:4,img:IMG_CIABATTA},
  ];
  return (
    <div style={{ maxWidth:900,margin:"0 auto",padding:`40px ${mob?"16px":"48px"}` }}>
      <h1 style={{ fontFamily:"'Fraunces',serif",fontSize:mob?24:32,fontWeight:600,marginBottom:24 }}>Delivery History</h1>
      <div style={{ display:"flex",flexDirection:"column",gap:mob?8:12 }}>
        {dels.map((d,i) => (
          <div key={i} style={{ display:"flex",alignItems:"center",justifyContent:"space-between",background:"#FFF",borderRadius:mob?12:16,padding:mob?"12px 14px":"20px 28px",border:`1px solid ${C.border}`,flexWrap:mob?"wrap":"nowrap",gap:mob?8:16 }}>
            <div style={{ display:"flex",alignItems:"center",gap:mob?10:16,flex:1,minWidth:0 }}>
              <div style={{ width:mob?36:48,height:mob?36:48,borderRadius:mob?10:14,overflow:"hidden",flexShrink:0 }}><img src={d.img} alt="" style={{ width:"100%",height:"100%",objectFit:"cover" }} /></div>
              <div style={{ minWidth:0 }}><div style={{ fontSize:mob?13:15,fontWeight:600 }}>{d.date}</div><div style={{ fontSize:mob?11:13,color:C.muted,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>{d.items}</div></div>
            </div>
            <div style={{ display:"flex",alignItems:"center",gap:mob?10:24 }}>
              <span style={{ fontSize:mob?14:15,fontWeight:700 }}>${d.total.toFixed(2)}</span>
              {d.rating?<div style={{ display:"flex",gap:1 }}>{[1,2,3,4,5].map(s=><Ic.Star key={s} on={s<=d.rating} />)}</div>
              :<button onClick={onRate} style={{ fontSize:11,fontWeight:600,color:C.accent,background:"rgba(199,91,43,0.08)",border:"none",padding:"5px 14px",borderRadius:100,cursor:"pointer" }}>Rate</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


// ==========================================
// BILLING
// ==========================================
function BillingPage({ mob }) {
  const [exp, setExp] = useState(null);
  const weeks = [
    {period:"Feb 17–23",total:52.50,bd:[{i:"Baguette ×2",d:"Mon–Fri (5d)",a:35},{i:"Ciabatta ×1",d:"Wed,Sat (2d)",a:9},{i:"Delivery",d:"6d × $2",a:12}]},
    {period:"Feb 10–16",total:26.25,first:true,bd:[{i:"Baguette ×2",d:"Mon–Fri (5d)",a:35},{i:"Ciabatta ×1",d:"Wed,Sat (2d)",a:9},{i:"Delivery",d:"6d × $2",a:12},{i:"First week 50% off",d:"",a:-28}]},
  ];
  return (
    <div style={{ maxWidth:900,margin:"0 auto",padding:`40px ${mob?"16px":"48px"}` }}>
      <h1 style={{ fontFamily:"'Fraunces',serif",fontSize:mob?24:32,fontWeight:600,marginBottom:24 }}>Billing History</h1>
      {weeks.map((w,i) => (
        <div key={i} style={{ background:"#FFF",borderRadius:mob?12:16,overflow:"hidden",border:`1px solid ${C.border}`,marginBottom:12 }}>
          <div onClick={() => setExp(exp===i?null:i)} style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:mob?"14px 16px":"20px 28px",cursor:"pointer",gap:8 }}>
            <div style={{ display:"flex",alignItems:"center",gap:mob?8:16,minWidth:0 }}>
              {!mob && <Ic.Card />}
              <div style={{ minWidth:0 }}><div style={{ fontSize:mob?13:15,fontWeight:600 }}>Week of {w.period}</div>{w.first && <span style={{ fontSize:11,color:C.accent,fontWeight:600 }}>50% off!</span>}</div>
            </div>
            <div style={{ display:"flex",alignItems:"center",gap:mob?6:12,flexShrink:0 }}>
              <span style={{ fontSize:mob?14:16,fontWeight:700 }}>${w.total.toFixed(2)}</span>
              <span style={{ fontSize:11,fontWeight:600,color:C.ok,background:"rgba(61,139,94,0.08)",padding:"3px 8px",borderRadius:100 }}>Paid</span>
              <span style={{ transform:exp===i?"rotate(180deg)":"",transition:"transform 0.3s",display:"flex" }}><Ic.Down /></span>
            </div>
          </div>
          {exp===i && (
            <div style={{ padding:mob?"0 16px 14px":"0 28px 20px",borderTop:`1px solid ${C.border}`,animation:"slideDown 0.3s ease" }}>
              {w.bd.map((b,j) => (
                <div key={j} style={{ display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:j<w.bd.length-1?`1px solid ${C.border}`:"none",fontSize:mob?13:14 }}>
                  <div><span style={{ fontWeight:500,color:b.a<0?C.accent:C.txt }}>{b.i}</span>{b.d && <span style={{ color:C.light,marginLeft:6 }}>— {b.d}</span>}</div>
                  <span style={{ fontWeight:600,color:b.a<0?C.accent:C.txt }}>{b.a<0?`-$${Math.abs(b.a).toFixed(2)}`:`$${b.a.toFixed(2)}`}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}


// ==========================================
// WAITLIST
// ==========================================
function WaitlistPage({ dist, mob }) {
  const [ok, setOk] = useState(false);
  return (
    <div style={{ maxWidth:700,margin:"0 auto",padding:`60px ${mob?"16px":"48px"}`,textAlign:"center" }}>
      <div style={{ fontSize:56,marginBottom:20,animation:"scaleIn 0.5s ease" }}>🍞</div>
      <h1 style={{ fontFamily:"'Fraunces',serif",fontSize:mob?28:40,fontWeight:600,marginBottom:12 }}>Not in <span style={{ color:C.accent }}>{dist.name}</span> yet</h1>
      <p style={{ fontSize:mob?15:17,color:C.muted,lineHeight:1.7,marginBottom:40 }}>Sign up and we'll bring bread to your area.</p>
      {!ok?(
        <div style={{ background:"#FFF",borderRadius:mob?16:24,padding:mob?20:36,textAlign:"left",border:`1px solid ${C.border}` }}>
          <Field label="Email *" placeholder="your@email.com" mob={mob} />
          <Field label="ZIP *" placeholder="20007" mob={mob} />
          <button onClick={() => setOk(true)} style={{ width:"100%",fontSize:15,fontWeight:700,color:"#FFF",background:`linear-gradient(135deg,${C.accent},${C.accentL})`,border:"none",padding:"14px",borderRadius:100,cursor:"pointer" }}>Notify Me</button>
        </div>
      ):(
        <div style={{ background:"#FFF",borderRadius:mob?16:24,padding:mob?32:48,border:`1px solid ${C.border}`,animation:"scaleIn 0.4s ease" }}>
          <div style={{ fontSize:44,marginBottom:12 }}>✅</div>
          <h2 style={{ fontFamily:"'Fraunces',serif",fontSize:mob?20:24,fontWeight:600,marginBottom:8 }}>Thanks!</h2>
          <p style={{ fontSize:14,color:C.muted }}>We'll reach out soon.</p>
        </div>
      )}
    </div>
  );
}


// ==========================================
// MODALS
// ==========================================
function AuthModal({ mob, onClose, onLogin }) {
  const [sent, setSent] = useState(false);
  return (
    <Overlay onClose={onClose}>
      <div style={{ background:"#FFF",borderRadius:mob?20:28,padding:mob?24:40,width:mob?"calc(100% - 32px)":420,animation:"modalIn 0.3s ease",position:"relative",maxHeight:"90vh",overflowY:"auto" }} onClick={e=>e.stopPropagation()}>
        <button onClick={onClose} style={{ position:"absolute",top:14,right:14,background:"none",border:"none",cursor:"pointer",color:C.light }}><Ic.X /></button>
        <div style={{ textAlign:"center",marginBottom:24 }}><div style={{ fontSize:36,marginBottom:10 }}>🍞</div><h2 style={{ fontFamily:"'Fraunces',serif",fontSize:mob?20:24,fontWeight:600 }}>Sign in to We Bake</h2></div>
        {!sent ? (
          <>
            <Field label="Email" placeholder="your@email.com" mob={mob} />
            <button onClick={() => setSent(true)} style={{ width:"100%",fontSize:14,fontWeight:700,color:"#FFF",background:`linear-gradient(135deg,${C.accent},${C.accentL})`,border:"none",padding:"14px",borderRadius:100,cursor:"pointer",marginBottom:14 }}>Send Magic Link</button>
            <div style={{ textAlign:"center",margin:"14px 0",fontSize:13,color:C.light }}>or</div>
            <button style={{ width:"100%",fontSize:14,fontWeight:600,color:C.txt,background:"#FFF",border:`1px solid ${C.border}`,padding:"12px",borderRadius:100,cursor:"pointer",marginBottom:8 }}>🍎 Apple</button>
            <button onClick={onLogin} style={{ width:"100%",fontSize:14,fontWeight:600,color:C.txt,background:"#FFF",border:`1px solid ${C.border}`,padding:"12px",borderRadius:100,cursor:"pointer" }}>🔵 Google</button>
            <div style={{ textAlign:"center",marginTop:16,fontSize:12,color:C.light }}>No password needed.</div>
          </>
        ) : (
          <div style={{ textAlign:"center",padding:"16px 0" }}>
            <div style={{ fontSize:44,marginBottom:12 }}>📧</div>
            <h3 style={{ fontFamily:"'Fraunces',serif",fontSize:18,fontWeight:600,marginBottom:8 }}>Check Email</h3>
            <p style={{ fontSize:14,color:C.muted,marginBottom:20 }}>Click the magic link to sign in.</p>
            <button onClick={onLogin} style={{ fontSize:14,fontWeight:600,color:C.accent,background:"rgba(199,91,43,0.08)",border:"none",padding:"10px 24px",borderRadius:100,cursor:"pointer" }}>Done (demo)</button>
          </div>
        )}
      </div>
    </Overlay>
  );
}

function PauseModal({ mob, onClose, onPause, onCancel }) {
  return (
    <Overlay onClose={onClose}>
      <div style={{ background:"#FFF",borderRadius:mob?20:24,padding:mob?24:36,width:mob?"calc(100% - 32px)":420,animation:"modalIn 0.3s ease" }} onClick={e=>e.stopPropagation()}>
        <h2 style={{ fontFamily:"'Fraunces',serif",fontSize:mob?18:22,fontWeight:600,marginBottom:6 }}>Pause or Cancel?</h2>
        <p style={{ fontSize:14,color:C.muted,marginBottom:24 }}>You can always come back.</p>
        <button onClick={onPause} style={{ width:"100%",padding:"16px 20px",borderRadius:14,marginBottom:10,background:C.cream,border:`1px solid ${C.border}`,cursor:"pointer",textAlign:"left" }}>
          <div style={{ fontSize:15,fontWeight:600,marginBottom:3 }}>⏸️ Pause</div><div style={{ fontSize:13,color:C.muted }}>Resume anytime.</div>
        </button>
        <button onClick={onCancel} style={{ width:"100%",padding:"16px 20px",borderRadius:14,background:"#FFF",border:`1px solid ${C.border}`,cursor:"pointer",textAlign:"left" }}>
          <div style={{ fontSize:15,fontWeight:600,color:C.err,marginBottom:3 }}>✖ Cancel</div><div style={{ fontSize:13,color:C.muted }}>End entirely.</div>
        </button>
        <button onClick={onClose} style={{ width:"100%",fontSize:14,fontWeight:500,color:C.muted,background:"none",border:"none",padding:"14px",cursor:"pointer",marginTop:6 }}>Keep active</button>
      </div>
    </Overlay>
  );
}

function RatingModal({ mob, onClose }) {
  const [r, setR] = useState(0);
  const [ok, setOk] = useState(false);
  return (
    <Overlay onClose={onClose}>
      <div style={{ background:"#FFF",borderRadius:mob?20:24,padding:mob?24:36,width:mob?"calc(100% - 32px)":400,textAlign:"center",animation:"modalIn 0.3s ease" }} onClick={e=>e.stopPropagation()}>
        {!ok?(
          <>
            <h2 style={{ fontFamily:"'Fraunces',serif",fontSize:mob?18:22,fontWeight:600,marginBottom:6 }}>Rate Delivery</h2>
            <p style={{ fontSize:14,color:C.muted,marginBottom:20 }}>How was today's bread?</p>
            <div style={{ display:"flex",justifyContent:"center",gap:6,marginBottom:20 }}>{[1,2,3,4,5].map(s=><button key={s} onClick={() => setR(s)} style={{ background:"none",border:"none",cursor:"pointer",padding:2,transform:s<=r?"scale(1.2)":"",transition:"transform 0.2s" }}><Ic.Star on={s<=r} /></button>)}</div>
            <button onClick={() => setOk(true)} disabled={r===0} style={{ width:"100%",fontSize:14,fontWeight:700,color:"#FFF",background:r===0?"#ccc":`linear-gradient(135deg,${C.accent},${C.accentL})`,border:"none",padding:"13px",borderRadius:100,cursor:r===0?"not-allowed":"pointer" }}>Submit</button>
          </>
        ):(
          <div style={{ padding:"16px 0" }}>
            <div style={{ fontSize:44,marginBottom:10 }}>🙏</div>
            <h3 style={{ fontFamily:"'Fraunces',serif",fontSize:18,fontWeight:600,marginBottom:6 }}>Thank you!</h3>
            <button onClick={onClose} style={{ fontSize:14,fontWeight:600,color:C.accent,background:"rgba(199,91,43,0.08)",border:"none",padding:"10px 24px",borderRadius:100,cursor:"pointer",marginTop:12 }}>Done</button>
          </div>
        )}
      </div>
    </Overlay>
  );
}

function Overlay({ onClose, children }) {
  return <div style={{ position:"fixed",inset:0,zIndex:200,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(45,24,16,0.4)",backdropFilter:"blur(8px)" }} onClick={onClose}>{children}</div>;
}


// ==========================================
// FOOTER
// ==========================================
function FooterSection({ mob, nav }) {
  return (
    <footer style={{ background:C.dark,padding:mob?"40px 16px 24px":"60px 48px 40px",color:"rgba(251,246,239,0.5)" }}>
      <div style={{ maxWidth:1200,margin:"0 auto",display:"grid",gridTemplateColumns:mob?"1fr":"2fr 1fr 1fr 1fr",gap:mob?24:40 }}>
        <div>
          <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:12 }}>
            <div style={{ width:32,height:32,background:`linear-gradient(135deg,${C.accent},${C.accentL})`,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14 }}>🍞</div>
            <span style={{ fontFamily:"'Fraunces',serif",fontSize:18,fontWeight:700,color:C.bg }}>We Bake</span>
          </div>
          <p style={{ fontSize:13,lineHeight:1.7,maxWidth:280 }}>Hot bread at your door, on your schedule.</p>
        </div>
        {!mob && <>
          <div><h4 style={{ color:C.bg,fontSize:14,fontWeight:600,marginBottom:12 }}>Nav</h4>{["Catalog","Schedule"].map(l=><div key={l} style={{ fontSize:14,marginBottom:8,cursor:"pointer" }} onClick={() => nav(l==="Schedule"?"schedule":"catalog")}>{l}</div>)}</div>
          <div><h4 style={{ color:C.bg,fontSize:14,fontWeight:600,marginBottom:12 }}>Support</h4>{["help@webake.com","FAQ","Terms"].map(l=><div key={l} style={{ fontSize:14,marginBottom:8 }}>{l}</div>)}</div>
          <div><h4 style={{ color:C.bg,fontSize:14,fontWeight:600,marginBottom:12 }}>Contact</h4><div style={{ fontSize:14 }}>Georgetown, DC</div></div>
        </>}
      </div>
      <div style={{ maxWidth:1200,margin:`${mob?16:40}px auto 0`,paddingTop:16,borderTop:"1px solid rgba(251,246,239,0.08)",display:"flex",justifyContent:"space-between",fontSize:mob?11:13 }}>
        <span>© 2026 WE BAKE</span><span>Made with 🍞</span>
      </div>
    </footer>
  );
}
