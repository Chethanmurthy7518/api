const product = require("../models/products");

const getProducts = async (req, res, next) => {
  try {
    const products = await product.find().lean();
    res.json({
      error: false,
      message: "Products getting successfull",
      data: products,
    });
  } catch (err) {
    next(err);
  }
};

const addproduct = async (req, res, next) => {
  const { pName, pPrice, pImage, pDesc } = req.body;
  try {
    await product.insertMany([
      {
        pName,
        pPrice,
        pImage,
        pDesc,
      },
    ]);
    res.json({
      error: false,
      message: "Product added Successfull",
      data: {
        pName,
        pPrice,
        pImage,
        pDesc,
      },
    });
  } catch (err) {
    next(err);
  }
};

const editproduct = async (req, res, next) => {
  const { _id, pName, pPrice, pImage, pDesc } = req.body;
  try {
    await product.updateOne(
      {
        _id: _id,
      },
      {
        $set: {
          pName,
          pPrice,
          pImage,
          pDesc,
        },
      }
    );
    res.json({
        error:false,
        message:"Producy Edited Successfull",
        data:{
            pName,
          pPrice,
          pImage,
          pDesc,
        }
    })
  } catch (err) {
    next(err);
  }
};

const deleteproduct = async (req,res,next)=>{
    const {_id}=req.body
    try{
        await product.deleteOne({
            _id:_id,
        });
        res.json({
            error:false,
            message:"Product Deleted Successfull",
            data:null


        })
    }catch(err){
        next(err)
    }
}
module.exports = {
  getProducts,
  addproduct,
  editproduct,
  deleteproduct
};
