// api/proxy.ts - Vercel Edge Function Proxy
export const config = {
  runtime: 'edge',
};

export default async function handler(request: Request) {
  const url = new URL(request.url);
  const path = url.pathname.replace(/^\/api\//, '');
  const search = url.search;

  const backendUrl = process.env.BACKEND_URL || "";
  
  const targetUrl = new URL(
    path + search,
    backendUrl.endsWith('/') ? backendUrl : `${backendUrl}/`
  );

  return fetch(targetUrl.toString(), {
    method: request.method,
    headers: request.headers,
    body: request.body,
    // @ts-ignore
    duplex: 'half', 
  });
}
