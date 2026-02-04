# 손익분기점 계산기

자영업자를 위한 손익분기점, 목표매출, 현실가능성(캐파) 체크 시뮬레이터

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)

## 📋 목차

- [프로젝트 소개](#프로젝트-소개)
- [주요 기능](#주요-기능)
- [기술 스택](#기술-스택)
- [시작하기](#시작하기)
- [프로젝트 구조](#프로젝트-구조)
- [테스트](#테스트)
- [배포](#배포)
- [라이선스](#라이선스)

## 프로젝트 소개

**손익분기점 계산기**는 자영업자가 "이번 달에 얼마를 팔아야 손익분기점을 넘기는지", "목표 이익을 달성하려면 얼마를 팔아야 하는지", 그리고 "그 매출이 현실적으로 가능한지"를 30초 안에 확인할 수 있는 무료 재무 시뮬레이터입니다.

### 왜 만들었나요?

많은 자영업자분들이 "얼마를 팔아야 하는지" 명확히 알지 못한 채 사업을 운영하고 계십니다. 이 도구는:

- 복잡한 재무 개념을 자영업자 눈높이로 단순화
- 실시간 계산으로 즉각적인 피드백 제공
- 현실가능성 검증으로 비현실적인 목표 설정 방지
- 개인정보 수집 없이 완전 무료로 사용

## 주요 기능

### ✅ 완료된 기능

#### 1. 손익분기점 계산
- 월 고정비와 변동비율을 입력하면 손익분기점 매출(월/일) 즉시 계산
- 공헌이익률 자동 계산 및 표시

#### 2. 목표이익 필요매출 계산
- 목표 순이익을 입력하면 필요한 월/일 매출 계산
- 예: "월 300만원 순이익을 내려면 얼마를 팔아야 하나?"

#### 3. 필요 주문수/고객수 계산
- 매장과 배달 채널별로 필요한 주문수 계산
- 객단가 기반 실질적인 목표 제시

#### 4. 현실가능성(캐파) 체크
- **매장**: 좌석 수, 체류시간, 영업시간 기반 좌석 점유율 계산
- **배달**: 피크타임 처리량 기반 과부하 여부 판정
- 4단계 상태 판정 (여유 있음 / 가능 / 빡빡함 / 불가능)

#### 5. 민감도 분석
- 원가율 ±5%p 변화에 따른 필요매출 변화
- 객단가 ±10% 변화에 따른 필요매출 변화

#### 6. 시나리오 저장/비교
- 최대 3개 시나리오를 localStorage에 저장
- 시나리오별 핵심 지표 비교 테이블
- 임대료 인상, 배달 비중 증가 등 다양한 시나리오 검토 가능

#### 7. 업종별 프리셋
- 음식점, 카페, 소매점, 서비스업 4가지 프리셋 제공
- 클릭 한 번으로 예시 값 자동 입력 (사용자가 실제 값으로 수정 필요)

#### 8. 내보내기 기능
- CSV 다운로드 (엑셀에서 열기 가능)
- JSON 복사 (백업/공유용)
- 인쇄/PDF 저장 (브라우저 인쇄 기능)

#### 9. 콘텐츠 & SEO
- 홈페이지: 헤드라인, CTA, FAQ (FAQPage 구조화 데이터)
- 가이드 페이지: 고정비/변동비/공헌이익 개념 설명, 현실 팁
- About 페이지: 목적, 면책사항, 데이터 처리 방침

### 🔮 향후 개선 계획

- [ ] 월별 매출 추이 입력 및 실적 비교
- [ ] 시간대별 캐파 분석 (점심/저녁 피크 구분)
- [ ] 업종별 벤치마크 데이터 제공
- [ ] 차트 라이브러리 추가 (Recharts 활용)

## 기술 스택

### Frontend
- **Next.js 14** (App Router)
- **TypeScript**
- **TailwindCSS**

### 데이터 검증 & 상태관리
- **Zod** (입력 검증)
- **React State**
- **Browser localStorage** (시나리오 저장)

### 테스트
- **Jest**
- **React Testing Library**

## 시작하기

### 필수 요구사항

- Node.js 18.x 이상
- npm 또는 yarn

### 설치 및 실행

```bash
# 1. 저장소 클론
git clone https://github.com/yourusername/breakeven-calculator.git
cd breakeven-calculator

# 2. 의존성 설치
npm install

# 3. 개발 서버 실행
npm run dev

# 4. 브라우저에서 열기
# http://localhost:3000
```

### 빌드

```bash
# 프로덕션 빌드
npm run build

# 프로덕션 미리보기
npm run start
```

### 테스트

```bash
# 모든 테스트 실행
npm test

# 테스트 watch 모드
npm run test:watch
```

## 프로젝트 구조

```
breakeven-calculator/
├── app/                      # Next.js App Router 페이지
│   ├── page.tsx             # 홈페이지
│   ├── calculator/          
│   │   └── page.tsx         # 계산기 페이지
│   ├── guide/               
│   │   └── page.tsx         # 가이드 페이지
│   ├── about/               
│   │   └── page.tsx         # About 페이지
│   ├── layout.tsx           # 루트 레이아웃
│   └── globals.css          # 글로벌 스타일
│
├── components/              # React 컴포넌트
│   ├── Header.tsx           # 헤더
│   ├── Footer.tsx           # 푸터
│   └── calculator/          
│       ├── InputForm.tsx    # 입력 폼
│       ├── ResultDisplay.tsx # 결과 표시
│       └── ScenarioManager.tsx # 시나리오 관리
│
├── lib/                     # 핵심 로직 & 유틸리티
│   ├── calculations.ts      # 계산 엔진 (순수 함수)
│   ├── types.ts            # TypeScript 타입 정의
│   ├── presets.ts          # 업종별 프리셋 데이터
│   ├── utils.ts            # 유틸리티 함수
│   └── storage.ts          # localStorage 관리
│
├── __tests__/              # 테스트 파일
│   └── calculations.test.ts # 계산 로직 테스트
│
├── public/                 # 정적 파일
├── next.config.js          # Next.js 설정
├── tailwind.config.js      # TailwindCSS 설정
├── tsconfig.json           # TypeScript 설정
└── package.json            # 프로젝트 메타데이터
```

## 핵심 계산 로직

### 손익분기점 공식

```
손익분기점 매출 = 고정비 ÷ 공헌이익률
공헌이익률 = 1 - 변동비율
변동비율 = 원가율 + 수수료율 + 포장률 + ...
```

### 목표이익 필요매출 공식

```
필요매출 = (고정비 + 목표이익) ÷ 공헌이익률
```

### 캐파 체크 공식

**매장 좌석 점유율:**
```
점유율 = (필요고객수 × 체류시간) ÷ (좌석수 × 순영업시간 × 60분)
```

**배달 처리량:**
```
필요 시간당 주문수 = 일 필요주문수 ÷ 피크타임 시간
```

## 테스트

프로젝트는 핵심 계산 로직에 대해 8개의 유닛 테스트를 포함합니다:

1. ✅ 고정비 합계 계산
2. ✅ 변동비율 계산 (매장/배달)
3. ✅ 혼합 변동비율 계산 (가중평균)
4. ✅ 공헌이익률 계산
5. ✅ 매장 100% 시나리오 정상 계산
6. ✅ 배달 100% 시나리오 정상 계산
7. ✅ 매장/배달 혼합 50/50 시나리오 정상 계산
8. ✅ 공헌이익률 <= 0 경고 처리
9. ✅ 좌석 점유율 계산 및 상태 판정
10. ✅ 배달 처리량 계산 및 과부하 판정

```bash
npm test
```

## 배포

### Vercel 배포 (권장)

본 프로젝트는 Vercel에 배포하기 위해 최적화되어 있습니다.

```bash
# 1. Vercel CLI 설치
npm i -g vercel

# 2. 프로젝트 디렉토리에서 배포
vercel

# 3. 프로덕션 배포
vercel --prod
```

또는 Vercel 웹 대시보드에서:

1. [Vercel](https://vercel.com) 계정 로그인
2. "New Project" 클릭
3. GitHub 저장소 연결
4. 자동으로 Next.js 감지 및 배포 시작
5. 배포 완료 후 자동으로 URL 생성

### 정적 Export (GitHub Pages, Netlify 등)

```bash
# next.config.js에 output: 'export' 설정되어 있음

npm run build
# out/ 폴더에 정적 파일 생성됨

# GitHub Pages 배포 시
# out/ 폴더 내용을 gh-pages 브랜치에 푸시
```

### 환경 변수

본 프로젝트는 백엔드가 없으므로 환경 변수가 필요하지 않습니다.

## 개인정보 보호

- ✅ 개인정보 수집 없음
- ✅ 서버 전송 없음 (완전 클라이언트 사이드)
- ✅ localStorage만 사용 (브라우저 로컬)
- ✅ 로그인/회원가입 없음

## 면책사항

본 도구는 **추정 계산 도구**이며, 법률/세무/회계/투자 자문이 아닙니다.
실제 사업 의사결정 시에는 반드시 전문가와 상담하시기 바랍니다.

자세한 내용은 [About 페이지](/about)를 참조하세요.

## 라이선스

MIT License - 자유롭게 사용, 수정, 배포 가능

## 기여하기

버그 리포트, 기능 제안, Pull Request 환영합니다!

### 개선 제안 시 포함하면 좋은 내용:

- 현재 문제점 또는 개선 필요성
- 제안하는 해결 방법
- 예상되는 효과
- (선택) 스크린샷 또는 코드 예시

## 문의

- 이슈 트래커: [GitHub Issues](https://github.com/yourusername/breakeven-calculator/issues)

---

**만든 이:** 자영업자를 응원합니다 💪

**버전:** 1.0.0

**마지막 업데이트:** 2024-01-01
