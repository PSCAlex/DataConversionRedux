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
                new File
                {
                    Name = "Locations",
                    Url = "api/FileData/Convert?file=locations",
                    IsComplete = false, 
                    IsStarted = false
                },
                new File
                {
                    Name = "CostCode1",
                    Url = "api/FileData/Convert?file=costCode1",
                    IsComplete = false, 
                    IsStarted = false
                },
                new File
                {
                    Name = "CostCode2",
                    Url = "api/FileData/Convert?file=costCode2",
                    IsComplete = false, 
                    IsStarted = false
                },
                new File
                {
                    Name = "CostCode3",
                    Url = "api/FileData/Convert?file=CostCode3",
                    IsComplete = false, 
                    IsStarted = false
                },
                new File
                {
                    Name = "Departments",
                    Url = "api/FileData/Convert?file=departments",
                    IsComplete = false, 
                    IsStarted = false
                },
                new File
                {
                    Name = "Turnaround Formats",
                    Url = "api/FileData/Convert?file=turnaroundFormats",
                    IsComplete = false, 
                    IsStarted = false
                },
                new File
                {
                    Name = "Payroll Defaults",
                    Url = "api/FileData/Convert?file=payrollDefaults",
                    IsComplete = false, 
                    IsStarted = false
                },
                new File
                {
                    Name = "Organisation Defaults",
                    Url = "api/FileData/Convert?file=organisationDefaults",
                    IsComplete = false, 
                    IsStarted = false
                },
            });
        }

        [HttpPost("[action]")]
        public IActionResult Convert(string file){
            var rnd = new Random().Next(100);
            if(rnd > 25){
                Thread.Sleep(2500);
                if(rnd > 90){
                    return Json(new {
                        IsSuccess = true,
                        SuccessInfo = "File empty."
                    });
                }else{
                    return Json(new {
                        IsSuccess = true,
                        SuccessInfo = "File imported successfully"
                    });
                }
            }else{
                Response.StatusCode = 500;
                Thread.Sleep(4000);
                return Json(new {
                    IsError = true,
                    ErrorInfo = "Migration failed. Unhandled Exception: System.ArgumentNullException: Value cannot be null. Parameter name: version at NuGet.Versioning.VersionRangeBase.Satisfies(NuGetVersion version, IVersionComparer comparer)"
                });
            }
        }
    }
}