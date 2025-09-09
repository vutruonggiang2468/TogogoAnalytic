"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

export default function GoogleCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get("code");
    if (!code) return;

    (async () => {
      try {
        const { data } = await axios.post(`/api/auth/google/callback`, { code });

        // Hỗ trợ nhiều kiểu phản hồi: {token}, {access_token}, {data: { token }}...
        const token =
          data?.token ||
          data?.access_token ||
          data?.id_token ||
          data?.data?.token ||
          data?.data?.access_token;

        if (token) {
          localStorage.setItem("token", token);
          try {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          } catch {}
        }

        router.push("/");
      } catch (error) {
        console.error("Đăng nhập Google thất bại:", error);
        router.push("/login");
      }
    })();
  }, [searchParams, router]);

  return <p>Đang xử lý đăng nhập Google...</p>;
}

