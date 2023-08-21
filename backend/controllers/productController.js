import Product from '../models/productModel.js';
import CustomError from '../Errors/index.js';

const getAllProduct = async (req, res, next) => {
    try {
        const products = await Product.find({});
        return res.status(200).json(products);
    }
    catch (error){
        next(error)
    }
}

const getProductById = async (req, res, next) => {
    const id = req.params.id;
    try{
        const product = await Product.findById(id);
        debugger
        if(product){
            return res.status(200).json(product);
        }
        throw new CustomError.NotFoundError("Không tìm thấy sản phẩm");
    }
    catch(error){
        next(error);
    }
}

const getProductByKey = async (req, res, next) => {
    try {
        const { searchKeyword } = req.query;
        const queryKeyword = searchKeyword
            ? { category: { $regex: searchKeyword, $options: 'i' } }
            : {};
        const products = await Product.find({ ...queryKeyword }) ?? [];
        return res.status(200).json(products || []);
    } 
    catch (error) {
        next(error)
    }
};
  
const createProduct = async (req, res, next) => {
    try{
        const product 
            = new Product({
                name: "Tạo sản phẩm",
                description: "Mô tả",
                image: "/images/products-1.jpg",
                price: "0.00đ",
                category: "Phân loại",
                countInStock: 0,
                sold: 0,
            });
        const createProduct = await product.save();
        if(createProduct){
            return res.status(201).json({
                message: "Tạo thành công",
                product: createProduct,
            })
        }
        throw new CustomError.BadRequestError("Tạo sản phẩm thất bại");
    }
    catch (error){
        next(error)
    }
}

const updatedProduct = async (req, res, next) => {
    const { name, description, image, price, category, countInStock, sold } = req.body;
    try {
        const id = req.params.id;
        const product = await Product.findById(id);
        if(product){
            product.name = name ?? product.name
            product.description = description ?? product.description
            product.image = image ?? product.image
            product.price = price ?? product.price
            product.category = category ?? product.category
            product.countInStock = countInStock ?? product.countInStock
            product.sold = sold ?? product.sold

            const updatedResult = await Product.updateOne({_id: product._id}, product);
            if(updatedResult.acknowledged){
                return res
                    .status(200)
                    .json({
                        message: "Đã cập nhật",
                        data: product,
                    })
                }
                throw new CustomError.BadRequestError("Cập nhật thất bại");
            }
            throw new CustomError.NotFoundError("Không tìm thất sản phẩm");
        }
        catch (error){
            next(error)
    }
}

const deleteProduct = async (req, res, next) => {
    const id = req.params.id;
    try {
        const product = await Product.findById(id);
        if (!product) {
            throw new CustomError.NotFoundError("Không tìm thấy sản phẩm");
        }
        const result = await product.remove();
        if (result) {
            return res.status(200).json({
                message: "Đã xóa",
                data: result,
            });
        }
        throw new CustomError.BadRequestError("Xóa thất bại");
    } catch (error) {
        next(error)
    }
}
  

const createReview = async (req, res, next) => {
    const id = req.params.id;
    try{
        const product = await Product.findById(id);
        if(product){
            const hasReviewed = product.reviews.some(p => p.user.toString() === req.user.id.toString());
            if(hasReviewed){
                throw new CustomError.BadRequestError("Đã đánh giá sản phẩm");
            }
            const review = {
                user: req.user.id,
                name: req.user.username,
                rating: req.body.rating,
                comment: req.body.comment,
            }
            product.reviews.push(review);
            product.numReviews = product.reviews.length;
            product.rating = product.reviews.reduce((a, c) => a + c.rating, 0) / product.reviews.length;

            const updateResult = await Product.updateOne({_id: product._id }, product);
            if(updateResult.acknowledged){
                return res.status(200).json({
                    data: product.reviews[product.reviews.length - 1],
                })
            }
            throw new CustomError.BadRequestError("Tạo đánh giá thất bại");
        }
    }
    catch (error){
        next(error)
    }
}

export default {
    getAllProduct,
    createProduct,
    updatedProduct,
    getProductById,
    deleteProduct,
    getProductByKey,
    createReview
}