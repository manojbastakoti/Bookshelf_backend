const mongoose = require("mongoose"); 

// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema(
  {
   user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user",
    required:true
   },
   shippingInfo:{
    firstname:{
      type:String,
      required:true
    },
    lastname:{
      type:String,
      required:true
    },
    address:{
      type:String,
      required:true,
    },
    city:{
      type:String,
      required:true
    },
    state:{
      type:String,
      required:true
    },
    other:{
      type:String,
      required:true
    }
   },

   paymentInfo:{
    khaltiOrderId:{
      type:String,
      required:true
    },
    khaltiPaymentId:{
      type:String,
      required:true
    },
   },

   orderItems:[
    {
      book:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"book",
        required:true
      },
      quantity:{
        type:Number,required:true
      },
      price:{
        type:Number,
        required:true
      },
    }
   ],
   paidAt:{
    type:Date,
    default:Date.now(),
   },
   totalPrice:{
    type:Number,
    required:true
   },
   orderStatus:{
    type:String,
    default:"Ordered"
   },
  },
  {
    timestamps: true,
  }
);

const OrderModel = mongoose.model("order",orderSchema);
module.exports = OrderModel