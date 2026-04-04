export const config = {
  runtime: 'edge',
};

export default async function handler(request: Request) {
  const url = new URL(request.url);
  const path = url.searchParams.get('path') || '';
  
  const searchParams = new URLSearchParams(url.search);
  searchParams.delete('path');
  const search = searchParams.toString();

  const backendUrl = process.env.BACKEND_URL || "";
  
  const targetUrl = new URL(
    path + (search ? `?${search}` : ''),
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
