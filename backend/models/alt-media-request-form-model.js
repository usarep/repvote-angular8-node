const mongoose = require('mongoose');

const altMediaRequestSchema = mongoose.Schema({
  formName: { type: String, required: true },
  user: { type: String },
  form: { type: mongoose.Schema.Types.Mixed },
  // form: { type: String },
  edited: { type: Boolean },
  created: { type: Date },
  lastMod: { type: Date },
  captchaScore: {type: String}
});

module.exports = mongoose.model('altMediaRequest', altMediaRequestSchema);
