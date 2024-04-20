import React, { useEffect, useState } from "react";
import axios from "axios";

const WishlistPopup = ({ userId }: { userId: number }) => {
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlistItems = async () => {
      try {
        const response = await axios.get(`/api/wishlist?userId=${userId}`);
        setWishlistItems(response.data.items);
      } catch (error) {
        console.error("Error fetching wishlist items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlistItems();
  }, [userId]); // Fetch wishlist items whenever userId changes

  return (
    <div className="wishlist-popup">
      <h2>Wishlist</h2>
      {loading ? (
        <p>Loading...</p>
      ) : wishlistItems.length === 0 ? (
        <p>No games added to wishlist</p>
      ) : (
        <ul>
          {wishlistItems.map((item: any) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WishlistPopup;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { WishlistItem } from "@/app/types/type";

// const WishlistPopup = ({ userId }: { userId: number }) => {
//   const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

//   useEffect(() => {
//     const fetchWishlistItems = async () => {
//       try {
//         const response = await axios.get(`/api/wishlist?userId=${userId}`);
//         setWishlistItems(response.data.items);
//       } catch (error) {
//         console.error("Error fetching wishlist items:", error);
//       }
//     };

//     fetchWishlistItems();
//   }, [userId]); // Fetch wishlist items whenever userId changes

//   return (
//     <div className="wishlist-popup">
//       <h2>Wishlist</h2>
//       <ul>
//         {wishlistItems.map((item) => (
//           <li key={item.id}>{item.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default WishlistPopup;
