import { getUserInfo } from "../localStroge";
import { parseRequestUrl } from "../ultis";

const Header = {
    after_render: () => {},

    render: () => {
        const {username, isAdmin} = getUserInfo();
        const { value } = parseRequestUrl();
        return `
                <div id="header">
                    <div class="header-content">
                        <a href="/#/">Coffee</a>
                    </div>
                    <div>
                        <ul class="category-header">
                            <li>
                                <a href="/#/?q=coffee" class="${value ==='coffee' ? 'a-selected' : ''}">COFFEE</a>
                            </li>
                            <li>
                                <a href="/#/?q=tra" class="${value ==='tra' ? 'a-selected' : ''}">TRÀ</a>
                            </li>
                            <li>
                                <a href="/#/?q=freeze" class="${value ==='freeze' ? 'a-selected' : ''}">FREEZE</a>
                            </li>
                            <li>
                                <a href="/#/?q=banh" class="${value ==='banh' ? 'a-selected' : ''}">BÁNH</a>
                            </li>
                        </ul>
                    </div>
                    <div class="header-detail">
                        <a href="/#/cart"><i class="fa-solid fa-bag-shopping"></i></a>
                        ${
                            username 
                                ?
                                `<a href="/#/${isAdmin ? 'admin' : 'profile'}">${username}</a>`
                                :
                                `<a href="/#/login">Đăng nhập</a>`
                        }  
                        ${
                            isAdmin 
                                ? `<i class="fa-solid fa-user-secret"></i>
                                    <a href="/#/admin">Dashboard</a>` 
                                : ''
                        }      
                    </div>
                </div>
        `;
    }
}

export default Header;