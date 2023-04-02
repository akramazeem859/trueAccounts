﻿using Microsoft.EntityFrameworkCore;
using TrueAccounts.Models;
using TrueAccounts.Models.ChartAccount;
using TrueAccounts.Models.Ledgers;

namespace TrueAccounts.Data
{
    public class trueAccountsDbcontext : DbContext
    {
        public trueAccountsDbcontext()
        {
        }

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
        public DbSet<TrueAccounts.Models.SInvoice> SInvoice { get; set; }
        public DbSet<TrueAccounts.Models.SInvDetail> sInvDetails { get; set; }
        public DbSet<TrueAccounts.Models.CustomerRate> CustomerRate { get; set; }
        public DbSet<TrueAccounts.Models.ChartAccount.level1> level1 { get; set; }
        public DbSet<TrueAccounts.Models.ChartAccount.level2> level2 { get; set; }
        public DbSet<TrueAccounts.Models.ChartAccount.level3> level3 { get; set; }
        public DbSet<TrueAccounts.Models.ChartAccount.level4> level4 { get; set; }
        public DbSet<TrueAccounts.Models.Ledgers.SaleLedger> SaleLedger { get; set; }
        public DbSet<TrueAccounts.Models.Ledgers.PurchaseLedger> PurchaseLedger { get; set; }
        public DbSet<TrueAccounts.Models.Ledgers.CustomerLedger> CustomerLedger { get; set; }
        public DbSet<TrueAccounts.Models.Ledgers.SupplierLedger> supplierLedger { get; set; }
        public DbSet<TrueAccounts.Models.Ledgers.CashAccountLedger> CashAccountLedger { get; set; }
        public DbSet<TrueAccounts.Models.Ledgers.JournalLedger> JournalLedger { get; set; }
        public DbSet<TrueAccounts.Models.Ledgers.Ledger> Ledger { get; set; }
        public DbSet<TrueAccounts.Models.JVInvoice> JVInvoice { get; set; }
        public DbSet<TrueAccounts.Models.JVInvDetail> JVInvDetails { get; set; }
    }
}
