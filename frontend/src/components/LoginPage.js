import "./LoginPage.css"
import React, { useState } from "react";
import axios from "axios";// 스타일링을 위한 CSS 파일 추가
import { useNavigate } from "react-router-dom";  // useNavigate import

function LoginPage() {
    const [username, setUsername] = useState("");  // 아이디 상태 관리
    const [password, setPassword] = useState("");  // 비밀번호 상태 관리
    const navigate = useNavigate();  // useNavigate 훅 초기화

    const handleSubmit = async (e) => {
        e.preventDefault();  // 폼 제출 시 새로고침 방지

        try {
            // 로그인 API 호출
            const response = await axios.post("http://34.226.197.108:8080/api/auth/login", {
                username,
                password,
            });

            // 로그인 성공 시
            if (response.data.token) {
                // JWT 토큰을 로컬 스토리지에 저장
                localStorage.setItem("token", response.data.token);
                alert("로그인 성공!");

                // /codelist 페이지로 리디렉션
                navigate("/codelist");
            }
        } catch (error) {
            alert("로그인 실패. 아이디와 비밀번호를 확인해주세요.");
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2>Valorant Crosshair</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>아이디</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>비밀번호</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="login-button">
                        로그인
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
