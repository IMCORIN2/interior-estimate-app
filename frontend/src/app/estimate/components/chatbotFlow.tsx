// src/chatbotFlow.ts

// 선택지 객체 타입 정의 (ID 포함)
export type OptionItem = {
    optionId: number; // AnswerMaster 테이블의 ID
    label: string;
    next?: string;
};

// 질문 단계 타입 정의 (ID 포함)
export type FlowStep = {
    id: number; // Question 테이블의 ID
    question: string;
    options?: (OptionItem | string)[];
    input?: boolean;
    next?: string;
};

// 흐름 타입 정의
export type ChatFlow = {
    [key: string]: FlowStep | FlowStep[];
};

export const flows: ChatFlow = {
    // 💡 1. 메인 질문 (Q ID: 10)
    main: {
        id: 10,
        question: '어떤 시공을 원하시나요?',
        options: [
            { optionId: 101, label: '도배/장판', next: 'wallpaper' },
            { optionId: 102, label: '바닥', next: 'floor' },
            { optionId: 103, label: '몰딩', next: 'molding' },
            { optionId: 104, label: '주방', next: 'kitchen' },
            { optionId: 105, label: '욕실', next: 'bathroom' },
            { optionId: 106, label: '샷시', next: 'window' },
            { optionId: 107, label: '베란다', next: 'veranda' },
            { optionId: 108, label: '방문', next: 'door' },
            { optionId: 109, label: '현관문', next: 'entrance' },
        ],
    },

    // 🔹 도배/장판 flow는 그대로 유지 (Q ID: 11 ~ 15)
    wallpaper: [
        { id: 11, question: '도배 시공 질문 1', options: [{ optionId: 111, label: '옵션 1' }] },
        // ... (나머지 도배/장판 flow 단계는 예시로 생략하거나 ID를 직접 부여해야 합니다.)
    ],

    // 🔹 바닥 시공 (floor) 분기형 구조 (Q ID: 20)
    floor: [
        {
            id: 20,
            question: '어떤 시공을 원하시나요?',
            options: [
                { optionId: 201, label: '마루 보수', next: 'floor_maru_repair' },
                { optionId: 202, label: '마루 시공', next: 'floor_maru_install' },
                { optionId: 203, label: '바닥재 시공', next: 'floor_flooring' },
                { optionId: 204, label: '에폭시 바닥 시공', next: 'floor_epoxy' },
                { optionId: 205, label: '장판 시공', next: 'floor_vinyl' },
                { optionId: 206, label: '층간소음매트 시공', next: 'floor_soundproof' },
                { optionId: 207, label: '카페트 시공', next: 'floor_carpet' },
                { optionId: 208, label: '타일 시공', next: 'floor_tile' },
            ],
        },
    ],

    // ---------------------------
    // 🔸 마루 보수 flow (Q ID: 31 ~ 36)
    floor_maru_repair: [
        {
            id: 31,
            question: '시공이 필요한 공간이 어디인가요?',
            options: [
                { optionId: 311, label: '가정' },
                { optionId: 312, label: '상업시설' },
                { optionId: 313, label: '체육관' },
                { optionId: 314, label: '교실' },
                { optionId: 315, label: '기타' },
            ],
            next: 'mr2',
        },
        {
            id: 32,
            question: '어떤 서비스를 원하시나요?',
            options: [
                { optionId: 321, label: '일반 보수' },
                { optionId: 322, label: '샌딩/도장' },
                { optionId: 323, label: '라인마킹' },
                { optionId: 324, label: '금구 설치' },
            ],
            next: 'mr3',
        },
        {
            id: 33,
            question: '대략적인 시공 면적을 알려주세요. (전용면적 기준)',
            input: true,
            next: 'mr4',
        },
        {
            id: 34,
            question: '시공 희망일을 선택해주세요.',
            options: [
                { optionId: 341, label: '협의 가능해요' },
                { optionId: 342, label: '가능한 빨리 진행하고 싶어요' },
                { optionId: 343, label: '일주일 이내로 진행하고 싶어요' },
                { optionId: 344, label: '원하는 날짜가 있어요' },
                { optionId: 345, label: '기타' },
            ],
            next: 'mr5',
        },
        {
            id: 35,
            question: '지역을 선택해주세요.',
            input: true,
            next: 'mr6',
        },
        {
            id: 36,
            question: '시공 관련 문의사항을 알려주세요.',
            options: [
                { optionId: 361, label: '고수와 상담 시 논의할게요' },
                { optionId: 362, label: '지금 작성할게요' },
            ],
        },
    ],

    // ---------------------------
    // 🔸 마루 시공 flow (Q ID: 41 ~ 47)
    floor_maru_install: [
        {
            id: 41,
            question: '어떤 서비스를 원하시나요?',
            options: [
                { optionId: 411, label: '신규 시공' },
                { optionId: 412, label: '전체 교체' },
                { optionId: 413, label: '부분 교체' },
                { optionId: 414, label: '보수' },
                { optionId: 415, label: '기타' },
            ],
            next: 'mi2',
        },
        {
            id: 42,
            question: '어떤 마루를 원하시나요?',
            options: [
                { optionId: 421, label: '강마루' },
                { optionId: 422, label: '강화마루' },
                { optionId: 423, label: '온돌마루' },
                { optionId: 424, label: '원목마루' },
            ],
            next: 'mi3',
        },
        {
            id: 43,
            question: '시공 시, 공간에 짐이 있는 상태인가요?',
            options: [
                { optionId: 431, label: '네' },
                { optionId: 432, label: '아니요' },
            ],
            next: 'mi4',
        },
        {
            id: 44,
            question: '대략적인 시공 면적을 입력해주세요. (전용면적 기준)',
            input: true,
            next: 'mi5',
        },
        {
            id: 45,
            question: '시공 희망일을 선택해주세요.',
            options: [
                { optionId: 451, label: '협의 가능해요' },
                { optionId: 452, label: '가능한 빨리 진행하고 싶어요' },
                { optionId: 453, label: '일주일 이내로 진행하고 싶어요' },
                { optionId: 454, label: '원하는 날짜가 있어요' },
                { optionId: 455, label: '기타' },
            ],
            next: 'mi6',
        },
        {
            id: 46,
            question: '시공 지역이 어디인가요?',
            input: true,
            next: 'mi7',
        },
        {
            id: 47,
            question: '시공 관련 희망사항을 알려주세요.',
            options: [
                { optionId: 471, label: '고수와 상담 시 논의할게요' },
                { optionId: 472, label: '지금 작성할게요' },
            ],
        },
    ],

    // ---------------------------
    // 🔸 바닥재 시공 flow (Q ID: 51 ~ 59)
    floor_flooring: [
        {
            id: 51,
            question: '시공 공간이 어디인가요?',
            options: [
                { optionId: 511, label: '주거공간' },
                { optionId: 512, label: '사무공간' },
                { optionId: 513, label: '상업공간' },
                { optionId: 514, label: '기타' },
            ],
            next: 'ff2',
        },
        {
            id: 52,
            question: '어떤 시공을 원하시나요?',
            options: [
                { optionId: 521, label: '신규 시공' },
                { optionId: 522, label: '덧방 시공' },
                { optionId: 523, label: '전체 교체' },
                { optionId: 524, label: '부분 교체' },
            ],
            next: 'ff3',
        },
        {
            id: 53,
            question: '현재 바닥재를 선택해주세요.',
            options: [
                { optionId: 531, label: '바닥재 없음' },
                { optionId: 532, label: '데코타일/장판' },
                { optionId: 533, label: '마루' },
                { optionId: 534, label: '타일' },
                { optionId: 535, label: '잘 모르겠음' },
            ],
            next: 'ff4',
        },
        {
            id: 54,
            question: '어떤 바닥재를 원하시나요?',
            options: [
                { optionId: 541, label: '데코타일' },
                { optionId: 542, label: '장판' },
                { optionId: 543, label: '마루' },
                { optionId: 544, label: '타일' },
                { optionId: 545, label: '상담 후 결정' },
            ],
            next: 'ff5',
        },
        {
            id: 55,
            question: '난방 시공도 원하시나요?',
            options: [
                { optionId: 551, label: '필요없음' },
                { optionId: 552, label: '습식 난방' },
                { optionId: 553, label: '건식 난방' },
                { optionId: 554, label: '상담 후 결정' },
            ],
            next: 'ff6',
        },
        {
            id: 56,
            question: '시공 환경을 선택해주세요.',
            options: [
                { optionId: 561, label: '공실(비어있음)' },
                { optionId: 562, label: '짐 있음' },
            ],
            next: 'ff7',
        },
        {
            id: 57,
            question: '시공 평수(공급 면적)을 입력해주세요.',
            input: true,
            next: 'ff8',
        },
        {
            id: 58,
            question: '시공 희망일을 선택해주세요.',
            options: [
                { optionId: 581, label: '협의 가능해요' },
                { optionId: 582, label: '가능한 빨리 진행하고 싶어요' },
                { optionId: 583, label: '일주일 이내로 진행하고 싶어요' },
                { optionId: 584, label: '원하는 날짜가 있어요' },
                { optionId: 585, label: '기타' },
            ],
            next: 'ff9',
        },
        {
            id: 59,
            question: '지역을 선택해주세요.',
            input: true,
        },
    ],

    // ---------------------------
    // 🔸 에폭시 바닥 시공 flow (Q ID: 61 ~ 66)
    floor_epoxy: [
        {
            id: 61,
            question: '현재 바닥재는 무엇인가요?',
            options: [
                { optionId: 611, label: '시멘트/콘크리트' },
                { optionId: 612, label: '에폭시' },
                { optionId: 613, label: '타일' },
                { optionId: 614, label: '장판' },
                { optionId: 615, label: '잘 모르겠어요' },
                { optionId: 616, label: '기타' },
            ],
            next: 'fe2',
        },
        {
            id: 62,
            question: '어떤 서비스를 원하시나요?',
            options: [
                { optionId: 621, label: '에폭시 코팅' },
                { optionId: 622, label: '에폭시 라이닝' },
            ],
            next: 'fe3',
        },
        {
            id: 63,
            question: '원하시는 스타일이 있나요?',
            options: [
                { optionId: 631, label: '유광' },
                { optionId: 632, label: '무광' },
                { optionId: 633, label: '반광' },
                { optionId: 634, label: '컬러' },
                { optionId: 635, label: '로고 삽입' },
                { optionId: 636, label: '고수와 상담 후 결정할게요' },
                { optionId: 637, label: '기타' },
            ],
            next: 'fe4',
        },
        {
            id: 64,
            question: '대략적인 시공 면적을 알려주세요. (전용면적 기준)',
            input: true,
            next: 'fe5',
        },
        {
            id: 65,
            question: '지역이 어디인가요?',
            input: true,
            next: 'fe6',
        },
        {
            id: 66,
            question: '시공 관련 희망사항을 알려주세요.',
            options: [
                { optionId: 661, label: '고수와 상담 시 논의할게요' },
                { optionId: 662, label: '지금 작성할게요' },
            ],
        },
    ],

    // ---------------------------
    // 🔸 장판 시공 flow (Q ID: 71 ~ 78)
    floor_vinyl: [
        {
            id: 71,
            question: '어떤 시공을 원하시나요?',
            options: [
                { optionId: 711, label: '전체 교체' },
                { optionId: 712, label: '부분 교체' },
                { optionId: 713, label: '전체 덧방' },
                { optionId: 714, label: '부분 덧방' },
            ],
            next: 'fv2',
        },
        {
            id: 72,
            question: '현재 바닥재를 선택해주세요.',
            options: [
                { optionId: 721, label: '장판' },
                { optionId: 722, label: '데코타일' },
                { optionId: 723, label: '마루' },
                { optionId: 724, label: '타일' },
                { optionId: 725, label: '바닥재 없음' },
            ],
            next: 'fv3',
        },
        {
            id: 73,
            question: '원하시는 장판 두께를 선택해주세요.',
            options: [
                { optionId: 731, label: '1.8T' },
                { optionId: 732, label: '2.2T' },
                { optionId: 733, label: '3.2T' },
                { optionId: 734, label: '4.5T' },
            ],
            next: 'fv4',
        },
        {
            id: 74,
            question: '해당 사항을 선택해주세요.',
            options: [
                { optionId: 741, label: '신축 건물' },
                { optionId: 742, label: '구축 건물' },
                { optionId: 743, label: '공간에 짐이 있음' },
                { optionId: 744, label: '베란다 확장' },
                { optionId: 745, label: '복층 구조' },
                { optionId: 746, label: '난방필름 시공 추가' },
            ],
            next: 'fv5',
        },
        {
            id: 75,
            question: '평수(공급면적)를 입력해주세요.',
            input: true,
            next: 'fv6',
        },
        {
            id: 76,
            question: '시공 희망일을 선택해주세요.',
            options: [
                { optionId: 761, label: '협의 가능해요' },
                { optionId: 762, label: '가능한 빨리 진행하고 싶어요' },
                { optionId: 763, label: '일주일 이내로 진행하고 싶어요' },
                { optionId: 764, label: '원하는 날짜가 있어요' },
                { optionId: 765, label: '기타' },
            ],
            next: 'fv7',
        },
        {
            id: 77,
            question: '지역을 선택해주세요.',
            input: true,
            next: 'fv8',
        },
        {
            id: 78,
            question: '시공 관련 문의사항을 알려주세요.',
            options: [
                { optionId: 781, label: '고수와 상담 시 논의할게요' },
                { optionId: 782, label: '지금 작성할게요' },
            ],
        },
    ],

    // ---------------------------
    // 🔸 층간소음매트 시공 flow (Q ID: 81 ~ 87)
    floor_soundproof: [
        {
            id: 81,
            question: '어떤 시공을 원하시나요?',
            options: [
                { optionId: 811, label: '층간 소음매트' },
                { optionId: 812, label: '미끄럼방지 매트' },
                { optionId: 813, label: '반려동물 매트' },
                { optionId: 814, label: '스포츠 매트' },
                { optionId: 815, label: '기타' },
            ],
            next: 'fs2',
        },
        {
            id: 82,
            question: '어디에 시공을 원하시나요?',
            options: [
                { optionId: 821, label: '집 전체' },
                { optionId: 822, label: '거실' },
                { optionId: 823, label: '주방' },
                { optionId: 824, label: '복도' },
                { optionId: 825, label: '방' },
                { optionId: 826, label: '상업공간' },
                { optionId: 827, label: '기타' },
            ],
            next: 'fs3',
        },
        {
            id: 83,
            question: '시공 공간의 면적을 알려주세요.',
            input: true,
            next: 'fs4',
        },
        {
            id: 84,
            question: '해당되는 사항을 선택해주세요.',
            options: [
                { optionId: 841, label: '특이사항 없음' },
                { optionId: 842, label: '복층' },
                { optionId: 843, label: '베란다 확장' },
            ],
            next: 'fs5',
        },
        {
            id: 85,
            question: '서비스를 받고 싶은 날짜는 언제인가요?',
            options: [
                { optionId: 851, label: '협의 가능해요' },
                { optionId: 852, label: '가능한 빨리 진행하고 싶어요' },
                { optionId: 853, label: '일주일 이내로 진행하고 싶어요' },
                { optionId: 854, label: '원하는 날짜가 있어요' },
                { optionId: 855, label: '기타' },
            ],
            next: 'fs6',
        },
        {
            id: 86,
            question: '서비스를 받고 싶은 지역이 어디인가요?',
            input: true,
            next: 'fs7',
        },
        {
            id: 87,
            question: '시공 관련 문의사항을 알려주세요.',
            options: [
                { optionId: 871, label: '고수와 상담 시 논의할게요' },
                { optionId: 872, label: '지금 작성할게요' },
            ],
        },
    ],

    // ---------------------------
    // 🔸 카페트 시공 flow (Q ID: 91 ~ 98)
    floor_carpet: [
        {
            id: 91,
            question: '어떤 카페트를 원하시나요?',
            options: [
                { optionId: 911, label: '롤 카페트' },
                { optionId: 912, label: '타일 카페트' },
                { optionId: 913, label: '고수와 상담 후 결정할게요' },
                { optionId: 914, label: '기타' },
            ],
            next: 'fc2',
        },
        {
            id: 92,
            question: '현재 바닥재를 알려주세요.',
            options: [
                { optionId: 921, label: '롤 카페트' },
                { optionId: 922, label: '타일 카페트' },
                { optionId: 923, label: '데코타일' },
                { optionId: 924, label: '폴리싱 타일' },
                { optionId: 925, label: '강마루' },
                { optionId: 926, label: '장판' },
                { optionId: 927, label: '시멘트' },
                { optionId: 928, label: '잘 모르겠어요' },
                { optionId: 929, label: '기타' },
            ],
            next: 'fc3',
        },
        {
            id: 93,
            question: '어떤 서비스를 원하시나요?',
            options: [
                { optionId: 931, label: '신규 시공' },
                { optionId: 932, label: '전체 교체' },
                { optionId: 933, label: '일부 교체' },
                { optionId: 934, label: '기타' },
            ],
            next: 'fc4',
        },
        {
            id: 94,
            question: '시공 공간의 면적을 알려주세요.',
            input: true,
            next: 'fc5',
        },
        {
            id: 95,
            question: '시공 시, 공간에 짐이 있는 상태인가요?',
            options: [
                { optionId: 951, label: '네' },
                { optionId: 952, label: '아니요' },
            ],
            next: 'fc6',
        },
        {
            id: 96,
            question: '시공 예정일이 언제인가요?',
            options: [
                { optionId: 961, label: '협의 가능해요' },
                { optionId: 962, label: '가능한 빨리 진행하고 싶어요' },
                { optionId: 963, label: '일주일 이내로 진행하고 싶어요' },
                { optionId: 964, label: '원하는 날짜가 있어요' },
                { optionId: 965, label: '기타' },
            ],
            next: 'fc7',
        },
        {
            id: 97,
            question: '시공 지역을 선택해주세요.',
            input: true,
            next: 'fc8',
        },
        {
            id: 98,
            question: '시공 관련 문의사항을 알려주세요.',
            options: [
                { optionId: 981, label: '고수와 상담 시 논의할게요' },
                { optionId: 982, label: '지금 작성할게요' },
            ],
        },
    ],

    // ---------------------------
    // 🔸 타일 시공 flow (Q ID: 101 ~ 108)
    floor_tile: [
        {
            id: 101,
            question: '어떤 공간인가요?',
            options: [
                { optionId: 1011, label: '주거공간' },
                { optionId: 1012, label: '상업공간' },
            ],
            next: 'ft2',
        },
        {
            id: 102,
            question: '시공 공간을 선택해주세요.',
            options: [
                { optionId: 1021, label: '주방' },
                { optionId: 1022, label: '화장실' },
                { optionId: 1023, label: '현관' },
                { optionId: 1024, label: '거실/홈' },
                { optionId: 1025, label: '베란다/테라스' },
                { optionId: 1026, label: '복도' },
                { optionId: 1027, label: '상업공간 바닥/벽' },
                { optionId: 1028, label: '건물 외벽' },
                { optionId: 1029, label: '기타' },
            ],
            next: 'ft3',
        },
        {
            id: 103,
            question: '시공 방식을 선택해주세요.',
            options: [
                { optionId: 1031, label: '덧방 시공' },
                { optionId: 1032, label: '부분 교체' },
                { optionId: 1033, label: '전체 교체' },
                { optionId: 1034, label: '신규 시공' },
            ],
            next: 'ft4',
        },
        {
            id: 104,
            question: '시공 면적을 입력해주세요.',
            input: true,
            next: 'ft5',
        },
        {
            id: 105,
            question: '참고 사진이 있다면 첨부해주세요.',
            input: true,
            next: 'ft6',
        },
        {
            id: 106,
            question: '시공 희망일을 선택해주세요.',
            options: [
                { optionId: 1061, label: '협의 가능해요' },
                { optionId: 1062, label: '가능한 빨리 진행하고 싶어요' },
                { optionId: 1063, label: '일주일 이내로 진행하고 싶어요' },
                { optionId: 1064, label: '원하는 날짜가 있어요' },
                { optionId: 1065, label: '기타' },
            ],
            next: 'ft7',
        },
        {
            id: 107,
            question: '지역을 선택해주세요.',
            input: true,
            next: 'ft8',
        },
        {
            id: 108,
            question: '서비스 관련 희망사항을 알려주세요.',
            options: [
                { optionId: 1081, label: '고수와 상담 시 논의할게요' },
                { optionId: 1082, label: '지금 작성할게요' },
            ],
        },
    ],
} as const;
