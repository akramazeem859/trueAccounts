namespace TrueAccounts.Models.Ledgers
{
    public class PurchaseLedger
    {
        public int Id { get; set; }
        public string Particular { get; set; }
        public DateTime DateTime { get; set; }
        public string Type { get; set; }
        public int Credit { get; set; }
        public int Debit { get; set; }
        public string Remarks { get; set; }
        public string InvCode { get; set; }
        public int BranchId { get; set; }
        public string CoaCode { get; set; }

    }
}
