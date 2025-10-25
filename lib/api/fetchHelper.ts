export async function fetchWithError<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(url, options);

  if (!res.ok) {
    let errorMessage = `Request failed dengan status ${res.status}`;

    try {
      const text = await res.text();
      // Coba parse JSON kalau bisa
      const data = JSON.parse(text) as { message?: string };
      if (data?.message) errorMessage = data.message;
    } catch {
      // Kalau gagal parse JSON, gunakan text mentah (jika ada)
      // atau tetap pakai default errorMessage
    }

    throw new Error(errorMessage);
  }

  // ✅ Return data dengan tipe generic T
  try {
    return (await res.json()) as T;
  } catch {
    // Jika response bukan JSON, kembalikan body sebagai string
    return (await res.text()) as unknown as T;
  }
}
