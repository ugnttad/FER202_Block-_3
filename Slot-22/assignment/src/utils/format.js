export const vnd = (n) => (Number(n) || 0).toLocaleString("vi-VN") + "đ";

export const imgSrc = (path) => {
    if (!path) return "";
    if (/^https?:\/\//i.test(path)) return path;     // URL tuyệt đối
    if (path.startsWith("/")) return path;           // đã có leading slash
    if (path.startsWith("images/") || path.startsWith("assets/")) return "/" + path;
    return `/images/${path}`;                        // chỉ là tên file
};
