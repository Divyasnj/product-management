import { useEffect } from "react";
import { useCart } from "../context/cartContext";

function CartPage() {
  const { cart, getCart, removeFromCart, updateQuantity } = useCart();

  useEffect(() => {
    getCart();
  }, []);

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty</p>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item.productId._id}
              className="flex items-center gap-4 border-b py-4"
            >
              {/* Image */}
              <img
                src={item.productId.imageUrl}
                alt={item.productId.name}
                className="w-20 h-20 object-contain bg-gray-100 rounded"
              />

              {/* Details */}
              <div className="flex-1">
                <h3 className="font-semibold">
                  {item.productId.name}
                </h3>

                <p className="text-gray-600">
                  ₹{item.productId.price}
                </p>

                {/* Quantity Controls */}
                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={() =>
                      updateQuantity(item.productId._id, "dec")
                    }
                    className="px-3 py-1 bg-gray-300 rounded"
                  >
                    −
                  </button>

                  <span className="font-medium">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      updateQuantity(item.productId._id, "inc")
                    }
                    className="px-3 py-1 bg-gray-300 rounded"
                  >
                    +
                  </button>
                </div>

                <p className="font-medium mt-2">
                  Item Total: ₹
                  {item.productId.price * item.quantity}
                </p>
              </div>

              {/* Remove */}
              <button
                onClick={() =>
                  removeFromCart(item.productId._id)
                }
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Remove
              </button>
            </div>
          ))}

          {/* Cart Total */}
          <div className="text-right mt-6 text-xl font-bold">
            Total: ₹{totalAmount}
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;
