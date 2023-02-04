using System.Text.Json.Serialization;
using System.Transactions;

namespace TrueAccounts.Models
{
    public class Branch
    {
        public int id { get; set; }
        public string branchName { get; set; }
        public string supervisor { get; set; }
        public string contactNumber { get; set; }
        public int companyId { get; set; }
        public Company company { get; set; }
        public List<Customer> Customer { get; set; }
        public List<Supplier> Supplier { get; set; }
        public List<CashAccount> CashAccount { get; set; }
        public List<PInvoice> pInvoices { get; set; }

    }
}
