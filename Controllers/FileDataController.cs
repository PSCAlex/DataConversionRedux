using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebApplicationBasic.Models;

namespace WebApplicationBasic.Controllers
{
    [Route("api/[controller]")]
    public class FileDataController : Controller
    {
        public IActionResult GetFiles(){
            return Json(new List<File>{});
        }
    }
}