import { dailyOrders } from "../apis/orderAPI";
import ListDashboard from "../components/ListDashboard";

const SummaryScreen = {
    render: async () => {
        const { orderOfDay, orders, users} = await dailyOrders();
        console.log({ orderOfDay, orders, users});
        return `
            ${ListDashboard.render({selected: 'summary'})}
            <div class="summary">
                <div class="summary-content">
                    <div>
                        <div class="h3"><h3>Users</h3></div>
                        <div class="content">${users[0].numUsers}</div>
                    </div>
                    <div>
                        <div class="h3"><h3>Orders</h3></div>
                        <div class="content">${orders[0].numOrders}</div>
                    </div>
                    <div>
                        <div class="h3"><h3>Sales</h3></div>
                        <div class="content">${orders[0].totalSales}đ</div>
                    </div>
                </div>

                <div class="daily-order">
                    <h3>Đơn hàng các ngày</h3>
                    ${
                        orderOfDay.map(x => `
                            <div class="daily-order-content">
                                <div>-------<strong>${x._id}</strong>-------</div>
                                <div>Số Order: ${x.orders}</div>
                                <div>Tổng giá trị: ${x.sales}đ</div>
                            </div>                         
                        `).join('')
                    }
                </div>
            </div>
        `;


    }
}

export default SummaryScreen;