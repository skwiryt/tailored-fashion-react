const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({ 
  name: { type: String, required: true },
  email: { type: String, required: true },
  lines: { type: Array, required: true },
  userId: { type: String, required: true },
  documentDate: { type: Date, required: true },
});

orderSchema.method('toClient', function() {
  var obj = this.toObject();

  //Rename fields
  obj.id = obj._id;
  delete obj._id;

  return obj;
});

module.exports = mongoose.model('Order', orderSchema);