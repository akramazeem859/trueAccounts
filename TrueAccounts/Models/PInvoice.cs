namespace TrueAccounts.Models
{
    public class PInvoice
    {
        public int id { get; set; }
        public string code { get; set; }
        public int payable { get; set; }
        public int paid { get; set; }
        public int? supplierId { get; set; }
        public Supplier supplier { get; set; }
        public int freight { get; set; }
        public DateTime datetime { get; set; }
        public int branchId { get; set; }
        public Branch branch { get; set; }
        public List<PInvDetail> pInvDetails { get; set; }



    }
}
