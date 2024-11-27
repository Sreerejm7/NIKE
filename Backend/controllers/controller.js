const Product = require("../Models/Product");
const cloudinary = require("cloudinary").v2;
const Users = require("../Models/User");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const Cart = require("../Models/Cart");
const Favourite = require("../Models/Favourite");
const Order = require("../Models/Order");
const Razorpay = require("razorpay");

const CreateProduct = async function (req, res) {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ message: "All images are required." });
  }
  const { image1, image2, image3, image4, image5 } = req.files;
  const allowedFormats = ["image/png", "image/jpeg", "image/webp", "image/jpg"];
  const images = [image1, image2, image3, image4, image5];
  for (let image of images) {
    if (image && !allowedFormats.includes(image.mimetype)) {
      return res
        .status(400)
        .json({ message: `File format not supported for ${image.name}.` });
    }
  }
  try {
    const {
      title,
      detail,
      price,
      discount,
      sizes,
      colors,
      category,
      stock,
      rating,
      origin,
      gender,
      highlights,
    } = req.body;
    if (
      !title ||
      !detail ||
      !price ||
      !discount ||
      !sizes ||
      !colors ||
      !stock ||
      !origin ||
      !highlights
    ) {
      return res.status(400).json({ message: "Please fill all the fields." });
    }
    const imageUrls = [];
    const uploadImage = async (image) => {
      return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(image.tempFilePath, (error, result) => {
          if (error) {
            console.error("Error uploading image to Cloudinary:", error);
            reject(error);
          } else {
            resolve(result.secure_url);
          }
        });
      });
    };
    for (let image of images) {
      if (image) {
        try {
          const url = await uploadImage(image);
          imageUrls.push(url);
        } catch (err) {
          console.error("Image upload failed:", err);
          return res
            .status(500)
            .json({ message: "Image upload failed.", error: err.message });
        }
      }
    }
    const afterDiscount = Math.round(price * (1 - discount / 100));
    const product = await Product.create({
      title,
      detail,
      price,
      discount,
      sizes,
      colors,
      category,
      stock,
      rating,
      origin,
      image: imageUrls,
      gender,
      highlights,
      discountPrice: afterDiscount,
    });

    return res
      .status(200)
      .json({ message: "Product added successfully", product });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res
      .status(500)
      .json({ message: "Unexpected error occurred", error: error.message });
  }
};

const GetAllProducts = async function (req, res) {
  try {
    const products = await Product.find({});
    if (!products) {
      return res.status(400).json({ message: "Products are Empty", products });
    } else {
      return res
        .status(200)
        .json({ message: "Products Fetched Successfully", products });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Unexpected error occurred", error: error.message });
  }
};

const GetProductById = async function (req, res) {
  const { id } = req.params;
  try {
    const products = await Product.findById(id);
    if (!products) {
      return res.status(400).json({ message: "Product Not Exists" });
    } else {
      return res
        .status(200)
        .json({ message: "Product Fetched Sucessfully..", products });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Unexpected Error Occured", error: error.message });
  }
};

const UpdateProducts = async function (req, res) {
  const {
    title,
    detail,
    price,
    discount,
    sizes,
    colors,
    category,
    stock,
    rating,
    origin,
    image,
    highlights,
    gender,
  } = req.body;

  const { id } = req.params;

  try {
    if (
      !title ||
      !detail ||
      !price ||
      !discount ||
      !sizes ||
      !colors ||
      !category ||
      !stock ||
      !origin ||
      !image ||
      !highlights
    ) {
      return res.status(400).json({ message: "Unable to Update" });
    }

    const afterDiscount = Math.round(price * (1 - discount / 100));

    const product = await Product.findByIdAndUpdate(
      id,
      {
        title,
        detail,
        price,
        discount,
        sizes,
        colors,
        category,
        stock,
        rating,
        origin,
        image,
        highlights,
        discountPrice: afterDiscount,
        gender,
      },
      { new: true }
    );
    if (!product) {
      res.status(400).json({
        message: "Product not Found!",
      });
    }
    res.status(200).json({
      message: "Product Updated Sucessfully..",
      product,
    });
  } catch (error) {
    return res.status(400).json({ message: "Error updating Product", error });
  }
};

const DeleteProduct = async function (req, res) {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      res.status(400).json({
        message: "Product not Found!",
      });
    }
    res.status(200).json({
      message: "Product Deleted Sucessfully..",
    });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error while Deleting the Product", error });
  }
};

