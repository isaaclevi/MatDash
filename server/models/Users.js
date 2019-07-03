const mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    enterprise_name:String,
    store_name:String,
    compudash_ver:String,
    Modified:String,
    Checked:String,
    db_ver:String,
    Tis01_ver:String,
    TisWin3_ver:String,
    Tis01_DTOS:String,
    Tis01_ver_date:String,
    Active_Registers:Number,
    Tmpcalc_Size:String,
    public_ip:String,
    CC_Engine:String,
    action:String,
  },{ collection : 'CompuDashMain' });

  module.exports = mongoose.model('User', UserSchema);