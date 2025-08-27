import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { AuthContext } from "./AuthContext";

export const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
    const { user } = useContext(AuthContext); // user.id lấy từ accounts
    const [ids, setIds] = useState(new Set());     // Set<number>
    const [loading, setLoading] = useState(false);

    // Tải wishlist từ server khi user đổi
    useEffect(() => {
        let cancelled = false;

        const fetchWishlist = async () => {
            if (!user?.id) {
                setIds(new Set()); // chưa login → rỗng
                return;
            }
            setLoading(true);
            try {
                const res = await fetch(`http://localhost:3001/accounts/${user.id}`);
                if (!res.ok) throw new Error("FETCH_ACCOUNT_FAILED");
                const acc = await res.json();
                const arr = Array.isArray(acc.wishlist) ? acc.wishlist : [];
                if (!cancelled) setIds(new Set(arr.map(Number)));
            } catch (e) {
                console.warn("Load wishlist failed:", e);
                if (!cancelled) setIds(new Set());
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        fetchWishlist();
        return () => {
            cancelled = true;
        };
    }, [user?.id]);

    // Helpers
    const has = useCallback((id) => ids.has(Number(id)), [ids]);

    // Đồng bộ lên server (PATCH vào accounts/:id)
    const syncServer = async (nextIds) => {
        if (!user?.id) return; // không sync khi chưa đăng nhập
        try {
            await fetch(`http://localhost:3001/accounts/${user.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ wishlist: Array.from(nextIds) }),
            });
        } catch (e) {
            console.warn("Sync wishlist failed:", e);
        }
    };

    // Thêm/bỏ 1 sản phẩm (optimistic update)
    const toggle = useCallback(
        (id) => {
            const n = Number(id);
            setIds((prev) => {
                const next = new Set(prev);
                if (next.has(n)) next.delete(n);
                else next.add(n);
                syncServer(next);
                return next;
            });
        },
        [user?.id] // eslint-disable-line react-hooks/exhaustive-deps
    );

    // Xoá sạch wishlist hiện tại (khi Sign out có thể gọi)
    const clear = useCallback(() => {
        const empty = new Set();
        setIds(empty);
        if (user?.id) syncServer(empty);
    }, [user?.id]); // eslint-disable-line react-hooks/exhaustive-deps

    const count = ids.size;

    const value = useMemo(
        () => ({ ids, has, toggle, clear, count, loading }),
        [ids, has, toggle, clear, count, loading]
    );

    return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}
