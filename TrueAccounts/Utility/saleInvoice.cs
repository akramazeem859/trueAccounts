using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Storage;
using TrueAccounts.Data;
using TrueAccounts.Dto;
using TrueAccounts.Models;
using TrueAccounts.Models.Ledgers;

namespace TrueAccounts.Utility
{
    public class saleInvoice
    {
        private readonly trueAccountsDbcontext _context;

        public saleInvoice(trueAccountsDbcontext context)
        {
            _context = context;
        }


        public async Task<string> AddSaleInvoice(saleInvDTO sInvRequest)
        {
            int tempBranchId = 1;

            using (IDbContextTransaction transaction = _context.Database.BeginTransaction())
            {
                try
                {
                    string timezoneValue = "5:00";

                    TimeSpan offset = new TimeSpan();
                    offset = TimeSpan.Parse(timezoneValue);

                    var newtime = new DateTime();
                   
                    newtime = sInvRequest.datetime + offset;

                    int sInvCount = (from s in _context.SInvoice where s.datetime.Month == System.DateTime.Now.Month select s).Count() + 1;
                    var newsInvoice = new SInvoice();
                    newsInvoice.code = "SI" + System.DateTime.Now.Year + System.DateTime.Now.Month.ToString("00") + sInvCount.ToString("0000");
                    newsInvoice.payable = sInvRequest.payable;
                    newsInvoice.paid = sInvRequest.paid;
                    newsInvoice.customerId = sInvRequest.customerId;
                    newsInvoice.freight = sInvRequest.freight;
                    newsInvoice.discount = sInvRequest.discount;
                    newsInvoice.datetime = newtime;
                    newsInvoice.branchId = tempBranchId;
                    newsInvoice.accountId = sInvRequest.accountId;

                    _context.SInvoice.Add(newsInvoice);
                    await _context.SaveChangesAsync();

                    var newsInvDetail = new SInvDetail();
                    var newsInvDetailList = new List<SInvDetail> { };

                    foreach (var item in sInvRequest.detail)
                    {
                        newsInvDetail.id = 0;
                        newsInvDetail.productId = item.productId;
                        newsInvDetail.salePrice = item.salePrice;
                        newsInvDetail.quantity = item.quantity;
                        newsInvDetail.sInvoiceId = newsInvoice.id;

                        _context.sInvDetails.Add(newsInvDetail);
                        _context.SaveChanges();

                        newsInvDetailList.Add(newsInvDetail);

                    }
                    updateInvtory(newsInvoice.branchId, newsInvDetailList);

                    Ledger ldgr = new Ledger();
                    ldgr.Particular = "Sale Invoice ";
                    ldgr.Type = "SI";
                    ldgr.DateTime = newsInvoice.datetime;
                    ldgr.Credit = newsInvoice.payable - (newsInvoice.discount + newsInvoice.freight);
                    ldgr.Debit = 0;
                    ldgr.BranchId = tempBranchId;
                    ldgr.InvCode = newsInvoice.code;
                    _context.Ledger.Add(ldgr);
                    _context.SaveChanges();



                    SaleLedger sldgr = new SaleLedger();
                    sldgr.Id = 0;
                    sldgr.Particular = "Sale Invoice ";
                    sldgr.Type = "SI";
                    sldgr.Credit = newsInvoice.payable - (newsInvoice.discount + newsInvoice.freight);
                    sldgr.Debit = 0;
                    sldgr.DateTime = newsInvoice.datetime;
                    sldgr.InvCode = newsInvoice.code;
                    sldgr.BranchId = tempBranchId;
                    var sale_tempCoaCode = _context.level4.Where(l => l.name == "Local Sales" & l.branchId == tempBranchId).FirstOrDefault();
                    if (sale_tempCoaCode != null)
                    {
                        sldgr.CoaCode = sale_tempCoaCode.code;
                    }
                    else
                    {
                        sldgr.CoaCode = "";
                    }

                    _context.SaleLedger.Add(sldgr);
                    _context.SaveChanges();


                    var tempCustomer = _context.Customer.Where(c => c.Id == newsInvoice.customerId).SingleOrDefault();
                    string tempCoaCode;
                    if (tempCustomer != null)
                    {
                        tempCoaCode = tempCustomer.customerCode;
                    }
                    else
                    {
                        tempCoaCode = "";
                    }
                    CustomerLedger cldgr = new CustomerLedger();
                    cldgr.Particular = "Sale Invoice ";
                    cldgr.Type = "SI";
                    cldgr.DateTime = newsInvoice.datetime;
                    cldgr.Credit = newsInvoice.payable - newsInvoice.discount;
                    cldgr.Debit = 0;
                    cldgr.BranchId = tempBranchId;
                    var cust_tempCoaCode = _context.level4.Where(l => l.code == tempCoaCode & l.branchId == tempBranchId).FirstOrDefault();
                    if (cust_tempCoaCode != null)
                    {
                        cldgr.CoaCode = cust_tempCoaCode.code;
                    }
                    else
                    {
                        cldgr.CoaCode = "";
                    }
                    cldgr.InvCode = newsInvoice.customer.customerCode;

                    _context.CustomerLedger.Add(cldgr);
                    _context.SaveChanges();



                    var tempAccount = _context.CashAccount.Where(c => c.id == newsInvoice.accountId).SingleOrDefault();
                    //string tempCoaCode;
                    if (tempCustomer != null)
                    {
                        tempCoaCode = tempAccount.accountCode;
                    }
                    else
                    {
                        tempCoaCode = "";
                    }
                    CashAccountLedger caldgr = new CashAccountLedger();
                    caldgr.Particular = "Sale Invoice ";
                    caldgr.DateTime = newsInvoice.datetime;
                    caldgr.Type = "SI";
                    caldgr.Credit = newsInvoice.paid;
                    caldgr.Debit = 0;
                    caldgr.InvCode = newsInvoice.account.accountCode;
                    caldgr.BranchId = tempBranchId;
                    var ca_tempCaoCode = _context.level4.Where(l => l.code == tempCoaCode & l.branchId == tempBranchId).FirstOrDefault();
                    if (ca_tempCaoCode != null)
                    {
                        caldgr.CoaCode = ca_tempCaoCode.code;
                    }
                    else
                    {
                        caldgr.CoaCode = "";
                    }
                    _context.CashAccountLedger.Add(caldgr);
                    _context.SaveChanges();

                    //_context.pInvDetails.AddRange(newpInvDetailList);
                    //_context.SaveChanges();

                    return "Record Enter Successfully...";
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    return ex.Message;
                }
            }

        }

        protected void updateInvtory(int bId, List<SInvDetail> sDetail)
        {
            var inv = new Inventory();

            foreach (var item in sDetail)
            {
                inv = (from i in _context.Inventory
                       where
                       i.productId == item.productId &&
                       i.branchId == bId
                       select i).SingleOrDefault();
                if (inv != null)
                {
                    inv.quantity -= item.quantity;
                    _context.SaveChanges();
                }
                else
                {
                    var inv2 = new Inventory();
                    inv2.id = 0;
                    inv2.productId = item.productId;
                    inv2.quantity = item.quantity;
                    inv2.branchId = bId;
                    _context.Inventory.Add(inv2);
                    _context.SaveChanges();
                }
            }
        }
    }
}
