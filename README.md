# 🍚 상암 점심 월드컵 (Lunch World Cup)

마포구 매봉산로 75 주변 맛집 32곳 중 오늘의 점심 메뉴를 선택하는 이상형 월드컵 게임입니다.
Next.js 14로 제작되었으며, 별도의 DB 설치 없이 로컬 파일 시스템을 사용하여 데이터를 저장합니다.

## 🚀 시작 가이드 (Getting Started)

### 1. 필수 요구사항
- **Node.js**: v18.17.0 이상 필수 (Next.js 14 요구사항)
- **Time**: 점심 시간을 즐길 여유

### 2. 설치 (Installation)
프로젝트 폴더에서 터미널을 열고 다음 명령어를 입력하세요.

```bash
# 의존성 패키지 설치
npm install
# 또는
yarn install
```

### 3. 실행 (Run)
개발 모드로 실행합니다.

```bash
npm run dev
```
이제 브라우저에서 `http://localhost:3000` 으로 접속하세요.

## 📂 프로젝트 구조 (Project Structure)

```
silver-crab/
├── data/               # 게임 기록 저장소 (자동 생성됨, history.json)
├── public/             # 정적 파일
├── src/
│   ├── app/            # Next.js App Router 페이지
│   │   ├── game/       # 게임 화면
│   │   ├── dashboard/  # 통계 대시보드
│   │   └── api/        # 결과 저장 API
│   ├── components/     # UI 컴포넌트 (Card, GameInterface)
│   ├── lib/            # 유틸리티 (데이터, 로컬저장소 로직)
│   └── types/          # TypeScript 타입 정의
└── package.json
```

## 🛠 기술 스택 (Tech Stack)
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: CSS Modules + Global Styles (Framer Motion animations)
- **Database**: Local JSON Storage (No external DB required)

## 💡 주요 기능
- **32강 토너먼트**: 32개의 엄선된 상암 맛집 리스트
- **Time Attack**: 5초 내 미선택 시 하트 감소 (-1 ❤️)
- **Auto Pick**: 하트 소진 시 평점이 더 높은 식당 자동 선택
- **Dashboard**: 우승 횟수, 카테고리 분포 등 데이터 시각화

## ⚠️ 문제 해결
- **Node.js가 없나요?**: [nodejs.org](https://nodejs.org/)에서 LTS 버전을 설치해주세요.

## 🌏 배포 및 다른 컴퓨터 실행 (Deployment)

### 1. 다른 컴퓨터에서 실행하기
가장 쉬운 방법은 소스 코드를 복사하거나 GitHub를 이용하는 것입니다.
1. 이 프로젝트 폴더 전체를 복사하거나 GitHub에 업로드 후 `git clone` 받습니다.
2. 해당 컴퓨터에 **Node.js**를 설치합니다.
3. 터미널에서 다음을 실행합니다:
   ```bash
   npm install
   npm run build
   npm start
   ```

### 2. 웹상에 배포하기 (Vercel)
누구나 접속할 수 있는 URL을 만들려면 **Vercel**을 추천합니다.
1. GitHub 저장소(Repository)에 이 코드를 올립니다 (Push).
2. [Vercel.com](https://vercel.com)에 로그인 후 'Add New Project'를 누릅니다.
3. GitHub 저장소를 선택하면 자동으로 설정이 잡힙니다.
4. **Deploy** 버튼을 누르면 끝! (무료로 호스팅됩니다)
