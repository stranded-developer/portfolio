"use client";

import { useEffect } from "react";

const IOS_URL = "https://apps.apple.com/id/app/eatzy/id6758982352";
const ANDROID_URL =
  "https://play.google.com/store/apps/details?id=com.eatzy.eatzy_user";

export default function DownloadPage() {
  useEffect(() => {
    const ua = navigator.userAgent || navigator.vendor;

    const isAndroid = /android/i.test(ua);
    const isIOS =
      /iPad|iPhone|iPod/.test(ua) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

    if (isAndroid) {
      window.location.replace(ANDROID_URL);
      return;
    }

    if (isIOS) {
      window.location.replace(IOS_URL);
      return;
    }
  }, []);

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        background: "#fff7ed",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: 420,
          width: "100%",
          background: "white",
          borderRadius: 20,
          padding: 28,
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: 28,
            marginBottom: 12,
            color: "#ea580c",
            fontWeight: 700,
          }}
        >
          Download Eatzy
        </h1>

        <p
          style={{
            fontSize: 16,
            color: "#444",
            marginBottom: 24,
            lineHeight: 1.5,
          }}
        >
          Opening your app store...
          <br />
          Tap below if it does not redirect automatically.
        </p>

        <div style={{ display: "grid", gap: 12 }}>
          <a
            href={IOS_URL}
            style={{
              display: "block",
              padding: "14px 18px",
              borderRadius: 12,
              background: "#ea580c",
              color: "white",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            Download on App Store
          </a>

          <a
            href={ANDROID_URL}
            style={{
              display: "block",
              padding: "14px 18px",
              borderRadius: 12,
              background: "#fb923c",
              color: "white",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            Download on Google Play
          </a>
        </div>
      </div>
    </main>
  );
}