"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ThemePair } from "@/components/invitation/theme-art";
import { SiteFooter } from "@/components/site";
import { ORDER_HELLO, SITE, whatsappHref } from "@/lib/site";
import { getTemplate } from "@/lib/templates";
import type { TemplateKey } from "@/lib/types";

type Lang = "ar" | "en";

const copy = {
  ar: {
    demos: "نماذج",
    features: "الدعوة فيها إيه",
    packages: "الباكدجات",
    faq: "أسئلة",
    order: "أنشئ دعوتك",
    lang: "English",
    kicker: "دعوات أونلاين للفرح والخطوبة وأعياد الميلاد",
    titleBefore: "دعوتك بقت ",
    accent: "لينك",
    titleAfter: " بيتفتح زي الظرف",
    body: "بتبعتها على الواتساب، والضيف يفتحها يلاقي مزيكا وعداد لليوم واللوكيشن وزرار يأكد بيه حضوره. من غير طباعة، ومن غير ما حد ينزل أبلكيشن.",
    demo: "افتح دعوة ديمو",
    prices: "شوف الأسعار",
    chip: ["تسليم من ٤٨ ساعة", "عربي وإنجليزي", "لينك باسم كل ضيف"],
    try: "جرّب بنفسك",
    every: "كل مناسبة ليها طريقة تتفتح بيها",
    everyBody: "افتح أي واحدة من الموبايل. دي نفس اللي الضيوف بتوعك هيشوفوه.",
    drawn: "دعوات مرسومة · من غير صور",
    drawnBody: "التصميم والحركة هما البطل. مش محتاجين غير الأسامي والتفاصيل.",
    open: "افتح الديمو",
    inside: "جوه كل دعوة",
    insideTitle: "كل اللي الضيف محتاجه في لينك واحد",
    namelinkTitle: "كل ضيف ياخد لينك باسمه",
    namelinkBody: "بنغير آخر اللينك، والضيف يفتح يلاقي اسمه على الظرف. متاحة في باكدج Luxury أو كإضافة.",
    namelinkCta: "جربها باسم أحمد",
    moreEyebrow: "ومش بس دعوة",
    moreTitle: "معاكم من أول ديمو لحد آخر رسالة من ضيوفكم",
    guestPageCta: "شوف صفحة الضيوف التجريبية",
    how: "الخطوات",
    howTitle: "من الفكرة للضيوف في ٤ خطوات",
    packagesEyebrow: "الباكدجات",
    packagesTitle: "اختار اللي يناسب مناسبتك",
    popular: "الأكثر طلبًا",
    currency: "ج.م",
    orderPrefix: "اطلب",
    addons: "إضافات:",
    note: "الأسعار ثابتة، ومفيش مفاجآت: الإضافات بس هي اللي بتزوّد. بنحتاج ٥٠٪ مقدم عشان نبدأ، والباقي لما تستلم. الدفع فودافون كاش أو إنستاباي.",
    occasions: "بنعمل دعوات لـ",
    faqTitle: "أسئلة بتتسأل كتير",
    closeTitle: "يلا نعمل دعوتك",
    closeBody: "ابعتلنا التاريخ ونوع المناسبة، ونرد عليك بفكرة وسعر.",
    closeCta: "املا فورم الطلب",
    closeWa: "كلمنا على الواتساب",
    closeIg: "تابعنا على إنستجرام",
    copyPhone: "انسخ الرقم",
    copied: "اتنسخ ✓",
  },
  en: {
    demos: "Demos",
    features: "What's inside",
    packages: "Packages",
    faq: "FAQ",
    order: "Create yours",
    lang: "عربي",
    kicker: "Online invitations for weddings, engagements and birthdays",
    titleBefore: "Your invitation, as a ",
    accent: "link",
    titleAfter: " that opens like an envelope",
    body: "Send it on WhatsApp. Your guests open it to music, a countdown, the location and a button to confirm they're coming. No printing, no app to install.",
    demo: "Open a demo invitation",
    prices: "See prices",
    chip: ["Ready in 48 hours", "Arabic & English", "A link with each guest's name"],
    try: "Try them",
    every: "Every occasion opens its own way",
    everyBody: "Open any of them on your phone. This is exactly what your guests will see.",
    drawn: "Illustrated · no photos needed",
    drawnBody: "The design and the motion are the star. All we need is your names and details.",
    open: "Open demo",
    inside: "Inside every invitation",
    insideTitle: "Everything a guest needs, in one link",
    namelinkTitle: "Every guest gets a link with their name",
    namelinkBody: "We change the end of the link, and the guest's name appears on the envelope. Included in Luxury, or as an add-on.",
    namelinkCta: "Try it as Ahmed",
    moreEyebrow: "And not just an invitation",
    moreTitle: "With you from the first demo to your guests' last message",
    guestPageCta: "See a sample guest page",
    how: "How it works",
    howTitle: "From create to your guests, in four steps",
    packagesEyebrow: "Packages",
    packagesTitle: "Choose what fits your occasion",
    popular: "Most popular",
    currency: "EGP",
    orderPrefix: "Order",
    addons: "Add-ons:",
    note: "Fixed prices, no surprises: only add-ons change the total. We start with a 50% deposit and you pay the rest on delivery, by Vodafone Cash or InstaPay.",
    occasions: "We make invitations for",
    faqTitle: "Questions we get a lot",
    closeTitle: "Let's make your invitation",
    closeBody: "Send us the date and the occasion, and we'll reply with an idea and a price.",
    closeCta: "Fill in the order form",
    closeWa: "Message us on WhatsApp",
    closeIg: "Follow on Instagram",
    copyPhone: "Copy",
    copied: "Copied ✓",
  },
} as const;

