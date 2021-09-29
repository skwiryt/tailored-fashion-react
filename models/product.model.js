const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({ 
  title: { type: String, required: true },
  text: { type: String },
  photo: { type: String, required: true },
  price: { type: Number, required: true },
  images: [String],
});

productSchema.method('toClient', function() {
  var obj = this.toObject();

  //Rename fields
  obj.id = obj._id;
  delete obj._id;

  return obj;
});

module.exports = mongoose.model('Product', productSchema);