import { getAllOrder } from "../apis/orderAPI";
import ListDashboard from "../components/ListDashboard";

const AdminScreen = {
    render: async () => {
        let orders = await getAllOrder();
        orders.reverse();

        return `
            ${ListDashboard.render({selected : 'orders'})}
            <div class="orders-admin">
                <h3>Danh sách đơn hàng</h3>
                <div class="order-list">
                    <table>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>ID</th>
                                <th>Người đặt</th>
                                <th>Số ĐT</th>
                                <th>Địa chỉ</th>
                                <th>Vật phẩm</th>
                                <th>Thanh toán</th>
                                <th>Note</th>
                                <th>Ngày đặt</th>
                            </tr>
                        </thead>

                        <tbody>
                            ${
                                orders.map((order, index) => `                              
                                    <tr>
                                        <td>${index + 1}</td>
                                        <td><a href="/#/order/${order._id}">${order._id}</a></td>
                                        <td>${order.user ? order.user.username : order.shipping.name}</td>
                                        <td>${order.user ? order.user.phone : order.shipping.phone}</td>
                                        <td>${order.user ? order.user.address : order.shipping.address}</td>
                                        <td>
                                            ${order.orderItems.map((item, index) => `
                                                <ul class="list-item-order">
                                                    <li><div>${item.name}:</div><div>${item.qty}</div> </li>
                                                </ul>
                                            `).join('')}
                                        </td>
                                        <td>${order.totalPrice}đ</td>
                                        <td>${order.shipping ? order.shipping.note : ''}</td>
                                        <td>${order.createdAt.substring(0, 10)}</td>
                                    </tr>
                                `).join('')
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }
}

export default AdminScreen;