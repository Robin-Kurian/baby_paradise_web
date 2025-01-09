// import { createServerClient } from "@supabase/ssr";
// import { type NextRequest, NextResponse } from "next/server";

// export const updateSession = async (request: NextRequest) => {
//   // This `try/catch` block is only here for the interactive tutorial.
//   // Feel free to remove once you have Supabase connected.
//   try {
//     // Create an unmodified response
//     let response = NextResponse.next({
//       request: {
//         headers: request.headers,
//       },
//     });

//     const supabase = createServerClient(
//       process.env.NEXT_PUBLIC_SUPABASE_URL!,
//       process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//       {
//         cookies: {
//           getAll() {
//             return request.cookies.getAll();
//           },
//           setAll(cookiesToSet) {
//             cookiesToSet.forEach(({ name, value }) =>
//               request.cookies.set(name, value),
//             );
//             response = NextResponse.next({
//               request,
//             });
//             cookiesToSet.forEach(({ name, value, options }) =>
//               response.cookies.set(name, value, options),
//             );
//           },
//         },
//       },
//     );

//     // This will refresh session if expired - required for Server Components
//     // https://supabase.com/docs/guides/auth/server-side/nextjs
//     const user = await supabase.auth.getUser();

//     // protected routes
//     if (request.nextUrl.pathname.startsWith("/protected") && user.error) {
//       return NextResponse.redirect(new URL("/sign-in", request.url));
//     }

//     if (request.nextUrl.pathname === "/" && !user.error) {
//       return NextResponse.redirect(new URL("/protected", request.url));
//     }

//     return response;
//   } catch (e) {
//     return NextResponse.next({
//       request: {
//         headers: request.headers,
//       },
//     });
//   }
// };

import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

import { getUserRole } from "@/lib/get-user-role";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  // Create a Supabase client
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Get the current user from Supabase
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Get the user's role using the custom getUserRole function
  const role = await getUserRole();
  console.log("middleware: role", role);
  // Redirect non-admin users trying to access admin pages to the home page
  if (
    user &&
    role !== "admin" &&
    request.nextUrl.pathname.startsWith("/admin")
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  // Redirect unauthenticated users to sign-in page
  if (
    !user &&
    !request.nextUrl.pathname.startsWith("/sign-in") &&
    !request.nextUrl.pathname.startsWith("/auth")
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/sign-in";
    url.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  // Redirect authenticated users attempting to access the sign-in page to the home page
  if (user && request.nextUrl.pathname.startsWith("/sign-in")) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