const features = [
  {
    ar: { title: "فتحة مختلفة", body: "ظرف، هدية، كارت بيتمسح، أو فكرة جديدة نعملها مخصوص ليك." },
    en: { title: "An opening moment", body: "An envelope, a gift, a scratch card, or something we invent for you." },
    icon: "open",
  },
  {
    ar: { title: "عداد تنازلي", body: "أيام وساعات ودقايق لحد اليوم الكبير." },
    en: { title: "Countdown", body: "Days, hours and minutes to the big day." },
    icon: "clock",
  },
  {
    ar: { title: "اللوكيشن", body: "زرار واحد يفتح جوجل ماب على القاعة." },
    en: { title: "Location", body: "One tap opens Google Maps at the venue." },
    icon: "pin",
  },
  {
    ar: { title: "تأكيد الحضور", body: "الضيف يأكد ويكتب عدد الأفراد، وإنت تشوف الكل في شيت واحد." },
    en: { title: "RSVP", body: "Guests confirm with a head count, and you see every reply in one sheet." },
    icon: "check",
  },
  {
    ar: { title: "مزيكا", body: "تشتغل أول ما الدعوة تتفتح." },
    en: { title: "Music", body: "Starts the moment the invitation opens." },
    icon: "music",
  },
  {
    ar: { title: "ضيفها للتقويم", body: "عشان محدش ينسى المعاد." },
    en: { title: "Add to calendar", body: "So nobody forgets the date." },
    icon: "cal",
  },
  {
    ar: { title: "عربي وإنجليزي", body: "الضيف يقلب اللغة بزرار." },
    en: { title: "Arabic & English", body: "Guests switch language with one button." },
    icon: "lang",
  },
  {
    ar: { title: "بريفيو على الواتساب", body: "اللينك بيظهر بصورة وعنوان شيك قبل ما حد يفتحه." },
    en: { title: "WhatsApp preview", body: "The link arrives with a proper image and title before anyone opens it." },
    icon: "wa",
  },
] as const;

const moreItems = [
  {
    ar: { title: "ديمو بأساميكم", body: "قبل ما تدفعوا، بنبعتلكم لينك فيه التصميم اللي عجبكم بأساميكم انتو." },
    en: { title: "A demo with your names", body: "Before you pay, we send you the design you liked, with your names on it." },
    icon: "demo",
  },
  {
    ar: { title: "صفحة ضيوفكم", body: "لينك خاص بيكم: مين جاي ومعاه كام فرد ومين اعتذر، بتتحدث لوحدها وتنزّلوها Excel." },
    en: { title: "Your guest page", body: "A private link: who's coming, how many, who can't make it. Updates itself, downloads to Excel." },
    icon: "guests",
  },
  {
    ar: { title: "رسايلهم ستوري", body: "كل رسالة تهنئة من ضيوفكم تتحول لصورة ستوري شيك تشيروها بضغطة." },
    en: { title: "Their messages as stories", body: "Every congratulation from your guests becomes a story image you can share in one tap." },
    icon: "msg",
  },
] as const;

const steps = [
  {
    ar: { title: "اختار القالب", body: "من النماذج اللي فوق، أو ابدأ من صفحة الإنشاء." },
    en: { title: "Pick a theme", body: "From the demos above, or start on the create page." },
  },
  {
    ar: { title: "املا التفاصيل", body: "الأسماء، التاريخ، المكان، والصور لو حابب." },
    en: { title: "Fill in the details", body: "Names, date, venue, and photos if you like." },
  },
  {
    ar: { title: "راجع الدعوة", body: "شوف البريفيو، وعدّل اللي محتاجه قبل ما تبعت." },
    en: { title: "Review the preview", body: "Check the preview and make the edits you need before you send." },
  },
  {
    ar: { title: "ابعت اللينك", body: "على الواتساب والإنستجرام، وتابع الحضور من لوحة الإدارة." },
    en: { title: "Share the link", body: "On WhatsApp and Instagram, then watch RSVPs on your manage page." },
  },
] as const;

