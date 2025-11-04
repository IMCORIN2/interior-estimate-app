export const flows = {
    main: {
        id: 'main',
        question: '어떤 시공을 원하시나요?',
        options: [
            { label: '도배/장판', next: 'wallpaper' },
            { label: '바닥', next: 'floor' },
            { label: '몰딩', next: 'molding' },
            { label: '주방', next: 'kitchen' },
            { label: '욕실', next: 'bathroom' },
            { label: '샷시', next: 'window' },
            { label: '베란다', next: 'veranda' },
            { label: '방문', next: 'door' },
            { label: '현관문', next: 'entrance' },
        ],
    },

    // 🔹 도배/장판 flow는 그대로 유지 (생략)

    // 🔹 바닥 시공 (floor) 분기형 구조
    floor: [
        {
            id: 'f1',
            question: '어떤 시공을 원하시나요?',
            options: [
                { label: '마루 보수', next: 'floor_maru_repair' },
                { label: '마루 시공', next: 'floor_maru_install' },
                { label: '바닥재 시공', next: 'floor_flooring' },
                { label: '에폭시 바닥 시공', next: 'floor_epoxy' },
                { label: '장판 시공', next: 'floor_vinyl' },
                { label: '층간소음매트 시공', next: 'floor_soundproof' },
                { label: '카페트 시공', next: 'floor_carpet' },
                { label: '타일 시공', next: 'floor_tile' },
            ],
        },
    ],

    // ---------------------------
    // 🔸 마루 보수 flow
    floor_maru_repair: [
        {
            id: 'mr1',
            question: '시공이 필요한 공간이 어디인가요?',
            options: ['가정', '상업시설', '체육관', '교실', '기타'],
            next: 'mr2',
        },
        {
            id: 'mr2',
            question: '어떤 서비스를 원하시나요?',
            options: ['일반 보수', '샌딩/도장', '라인마킹', '금구 설치'],
            next: 'mr3',
        },
        {
            id: 'mr3',
            question: '대략적인 시공 면적을 알려주세요. (전용면적 기준)',
            input: true,
            next: 'mr4',
        },
        {
            id: 'mr4',
            question: '시공 희망일을 선택해주세요.',
            options: [
                '협의 가능해요',
                '가능한 빨리 진행하고 싶어요',
                '일주일 이내로 진행하고 싶어요',
                '원하는 날짜가 있어요',
                '기타',
            ],
            next: 'mr5',
        },
        {
            id: 'mr5',
            question: '지역을 선택해주세요.',
            input: true,
            next: 'mr6',
        },
        {
            id: 'mr6',
            question: '시공 관련 문의사항을 알려주세요.',
            options: ['고수와 상담 시 논의할게요', '지금 작성할게요'],
        },
    ],

    // ---------------------------
    // 🔸 마루 시공 flow
    floor_maru_install: [
        {
            id: 'mi1',
            question: '어떤 서비스를 원하시나요?',
            options: ['신규 시공', '전체 교체', '부분 교체', '보수', '기타'],
            next: 'mi2',
        },
        {
            id: 'mi2',
            question: '어떤 마루를 원하시나요?',
            options: ['강마루', '강화마루', '온돌마루', '원목마루'],
            next: 'mi3',
        },
        {
            id: 'mi3',
            question: '시공 시, 공간에 짐이 있는 상태인가요?',
            options: ['네', '아니요'],
            next: 'mi4',
        },
        {
            id: 'mi4',
            question: '대략적인 시공 면적을 입력해주세요. (전용면적 기준)',
            input: true,
            next: 'mi5',
        },
        {
            id: 'mi5',
            question: '시공 희망일을 선택해주세요.',
            options: [
                '협의 가능해요',
                '가능한 빨리 진행하고 싶어요',
                '일주일 이내로 진행하고 싶어요',
                '원하는 날짜가 있어요',
                '기타',
            ],
            next: 'mi6',
        },
        {
            id: 'mi6',
            question: '시공 지역이 어디인가요?',
            input: true,
            next: 'mi7',
        },
        {
            id: 'mi7',
            question: '시공 관련 희망사항을 알려주세요.',
            options: ['고수와 상담 시 논의할게요', '지금 작성할게요'],
        },
    ],

    // ---------------------------
    // 🔸 바닥재 시공 flow
    floor_flooring: [
        {
            id: 'ff1',
            question: '시공 공간이 어디인가요?',
            options: ['주거공간', '사무공간', '상업공간', '기타'],
            next: 'ff2',
        },
        {
            id: 'ff2',
            question: '어떤 시공을 원하시나요?',
            options: ['신규 시공', '덧방 시공', '전체 교체', '부분 교체'],
            next: 'ff3',
        },
        {
            id: 'ff3',
            question: '현재 바닥재를 선택해주세요.',
            options: ['바닥재 없음', '데코타일/장판', '마루', '타일', '잘 모르겠음'],
            next: 'ff4',
        },
        {
            id: 'ff4',
            question: '어떤 바닥재를 원하시나요?',
            options: ['데코타일', '장판', '마루', '타일', '상담 후 결정'],
            next: 'ff5',
        },
        {
            id: 'ff5',
            question: '난방 시공도 원하시나요?',
            options: ['필요없음', '습식 난방', '건식 난방', '상담 후 결정'],
            next: 'ff6',
        },
        {
            id: 'ff6',
            question: '시공 환경을 선택해주세요.',
            options: ['공실(비어있음)', '짐 있음'],
            next: 'ff7',
        },
        {
            id: 'ff7',
            question: '시공 평수(공급 면적)을 입력해주세요.',
            input: true,
            next: 'ff8',
        },
        {
            id: 'ff8',
            question: '시공 희망일을 선택해주세요.',
            options: [
                '협의 가능해요',
                '가능한 빨리 진행하고 싶어요',
                '일주일 이내로 진행하고 싶어요',
                '원하는 날짜가 있어요',
                '기타',
            ],
            next: 'ff9',
        },
        {
            id: 'ff9',
            question: '지역을 선택해주세요.',
            input: true,
        },
    ],

    // ---------------------------
    // 🔸 에폭시 바닥 시공 flow
    floor_epoxy: [
        {
            id: 'fe1',
            question: '현재 바닥재는 무엇인가요?',
            options: ['시멘트/콘크리트', '에폭시', '타일', '장판', '잘 모르겠어요', '기타'],
            next: 'fe2',
        },
        {
            id: 'fe2',
            question: '어떤 서비스를 원하시나요?',
            options: ['에폭시 코팅', '에폭시 라이닝'],
            next: 'fe3',
        },
        {
            id: 'fe3',
            question: '원하시는 스타일이 있나요?',
            options: ['유광', '무광', '반광', '컬러', '로고 삽입', '고수와 상담 후 결정할게요', '기타'],
            next: 'fe4',
        },
        {
            id: 'fe4',
            question: '대략적인 시공 면적을 알려주세요. (전용면적 기준)',
            input: true,
            next: 'fe5',
        },
        {
            id: 'fe5',
            question: '지역이 어디인가요?',
            input: true,
            next: 'fe6',
        },
        {
            id: 'fe6',
            question: '시공 관련 희망사항을 알려주세요.',
            options: ['고수와 상담 시 논의할게요', '지금 작성할게요'],
        },
    ],

    // ---------------------------
    // 🔸 장판 시공 flow
    floor_vinyl: [
        {
            id: 'fv1',
            question: '어떤 시공을 원하시나요?',
            options: ['전체 교체', '부분 교체', '전체 덧방', '부분 덧방'],
            next: 'fv2',
        },
        {
            id: 'fv2',
            question: '현재 바닥재를 선택해주세요.',
            options: ['장판', '데코타일', '마루', '타일', '바닥재 없음'],
            next: 'fv3',
        },
        {
            id: 'fv3',
            question: '원하시는 장판 두께를 선택해주세요.',
            options: ['1.8T', '2.2T', '3.2T', '4.5T'],
            next: 'fv4',
        },
        {
            id: 'fv4',
            question: '해당 사항을 선택해주세요.',
            options: ['신축 건물', '구축 건물', '공간에 짐이 있음', '베란다 확장', '복층 구조', '난방필름 시공 추가'],
            next: 'fv5',
        },
        {
            id: 'fv5',
            question: '평수(공급면적)를 입력해주세요.',
            input: true,
            next: 'fv6',
        },
        {
            id: 'fv6',
            question: '시공 희망일을 선택해주세요.',
            options: [
                '협의 가능해요',
                '가능한 빨리 진행하고 싶어요',
                '일주일 이내로 진행하고 싶어요',
                '원하는 날짜가 있어요',
                '기타',
            ],
            next: 'fv7',
        },
        {
            id: 'fv7',
            question: '지역을 선택해주세요.',
            input: true,
            next: 'fv8',
        },
        {
            id: 'fv8',
            question: '시공 관련 문의사항을 알려주세요.',
            options: ['고수와 상담 시 논의할게요', '지금 작성할게요'],
        },
    ],

    // ---------------------------
    // 🔸 층간소음매트 시공 flow
    floor_soundproof: [
        {
            id: 'fs1',
            question: '어떤 시공을 원하시나요?',
            options: ['층간 소음매트', '미끄럼방지 매트', '반려동물 매트', '스포츠 매트', '기타'],
            next: 'fs2',
        },
        {
            id: 'fs2',
            question: '어디에 시공을 원하시나요?',
            options: ['집 전체', '거실', '주방', '복도', '방', '상업공간', '기타'],
            next: 'fs3',
        },
        {
            id: 'fs3',
            question: '시공 공간의 면적을 알려주세요.',
            input: true,
            next: 'fs4',
        },
        {
            id: 'fs4',
            question: '해당되는 사항을 선택해주세요.',
            options: ['특이사항 없음', '복층', '베란다 확장'],
            next: 'fs5',
        },
        {
            id: 'fs5',
            question: '서비스를 받고 싶은 날짜는 언제인가요?',
            options: [
                '협의 가능해요',
                '가능한 빨리 진행하고 싶어요',
                '일주일 이내로 진행하고 싶어요',
                '원하는 날짜가 있어요',
                '기타',
            ],
            next: 'fs6',
        },
        {
            id: 'fs6',
            question: '서비스를 받고 싶은 지역이 어디인가요?',
            input: true,
            next: 'fs7',
        },
        {
            id: 'fs7',
            question: '시공 관련 문의사항을 알려주세요.',
            options: ['고수와 상담 시 논의할게요', '지금 작성할게요'],
        },
    ],

    // ---------------------------
    // 🔸 카페트 시공 flow
    floor_carpet: [
        {
            id: 'fc1',
            question: '어떤 카페트를 원하시나요?',
            options: ['롤 카페트', '타일 카페트', '고수와 상담 후 결정할게요', '기타'],
            next: 'fc2',
        },
        {
            id: 'fc2',
            question: '현재 바닥재를 알려주세요.',
            options: [
                '롤 카페트',
                '타일 카페트',
                '데코타일',
                '폴리싱 타일',
                '강마루',
                '장판',
                '시멘트',
                '잘 모르겠어요',
                '기타',
            ],
            next: 'fc3',
        },
        {
            id: 'fc3',
            question: '어떤 서비스를 원하시나요?',
            options: ['신규 시공', '전체 교체', '일부 교체', '기타'],
            next: 'fc4',
        },
        {
            id: 'fc4',
            question: '시공 공간의 면적을 알려주세요.',
            input: true,
            next: 'fc5',
        },
        {
            id: 'fc5',
            question: '시공 시, 공간에 짐이 있는 상태인가요?',
            options: ['네', '아니요'],
            next: 'fc6',
        },
        {
            id: 'fc6',
            question: '시공 예정일이 언제인가요?',
            options: [
                '협의 가능해요',
                '가능한 빨리 진행하고 싶어요',
                '일주일 이내로 진행하고 싶어요',
                '원하는 날짜가 있어요',
                '기타',
            ],
            next: 'fc7',
        },
        {
            id: 'fc7',
            question: '시공 지역을 선택해주세요.',
            input: true,
            next: 'fc8',
        },
        {
            id: 'fc8',
            question: '시공 관련 문의사항을 알려주세요.',
            options: ['고수와 상담 시 논의할게요', '지금 작성할게요'],
        },
    ],

    // ---------------------------
    // 🔸 타일 시공 flow
    floor_tile: [
        {
            id: 'ft1',
            question: '어떤 공간인가요?',
            options: ['주거공간', '상업공간'],
            next: 'ft2',
        },
        {
            id: 'ft2',
            question: '시공 공간을 선택해주세요.',
            options: [
                '주방',
                '화장실',
                '현관',
                '거실/홈',
                '베란다/테라스',
                '복도',
                '상업공간 바닥/벽',
                '건물 외벽',
                '기타',
            ],
            next: 'ft3',
        },
        {
            id: 'ft3',
            question: '시공 방식을 선택해주세요.',
            options: ['덧방 시공', '부분 교체', '전체 교체', '신규 시공'],
            next: 'ft4',
        },
        {
            id: 'ft4',
            question: '시공 면적을 입력해주세요.',
            input: true,
            next: 'ft5',
        },
        {
            id: 'ft5',
            question: '참고 사진이 있다면 첨부해주세요.',
            input: true,
            next: 'ft6',
        },
        {
            id: 'ft6',
            question: '시공 희망일을 선택해주세요.',
            options: [
                '협의 가능해요',
                '가능한 빨리 진행하고 싶어요',
                '일주일 이내로 진행하고 싶어요',
                '원하는 날짜가 있어요',
                '기타',
            ],
            next: 'ft7',
        },
        {
            id: 'ft7',
            question: '지역을 선택해주세요.',
            input: true,
            next: 'ft8',
        },
        {
            id: 'ft8',
            question: '서비스 관련 희망사항을 알려주세요.',
            options: ['고수와 상담 시 논의할게요', '지금 작성할게요'],
        },
    ],
} as const;
