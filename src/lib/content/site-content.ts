import type { ContentStatus, Locale } from "@/lib/config/constants";

export type ContentSection = {
  heading: string;
  paragraphs: string[];
};

type LocalizedContent = {
  slug: string;
  title: string;
  summary: string;
  seoTitle: string;
  seoDescription: string;
  sections: ContentSection[];
};

export type ProjectContent = {
  id: string;
  status: ContentStatus;
  featured: boolean;
  publishedAt: string;
  updatedAt: string;
  tags: string[];
  translations: Record<Locale, LocalizedContent>;
};

export type PostContent = {
  id: string;
  status: ContentStatus;
  publishedAt: string;
  updatedAt: string;
  readingMinutes: number;
  translations: Record<Locale, LocalizedContent>;
};

export const profileContent = {
  hero: {
    ko: {
      eyebrow: "Computer Engineering x Design",
      title: "운영과 구현 품질이 동시에 드러나는 개인 PR 시스템.",
      summary:
        "컴퓨터공학 기반의 구조적 사고와 디자인 감각을 함께 보여주는 개인 사이트를 구축합니다. 보기 좋은 소개 페이지가 아니라, 검색되고 운영되고 복구되는 출판 시스템이 목표입니다.",
      ctaPrimary: "대표 프로젝트 보기",
      ctaSecondary: "글 읽기",
    },
    en: {
      eyebrow: "Computer Engineering x Design",
      title: "A personal PR system that proves both implementation quality and operational rigor.",
      summary:
        "I build a bilingual personal site that demonstrates computer engineering discipline, design sensitivity, and long-term publishing operations. The goal is not a pretty landing page, but a resilient publishing surface.",
      ctaPrimary: "View featured work",
      ctaSecondary: "Read writing",
    },
  },
  about: {
    ko: {
      title: "문제를 구조로 정리하고, 구조를 경험으로 드러내는 개발자.",
      paragraphs: [
        "저는 컴퓨터공학 기반의 시스템 사고를 중심에 두고, 실제 운영에서 버티는 구조를 설계하는 데 강점을 둡니다.",
        "프론트엔드 표현과 백엔드 규칙, 보안 경계, 캐시 무효화, 문서 거버넌스를 한 묶음으로 다루는 방식을 선호합니다.",
      ],
    },
    en: {
      title: "An engineer who turns problems into systems, and systems into a credible experience.",
      paragraphs: [
        "My work is grounded in computer engineering, with a strong bias toward systems that survive real operations.",
        "I prefer to design frontend expression, backend rules, security boundaries, cache invalidation, and documentation governance as one connected system.",
      ],
    },
  },
};

