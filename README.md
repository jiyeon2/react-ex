This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## how to run

1. 디렉토리 루트에 .env 파일 생성
2. .env 파일에 `REACT_APP_API_HOST` 값 입력
3. `npm run start` 실행
4. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.


### 디렉토리, 컴포넌트 설명
- /components : 컴포넌트 모아놓은 디렉토리
    - /table
        - Table : 테이블 데이터 페이지네이션, 정렬, 소트 담당, 하위 컴포넌트 모두 렌더링 함
        - Pagination : 테이블 페이지네이션 컴포넌트
        - Filter : 데이터 필터 컴포넌트
    - /list
        - List : 데이터 조회 상태에 따른 목록 아이템 렌더링
        - ListHeader: 데이터 목록의 헤더 역할
        - ListItem: 목록 아이템 컴포넌트
    - /stats
        - StatContainer : 그래프 데이터 계산, 파이차트 렌더링 컴포넌트
- query: 데이터 요청 훅 모아놓은 디렉토리

### 사용한 라이브러리
- react
- styled-components
- axios
- react-query
- react-minimal-pie-chart
