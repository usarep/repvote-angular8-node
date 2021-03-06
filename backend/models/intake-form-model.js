const mongoose = require('mongoose');

const intakeFormSchema = mongoose.Schema({
  formName: { type: String, required: true },
  user: { type: String },
  form: { type: mongoose.Schema.Types.Mixed },
  edited: { type: Boolean },
  created: { type: Date },
  lastMod: { type: Date },
  captchaScore: {type: String}
});

module.exports = mongoose.model('intakeForm', intakeFormSchema);
