"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

const SignupPage = () => {
    const router = useRouter();
    const config = {
        headers: {
            "content-type": "application/json"
        },
        withCredentials: true,
    }

    const [user, setUser] = useState({
        email: "",
        password: "",
        username: "",
    });
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const isEmailValid = (email: any) => {
        // Basic email validation using a simple regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSignup = async () => {
        try {
            setError(""); // Reset error state
            setLoading(true);

            // Validation for empty fields
            if (!user.username || !user.email || !user.password) {
                setError("Please fill in all fields");
                return;
            }

            // Validate email format
            if (!isEmailValid(user.email)) {
                setError("Please enter a valid email address");
                return;
            }

            const response = await axios.post("/api/users/signup", user, config);
            console.log("Signup success", response.data);
            router.push("/login");
        } catch (error: any) {
            setError(error.response?.data?.error || "Signup failed. Please try again.");
            console.log("Signup failed", error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const { email, password, username } = user;
        setButtonDisabled(!(username && email && password && isEmailValid(email)));
    }, [user]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading ? "Processing" : "SignUp"}</h1>
            <hr />
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <label htmlFor="username">Username</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="username"
                type="text"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                placeholder="Username"
            />
            <label htmlFor="email">Email</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="email"
                type="text"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="Email"
            />
            <label htmlFor="password">Password</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="Password"
            />
            <button
                onClick={handleSignup}
                className={`p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none ${buttonDisabled
                    ? "text-gray-500 cursor-not-allowed opacity-50"
                    : "focus:border-gray-600"
                    }`}
                disabled={buttonDisabled}
            >
                Signup
            </button>
            <Link href="/login">Login</Link>
        </div>
    );
};

export default SignupPage;
