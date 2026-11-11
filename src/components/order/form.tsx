"use client";

import Link from "next/link";
import { useOrderForm } from "@/components/order/hooks/useOrderForm";

const occasions = ["فرح", "خطوبة", "كتب كتاب", "عيد ميلاد", "أنيفرسري", "حاجة تانية"] as const;

const styles = [
  { value: "باب الورد", title: "باب الورد", body: "ورق بلون الورد وبوابة زهر", href: "/invite/theme-rose" },
  { value: "ختم الورد", title: "ختم الورد", body: "كارت هادي بختم شمع عليه وردة", href: "/invite/theme-wax" },
  { value: "كلاسيك الشمع", title: "كلاسيك الشمع", body: "فيديو ختم ثم دعوة كلاسيك", href: "/invite/classic" },
  { value: "قلعة كحلية", title: "قلعة كحلية", body: "بوابة قلعة كحلية وكريم", href: "/invite/navy" },
  { value: "باب الوردين", title: "باب الوردين", body: "بابان يُفتحان على الحكاية", href: "/invite/bab" },
  { value: "لفافة الميرمية", title: "لفافة الميرمية", body: "ميرمية وورق فاتح من نقطني", href: "/invite/sage" },
  { value: "غطاء الورد", title: "غطاء الورد", body: "ختم دافئ من خط الورد", href: "/invite/blush" },
  { value: "عاج الآية", title: "عاج الآية", body: "إطار عاجي من الكلاسيك", href: "/invite/ivory" },
  { value: "قاعة الجمر", title: "قاعة الجمر", body: "زمرد وذهب من الملكي", href: "/invite/ember" },
  { value: "ضباب اللافندر", title: "ضباب اللافندر", body: "بنفسجي هادي من اللافندر", href: "/invite/mist" },
  { value: "خط الرمل", title: "خط الرمل", body: "هدوء حديث ووضوح", href: "/invite/sand" },
  { value: "ختم بسم الله", title: "ختم بسم الله", body: "ظرف عاجي وختم مكتوب عليه بسم الله", href: "/invite/theme-bism" },
  { value: "جواب الفيونكة", title: "جواب الفيونكة", body: "ورقة وردية وفيونكة", href: "/invite/theme-bow" },
  { value: "ألوان مائية", title: "ألوان مائية", body: "ظرف كريمي وختم برقوقي", href: "/invite/theme-water" },
  { value: "بوابة الجنينة", title: "بوابة الجنينة", body: "قوس ورد وباب صغير", href: "/invite/theme-gate" },
  { value: "شباك اللافندر", title: "شباك اللافندر", body: "شباك قوسي على حقل بنفسجي", href: "/invite/theme-lav" },
  { value: "باب المشربية", title: "باب المشربية", body: "لكتب الكتاب", href: "/invite/theme-mash" },
  { value: "باب القمر", title: "باب القمر", body: "باب وردي تحت القمر", href: "/invite/theme-moon" },
  { value: "علبة الدبل", title: "علبة الدبل", body: "للخطوبة", href: "/invite/theme-box" },
  { value: "الهدية", title: "الهدية والكونفيتي", body: "لعيد الميلاد", href: "/invite/theme-gift" },
  { value: "مش متأكد", title: "مش متأكد", body: "اقترحوا عليا", href: "" },
] as const;

const extras = ["لينك باسم كل ضيف", "دومين خاص", "صفحة صور بعد المناسبة", "كارت مطبوع بـQR"] as const;

type Props = {
  initialPackage?: string | null;
};

