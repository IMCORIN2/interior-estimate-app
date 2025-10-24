'use client';

import { useState } from 'react';
import './company.css';

export default function CompanyPage() {
    // 시공사 샘플 데이터
    const [companies] = useState([
        {
            id: 1,
            name: 'LSW 건설',
            location: '대전 대덕구',
            explaination: '종합인테리어를 전문적으로 시공부터 A/S까지 책임시공하는 업체입니다.',
        },
        {
            id: 2,
            name: '루시드 디자인',
            location: '경기 부천시',
            explaination: '매 프로젝트마다 해당 공간의 특성을 고려한 새로운 스타일을 디자인합니다.',
        },
        {
            id: 3,
            name: '명현건축디자인',
            location: '제주 제주시',
            explaination: '안녕하세요. 명현건축디자인입니다.',
        },
        {
            id: 4,
            name: '머문디자인',
            location: '경기 시흥시',
            explaination: '머문, 머물고 싶은 공간을 만들다',
        },
        {
            id: 5,
            name: '두웰 디자인',
            location: '서울 강남구',
            explaination: '두웰 디자인은 고객이 원하는 디자인에 최대한 가까이 다가갈 수 있도록 도와드립니다.',
        },
        {
            id: 6,
            name: '강우인테리어',
            location: '인천 미추홀구',
            explaination: '안녕하세요. 강우인테리어입니다.',
        },
    ]);

    return (
        <main className="company-container" style={{ padding: '2rem' }}>
            <input placeholder="시공사명, 지역명 입력"></input>

            {/* 별점순 */}
            <h1>추천 시공사 TOP3</h1>
            <div className="grid-container">
                {/* 3개만 보이도록 설정 */}
                {companies.slice(0, 3).map((data) => {
                    return (
                        <div key={data.id} className="company-card">
                            {/* 나중에 api 이미지로 대체(이미지 주소로 삽입) */}
                            <img src={`/company${data.id}.jpg`} alt={data.name} className="case-image" />
                            <div className="case-info">
                                <div>
                                    <span>{data.location}</span>
                                </div>

                                <h4>{data.name}</h4>
                                <p>{data.explaination}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
            {/* 계약순 */}
            <h1>인기 시공사 TOP3</h1>
            <div className="grid-container">
                {/* 3개만 보이도록 설정 */}
                {companies.slice(3, 6).map((data) => {
                    return (
                        <div key={data.id} className="company-card">
                            {/* 나중에 api 이미지로 대체(이미지 주소로 삽입) */}
                            <img src={`/company${data.id}.jpg`} alt={data.name} className="case-image" />
                            <div className="case-info">
                                <div>
                                    <span>{data.location}</span>
                                </div>

                                <h4>{data.name}</h4>
                                <p>{data.explaination}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </main>
    );
}
