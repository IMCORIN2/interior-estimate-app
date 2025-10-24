export default function LocationModal() {
    return (
        <>
            <h4>지역선택</h4>
            <div className="dropdown-location">
                <select>
                    <option>시/도 선택</option>
                    <option>서울특별시</option>
                    <option>경기도</option>
                    <option>인천광역시</option>
                    <option>부산광역시</option>
                    <option>충청북도</option>
                    <option>충청남도</option>
                    <option>경상북도</option>
                    <option>경상남도</option>
                    <option>전라북도</option>
                    <option>전라남도</option>
                </select>
            </div>
            <div className="dropdown-location">
                <select>
                    <option>군/구 선택</option>
                </select>
            </div>
        </>
    );
}
