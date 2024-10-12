import cartReducer, { addItem, removeItem, CartState } from "./cartSlice";

test("should add item to cart", () => {
  const initialState: CartState = {
    items: [],
  };

  const updatedState = cartReducer(
    initialState,
    addItem({
      id: "1",
      name: "Product A",
      price: 100,
      model: "ModelA",
      quantity: 1,
    })
  );

  expect(updatedState.items).toHaveLength(1);
  expect(updatedState.items[0].name).toBe("Product A");
  expect(updatedState.items[0].quantity).toBe(1);
});

test("should remove item from cart", () => {
  const initialState: CartState = {
    items: [
      { id: "1", name: "Product A", price: 100, model: "ModelA", quantity: 2 },
    ],
  };

  const updatedState = cartReducer(initialState, removeItem("1"));

  expect(updatedState.items).toHaveLength(0);
});

test("should increment quantity of an item in the cart", () => {
  const initialState: CartState = {
    items: [
      { id: "1", name: "Product A", price: 100, model: "ModelA", quantity: 1 },
    ],
  };

  const updatedState = cartReducer(
    initialState,
    addItem({
      id: "1",
      name: "Product A",
      price: 100,
      model: "ModelA",
      quantity: 1,
    })
  );

  expect(updatedState.items[0].quantity).toBe(2);
});
