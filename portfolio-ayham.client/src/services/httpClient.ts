const BACKEND_URL = import.meta.env.VITE_BACKEND_URL as string | undefined;

if (!BACKEND_URL) {
  // Optional: log a warning so it's visible during development
  // eslint-disable-next-line no-console
  console.warn("VITE_BACKEND_URL is not defined. HTTP requests may fail.");
}

const API_BASE_URL = `${BACKEND_URL ?? ""}/api`;

export interface HttpResponse<T> {
  data: T;
  status: number;
  headers: Headers;
}

class HttpClient {
  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl.replace(/\/$/, "");
  }

  private async request<T>(path: string, options: RequestInit = {}): Promise<HttpResponse<T>> {
    const url = `${this.baseUrl}${path}`;

    const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : null;

    const headers = new Headers(options.headers || {});

    if (!headers.has("Content-Type") && options.body) {
      headers.set("Content-Type", "application/json");
    }

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    const response = await fetch(url, { ...options, headers });

    const contentType = response.headers.get("Content-Type") ?? "";
    const text = await response.text();

    let data: unknown = text;

    if (text && contentType.includes("application/json")) {
      try {
        data = JSON.parse(text);
      } catch {
        // If JSON parsing fails, fall back to raw text
      }
    } else if (!text) {
      data = null;
    }

    if (!response.ok) {
      const message =
        (data && typeof data === "object" && "message" in (data as any) && (data as any).message) ||
        `Request failed with status ${response.status}`;

      const error = new Error(String(message));
      (error as any).status = response.status;
      (error as any).data = data;
      throw error;
    }

    return {
      data: data as T,
      status: response.status,
      headers: response.headers,
    };
  }

  get<T>(path: string): Promise<HttpResponse<T>> {
    return this.request<T>(path, { method: "GET" });
  }

  post<T>(path: string, body?: unknown): Promise<HttpResponse<T>> {
    return this.request<T>(path, {
      method: "POST",
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  }

  put<T>(path: string, body?: unknown): Promise<HttpResponse<T>> {
    return this.request<T>(path, {
      method: "PUT",
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  }

  delete<T = void>(path: string): Promise<HttpResponse<T>> {
    return this.request<T>(path, { method: "DELETE" });
  }
}

export const httpClient = new HttpClient(API_BASE_URL);

export type { HttpClient };
