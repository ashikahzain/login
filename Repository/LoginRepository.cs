using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using userlogin.Models;

namespace userlogin.Repository
{
    public class LoginRepository : ILoginRepository
    {
        UserloginContext db;

        public LoginRepository(UserloginContext db)
        {
            this.db = db;
        }
        #region Get Users
        public async Task<List<TblUser>> GetUsers()
        {
            if (db != null)
            {
                return await db.TblUser.ToListAsync();
            }
            return null;
        }
        #endregion
        #region Get single User by Id
        public async Task<TblUser> GetUserbyId(int id)
        {
            var user = await db.TblUser.FirstOrDefaultAsync(em => em.UserId == id);
            if (user == null)
            {
                return null;
            }
            return user;
        }
        #endregion

        #region Add User
        public async Task<int> AddUser(TblUser user)
        {
            if (db != null)
            {
                await db.TblUser.AddAsync(user);
                await db.SaveChangesAsync();
            }
            return user.UserId;
        }
        #endregion
        #region Get user by credentials

        public async Task<TblUser> GetUserbyCredentials(string username, string password)
        {
            var user = await db.TblUser.FirstOrDefaultAsync(em => em.Username==username && em.Password==password);
            if (user == null)
            {
                return null;
            }
            return user;
        }


        #endregion

        #region Validate User
        public TblUser validateUser(string username, string password)
        {
            if (db != null)
            {
                TblUser tblUser = db.TblUser.FirstOrDefault(em => em.Username == username && em.Password == password);
                if (tblUser != null)
                {
                    return tblUser;
                }
            }
            return null;
        }

        #endregion


    }
}
