export async function fetchNui<T = unknown>(event: string, data?: unknown): Promise<T> {
  const resp = await fetch(`https://${GetParentResourceName()}/${event}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    body: JSON.stringify(data ?? {}),
  });
  return resp.json();
}