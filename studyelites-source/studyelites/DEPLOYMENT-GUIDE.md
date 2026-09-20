# StudyElites.online — Deployment Guide (Simple, Step-by-Step)

> Bhai, ye guide padh ke tu apna site live kar sakta hai within 1-2 hours.
> Koi coding knowledge nahi chahiye. Bas follow karo.

---

## 🎯 Final Goal

Tu chahta hai ki `studyelites.online` internet pe live ho, log visit kar sakein,
Razorpay se pay karein, aur membership/product buy kar sakein.

Iske liye 4 cheezein chahiye:

1. **Code host** → GitHub (free)
2. **Hosting** → Vercel (free)
3. **Payments** → Razorpay account (test + live keys)
4. **Domain** → studyelites.online (GoDaddy / Namecheap / Hostinger se kharid)
5. **Telegram group** → Private group jisme membership buyers ko invite karega

Bas. Itna hi.

---

## Step 1: GitHub pe code upload karo (10 min)

### 1.1 GitHub account banao
- https://github.com → Sign up (agar already nahi hai)
- Free account perfect hai

### 1.2 Naya repository banao
- Top right `+` icon → **New repository**
- Name: `studyelites-online`
- **Private** rakho (koi randomly dekh na sake)
- **Add a README** tick karo
- **Create repository**

### 1.3 Code upload karo
Tere paas 2 options:

**Option A — Browser se drag-drop (easiest):**
- Apne computer pe project folder kholo
- GitHub pe repository khola → **Add file → Upload files**
- Saari files drag karke daalo
- Commit message: "Initial commit"
- **Commit changes**

**Option B — Git CLI (agar thoda tech-savvy hai):**
```bash
cd /path/to/studyelites
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/TU_USERNAME/studyelites-online.git
git push -u origin main
```

⚠️ **IMPORTANT — `.env` file ko upload mat karo!**
`.env` mein Razorpay secret keys honge, wo public nahi hone chahiye.
Confirm kar: `.gitignore` file mein `.env` likha ho. Agar nahi hai toh
`.gitignore` mein ye line add kar:
```
.env
.env.local
.env.production
```

---

## Step 2: Razorpay account banao (15 min)

### 2.1 Sign up
- https://razorpay.com → **Sign Up**
- Email: ankushjha4806@gmail.com
- Business name: "StudyElites"
- Business type: **Digital Goods / E-commerce**
- Website URL: studyelites.online (jab domain ready ho)
- Category: **Education / Coaching**

### 2.2 KYC complete karo (1-2 din lagte hain)
Razorpay pe live payments ke liye KYC chahiye:
- PAN card (tumhara ya business ka)
- Bank account details (where money will be deposited)
- Business address proof
- Aadhaar verification

⚠️ **Important:** Razorpay test mode mein turant kaam karta hai, but LIVE
payments ke liye KYC approve hona zaroori hai. Isliye **start KYC aaj hi**.

### 2.3 API keys nikaalo
- Razorpay Dashboard → **Settings → API Keys**
- **Generate Test Key** button
- Tuhe ye 2 cheezein milengi:
  - **Key ID** → starts with `rzp_test_...`
  - **Key Secret** → ek long random string

Inhe **notepad mein save kar le** (ye baad mein chahiye honge).

⚠️ **YE SECRET KISI KO MAT DENA.** Ye password jaisa hai. Agar leak ho gaya
toh koi bhi tumhare account se payment kar sakta hai.

### 2.4 Webhook setup (optional for MVP, but good for production)
- Dashboard → **Settings → Webhooks**
- Add webhook URL: `https://studyelites.online/api/razorpay/webhook`
- Events: `payment.captured`, `payment.failed`
- Secret note karo

(MVP ke liye ye optional hai — hum already payment verify kar rahe hain
server-side signature check se. Webhook sirf extra safety ke liye hai.)

---

## Step 3: Telegram group banao (5 min)

### 3.1 Naya private group
- Telegram app kholo → hamburger menu → **New Group**
- Name: "StudyElites Members"
- Add 1-2 admin (tu aur koi trusted insaan)
- **Privacy:** Set to Private (koi bina invite link ke join na kar sake)

