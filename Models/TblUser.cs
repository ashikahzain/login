using System;
using System.Collections.Generic;

namespace userlogin.Models
{
    public partial class TblUser
    {
        public int UserId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
