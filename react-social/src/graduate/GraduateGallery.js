import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'


function GraduateGallery() {
    const [graduate, setGraduate] = useState([{ id: 'ksh', memberId: 41, name: '권순후', bg: "http://www.10000img.com/rimg2/bif44.jpg" }, { id: 'pjh',memberId: 45, name: '박재현', bg:"http://www.10000img.com/rimg2/oxe02.jpg" }, { id: 'jbj',memberId:45 ,name: '조봉준',  bg:"http://www.10000img.com/rimg2/nyf23.jpg" }, { id: 'jjh',memberId:47, name: '정지훈', bg: "http://www.10000img.com/rimg3/vvy47.jpg" }])
 
    return (
        <div className="container" style={{ height: "80vh" }}>
            <div className="gallery_title" style={{ display: 'flex', flexDirection: 'row', alignItems:'center' }}>
                <span>졸업전</span>
                <div>
                    <p>
                        축하합니다
                        </p>
                    <p>
                        n기 졸업전을
                        </p>
                </div>
            </div>
            <div className="gallery_container" style={{ display: "flex", flexDirection: "row", height: '100%' }}>
                {graduate.map((student, i) => 
                <div key={student.id} className="gallery_content" style={{ display: 'flex', width: '25%', height: '100%', backgroundImage:`url(${student.bg})`, justifyContent: 'center', alignItems: 'center', boxShadow:"0px 0px 0px 2000px inset rgba(0, 0, 0, 0.7)" }}>
                    <NavLink to={`/graduate/${student.id}`}>{student.memberId}기 {student.name}</NavLink>
                </div>

                )}
            </div>
        </div>
    )

}

export default GraduateGallery