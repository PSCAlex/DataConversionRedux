using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplicationBasic.Models {

    public class File {
        public string Name {get;set;}
        public string Url {get;set;}
        public bool IsSuccess {get;set;}
        public string SuccessInfo {get;set;}
        public bool IsError {get;set;}
        public string ErrorInfo {get;set;}
        public bool IsComplete {get;set;}
    } 
}