const CreateUser = async function (req, res) {
  const { email, password, firstname, lastname, role, dateOfBirth } = req.body;

  if (!email || !password || !firstname || !lastname) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  try {
    const isRegistered = await Users.findOne({ email });
    if (isRegistered) {
      return res.status(400).json({ message: "Email already exists" });
    }

    let hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await Users.create({
      email,
      password: hashedPassword,
      firstname,
      lastname,
      role,
      dateOfBirth,
    });

    return res
      .status(200)
      .json({ message: "Registered successfully", user: newUser });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Unexpected error occurred", error: error.message });
  }
};

const LoginUser = async function (req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Please Fill All the Feilds" });
  }
  try {
    let isRegistered = await Users.findOne({ email });
    if (!isRegistered) {
      return res.status(400).json({ message: "User Not Found" });
    }
    const isMatched = await bcrypt.compare(password, isRegistered.password);
    if (!isMatched) {
      return res.status(400).json({ message: "Password Incorrect" });
    }

    const token = jwt.sign({ _id: isRegistered.id }, process.env.SECURITY_KEY, {
      expiresIn: "1h",
    });
    const tokenName =
      isRegistered.role === "Admin" ? "AdminToken" : "UserToken";

    res.status(200).json({
      message: "Login Successfull",
      user: isRegistered,
      [tokenName]: token,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Unexpected Error Occured", error: error.message });
  }
};

const AddtoCart = async function (req, res) {
  try {
    const { id } = req.params;
    const userid = req.user;
    const { size } = req.body;
    if (!size) {
      return res.status(400).json({ message: "Please provide all the data" });
    }
    const cart = await Cart.create({
      product: id,
      user: userid,
      size,
    });
    return res
      .status(201)
      .json({ message: "Item added to cart successfully", cart });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Unexpected error occurred", error: error.message });
  }
};

const FetchCart = async function (req, res) {
  const userid = req.user;
  try {
    const details = await Cart.find({ user: userid }).populate("product");
    if (!details) {
      return res.status(400).json({ message: "Failed to Fetch Cart Items" });
    } else {
      return res
        .status(200)
        .json({ message: "Cart Fetched Successfully", details });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Unexpected error occurred", error: error.message });
  }
};

const DeleteFromCart = async function (req, res) {
  const { id } = req.params;
  try {
    const product = await Cart.findByIdAndDelete(id);
    if (!product) {
      return res.status(400).json({ message: "Failed to Delete Cart Items" });
    } else {
      return res
        .status(200)
        .json({ message: "Item Deleted From Cart Successfully", product });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Unexpected error occurred", error: error.message });
  }
};
const ClearCart = async function (req, res) {
  const id = req.user;
  try {
    const response = await Cart.deleteMany({ user: id });
    res.status(200).json({ message: "Cart items deleted sucessfully" });
  } catch (error) {
    res.status(400).json({ message: "Error while Deleting the Cart" });
  }
};
const UpdateFromCart = async function (req, res) {
  const { id } = req.params;
  const { quantity } = req.body;
  try {
    const product = await Cart.findByIdAndUpdate(
      id,
      { quantity },
      { new: true }
    );
    if (!product) {
      return res.status(400).json({ message: "Failed to Update Cart Items" });
    } else {
      return res
        .status(200)
        .json({ message: "Item Updated Successfully", product });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Unexpected error occurred", error: error.message });
  }
};

const AddtoFavourite = async function (req, res) {
  try {
    const { id } = req.params;
    const userid = req.user;
    const { size } = req.body;
    if (!size) {
      return res.status(400).json({ message: "Please provide all the data" });
    }
    const favourite = await Favourite.create({
      product: id,
      user: userid,
      size,
    });
    return res
      .status(201)
      .json({ message: "Item added to Favourite successfully", favourite });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Unexpected error occurred", error: error.message });
  }
};

const FetchFavourite = async function (req, res) {
  const userid = req.user;
  try {
    const details = await Favourite.find({ user: userid }).populate("product");
    if (!details) {
      return res
        .status(400)
        .json({ message: "Failed to Fetch Favourite Items" });
    } else {
      return res
        .status(200)
        .json({ message: "Favourite Fetched Successfully", details });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Unexpected error occurred", error: error.message });
  }
};

const DeleteFromFavourite = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Favourite.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "Item not found" });
    }
    res
      .status(200)
      .json({ message: "Item Deleted From Favourite Successfully", product });
  } catch (error) {
    console.error("Error in DeleteFromFavourite:", error);
    res
      .status(500)
      .json({ message: "Unexpected error occurred", error: error.message });
  }
};

