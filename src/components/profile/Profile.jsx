import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const authToken = localStorage.getItem("token");
        
        if (!authToken) {
            navigate("/login");
            return;
        }

        fetch(`${import.meta.env.VITE_baseUrl}/api/accounts/user/`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${authToken}`,
            },
        })
        .then(res => {
            if (res.status === 403) {
                throw new Error("Forbidden");
            }
            if (!res.ok) {
                throw new Error("Network response was not ok");
            }
            return res.json();
        })
        .then(result => {
            localStorage.setItem("uid", result.id);
            localStorage.setItem("userType", result.user_type);
            localStorage.setItem("username", result.username);
        })
        .catch(error => {
            console.error("Error fetching user data:", error);
            navigate("/login");
        });
    }, []);

    const username = localStorage.getItem("username")
    
    return (
        <div className="mt-16 ml-6 text-green-300">
           Hi! {username}, You are successfully logged in.
        </div>
    );
};

export default Profile;