export function OrderForm({ initialPackage }: Props) {
  const { draft, error, done, summary, waHref, hasWhatsApp, patch, toggleExtra, onSubmit } =
    useOrderForm(initialPackage);

  return (
    <div className="order-page">
      <div className="wrap">
        <header>
          <Link className="logo" href="/" aria-label="Noqatni">
            <svg viewBox="0 0 64 44" aria-hidden>
              <path
                d="M3 4 L32 30 L61 4"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="32" cy="30" r="11" fill="#a3253a" />
            </svg>
            <span className="a">نقطني</span>
            <span className="e">Noqatni</span>
          </Link>
        </header>

        {!done ? (
          <main>
            <p className="eyebrow">خطوة واحدة وتبقى جاهزة</p>
            <h1>
              اطلب <em>دعوتك</em>
            </h1>
            <p className="lead">
              دقيقتين وتبعتلنا تفاصيل مناسبتك. بعدها هنكمل معاك على الواتساب، ونرد عليك بفكرة وسعر.
            </p>

            <form onSubmit={onSubmit} noValidate>
              <fieldset>
                <legend>
                  <span>١</span>بياناتك
                </legend>
                <div className="row">
                  <label className="f" htmlFor="o-name">
                    اسمك
                    <input
                      id="o-name"
                      name="name"
                      autoComplete="name"
                      required
                      value={draft.name}
                      onChange={(e) => patch({ name: e.target.value })}
                    />
                  </label>
                  <label className="f" htmlFor="o-phone">
                    رقم الواتساب
                    <input
                      id="o-phone"
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder="01xxxxxxxxx"
                      required
                      value={draft.phone}
                      onChange={(e) => patch({ phone: e.target.value })}
                    />
                  </label>
                </div>
              </fieldset>

              <fieldset>
                <legend>
                  <span>٢</span>المناسبة
                </legend>
                <div className="chips" role="radiogroup" aria-label="نوع المناسبة">
                  {occasions.map((item) => (
                    <label key={item}>
                      <input
                        type="radio"
                        name="occasion"
                        value={item}
                        checked={draft.occasion === item}
                        onChange={() => patch({ occasion: item })}
                      />
                      <span>{item}</span>
                    </label>
                  ))}
                </div>
                <label className="f" htmlFor="o-names">
                  الأسماء اللي هتتكتب على الدعوة
                  <small>مثلاً: ليلى ويوسف، أو نور (عيد ميلادها الـ٣٠)</small>
                  <input
                    id="o-names"
                    name="names"
                    required
                    value={draft.names}
                    onChange={(e) => patch({ names: e.target.value })}
                  />
                </label>
                <div className="row">
                  <label className="f" htmlFor="o-date">
                    التاريخ
                    <input
                      id="o-date"
                      name="date"
                      type="date"
                      value={draft.date}
                      onChange={(e) => patch({ date: e.target.value })}
                    />
                  </label>
                  <label className="f" htmlFor="o-place">
                    المكان
                    <small>اسم القاعة والمنطقة</small>
                    <input
                      id="o-place"
                      name="place"
                      value={draft.place}
                      onChange={(e) => patch({ place: e.target.value })}
                    />
                  </label>
                </div>
              </fieldset>

              <fieldset>
                <legend>
                  <span>٣</span>الشكل اللي عاجبك
                </legend>
                <div className="styles">
                  {styles.map((item) => (
                    <label key={item.value}>
                      <input
                        type="radio"
                        name="style"
                        value={item.value}
                        checked={draft.style === item.value}
                        onChange={() => patch({ style: item.value })}
                      />
                      <span className="card">
                        <b>{item.title}</b>
                        <small>{item.body}</small>
                        {item.href ? (
                          <Link href={item.href} target="_blank" rel="noopener" onClick={(e) => e.stopPropagation()}>
                            شوف الديمو
                          </Link>
                        ) : null}
                      </span>
                    </label>
                  ))}
                </div>

                <label className="f" htmlFor="o-package">
                  الباكدج
                  <select
                    id="o-package"
                    name="package"
                    value={draft.package}
                    onChange={(e) =>
                      patch({ package: e.target.value as typeof draft.package })
                    }
                  >
                    <option value="مش عارف لسه">مش عارف لسه، ساعدوني</option>
                    <option value="Classic">Classic · ٦٠٠ ج</option>
                    <option value="Signature">Signature · ١٬٥٠٠ ج</option>
                    <option value="Luxury">Luxury · ٢٬٥٠٠ ج</option>
                  </select>
                </label>

                <div className="f" style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 14 }}>
                  إضافات (اختياري)
                  <div className="chips">
                    {extras.map((item) => (
                      <label key={item}>
                        <input
                          type="checkbox"
                          name="extras"
                          value={item}
                          checked={draft.extras.includes(item)}
                          onChange={() => toggleExtra(item)}
                        />
                        <span>{item}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <label className="f" htmlFor="o-lang">
                  لغة الدعوة
                  <select
                    id="o-lang"
                    name="language"
                    value={draft.language}
                    onChange={(e) => patch({ language: e.target.value })}
                  >
                    <option>عربي وإنجليزي</option>
                    <option>عربي بس</option>
                    <option>إنجليزي بس</option>
                  </select>
                </label>

                <label className="f" htmlFor="o-notes">
                  أي تفاصيل تانية
                  <small>ألوان الفرح، أغنية معينة، حكايتكم، أي فكرة في دماغك</small>
                  <textarea
                    id="o-notes"
                    name="notes"
                    value={draft.notes}
                    onChange={(e) => patch({ notes: e.target.value })}
                  />
                </label>
              </fieldset>

              {error ? <p className="err">{error}</p> : null}
              <button className="submit" type="submit">
                ابعت الطلب
              </button>
              <p className="note">مش هتدفع حاجة دلوقتي. هنكلمك على الواتساب الأول ونتفق.</p>
            </form>
          </main>
        ) : (
          <section className="done">
            <h2>وصلنا طلبك 💌</h2>
            <p>
              {hasWhatsApp
                ? "فاضل خطوة واحدة: دوس على الزرار وابعتلنا الرسالة على الواتساب، ومعاها صوركم لو هتستخدموا صور."
                : "طلبك جاهز. ابعت الرسالة من ملخص الطلب، أو ابدأ دعوتك دلوقتي من صفحة الإنشاء."}
            </p>
            {hasWhatsApp && waHref ? (
              <a className="wa" href={waHref} target="_blank" rel="noopener">
                <WaIcon />
                كمّل على الواتساب
              </a>
            ) : (
              <Link className="wa" href="/create">
                ابدأ إنشاء الدعوة
              </Link>
            )}
            <pre className="summary">{summary}</pre>
          </section>
        )}
      </div>
    </div>
  );
}

function WaIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2z" />
    </svg>
  );
}
