const ProvinceRoute = require("./routes/province.route");
const RegencyRoute = require("./routes/regency.route");
const DistrictRoute = require("./routes/district.route");
const PeopleRoute = require("./routes/people.route");

const Routes = (request, response) => {
    ProvinceRoute(request, response);
    RegencyRoute(request, response);
    DistrictRoute(request, response);
    PeopleRoute(request, response);
}

module.exports = Routes;
