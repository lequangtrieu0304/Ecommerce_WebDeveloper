import Order from "../models/orderModel.js";
import User from "../models/userModel.js";
import Product from "../models/productModel.js";
import  CustomError from '../Errors/index.js';

const summaryOrder = async (req, res, next) => {
    try{
        const orderOfDay = await Order.aggregate([
            {   
                $group: {
                    _id: {$dateToString: {format: '%Y-%m-%d', date: '$createdAt'}},
                    orders: { $sum: 1},
                    sales: { $sum: '$totalPrice'},
                    ordersOfDay: { $addToSet: '$orderItems'}
                }
            }
        ]);

        const users = await User.aggregate([
            {
                $group: {
                    _id: null,
                    numUsers: { $sum: 1},
                }
            }
        ]);

        const orders = await Order.aggregate([
            {
                $group: {
                    _id: null,
                    totalSales: { $sum: "$totalPrice"},
                    numOrders: { $sum: 1 },
                }
            }
        ])

        res.status(200).json({
            orderOfDay, 
            users,
            orders: orders.length === 0 ? [{totalSales: 0, numOrders: 0}] : orders,
        });
    }
    catch (error){
        next(error)
    }
}

const sellingProducts = async (req, res, next) => {
    try {
        const sellingProducts = await Order.aggregate([
            {
                $unwind: "$orderItems",
            },
            {
                $group: {
                    _id: "$orderItems.product",
                    totalQty: {
                        $sum: {
                            $toInt: "$orderItems.qty"
                        }
                    }
                }
            },
            {
                $lookup: {
                    from: "products",
                    localField: "_id",
                    foreignField: "_id",
                    as: "sell"
                }
            },
            {
                $sort: {
                    "totalQty": -1,
                }
            },
            {
                $limit: 5
            }
        ]);
        return res.json(sellingProducts);
    }
    catch (error){
        next(error)
    }
}


const getAllOrder = async (req, res, next) => {
    try{
        const orders = await Order.find({}).populate('user');
        return res.status(200).json(orders);
    }
    catch(error){
        next(error)
    }
}

const getOrderById = async (req, res, next) => {
    const id = req.params.id;
    try{
        const order = await Order.findById(id).populate('user', '-_id -image -password -sex -isAdmin -birthday');
        if(order){
            return res.status(200).json(order);
        }
        throw new CustomError.NotFoundError("Không tìm thấy sản phẩm");
    }
    catch(error) {
        next(error)
    }
}

const createOrderLogin = async (req, res, next) => {
    const {orderItems, shipPrice, itemsPrice, totalPrice, payment} = req.body;
    try{
        const newOrder 
            = new Order({ orderItems, user: req.user.id, shipPrice, itemsPrice, totalPrice, payment });
        const createOrder = await newOrder.save();
        orderItems.forEach((item) => {
            // if(countInStock < item.qty){
            //     throw new CustomError.BadRequestError("Sản phẩm không đủ!");
            // }
            Product.updateOne(
                { 
                    _id: item.product,
                },
                {
                    $inc: {
                    countInStock: -item.qty,
                    sold: item.qty
                }},
                (err, data) => {
                    if(err){
                        throw new CustomError.BadRequestError("INVALID");
                    }
                }
            )  
        });
        return res.status(201).json({
            message: "Đặt hàng thành công",
            order: createOrder,
        });
    }
    catch(error){
        next(error)
    }
}

const createOrder = async (req, res, next) => {
    const {orderItems, shipping, shipPrice, itemsPrice, totalPrice, payment} = req.body;
    try{
        const newOrder 
            = new Order({ orderItems, shipping, shipPrice, itemsPrice, totalPrice, payment});

        const createOrder = await newOrder.save();
        orderItems.forEach(item => {
                Product.updateOne(
                    { 
                        _id: item.product
                    },
                    {
                        $inc: {
                        countInStock: -item.qty,
                        sold: item.qty,
                    }},
                    (err, data) => {
                        if(err){
                            throw new CustomError.BadRequestError("INVALID");
                        }
                    }
                )
        });
        return res.status(201).json({
            message: "Đặt hàng thành công",
            order: createOrder,
        })
    }
    catch(error){
        next(error)
    }
}

export default {
    createOrder,
    getOrderById,
    getAllOrder,
    createOrderLogin,
    summaryOrder,
    sellingProducts,
}

// doanh số theo tháng cho từng sản phẩm
// db.orders.aggregate([
//     {
//         $unwind: "$orderItems"
//     }, 
//     {
//         $lookup: {
//             from: "products", 
//             localField: "orderItems.product", 
//             foreignField: "_id", 
//             as: "product"
//         }
//     }, 
//     {
//         $project: {
//             year: {$year: "$createdAt"}, 
//             month: {$month: "$createdAt"}, 
//             total: {$multiply: [{$toInt: "$orderItems.qty"}, {$toInt: "$orderItems.price"}]}, 
//             totalQty: {$sum: {$toInt: "$orderItems.qty"}}, 
//             name: "$orderItems.name"
//         }
//     }, 
//     {
//         $group: {
//             _id: {year: "$year", month: "$month", name: "$name"}, 
//             total: {$sum: "$total"},
//             totalQty: {$sum: "$totalQty"}
//         }
//     },
//     {
//         $group: {
//             _id: {
//                 year: "$_id.year", 
//                 month: "$_id.month"
//             }, 
//             products: {
//                 $push: {
//                     name: "$_id.name", 
//                     total: "$total", 
//                     totalQty: "$totalQty"
//                 }
//             }
//         }
//     }
// ])