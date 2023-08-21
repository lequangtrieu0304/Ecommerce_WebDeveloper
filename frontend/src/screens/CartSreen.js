import { getCartItems, getUserInfo, setCartItems } from '../localStroge';
import { rerender } from '../ultis';

const CartScreen = {
  after_render: () => {
    let cartItems = getCartItems();
    const qtySelects = document.getElementsByClassName('qty-select');

    Array.from(qtySelects).forEach((qtySelect) => {
      qtySelect.addEventListener('change', (e) => {
        const index = cartItems.findIndex((x) => x.product === qtySelect.id);
        if (index !== -1) {
          const oldItem = cartItems[index];
          const itemUpdate = { ...oldItem, qty: Number(e.target.value) };
          cartItems[index] = itemUpdate;
        }
        setCartItems(cartItems);
        rerender(CartScreen);
      });
    });

    const deleteButtons = document.getElementsByClassName('delete-button');
    Array.from(deleteButtons).forEach((deleteButton) => {
      deleteButton.addEventListener('click', () => {
        cartItems = cartItems.filter((x) => x.product !== deleteButton.id);
        setCartItems(cartItems);
        rerender(CartScreen);
      });
    });

    const { username } = getUserInfo();
    if (username) {
      document
        .getElementById('checkout-button')
        .addEventListener('click', () => {
          document.location.hash = '/orderplace';
        });
    } else {
      document
        .getElementById('checkout-button')
        .addEventListener('click', () => {
          document.location.hash = '/shipping';
        });
    }
  },
  render: () => {
    const cartItems = getCartItems();
    return `
            <div class="cart">
                <div class="cart-list">
                    <ul class="cart-list-container">
                        <li>
                            <h3>Shopping cart</h3>
                            <h3>Price</h3>
                        </li>
                        ${
                          cartItems.length === 0
                            ? '<div>Cart is empty. <a href="/#/">Go Shopping</a></div>'
                            : cartItems
                                .map(
                                  (item) => `
                                <li>
                                    <div class="cart-img">
                                        <img src="${item.image}" alt="${
                                    item.name
                                  }"/>
                                    </div>

                                    <div class="cart-name">
                                        <div><h3>${item.name}</h3></div>
                                        <div>
                                            Số lượng: <select class="qty-select" id="${
                                              item.product
                                            }">
                                                ${[
                                                  ...Array(
                                                    item.countInStock
                                                  ).keys(),
                                                ].map((x) =>
                                                  item.qty === x + 1
                                                    ? `<option selected value="${
                                                        x + 1
                                                      }">${x + 1}</option>`
                                                    : `<option value="${
                                                        x + 1
                                                      }">${x + 1}</option>`
                                                )}
                                            </select>
                                            <button type="button" class="delete-button" id="${
                                              item.product
                                            }">Xóa</button>
                                        </div>
                                    </div>

                                    <div class="cart-price">
                                        ${item.price}đ
                                    </div>
                                </li>
                            `
                                )
                                .join('')
                        }
                    </ul>
                </div>

                <div class="cart-action">
                    <h3>
                        Số lượng(${cartItems.reduce(
                          (a, c) => a + c.qty,
                          0
                        )} items)
                        :
                        ${cartItems.reduce(
                          (a, c) => a + parseInt(c.price) * c.qty,
                          0
                        )}đ
                    </h3>
                    <button id="checkout-button">TỚI THANH TOÁN</button>
                </div>
            </div>
        `;
  },
};

export default CartScreen;
