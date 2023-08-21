import { getProductById, updatedProduct } from "../apis/productAPI";
import { uploadImage } from "../apis/uploadAPI";
import ListDashboard from "../components/ListDashboard";
import { parseRequestUrl, showMessage } from "../ultis";

const ProductEditScreen = {
    after_render: () => {
        const request = parseRequestUrl();
        document.getElementById('update-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            const update = {
                _id: request.id,
                name: document.getElementById('name').value,
                description: document.getElementById('description').value,
                price: document.getElementById('price').value,
                category: document.getElementById('category').value,
                image: document.getElementById('image').value,
                countInStock: document.getElementById('countInStock').value,
            }
            const data = await updatedProduct(update);
            if(data.error){
                showMessage(data.error)
            }
            else {
                showMessage(data.message);
                document.location.hash = '/product';
            }
        });

        document.getElementById('image-file').addEventListener('change', async (e) => {
            const file = e.target.files[0];
            const formData = new FormData();
            formData.append('image', file)
            const data = await uploadImage(formData);
            if(data.error){
                showMessage(data.error)
            }
            else {
                document.getElementById('image').value = data.image;
            }
        })
    },

    render: async () => {
        const request = parseRequestUrl();
        const product = await getProductById(request.id);
        return `
            ${ListDashboard.render({selected: 'product'})}
            <div class="update-product">
                <h3>Cập nhật sản phẩm</h3>

                <div class="update-action">
                    <form id="update-form">
                        <h3>${product._id}</h3>
                            <div>
                                <label for="name">Tên sản phẩm</label>
                                <input type="text" id="name" name="name" value="${product.name}"/>
                            </div>
                            <div>
                                <label for="description">Mô tả</label>
                                <input type="text" id="description" name="description" value="${product.description}"/>
                            </div>
                            <div>
                                <label for="price">Giá</label>
                                <input type="text" id="price" name="price" value="${product.price}"/>
                            </div>
                            <div>
                                <label for="category">Phân loại</label>
                                <input type="text" id="category" name="category" value="${product.category}"/>
                            </div>
                            <div>
                                <label for="countInStock">Trong Kho</label>
                                <input type="text" id="countInStock" name="countInStock" value="${product.countInStock}"/>
                            </div>
                            <div>
                                <label for="image">Ảnh</label>
                                <input type="text" id="image" name="image" value="${product.image}"/>
                                <input type="file" name="image-file" id="image-file" />
                            </div>
                            <div>
                                <button type="submit">Cập nhật</button>
                            </div>
                    </form>
                </div>
            </div>
        `;
    }
}

export default ProductEditScreen;