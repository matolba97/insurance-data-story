export type Language = "ar" | "en";
export type SceneProps = { language: Language };
export const LANGUAGE_KEY = "insurance-data-story.language";
export function readLanguage(storage?: Pick<Storage, "getItem">): Language {
  try {
    return (storage ?? window.localStorage).getItem(LANGUAGE_KEY) === "en"
      ? "en"
      : "ar";
  } catch {
    return "ar";
  }
}
export function saveLanguage(
  language: Language,
  storage?: Pick<Storage, "setItem">,
): void {
  try {
    (storage ?? window.localStorage).setItem(LANGUAGE_KEY, language);
  } catch {
    /* Storage is optional; the current visit still works. */
  }
}
const english = {
  brand: "THE DATA ANALYST STORY",
  edition: "A story from insurance brokerage",
  presentation: "The data analyst story",
  languageControl: "Presentation language",
  ar: "Switch to Arabic",
  en: "Switch to English",
  navigation: "Slide navigation",
  previous: "Previous slide",
  next: "Next slide",
  slide: "Slide",
  of: "of",
  desktopHint: "Use the arrows to continue",
  mobileHint: "Swipe left to continue",
  professionalTitle: "Data Analyst | Insurance Brokerage",
  cta: "Connect with me on LinkedIn",
  newTab: " (opens in a new tab)",
  title: "Mohamed Tolba | The Data Analyst Story",
  description:
    "Five illustrated scenes about Mohamed Tolba’s role in insurance brokerage: reliable data, clear insights, better workflows and practical digital solutions.",
  problemDescription:
    "A confused character surrounded by scattered policies, premiums, renewals, commissions and pending requests.",
  insightDescription:
    "Mohamed organizes and validates records to create an illustrative dashboard of premiums, renewals, commissions and branch performance.",
  workflowDescription:
    "Mohamed investigates a broken connection between Sales, Operations and Finance, then reconnects and simplifies the workflow.",
  responsibilitiesDescription:
    "Mohamed at the center of four connected responsibilities: data and reporting, business insights, processes and systems, and automation and delivery.",
  helloDescription:
    "Mohamed smiles and waves, surrounded by symbols for data, collaboration and process improvement.",
  papers: [
    "Policies",
    "Excel",
    "Renewals",
    "Premiums",
    "Commissions",
    "Pending requests",
  ],
  dashboard: ["Premiums", "Renewals", "Commissions"],
  branches: "Branch performance",
  raw: "Raw data",
  clean: "Clean data",
  insights: "Meaningful insights",
  departments: ["Sales", "Operations", "Finance"],
  automation: "Automation",
  processes: "Better processes",
  flow: "Data → Insight → Decisions → Processes",
  hello: "Hello!",
  signature: "Let’s make sense of data.",
};
export const translations: Record<Language, typeof english> = {
  en: english,
  ar: {
    brand: "قصة محلل البيانات",
    edition: "قصة من عالم التأمين",
    presentation: "قصة محلل البيانات",
    languageControl: "لغة العرض",
    ar: "التبديل إلى العربية",
    en: "التبديل إلى الإنجليزية",
    navigation: "التنقل بين المشاهد",
    previous: "المشهد السابق",
    next: "المشهد التالي",
    slide: "المشهد",
    of: "من",
    desktopHint: "حرّك الأسهم لتكمّل القصة",
    mobileHint: "اسحب لليسار لتكمل",
    professionalTitle: "محلل بيانات | وساطة التأمين",
    cta: "تواصل معايا على LinkedIn",
    newTab: " (يفتح في علامة تبويب جديدة)",
    title: "محمد طلبة | قصة محلل البيانات",
    description:
      "خمس مشاهد عن دور Mohamed Tolba في وساطة التأمين: بيانات موثوقة، رؤية واضحة، فهم العمليات، وحلول رقمية عملية.",
    problemDescription:
      "شخص محتار وسط وثائق وأقساط وتجديدات وعمولات وطلبات معلّقة متناثرة",
    insightDescription:
      "محمد ينظم السجلات ويراجعها لتتحول إلى لوحة توضيحية للأقساط والتجديدات والعمولات وأداء الفروع",
    workflowDescription:
      "محمد يفحص اتصالًا معطلًا بين المبيعات والعمليات والمالية، ثم يعيد ربطه ويبسّط سير العمل",
    responsibilitiesDescription:
      "محمد في الوسط وحوله أربعة محاور مترابطة: البيانات والتقارير، رؤى الأعمال، العمليات والأنظمة، والأتمتة والتنفيذ",
    helloDescription:
      "محمد يظهر مبتسمًا ويلوّح بيده، حوله رموز للبيانات والتعاون وتحسين العمليات",
    papers: ["وثائق", "Excel", "تجديدات", "أقساط", "عمولات", "طلبات معلّقة"],
    dashboard: ["أقساط", "تجديدات", "عمولات"],
    branches: "أداء الفروع",
    raw: "بيانات خام",
    clean: "بيانات موثوقة",
    insights: "رؤية واضحة",
    departments: ["المبيعات", "العمليات", "المالية"],
    automation: "أتمتة",
    processes: "عمليات أفضل",
    flow: "بيانات ← رؤية ← قرارات ← عمليات",
    hello: "أهلًا!",
    signature: "نفهم البيانات… ونشوف الصورة.",
  },
};
