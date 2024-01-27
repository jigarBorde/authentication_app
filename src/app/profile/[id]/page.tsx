"use client"
import axios from "axios";
import { useRouter } from "next/navigation";

const ProfilePage = ({ params }: any) => {
    const config = {
        headers: {
            "content-type": "application/json",
        },
        withCredentials: true,
    };
    const router = useRouter();

    const logoutHandler = async () => {
        try {
            const res = await axios.get('/api/users/logout', config);
            router.push('/login');
        } catch (error: any) {
            console.log(error);
            alert(error.message);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <h1 className="text-2xl mb-4">Hello from dynamic {params.id}</h1>
            <hr className="w-full mb-4" />
            <button
                onClick={logoutHandler}
                className="bg-blue-500 text-white py-2 px-4 rounded focus:outline-none hover:bg-blue-700"
            >
                Logout
            </button>
        </div>
    );
};

export default ProfilePage;
