import React, { useState, useRef } from "react";
import axios from "axios";
import "./UploadPage.css"

function CrosshairUpload() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [code, setCode] = useState("");
    const [image, setImage] = useState(null);
    const [fileName, setFileName] = useState("");
    const [imagePreview, setImagePreview] = useState('');
    const fileInputRef = useRef(null);


  // 파일이 변경되었을 때 호출되는 함수
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file); // 파일을 상태로 저장
      setFileName(file.name); // 파일 이름을 상태로 저장

      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }


  };






    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("code", code);
        formData.append("image", image);
    
        try {
            const response = await axios.post("http://34.226.197.108:8080/api/crosshairs", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            // 성공적으로 업로드 되었을 때 alert로 메시지 출력
            alert("Upload Sucsess");
            setName("");
            setDescription("");
            setCode("");
            setImage(null); // 이미지 파일도 초기화
            setFileName(''); // 파일 이름 초기화
            setImagePreview(''); // 미리보기 이미지 초기화
            if (fileInputRef.current) {
                fileInputRef.current.value = null; // 파일 입력란 초기화
              }
        } catch (error) {
            // 업로드 실패 시 alert로 에러 메시지 출력
            alert("Upload Failed: " + error.message);
        }

    };
    

    return (
        <div className="upload-container">
            <div className="upload-card">
                <h2>Crosshair Upload</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Code</label>
                        <input
                            type="text"
                            placeholder="Code"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      
                        {imagePreview && (
                            <img
                            src={imagePreview}
                            alt="Image Preview"
                            style={{
                                width: '100px',
                                height: '100px',
                                objectFit: 'cover',
                                marginRight: '20px',
                            }}
                            />
                        )}
                        </div>
                       
                        <input type="text" class="upload-name" value={fileName}  disabled="disabled"/>
                        
                        <label className="input-file-button" for="image">Select Image</label>
                        
                        <input
                            type="file"
                            id="image"
                            ref={fileInputRef}
                            style={{display:"none"}}
                            onChange={handleImageChange}
                            required
                        />
                        
                        
                        

                    </div>


                    <button type="submit" className="upload-button">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CrosshairUpload;
