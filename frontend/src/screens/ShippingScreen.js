import { getShipping, getUserInfo, setShipping } from "../localStroge";

const ShippingScreen = {
    after_render: () => {
        document.getElementById('form-shipping').addEventListener('submit', (e) => {
            e.preventDefault();
            const shipping = {
                name: document.getElementById('name').value,
                phone: document.getElementById('phone').value,
                address: document.getElementById('address').value,
                city: document.getElementById('city').value,
                note: document.getElementById('note').value,
            };
            setShipping(shipping);
            document.location.hash = '/orderplace';
        })
    },

    render: () => {
        const {name, phone, address, city, note} = getShipping();
        return `
            <div class="shipping">
                <form id="form-shipping">
                    <div>
                        <h3>Shipping</h3>
                    </div>
                    <div>
                        <label for="name">Tên</label>
                        <input type="text" id="name" name="name" value="${name}"/>
                    </div>
                    <div>
                        <label for="phone">Điện thoại</label>
                        <input type="text" id="phone" name="phone" value="${phone}"/>
                    </div>
                    <div>
                        <label for="address">Địa chỉ</label>
                        <input type="text" id="address" name="address" value="${address}"/>
                    </div>
                    <div>
                        <label for="city">Thành phố</label>
                        <input type="text" id="city" name="city" value="${city}"/>
                    </div>
                    <div>
                        <label for="note">Ghi chú</label>
                        <textarea type="text" id="note" name="note">${note}</textarea>
                    </div>

                    <div>
                        <button type="submit">Xác nhận</button>
                    </div>
                </form>
            </div>
        `;
    }
}

export default ShippingScreen;