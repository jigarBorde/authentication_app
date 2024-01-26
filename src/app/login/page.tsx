"use client"


import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

const LoginPage = () => {
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async () => {
        try {
            setLoading(true);
            // Assuming you have a login API endpoint at "/api/users/login"
            const response = await axios.post("/api/users/login", credentials);
            console.log("Login success", response.data);
            // Redirect to the home page after successful login
            router.push("/");
        } catch (error: any) {
            console.log("Login failed", error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading ? "Logging In" : "Login"}</h1>
            <hr />
            <label htmlFor="email">Email</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="email"
                type="text"
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                placeholder="Email"
            />
            <label htmlFor="password">Password</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="password"
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                placeholder="Password"
            />
            <button
                onClick={handleLogin}
                className={`p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none ${loading ? "text-gray-500 cursor-not-allowed opacity-50" : "focus:border-gray-600"
                    }`}
                disabled={loading}
                style={{ opacity: loading ? 0.5 : 1 }}
            >
                {loading ? "Logging In" : "Login"}
            </button>
            <Link href="/signup">Register</Link>
        </div>
    );
};

export default LoginPage;
