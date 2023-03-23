namespace TrueAccounts.Models.Ledgers
{
    public class saleLedger
    {
        public int id { get; set; }
        public string particular { get; set; }
        public DateTime dateTime { get; set; }
        public int credit { get; set; }
        public int debit { get; set; }
        public string remarks { get; set; }
    }
}
