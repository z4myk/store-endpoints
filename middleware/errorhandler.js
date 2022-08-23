const serviceNotFound = (req, res, next) => {
    res.status(404).send("Error service not found 404");
  };
  
  let error = {
    serviceNotFound,
  };
  
module.exports = error;   