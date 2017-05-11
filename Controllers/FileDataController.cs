using System;
using System.Collections.Generic;
using System.Linq;
using System.Diagnostics;
using System.Threading;
using Microsoft.AspNetCore.Mvc;
using WebApplicationBasic.Models;

namespace WebApplicationBasic.Controllers
{
    [Route("api/[controller]")]
    public class FileDataController : Controller
    {
        [HttpGet("[action]")]
        public IActionResult GetFiles(){
            return Json(new List<File>{
                new File
                {
                    Name = "Picklists",
                    Url = "api/FileData/Convert?file=Picklists",
                    IsComplete = false, 
                    IsStarted = false
                },
                new File
                {
                    Name = "Banks",
                    Url = "api/FileData/Convert?file=Banks",
                    IsComplete = false, 
                    IsStarted = false
                },
                new File
                {
                    Name = "Grades",
                    Url = "api/FileData/Convert?file=Grades",
                    IsComplete = false, 
                    IsStarted = false
                },
                new File
                {
                    Name = "JobTitles",
                    Url = "api/FileData/Convert?file=JobTitles",
                    IsComplete = false, 
                    IsStarted = false
                },
            });
        }

        [HttpPost("[action]")]
        public IActionResult Convert(string file){
            var rnd = new Random().Next(50);
            if(rnd < 25){
                Thread.Sleep(500);
                return Json(new {
                    IsSuccess = true,
                    SuccessInfo = "File imported successfully"
                });
            }else{
                Response.StatusCode = 500;
                Thread.Sleep(700);
                return Json(new {
                    IsError = true,
                    ErrorInfo = "An error occured converting x to y."
                });
            }
        }
    }
}