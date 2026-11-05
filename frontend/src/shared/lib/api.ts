export async function api<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch("/api/v1" + path, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "elara-web",
      ...options.headers,
    },
    credentials: "same-origin",
  });
  const data = await response
    .json()
    .catch(() => ({ message: "The server could not be reached" }));
  if (!response.ok)
    throw new Error(
      typeof data.message === "string"
        ? data.message
        : "Something went wrong. Please try again.",
    );
  return data as T;
}
