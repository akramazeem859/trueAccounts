namespace TrueAccounts.Models
{
    public class Supplier
    {
        public int Id { get; set; }
        public string supplierCode { get; set; }
        public string supplierName { get; set; }
        public string supplierNumber { get; set; }
        public string supplierAddress { get; set; }
        public int supplierBranchId { get; set; }
        public int supplierOpeningbalance { get; set; }
        public int supplierCurrentbalance { get; set; }
        public Branch supplierBranch { get; set; }
        public List<PInvoice> pInvoices { get; set; }
    }
}
