var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var { autoIncrement } = require('mongoose-plugin-autoinc');

var ProductsSchema = new Schema({
    name: String,
    price: Number,
    description: String,
    created_at : {
        type: Date,
        default: Date.now()
    }
}) ;

//virtual 변수는 호출되면 실행하는 함수
// Object create 의 get과 set과 비슷함
//set은 변수의 값을 바꾸거나 셋팅하면 호출
// get은 getDate변수를 호출하는 순간 날짜 월일이 찍힌다.
ProductsSchema.virtual('getDate').get(function(){
    var date = new Date(this.created_at);
    return {
        year : date.getFullYear(),
        month : date.getMonth()+1,
        day : date.getDate()
    };
});

ProductsSchema.plugin(autoIncrement, {model: 'products', field: 'id', startAt: 1});
module.exports = mongoose.model('products',ProductsSchema);