const plans = [
  {
    name: "Classic",
    price: "600",
    star: false,
    ar: {
      for: "تختار تصميم من النماذج ونملاه ببياناتك.",
      items: [
        "تصميم جاهز بألوان من اختيارك",
        "عداد ولوكيشن وتقويم",
        "مزيكا وتأكيد حضور، وصفحة ضيوف ليكم لحد أسبوعين بعد الفرح",
        "عربي وإنجليزي",
        "تسليم في ٤٨ ساعة، وجولة تعديل واحدة",
      ],
    },
    en: {
      for: "Choose one of our designs and we fill in your details.",
      items: [
        "A ready design in your colors",
        "Countdown, location, calendar",
        "Music and RSVP, plus your guest page until two weeks after the day",
        "Arabic & English",
        "48-hour delivery, one round of edits",
      ],
    },
  },
  {
    name: "Signature",
    price: "1,500",
    star: true,
    ar: {
      for: "تصميم على ذوقك وستايل مناسبتك.",
      items: [
        "كل حاجة في Classic",
        "تصميم مخصوص وصورك وحكايتكم",
        "أغنيتكم انتو، وصفحة الضيوف ٣ شهور",
        "٣ جولات تعديل",
      ],
    },
    en: {
      for: "Designed around your taste and the style of your day.",
      items: [
        "Everything in Classic",
        "Custom design with your photos and story",
        "Your own song, and the guest page for 3 months",
        "Three rounds of edits",
      ],
    },
  },
  {
    name: "Luxury",
    price: "2,500",
    star: false,
    ar: {
      for: "تجربة كاملة من الصفر، بدومين باسمك.",
      items: [
        "كل حاجة في Signature",
        "فكرة فتح مخصوصة ليك",
        "دومين خاص زي laila-omar.com",
        "لينك باسم كل ضيف وداشبورد للحضور",
      ],
    },
    en: {
      for: "A complete experience from scratch, on your own domain.",
      items: [
        "Everything in Signature",
        "An opening idea made just for you",
        "Your own domain, like laila-omar.com",
        "Named link per guest and an RSVP dashboard",
      ],
    },
  },
] as const;

const addons = {
  ar: [
    { label: "دومين خاص", href: "/order?package=Luxury" },
    { label: "لينك باسم كل ضيف ↗", href: "/links" },
    { label: "صفحة صور بعد الفرح ↗", href: "/photos" },
    { label: "كروت QR للطباعة ↗", href: "/card" },
  ],
  en: [
    { label: "Custom domain", href: "/order?package=Luxury" },
    { label: "Named guest links ↗", href: "/links" },
    { label: "Post-event photo page ↗", href: "/photos" },
    { label: "Printed QR cards ↗", href: "/card" },
  ],
} as const;

const occasions = {
  ar: ["فرح", "خطوبة", "كتب كتاب", "عيد ميلاد", "أنيفرسري", "سبوع", "تخرج", "بروبوزال مفاجأة"],
  en: ["Weddings", "Engagements", "Katb el-ketab", "Birthdays", "Anniversaries", "Sebou'", "Graduations", "Surprise proposals"],
} as const;

const faqs = [
  {
    ar: {
      q: "الضيوف محتاجين ينزلوا أبلكيشن؟",
      a: "لأ. الدعوة لينك بيتفتح على أي موبايل من الواتساب أو الإنستجرام مباشرة.",
    },
    en: {
      q: "Do guests need to install an app?",
      a: "No. The invitation is a link that opens on any phone, straight from WhatsApp or Instagram.",
    },
  },
  {
    ar: {
      q: "بتاخد وقت قد إيه؟",
      a: "Classic بتتسلم في ٤٨ ساعة. Signature من ٣ لـ٥ أيام، وLuxury حسب الفكرة، وغالبًا أسبوع.",
    },
    en: {
      q: "How long does it take?",
      a: "Classic is ready in 48 hours, Signature in 3 to 5 days, and Luxury depends on the idea, usually about a week.",
    },
  },
  {
    ar: {
      q: "هعرف مين أكد حضوره إزاي؟",
      a: "في كل الباكدجات بتاخد لينك إدارة خاص، فيه كل اللي ردّوا بالاسم وعدد الأفراد ورسايلهم، بيتحدث لوحده مع كل رد.",
    },
    en: {
      q: "How will I see who's coming?",
      a: "Every package comes with a private manage link listing every reply with names, head counts and messages. It updates itself with each reply.",
    },
  },
  {
    ar: {
      q: "ينفع أعدل بعد ما أبعت اللينك؟",
      a: "أيوه. اللينك نفسه بيفضل زي ما هو، وإحنا بنحدث اللي جواه، والضيوف بيشوفوا التعديل على طول.",
    },
    en: {
      q: "Can I make changes after sending the link?",
      a: "Yes. The link stays the same while we update what's inside, so guests see the change right away.",
    },
  },
  {
    ar: {
      q: "بيانات الضيوف بتروح فين؟",
      a: "بتفضل عندك إنت بس في صفحة الإدارة بتاعتك، ومش بنشاركها مع حد.",
    },
    en: {
      q: "What happens to my guests' details?",
      a: "They stay on your own manage page, and we don't share them with anyone.",
    },
  },
] as const;

