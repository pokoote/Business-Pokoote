# 손익분기점 계산기

> 자영업자를 위한 손익분기점 · 목표매출 · 현실가능성 시뮬레이터

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38bdf8)](https://tailwindcss.com/)

## 🎯 프로젝트 목표

자영업자가 **30초 안에** 손익분기점, 목표 필요매출, 물리적 달성 가능성까지 계산할 수 있는 웹 도구를 제공합니다.

- ✅ **손익분기점 계산**: 월/일 손익분기 매출 즉시 계산
- ✅ **목표이익 필요매출**: 원하는 순이익 달성에 필요한 매출
- ✅ **필요 주문수**: 매장/배달 채널별 필요 주문 건수
- ✅ **현실가능성 체크**: 좌석·체류시간 기반 캐파 검증
- ✅ **민감도 분석**: 원가율/객단가 변화 시뮬레이션
- ✅ **시나리오 저장/비교**: 최대 3개 로컬 저장

## 🚀 주요 특징

### 모바일 퍼스트 디자인
- 작은 화면에서도 쉽게 사용할 수 있는 반응형 UI
- 1분 내 입력 → 결과 확인 가능

### 개인정보 무수집
- 로그인 불필요
- 모든 데이터는 브라우저 localStorage에만 저장
- 서버 전송 없음

### 업종별 프리셋
- 음식점, 카페, 소매, 서비스 4가지 프리셋 제공
- 예시 값으로 빠른 시작 가능

### 완벽한 타입 안전성
- TypeScript로 모든 타입 정의
- 빌드 에러 없이 안정적인 배포

## 🛠️ 기술 스택

- **프레임워크**: Next.js 14 (App Router)
- **언어**: TypeScript 5
- **스타일링**: TailwindCSS 3
- **검증**: Zod
- **테스트**: Jest
- **배포**: Vercel (권장)

## 📦 설치 및 실행

### 1. 의존성 설치

```bash
npm install
```

### 2. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

### 3. 프로덕션 빌드

```bash
npm run build
npm start
```

### 4. 테스트 실행

```bash
npm test
```

## 🌐 배포

### Vercel 배포 (권장)

#### 방법 1: Vercel CLI

```bash
# Vercel CLI 설치
npm install -g vercel

# 로그인
vercel login

# 배포
vercel

# 프로덕션 배포
vercel --prod
```

#### 방법 2: GitHub 연동

1. GitHub 저장소에 코드 푸시
2. [Vercel](https://vercel.com) 접속 → "New Project"
3. GitHub 저장소 선택 → "Import"
4. 자동으로 빌드 및 배포 완료!

### 다른 플랫폼 배포

- **Netlify**: `npm run build` 후 `.next` 폴더 배포
- **AWS/GCP**: Docker 컨테이너로 배포
- **자체 서버**: Node.js 서버에서 `npm start` 실행

## 📂 프로젝트 구조

```
├── app/                      # Next.js App Router
│   ├── layout.tsx           # 레이아웃 (네비게이션, 푸터)
│   ├── page.tsx             # 홈페이지
│   ├── calculator/          # 계산기 페이지
│   ├── guide/               # 가이드 페이지
│   ├── about/               # 소개 페이지
│   └── globals.css          # 전역 스타일
├── components/              # React 컴포넌트
│   └── calculator/
│       ├── InputForm.tsx    # 입력 폼 컴포넌트
│       └── ResultsDisplay.tsx # 결과 표시 컴포넌트
├── lib/                     # 비즈니스 로직
│   ├── types.ts            # TypeScript 타입 정의
│   ├── calculator.ts       # 계산 엔진 (순수 함수)
│   └── presets.ts          # 업종별 프리셋 데이터
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── next.config.js
└── README.md
```

## 🧮 핵심 계산 로직

### 손익분기점

```
손익분기점 매출 = 고정비 ÷ 공헌이익률
공헌이익률 = 1 - 변동비율
```

### 목표이익 필요매출

```
필요매출 = (고정비 + 목표이익) ÷ 공헌이익률
```

### 필요 주문수

```
필요 주문수 = 필요매출 ÷ 객단가
```

### 캐파 체크

```
좌석 점유율 = (필요 고객수 × 체류시간) ÷ (좌석수 × 순영업시간 × 60)
```

## ⚠️ 면책사항

본 도구는 **추정 계산 도구**이며, 다음 서비스를 제공하지 않습니다:
- 법률 자문
- 세무 자문
- 노무 자문
- 투자 자문

실제 사업 결정 시에는 전문가(세무사, 회계사)의 조언을 받으시기 바랍니다.

## 📄 라이선스

MIT License

## 🤝 기여

버그 리포트, 기능 제안, 풀 리퀘스트 환영합니다!

## 📧 문의

개선 제안이나 문의사항이 있으시면 GitHub Issues를 이용해 주세요.

---

**Made with ❤️ for 자영업자**
