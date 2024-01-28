"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail = async () => {
        try {
            await axios.post('/api/users/verifyemail', { token });
            setVerified(true);
        } catch (error: any) {
            setError(true);
            console.log(error.response.data);
        }
    };

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);

    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail();
        }
    }, [token]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
            <h1 className="text-4xl text-blue-500 font-bold mb-4">Verify Email</h1>
            <h2 className="p-2 bg-orange-500 text-black">{token ? `${token}` : "no token"}</h2>

            {verified && (
                <div className="mt-4">
                    <h2 className="text-2xl text-green-500 font-bold mb-2">Email Verified</h2>
                    <Link href="/login">
                        <a className="text-blue-500 underline">Login</a>
                    </Link>
                </div>
            )}
            {error && (
                <div className="mt-4">
                    <h2 className="text-2xl bg-red-500 text-white p-2 rounded-md font-bold">Error</h2>
                </div>
            )}
        </div>
    );
}