const gallery: {
  slug: string;
  key: TemplateKey;
  tag: string;
  tagEn: string;
  names: string;
  namesEn: string;
  body: string;
  bodyEn: string;
}[] = [
  {
    slug: "theme-rose",
    key: "rose-gate",
    tag: "فرح · باب ورد",
    tagEn: "Wedding · a rose gate",
    names: "يحيى و ليلى",
    namesEn: "Yahya & Laila",
    body: "ورق بلون الورد وبوابة زهر. الحكاية تنزل من الباب للبرنامج والقاعة والدعاء.",
    bodyEn: "Blush paper and a rose gate. The story runs from the door to the plan, the hall, and a prayer.",
  },
  {
    slug: "theme-wax",
    key: "wax-roses",
    tag: "فرح · ختم وردي مموج",
    tagEn: "Wedding · pink wax seal",
    names: "سلمى و حازم",
    namesEn: "Salma & Hazem",
    body: "كارت هادي بختم شمع عليه وردة. الضيف يدوس، الختم يتفك والدعوة تتفتح.",
    bodyEn: "A quiet card with a wax seal and a rose. The guest taps, the seal breaks, and the invitation opens.",
  },
  {
    slug: "classic",
    key: "classic-wax",
    tag: "فرح · كلاسيك الشمع",
    tagEn: "Wedding · classic wax",
    names: "عمر و إيمان",
    namesEn: "Omar & Eman",
    body: "فيديو ختم شمع، ثم دعوة كلاسيك بآية وتفاصيل الحفل والعد التنازلي.",
    bodyEn: "A wax-stamp video, then a classic invitation with a verse, details, and countdown.",
  },
  {
    slug: "navy",
    key: "navy-castle",
    tag: "فرح · قلعة كحلية",
    tagEn: "Wedding · navy castle",
    names: "يوسف و جميلة",
    namesEn: "Youssef & Gamila",
    body: "غلاف قلعة كحلية. الضيف يفتح البوابة على يوم الفرح.",
    bodyEn: "A navy castle cover. The guest opens the gate onto the wedding day.",
  },
  {
    slug: "bab",
    key: "bab-doors",
    tag: "فرح · باب الوردين",
    tagEn: "Wedding · twin doors",
    names: "مالك و نور",
    namesEn: "Malek & Nour",
    body: "بابان يُفتحان على حكاية الورد والبيت والدعاء.",
    bodyEn: "Twin doors that open onto roses, a house, and a prayer.",
  },
  {
    slug: "sage",
    key: "sage-scroll",
    tag: "فرح · لفافة الميرمية",
    tagEn: "Wedding · sage scroll",
    names: "حسام و مايا",
    namesEn: "Hossam & Maya",
    body: "من حديقة نقطني: ميرمية وورق فاتح، غلاف يبهت على الحكاية والنقطة.",
    bodyEn: "From our garden line: sage paper, a soft fade-in, and the full story with a gift.",
  },
  {
    slug: "blush",
    key: "blush-veil",
    tag: "فرح · غطاء الورد",
    tagEn: "Wedding · blush veil",
    names: "نادر و لينا",
    namesEn: "Nader & Lina",
    body: "من ختم الورد: ختم دافئ يتفتح على دعوة كاملة برد ونقطة.",
    bodyEn: "From our wax line: a warm seal that opens into RSVP and a gift.",
  },
  {
    slug: "ivory",
    key: "ivory-verse",
    tag: "فرح · عاج الآية",
    tagEn: "Wedding · ivory verse",
    names: "زياد و هدى",
    namesEn: "Ziad & Hoda",
    body: "من كلاسيك نقطني: إطار عاجي وذهب خافت، من غير فيديو.",
    bodyEn: "From our classic line: an ivory frame and quiet gold, no video.",
  },
  {
    slug: "ember",
    key: "ember-hall",
    tag: "فرح · قاعة الجمر",
    tagEn: "Wedding · ember hall",
    names: "كريم و سارة",
    namesEn: "Karim & Sara",
    body: "من الذهب الملكي: زمرد داكن وإطار ذهب لليلة فخمة.",
    bodyEn: "From our royal gold line: emerald night and a gold frame.",
  },
  {
    slug: "mist",
    key: "mist-lilac",
    tag: "فرح · ضباب اللافندر",
    tagEn: "Wedding · lilac mist",
    names: "ياسين و جنى",
    namesEn: "Yassin & Jana",
    body: "من شباك اللافندر: بنفسجي هادي وغلاف يبهت على التفاصيل.",
    bodyEn: "From our lavender line: soft violet and a fade into the details.",
  },
  {
    slug: "sand",
    key: "sand-line",
    tag: "فرح · خط الرمل",
    tagEn: "Wedding · sand line",
    names: "إياد و تالا",
    namesEn: "Eyad & Tala",
    body: "من الهدوء الحديث: رمل فاتح وخط رفيع ووضوح كامل.",
    bodyEn: "From our minimal line: pale sand, a thin rule, and clear details.",
  },
  {
    slug: "theme-bism",
    key: "bismillah-seal",
    tag: "فرح · ختم «بسم الله»",
    tagEn: "Wedding · Bismillah seal",
    names: "يوسف و ليلى",
    namesEn: "Youssef & Laila",
    body: "ظرف عاجي وختم مكتوب عليه بسم الله. الدهب يظهر مع الفتح.",
    bodyEn: "An ivory envelope and a seal that reads Bismillah. Gold shows as it opens.",
  },
  {
    slug: "theme-bow",
    key: "bow-letter",
    tag: "فرح · جواب بفيونكة ووردة",
    tagEn: "Wedding · letter with a bow",
    names: "عمر و فريدة",
    namesEn: "Omar & Farida",
    body: "ورقة وردية وفيونكة. الدعوة تُقرأ كجواب فيه الأسامي والتاريخ.",
    bodyEn: "A pink letter with a bow. The invitation reads as a note with the names and the date.",
  },
  {
    slug: "theme-water",
    key: "watercolor-seal",
    tag: "فرح · ألوان مائية وختم",
    tagEn: "Wedding · watercolor and a seal",
    names: "آدم و نور",
    namesEn: "Adam & Nour",
    body: "ظرف كريمي وختم برقوقي. الرسمة تظهر بعد ما الظرف يتفتح.",
    bodyEn: "A cream envelope and a plum seal. The drawing appears after the envelope opens.",
  },
  {
    slug: "theme-gate",
    key: "garden-gate",
    tag: "فرح · قوس ورد وبوابة جنينة",
    tagEn: "Wedding · rose arch and a gate",
    names: "يحيى و ملك",
    namesEn: "Yahya & Malak",
    body: "قوس ورد وباب صغير. الجنينة تظهر لما الضيف يفتح البوابة.",
    bodyEn: "A rose arch and a small door. The garden appears when the guest opens the gate.",
  },
  {
    slug: "theme-lav",
    key: "lavender-window",
    tag: "فرح · شباك على حقل لافندر",
    tagEn: "Wedding · a window on lavender",
    names: "كريم و رنا",
    namesEn: "Karim & Rana",
    body: "شباك قوسي على حقل بنفسجي وقت الغروب. الشباك يكبر مع الفتح.",
    bodyEn: "An arched window onto a violet field at dusk. The window grows as it opens.",
  },
  {
    slug: "theme-mash",
    key: "mashrabiya-door",
    tag: "كتب كتاب · باب مشربية",
    tagEn: "Katb ketab · mashrabiya door",
    names: "سيف و ريم",
    namesEn: "Seif & Reem",
    body: "باب خشب مشغول. يتفتح على نور الفانوس والدعوة.",
    bodyEn: "A carved wooden door. It opens onto lantern light and the invitation.",
  },
  {
    slug: "theme-moon",
    key: "moon-door",
    tag: "فرح · باب وردي تحت القمر",
    tagEn: "Wedding · a pink door under the moon",
    names: "مراد و لين",
    namesEn: "Morad & Leen",
    body: "باب وردي منور بالفوانيس. يتفتح على تراس تحت القمر.",
    bodyEn: "A pink door lit by lanterns. It opens onto a terrace under the moon.",
  },
  {
    slug: "theme-box",
    key: "ring-box",
    tag: "خطوبة · علبة دبل بتتفتح",
    tagEn: "Engagement · a ring box that opens",
    names: "سلمى و عمر",
    namesEn: "Salma & Omar",
    body: "الضيف يفتح العلبة يلاقي الدبلتين. وفيها برنامج السهرة وتأكيد الحضور.",
    bodyEn: "The guest opens the box and finds the rings, then the evening plan and a reply.",
  },
  {
    slug: "theme-gift",
    key: "gift-burst",
    tag: "عيد ميلاد · هدية بتفرقع",
    tagEn: "Birthday · a gift that bursts",
    names: "نور",
    namesEn: "Nour",
    body: "الضيف يفتح الهدية والقصاصات تنزل. ويقدر يقترح أغنية مع الرد.",
    bodyEn: "The guest opens the gift and confetti falls, then can suggest a song with the reply.",
  },
];

