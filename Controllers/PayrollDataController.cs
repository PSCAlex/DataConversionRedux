using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace WebApplicationBasic.Controllers
{
    [Route("api/[controller]")]
    public class PayrollDataController : Controller
    {
        [HttpGet("[action]")]
        public IActionResult GetOrganisationNumbers(){
            return Json(new List<int>{123,456,789});
        }

        [HttpGet("[action]")]
        public IActionResult GetPayrollNumbers(int organisationNumber){
            switch(organisationNumber){
                case 123:
                    return Json(new List<int>{45,67,89});
                case 456:
                    return Json(new List<int>{54,76,98});
                case 789:
                    return Json(new List<int>{12,34,65});
                default:
                    return Json(new List<int>{0});
            }
        }
    }
}