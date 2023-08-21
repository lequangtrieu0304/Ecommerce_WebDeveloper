import { registerAccount } from "../apis/userAPI";
import { showMessage } from "../ultis";

const RegisterScreen = {
    after_render: () => {
        document.getElementById('form-register').addEventListener('submit', async (e) => {
            e.preventDefault();
            const register = {
                username: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                password: document.getElementById('password').value,
                birthday: document.getElementById('birthday').value,
            }
            const data = await registerAccount(register);
            if(data.error){
                showMessage(data.error)
            }
            else {
                showMessage(data.message);
                document.location.hash = '/login';
            }
        })
    },

    render: () => {
        return `
            <div class="register">
                <form id="form-register">
                    <h3>Đăng kí</h3>
                    <div>
                        <label for="name">Tên đăng nhập</label>
                        <input type="text" id="name" name="username"/>    
                    </div>
                    <div>
                        <label for="email">Email</label>
                        <input type="text" id="email" name="email"/>    
                    </div>
                    <div>
                        <label for="phone">Số điện thoại</label>
                        <input type="text" id="phone" name="phone"/>    
                    </div>
                    <div>
                        <label for="password">Mật khẩu</label>
                        <input type="password" id="password" name="password"/>    
                    </div>
                    <div>
                        <label for="birthday">Ngày sinh</label>
                        <input type="text" id="birthday" name="birthday"/>    
                    </div>
                    <button type="submit">Xác nhận</button>
                    <div><span>Quay lại?<a href="/#/login"><strong>Đăng nhập</strong></a></span></div>
                </form>
            </div>
        `;
    }
}

export default RegisterScreen;