### 3.2 Permanent invite link banao
- Group khola → top right group name click → **Edit** (pencil icon)
- **Invite Links → Create a new link**
- **Permanent** link banao (no expiry)
- **No member limit** (ya jo bhi chahe)
- Copy karke save kar le → ye `TELEGRAM_GROUP_LINK` banega

---

## Step 4: Vercel pe deploy karo (15 min)

### 4.1 Vercel account banao
- https://vercel.com → **Sign Up**
- **Continue with GitHub** se sign up kar (taaki direct GitHub repo connect ho)

### 4.2 Project import karo
- Vercel dashboard → **Add New → Project**
- **Import Git Repository**
- Apna `studyelites-online` repo select karo
- Vercel automatically detect kar lega ye Next.js project hai

### 4.3 Environment Variables daalo (CRITICAL STEP)

Import ke baad ek page khulega jisme **Environment Variables** section hoga.
Yahan ye 4 variables add karo:

| Name | Value | Visible to |
|------|-------|------------|
| `RAZORPAY_KEY_ID` | `rzp_test_XXXXXXX` (test key id) | Server only |
| `RAZORPAY_KEY_SECRET` | `XXXXXXX` (test secret) | Server only |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | `rzp_test_XXXXXXX` (same test id) | Both |
| `TELEGRAM_GROUP_LINK` | `https://t.me/+your_invite_link` | Server only |

⚠️ **Ye bahut important hai.** Inke bina payment kaam nahi karega.

### 4.4 Deploy button daba do
- Niche scroll → **Deploy** button click
- 2-3 minute wait — Vercel build karega
- **"Congratulations"** screen aayega → Site LIVE hai! 🎉

### 4.5 Test karo
- Vercel tumhe ek URL dega jaisa: `studyelites-online-xyz.vercel.app`
- Us URL pe ja ke try karo:
  - Page khulta hai? ✓
  - Products page pe Buy Now click — Razorpay test modal khulta hai?
  - Membership Join Now click — modal khulta hai?
- Test card se payment try karo:
  - Card: `4111 1111 1111 1111`
  - Expiry: any future date
  - CVV: any 3 digits
  - Name: anything
  - **Success!** → Telegram link show ho raha hai? ✓

---

## Step 5: Domain kharido aur connect karo (30 min + 24h propagation)

### 5.1 Domain kharido
Go to any of these (cheapest options):
- https://hostinger.in (often ₹99/year offer)
- https://godaddy.com
- https://namecheap.com

Search `studyelites.online` → kharid le (~₹600-800/year for `.online` TLD).

### 5.2 DNS ko Vercel pe point karo
Domain provider ke dashboard mein ja ke **DNS settings** mein ye add karo:

| Type | Name | Value |
|------|------|-------|
| A | `@` | `76.76.21.21` (Vercel IP) |
| CNAME | `www` | `cname.vercel-dns.com` |

Aur Vercel pe:
- Vercel dashboard → apna project kholo → **Settings → Domains**
- `studyelites.online` add karo
- Vercel verify karega (2-24 hours wait)

### 5.3 HTTPS automatic
Vercel automatic free SSL deta hai. Kuch nahi karna. Bas 5-10 min wait karo
aur `https://studyelites.online` chal jayega.

---

## Step 6: Razorpay LIVE pe switch karo (after KYC approved)

Jab Razorpay KYC approve ho jaaye (1-2 din), LIVE keys use kar:

1. Razorpay Dashboard → **Settings → API Keys → Generate Live Key**
2. Live Key ID milega → `rzp_live_XXXXXXX`
3. Live Key Secret → long string

Vercel mein ja ke environment variables update kar:
- `RAZORPAY_KEY_ID` → `rzp_live_XXXXXXX` (live id)
- `RAZORPAY_KEY_SECRET` → live secret
- `NEXT_PUBLIC_RAZORPAY_KEY_ID` → `rzp_live_XXXXXXX` (same)

Vercel pe **Redeploy** button click karo → naya build hoga → LIVE payments
shuru! 💰

---

## Step 7: Final checks (5 min)

