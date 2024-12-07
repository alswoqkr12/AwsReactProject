import React, { useEffect, useState } from 'react';
import './CodeListPage.css';

const CodeListPage = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);  // 로딩 상태
  const [error, setError] = useState(null);          // 오류 상태

  useEffect(() => {
    // API 호출
    fetch('http://98.82.41.70:8080/api/images')
      .then(response => response.json())
      .then(data => {
	setImages(data);  // 이미지 데이터 저장
        setIsLoading(false);  // 로딩 상태 false로 변경
      })
      .catch(error => {
        setError(error);  // 오류 처리
        setIsLoading(false);  // 로딩 상태 false로 변경
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;  // 로딩 중에는 텍스트 표시
  }

  if (error) {
    return <div>Error: {error.message}</div>;  // 오류 발생 시 오류 메시지 표시
  }

  return (
    <div className="image-list-container">
      <h1>이미지 리스트</h1>
      <div className="image-grid">
        {images.length > 0 ? (
          images.map((image) => (
            <div key={image.id} className="image-item">
              <img 
                src={`http://98.82.41.70:8080/images/${image.imageUrl}`} 
                alt={`Image ${image.id}`} 
                className="image" 
              />
            </div>
          ))
        ) : (
          <p>이미지가 없습니다.</p>
        )}
      </div>
    </div>
  );
}

export default CodeListPage;
