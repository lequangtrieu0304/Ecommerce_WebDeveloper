import { getOrderById } from "../apis/orderAPI";
import { parseRequestUrl } from "../ultis";

const OrderScreen = {
    render: async () => {
        const request = parseRequestUrl();
        const order = await getOrderById(request.id);
        console.log(order);    
        return `
            <div class="place-order">
                <div class="order-detail">
                    <div class="order-shipping">
                        <h3>Địa chỉ nhận hàng</h3>
                        <div>
                            <ul>
                                <li><div>Người nhận:</div> <div>${order.user ? order.user.username : order.shipping.name}</div></li>
                                <li><div>Điện thoại:</div> <div>${order.user ? order.user.phone : order.shipping.phone}</div></li>
                                <li><div>Địa chỉ:</div> <div>${order.user ? order.user.address : order.shipping.address}</div></li>
                                <li><div>Ngày đặt:</div> <div>${order.createdAt.substring(0, 10)}</div></li>
                            </ul>
                        </div>
                    </div>

                    <div class="order-cart-list">
                        <div class="cart-list">
                            <ul class="cart-list-container">
                                <li>
                                    <h3>Mặt hàng</h3>
                                    <h3>Giá</h3>
                                </li>
                                ${
                                    order.orderItems.map(item => `
                                        <li>
                                            <div class="cart-img">
                                                <img src="${item.image}" alt="${item.name}"/>
                                            </div>

                                            <div class="cart-name">
                                                <div><h3>${item.name}</h3></div>
                                                <div>
                                                    Số lượng: <span>${item.qty}</span>
                                                </div>
                                            </div>

                                            <div class="cart-price">${item.price}đ </div>
                                        </li>
                                    `).join('')}
                                </ul>
                            </div>
                        </div>
                    </div>

                <div class="order-action">
                    <div class="action-details">
                        <ul>
                            <li>Đơn đặt hàng</li>
                            <li><div>Giá đơn hàng:</div> <div>${order.itemsPrice}đ</div></li>
                            <li><div>Phí vận chuyển:</div> <div>${order.shipPrice}đ</div></li>
                            <li><div>Tổng thanh toán:</div> <div>${order.totalPrice}đ</div></li>
                        </ul>
                    </div>
                    <div><h2>Thank You Very Much</h2></div>
                </div>
            </div>
        `;
    }
}

export default OrderScreen;