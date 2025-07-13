const API_URL = "http://localhost:8080/api/cart"; // Đổi thành domain backend khi deploy

// Lấy giỏ hàng theo userId
export async function getCart(userId: string) {
  const res = await fetch(`${API_URL}/${userId}`);
  if (!res.ok) throw new Error("Lấy giỏ hàng thất bại");
  return res.json();
}

// Thêm/sửa giỏ hàng
export async function updateCart(userId: string, items: { bookId: string; quantity: number }[]) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, items }),
  });
  if (!res.ok) throw new Error("Cập nhật giỏ hàng thất bại");
  return res.json();
}

// Xóa giỏ hàng (sau khi thanh toán)
export async function clearCart(userId: string) {
  const res = await fetch(`${API_URL}/${userId}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Xóa giỏ hàng thất bại");
  return res.json();
} 