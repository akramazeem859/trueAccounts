using Microsoft.EntityFrameworkCore;
using TrueAccounts.Models;

namespace TrueAccounts.Data
{
    public class trueAccountsDbcontext : DbContext
    {
        public trueAccountsDbcontext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Company> Company { get; set; }
        public DbSet<Branch> Branches { get; set; }
        public DbSet<Brand> Brands { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Customer> Customer { get; set; }
        public DbSet<Supplier> Supplier { get; set; }
        public DbSet<TrueAccounts.Models.CashAccount> CashAccount { get; set; }
        public DbSet<TrueAccounts.Models.Inventory> Inventory { get; set; }
        public DbSet<TrueAccounts.Models.PInvoice> PInvoices { get; set; }
        public DbSet<TrueAccounts.Models.PInvDetail> pInvDetails { get; set; }
    }
}
