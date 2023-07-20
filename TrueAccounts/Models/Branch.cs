using System.ComponentModel.DataAnnotations.Schema;
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
        public string UAN { get; set; }
        public string address { get; set; }
        public bool Status { get; set; }
        public int companyId { get; set; }
        public Company company { get; set; }
        public List<Customer> Customer { get; set; }
        public List<Supplier> Supplier { get; set; }
        public List<CashAccount> CashAccount { get; set; }
        public List<PInvoice> pInvoices { get; set; }
        public List<SInvoice> sInvoices { get; set; }


        [NotMapped]
        public list<JVInvoice> JVInvoices { get; set; }

        [NotMapped]
        public list<User> Users { get; set; }


    }
}
