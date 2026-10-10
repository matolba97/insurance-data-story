import type { ReactNode } from "react";
export const LINKEDIN_URL =
  "https://www.linkedin.com/in/mohamed-tolba-72499214a?utm_source=share_via&utm_content=profile&utm_medium=member_android";
type StorySlide = {
  chapter: string;
  eyebrow: string;
  headline: ReactNode;
  copy: ReactNode;
  note: string;
};
export const story: readonly StorySlide[] = [
  {
    chapter: "The problem",
    eyebrow: "البيانات موجودة. الصورة لسه مش واضحة.",
    headline: (
      <>
        كل قرار وراه
        <br />
        <span>بيانات…</span>
      </>
    ),
    copy: (
      <>
        وثائق، أقساط، تجديدات، عمولات، وطلبات معلّقة… بس إزاي نشوف الصورة
        الكاملة؟
      </>
    ),
    note: "01 — A lot of data. One big question.",
  },
  {
    chapter: "Making sense",
    eyebrow: "من أرقام متفرقة لرؤية واحدة.",
    headline: (
      <>
        أنا بحوّل البيانات
        <br />
        لـ<span>رؤية واضحة.</span>
      </>
    ),
    copy: (
      <>
        بنضّف البيانات، براجع دقتها، وبحوّلها لـ<bdi lang="en">KPIs</bdi> و
        <bdi lang="en">Power BI Dashboards</bdi> تساعد الإدارة تفهم الأداء.
      </>
    ),
    note: "02 — Clarity starts with reliable data.",
  },
  {
    chapter: "Beyond dashboards",
    eyebrow: "نفهم المشكلة. ونوصل لحل.",
    headline: (
      <>
        بس شغلي مش بيقف
        <br />
        عند الـ
        <span>
          <bdi lang="en">Dashboard.</bdi>
        </span>
      </>
    ),
    copy: (
      <>
        بحلل أسباب المشاكل، بساعد في تحسين الـ<bdi lang="en">Workflows</bdi>،
        وأحوّل احتياجات الشغل لحلول رقمية وأتمتة أسهل.
      </>
    ),
    note: "03 — Understand the work. Improve the flow.",
  },
  {
    chapter: "Hello, I’m Mohamed",
    eyebrow: "والشخص اللي ورا القصة…",
    headline: (
      <>
        أنا <br />
        <span>
          <bdi lang="en">Mohamed Tolba.</bdi>
        </span>
      </>
    ),
    copy: (
      <>
        من البيانات لقرارات أفضل…
        <br />
        ومن مشاكل التشغيل لحلول أذكى.
      </>
    ),
    note: "04 — Good decisions begin with understanding.",
  },
];