Live site pe ye test karo:
- [ ] Home page khulta hai → mobile pe sahi dikh raha?
- [ ] Products page → 4 products, har cover image visible
- [ ] SSC card → "View free demo PDF" link → PDF khulti hai?
- [ ] Membership page → "Join Now — ₹29" button kaam karta hai?
- [ ] About page → back button chal raha?
- [ ] Contact page → form submit → "Message sent" toast aaya?
- [ ] Footer → Privacy/Terms/Refund links → modals khulte hain?
- [ ] Real ₹29 payment karke dekho apne card se → success dialog →
      Telegram "Join" button visible → click karne pe Telegram khulta?
- [ ] Email: ankushjha4806@gmail.com kahin bhi clearly visible?

Agar sab green hai → **Site LIVE ho gaya! 🚀**

---

## Step 8: Post-launch maintenance

### Daily (pehle 1 week)
- Vercel dashboard → **Logs** check karo koi error toh nahi
- Razorpay dashboard → payments aa rahe hain check karo

### Weekly
- Email check karo ankushjha4806@gmail.com → koi support query toh
- Razorpay settlements check karo (money bank mein aa raha?)

### Monthly
- Telegram group members check karo — koi unauthorized toh nahi
- Site pe naya product add karna ho toh `src/lib/products.ts` edit karo +
  `src/lib/razorpay.ts` ka CATALOG update karo + git push → Vercel auto-deploy

---

## 🆘 Common Issues + Fixes

### Issue: "Payment failed" error aata hai
**Fix:**
1. Vercel → Settings → Environment Variables check karo (4 variables set hain?)
2. Razorpay dashboard → API Keys valid hain?
3. Vercel function logs check karo (Vercel → Project → Logs)

### Issue: Site white screen / error
**Fix:**
- Vercel → Project → **Deployment** tab → latest build ki logs check karo
- Kuch red error milega → usko screenshot le ke bhej

### Issue: Domain connect nahi ho raha
**Fix:**
- DNS settings mein A record `76.76.21.21` hai?
- CNAME `www` → `cname.vercel-dns.com` hai?
- 24 hours wait karo (DNS propagation time)

### Issue: Telegram link show nahi ho raha payment success pe
**Fix:**
- `TELEGRAM_GROUP_LINK` env var Vercel pe set kiya tha?
- Vercel pe **Redeploy** kiya tha baad mein?

### Issue: Koi payment kaam nahi kar raha but error bhi nahi aata
**Fix:**
- Razorpay dashboard → **Payments** tab mein check karo transaction
- Vercel logs mein `verify-payment` endpoint ka error check karo

---

## 📊 Cost Breakdown

| Item | Cost |
|------|------|
| Domain (studyelites.online) | ₹600-800 / year |
| Vercel hosting (Hobby plan) | **FREE** |
| Razorpay | No setup fee, **2% per transaction** (so ₹29 payment → ₹0.58 fee, you get ₹28.42) |
| Telegram group | FREE |
| GitHub | FREE |
| **Total fixed cost** | **~₹700 / year** (sirf domain ka) |

---

## 📞 Quick Reference

- **Code**: GitHub (github.com/USERNAME/studyelites-online)
- **Hosting**: Vercel (vercel.com → apna project)
- **Payments**: Razorpay (dashboard.razorpay.com)
- **Domain DNS**: jahaan se kharida (Hostinger/GoDaddy)
- **Telegram**: t.me/joinchat/... link
- **Email**: ankushjha4806@gmail.com

---

## ✅ Quick Pre-Launch Checklist

Before you tell anyone about the site:

- [ ] Razorpay KYC submitted (live payments ke liye)
- [ ] Test payment success se ₹29 pay kiya (apna hi card se)
- [ ] Telegram link success dialog pe show ho raha
- [ ] `.env` GitHub pe push nahi hua
- [ ] Site mobile pe perfect dikh raha
- [ ] Privacy Policy / Terms / Refund modal sahi content hai
- [ ] Email ankushjha4806@gmail.com contact page pe hai
- [ ] Domain `https://studyelites.online` chal raha hai
- [ ] Site WhatsApp / Telegram pe 1-2 friends ko bhej ke test karwa lo

Bas itna kar lo — site ready hai! 🎉