export const projectContent: ProjectContent[] = [
  {
    id: "ops-first-portfolio",
    status: "published",
    featured: true,
    publishedAt: "2026-03-20T09:00:00.000Z",
    updatedAt: "2026-03-28T12:00:00.000Z",
    tags: ["nextjs", "seo", "operations"],
    translations: {
      ko: {
        slug: "ops-first-portfolio",
        title: "운영형 개인 PR 사이트 아키텍처",
        summary:
          "프리뷰, 캐시 무효화, SEO, 권한, 복구 규칙까지 포함한 개인 퍼블리싱 시스템 설계와 초기 구현.",
        seoTitle: "운영형 개인 PR 사이트 아키텍처",
        seoDescription:
          "Next.js 16, Supabase, SEO, preview, cache invalidation, accessibility를 결합한 개인 PR 사이트 구축 사례.",
        sections: [
          {
            heading: "문제 정의",
            paragraphs: [
              "일반적인 포트폴리오 사이트는 보기에는 좋지만 운영 규칙이 약하고, 시간이 지나면 검색과 관리 품질이 무너집니다.",
              "이 프로젝트는 개인 소개 사이트를 장기 운영 가능한 출판 시스템으로 재정의했습니다.",
            ],
          },
          {
            heading: "설계 핵심",
            paragraphs: [
              "locale-prefix URL, Draft Mode preview, revalidatePath/revalidateTag 규칙, 상태 불변식, optimistic locking을 공통 기준으로 고정했습니다.",
              "문서 세트를 함께 구축해 AI와 사람이 같은 규칙으로 구현하도록 만들었습니다.",
            ],
          },
        ],
      },
      en: {
        slug: "ops-first-portfolio",
        title: "Operations-First Personal PR Architecture",
        summary:
          "A personal publishing system built with preview, cache invalidation, SEO, authorization, and recovery rules from day one.",
        seoTitle: "Operations-First Personal PR Architecture",
        seoDescription:
          "A Next.js 16 and Supabase case study for building an operations-first personal PR site with strong SEO and preview workflows.",
        sections: [
          {
            heading: "Problem",
            paragraphs: [
              "Most portfolio sites look polished but fall apart once content, search, and operational maintenance begin to matter.",
              "This project reframed the site as a long-lived publishing system rather than a one-off showcase.",
            ],
          },
          {
            heading: "Core Decisions",
            paragraphs: [
              "Locale-prefixed URLs, Draft Mode preview, revalidatePath/revalidateTag rules, status invariants, and optimistic locking were locked in as system-wide defaults.",
              "Documentation was treated as part of the product so humans and AI agents could implement against the same contract.",
            ],
          },
        ],
      },
    },
  },
  {
    id: "contact-trust-layer",
    status: "published",
    featured: true,
    publishedAt: "2026-03-14T09:00:00.000Z",
    updatedAt: "2026-03-25T12:00:00.000Z",
    tags: ["security", "privacy", "forms"],
    translations: {
      ko: {
        slug: "contact-trust-layer",
        title: "문의 폼을 신뢰 가능한 채널로 만드는 보안 계층",
        summary:
          "Turnstile, honeypot, rate limit, PII encryption, inbox triage 규칙을 묶어 문의 시스템을 설계한 작업.",
        seoTitle: "문의 폼 보안 계층 설계",
        seoDescription: "Turnstile, rate limit, privacy, retention을 결합한 연락 채널 설계 사례.",
        sections: [
          {
            heading: "핵심 원칙",
            paragraphs: [
              "문의 채널은 단순 폼이 아니라 개인정보 최소 수집, 서버 검증, 스팸 방지, 삭제 절차가 함께 있어야 합니다.",
            ],
          },
          {
            heading: "실행 방식",
            paragraphs: [
              "Turnstile siteverify, honeypot, IP hash 기반 rate limit, encrypted-at-rest PII, inbox triage 문서화를 기본값으로 잡았습니다.",
            ],
          },
        ],
      },
      en: {
        slug: "contact-trust-layer",
        title: "A Trust Layer for Contact Intake",
        summary:
          "A secure inquiry channel built from Turnstile, honeypot checks, rate limiting, encrypted PII, and inbox governance.",
        seoTitle: "Contact Trust Layer Architecture",
        seoDescription:
          "How Turnstile, rate limiting, privacy retention, and inbox workflow form a trustworthy contact system.",
        sections: [
          {
            heading: "Principle",
            paragraphs: [
              "A contact form is not just a UI element. It is a controlled intake system with minimum collection, server verification, spam resistance, and deletion policy.",
            ],
          },
          {
            heading: "Execution",
            paragraphs: [
              "Turnstile siteverify, honeypot, IP-hash rate limits, encrypted-at-rest PII, and inbox triage rules were treated as a single product surface.",
            ],
          },
        ],
      },
    },
  },
  {
    id: "localized-writing-engine",
    status: "published",
    featured: true,
    publishedAt: "2026-03-10T09:00:00.000Z",
    updatedAt: "2026-03-26T12:00:00.000Z",
    tags: ["i18n", "writing", "seo"],
    translations: {
      ko: {
        slug: "localized-writing-engine",
        title: "다국어 글 발행 시스템과 stale 번역 제어",
        summary:
          "ko 원문과 en 병행 운영, stale 감지, sitemap 제외, noindex 전환 규칙을 구현한 발행 엔진.",
        seoTitle: "다국어 글 발행 시스템",
        seoDescription:
          "ko 원문 중심의 병행 번역 운영과 stale 정책, sitemap/noindex 규칙을 다루는 발행 시스템 사례.",
        sections: [
          {
            heading: "운영 과제",
            paragraphs: [
              "다국어 사이트에서 번역 완결성과 검색 노출 품질을 동시에 관리하는 것이 가장 큰 문제였습니다.",
            ],
          },
          {
            heading: "해결",
            paragraphs: [
              "source-linked parallel track, translation_needs_review, stale 기간별 sitemap/noindex 전환 규칙으로 문제를 통제했습니다.",
            ],
          },
        ],
      },
      en: {
        slug: "localized-writing-engine",
        title: "Localized Writing Engine With Stale Translation Control",
        summary:
          "A bilingual writing system with source-linked translation flow, stale detection, sitemap exclusion, and noindex fallbacks.",
        seoTitle: "Localized Writing Engine",
        seoDescription:
          "A bilingual publishing workflow for Korean source content and English parallel publishing with translation freshness rules.",
        sections: [
          {
            heading: "Operational Challenge",
            paragraphs: [
              "The central problem was controlling translation completeness and search quality at the same time.",
            ],
          },
          {
            heading: "Solution",
            paragraphs: [
              "A source-linked parallel track, translation_needs_review, and staged sitemap/noindex rules were used to keep stale translations from leaking into the public surface.",
            ],
          },
        ],
      },
    },
  },
];

