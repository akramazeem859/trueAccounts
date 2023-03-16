namespace TrueAccounts.Models
{
    public class SInvoice
    {
        public int id { get; set; }
        public string code { get; set; }
        public int payable { get; set; }
        public int paid { get; set; }
        public int? customerId { get; set; }
        public Customer customer { get; set; }
        public int freight { get; set; }
        public int discount { get; set; }
        public DateTime datetime { get; set; }
        public int branchId { get; set; }
        public Branch branch { get; set; }
        public int? accountId { get; set; }
        public CashAccount account { get; set; }
        public List<SInvDetail> sInvDetail { get; set; }

    }
}
