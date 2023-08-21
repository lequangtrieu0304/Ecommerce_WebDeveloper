import { createProduct, deleteProduct, getAllProduct } from "../apis/productAPI";
import ListDashboard from "../components/ListDashboard";
import { rerender, showMessage } from "../ultis";

const ProductScreen = {
    after_render: () => {
        document.getElementById('create-product').addEventListener('click', async () => {
            const data = await createProduct();
            if(data.error){
                showMessage(data.error);
            }
            else {
                document.location.hash = `/product/${data.product._id}/edit`;
            }
        });

        const deleteButtons = document.getElementsByClassName('delete-button');
        Array.from(deleteButtons).forEach(deleteButton => {
            deleteButton.addEventListener('click', async () => {
                const data = await deleteProduct(deleteButton.id);
                if(data.error){
                    showMessage(data.error)
                }
                else {
                    showMessage(data.message);
                    rerender(ProductScreen);
                }
            })
        });

        const editButtons = document.getElementsByClassName('edit-button');
        Array.from(editButtons).forEach(editButton => {
            editButton.addEventListener('click', () => {
                document.location.hash = `/product/${editButton.id}/edit`;
            })
        })
    },

    render: async () => {
        const products = await getAllProduct();
        return `
            ${ListDashboard.render({selected: 'product'})}
            <div class="product-table">
                <div class="product-header">
                    <h3>Sản Phẩm</h3>
                    <button type="button" id="create-product">Tạo sản phẩm</button>
                </div>

                <div class="product-list">
                    <table>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>NAME</th>
                                <th>ẢNH</th>
                                <th>GIÁ TRỊ</th>
                                <th>CATEGORY</th>
                                <th>KHO</th>
                                <th>ĐÃ BÁN</th>
                                <th>RATING</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${
                                products.map((product, index) => `
                                    <tr>
                                        <td>${index + 1}</td>
                                        <td><a href="/#/productcontent/${product._id}">${product.name}</a></td>
                                        <td><img src="${product.image}" alt="${product.name}"/></td>
                                        <td>${product.price}</td>
                                        <td>${product.category}</td>
                                        <td>${product.countInStock}</td>
                                        <td>${product.sold}</td>
                                        <td>${product.rating}</td>
                                        <td>
                                            <button type="button" id="${product._id}" class="edit-button">Sửa</button>
                                            <button type="button" id="${product._id}" class="delete-button">Xóa</button>
                                        </td>
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

export default ProductScreen;