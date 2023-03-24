namespace TrueAccounts.Models.Ledgers
{
    public class Ledger
    {
        public int id { get; set; }
        public string particular { get; set; }
        public DateTime dateTime { get; set; }
        public int credit { get; set; }
        public int debit { get; set; }
        public string remarks { get; set; }
        public string invCode { get; set; }
        public int branchId { get; set; }
        public string coaCode { get; set; }

    }
}
