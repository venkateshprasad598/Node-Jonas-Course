class APIFeatures {
    constructor(query, queryString) {
      this.query = query;
      this.queryString = queryString;
    }
  
    filter() {
      const queryObj = { ...this.queryString };
      const excludedFields = ['page', 'sort', 'limit', 'fields'];
      excludedFields.forEach(el => delete queryObj[el]);
  
      // 1B) Advanced filtering
  // ?duration[gte]=5&difficulty="easy"
  // req.query = {diificulty : "easy", duration : {gte : 5}}

      let queryStr = JSON.stringify(queryObj);
      queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
  //Now queryStr is equals to :
  // queryStr = {diificulty : "easy", duration : ${gte : 5}}
      this.query = this.query.find(JSON.parse(queryStr));
      return this;
    }
  
    sort() {
      if (this.queryString.sort) {
        // ?sort=price,rating
        // {sort : "price,rating"}
        //It sorts by price and rating
        const sortBy = this.queryString.sort.split(',').join(' ');
        this.query = this.query.sort(sortBy);
      } else {
        //Else sort by created At
        this.query = this.query.sort('-createdAt');
      }
  
      return this;
    }
  
    limitFields() {
      if (this.queryString.fields) {
        // ?fields=name,difficulty,price
        // {fields : "name,difficulty,price"}
        //It gets only this fields
        const fields = this.queryString.fields.split(',').join(' ');
        this.query = this.query.select(fields);
      } else {
              // remove this fields and get rest fields
        this.query = this.query.select('-__v');
      }
      return this;
    }
  
    paginate() {
      const page = this.queryString.page * 1 || 1;
      const limit = this.queryString.limit * 1 || 100;
      const skip = (page - 1) * limit;
  
      this.query = this.query.skip(skip).limit(limit);
      return this;
    }
  }
  module.exports = APIFeatures;