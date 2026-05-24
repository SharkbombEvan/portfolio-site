"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        setError("Incorrect passphrase. Try again.");
        setPassword("");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8f6f1",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Georgia', serif",
      }}
    >
      {/* Wordmark */}
      <div
        style={{
          marginBottom: 48,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 22,
            fontWeight: "bold",
            letterSpacing: "0.05em",
            color: "#1a1a1a",
            marginBottom: 6,
          }}
        >
          SHARKBOMB AUDIO
        </div>
        <div
          style={{
            fontSize: 11,
            letterSpacing: "0.2em",
            color: "#888",
            textTransform: "uppercase",
          }}
        >
          Admin Access
        </div>
      </div>

      {/* Card */}
      <div
        style={{
          background: "#fff",
          border: "1px solid #ddd",
          padding: "40px 48px",
          width: "100%",
          maxWidth: 380,
        }}
      >
        <form onSubmit={handleSubmit}>
          <label
            htmlFor="password"
            style={{
              display: "block",
              fontSize: 11,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#888",
              marginBottom: 10,
            }}
          >
            Passphrase
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
            autoComplete="current-password"
            placeholder="Enter passphrase"
            style={{
              width: "100%",
              padding: "10px 12px",
              fontSize: 15,
              fontFamily: "'Georgia', serif",
              border: error ? "1px solid #c0392b" : "1px solid #ddd",
              background: "#f8f6f1",
              color: "#1a1a1a",
              outline: "none",
              boxSizing: "border-box",
              marginBottom: error ? 10 : 20,
              transition: "border-color 0.15s ease",
            }}
            onFocus={(e) =>
              (e.currentTarget.style.borderColor = error ? "#c0392b" : "#1a1a1a")
            }
            onBlur={(e) =>
              (e.currentTarget.style.borderColor = error ? "#c0392b" : "#ddd")
            }
          />

          {error && (
            <div
              style={{
                fontSize: 12,
                color: "#c0392b",
                marginBottom: 20,
                letterSpacing: "0.02em",
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            style={{
              width: "100%",
              padding: "11px 0",
              background: loading || !password ? "#ccc" : "#1a1a1a",
              color: "#f8f6f1",
              border: "none",
              fontSize: 12,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              fontFamily: "'Georgia', serif",
              cursor: loading || !password ? "not-allowed" : "pointer",
              transition: "background 0.15s ease",
            }}
            onMouseEnter={(e) => {
              if (!loading && password)
                e.currentTarget.style.background = "#333";
            }}
            onMouseLeave={(e) => {
              if (!loading && password)
                e.currentTarget.style.background = "#1a1a1a";
            }}
          >
            {loading ? "Verifying…" : "Enter"}
          </button>
        </form>
      </div>
    </div>
  );
}