export const postContent: PostContent[] = [
  {
    id: "draft-mode-and-pr",
    status: "published",
    publishedAt: "2026-03-22T09:00:00.000Z",
    updatedAt: "2026-03-29T11:00:00.000Z",
    readingMinutes: 6,
    translations: {
      ko: {
        slug: "draft-mode-and-pr",
        title: "개인 사이트에서도 Draft Mode가 중요한 이유",
        summary:
          "정적 페이지를 운영하면서도 안전한 프리뷰 경험을 유지하기 위해 Draft Mode를 어떻게 연결해야 하는지 정리한 글.",
        seoTitle: "Draft Mode와 개인 PR 사이트",
        seoDescription: "Next.js Draft Mode를 개인 사이트 프리뷰와 연결하는 이유와 규칙을 설명합니다.",
        sections: [
          {
            heading: "왜 필요한가",
            paragraphs: [
              "정적 최적화와 preview 품질을 동시에 얻으려면 임시 공개 링크가 아닌 프레임워크 수준의 preview 전환이 필요합니다.",
            ],
          },
          {
            heading: "실전 규칙",
            paragraphs: [
              "preview token 검증 후 Draft Mode cookie를 세팅하고, preview 응답은 noindex와 no-store로 고정해야 합니다.",
            ],
          },
        ],
      },
      en: {
        slug: "draft-mode-and-pr",
        title: "Why Draft Mode Matters Even for a Personal Site",
        summary:
          "How to keep static performance and safe previews at the same time by wiring a personal publishing flow to Draft Mode.",
        seoTitle: "Draft Mode for a Personal PR Site",
        seoDescription: "Why Draft Mode is the right preview primitive for a static-first personal PR site.",
        sections: [
          {
            heading: "Why It Matters",
            paragraphs: [
              "If the public site is static-first, preview should be a framework-level mode switch rather than an ad-hoc unpublished URL.",
            ],
          },
          {
            heading: "Practical Rule",
            paragraphs: [
              "Validate the preview token, enable Draft Mode, and force preview responses to noindex and no-store.",
            ],
          },
        ],
      },
    },
  },
  {
    id: "route-handlers-origin",
    status: "published",
    publishedAt: "2026-03-18T09:00:00.000Z",
    updatedAt: "2026-03-27T11:00:00.000Z",
    readingMinutes: 7,
    translations: {
      ko: {
        slug: "route-handlers-origin",
        title: "관리자 write 경로에서 Origin 검증을 빼면 생기는 문제",
        summary:
          "Server Actions와 Route Handlers를 안전하게 운영하기 위해 same-origin과 allowed origin 정책을 어떻게 나눠야 하는지 설명합니다.",
        seoTitle: "관리자 write 경로 Origin 검증",
        seoDescription: "Next.js 관리자 write 경로를 보호하기 위한 Origin, Host, SameSite 정책을 다룹니다.",
        sections: [
          {
            heading: "오해",
            paragraphs: [
              "Server Actions가 UI 내부에서만 호출될 것이라고 가정하면 보안 경계가 빠르게 흐려집니다.",
            ],
          },
          {
            heading: "기준",
            paragraphs: [
              "관리자 write는 same-origin 기본, 명시 allowlist origin만 예외, 세션 쿠키는 HttpOnly + Secure + SameSite=Lax를 유지해야 합니다.",
            ],
          },
        ],
      },
      en: {
        slug: "route-handlers-origin",
        title: "Why Admin Write Paths Need Origin Checks",
        summary:
          "A practical guide to same-origin enforcement, allowed origin exceptions, and cookie policy for admin write paths.",
        seoTitle: "Origin Checks for Admin Write Paths",
        seoDescription:
          "How to secure Next.js admin writes with Origin, Host, and SameSite policy instead of UI assumptions.",
        sections: [
          {
            heading: "Common Mistake",
            paragraphs: [
              "Assuming Server Actions are only called from trusted UI flows weakens the security boundary immediately.",
            ],
          },
          {
            heading: "Rule",
            paragraphs: [
              "Admin writes should default to same-origin, allow explicit exceptions only, and keep session cookies HttpOnly, Secure, and SameSite=Lax.",
            ],
          },
        ],
      },
    },
  },
  {
    id: "wcag-ops-site",
    status: "published",
    publishedAt: "2026-03-12T09:00:00.000Z",
    updatedAt: "2026-03-30T11:00:00.000Z",
    readingMinutes: 5,
    translations: {
      ko: {
        slug: "wcag-ops-site",
        title: "운영형 사이트에서 접근성은 옵션이 아니라 게이트다",
        summary:
          "visible focus, focus not obscured, keyboard-only admin, reduced motion을 실제 출시 차단 조건으로 다루는 방법을 정리합니다.",
        seoTitle: "운영형 사이트 접근성 게이트",
        seoDescription: "WCAG 2.2 핵심 기준을 운영형 사이트의 출시 게이트로 연결하는 방법.",
        sections: [
          {
            heading: "핵심 관점",
            paragraphs: [
              "운영형 사이트는 단순한 마케팅 페이지가 아니므로 관리자 영역까지 포함한 keyboard-only 접근성을 확보해야 합니다.",
            ],
          },
          {
            heading: "실행 기준",
            paragraphs: [
              "visible focus, focus not obscured, modal escape, form error announce, reduced motion을 acceptance에 직접 올려야 합니다.",
            ],
          },
        ],
      },
      en: {
        slug: "wcag-ops-site",
        title: "Accessibility Is a Release Gate for Operational Sites",
        summary:
          "How visible focus, focus not obscured, keyboard-only admin flows, and reduced motion become hard acceptance rules.",
        seoTitle: "Accessibility as a Release Gate",
        seoDescription: "Applying WCAG 2.2 essentials as release gates for an operations-first personal site.",
        sections: [
          {
            heading: "Perspective",
            paragraphs: [
              "An operational site is more than a marketing page, so accessibility must cover admin workflows too.",
            ],
          },
          {
            heading: "Execution",
            paragraphs: [
              "Visible focus, focus not obscured, modal escape, form error announce, and reduced motion should be treated as release-blocking checks.",
            ],
          },
        ],
      },
    },
  },
];
