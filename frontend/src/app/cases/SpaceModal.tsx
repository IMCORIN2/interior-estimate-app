'use client';

export default function SpaceModal() {
    const spaceList = [
        '거실',
        '욕실',
        '침실',
        '키친',
        '드레스룸',
        '현관',
        '발코니',
        '아이방',
        '서재',
        '멀티룸',
        '다이닝룸',
    ];

    return spaceList.map((space) => (
        <label key={space} style={{ display: 'block' }}>
            <input type="checkbox" />
            {space}
        </label>
    ));
}
