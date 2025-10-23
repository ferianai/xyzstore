// lib/api/fetchHelper.ts
export async function fetchWithError<T>(promise: Promise<Response>): Promise<T> {
  const res = await promise;
  if (!res.ok) {
    // Coba ambil pesan error dari body response (jika ada)
    let errorMessage = `Request failed dengan status ${res.status}`;
    try {
      const data = await res.json();
      if (data?.message) errorMessage = data.message;
    } catch {
      // Gagal parse json, pakai error default
    }
    throw new Error(errorMessage);
  }
  return res.json();
}
