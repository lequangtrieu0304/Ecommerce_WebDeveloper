import { createReview, getProductById } from "../apis/productAPI";
import Rating from "../components/Rating";
import { getUserInfo } from "../localStroge";
import { parseRequestUrl, rerender, showMessage } from "../ultis";

const ProductContentScreen = {
    after_render: () => {
        const request = parseRequestUrl();
        document.getElementById('review-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            const data = await createReview(request.id, {
                rating: document.getElementById('rating').value,
                comment: document.getElementById('comment').value,
            })
            if(data.error) {
                showMessage(data.error)
            }
            else {
                showMessage('Cảm ơn đánh giá của bạn');
                rerender(ProductContentScreen);
            }
        })
    },

    render: async () => {
        const request = parseRequestUrl();
        const product = await getProductById(request.id);
        const { username } = getUserInfo();
        return `
            <div class="review-cmt-product">
                <div class="product-content">
                    <div class="product-content-img">
                        <img src="${product.image}" alt="${product.name}"/> 
                    </div>
                    <div class="product-content-details">
                        <h3>${product.description}</h3>
                        <div class="product-review-qty">
                            <div>
                                ${Rating.render({
                                    value: product.rating,
                                    text: `<strong>${product.numReviews}</strong> Đánh Giá`
                                })}
                            </div>
                        <div class="product-quantity">
                                <strong>${product.sold}</strong> Đã Bán
                        </div>
                        </div>

                        <div><strong>${product.name}</strong></div>
                        <div>Giá bán: <strong>${product.price}</strong>đ</div>
                        ${
                            product.countInStock <= 0
                                ? `<div class="out-of-stock">Hết hàng</div>`
                                : `<div class="in-stock">Còn hàng</div>`
                        }
                    </div>
                </div>

                <div class="product-comment">
                    <div class="list-comment">
                        ${ product.reviews.length === 0 ? `<div>Chưa có đánh giá</div>` : '' }
                            ${product.reviews.map((review, index) => `
                                <div class="render-comment">
                                    <div><strong>${ index + 1 }.${review.name}</strong>: ${review.comment}</div>
                                    <div>
                                        ${Rating.render({
                                            value: review.rating,
                                        })}
                                    </div>
                                    <div>Ngày: <strong>${review.createdAt.substring(0, 10)}</strong></div>
                                </div>                              
                            `).join('')
                        }
                    </div>

                    <div class="review-actions">
                        ${
                            username ? 
                            `<form id="review-form">
                                <h3>Gửi đánh giá</h3>
                                <div>
                                    <label for="rating">Rating</label>
                                    <select required name="rating" id="rating">
                                        <option value="">Chọn đánh giá</option>
                                        <option value="1">1 Sao</option>
                                        <option value="2">2 Sao</option>
                                        <option value="3">3 sao</option>
                                        <option value="4">4 sao</option>
                                        <option value="5">5 sao</option>
                                    </select>
                                </div>
                                <div>
                                    <label for="comment">Bình luận</label>
                                    <textarea required name="comment" id="comment"></textarea>
                                </div>
                                <button type="submit">Gửi</button>
                            </form>`
                            : 
                            `<a href="/#/login">Đăng nhập</a> để gửi đánh giá`
                        }
                    </div>
                </div>
            </div>
       `;
    }
}

export default ProductContentScreen;