export function LandingHome() {
  const [lang, setLang] = useState<Lang>("ar");
  const t = copy[lang];

  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  return (
    <>
      <div className="landing" data-lang={lang} dir={lang === "ar" ? "rtl" : "ltr"}>
        <header className="site wrap">
          <div className="bar">
            <Link className="logo" href="/" aria-label="Noqatni">
              <SealMark />
              <span className="a">نقطني</span>
              <span className="e">Noqatni</span>
            </Link>
            <nav className="nav" aria-label="Primary">
              <a href="#demos">{t.demos}</a>
              <a href="#features">{t.features}</a>
              <a href="#packages">{t.packages}</a>
              <a href="#faq">{t.faq}</a>
            </nav>
            <div className="tools">
              <button
                type="button"
                className="pill"
                aria-label="Change language"
                onClick={() => setLang((value) => (value === "ar" ? "en" : "ar"))}
              >
                {t.lang}
              </button>
              <Link className="pill wa" href="/order">
                <ChatIcon />
                <span className="lbl">{t.order}</span>
              </Link>
            </div>
          </div>
        </header>

        <main id="top">
          <section className="wrap hero">
            <div>
              <p className="eyebrow">{t.kicker}</p>
              <h1 className="disp">
                {t.titleBefore}
                <em>{t.accent}</em>
                {t.titleAfter}
              </h1>
              <p className="lead">{t.body}</p>
              <div className="cta">
                <Link className="btn primary" href="/invite/layla-omar">
                  {t.demo}
                </Link>
                <a className="btn" href="#packages">
                  {t.prices}
                </a>
              </div>
              <div className="proof">
                {t.chip.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>

            <div className="phone" aria-label="A WhatsApp chat showing an invitation link">
              <div className="screen">
                <div className="chat-top">
                  <span className="avatar">L</span>
                  <span>
                    Laila
                    <small>online</small>
                  </span>
                </div>
                <div className="chat">
                  <div className="msg me">
                    ها يا ليلى، الدعوة جهزت؟ 👀<span className="t">13:58</span>
                  </div>
                  <div className="msg">
                    جهزت، ثانية وأبعتها للجروب<span className="t">14:01</span>
                  </div>
                  <div className="msg">
                    يا جماعة ده الانفايت بتاعنا 💌<span className="t">14:02</span>
                  </div>
                  <div className="msg">
                    <Link className="preview" href="/invite/layla-omar">
                      <span className="thumb">
                        <span className="card">L &amp; O</span>
                        <span className="flap" />
                        <span className="seal" />
                      </span>
                      <b>Laila &amp; Omar — We&apos;re getting married</b>
                      <i>Thursday, 18 February 2027 · Tap to open</i>
                    </Link>
                    noqatni.app/invite/layla-omar
                    <span className="t">14:02</span>
                  </div>
                  <div className="msg me">
                    فتحته! الظرف ده تحفة 😍<span className="t">14:05</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="band soft" id="demos">
            <div className="wrap">
              <div className="head">
                <p className="eyebrow">{t.try}</p>
                <h2 className="disp">{t.every}</h2>
                <p className="lead">{t.everyBody}</p>
              </div>
              <div className="mb-5">
                <h3 className="m-0 text-[22px] font-bold">{t.drawn}</h3>
                <p className="mt-1 text-[15px] text-[var(--muted)]">{t.drawnBody}</p>
              </div>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {gallery.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/invite/${item.slug}`}
                    className="flex flex-col overflow-hidden rounded-[var(--r)] border border-[var(--line)] bg-[var(--surface)] text-inherit no-underline transition hover:-translate-y-1 hover:shadow-[0_26px_44px_-28px_rgba(80,65,40,0.4)]"
                  >
                    <ThemeCard
                      templateKey={item.key}
                      tag={lang === "ar" ? item.tag : item.tagEn}
                      names={lang === "ar" ? item.names : item.namesEn}
                      body={lang === "ar" ? item.body : item.bodyEn}
                      cta={t.open}
                      rtl={lang === "ar"}
                    />
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section className="band" id="features">
            <div className="wrap">
              <div className="head">
                <p className="eyebrow">{t.inside}</p>
                <h2 className="disp">{t.insideTitle}</h2>
              </div>
              <div className="feats">
                {features.map((item) => {
                  const text = item[lang];
                  return (
                    <div className="feat" key={text.title}>
                      <FeatIcon name={item.icon} />
                      <h3>{text.title}</h3>
                      <p>{text.body}</p>
                    </div>
                  );
                })}
              </div>

              <div className="namelink">
                <div>
                  <h3 className="disp" style={{ fontSize: "clamp(26px, 3.6vw, 34px)" }}>
                    {t.namelinkTitle}
                  </h3>
                  <p className="lead" style={{ fontSize: 15 }}>
                    {t.namelinkBody}
                  </p>
                  <code>
                    noqatni.app/invite/layla-omar?to=<mark>Ahmed</mark>
                  </code>
                </div>
                <Link className="btn primary" href="/invite/layla-omar?to=Ahmed">
                  {t.namelinkCta}
                </Link>
              </div>

              <div className="more">
                <div className="head" style={{ marginBottom: 26 }}>
                  <p className="eyebrow">{t.moreEyebrow}</p>
                  <h2 className="disp">{t.moreTitle}</h2>
                </div>
                <div className="more-grid">
                  {moreItems.map((item) => {
                    const text = item[lang];
                    return (
                      <div className="feat" key={text.title}>
                        <FeatIcon name={item.icon} />
                        <h3>{text.title}</h3>
                        <p>{text.body}</p>
                      </div>
                    );
                  })}
                </div>
                <Link className="btn" href="/manage/demo-layla" style={{ marginTop: 26 }}>
                  {t.guestPageCta}
                  <ArrowIcon rtl={lang === "ar"} />
                </Link>
              </div>
            </div>
          </section>

          <section className="band soft" id="how">
            <div className="wrap">
              <div className="head">
                <p className="eyebrow">{t.how}</p>
                <h2 className="disp">{t.howTitle}</h2>
              </div>
              <ol className="steps">
                {steps.map((item) => {
                  const text = item[lang];
                  return (
                    <li key={text.title}>
                      <h3>{text.title}</h3>
                      <p>{text.body}</p>
                    </li>
                  );
                })}
              </ol>
            </div>
          </section>

          <section className="band" id="packages">
            <div className="wrap">
              <div className="head">
                <p className="eyebrow">{t.packagesEyebrow}</p>
                <h2 className="disp">{t.packagesTitle}</h2>
              </div>
              <div className="plans">
                {plans.map((plan) => {
                  const text = plan[lang];
                  return (
                    <div className={`plan${plan.star ? " star" : ""}`} key={plan.name}>
                      {plan.star ? <span className="badge">{t.popular}</span> : null}
                      <h3>{plan.name}</h3>
                      <p className="for">{text.for}</p>
                      <div className="price">
                        <b>{plan.price}</b>
                        <small>{t.currency}</small>
                      </div>
                      <ul>
                        {text.items.map((item) => (
                          <li key={item}>
                            <CheckIcon />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      <Link
                        className={`btn${plan.star ? " primary" : ""}`}
                        href={`/order?package=${plan.name}`}
                      >
                        {t.orderPrefix} {plan.name}
                      </Link>
                    </div>
                  );
                })}
              </div>
              <div className="addons">
                <b>{t.addons}</b>
                {addons[lang].map((item) => (
                  <Link className="chip link" href={item.href} key={item.href}>
                    {item.label}
                  </Link>
                ))}
              </div>
              <p className="note">{t.note}</p>
            </div>
          </section>

          <section className="band soft">
            <div className="wrap">
              <div className="head">
                <p className="eyebrow">{t.occasions}</p>
              </div>
              <div className="occ">
                {occasions[lang].map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          </section>

          <section className="band" id="faq">
            <div className="wrap">
              <div className="head">
                <h2 className="disp">{t.faqTitle}</h2>
              </div>
              <div className="faq">
                {faqs.map((item) => {
                  const text = item[lang];
                  return (
                    <details key={text.q}>
                      <summary>{text.q}</summary>
                      <p>{text.a}</p>
                    </details>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="band soft close">
            <div className="wrap">
              <h2 className="disp">{t.closeTitle}</h2>
              <p className="lead">{t.closeBody}</p>
              <ClosePhone copyLabel={t.copyPhone} copiedLabel={t.copied} />
              <div className="cta">
                <Link className="btn primary" href="/order">
                  {t.closeCta}
                </Link>
                <a
                  className="btn"
                  href={whatsappHref(lang === "ar" ? ORDER_HELLO.ar : ORDER_HELLO.en)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t.closeWa}
                </a>
                <a className="btn" href={SITE.instagram} target="_blank" rel="noopener noreferrer">
                  {t.closeIg}
                </a>
              </div>
            </div>
          </section>
        </main>
      </div>
      <SiteFooter />
    </>
  );
}

function ThemeCard({
  templateKey,
  tag,
  names,
  body,
  cta,
  rtl,
}: {
  templateKey: TemplateKey;
  tag: string;
  names: string;
  body: string;
  cta: string;
  rtl: boolean;
}) {
  const template = getTemplate(templateKey);
  return (
    <>
      <div className="aspect-[1.35/1] overflow-hidden">
        <ThemePair kind={template.opening} names={names} date="٢١ مايو ٢٠٢٧" />
      </div>
      <div className="flex flex-1 flex-col gap-1.5 px-5 pb-5 pt-5">
        <p className="text-xs text-[var(--accent)]">{tag}</p>
        <h3 className="font-[family-name:var(--f-ar-display)] text-2xl font-semibold leading-snug">{names}</h3>
        <p className="text-sm leading-6 text-[var(--muted)]">{body}</p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-3 text-sm font-semibold">
          {cta}
          <svg viewBox="0 0 24 24" className={`h-4 w-4 ${rtl ? "-scale-x-100" : ""}`} aria-hidden>
            <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
        </span>
      </div>
    </>
  );
}

function ClosePhone({ copyLabel, copiedLabel }: { copyLabel: string; copiedLabel: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(SITE.phoneDisplay);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="number">
      <b id="num">{SITE.phoneDisplay}</b>
      <button type="button" onClick={copy}>
        {copied ? copiedLabel : copyLabel}
      </button>
    </div>
  );
}

function SealMark() {
  return (
    <svg className="mark" viewBox="0 0 64 44" aria-hidden>
      <path
        d="M3 4 L32 30 L61 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="32" cy="30" r="11" fill="url(#noqatni-seal)" />
      <defs>
        <radialGradient id="noqatni-seal" cx="0.38" cy="0.32" r="0.75">
          <stop offset="0" stopColor="#d0566a" />
          <stop offset="0.5" stopColor="#a3253a" />
          <stop offset="1" stopColor="#5e1220" />
        </radialGradient>
      </defs>
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.6.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2s.2-1.1.2-1.2-.2-.2-.4-.3z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

function ArrowIcon({ rtl }: { rtl: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      style={{ width: 18, height: 18, transform: rtl ? undefined : undefined }}
      aria-hidden
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function FeatIcon({ name }: { name: string }) {
  const props = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    "aria-hidden": true as const,
  };

  switch (name) {
    case "open":
      return (
        <svg {...props}>
          <rect x="3" y="6" width="18" height="13" rx="2" />
          <path d="M3 7l9 7 9-7" />
        </svg>
      );
    case "clock":
      return (
        <svg {...props}>
          <circle cx="12" cy="13" r="8" />
          <path d="M12 9v4l2.5 2.5M9 2h6" />
        </svg>
      );
    case "pin":
      return (
        <svg {...props}>
          <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" />
          <circle cx="12" cy="9.5" r="2.5" />
        </svg>
      );
    case "check":
      return (
        <svg {...props}>
          <path d="M20 6L9 17l-5-5" />
        </svg>
      );
    case "music":
      return (
        <svg {...props}>
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
      );
    case "cal":
      return (
        <svg {...props}>
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M3 10h18M8 3v4M16 3v4" />
        </svg>
      );
    case "lang":
      return (
        <svg {...props}>
          <path d="M4 5h7M7.5 3v2M5 5c0 4 3 7 6 8M10 5c0 3-2 6-6 8M13 21l4-10 4 10M14.5 17h5" />
        </svg>
      );
    case "wa":
      return (
        <svg {...props}>
          <path d="M4 12a8 8 0 0 1 16 0" />
          <path d="M12 4v2M4 12H2M22 12h-2" />
          <rect x="5" y="14" width="14" height="6" rx="2" />
        </svg>
      );
    case "demo":
      return (
        <svg {...props}>
          <path d="M15 3h6v6M10 14L21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        </svg>
      );
    case "guests":
      return (
        <svg {...props}>
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" />
        </svg>
      );
    case "msg":
      return (
        <svg {...props}>
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          <path d="M8.5 10.5h.01M12 10.5h.01M15.5 10.5h.01" />
        </svg>
      );
    default:
      return null;
  }
}