const MakeNewAdmin = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Please Enter the Email" });
  }

  const isUser = await Users.findOne({ email });
  if (!isUser) {
    return res.status(400).json({ message: "User With This Email Not Exists" });
  } else {
    const user = await Users.findByIdAndUpdate(
      isUser._id,
      { role: "Admin" },
      { new: true }
    );
    if (user) {
      return res
        .status(200)
        .json({ message: "New Admin Added Sucessfully", user });
    }
  }
};

const CreateOrder = async function (req, res) {
  const userid = req.user;
  const {
    firstname,
    lastname,
    phone,
    alternativenumber,
    email,
    address,
    pincode,
    Subtotal,
    delivery_charge,
    total,
    products,
    status,
  } = req.body;
  if (!firstname || !lastname || !phone || !email || !address || !pincode) {
    return res.status(400).json({ message: "All Feilds Are Required" });
  } else {
    try {
      const order = await Order.create({
        userId: userid,
        status,
        name: { firstname, lastname },
        phone,
        alternativenumber,
        email,
        address,
        pincode,
        Subtotal,
        delivery_charge,
        total,
        products,
      });
      if (order) {
        return res
          .status(200)
          .json({ message: "Order placed successfully", order });
      }
    } catch (error) {
      return res
        .status(500)
        .json({
          message: "Unexpected Error Occured Please Try Again",
          error: error.message,
        });
    }
  }
};

const fetchorder = async function (req, res) {
  try {
    const details = await Order.find({}).populate({ path: "products.product" });
    if (!details) {
      return res.status(400).json({ message: "Failed to Fetch Cart Items" });
    } else {
      return res
        .status(200)
        .json({ message: "Cart Fetched Successfully", details });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Unexpected error occurred", error: error.message });
  }
};

const fetchOrderbyUser = async function (req, res) {
  const  id  = req.user; 

  try {
    const details = await Order.find({ userId:id }).populate({ path: "products.product" })
    if (!details || details.length === 0) {
      return res.status(404).json({ message: "No orders found for this user." });
    } else {
      return res
        .status(200)
        .json({ message: "Orders fetched successfully", details });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Unexpected error occurred", error: error.message });
  }
};


const UpdateOrder = async function (req, res) {
  const { id, productId } = req.params; 
  const { status } = req.body; 

  try {
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    const product = order.products.find(
      (item) => item._id.toString() === productId
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found in the order" });
    }
    product.status = status;
    await order.save();

    return res.status(200).json({
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    console.error("Error updating order:", error);
    return res.status(500).json({ message: "Error while updating the status" });
  }
};

const DeleteOrder = async function (req,res){
  try {
    const {id,productId} = req.params
    const order = await Order.findById(id)
    if(!order){
      return res.status(400).json({message:"Order Not Exists"})
    }
    
    order.products.pull({_id:productId})
    if(order.products.length === 0){
      await Order.findByIdAndDelete(id);
      return res.status(200).json({message:"Product Deleted Sucessfully"})
    }
    else{
    await order.save()
    return res.status(200).json({message:"Product Deleted Sucessfully"})
  }
}
catch(error){
  return res.status(500).json({ message: "Error while updating the status" });
}
}


module.exports = {
  CreateProduct,
  GetAllProducts,
  UpdateProducts,
  DeleteProduct,
  GetProductById,
  CreateUser,
  LoginUser,
  AddtoCart,
  FetchCart,
  DeleteFromCart,
  UpdateFromCart,
  AddtoFavourite,
  FetchFavourite,
  DeleteFromFavourite,
  MakeNewAdmin,
  CreateOrder,
  fetchorder,
  UpdateOrder,
  ClearCart,
  fetchOrderbyUser,
  DeleteOrder
};
