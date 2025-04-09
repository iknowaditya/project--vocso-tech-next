// import { useUser } from "@auth0/nextjs-auth0/client";
// import { useEffect } from "react";

// export default function Home() {
//   const { user, error, isLoading } = useUser();

//   useEffect(() => {
//     const sendTokenToBackend = async () => {
//       if (user) {
//         console.log("User logged in:", user);
//         try {
//           // Fetch the access token from /api/auth/access-token (custom endpoint)
//           const response = await fetch("/api/auth/access-token", {
//             headers: { "Content-Type": "application/json" },
//           });
//           const { accessToken } = await response.json();
//           console.log("Access Token:", accessToken);

//           if (accessToken) {
//             console.log("Sending to backend:", {
//               token: accessToken,
//               email: user.email,
//             });
//             const backendResponse = await fetch(
//               `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/callback`,
//               {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ token: accessToken, email: user.email }),
//               }
//             );
//             const result = await backendResponse.json();
//             console.log("Backend response:", result);
//           } else {
//             console.log("No access token received");
//           }
//         } catch (err) {
//           console.error("Error in sendTokenToBackend:", err);
//         }
//       }
//     };
//     sendTokenToBackend();
//   }, [user]);

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>{error.message}</div>;

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>Auth0 Login Demo</h1>
//       {user ? (
//         <div>
//           <p>Welcome, {user.email}!</p>
//           <a href="/api/auth/logout">Log Out</a>
//         </div>
//       ) : (
//         <a href="/api/auth/login">Log In</a>
//       )}
//     </div>
//   );
// }

import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect } from "react";

export default function Home() {
  const { user, error, isLoading } = useUser();

  useEffect(() => {
    const sendTokenToBackend = async () => {
      if (user) {
        console.log("User logged in:", user);
        try {
          const response = await fetch("/api/auth/access-token", {
            headers: { "Content-Type": "application/json" },
          });
          const { accessToken } = await response.json();
          console.log("Access Token:", accessToken);

          if (accessToken) {
            console.log("Sending to backend:", {
              token: accessToken,
              email: user.email,
            });
            const backendResponse = await fetch(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/callback`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token: accessToken, email: user.email }),
              }
            );
            const result = await backendResponse.json();
            console.log("Backend response:", result);
          }
        } catch (err) {
          console.error("Error in sendTokenToBackend:", err);
        }
      }
    };
    sendTokenToBackend();
  }, [user]);

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-teal-900">
        <div className="text-center space-y-4">
          <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-teal-400 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="text-xl font-medium text-teal-100">Authenticating...</p>
          <p className="text-sm text-slate-300">
            Securely connecting to your account
          </p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-rose-900">
        <div className="bg-slate-800 p-8 rounded-xl shadow-2xl max-w-md w-full border border-slate-700">
          <div className="text-rose-400 mb-4 flex justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-14 w-14"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-teal-200 mb-2 text-center">
            Authentication Error
          </h1>
          <p className="text-slate-300 mb-6 text-center">{error.message}</p>
          <div className="flex justify-center">
            <a
              href="/api/auth/login"
              className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-teal-500/20"
            >
              Try Again
            </a>
          </div>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-teal-900 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md bg-slate-800 rounded-xl shadow-2xl overflow-hidden border border-slate-700">
        <div className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-teal-400 mb-2">
              Secure Auth
            </h1>
            <p className="text-slate-400">Protected authentication portal</p>
          </div>

          {user ? (
            <div className="text-center">
              <div className="flex justify-center mb-6">
                {user.picture ? (
                  <img
                    src={user.picture}
                    alt={user.name}
                    className="w-24 h-24 rounded-full border-4 border-teal-500/30 object-cover shadow-lg"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-teal-900/50 flex items-center justify-center text-teal-300 text-3xl font-bold border border-teal-500/30">
                    {user.email?.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <h2 className="text-xl font-semibold text-teal-200 mb-1">
                Welcome back
              </h2>
              <p className="text-slate-300 mb-6">{user.email}</p>
              <div className="flex justify-center">
                <a
                  href="/api/auth/logout"
                  className="px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-rose-500/20"
                >
                  Sign Out
                </a>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className="mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 mx-auto text-teal-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-teal-200 mb-4">
                Secure Access
              </h2>
              <a
                href="/api/auth/login"
                className="block w-full px-6 py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-teal-500/30"
              >
                Login / Register
              </a>
            </div>
          )}
        </div>

        <div className="bg-slate-900/50 px-6 py-4 border-t border-slate-700">
          <p className="text-xs text-slate-500 text-center">
            Secured with Auth0 • Next.js • Tailwind CSS
          </p>
        </div>
      </div>
    </div>
  );
}
