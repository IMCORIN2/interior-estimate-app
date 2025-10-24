// chatbotFlow.ts
export const chatbotFlow = [
    {
        id: 1,
        question: '어떤 시공을 원하시나요?',
        options: ['도배', '바닥', '몰딩', '주방', '욕실', '샷시', '베란다', '방문', '현관문'],
        multiple: true,
    },
    {
        id: 2,
        question: '시공이 필요한 곳을 선택해주세요.',
        options: ['거실', '주방', '방', '천장'],
        multiple: false,
    },
    {
        id: 3,
        question: '어떤 재질의 벽지를 원하시나요?',
        options: ['합지', '실크', '친환경', '기타'],
        multiple: false,
    },
];
