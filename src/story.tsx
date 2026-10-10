import type { ReactNode } from "react";
export const LINKEDIN_URL =
  "https://www.linkedin.com/in/mohamed-tolba-72499214a?utm_source=share_via&utm_content=profile&utm_medium=member_android";
export type SlideId =
  "problem" | "insight" | "workflow" | "responsibilities" | "hello";
export type Responsibility = { title: string; copy: ReactNode };
type StorySlide = {
  chapter: string;
  eyebrow: string;
  headline: ReactNode;
  copy: ReactNode;
  note: string;
  responsibilities?: readonly Responsibility[];
};
export const story: readonly { id: SlideId; ar: StorySlide; en: StorySlide }[] =
  [
    {
      id: "problem",
      ar: {
        chapter: "البيانات والصورة الكاملة",
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
        note: "01 — بيانات كتير. وسؤال واحد كبير.",
      },
      en: {
        chapter: "The problem",
        eyebrow: "The data is there. The big picture isn't.",
        headline: (
          <>
            Behind Every Decision,
            <br />
            <span>There's Data.</span>
          </>
        ),
        copy: "Policies, premiums, renewals, commissions, and pending requests. But how do we see the full picture?",
        note: "01 — A lot of data. One big question.",
      },
    },
    {
      id: "insight",
      ar: {
        chapter: "من البيانات لرؤية واضحة",
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
        note: "02 — الرؤية الواضحة تبدأ ببيانات موثوقة.",
      },
      en: {
        chapter: "Making sense",
        eyebrow: "Turning scattered numbers into clarity.",
        headline: (
          <>
            I Turn Data into
            <br />
            <span>Clear Insights.</span>
          </>
        ),
        copy: "I clean, transform, and validate data, turning it into KPIs and Power BI dashboards that help management understand performance.",
        note: "02 — Clarity starts with reliable data.",
      },
    },
    {
      id: "workflow",
      ar: {
        chapter: "أبعد من التقارير",
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
            بحلل أسباب المشاكل، بساعد في تحسين الـ<bdi lang="en">Workflows</bdi>
            ، وأحوّل احتياجات الشغل لحلول رقمية وأتمتة أسهل.
          </>
        ),
        note: "03 — نفهم الشغل. ونحسّن سيره.",
      },
      en: {
        chapter: "Beyond dashboards",
        eyebrow: "Understand the problem. Improve the process.",
        headline: (
          <>
            My Work Goes
            <br />
            <span>Beyond Dashboards.</span>
          </>
        ),
        copy: "I investigate problems, improve workflows, and translate business needs into practical digital solutions and automation.",
        note: "03 — Understand the work. Improve the flow.",
      },
    },
    {
      id: "responsibilities",
      ar: {
        chapter: "محاور شغلي",
        eyebrow: "وده بيخلّي شغلي يشمل أكتر من جانب.",
        headline: (
          <>
            شغلي في <span>4 محاور.</span>
          </>
        ),
        copy: "من البيانات والتحليل، لفهم العمليات وتطوير حلول عملية.",
        note: "04 — أربعة محاور. ودور واحد مترابط.",
        responsibilities: [
          {
            title: "Data & Reporting",
            copy: (
              <>
                <bdi lang="en">Power BI</bdi>، تجهيز البيانات، ومراجعة الـ
                <bdi lang="en">KPIs</bdi>.
              </>
            ),
          },
          {
            title: "Business Insights",
            copy: "تحليل الأداء، تفسير الفروقات، وحل مشاكل البيانات.",
          },
          {
            title: "Processes & Systems",
            copy: (
              <>
                فهم الـ<bdi lang="en">Workflows</bdi>، توثيق المتطلبات، ومراجعة
                الحلول.
              </>
            ),
          },
          {
            title: "Automation & Delivery",
            copy: "أتمتة التقارير، التنسيق مع الموردين، ودعم الاختبارات والتنفيذ.",
          },
        ],
      },
      en: {
        chapter: "My responsibilities",
        eyebrow: "My role connects several parts of the business.",
        headline: (
          <>
            What <span>I Do.</span>
          </>
        ),
        copy: "From reliable data and business insights to better processes and digital solutions.",
        note: "04 — Four connected parts of one role.",
        responsibilities: [
          {
            title: "Data & Reporting",
            copy: "Build Power BI dashboards, prepare data, and validate KPIs.",
          },
          {
            title: "Business Insights",
            copy: "Analyze performance, explain variances, and resolve data-quality issues.",
          },
          {
            title: "Processes & Systems",
            copy: "Map workflows, document requirements, and review solutions.",
          },
          {
            title: "Automation & Delivery",
            copy: "Automate reporting, coordinate vendors, and support testing and implementation.",
          },
        ],
      },
    },
    {
      id: "hello",
      ar: {
        chapter: "أهلًا، أنا محمد",
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
        note: "05 — القرارات الأفضل تبدأ بالفهم.",
      },
      en: {
        chapter: "Hello, I’m Mohamed",
        eyebrow: "The person behind the story.",
        headline: (
          <>
            I'm{" "}
            <br />
            <span>
              <bdi lang="en">Mohamed Tolba.</bdi>
            </span>
          </>
        ),
        copy: "From data to better decisions. From operational challenges to smarter solutions.",
        note: "05 — Good decisions begin with understanding.",
      },
    },
  ];
