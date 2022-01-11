using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using userlogin.Models;

namespace userlogin.Repository
{
    public interface ILoginRepository
    {
        Task<List<TblUser>> GetUsers();
        Task<TblUser> GetUserbyId(int id);
        Task<int> AddUser(TblUser user);
        Task<TblUser> GetUserbyCredentials(string username, string password);
        TblUser validateUser(string username, string password);
    }
}
